import { Component, OnInit } from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";

import { Skill, MainSkill } from './skill';
import { SkillService } from './skill.service';

@Component({
    selector: 'my-app',
    templateUrl:  'app/home.html',
    providers: [SkillService]
})

export class AppComponent {
    title = 'Invoker Trainer';
    mainSkills: MainSkill[];
    skills: Skill[];
    selectedSkill: Skill;
    selectedMainSkill: MainSkill;
    usedSkills: MainSkill[] = [];
    currentSkill: Skill;
    ticks: number = 0;
    randomSkill: Skill;
    counterSkills: number = 0;
    gameFlag: boolean = true;
    modalIsOpen: boolean = false;

    constructor(private skillServie: SkillService) {
    }

    getSkills() {
        this.skillServie.getSkills().then(skills => {
            this.skills = skills;
        });
    }

    getMainSKills(): void {
        this.skillServie.getMainSkills().then(mainSkills => {
            this.mainSkills = mainSkills;
        });
        console.log('test');
    }

    ngOnInit(): void {
        this.getSkills();
        this.getMainSKills();
        this.initKeyEvent();
    }

    onSelect(skill: Skill): void {
        this.selectedSkill = skill;
    }

    onClickMainSkill(skill: MainSkill): void {
        this.selectedMainSkill = skill;
    }

    reduceEelements(arr) {
        return arr.reduce((previousValue, currentValue) => {
            if(currentValue === 'q') return previousValue + 10;
            if(currentValue === 'w') return previousValue + 100;
            if(currentValue === 'e') return previousValue + 1000;
            return previousValue;
        }, 0);
    }

    getCurrentSkill(currentSum) {
        let result = null;
        this.skills.forEach(elem => {
            let x = elem.keys.split("");
            if(currentSum === this.reduceEelements(x)) {
                result = elem;
            }
        });
        return result;
    }

    initKeyEvent(): void {
        window.addEventListener("keypress", (e) => {
            if(this.gameFlag) {
                this.mainSkills.map(elem => {
                    if(elem.key === e.key) {
                        this.selectedMainSkill = elem;
                        if (this.usedSkills.length === 3) {
                            this.usedSkills.shift();
                            this.usedSkills.push(this.selectedMainSkill);
                        } else {
                            this.usedSkills.push(this.selectedMainSkill);
                        }
                    }
                });

                if(e.key === 'r' && this.usedSkills.length === 3) {

                    let currentSum = this.reduceEelements(this.usedSkills.map(el => el.key));

                    this.currentSkill = this.getCurrentSkill(currentSum);

                    if(this.currentSkill.id === this.randomSkill.id) {
                        this.counterSkills++;
                        this.getRandomSkill();
                    }

                }
            }
        })
    }

    startTimer(): void {
        this.getRandomSkill();
        this.gameFlag = true;
        this.counterSkills = 0;

        let timer = TimerObservable.create(0,1000);
        let subscription = timer.subscribe(t=>{
            this.ticks = t;
            if(this.ticks === 10) {
                subscription.unsubscribe();
                this.gameFlag = false;
                this.modalIsOpen = true;
                this.ticks = 0;
            }
        });
    }

    getRandomSkill(): void {
        let randomSkill = this.skills[Math.floor(Math.random()*this.skills.length)];
        if(this.randomSkill === randomSkill) {
            this.getRandomSkill();
        } else {
            this.randomSkill = randomSkill;
        }
    }

    restartGame(): void {
        this.gameFlag = true;
        this.startTimer();
        this.counterSkills = 0;
    }


}

import { Component, OnInit } from '@angular/core';

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

    constructor(private skillServie: SkillService) {
    }

    getSkills(): void {
        this.skillServie.getSkills().then(skills => {
            this.skills = skills;
        });
    }

    getMainSKills(): void {
        this.skillServie.getMainSkills().then(mainSkills => {
            this.mainSkills = mainSkills;
        });
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

            }

        })
    }



}

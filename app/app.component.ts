import { Component } from '@angular/core';

import { Skill } from './skill';

const SKILLS: Skill[] = [
    {id: 1, name: 'alarcity'},
    {id: 2, name: 'alarcity12'},
    {id: 3, name: 'alarcity23'},
    {id: 4, name: 'alarcity34'},
    {id: 5, name: 'alarcity45'}
];

@Component({
    selector: 'my-app',
    template:  `
    <h1>{{title}}</h1>
    
    <my-skill-detail [skill]="selectedSkill"></my-skill-detail>
    
    <ul class="heroes">
      <li *ngFor="let skill of skills"
        [class.selected]="skill === selectedSkill"
        (click)="onSelect(skill)">
        <span class="badge">{{skill.id}}</span> {{skill.name}}
      </li>
    </ul>
    `
})

export class AppComponent {
    title = 'Invoker Trainer';
    skills = SKILLS;
    selectedSkill: Skill;
    onSelect(skill: Skill): void {
        this.selectedSkill = skill;
    }
}

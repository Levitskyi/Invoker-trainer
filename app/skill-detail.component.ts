import { Component, Input } from '@angular/core';
import { Skill } from './skill';

@Component({
    selector: 'my-skill-detail',
    template: `
    <div *ngIf="skill">
      <h2>{{skill.name}} details!</h2>
      <div><label>id: </label>{{skill.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="skill.name" placeholder="name"/>
      </div>
    </div>
  `
})

export class SkillDetailComponent {
    @Input()
    skill: Skill;
}
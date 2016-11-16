import { Injectable } from '@angular/core';

import {Skill, MainSkill} from './skill';
import {SKILLS, MAINSKILLS} from './mock-skills';

@Injectable()

export class SkillService {
    getSkills(): Promise<Skill[]> {
        return Promise.resolve(SKILLS);
    }
    getMainSkills(): Promise<MainSkill[]> {
        return Promise.resolve(MAINSKILLS);
    }
}
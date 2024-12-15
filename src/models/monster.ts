import { Characteristic } from '../enums/characteristic';
import { Element } from './element';
import { Feature } from './feature';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Size } from './size';

export interface MonsterRole {
	type: MonsterRoleType;
	isMinion: boolean;
};

export interface Monster extends Element {
	level: number;
	role: MonsterRole;
	keywords: string[];
	encounterValue: number;
	size: Size;
	speed: {
		value: number;
		modes: string;
	};
	stamina: number;
	stability: number;
	freeStrikeDamage: number;
	characteristics: {
		characteristic: Characteristic;
		value: number;
	}[];
	features: Feature[];
	villainActions: Feature[];
};

export interface MonsterGroup extends Element {
	information: Element[];
	malice: Feature[];
	monsters: Monster[];
};
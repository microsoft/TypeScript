import { Person } from './class-all';
import * as fns from './functions';
import * as fns2 from './functions';
import def from './export-default';


export let person: Person = new Person;
export const nr: number = fns2.testAlias("1");
export const fff: typeof fns = fns;
export default def;



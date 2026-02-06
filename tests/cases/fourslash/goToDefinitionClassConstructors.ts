/// <reference path='fourslash.ts'/>

// @filename: definitions.ts
//// export class Base {
////     constructor(protected readonly cArg: string) {}
//// }
//// 
//// export class Derived extends Base {
////     readonly email = this.cArg.getByLabel('Email')
////     readonly password =  this.cArg.getByLabel('Password')
//// }

// @filename: main.ts
//// import { Derived } from './definitions'
//// const derived = new [|/*Derived*/Derived|](cArg)

// @filename: defInSameFile.ts
//// import { Base } from './definitions'
//// class SameFile extends Base {
////     readonly name: string = 'SameFile'
//// }
//// const SameFile = new [|/*SameFile*/SameFile|](cArg)
//// const wrapper = new [|/*Base*/Base|](cArg)

// @filename: hasConstructor.ts
//// import { Base } from './definitions'
//// class HasConstructor extends Base {
////     constructor() {}
////     readonly name: string = '';
//// }
//// const hasConstructor = new [|/*HasConstructor*/HasConstructor|](cArg)


verify.baselineGoToDefinition(
    "Derived",
    "SameFile",
    "HasConstructor",
    "Base",
);

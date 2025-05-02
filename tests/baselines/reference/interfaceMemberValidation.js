//// [tests/cases/compiler/interfaceMemberValidation.ts] ////

//// [interfaceMemberValidation.ts]
interface i1 { name: string; }
interface i2 extends i1 { name: number; yo: string; }

interface foo {
 bar():any;
 bar():any;
 new():void;
 new():void;
 [s:string]:number;
 [s:string]:number;
}

//// [interfaceMemberValidation.js]

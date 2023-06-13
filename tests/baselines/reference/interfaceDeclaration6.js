//// [tests/cases/compiler/interfaceDeclaration6.ts] ////

//// [interfaceDeclaration6.ts]
interface i1 { foo: number; };
interface i2 extends i1 { foo: number; };
interface i3 extends i1 { foo: string; };
interface i4 {
 bar():any;
 bar():any;
}

//// [interfaceDeclaration6.js]
;
;
;

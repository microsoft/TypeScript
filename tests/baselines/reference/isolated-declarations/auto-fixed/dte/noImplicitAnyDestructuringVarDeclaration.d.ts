//// [tests/cases/compiler/noImplicitAnyDestructuringVarDeclaration.ts] ////

//// [noImplicitAnyDestructuringVarDeclaration.ts]
var [a], {b}, c: any, d: any; // error

var [a1 = undefined], {b1 = null}, c1 = undefined, d1 = null; // error

var [a2]: [any], {b2}: { b2: any }, c2: any, d2: any;

var {b3}: { b3 }, c3: { b3 }; // error in type instead

const dest: any[] = [undefined];
const a4: any = dest[0];
const dest_1 = { b4: null };
const b4: any = dest_1.b4;
var c4 = undefined, d4 = null; // error // error // error // error

const dest_2: any[] = [];
const temp: any = dest_2[0];
const a5: any = temp === undefined ? undefined : dest_2[0]; // error

/// [Declarations] ////



//// [noImplicitAnyDestructuringVarDeclaration.d.ts]
declare var a: invalid, b: invalid, c: any, d: any;
declare var a1: invalid, b1: invalid, c1: any, d1: any;
declare var a2: invalid, b2: invalid, c2: any, d2: any;
declare var b3: invalid, c3: {
    b3: any;
};
declare const dest: any[];
declare const a4: any;
declare const dest_1: {
    b4: any;
};
declare const b4: any;
declare var c4: any, d4: any;
declare const dest_2: any[];
declare const temp: any;
declare const a5: any;
/// [Errors] ////

noImplicitAnyDestructuringVarDeclaration.ts(1,5): error TS1182: A destructuring declaration must have an initializer.
noImplicitAnyDestructuringVarDeclaration.ts(1,6): error TS7031: Binding element 'a' implicitly has an 'any' type.
noImplicitAnyDestructuringVarDeclaration.ts(1,6): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
noImplicitAnyDestructuringVarDeclaration.ts(1,10): error TS1182: A destructuring declaration must have an initializer.
noImplicitAnyDestructuringVarDeclaration.ts(1,11): error TS7031: Binding element 'b' implicitly has an 'any' type.
noImplicitAnyDestructuringVarDeclaration.ts(1,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
noImplicitAnyDestructuringVarDeclaration.ts(3,5): error TS1182: A destructuring declaration must have an initializer.
noImplicitAnyDestructuringVarDeclaration.ts(3,6): error TS7031: Binding element 'a1' implicitly has an 'any' type.
noImplicitAnyDestructuringVarDeclaration.ts(3,6): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
noImplicitAnyDestructuringVarDeclaration.ts(3,23): error TS1182: A destructuring declaration must have an initializer.
noImplicitAnyDestructuringVarDeclaration.ts(3,24): error TS7031: Binding element 'b1' implicitly has an 'any' type.
noImplicitAnyDestructuringVarDeclaration.ts(3,24): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
noImplicitAnyDestructuringVarDeclaration.ts(5,5): error TS1182: A destructuring declaration must have an initializer.
noImplicitAnyDestructuringVarDeclaration.ts(5,6): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
noImplicitAnyDestructuringVarDeclaration.ts(5,18): error TS1182: A destructuring declaration must have an initializer.
noImplicitAnyDestructuringVarDeclaration.ts(5,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
noImplicitAnyDestructuringVarDeclaration.ts(7,5): error TS1182: A destructuring declaration must have an initializer.
noImplicitAnyDestructuringVarDeclaration.ts(7,6): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
noImplicitAnyDestructuringVarDeclaration.ts(7,13): error TS7008: Member 'b3' implicitly has an 'any' type.
noImplicitAnyDestructuringVarDeclaration.ts(7,25): error TS7008: Member 'b3' implicitly has an 'any' type.
noImplicitAnyDestructuringVarDeclaration.ts(11,18): error TS7018: Object literal's property 'b4' implicitly has an 'any' type.


==== noImplicitAnyDestructuringVarDeclaration.ts (21 errors) ====
    var [a], {b}, c: any, d: any; // error
        ~~~
!!! error TS1182: A destructuring declaration must have an initializer.
         ~
!!! error TS7031: Binding element 'a' implicitly has an 'any' type.
         ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~~
!!! error TS1182: A destructuring declaration must have an initializer.
              ~
!!! error TS7031: Binding element 'b' implicitly has an 'any' type.
              ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    var [a1 = undefined], {b1 = null}, c1 = undefined, d1 = null; // error
        ~~~~~~~~~~~~~~~~
!!! error TS1182: A destructuring declaration must have an initializer.
         ~~
!!! error TS7031: Binding element 'a1' implicitly has an 'any' type.
         ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                          ~~~~~~~~~~~
!!! error TS1182: A destructuring declaration must have an initializer.
                           ~~
!!! error TS7031: Binding element 'b1' implicitly has an 'any' type.
                           ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    var [a2]: [any], {b2}: { b2: any }, c2: any, d2: any;
        ~~~~
!!! error TS1182: A destructuring declaration must have an initializer.
         ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                     ~~~~
!!! error TS1182: A destructuring declaration must have an initializer.
                      ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    var {b3}: { b3 }, c3: { b3 }; // error in type instead
        ~~~~
!!! error TS1182: A destructuring declaration must have an initializer.
         ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~
!!! error TS7008: Member 'b3' implicitly has an 'any' type.
                            ~~
!!! error TS7008: Member 'b3' implicitly has an 'any' type.
    
    const dest: any[] = [undefined];
    const a4: any = dest[0];
    const dest_1 = { b4: null };
                     ~~~~~~~~
!!! error TS7018: Object literal's property 'b4' implicitly has an 'any' type.
    const b4: any = dest_1.b4;
    var c4 = undefined, d4 = null; // error // error // error // error
    
    const dest_2: any[] = [];
    const temp: any = dest_2[0];
    const a5: any = temp === undefined ? undefined : dest_2[0]; // error
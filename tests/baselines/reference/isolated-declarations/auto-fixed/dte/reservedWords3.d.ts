//// [tests/cases/compiler/reservedWords3.ts] ////

//// [reservedWords3.ts]
function f1(enum) {}
function f2(class) {}
function f3(function) {}
function f4(while) {}
function f5(for) {}


/// [Declarations] ////



//// [/.src/reservedWords3.d.ts]
declare function f1(): invalid;
declare enum  {
}
declare function f2(): invalid;
declare class {
}
declare function f3(): invalid;
declare function (): invalid;
declare function f4(): invalid;
declare function f5(): invalid;
/// [Errors] ////

reservedWords3.ts(1,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
reservedWords3.ts(1,13): error TS1390: 'enum' is not allowed as a parameter name.
reservedWords3.ts(1,17): error TS2567: Enum declarations can only merge with namespace or other enum declarations.
reservedWords3.ts(1,17): error TS1003: Identifier expected.
reservedWords3.ts(2,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
reservedWords3.ts(2,13): error TS1390: 'class' is not allowed as a parameter name.
reservedWords3.ts(2,18): error TS1005: '{' expected.
reservedWords3.ts(3,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
reservedWords3.ts(3,13): error TS1390: 'function' is not allowed as a parameter name.
reservedWords3.ts(3,21): error TS2567: Enum declarations can only merge with namespace or other enum declarations.
reservedWords3.ts(3,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
reservedWords3.ts(3,21): error TS1003: Identifier expected.
reservedWords3.ts(4,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
reservedWords3.ts(4,13): error TS1390: 'while' is not allowed as a parameter name.
reservedWords3.ts(4,18): error TS1005: '(' expected.
reservedWords3.ts(5,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
reservedWords3.ts(5,13): error TS1390: 'for' is not allowed as a parameter name.
reservedWords3.ts(5,16): error TS1005: '(' expected.


==== reservedWords3.ts (18 errors) ====
    function f1(enum) {}
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~~~
!!! error TS1390: 'enum' is not allowed as a parameter name.
                    
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
                    ~
!!! error TS1003: Identifier expected.
    function f2(class) {}
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~~~~
!!! error TS1390: 'class' is not allowed as a parameter name.
                     ~
!!! error TS1005: '{' expected.
    function f3(function) {}
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~~~~~~~
!!! error TS1390: 'function' is not allowed as a parameter name.
                        
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
                        
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                        ~
!!! error TS1003: Identifier expected.
    function f4(while) {}
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~~~~
!!! error TS1390: 'while' is not allowed as a parameter name.
                     ~
!!! error TS1005: '(' expected.
    function f5(for) {}
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~~
!!! error TS1390: 'for' is not allowed as a parameter name.
                   ~
!!! error TS1005: '(' expected.
    
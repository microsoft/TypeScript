//// [declarationEmitFirstTypeArgumentGenericFunctionType.ts]

class X<A> {
}
var prop11: X< <Tany>() => Tany >; // spaces before the first type argument
var prop12: X<(<Tany>() => Tany)>; // spaces before the first type argument
function f1() { // Inferred return type
    return prop11;
}
function f2() { // Inferred return type
    return prop12;
}
function f3(): X< <Tany>() => Tany> { // written with space before type argument
    return prop11;
}
function f4(): X<(<Tany>() => Tany)> { // written type with parenthesis
    return prop12;
}
class Y<A, B> {
}
var prop2: Y<string[], <Tany>() => Tany>; // No space after second type argument
var prop2: Y<string[], <Tany>() => Tany>; // space after second type argument
var prop3: Y< <Tany>() => Tany, <Tany>() => Tany>; // space before first type argument
var prop4: Y<(<Tany>() => Tany), <Tany>() => Tany>; // parenthesized first type argument


//// [declarationEmitFirstTypeArgumentGenericFunctionType.js]
class X {
}
var prop11; // spaces before the first type argument
var prop12; // spaces before the first type argument
function f1() {
    return prop11;
}
function f2() {
    return prop12;
}
function f3() {
    return prop11;
}
function f4() {
    return prop12;
}
class Y {
}
var prop2; // No space after second type argument
var prop2; // space after second type argument
var prop3; // space before first type argument
var prop4; // parenthesized first type argument


//// [declarationEmitFirstTypeArgumentGenericFunctionType.d.ts]
declare class X<A> {
}
declare var prop11: X<<Tany>() => Tany>;
declare var prop12: X<(<Tany>() => Tany)>;
declare function f1(): X<(<Tany>() => Tany)>;
declare function f2(): X<(<Tany>() => Tany)>;
declare function f3(): X<<Tany>() => Tany>;
declare function f4(): X<(<Tany>() => Tany)>;
declare class Y<A, B> {
}
declare var prop2: Y<string[], <Tany>() => Tany>;
declare var prop2: Y<string[], <Tany>() => Tany>;
declare var prop3: Y<<Tany>() => Tany, <Tany>() => Tany>;
declare var prop4: Y<(<Tany>() => Tany), <Tany>() => Tany>;


//// [DtsFileErrors]


tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(3,21): error TS2314: Generic type 'X<A>' requires 1 type argument(s).
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(3,22): error TS1005: '=' expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(3,24): error TS2304: Cannot find name 'Tany'.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(3,30): error TS1109: Expression expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(3,32): error TS1005: ';' expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(3,35): error TS2304: Cannot find name 'Tany'.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(3,40): error TS1109: Expression expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(7,24): error TS2314: Generic type 'X<A>' requires 1 type argument(s).
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(7,25): error TS1144: '{' or ';' expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(7,27): error TS2304: Cannot find name 'Tany'.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(7,33): error TS1109: Expression expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(7,35): error TS1005: ';' expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(7,38): error TS2304: Cannot find name 'Tany'.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(7,43): error TS1109: Expression expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(13,20): error TS2314: Generic type 'Y<A, B>' requires 2 type argument(s).
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(13,21): error TS1005: '=' expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(13,23): error TS2304: Cannot find name 'Tany'.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(13,29): error TS1109: Expression expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(13,31): error TS1005: ';' expected.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(13,34): error TS2304: Cannot find name 'Tany'.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(13,52): error TS2304: Cannot find name 'Tany'.
tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts(13,57): error TS1109: Expression expected.


==== tests/cases/compiler/declarationEmitFirstTypeArgumentGenericFunctionType.d.ts (22 errors) ====
    declare class X<A> {
    }
    declare var prop11: X<<Tany>() => Tany>;
                        ~
!!! error TS2314: Generic type 'X<A>' requires 1 type argument(s).
                         ~~
!!! error TS1005: '=' expected.
                           ~~~~
!!! error TS2304: Cannot find name 'Tany'.
                                 ~
!!! error TS1109: Expression expected.
                                   ~~
!!! error TS1005: ';' expected.
                                      ~~~~
!!! error TS2304: Cannot find name 'Tany'.
                                           ~
!!! error TS1109: Expression expected.
    declare var prop12: X<(<Tany>() => Tany)>;
    declare function f1(): X<(<Tany>() => Tany)>;
    declare function f2(): X<(<Tany>() => Tany)>;
    declare function f3(): X<<Tany>() => Tany>;
                           ~
!!! error TS2314: Generic type 'X<A>' requires 1 type argument(s).
                            ~~
!!! error TS1144: '{' or ';' expected.
                              ~~~~
!!! error TS2304: Cannot find name 'Tany'.
                                    ~
!!! error TS1109: Expression expected.
                                      ~~
!!! error TS1005: ';' expected.
                                         ~~~~
!!! error TS2304: Cannot find name 'Tany'.
                                              ~
!!! error TS1109: Expression expected.
    declare function f4(): X<(<Tany>() => Tany)>;
    declare class Y<A, B> {
    }
    declare var prop2: Y<string[], <Tany>() => Tany>;
    declare var prop2: Y<string[], <Tany>() => Tany>;
    declare var prop3: Y<<Tany>() => Tany, <Tany>() => Tany>;
                       ~
!!! error TS2314: Generic type 'Y<A, B>' requires 2 type argument(s).
                        ~~
!!! error TS1005: '=' expected.
                          ~~~~
!!! error TS2304: Cannot find name 'Tany'.
                                ~
!!! error TS1109: Expression expected.
                                  ~~
!!! error TS1005: ';' expected.
                                     ~~~~
!!! error TS2304: Cannot find name 'Tany'.
                                                       ~~~~
!!! error TS2304: Cannot find name 'Tany'.
                                                            ~
!!! error TS1109: Expression expected.
    declare var prop4: Y<(<Tany>() => Tany), <Tany>() => Tany>;
    
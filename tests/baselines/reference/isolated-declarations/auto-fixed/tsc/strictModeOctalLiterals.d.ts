//// [tests/cases/conformance/expressions/literals/strictModeOctalLiterals.ts] ////

//// [strictModeOctalLiterals.ts]
export enum E {
    A = 12 + 01
}
const orbitol: 01 = 01


/// [Declarations] ////



//// [/.src/strictModeOctalLiterals.d.ts]
export declare enum E {
    A = 13
}
/// [Errors] ////

strictModeOctalLiterals.ts(2,14): error TS1121: Octal literals are not allowed. Use the syntax '0o1'.
strictModeOctalLiterals.ts(4,16): error TS1121: Octal literals are not allowed. Use the syntax '0o1'.
strictModeOctalLiterals.ts(4,21): error TS1121: Octal literals are not allowed. Use the syntax '0o1'.


==== strictModeOctalLiterals.ts (3 errors) ====
    export enum E {
        A = 12 + 01
                 ~~
!!! error TS1121: Octal literals are not allowed. Use the syntax '0o1'.
    }
    const orbitol: 01 = 01
                   ~~
!!! error TS1121: Octal literals are not allowed. Use the syntax '0o1'.
                        ~~
!!! error TS1121: Octal literals are not allowed. Use the syntax '0o1'.
    
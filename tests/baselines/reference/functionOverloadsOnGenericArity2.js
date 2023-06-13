//// [tests/cases/compiler/functionOverloadsOnGenericArity2.ts] ////

//// [functionOverloadsOnGenericArity2.ts]
interface I {
    then(p: string): string;
    then<U>(p: string): string;
    then<U, T>(p: string): Date;
}

//// [functionOverloadsOnGenericArity2.js]

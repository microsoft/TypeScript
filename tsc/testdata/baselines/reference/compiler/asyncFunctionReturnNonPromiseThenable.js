//// [tests/cases/compiler/asyncFunctionReturnNonPromiseThenable.ts] ////

//// [asyncFunctionReturnNonPromiseThenable.ts]
export interface MyThenable {
    then(): void;
}

export async function foo(): MyThenable {
    return {
        then() {
        }
    };
}


//// [asyncFunctionReturnNonPromiseThenable.js]
export async function foo() {
    return {
        then() {
        }
    };
}

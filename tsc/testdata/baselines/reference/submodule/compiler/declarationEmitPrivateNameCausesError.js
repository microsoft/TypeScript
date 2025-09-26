//// [tests/cases/compiler/declarationEmitPrivateNameCausesError.ts] ////

//// [file.ts]
const IGNORE_EXTRA_VARIABLES = Symbol(); //Notice how this is unexported

//This is exported
export function ignoreExtraVariables<CtorT extends {new(...args:any[]):{}}> (ctor : CtorT) {
    return class extends ctor {
        [IGNORE_EXTRA_VARIABLES] = true; //An unexported constant is used
    };
}

//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoreExtraVariables = ignoreExtraVariables;
const IGNORE_EXTRA_VARIABLES = Symbol(); //Notice how this is unexported
//This is exported
function ignoreExtraVariables(ctor) {
    return class extends ctor {
        [IGNORE_EXTRA_VARIABLES] = true; //An unexported constant is used
    };
}


//// [file.d.ts]
declare const IGNORE_EXTRA_VARIABLES: unique symbol;
export declare function ignoreExtraVariables<CtorT extends {
    new (...args: any[]): {};
}>(ctor: CtorT): {
    new (...args: any[]): {
        [IGNORE_EXTRA_VARIABLES]: boolean;
    };
} & CtorT;
export {};

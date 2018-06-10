// @declaration: true
// @lib: es6
// @filename: file.ts
const IGNORE_EXTRA_VARIABLES = Symbol(); //Notice how this is unexported

//This is exported
export function ignoreExtraVariables<CtorT extends {new(...args:any[]):{}}> (ctor : CtorT) {
    return class extends ctor {
        [IGNORE_EXTRA_VARIABLES] = true; //An unexported constant is used
    };
}
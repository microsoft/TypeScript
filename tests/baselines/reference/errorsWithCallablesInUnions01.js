//// [errorsWithCallablesInUnions01.ts]
interface IDirectiveLinkFn<TScope> {
    (scope: TScope): void;
}

interface IDirectivePrePost<TScope> {
    pre?: IDirectiveLinkFn<TScope>;
    post?: IDirectiveLinkFn<TScope>;
}

export let blah: IDirectiveLinkFn<number> | IDirectivePrePost<number> = (x: string) => {}


//// [errorsWithCallablesInUnions01.js]
"use strict";
exports.__esModule = true;
exports.blah = function (x) { };

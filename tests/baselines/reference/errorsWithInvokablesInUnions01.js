//// [errorsWithInvokablesInUnions01.ts]
interface ConstructableA {
  new(): { somePropA: any };
}

interface IDirectiveLinkFn<TScope> {
    (scope: TScope): void;
}

interface IDirectivePrePost<TScope> {
    pre?: IDirectiveLinkFn<TScope>;
    post?: IDirectiveLinkFn<TScope>;
}

export let blah: IDirectiveLinkFn<number> | ConstructableA | IDirectivePrePost<number> = (x: string) => {}

export let ctor: IDirectiveLinkFn<number> | ConstructableA | IDirectivePrePost<number> = class {
    someUnaccountedProp: any;
}


//// [errorsWithInvokablesInUnions01.js]
"use strict";
exports.__esModule = true;
exports.ctor = exports.blah = void 0;
var blah = function (x) { };
exports.blah = blah;
exports.ctor = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());

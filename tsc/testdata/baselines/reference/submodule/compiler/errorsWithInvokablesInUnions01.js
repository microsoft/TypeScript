//// [tests/cases/compiler/errorsWithInvokablesInUnions01.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctor = exports.blah = void 0;
let blah = (x) => { };
exports.blah = blah;
let ctor = class {
    someUnaccountedProp;
};
exports.ctor = ctor;

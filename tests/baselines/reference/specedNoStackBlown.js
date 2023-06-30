//// [tests/cases/compiler/specedNoStackBlown.ts] ////

//// [specedNoStackBlown.ts]
// Type definitions for spected 0.7
// Project: https://github.com/25th-floor/spected
// Definitions by: Benjamin Makus <https://github.com/benneq>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare function spected<ROOTINPUT, SPEC extends SpecValue<ROOTINPUT, ROOTINPUT> = SpecValue<ROOTINPUT, ROOTINPUT>>(spec: SPEC, input: ROOTINPUT): Result<ROOTINPUT, SPEC>;

type Predicate<INPUT, ROOTINPUT> = (value: INPUT, inputs: ROOTINPUT) => boolean;

type ErrorMsg<INPUT> =
    | (string | number | boolean | symbol | null | undefined | object)
    | ((value: INPUT, field: string) => any);

export type Spec<INPUT, ROOTINPUT = any> = [Predicate<INPUT, ROOTINPUT>, ErrorMsg<INPUT>];

export type SpecArray<INPUT, ROOTINPUT = any> = Array<Spec<INPUT, ROOTINPUT>>;

export type SpecFunction<INPUT, ROOTINPUT = any> = [INPUT] extends [ReadonlyArray<infer U>]
    ? (value: INPUT) => ReadonlyArray<SpecArray<U, ROOTINPUT>>
    : [INPUT] extends [object]
        ? (value: INPUT) => SpecObject<INPUT, ROOTINPUT>
        : (value: INPUT) => SpecArray<INPUT, ROOTINPUT>;

export type SpecObject<INPUT, ROOTINPUT = any> = Partial<{[key in keyof INPUT]: SpecValue<INPUT[key], ROOTINPUT>}>;

export type SpecValue<INPUT, ROOTINPUT = any> = [INPUT] extends [ReadonlyArray<any>]
    ? SpecArray<INPUT, ROOTINPUT> | SpecFunction<INPUT, ROOTINPUT>
        : [INPUT] extends [object]
            ? SpecArray<INPUT, ROOTINPUT> | SpecFunction<INPUT, ROOTINPUT> | SpecObject<INPUT, ROOTINPUT>
            : SpecArray<INPUT, ROOTINPUT> | SpecFunction<INPUT, ROOTINPUT>;

export type Result<INPUT, SPEC> = {[key in keyof INPUT]: true | any[] | Result<INPUT[key], any>};

export default spected;


//// [specedNoStackBlown.js]
"use strict";
// Type definitions for spected 0.7
// Project: https://github.com/25th-floor/spected
// Definitions by: Benjamin Makus <https://github.com/benneq>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = spected;

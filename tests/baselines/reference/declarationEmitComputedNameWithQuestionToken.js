//// [tests/cases/compiler/declarationEmitComputedNameWithQuestionToken.ts] ////

//// [declarationEmitComputedNameWithQuestionToken.ts]
declare var something: string;
export const dataSomething = `data-${something}` as const;

export class WithData {
    [dataSomething]?() {
        return "something";
    }
}

export const a = (new WithData())["ahahahaahah"]!();

//// [declarationEmitComputedNameWithQuestionToken.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = exports.WithData = exports.dataSomething = void 0;
exports.dataSomething = `data-${something}`;
class WithData {
    [exports.dataSomething]() {
        return "something";
    }
}
exports.WithData = WithData;
exports.a = (new WithData())["ahahahaahah"]();


//// [declarationEmitComputedNameWithQuestionToken.d.ts]
export declare const dataSomething: `data-${string}`;
export declare class WithData {
    [dataSomething]?: () => string;
}
export declare const a: string;

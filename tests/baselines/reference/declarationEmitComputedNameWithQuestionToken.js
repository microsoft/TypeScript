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
export const dataSomething = `data-${something}`;
export class WithData {
    [dataSomething]() {
        return "something";
    }
}
export const a = (new WithData())["ahahahaahah"]();


//// [declarationEmitComputedNameWithQuestionToken.d.ts]
export declare const dataSomething: `data-${string}`;
export declare class WithData {
    [dataSomething]?: () => string;
}
export declare const a: string;

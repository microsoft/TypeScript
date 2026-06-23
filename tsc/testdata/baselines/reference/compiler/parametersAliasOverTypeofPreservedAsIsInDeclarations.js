//// [tests/cases/compiler/parametersAliasOverTypeofPreservedAsIsInDeclarations.ts] ////

//// [parametersAliasOverTypeofPreservedAsIsInDeclarations.ts]
interface OverloadUnion {
    (arg: string): Promise<boolean>;
    (arg: string, callback: (error: Error | null, result: boolean) => void): void;
}

declare let overloadInterface: OverloadUnion;
declare let overloadInline:
    | ((arg: string) => Promise<boolean>)
    | ((arg: string, callback: (error: Error | null, result: boolean) => void) => void)

export class C {
    classMethodInterface(...args: Parameters<typeof overloadInterface>) {}
    classMethodInline(...args: Parameters<typeof overloadInline>) {}

    classFieldFunctionInterface = function (...args: Parameters<typeof overloadInterface>) {}
    classFieldFunctionInline = function (...args: Parameters<typeof overloadInline>) {}

    classFieldArrowInterface = (...args: Parameters<typeof overloadInterface>) => {}
    classFieldArrowInline = (...args: Parameters<typeof overloadInline>) => {}
}

export function FunctionInterface(...args: Parameters<typeof overloadInterface>) {}
export function FunctionInline(...args: Parameters<typeof overloadInline>) {}
export const FunctionAssignInterface = function (...args: Parameters<typeof overloadInterface>) {}
export const FunctionAssignInline = function (...args: Parameters<typeof overloadInline>) {}
export const ArrowInterface = (...args: Parameters<typeof overloadInterface>) => {}
export const ArrowInline = (...args: Parameters<typeof overloadInline>) => {}

//// [parametersAliasOverTypeofPreservedAsIsInDeclarations.js]
export class C {
    classMethodInterface(...args) { }
    classMethodInline(...args) { }
    classFieldFunctionInterface = function (...args) { };
    classFieldFunctionInline = function (...args) { };
    classFieldArrowInterface = (...args) => { };
    classFieldArrowInline = (...args) => { };
}
export function FunctionInterface(...args) { }
export function FunctionInline(...args) { }
export const FunctionAssignInterface = function (...args) { };
export const FunctionAssignInline = function (...args) { };
export const ArrowInterface = (...args) => { };
export const ArrowInline = (...args) => { };


//// [parametersAliasOverTypeofPreservedAsIsInDeclarations.d.ts]
interface OverloadUnion {
    (arg: string): Promise<boolean>;
    (arg: string, callback: (error: Error | null, result: boolean) => void): void;
}
declare let overloadInterface: OverloadUnion;
declare let overloadInline: ((arg: string) => Promise<boolean>) | ((arg: string, callback: (error: Error | null, result: boolean) => void) => void);
export declare class C {
    classMethodInterface(...args: Parameters<typeof overloadInterface>): void;
    classMethodInline(...args: Parameters<typeof overloadInline>): void;
    classFieldFunctionInterface: (...args: Parameters<typeof overloadInterface>) => void;
    classFieldFunctionInline: (...args: Parameters<typeof overloadInline>) => void;
    classFieldArrowInterface: (...args: Parameters<typeof overloadInterface>) => void;
    classFieldArrowInline: (...args: Parameters<typeof overloadInline>) => void;
}
export declare function FunctionInterface(...args: Parameters<typeof overloadInterface>): void;
export declare function FunctionInline(...args: Parameters<typeof overloadInline>): void;
export declare const FunctionAssignInterface: (...args: Parameters<typeof overloadInterface>) => void;
export declare const FunctionAssignInline: (...args: Parameters<typeof overloadInline>) => void;
export declare const ArrowInterface: (...args: Parameters<typeof overloadInterface>) => void;
export declare const ArrowInline: (...args: Parameters<typeof overloadInline>) => void;
export {};

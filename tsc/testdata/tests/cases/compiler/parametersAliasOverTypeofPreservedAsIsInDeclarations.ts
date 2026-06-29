// @declaration: true
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
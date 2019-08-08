// https://github.com/microsoft/TypeScript/issues/31426

export type AnyFunction<A = any>        = (...input : any[]) => A
export type AnyConstructor<A = object>  = new (...input : any[]) => A
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>

export const Box = <T extends AnyConstructor<object>>(base : T) =>
class Box extends base {
    value       : any
}
export interface Box extends Mixin<typeof Box> {}

export const Observable = <T extends AnyConstructor<object>>(base : T) =>
class Observable extends base {
    observe () : IQuark {
        return
    }
}
export interface Observable extends Mixin<typeof Observable> {}

export const CQuark = <T extends AnyConstructor<Box & Observable>>(base : T) =>
class Quark extends base {

    observe () : Quark {
        // No error here!
        this.value
        
        
        return
    }
}
export interface IQuark extends Mixin<typeof CQuark> {}

const test = (a : IQuark) => a.value // <-- Should not error

// @noEmit: true

export type ClassInterface<C> = {
    [key in keyof C]: C[key];
}

type InstanceInterface<I> = {
    new(...args: any[]): I
    prototype: I
}

type Constructor<I extends Object, C = any> = ClassInterface<C> & InstanceInterface<I>

function cloneClass<T extends Constructor<{}>>(OriginalClass: T): T {
    class AnotherOriginalClass extends OriginalClass {
        constructor(...args: any[]) {
            super(...args)
        }
    }
    return AnotherOriginalClass
}
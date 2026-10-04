// @target: es2015
interface A<T>
{
    x: T
}

interface C extends A<string>, A<number> { }

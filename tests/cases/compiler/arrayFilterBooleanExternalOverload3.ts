// @strict: true
// @target: es6
// @declaration: true

// #56013

const symbool = Symbol("MyBooleanSymbol");
declare const MyBoolean: typeof Boolean & { prototype: typeof symbool };
interface Array<T> {
    filter(predicate: typeof MyBoolean): (T extends (0 | 0n | "" | false | null | undefined) ? never : T)[];
}

declare const maybe: boolean;
{
    const id = <T,>() => (t: T) => !!t;

    const result1 = (maybe ? ['foo', 'bar', undefined] : [1] ).filter(MyBoolean);

    result1;

    const result2 = ['foo', 'bar', undefined].filter(MyBoolean); // want id() = (t: string) => boolean

    result2;
}

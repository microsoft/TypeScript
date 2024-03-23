// @strict: true
// @target: es6
// @declaration: true

// #56013

// For reference, thise cases work as expected (no errors) when no external BooleanConstrudtor like overload is present
declare const maybe: boolean;
{
    const id = <T>() => (t: T) => !!t;

    const result1 = (maybe ? ['foo', 'bar', undefined] : [1] ).filter(id());

    result1;

    const result2 = ['foo', 'bar', undefined].filter(id()); // want id() = (t: string) => boolean

    result2;
}

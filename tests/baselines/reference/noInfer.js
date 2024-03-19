//// [tests/cases/conformance/types/typeRelationships/typeInference/noInfer.ts] ////

//// [noInfer.ts]
// NoInfer<T> is erased for primitives

type T00 = NoInfer<string>;
type T01 = NoInfer<string | number | boolean>;
type T02 = NoInfer<undefined>;
type T03 = NoInfer<"foo">;
type T04 = NoInfer<`foo${string}`>;
type T05 = NoInfer<`foo${string}` & `${string}bar`>;
type T06 = NoInfer<{}>;

// NoInfer<T> is preserved for object types

type T10 = NoInfer<string[]>;
type T11 = NoInfer<{ x: string }>;

// NoInfer<T> is erased if it has no effect

type T20<T> = NoInfer<NoInfer<T>>;
type T21<T> = NoInfer<NoInfer<T> & string>;
type T22<T> = NoInfer<NoInfer<T> & string[]>;

// keyof NoInfer<T> is transformed into NoInfer<keyof T>

type T30 = keyof NoInfer<{ a: string, b: string }>;
type T31<T> = keyof NoInfer<T>;
type T32 = { [K in keyof NoInfer<{ a: string, b: string }>]: K };

declare function foo1<T extends string>(a: T, b: NoInfer<T>): void
declare function foo2<T extends string>(a: T, b: NoInfer<T>[]): void
declare function foo3<T extends string>(a: T, b: NoInfer<T[]>): void
declare function foo4<T extends string>(a: T, b: { x: NoInfer<T> }): void
declare function foo5<T extends string>(a: T, b: NoInfer<{ x: T }>): void

foo1('foo', 'foo') // ok
foo1('foo', 'bar') // error
foo2('foo', ['bar']) // error
foo3('foo', ['bar']) // error
foo4('foo', { x: 'bar' }) // error
foo5('foo', { x: 'bar' }) // error

declare class Animal { move(): void }
declare class Dog extends Animal { woof(): void }
declare function doSomething<T>(value: T, getDefault: () => NoInfer<T>): void;

doSomething(new Animal(), () => new Animal()); // ok
doSomething(new Animal(), () => new Dog()); // ok
doSomething(new Dog(), () => new Animal()); // error

declare function assertEqual<T>(actual: T, expected: NoInfer<T>): boolean;

assertEqual({ x: 1 }, { x: 3 }); // ok
const g = { x: 3, y: 2 };
assertEqual(g, { x: 3 }); // error

declare function invoke<T, R>(func: (value: T) => R, value: NoInfer<T>): R;
declare function test(value: { x: number; }): number;

invoke(test, { x: 1, y: 2 }); // error
test({ x: 1, y: 2 }); // error

type Component<Props> = { props: Props; };
declare function doWork<Props>(Component: Component<Props>, props: NoInfer<Props>): void;
declare const comp: Component<{ foo: number }>;

doWork(comp, { foo: 42 }); // ok
doWork(comp, {}); // error

declare function mutate<T>(callback: (a: NoInfer<T>, b: number) => T): T;
const mutate1 = mutate((a, b) => b);

declare class ExampleClass<T> {}
class OkClass<T> {
    constructor(private clazz: ExampleClass<T>, private _value: NoInfer<T>) {}

    get value(): T {
        return this._value; // ok
    }
}
class OkClass2<T> {
    constructor(private clazz: ExampleClass<T>, public _value: NoInfer<T>) {}
}


//// [noInfer.js]
"use strict";
// NoInfer<T> is erased for primitives
foo1('foo', 'foo'); // ok
foo1('foo', 'bar'); // error
foo2('foo', ['bar']); // error
foo3('foo', ['bar']); // error
foo4('foo', { x: 'bar' }); // error
foo5('foo', { x: 'bar' }); // error
doSomething(new Animal(), function () { return new Animal(); }); // ok
doSomething(new Animal(), function () { return new Dog(); }); // ok
doSomething(new Dog(), function () { return new Animal(); }); // error
assertEqual({ x: 1 }, { x: 3 }); // ok
var g = { x: 3, y: 2 };
assertEqual(g, { x: 3 }); // error
invoke(test, { x: 1, y: 2 }); // error
test({ x: 1, y: 2 }); // error
doWork(comp, { foo: 42 }); // ok
doWork(comp, {}); // error
var mutate1 = mutate(function (a, b) { return b; });
var OkClass = /** @class */ (function () {
    function OkClass(clazz, _value) {
        this.clazz = clazz;
        this._value = _value;
    }
    Object.defineProperty(OkClass.prototype, "value", {
        get: function () {
            return this._value; // ok
        },
        enumerable: false,
        configurable: true
    });
    return OkClass;
}());
var OkClass2 = /** @class */ (function () {
    function OkClass2(clazz, _value) {
        this.clazz = clazz;
        this._value = _value;
    }
    return OkClass2;
}());


//// [noInfer.d.ts]
type T00 = NoInfer<string>;
type T01 = NoInfer<string | number | boolean>;
type T02 = NoInfer<undefined>;
type T03 = NoInfer<"foo">;
type T04 = NoInfer<`foo${string}`>;
type T05 = NoInfer<`foo${string}` & `${string}bar`>;
type T06 = NoInfer<{}>;
type T10 = NoInfer<string[]>;
type T11 = NoInfer<{
    x: string;
}>;
type T20<T> = NoInfer<NoInfer<T>>;
type T21<T> = NoInfer<NoInfer<T> & string>;
type T22<T> = NoInfer<NoInfer<T> & string[]>;
type T30 = keyof NoInfer<{
    a: string;
    b: string;
}>;
type T31<T> = keyof NoInfer<T>;
type T32 = {
    [K in keyof NoInfer<{
        a: string;
        b: string;
    }>]: K;
};
declare function foo1<T extends string>(a: T, b: NoInfer<T>): void;
declare function foo2<T extends string>(a: T, b: NoInfer<T>[]): void;
declare function foo3<T extends string>(a: T, b: NoInfer<T[]>): void;
declare function foo4<T extends string>(a: T, b: {
    x: NoInfer<T>;
}): void;
declare function foo5<T extends string>(a: T, b: NoInfer<{
    x: T;
}>): void;
declare class Animal {
    move(): void;
}
declare class Dog extends Animal {
    woof(): void;
}
declare function doSomething<T>(value: T, getDefault: () => NoInfer<T>): void;
declare function assertEqual<T>(actual: T, expected: NoInfer<T>): boolean;
declare const g: {
    x: number;
    y: number;
};
declare function invoke<T, R>(func: (value: T) => R, value: NoInfer<T>): R;
declare function test(value: {
    x: number;
}): number;
type Component<Props> = {
    props: Props;
};
declare function doWork<Props>(Component: Component<Props>, props: NoInfer<Props>): void;
declare const comp: Component<{
    foo: number;
}>;
declare function mutate<T>(callback: (a: NoInfer<T>, b: number) => T): T;
declare const mutate1: unknown;
declare class ExampleClass<T> {
}
declare class OkClass<T> {
    private clazz;
    private _value;
    constructor(clazz: ExampleClass<T>, _value: NoInfer<T>);
    get value(): T;
}
declare class OkClass2<T> {
    private clazz;
    _value: NoInfer<T>;
    constructor(clazz: ExampleClass<T>, _value: NoInfer<T>);
}

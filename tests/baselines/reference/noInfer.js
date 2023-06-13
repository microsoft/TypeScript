//// [tests/cases/conformance/types/typeRelationships/typeInference/noInfer.ts] ////

//// [noInfer.ts]
export declare function foo<T extends string>(a: T, b: NoInfer<T>): void

foo('foo', 'foo') // ok
foo('foo', 'bar') // error

export declare class Animal { move(): void }
export declare class Dog extends Animal { woof(): void }
export declare function doSomething<T>(value: T, getDefault: () => NoInfer<T>): void;

doSomething(new Animal(), () => new Animal()); // ok
doSomething(new Animal(), () => new Dog()); // ok
doSomething(new Dog(), () => new Animal()); // error

export declare function assertEqual<T>(actual: T, expected: NoInfer<T>): boolean;

assertEqual({ x: 1 }, { x: 3 }); // ok
const g = { x: 3, y: 2 };
assertEqual(g, { x: 3 }); // error

export declare function invoke<T, R>(func: (value: T) => R, value: NoInfer<T>): R;
export declare function test(value: { x: number; }): number;

invoke(test, { x: 1, y: 2 }); // error
test({ x: 1, y: 2 }); // error

export type Component<Props> = { props: Props; };
export declare function doWork<Props>(Component: Component<Props>, props: NoInfer<Props>): void;
export declare const comp: Component<{ foo: number }>;

doWork(comp, { foo: 42 }); // ok
doWork(comp, {}); // error

export declare function mutate<T>(callback: (a: NoInfer<T>, b: number) => T): T;
export const mutate1 = mutate((a, b) => b);

export declare class ExampleClass<T> {}
export class OkClass<T> {
    constructor(private clazz: ExampleClass<T>, private _value: NoInfer<T>) {}

    get value(): T {
        return this._value; // ok
    }
}
export class OkClass2<T> {
    constructor(private clazz: ExampleClass<T>, public _value: NoInfer<T>) {}
}


//// [noInfer.js]
foo('foo', 'foo'); // ok
foo('foo', 'bar'); // error
doSomething(new Animal(), () => new Animal()); // ok
doSomething(new Animal(), () => new Dog()); // ok
doSomething(new Dog(), () => new Animal()); // error
assertEqual({ x: 1 }, { x: 3 }); // ok
const g = { x: 3, y: 2 };
assertEqual(g, { x: 3 }); // error
invoke(test, { x: 1, y: 2 }); // error
test({ x: 1, y: 2 }); // error
doWork(comp, { foo: 42 }); // ok
doWork(comp, {}); // error
export const mutate1 = mutate((a, b) => b);
export class OkClass {
    clazz;
    _value;
    constructor(clazz, _value) {
        this.clazz = clazz;
        this._value = _value;
    }
    get value() {
        return this._value; // ok
    }
}
export class OkClass2 {
    clazz;
    _value;
    constructor(clazz, _value) {
        this.clazz = clazz;
        this._value = _value;
    }
}


//// [noInfer.d.ts]
export declare function foo<T extends string>(a: T, b: NoInfer<T>): void;
export declare class Animal {
    move(): void;
}
export declare class Dog extends Animal {
    woof(): void;
}
export declare function doSomething<T>(value: T, getDefault: () => NoInfer<T>): void;
export declare function assertEqual<T>(actual: T, expected: NoInfer<T>): boolean;
export declare function invoke<T, R>(func: (value: T) => R, value: NoInfer<T>): R;
export declare function test(value: {
    x: number;
}): number;
export type Component<Props> = {
    props: Props;
};
export declare function doWork<Props>(Component: Component<Props>, props: NoInfer<Props>): void;
export declare const comp: Component<{
    foo: number;
}>;
export declare function mutate<T>(callback: (a: NoInfer<T>, b: number) => T): T;
export declare const mutate1: unknown;
export declare class ExampleClass<T> {
}
export declare class OkClass<T> {
    private clazz;
    private _value;
    constructor(clazz: ExampleClass<T>, _value: NoInfer<T>);
    get value(): T;
}
export declare class OkClass2<T> {
    private clazz;
    _value: NoInfer<T>;
    constructor(clazz: ExampleClass<T>, _value: NoInfer<T>);
}

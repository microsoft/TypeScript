// @strict: true
// @target: esnext
// @declaration: true

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

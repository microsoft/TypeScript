// @strict: true
// @noEmit: true

export declare function foo<T extends string>(a: T, b: NoInfer<T>): void

foo('foo', 'foo') // ok
foo('foo', 'bar') // error

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


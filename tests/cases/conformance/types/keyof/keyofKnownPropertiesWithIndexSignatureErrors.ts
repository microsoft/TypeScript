interface Foo {
    prop: number;
    [x: string]: number;
}

var x: Partial<Foo>;
x.prop; // ok
x.other; // Error unknown property other

var y: Pick<Foo, keyof Foo>;
y.prop; // ok
y.other; // Error unknown property other


type T2 = { a?: number, [key: string]: any };

let o2: T2 = { a: 'no' }; // error: Type '{ a: string; }' is not assignable to type 'T2'
let p2: Partial<T2> = { a: 'no' }; // error
let p3: { [P in keyof T2]: T2[P]} = { a: 'no' }; // error
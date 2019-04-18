//// [unionOfClassCalls.ts]
declare class Test<T> {
    obj: T;
    get<K extends keyof T>(k: K): T[K];
}

interface A { t: "A" }
interface B { t: "B" }

declare const tmp: Test<A> | Test<B>;

switch (tmp.get('t')) {
    case 'A': break;
    case 'B': break;
}

//// [unionOfClassCalls.js]
switch (tmp.get('t')) {
    case 'A': break;
    case 'B': break;
}

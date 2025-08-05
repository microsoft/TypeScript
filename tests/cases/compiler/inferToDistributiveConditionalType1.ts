// @strict: true
// @noEmit: true

declare class Animal { eat(): void; }
declare class Cat extends Animal { meow(): void; }
declare class Dog extends Animal { bark(): void; }

declare function test1<T>(a: T extends unknown ? { prop: T } : never): T;
declare const arg1: { prop: Dog } | { prop: Cat };
const result1 = test1(arg1);

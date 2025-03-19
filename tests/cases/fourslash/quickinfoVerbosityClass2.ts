/// <reference path='fourslash.ts'/>


//// interface Apple {
////     color: string;
//// }

//// class Foo/*1*/<T> {
////     constructor(public x: T) { }
////     public y!: T;
////     static whatever(): void { }
////     private foo(): Apple { return { color: "green" }; }
////     static {
////         const a = class { x?: Apple; };
////     }
////     protected z = true;
//// }

//// type Whatever/*2*/ = Foo<string>;
//// const a/*3*/ = Foo;
//// const c/*4*/ = Foo<string>;

//// [1].forEach(class/*5*/ <T> {
////     constructor(public x: T) { }
////     public y!: T;
////     static whatever(): void { }
////     private foo(): Apple { return { color: "green" }; }
////     static {
////         const a = class { x?: Apple; };
////     }
////     protected z = true;
//// });

//// const b/*6*/ = Bar<number>;

//// @random()
//// abstract class Animal/*7*/ {
////     name!: string;

////     abstract makeSound(): void;
//// }

//// class Dog/*8*/ {
////     what(this: this, that: Dog) { }
////     #bones: string[];
//// }
//// const d/*9*/ = new Dog();


verify.baselineQuickInfo({
    1: [0, 1, 2],
    2: [0, 1, 2],
    3: [0, 1],
    4: [0],
    5: [0, 1, 2],
    6: [0],
    7: [0, 1],
    8: [0, 1],
    9: [0, 1],
});
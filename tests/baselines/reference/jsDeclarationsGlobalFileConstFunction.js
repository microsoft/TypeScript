//// [tests/cases/compiler/jsDeclarationsGlobalFileConstFunction.ts] ////

//// [file.js]
const SomeConstructor = function () {
	this.x = 1;
};

const SomeConstructor2 = function () {
};
SomeConstructor2.staticMember = "str";

const SomeConstructor3 = function () {
	this.x = 1;
};
SomeConstructor3.staticMember = "str";




//// [file.d.ts]
declare function SomeConstructor(): void;
declare class SomeConstructor {
    x: number;
}
declare function SomeConstructor2(): void;
declare namespace SomeConstructor2 {
    let staticMember: string;
}
declare function SomeConstructor3(): void;
declare namespace SomeConstructor3 {
    let staticMember_1: string;
    export { staticMember_1 as staticMember };
}
declare class SomeConstructor3 {
    x: number;
}

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
declare const SomeConstructor: () => void;
declare function SomeConstructor2(): void;
declare namespace SomeConstructor2 {
    var staticMember: string;
}
declare function SomeConstructor3(): void;
declare namespace SomeConstructor3 {
    var staticMember: string;
}

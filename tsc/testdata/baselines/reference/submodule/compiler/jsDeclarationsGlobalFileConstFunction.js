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
declare const SomeConstructor2: {
    (): void;
    staticMember: string;
};
declare const SomeConstructor3: {
    (): void;
    staticMember: string;
};

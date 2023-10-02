//// [tests/cases/compiler/jsDeclarationsGlobalFileConstFunctionNamed.ts] ////

//// [file.js]
const SomeConstructor = function Named() {
	this.x = 1;
};

const SomeConstructor2 = function Named() {
};
SomeConstructor2.staticMember = "str";

const SomeConstructor3 = function Named() {
	this.x = 1;
};
SomeConstructor3.staticMember = "str";

const SelfReference = function Named() {
    if (!(this instanceof Named)) return new Named();
    this.x = 1;
}
SelfReference.staticMember = "str";




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
declare function SelfReference(): SelfReference;
declare namespace SelfReference {
    let staticMember_2: string;
    export { staticMember_2 as staticMember };
}
declare class SelfReference {
    x: number;
}

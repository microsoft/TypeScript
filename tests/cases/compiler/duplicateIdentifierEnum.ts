// Test the error message when attempting to merge an enum with a class, an interface, or a function.
// @Filename: duplicateIdentifierEnum_A.ts
enum A {
    bar
}
class A {
    foo: number;
}

interface B {
    foo: number;
}
const enum B {
    bar
}

const enum C {

}
function C() {
    return 0;
}

enum D {
    bar
}
class E {
    foo: number;
}
// also make sure the error appears when trying to merge an enum in a separate file.
// @Filename: duplicateIdentifierEnum_B.ts
function D() {
    return 0;
}
enum E {
    bar
}
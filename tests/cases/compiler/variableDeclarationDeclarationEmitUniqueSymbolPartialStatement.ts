// @declaration: true
// @lib: es6
const key = Symbol(), value = 12;

export class Foo {
    [key] = value;
}
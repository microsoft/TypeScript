// @target: esnext
// @experimentalDecorators: true

declare function decorator(target: any, key: any): any;

const b = Symbol('b');
class Foo {
    @decorator declare a: number;
    @decorator declare [b]: number;
}

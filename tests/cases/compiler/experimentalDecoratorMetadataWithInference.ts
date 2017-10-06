// @target: es6
// @module: commonjs
// @emitDecoratorMetadata: true
// @experimentalDecorators: true
// @lib: es6,dom
// @skipLibCheck: true
namespace Reflect {
    export declare const getMetadata: any;
}

class Foo {
    @LogType public str1: string;
    @LogType public str2 = 'hello';
    @LogType public str3 = `hello`;
    @LogType public str4 = `he${"l"}lo`;
    @LogType public num1: number;
    @LogType public num2 = 10;
    @LogType public bool1: boolean;
    @LogType public bool2 = true;
    @LogType public symbol1: symbol;
    @LogType public symbol2 = Symbol.iterator;
    @LogType public func1: () => void;
    @LogType public func2 = () => void 0;
    @LogType public ctor1: new () => void;
    @LogType public ctor2 = class FooInner {};
}

function LogType(target: any, propertyKey: string) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    console.log(type.name);
}
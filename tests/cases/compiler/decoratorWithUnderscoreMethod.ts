// @lib: es5
// @noemithelpers: true
// @experimentaldecorators: true

declare var console : { log(arg: string): void };
function dec(): Function {
    return function (target: any, propKey: string, descr: PropertyDescriptor): void {
        console.log(target[propKey]);
        //logs undefined
        //propKey has three underscores as prefix, but the method has only two underscores
    };
}

class A {
    @dec()
    private __foo(bar: string): void {
        // do something with bar
    }
}
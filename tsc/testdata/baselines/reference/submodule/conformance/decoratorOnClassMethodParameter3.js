//// [tests/cases/conformance/decorators/class/method/parameter/decoratorOnClassMethodParameter3.ts] ////

//// [decoratorOnClassMethodParameter3.ts]
// https://github.com/microsoft/TypeScript/issues/48509
declare function dec(a: any): any;
function fn(value: Promise<number>): any {
  class Class {
    async method(@dec(await value) arg: number) {}
  }
  return Class
}


//// [decoratorOnClassMethodParameter3.js]
function fn(value) {
    class Class {
        async method(arg) { }
    }
    return Class;
}

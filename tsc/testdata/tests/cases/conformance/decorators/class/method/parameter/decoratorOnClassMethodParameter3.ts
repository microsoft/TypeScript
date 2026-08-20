// @target: es2015
// @experimentaldecorators: true

// https://github.com/microsoft/TypeScript/issues/48509
declare function dec(a: any): any;
function fn(value: Promise<number>): any {
  class Class {
    async method(@dec(await value) arg: number) {}
  }
  return Class
}

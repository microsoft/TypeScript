/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @experimentalDecorators: true

// @Filename: /code.ts

//// function classDecorator<T extends Function>() { return (target: T) => target; }
//// function methodDecorator() { return (target: any, key: string, descriptor: PropertyDescriptor) => descriptor;}
//// function parameterDecorator() { return (target: any, key: string, idx: number) => {};}
//// function getterDecorator() { return (target: any, key: string) => {}; }
//// function setterDecorator() { return (target: any, key: string) => {}; }
//// function fieldDecorator()  { return (target: any, key: string) => {}; }
//// function foo() { return 42; }
////
//// @classDecorator()
//// export class A {
////   @methodDecorator()
////   sum(...args: number[]) {
////     return args.reduce((a, b) => a + b, 0);
////   }
////   getSelf() {
////     return this;
////   }
////   passParameter(@parameterDecorator() param = foo()) {}
////   @getterDecorator()
////   get a() {
////     return foo();
////   }
////   @setterDecorator()
////   set a(value) {}
////   @fieldDecorator() classProp = foo();
//// }

verify.codeFixAll({
  fixId: "fixMissingTypeAnnotationOnExports",
  fixAllDescription: ts.Diagnostics.Add_all_missing_type_annotations.message,
  newFileContent:
`function classDecorator<T extends Function>() { return (target: T) => target; }
function methodDecorator() { return (target: any, key: string, descriptor: PropertyDescriptor) => descriptor;}
function parameterDecorator() { return (target: any, key: string, idx: number) => {};}
function getterDecorator() { return (target: any, key: string) => {}; }
function setterDecorator() { return (target: any, key: string) => {}; }
function fieldDecorator()  { return (target: any, key: string) => {}; }
function foo() { return 42; }

@classDecorator()
export class A {
  @methodDecorator()
  sum(...args: number[]): number {
    return args.reduce((a, b) => a + b, 0);
  }
  getSelf(): this {
    return this;
  }
  passParameter(@parameterDecorator() param: number = foo()): void {}
  @getterDecorator()
  get a(): number {
    return foo();
  }
  @setterDecorator()
  set a(value) {}
  @fieldDecorator() classProp: number = foo();
}`
});

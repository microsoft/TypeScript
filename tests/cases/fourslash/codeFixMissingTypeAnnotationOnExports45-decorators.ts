/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @Filename: /code.ts

//// function classDecorator<T extends Function> (value: T, context: ClassDecoratorContext) {}
//// function methodDecorator<This> (
////   target: (...args: number[])=> number,
////   context: ClassMethodDecoratorContext<This, (this: This, ...args: number[]) => number>) {}
//// function getterDecorator(value: Function, context: ClassGetterDecoratorContext) {}
//// function setterDecorator(value: Function, context: ClassSetterDecoratorContext) {}
//// function fieldDecorator(value: undefined, context: ClassFieldDecoratorContext) {}
//// function foo() { return 42;}
////
//// @classDecorator
//// export class A {
////   @methodDecorator
////   sum(...args: number[]) {
////     return args.reduce((a, b) => a + b, 0);
////   }
////   getSelf() {
////     return this;
////   }
////   @getterDecorator
////   get a() {
////     return foo();
////   }
////   @setterDecorator
////   set a(value) {}
////
////   @fieldDecorator classProp = foo();
//// }

verify.codeFixAll({
  fixId: "fixMissingTypeAnnotationOnExports",
  fixAllDescription: ts.Diagnostics.Add_all_missing_type_annotations.message,
  newFileContent:
`function classDecorator<T extends Function> (value: T, context: ClassDecoratorContext) {}
function methodDecorator<This> (
  target: (...args: number[])=> number,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: number[]) => number>) {}
function getterDecorator(value: Function, context: ClassGetterDecoratorContext) {}
function setterDecorator(value: Function, context: ClassSetterDecoratorContext) {}
function fieldDecorator(value: undefined, context: ClassFieldDecoratorContext) {}
function foo() { return 42;}

@classDecorator
export class A {
  @methodDecorator
  sum(...args: number[]): number {
    return args.reduce((a, b) => a + b, 0);
  }
  getSelf(): this {
    return this;
  }
  @getterDecorator
  get a(): number {
    return foo();
  }
  @setterDecorator
  set a(value) {}

  @fieldDecorator classProp: number = foo();
}`
});

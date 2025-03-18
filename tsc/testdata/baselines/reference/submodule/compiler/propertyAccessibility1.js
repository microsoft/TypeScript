//// [tests/cases/compiler/propertyAccessibility1.ts] ////

//// [propertyAccessibility1.ts]
class Foo {
  private privProp = 0;
}
var f = new Foo();
f.privProp;


//// [propertyAccessibility1.js]
class Foo {
    privProp = 0;
}
var f = new Foo();
f.privProp;

//// [tests/cases/compiler/propertyAccessibility2.ts] ////

//// [propertyAccessibility2.ts]
class C {
  private static x = 1;
}
var c = C.x;


//// [propertyAccessibility2.js]
class C {
    static x = 1;
}
var c = C.x;

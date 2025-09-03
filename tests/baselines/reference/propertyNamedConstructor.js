//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyNamedConstructor.ts] ////

//// [propertyNamedConstructor.ts]
class X1 {
  "constructor" = 3; // Error
}

class X2 {
  ["constructor"] = 3;
}


//// [propertyNamedConstructor.js]
class X1 {
    "constructor" = 3; // Error
}
class X2 {
    ["constructor"] = 3;
}

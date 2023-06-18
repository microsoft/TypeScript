//// [tests/cases/compiler/noUncheckedIndexAccess.ts] ////

//// [noUncheckedIndexAccess.ts]
enum Meat {
    Sausage,
    Bacon
  }
  const sausage = Meat.Sausage
  const valueSausage = Meat[sausage]

  const bacon = Meat.Bacon
  const valueBacon = Meat[bacon]

  const union: Meat.Bacon | Meat.Sausage = Meat.Bacon
  const valueUnion = Meat[union]

  //Avoiding a false positive
  const value = Meat[0]

  const valueUndefined = "testing"
  const value2 = Meat[valueUndefined]

  enum A {
    a, b, c
  }
  enum B {
    x, y, z
  }
  
  const value3 = A[B.x];

//// [noUncheckedIndexAccess.js]
var Meat;
(function (Meat) {
    Meat[Meat["Sausage"] = 0] = "Sausage";
    Meat[Meat["Bacon"] = 1] = "Bacon";
})(Meat || (Meat = {}));
var sausage = Meat.Sausage;
var valueSausage = Meat[sausage];
var bacon = Meat.Bacon;
var valueBacon = Meat[bacon];
var union = Meat.Bacon;
var valueUnion = Meat[union];
//Avoiding a false positive
var value = Meat[0];
var valueUndefined = "testing";
var value2 = Meat[valueUndefined];
var A;
(function (A) {
    A[A["a"] = 0] = "a";
    A[A["b"] = 1] = "b";
    A[A["c"] = 2] = "c";
})(A || (A = {}));
var B;
(function (B) {
    B[B["x"] = 0] = "x";
    B[B["y"] = 1] = "y";
    B[B["z"] = 2] = "z";
})(B || (B = {}));
var value3 = A[B.x];

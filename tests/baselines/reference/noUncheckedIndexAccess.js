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

  const t = "testing"
  const value2 = Meat[t]


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
var t = "testing";
var value2 = Meat[t];

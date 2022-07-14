//@noUncheckedIndexedAccess: true
//@strictNullChecks: true

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

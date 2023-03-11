class GenericObject<T extends {} = {}> {
  give(value: T) {
    return value;
  }
}
class GenericNumber<T extends number> {
  give(value: T) {
    return value;
  }
}
class GenericNumberOrString<T extends number | string> {
  give(value: T) {
    return value;
  }
}

function g<T>(type: new () => T): T {
    return new type();
}

const g1 = g(GenericObject);
g1.give({});

const g2 = g(GenericNumber);
g2.give(1);

const g3 = g(GenericNumberOrString);
g3.give(1);
g3.give('1');

// repro from #35636
class C<T> {}
const g4 = g(C);

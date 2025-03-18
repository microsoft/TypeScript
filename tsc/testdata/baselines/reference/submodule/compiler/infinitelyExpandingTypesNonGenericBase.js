//// [tests/cases/compiler/infinitelyExpandingTypesNonGenericBase.ts] ////

//// [infinitelyExpandingTypesNonGenericBase.ts]
class Functionality<V> {
    property: Options<V>;
}

class Base {
}

class A<T> extends Base {
    options: Options<Functionality<T>[]>;
}

interface OptionsBase<T> {
    Options: Options<T>;
}

interface Options<T> extends OptionsBase<T> {
}


function o(type: new () => Base) {
}

o(A);


//// [infinitelyExpandingTypesNonGenericBase.js]
class Functionality {
    property;
}
class Base {
}
class A extends Base {
    options;
}
function o(type) {
}
o(A);

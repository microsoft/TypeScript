//// [tests/cases/compiler/baseExpressionTypeParameters.ts] ////

//// [baseExpressionTypeParameters.ts]
// Repro from #17829

function base<T>() {
    class Base {
        static prop: T;
    }
    return Base;
}

class Gen<T> extends base<T>() {}  // Error, T not in scope
class Spec extends Gen<string> {}

<string>Spec.prop;

//// [baseExpressionTypeParameters.js]
// Repro from #17829
function base() {
    class Base {
        static prop;
    }
    return Base;
}
class Gen extends base() {
} // Error, T not in scope
class Spec extends Gen {
}
Spec.prop;

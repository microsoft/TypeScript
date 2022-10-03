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
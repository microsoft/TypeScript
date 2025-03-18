//// [tests/cases/compiler/recursiveComplicatedClasses.ts] ////

//// [recursiveComplicatedClasses.ts]
class Signature {
    public parameters: ParameterSymbol[] = null;
}

function aEnclosesB(a: Symbol) {
    return true;
}

class Symbol {
    public bound: boolean;
    public visible() {
        var b: TypeSymbol;
        return aEnclosesB(b);
    }

}
class InferenceSymbol extends Symbol {
}

class ParameterSymbol extends InferenceSymbol {
}

class TypeSymbol extends InferenceSymbol {
}

//// [recursiveComplicatedClasses.js]
class Signature {
    parameters = null;
}
function aEnclosesB(a) {
    return true;
}
class Symbol {
    bound;
    visible() {
        var b;
        return aEnclosesB(b);
    }
}
class InferenceSymbol extends Symbol {
}
class ParameterSymbol extends InferenceSymbol {
}
class TypeSymbol extends InferenceSymbol {
}

//// [tests/cases/compiler/parameterReferencesOtherParameter2.ts] ////

//// [parameterReferencesOtherParameter2.ts]
class Model {
    public name: string;
}

class UI {
    constructor(model: Model, foo = model.name)
    {
    }
}

//// [parameterReferencesOtherParameter2.js]
class Model {
    name;
}
class UI {
    constructor(model, foo = model.name) {
    }
}

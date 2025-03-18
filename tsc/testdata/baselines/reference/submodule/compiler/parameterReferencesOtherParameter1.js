//// [tests/cases/compiler/parameterReferencesOtherParameter1.ts] ////

//// [parameterReferencesOtherParameter1.ts]
class Model {
    public name: string;
}

class UI {
    constructor(model: Model, foo:string = model.name)
    {
    }
}

//// [parameterReferencesOtherParameter1.js]
class Model {
    name;
}
class UI {
    constructor(model, foo = model.name) {
    }
}

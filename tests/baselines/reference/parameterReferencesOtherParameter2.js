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
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
var UI = /** @class */ (function () {
    function UI(model, foo) {
        if (foo === void 0) { foo = model.name; }
    }
    return UI;
}());

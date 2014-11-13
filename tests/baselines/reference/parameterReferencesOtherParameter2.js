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
var Model = (function () {
    function Model() {
    }
    return Model;
})();
var UI = (function () {
    function UI(model) {
        var foo = (arguments[1] === void 0) ? model.name : arguments[1];
    }
    return UI;
})();

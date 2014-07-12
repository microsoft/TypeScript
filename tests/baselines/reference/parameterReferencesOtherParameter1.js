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
var Model = (function () {
    function Model() {
    }
    return Model;
})();

var UI = (function () {
    function UI(model, foo) {
        if (typeof foo === "undefined") { foo = model.name; }
    }
    return UI;
})();

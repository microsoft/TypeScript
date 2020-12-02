//// [typeQueryWithReservedWords.ts]
class Controller {
    create() {
    }
    delete() {
    }
    var() {
    }
}

interface IScope {
    create: typeof Controller.prototype.create;  
    delete: typeof Controller.prototype.delete;  // Should not error
    var: typeof Controller.prototype.var;        // Should not error
}


//// [typeQueryWithReservedWords.js]
var Controller = /** @class */ (function () {
    function Controller() {
    }
    var Controller_prototype = Controller.prototype;
    Controller_prototype.create = function () {
    };
    Controller_prototype["delete"] = function () {
    };
    Controller_prototype["var"] = function () {
    };
    return Controller;
}());

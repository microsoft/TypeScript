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
    Controller.prototype.create = function () {
    };
    Controller.prototype["delete"] = function () {
    };
    Controller.prototype["var"] = function () {
    };
    return Controller;
}());

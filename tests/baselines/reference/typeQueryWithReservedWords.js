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
var Controller = (function () {
    function Controller() {
    }
    var proto_1 = Controller.prototype;
    proto_1.create = function () {
    };
    proto_1["delete"] = function () {
    };
    proto_1["var"] = function () {
    };
    return Controller;
}());

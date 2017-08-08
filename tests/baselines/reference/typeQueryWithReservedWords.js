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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Controller = (function () {
    function Controller() {
    }
    Controller.prototype.create = function () {
    };
    Controller.prototype["delete"] = function () {
    };
    Controller.prototype["var"] = function () {
    };
    __names(Controller.prototype, ["create", "delete", "var"]);
    return Controller;
}());

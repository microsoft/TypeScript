"use strict";
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
exports.__esModule = true;
var RM = (function () {
    function RM() {
    }
    RM.prototype.getName = function () {
        return 'rm';
    };
    RM.prototype.getDescription = function () {
        return "\t\t\tDelete file";
    };
    RM.prototype.run = function (configuration) {
        var absoluteWorkspacePath = configuration.workspace.toAbsolutePath(configuration.server);
    };
    __names(RM.prototype, ["getName", "getDescription", "run"]);
    return RM;
}());
exports.RM = RM;

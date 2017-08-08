//// [interfaceContextualType.ts]
export interface IOptions {
    italic?: boolean;
    bold?: boolean;
}
export interface IMap {
    [s: string]: IOptions;
}

class Bug {
    public values: IMap;
    ok() {
        this.values = {};
        this.values['comments'] = { italic: true };
    }
    shouldBeOK() {
        this.values = {
            comments: { italic: true }
        };
    }
}


//// [interfaceContextualType.js]
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
var Bug = (function () {
    function Bug() {
    }
    Bug.prototype.ok = function () {
        this.values = {};
        this.values['comments'] = { italic: true };
    };
    Bug.prototype.shouldBeOK = function () {
        this.values = {
            comments: { italic: true }
        };
    };
    __names(Bug.prototype, ["ok", "shouldBeOK"]);
    return Bug;
}());

//// [lambdaPropSelf.ts]
declare var ko: any;

class Person {
    children: string[];

    constructor (public name: string, children: string[]) {
        this.children = ko.observableArray(children);
    }

    addChild = () => this.children.push("New child");
}


class T {
     fo() {
        var x = this;
    }
}

module M {
    var x = this;
}


//// [lambdaPropSelf.js]
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
var Person = (function () {
    function Person(name, children) {
        var _this = this;
        this.name = name;
        this.addChild = function () { return _this.children.push("New child"); };
        this.children = ko.observableArray(children);
    }
    return Person;
}());
var T = (function () {
    function T() {
    }
    T.prototype.fo = function () {
        var x = this;
    };
    __names(T.prototype, ["fo"]);
    return T;
}());
var M;
(function (M) {
    var x = this;
})(M || (M = {}));

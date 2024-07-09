//// [tests/cases/compiler/lambdaPropSelf.ts] ////

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
var Person = /** @class */ (function () {
    function Person(name, children) {
        var _this = this;
        this.name = name;
        this.addChild = function () { return _this.children.push("New child"); };
        this.children = ko.observableArray(children);
    }
    return Person;
}());
var T = /** @class */ (function () {
    function T() {
    }
    T.prototype.fo = function () {
        var x = this;
    };
    return T;
}());
var M;
(function (M) {
    var x = this;
})(M || (M = {}));

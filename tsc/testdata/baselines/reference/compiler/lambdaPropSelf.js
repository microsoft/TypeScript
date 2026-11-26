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

namespace M {
    var x = this;
}


//// [lambdaPropSelf.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Person {
    constructor(name, children) {
        this.name = name;
        this.addChild = __setFunctionName(() => this.children.push("New child"), "addChild");
        this.children = ko.observableArray(children);
    }
}
class T {
    fo() {
        var x = this;
    }
}
var M;
(function (M) {
    var x = this;
})(M || (M = {}));

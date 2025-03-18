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
class Person {
    name;
    children;
    constructor(name, children) {
        this.name = name;
        this.children = ko.observableArray(children);
    }
    addChild = () => this.children.push("New child");
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

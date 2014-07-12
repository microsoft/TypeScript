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

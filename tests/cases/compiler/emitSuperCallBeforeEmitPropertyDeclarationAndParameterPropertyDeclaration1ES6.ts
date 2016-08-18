// @target: ES6
class A {
    blub = 6;
}


class B extends A {
    blah = 2;
    constructor(public x: number) {
        "use strict";
        'someStringForEgngInject';
        super()
    }
}
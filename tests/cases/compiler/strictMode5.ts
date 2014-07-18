function foo(...args) {
    "use strict"
}

class A {
    m() {
        "use strict"

        var v = () => {
            return this.n();
        };
    }
    n() {}
}

function bar(x: number = 10) {
    "use strict"
}
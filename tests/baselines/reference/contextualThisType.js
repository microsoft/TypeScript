//// [tests/cases/conformance/types/thisType/contextualThisType.ts] ////

//// [contextualThisType.ts]
interface X {
    a: (p: this) => this;
}

interface Y extends X {
}

var x: Y = {
    a(p) {
        return p;
    }
}

var y = x.a(x);


//// [contextualThisType.js]
var x = {
    a: function (p) {
        return p;
    }
};
var y = x.a(x);

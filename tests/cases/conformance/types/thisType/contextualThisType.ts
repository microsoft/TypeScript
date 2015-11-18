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

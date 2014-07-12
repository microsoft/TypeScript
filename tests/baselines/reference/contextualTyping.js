//// [contextualTyping.js]

// CONTEXT: Class property declaration
var C1T5 = (function () {
    function C1T5() {
        this.foo = function (i) {
            return i;
        };
    }
    return C1T5;
})();

// CONTEXT: Module property declaration
var C2T5;
(function (C2T5) {
    C2T5.foo = function (i) {
        return i;
    };
})(C2T5 || (C2T5 = {}));

// CONTEXT: Variable declaration
var c3t1 = (function (s) {
    return s;
});
var c3t2 = ({
    n: 1
});
var c3t3 = [];
var c3t4 = function () {
    return ({});
};
var c3t5 = function (n) {
    return ({});
};
var c3t6 = function (n, s) {
    return ({});
};
var c3t7 = function (n) {
    return n;
};

var c3t8 = function (n) {
    return n;
};
var c3t9 = [[], []];
var c3t10 = [({}), ({})];
var c3t11 = [function (n, s) {
        return s;
    }];
var c3t12 = {
    foo: ({})
};
var c3t13 = ({
    f: function (i, s) {
        return s;
    }
});
var c3t14 = ({
    a: []
});

// CONTEXT: Class property assignment
var C4T5 = (function () {
    function C4T5() {
        this.foo = function (i, s) {
            return s;
        };
    }
    return C4T5;
})();

// CONTEXT: Module property assignment
var C5T5;
(function (C5T5) {
    C5T5.foo;
    C5T5.foo = function (i, s) {
        return s;
    };
})(C5T5 || (C5T5 = {}));

// CONTEXT: Variable assignment
var c6t5;
c6t5 = function (n) {
    return ({});
};

// CONTEXT: Array index assignment
var c7t2;
c7t2[0] = ({ n: 1 });


var objc8 = ({});

objc8.t1 = (function (s) {
    return s;
});
objc8.t2 = ({
    n: 1
});
objc8.t3 = [];
objc8.t4 = function () {
    return ({});
};
objc8.t5 = function (n) {
    return ({});
};
objc8.t6 = function (n, s) {
    return ({});
};
objc8.t7 = function (n) {
    return n;
};

objc8.t8 = function (n) {
    return n;
};
objc8.t9 = [[], []];
objc8.t10 = [({}), ({})];
objc8.t11 = [function (n, s) {
        return s;
    }];
objc8.t12 = {
    foo: ({})
};
objc8.t13 = ({
    f: function (i, s) {
        return s;
    }
});
objc8.t14 = ({
    a: []
});

// CONTEXT: Function call
function c9t5(f) {
}
;
c9t5(function (n) {
    return ({});
});

// CONTEXT: Return statement
var c10t5 = function () {
    return function (n) {
        return ({});
    };
};

// CONTEXT: Newing a class
var C11t5 = (function () {
    function C11t5(f) {
    }
    return C11t5;
})();
;
var i = new C11t5(function (n) {
    return ({});
});

// CONTEXT: Type annotated expression
var c12t1 = (function (s) {
    return s;
});
var c12t2 = ({
    n: 1
});
var c12t3 = [];
var c12t4 = function () {
    return ({});
};
var c12t5 = function (n) {
    return ({});
};
var c12t6 = function (n, s) {
    return ({});
};
var c12t7 = function (n) {
    return n;
};

var c12t8 = function (n) {
    return n;
};
var c12t9 = [[], []];
var c12t10 = [({}), ({})];
var c12t11 = [function (n, s) {
        return s;
    }];
var c12t12 = {
    foo: ({})
};
var c12t13 = ({
    f: function (i, s) {
        return s;
    }
});
var c12t14 = ({
    a: []
});


function EF1(a, b) {
    return a + b;
}

var efv = EF1(1, 2);


function Point(x, y) {
    this.x = x;
    this.y = y;

    return this;
}

Point.origin = new Point(0, 0);

Point.prototype.add = function (dx, dy) {
    return new Point(this.x + dx, this.y + dy);
};

Point.prototype = {
    x: 0,
    y: 0,
    add: function (dx, dy) {
        return new Point(this.x + dx, this.y + dy);
    }
};

var x = {};
//# sourceMappingURL=contextualTyping.js.map

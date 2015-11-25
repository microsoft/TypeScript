// @noImplicitAny: true

const {a: {b = "foo"}} = {
    a: {
    }
};

var foo1: "foo" = b;

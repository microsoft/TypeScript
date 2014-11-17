var x = {
    foo: 1,
    bar: "tt",
    boo: 1 + 5
};

var x2 = {
    foo: 1,
    bar: "tt", boo: 1 + 5
};

function Foo() {
    var typeICalc = {
        clear: {
            "()": [1, 2, 3]
        }
    }
}

// Rule for object literal members for the "value" of the memebr to follow the indent
// of the member, i.e. the relative position of the value is maintained when the member
// is indented.
var x2 = {
    foo:
  3,
    'bar':
              { a: 1, b: 2 }
};

var x = {};
var y = {};
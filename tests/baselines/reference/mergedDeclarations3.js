//// [mergedDeclarations3.ts]
module M {
 export enum Color {
   Red, Green
 }
}
module M {
 export module Color {
   export var Blue = 4;
  }
}
var p = M.Color.Blue; // ok

module M {
    export function foo() {
    }
}

module M {
    module foo {
        export var x = 1;
    }
}

module M {
    export module foo {
        export var y = 2
    }
}

module M {
    module foo {
        export var z = 1;
    }
}

M.foo() // ok
M.foo.x // error
M.foo.y // ok
M.foo.z // error

//// [mergedDeclarations3.js]
var M;
(function (M) {
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
    })(Color = M.Color || (M.Color = {}));
})(M || (M = {}));
(function (M) {
    var Color;
    (function (Color) {
        Color.Blue = 4;
    })(Color = M.Color || (M.Color = {}));
})(M || (M = {}));
var p = M.Color.Blue; // ok
(function (M) {
    function foo() {
    }
    M.foo = foo;
})(M || (M = {}));
(function (M) {
    var foo;
    (function (foo) {
        foo.x = 1;
    })(foo || (foo = {}));
})(M || (M = {}));
(function (M) {
    var foo;
    (function (foo) {
        foo.y = 2;
    })(foo = M.foo || (M.foo = {}));
})(M || (M = {}));
(function (M) {
    var foo;
    (function (foo) {
        foo.z = 1;
    })(foo || (foo = {}));
})(M || (M = {}));
M.foo(); // ok
M.foo.x; // error
M.foo.y; // ok
M.foo.z; // error

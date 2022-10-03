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
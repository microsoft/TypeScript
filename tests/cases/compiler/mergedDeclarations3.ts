namespace M {
 export enum Color {
   Red, Green
 }
}
namespace M {
 export namespace Color {
   export var Blue = 4;
  }
}
var p = M.Color.Blue; // ok

namespace M {
    export function foo() {
    }
}

namespace M {
    namespace foo {
        export var x = 1;
    }
}

namespace M {
    export namespace foo {
        export var y = 2
    }
}

namespace M {
    namespace foo {
        export var z = 1;
    }
}

M.foo() // ok
M.foo.x // error
M.foo.y // ok
M.foo.z // error
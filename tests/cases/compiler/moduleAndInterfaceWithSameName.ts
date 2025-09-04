namespace Foo1 {
    export namespace Bar {
        export var x = 42;
    }

    export interface Bar { 
        y: string;
    }
}

namespace Foo2 {
    namespace Bar {
        export var x = 42;
    }

    export interface Bar {
        y: string;
    }
}

var z2 = Foo2.Bar.y; // Error for using interface name as a value.

namespace Foo3 {
    export namespace Bar {
        export var x = 42;
    }

    interface Bar { 
        y: string;
    }
}
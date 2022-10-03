module Foo1 {
    export module Bar {
        export var x = 42;
    }

    export interface Bar { 
        y: string;
    }
}

module Foo2 {
    module Bar {
        export var x = 42;
    }

    export interface Bar {
        y: string;
    }
}

var z2 = Foo2.Bar.y; // Error for using interface name as a value.

module Foo3 {
    export module Bar {
        export var x = 42;
    }

    interface Bar { 
        y: string;
    }
}
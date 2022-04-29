//@declaration: true
module Outer {
    module Inner {
        export var m: typeof Inner;
    }

    export var f: typeof Inner;
}

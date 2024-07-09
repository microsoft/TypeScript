// @declaration: true
module Outer {
    module Inner {
        export var m: number;
    }

    export var f: typeof Inner; // Since we dont unwind inner any more, it is error here
}

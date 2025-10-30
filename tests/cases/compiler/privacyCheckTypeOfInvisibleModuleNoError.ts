// @declaration: true
namespace Outer {
    namespace Inner {
        export var m: number;
    }

    export var f: typeof Inner; // Since we dont unwind inner any more, it is error here
}

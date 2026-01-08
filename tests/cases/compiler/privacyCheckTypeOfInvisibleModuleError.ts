//@declaration: true
namespace Outer {
    namespace Inner {
        export var m: typeof Inner;
    }

    export var f: typeof Inner;
}

// @declaration: true
namespace a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

namespace c {
    import b = a.weekend;
    export var bVal: b = b.Sunday;
}

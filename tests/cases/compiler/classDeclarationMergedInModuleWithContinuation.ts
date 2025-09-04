namespace M {
    export class N { }
    export namespace N {
        export var v = 0;
    }
}

namespace M {
    export class O extends M.N {
    }
}
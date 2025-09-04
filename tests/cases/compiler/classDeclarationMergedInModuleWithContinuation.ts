namespace M {
    export class N { }
    export module N {
        export var v = 0;
    }
}

namespace M {
    export class O extends M.N {
    }
}
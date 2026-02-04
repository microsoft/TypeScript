// @target: es2015
// @declaration: true

declare namespace A.B.C {
    class B {
    }
}

namespace A.B {
    export class EventManager {
        id: number;

    }
}

namespace A.B.C {
    export class ContextMenu extends EventManager {
        name: string;
    }
}
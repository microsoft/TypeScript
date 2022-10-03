// @declaration: true

declare module A.B.C {
    class B {
    }
}

module A.B {
    export class EventManager {
        id: number;

    }
}

module A.B.C {
    export class ContextMenu extends EventManager {
        name: string;
    }
}
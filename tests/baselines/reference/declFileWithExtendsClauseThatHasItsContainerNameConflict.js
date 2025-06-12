//// [tests/cases/compiler/declFileWithExtendsClauseThatHasItsContainerNameConflict.ts] ////

//// [declFileWithExtendsClauseThatHasItsContainerNameConflict.ts]
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

//// [declFileWithExtendsClauseThatHasItsContainerNameConflict.js]
var A;
(function (A) {
    var B;
    (function (B) {
        class EventManager {
        }
        B.EventManager = EventManager;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
(function (A) {
    var B;
    (function (B) {
        var C;
        (function (C) {
            class ContextMenu extends B.EventManager {
            }
            C.ContextMenu = ContextMenu;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));


//// [declFileWithExtendsClauseThatHasItsContainerNameConflict.d.ts]
declare namespace A.B.C {
    class B {
    }
}
declare namespace A.B {
    class EventManager {
        id: number;
    }
}
declare namespace A.B.C {
    class ContextMenu extends EventManager {
        name: string;
    }
}

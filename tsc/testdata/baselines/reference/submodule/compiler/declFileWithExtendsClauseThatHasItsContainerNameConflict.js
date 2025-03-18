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
    let B;
    (function (B) {
        class EventManager {
            id;
        }
        B.EventManager = EventManager;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
(function (A) {
    let B;
    (function (B) {
        let C;
        (function (C) {
            class ContextMenu extends EventManager {
                name;
            }
            C.ContextMenu = ContextMenu;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));

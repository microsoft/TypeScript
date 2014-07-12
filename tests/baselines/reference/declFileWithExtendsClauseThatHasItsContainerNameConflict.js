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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A;
(function (A) {
    (function (B) {
        var EventManager = (function () {
            function EventManager() {
            }
            return EventManager;
        })();
        B.EventManager = EventManager;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var A;
(function (A) {
    (function (B) {
        (function (C) {
            var ContextMenu = (function (_super) {
                __extends(ContextMenu, _super);
                function ContextMenu() {
                    _super.apply(this, arguments);
                }
                return ContextMenu;
            })(B.EventManager);
            C.ContextMenu = ContextMenu;
        })(B.C || (B.C = {}));
        var C = B.C;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));


////[declFileWithExtendsClauseThatHasItsContainerNameConflict.d.ts]
declare module A.B.C {
    class B {
    }
}
declare module A.B {
    class EventManager {
        public id: number;
    }
}
declare module A.B.C {
    class ContextMenu extends EventManager {
        public name: string;
    }
}

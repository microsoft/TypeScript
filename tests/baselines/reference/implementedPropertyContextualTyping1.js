//// [implementedPropertyContextualTyping1.ts]
interface Event {
    time: number;
}
interface Base {
    superHandle: (e: Event) => number;
}
interface Listener extends Base {
    handle: (e: Event) => void;
}
interface Ringer {
    ring: (times: number) => void;
}
interface StringLiteral {
    literal(): "A";
    literals: "A" | "B";
}

abstract class Watcher {
    abstract watch(e: Event): number;
}

class Alarm extends Watcher implements Listener, Ringer, StringLiteral {
    str: string;
    handle = e => {
        this.str = e.time; // error
    }
    superHandle = e => {
        this.str = e.time; // error
        return e.time;
    }
    ring(times) {
        this.str = times; // error
    }
    watch(e) {
        this.str = e.time; // error
        return e.time;
    }
    literal() {
        return "A"; // ok: "A" is assignable to "A"
    }
    literals = "A"; // ok: "A" is assignable to "A" | "B"
}

interface A {
    q(n: string): void;
}
interface B {
    q(n: number): void;
}
class C {
    r: number;
}
class Multiple extends C implements A, B {
    q(n) {         // error, n is implicitly any because A.q and B.q exist
        n.length;  // and the unioned type has no signature
        n.toFixed; // (even though the constituent types each do)
    }
}


//// [implementedPropertyContextualTyping1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Watcher = (function () {
    function Watcher() {
    }
    return Watcher;
}());
var Alarm = (function (_super) {
    __extends(Alarm, _super);
    function Alarm() {
        var _this = this;
        _super.apply(this, arguments);
        this.handle = function (e) {
            _this.str = e.time; // error
        };
        this.superHandle = function (e) {
            _this.str = e.time; // error
            return e.time;
        };
        this.literals = "A"; // ok: "A" is assignable to "A" | "B"
    }
    Alarm.prototype.ring = function (times) {
        this.str = times; // error
    };
    Alarm.prototype.watch = function (e) {
        this.str = e.time; // error
        return e.time;
    };
    Alarm.prototype.literal = function () {
        return "A"; // ok: "A" is assignable to "A"
    };
    return Alarm;
}(Watcher));
var C = (function () {
    function C() {
    }
    return C;
}());
var Multiple = (function (_super) {
    __extends(Multiple, _super);
    function Multiple() {
        _super.apply(this, arguments);
    }
    Multiple.prototype.q = function (n) {
        n.length; // and the unioned type has no signature
        n.toFixed; // (even though the constituent types each do)
    };
    return Multiple;
}(C));

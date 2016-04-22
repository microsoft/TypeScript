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
    p: string;
    q(n: string): void;
    r: string;
    s: string;
}
interface B {
    p: number;
    q(n: number): void;
    r: boolean;
    s: string;
}
class C {
    r: number;
}
class Multiple extends C implements A, B {
    p = undefined; // error, Multiple.p is implicitly any because A.p and B.p exist
    q(n) {         // error, n is implicitly any because A.q and B.q exist
        n.length;
        n.toFixed;
    }
    r = null;     // OK, C.r wins over A.r and B.r
    s = null;     // OK, A.s and B.s match
}
let multiple = new Multiple();
multiple.r.toFixed; // OK, C.r wins so Multiple.r: number
multiple.r.length;  // error, Multiple.r: number
multiple.s.length;   // OK, A.s and B.s match.


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
        this.p = undefined; // error, Multiple.p is implicitly any because A.p and B.p exist
        this.r = null; // OK, C.r wins over A.r and B.r
        this.s = null; // OK, A.s and B.s match
    }
    Multiple.prototype.q = function (n) {
        n.length;
        n.toFixed;
    };
    return Multiple;
}(C));
var multiple = new Multiple();
multiple.r.toFixed; // OK, C.r wins so Multiple.r: number
multiple.r.length; // error, Multiple.r: number
multiple.s.length; // OK, A.s and B.s match.

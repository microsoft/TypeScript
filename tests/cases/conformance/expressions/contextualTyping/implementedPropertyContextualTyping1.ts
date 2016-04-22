// @noImplicitAny: true
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

}
interface B {
    p: number;
    q(n: number): void;
    r: boolean;
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
}
let multiple = new Multiple();
multiple.r.toFixed; // OK, C.r wins so Multiple.r: number
multiple.r.length;  // error, Multiple.r: number

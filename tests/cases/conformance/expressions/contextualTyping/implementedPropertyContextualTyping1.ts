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
        this.str = e.time;
    }
    superHandle = e => {
        this.str = e.time;
        return e.time;
    }
    ring(times) {
        this.str = times;
    }
    watch(e) {
        this.str = e.time;
        return e.time;
    }
    literal() {
        return "A";
    }
    literals = "A";
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
    p = undefined;
    q(n) {
        n.length;
        n.toFixed;
    }
    r = null;
    s = null;
}
let multiple = new Multiple();
multiple.r.toFixed;
multiple.r.length;
multiple.s.length;

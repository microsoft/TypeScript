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

//// [tests/cases/compiler/privateAccessorLogicalAssignment.ts] ////

//// [privateAccessorLogicalAssignment.ts]
const log: string[] = [];
function rhs() {
    log.push("rhs");
    return 2;
}

class C {
    value: number | null | undefined = 0;
    get #f() {
        log.push("get");
        return this.value;
    }
    set #f(value: number | null | undefined) {
        log.push("set " + value);
        this.value = value;
    }
    and() {
        return this.#f &&= rhs();
    }
    or() {
        return (this.#f) ||= rhs();
    }
    coalesce() {
        return (this.#f as number | null | undefined) ??= rhs();
    }
    static and(receiver: () => C) {
        return receiver().#f &&= rhs();
    }
    static or(receiver: () => C) {
        return receiver().#f ||= rhs();
    }
    static coalesce(receiver: () => C) {
        return receiver().#f ??= rhs();
    }
    static andIdentifier(receiver: C) {
        return receiver.#f &&= rhs();
    }
}

class S {
    static value: number | null | undefined = 0;
    static get #f() {
        log.push("get");
        return this.value;
    }
    static set #f(value: number | null | undefined) {
        log.push("set " + value);
        this.value = value;
    }
    static and() {
        return this.#f &&= rhs();
    }
    static or() {
        return this.#f ||= rhs();
    }
    static coalesce() {
        return this.#f ??= rhs();
    }
}

class ReadOnly {
    get #f() { return 0; }
    #m() {}
    run() {
        // @ts-expect-error
        this.#f &&= rhs();
        // @ts-expect-error
        this.#m ||= rhs();
        // @ts-expect-error
        this.#m ??= rhs();
    }
}


//// [privateAccessorLogicalAssignment.js]
"use strict";
const log = [];
function rhs() {
    log.push("rhs");
    return 2;
}
class C {
    value = 0;
    get #f() {
        log.push("get");
        return this.value;
    }
    set #f(value) {
        log.push("set " + value);
        this.value = value;
    }
    and() {
        return this.#f &&= rhs();
    }
    or() {
        return (this.#f) ||= rhs();
    }
    coalesce() {
        return this.#f ??= rhs();
    }
    static and(receiver) {
        return receiver().#f &&= rhs();
    }
    static or(receiver) {
        return receiver().#f ||= rhs();
    }
    static coalesce(receiver) {
        return receiver().#f ??= rhs();
    }
    static andIdentifier(receiver) {
        return receiver.#f &&= rhs();
    }
}
class S {
    static value = 0;
    static get #f() {
        log.push("get");
        return this.value;
    }
    static set #f(value) {
        log.push("set " + value);
        this.value = value;
    }
    static and() {
        return this.#f &&= rhs();
    }
    static or() {
        return this.#f ||= rhs();
    }
    static coalesce() {
        return this.#f ??= rhs();
    }
}
class ReadOnly {
    get #f() { return 0; }
    #m() { }
    run() {
        // @ts-expect-error
        this.#f &&= rhs();
        // @ts-expect-error
        this.#m ||= rhs();
        // @ts-expect-error
        this.#m ??= rhs();
    }
}

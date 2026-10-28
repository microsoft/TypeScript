// @strict: true
// @noEmit: true

type Type = I32 | Str;
interface Str { group: "none"; kind: "str"; }
interface I32 { group: "scalar"; kind: "i32"; }

declare function takeI32(value: I32): void;
declare function inferKind<T>(value: { kind: T }): T;

function testThis<T extends Type>(this: T): I32 | undefined {
    if (this.group === "scalar") {
        const value: I32 = this;
        takeI32(this);
        this satisfies I32;
        const arrow = (): I32 => this;
        return this;
    }
}

function testParameter<T extends Type>(o: T): I32 | undefined {
    if (o.group === "scalar") {
        const value: I32 = o;
        takeI32(o);
        o satisfies I32;
        const arrow = (): I32 => o;
        return o;
    }
}

function testAliasedThis<T extends Type>(this: T): I32 | undefined {
    const o = this;
    if (o.group === "scalar") {
        const value: I32 = o;
        takeI32(o);
        o satisfies I32;
        const arrow = (): I32 => o;
        return o;
    }
}

function testInferenceThis<T extends Type>(this: T) {
    if (this.group === "scalar") {
        const kind = inferKind(this);
    }
}

function testInferenceParameter<T extends Type>(o: T) {
    if (o.group === "scalar") {
        const kind = inferKind(o);
    }
}

function testInferenceAliasedThis<T extends Type>(this: T) {
    const o = this;
    if (o.group === "scalar") {
        const kind = inferKind(o);
    }
}

const contextual: { method<T extends Type>(this: T): I32 | undefined } = {
    method() {
        if (this.group === "scalar") {
            return this;
        }
    },
};

const contextualAliased: { method<T extends Type>(this: T): I32 | undefined } = {
    method() {
        const o = this;
        if (o.group === "scalar") {
            return o;
        }
    },
};

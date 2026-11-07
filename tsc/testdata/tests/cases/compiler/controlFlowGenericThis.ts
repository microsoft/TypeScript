// @strict: true
// @noEmit: true

type Type = I32 | Str;
interface Str { group: "none"; kind: "str"; }
interface I32 { group: "scalar"; kind: "i32"; }

function testThis<T extends Type>(this: T) {
    switch (this.group) {
        case "none": return;
        case "scalar":
            switch (this.kind) {
                case "str": // Error, just as for an ordinary parameter.
                case "i32":
            }
    }
}

function testParameter<T extends Type>(o: T) {
    switch (o.group) {
        case "none": return;
        case "scalar":
            switch (o.kind) {
                case "str":
                case "i32":
            }
    }
}

function testAliasedThis<T extends Type>(this: T) {
    const o = this;
    switch (o.group) {
        case "none": return;
        case "scalar":
            switch (o.kind) {
                case "str":
                case "i32":
            }
    }
}

function testAccess<T extends Type>(this: T): T {
    if (this.group === "scalar") {
        const kind: "i32" = this.kind;
        const indexedKind: "i32" = this["kind"];
        const arrow = () => {
            const kind: "i32" = this.kind;
        };
        return this;
    }
    const kind: "str" = this.kind;
    return this;
}

function testAliasedAccess<T extends Type>(this: T): T {
    const o = this;
    if (o.group === "scalar") {
        const kind: "i32" = o.kind;
        const indexedKind: "i32" = o["kind"];
        const arrow = () => {
            const kind: "i32" = o.kind;
        };
        return o;
    }
    const kind: "str" = o.kind;
    return o;
}

function testGenericIndex<T extends Type, K extends keyof T>(this: T, key: K): T[K] {
    return this[key];
}

// @strictNullChecks: true

// Repro from #10257 plus other tests

interface Foo {
    kind: "foo";
    name: string;
}

interface Bar {
    kind: "bar";
    length: string;
}

function f1(x: Foo | Bar | string) {
    if (typeof x !== 'string') {
        switch(x.kind) {
            case 'foo':
                x.name;
        }
    }
}

function f2(x: Foo | Bar | string | undefined) {
    if (typeof x === "object") {
        switch(x.kind) {
            case 'foo':
                x.name;
        }
    }
}

function f3(x: Foo | Bar | string | null) {
    if (x && typeof x !== "string") {
        switch(x.kind) {
            case 'foo':
                x.name;
        }
    }
}

function f4(x: Foo | Bar | string | number | null) {
    if (x && typeof x === "object") {
        switch(x.kind) {
            case 'foo':
                x.name;
        }
    }
}

// Repro from #31319

const enum EnumTypeNode {
    Pattern = "Pattern",
    Disjunction = "Disjunction",
}

type NodeA = Disjunction | Pattern;

interface NodeBase {
    type: NodeA["type"]
}

interface Disjunction extends NodeBase {
    type: EnumTypeNode.Disjunction
    alternatives: string[]
}

interface Pattern extends NodeBase {
    type: EnumTypeNode.Pattern
    elements: string[]
}

let n!: NodeA

if (n.type === "Disjunction") {
    n.alternatives.slice()
}
else {
    n.elements.slice() // n should be narrowed to Pattern
}

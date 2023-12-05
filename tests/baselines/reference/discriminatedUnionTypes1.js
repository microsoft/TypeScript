//// [tests/cases/conformance/types/union/discriminatedUnionTypes1.ts] ////

//// [discriminatedUnionTypes1.ts]
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area1(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "circle") {
        return Math.PI * s.radius * s.radius;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else {
        return 0;
    }
}

function area2(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
}

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function area3(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default: return assertNever(s);
    }
}

function area4(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
    return assertNever(s);
}

type Message =
    { kind: "A", x: string } |
    { kind: "B" | "C", y: number } |
    { kind: "D" };

function f1(m: Message) {
    if (m.kind === "A") {
        m;  // { kind: "A", x: string }
    }
    else if (m.kind === "D") {
        m;  // { kind: "D" }
    }
    else {
        m;  // { kind: "B" | "C", y: number }
    }
}

function f2(m: Message) {
    if (m.kind === "A") {
        return;
    }
    m;  // { kind: "B" | "C", y: number } | { kind: "D" }
}

function f3(m: Message) {
    if (m.kind === "X") {
        m;  // never
    }
}

function f4(m: Message, x: "A" | "D") {
    if (m.kind == x) {
        m;  // { kind: "A", x: string } | { kind: "D" }
    }
}

function f5(m: Message) {
    switch (m.kind) {
        case "A":
            m;  // { kind: "A", x: string }
            break;
        case "D":
            m;  // { kind: "D" }
            break;
        default:
            m;  // { kind: "B" | "C", y: number }
    }
}

function f6(m: Message) {
    switch (m.kind) {
        case "A":
            m;  // { kind: "A", x: string }
        case "D":
            m;  // { kind: "A", x: string } | { kind: "D" }
            break;
        default:
            m;  // { kind: "B" | "C", y: number }
    }
}

function f7(m: Message) {
    switch (m.kind) {
        case "A":
        case "B":
            return;
    }
    m;  // { kind: "B" | "C", y: number } | { kind: "D" }
}

function f8(m: Message) {
    switch (m.kind) {
        case "A":
            return;
        case "D":
            throw new Error();
    }
    m;  // { kind: "B" | "C", y: number }
}

//// [discriminatedUnionTypes1.js]
function area1(s) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "circle") {
        return Math.PI * s.radius * s.radius;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else {
        return 0;
    }
}
function area2(s) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
}
function assertNever(x) {
    throw new Error("Unexpected object: " + x);
}
function area3(s) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default: return assertNever(s);
    }
}
function area4(s) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
    return assertNever(s);
}
function f1(m) {
    if (m.kind === "A") {
        m; // { kind: "A", x: string }
    }
    else if (m.kind === "D") {
        m; // { kind: "D" }
    }
    else {
        m; // { kind: "B" | "C", y: number }
    }
}
function f2(m) {
    if (m.kind === "A") {
        return;
    }
    m; // { kind: "B" | "C", y: number } | { kind: "D" }
}
function f3(m) {
    if (m.kind === "X") {
        m; // never
    }
}
function f4(m, x) {
    if (m.kind == x) {
        m; // { kind: "A", x: string } | { kind: "D" }
    }
}
function f5(m) {
    switch (m.kind) {
        case "A":
            m; // { kind: "A", x: string }
            break;
        case "D":
            m; // { kind: "D" }
            break;
        default:
            m; // { kind: "B" | "C", y: number }
    }
}
function f6(m) {
    switch (m.kind) {
        case "A":
            m; // { kind: "A", x: string }
        case "D":
            m; // { kind: "A", x: string } | { kind: "D" }
            break;
        default:
            m; // { kind: "B" | "C", y: number }
    }
}
function f7(m) {
    switch (m.kind) {
        case "A":
        case "B":
            return;
    }
    m; // { kind: "B" | "C", y: number } | { kind: "D" }
}
function f8(m) {
    switch (m.kind) {
        case "A":
            return;
        case "D":
            throw new Error();
    }
    m; // { kind: "B" | "C", y: number }
}

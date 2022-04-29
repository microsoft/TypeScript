// @declaration: true

type Kind = "A" | "B"

interface Entity {
    kind: Kind;
}

interface A extends Entity {
    kind: "A";
    a: number;
}

interface B extends Entity {
    kind: "B";
    b: string;
}

// Currently (2015-12-14), we write '"A" | "A"' and '"B" | "B"' to avoid
// interpreting respective overloads as "specialized" signatures.
// That way, we can avoid the need to look for a compatible overload
// signature and simply check compatibility with the implementation.
function hasKind(entity: Entity, kind: "A" | "A"): entity is A;
function hasKind(entity: Entity, kind: "B" | "B"): entity is B;
function hasKind(entity: Entity, kind: Kind): entity is Entity {
    return entity.kind === kind;
}

let x: A = {
    kind: "A",
    a: 100,
}

if (hasKind(x, "A")) {
    let a = x;
}
else {
    let b = x;
}

if (!hasKind(x, "B")) {
    let c = x;
}
else {
    let d = x;
}
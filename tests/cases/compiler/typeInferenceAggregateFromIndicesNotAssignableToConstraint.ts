// @strict: true
// @noEmit: true

interface Expression extends Node {
    _expressionBrand: any;
}

declare function setParent<T extends Node>(child: T, parent: T["parent"] | undefined): T;

interface Node {
    readonly kind: number;
    readonly parent: Node;
}

declare const expr: Expression
declare const node: Node

const res = setParent(expr, node) // Expression
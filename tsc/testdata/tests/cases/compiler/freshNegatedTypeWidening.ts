// @strict: true
// @declaration: true

interface BaseNode {
    kind: number;
}

interface WrappedNode extends BaseNode {
    expression: BaseNode;
}

declare function isWrappedNode(node: BaseNode): node is WrappedNode;

function assertWrappedNode(node: BaseNode) {
    if (!isWrappedNode(node)) {
        return node as WrappedNode;
    }
    return node;
}

declare const explicitlyUnwrapped: BaseNode & not WrappedNode;
explicitlyUnwrapped as WrappedNode;

function skipWrappers(node: WrappedNode): WrappedNode;
function skipWrappers(node: BaseNode): BaseNode;
function skipWrappers(node: BaseNode) {
    while (isWrappedNode(node)) {
        node = node.expression;
    }
    return node;
}

interface NamedNode extends BaseNode {
    name: string;
}

declare function isSpecialNode(node: BaseNode): node is WrappedNode | NamedNode;

function skipSpecialNodes(node: WrappedNode): WrappedNode;
function skipSpecialNodes(node: BaseNode): BaseNode;
function skipSpecialNodes(node: BaseNode) {
    while (isSpecialNode(node)) {
        node = { kind: 0 };
    }
    return node;
}

function isOrdinaryNode(node: BaseNode) {
    return !isSpecialNode(node);
}

declare const candidate: BaseNode;
if (!isOrdinaryNode(candidate)) {
    candidate.kind;
}

function assertString(value: {}) {
    if (typeof value !== "string") {
        return value as string;
    }
    return value;
}

declare const explicitlyNotString: {} & not string;
explicitlyNotString as string;

function skipStrings(value: string): string;
function skipStrings(value: {}): {};
function skipStrings(value: {}) {
    while (typeof value === "string") {
        value = {};
    }
    return value;
}

function isNotString(value: {}) {
    return typeof value !== "string";
}

declare const nonNullValue: {};
if (!isNotString(nonNullValue)) {
    nonNullValue.toString();
}
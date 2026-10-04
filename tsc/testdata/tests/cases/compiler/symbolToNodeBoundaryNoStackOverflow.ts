// @noEmit: true
// @strict: true

// Regression test for https://github.com/microsoft/TypeScript/issues/63441
// In createAnonymousTypeNodeEx for an InstantiationExpressionType, when the
// existing typeof node failed to be reused (e.g. its entity name isn't
// accessible from the current scope), the recovery boundary's fallback path
// re-entered typeToTypeNode with the same instantiation type, which would
// try to reuse the same node again, recursing without bound.
// The fix marks the type as visited around the reuse attempt so the inner
// recursion bottoms out via the existing visitedTypes guard.

export interface CustomNode<P> {
    getNextNode: () => CustomNode<P>;
}

export declare const createNode: () => {
    getNextNode: <T>() => CustomNode<T>;
};

function wrapNode<T>(getNode: () => CustomNode<T>) {
    return getNode;
}

wrapNode(() => {
    const node = createNode();

    return wrapNode<typeof node.getNextNode<any>>(node.getNextNode);
});

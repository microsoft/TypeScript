/// <reference path="factory.ts" />
/// <reference path="transform.generated.ts" />
/* @internal */
namespace ts.transform {
    export interface TransformerCacheControl<TNode extends Node> {
        shouldCachePreviousNodes(node: TNode): boolean;
        cacheNode(node: TNode): TNode;
    }
    
    export class Transformer {
        private resolver: TransformResolver;
        
        constructor(resolver: TransformResolver) {
            this.resolver = resolver;
        }
        
        public shouldTransformNode(node: Node): boolean {
            return false;
        }
        
        public shouldVisitChildrenOfNode(node: Node): boolean {
            return false;
        }
        
        public transformNode<TNode extends Node>(node: TNode): TNode {
            if (this.shouldVisitChildrenOfNode(node)) {
                return visitChildren(node, this);
            }
            
            return node;
        }
    }
    
    export function visit<TNode extends Node>(node: TNode, transformer: Transformer): TNode {
        if (!node || !transformer) {
            return node;
        }
        
        let transformed: TNode;
        if (transformer.shouldTransformNode(node)) {
            transformed = transformer.transformNode(node);
        }
        else if (transformer.shouldVisitChildrenOfNode(node)) {
            transformed = visitChildren(node, transformer);
        }
        
        if (transformed && transformed !== node) {
            aggregateTransformFlags(transformed);
        }
        
        return transformed;
    }
    
    export function visitNodes<TNode extends Node>(nodes: NodeArray<TNode>, transformer: Transformer, cache?: TransformerCacheControl<TNode>, removeMissingNodes?: boolean): NodeArray<TNode> {
        if (!nodes || !transformer) {
            return nodes;
        }

        let updatedNodes: TNode[];
        let updatedOffset = 0;
        let cacheOffset = 0;
        
        for (var i = 0; i < nodes.length; i++) {
            let updatedIndex = i - updatedOffset;
            let node = nodes[i];
            if (cache && cache.shouldCachePreviousNodes(node)) {
                if (!updatedNodes) {
                    updatedNodes = nodes.slice(0, i);
                }

                while (cacheOffset < updatedIndex) {
                    updatedNodes[cacheOffset] = cache.cacheNode(updatedNodes[cacheOffset]);
                    cacheOffset++;
                }

                cacheOffset = updatedIndex;
            }
            
            let updatedNode = visit(node, transformer);
            if ((updatedNodes || updatedNode !== node || (!updatedNode && removeMissingNodes))) {
                if (!updatedNodes) {
                    updatedNodes = nodes.slice(0, i);
                }
                if (!updatedNode && removeMissingNodes) {
                    updatedOffset++;
                }
                else {
                    updatedNodes[i - updatedOffset] = updatedNode;
                }
            }
        }

        if (updatedNodes) {
            return factory.setTextRange(
                factory.createNodeArray(updatedNodes),
                nodes
            );
        }

        return nodes;
    }
    
    let transformFlags: TransformFlags;
    
    function aggregateChildTransformFlags(child: Node) {
        let saveTransformFlags = transformFlags;
        aggregateTransformFlags(child);
        transformFlags = saveTransformFlags | (transformFlags & ~TransformFlags.ThisNodeFlags);
    }
    
    export function aggregateTransformFlags(node: Node) {
        transformFlags = node.transformFlags;
        if (transformFlags === undefined) {
            forEachChild(node, aggregateChildTransformFlags);
            
            // TODO(rbuckton): Aggregate transform flags for each node type
            switch (node.kind) {
                
            }
            
            node.transformFlags = transformFlags;
        }
    }
}
/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            if (node.transformFlags & TransformFlags.ESNext) {
                return visitorWorker(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsESNext) {
                return visitEachChild(node, visitor, context);
            }
            else {
                return node;
            }
        }

        function visitorWorker(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(node as ObjectLiteralExpression);
                default:
                    Debug.failBadSyntaxKind(node);
                    return visitEachChild(node, visitor, context);
            }
        }

        function chunkObjectLiteralElements(elements: ObjectLiteralElement[]): Expression[] {
            let chunkObject: (ShorthandPropertyAssignment | PropertyAssignment)[];
            const objects: Expression[] = [];
            for (const e of elements) {
                if (e.kind === SyntaxKind.SpreadAssignment) {
                    if (chunkObject) {
                        objects.push(createObjectLiteral(chunkObject));
                        chunkObject = undefined;
                    }
                    const target = (e as SpreadAssignment).expression;
                    objects.push(visitNode(target, visitor, isExpression));
                }
                else {
                    if (!chunkObject) {
                        chunkObject = [];
                    }
                    if (e.kind === SyntaxKind.PropertyAssignment) {
                        const p = e as PropertyAssignment;
                        chunkObject.push(createPropertyAssignment(p.name, visitNode(p.initializer, visitor, isExpression)));
                    }
                    else {
                        chunkObject.push(e as ShorthandPropertyAssignment);
                    }
                }
            }
            if (chunkObject) {
                objects.push(createObjectLiteral(chunkObject));
            }

            return objects;
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression): Expression {
            // spread elements emit like so:
            // non-spread elements are chunked together into object literals, and then all are passed to __assign:
            //     { a, ...o, b } => __assign({a}, o, {b});
            // If the first element is a spread element, then the first argument to __assign is {}:
            //     { ...o, a, b, ...o2 } => __assign({}, o, {a, b}, o2)
            const objects = chunkObjectLiteralElements(node.properties);
            if (objects.length && objects[0].kind !== SyntaxKind.ObjectLiteralExpression) {
                objects.unshift(createObjectLiteral());
            }
            return createCall(createIdentifier("__assign"), undefined, objects);
        }
    }
}

import {
    AssignmentExpression,
    Block,
    ClassLikeDeclaration,
    ClassStaticBlockDeclaration,
    EqualsToken,
    ExpressionStatement,
    getOrCreateEmitNode,
    Identifier,
    isAssignmentExpression,
    isClassDeclaration,
    isClassStaticBlockDeclaration,
    isExpressionStatement,
    isIdentifier,
    Node,
    NodeArray,
    NodeFactory,
    setSourceMapRange,
    setTextRange,
    some,
    Statement,
    SyntaxKind,
    ThisExpression,
} from "../_namespaces/ts.js";

/**
 * Creates a class `static {}` block used to assign the static `this` to a `_classThis` (or similar) variable.
 *
 * @param classThis The identifier to use for the captured static `this` reference, usually with the name `_classThis`.
 * @param thisExpression Overrides the expression to use for the actual `this` reference. This can be used to provide an
 * expression that has already had its `EmitFlags` set or may have been tracked to prevent substitution.
 */
function createClassThisAssignmentBlock(factory: NodeFactory, classThis: Identifier, thisExpression = factory.createThis()): ClassThisAssignmentBlock {
    // produces:
    //
    //  static { _classThis = this; }
    //

    const expression = factory.createAssignment(classThis, thisExpression);
    const statement = factory.createExpressionStatement(expression);
    const body = factory.createBlock([statement], /*multiLine*/ false);
    const block = factory.createClassStaticBlockDeclaration(body);

    // We use `emitNode.classThis` to indicate this is a `_classThis` assignment helper block
    // and to stash the variable used for `_classThis`.
    getOrCreateEmitNode(block).classThis = classThis;

    return block as ClassThisAssignmentBlock;
}

/** @internal */
export type ClassThisAssignmentBlock = ClassStaticBlockDeclaration & {
    readonly body: Block & {
        readonly statements:
            & NodeArray<Statement>
            & readonly [
                ExpressionStatement & {
                    readonly expression: AssignmentExpression<EqualsToken> & {
                        readonly left: Identifier;
                        readonly right: ThisExpression;
                    };
                },
            ];
    };
};

/**
 * Gets whether a node is a `static {}` block containing only a single assignment of the static `this` to the `_classThis`
 * (or similar) variable stored in the `classthis` property of the block's `EmitNode`.
 * @internal
 */
export function isClassThisAssignmentBlock(node: Node): node is ClassThisAssignmentBlock {
    if (!isClassStaticBlockDeclaration(node) || node.body.statements.length !== 1) {
        return false;
    }

    const statement = node.body.statements[0];
    return isExpressionStatement(statement) &&
        isAssignmentExpression(statement.expression, /*excludeCompoundAssignment*/ true) &&
        isIdentifier(statement.expression.left) &&
        node.emitNode?.classThis === statement.expression.left &&
        statement.expression.right.kind === SyntaxKind.ThisKeyword;
}

/**
 * Gets whether a `ClassLikeDeclaration` has a `static {}` block containing only a single assignment to a
 * `_classThis` (or similar) variable.
 * @internal
 */
export function classHasClassThisAssignment(node: ClassLikeDeclaration): boolean {
    return !!node.emitNode?.classThis && some(node.members, isClassThisAssignmentBlock);
}

/**
 * Injects a class `static {}` block containing only an assignment of the static `this` to a `_classThis` (or similar)
 * variable.
 *
 * @param classThis The identifier to use for the captured static `this` reference, usually with the name `_classThis`.
 * @param thisExpression Overrides the expression to use for the actual `this` reference. This can be used to provide an
 * expression that has already had its `EmitFlags` set or may have been tracked to prevent substitution.
 * @internal
 */
export function injectClassThisAssignmentIfMissing<T extends ClassLikeDeclaration>(factory: NodeFactory, node: T, classThis: Identifier, thisExpression?: ThisExpression): Extract<ClassLikeDeclaration, Pick<T, "kind">>;
export function injectClassThisAssignmentIfMissing<T extends ClassLikeDeclaration>(factory: NodeFactory, node: T, classThis: Identifier, thisExpression?: ThisExpression) {
    // given:
    //
    //  class C {
    //  }
    //
    // produces:
    //
    //  class C {
    //      static { _classThis = this; }
    //  }

    if (classHasClassThisAssignment(node)) {
        return node;
    }

    const staticBlock = createClassThisAssignmentBlock(factory, classThis, thisExpression);
    if (node.name) {
        setSourceMapRange(staticBlock.body.statements[0], node.name);
    }

    const members = factory.createNodeArray([staticBlock, ...node.members]);
    setTextRange(members, node.members);

    const updatedNode = isClassDeclaration(node) ?
        factory.updateClassDeclaration(
            node,
            node.modifiers,
            node.name,
            node.typeParameters,
            node.heritageClauses,
            members,
        ) :
        factory.updateClassExpression(
            node,
            node.modifiers,
            node.name,
            node.typeParameters,
            node.heritageClauses,
            members,
        );

    getOrCreateEmitNode(updatedNode).classThis = classThis;
    return updatedNode;
}

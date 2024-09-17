import {
    ast,
    BinaryOperator,
    CallChain,
    cast,
    ClassElement,
    ConciseBody,
    ElementAccessChain,
    Expression,
    identity,
    isLeftHandSideExpression,
    isNodeArray,
    isUnaryExpression,
    JSDocClassReference,
    JSDocNamespaceDeclaration,
    JSDocPropertyLikeTag,
    JsxNamespacedName,
    LeftHandSideExpression,
    LiteralExpression,
    ModuleBody,
    NamedTupleMember,
    Node,
    NodeArray,
    NodeFactory,
    NonNullChain,
    ObjectLiteralElement,
    ParenthesizerRules,
    PropertyAccessChain,
    Statement,
    SyntaxKind,
    TypeElement,
    TypeNode,
    UnaryExpression
} from "../_namespaces/ts.js";

/** @internal */
export function createParenthesizerRules(factory: NodeFactory): ParenthesizerRules {
    const astRules = factory.astFactory.parenthesizer;

    let binaryLeftOperandParenthesizerCache: Map<BinaryOperator, (node: Expression) => Expression> | undefined;
    let binaryRightOperandParenthesizerCache: Map<BinaryOperator, (node: Expression) => Expression> | undefined;

    return {
        getParenthesizeLeftSideOfBinaryForOperator,
        getParenthesizeRightSideOfBinaryForOperator,
        parenthesizeLeftSideOfBinary,
        parenthesizeRightSideOfBinary,
        parenthesizeExpressionOfComputedPropertyName,
        parenthesizeConditionOfConditionalExpression,
        parenthesizeBranchOfConditionalExpression,
        parenthesizeExpressionOfExportDefault,
        parenthesizeExpressionOfNew,
        parenthesizeLeftSideOfAccess,
        parenthesizeOperandOfPostfixUnary,
        parenthesizeOperandOfPrefixUnary,
        parenthesizeExpressionsOfCommaDelimitedList,
        parenthesizeExpressionForDisallowedComma,
        parenthesizeExpressionOfExpressionStatement,
        parenthesizeConciseBodyOfArrowFunction,
        parenthesizeCheckTypeOfConditionalType,
        parenthesizeExtendsTypeOfConditionalType,
        parenthesizeConstituentTypesOfUnionType,
        parenthesizeConstituentTypeOfUnionType,
        parenthesizeConstituentTypesOfIntersectionType,
        parenthesizeConstituentTypeOfIntersectionType,
        parenthesizeOperandOfTypeOperator,
        parenthesizeOperandOfReadonlyTypeOperator,
        parenthesizeNonArrayTypeOfPostfixType,
        parenthesizeElementTypesOfTupleType,
        parenthesizeElementTypeOfTupleType,
        parenthesizeTypeOfOptionalType,
        parenthesizeTypeArguments,
        parenthesizeLeadingTypeArgument,
    };

    function getParenthesizeLeftSideOfBinaryForOperator(operatorKind: BinaryOperator) {
        binaryLeftOperandParenthesizerCache ||= new Map();
        let parenthesizerRule = binaryLeftOperandParenthesizerCache.get(operatorKind);
        if (!parenthesizerRule) {
            parenthesizerRule = node => parenthesizeLeftSideOfBinary(operatorKind, node);
            binaryLeftOperandParenthesizerCache.set(operatorKind, parenthesizerRule);
        }
        return parenthesizerRule;
    }

    function getParenthesizeRightSideOfBinaryForOperator(operatorKind: BinaryOperator) {
        binaryRightOperandParenthesizerCache ||= new Map();
        let parenthesizerRule = binaryRightOperandParenthesizerCache.get(operatorKind);
        if (!parenthesizerRule) {
            parenthesizerRule = node => parenthesizeRightSideOfBinary(operatorKind, /*leftSide*/ undefined, node);
            binaryRightOperandParenthesizerCache.set(operatorKind, parenthesizerRule);
        }
        return parenthesizerRule;
    }

    function parenthesizeLeftSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression): Expression {
        return astRules.parenthesizeLeftSideOfBinary(binaryOperator, asNode(leftSide).ast).node;
    }

    function parenthesizeRightSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression | undefined, rightSide: Expression): Expression {
        return astRules.parenthesizeRightSideOfBinary(binaryOperator, asNode(leftSide)?.ast, asNode(rightSide).ast).node;
    }

    function parenthesizeExpressionOfComputedPropertyName(expression: Expression): Expression {
        return astRules.parenthesizeExpressionOfComputedPropertyName(asNode(expression).ast).node;
    }

    function parenthesizeConditionOfConditionalExpression(condition: Expression): Expression {
        return astRules.parenthesizeConditionOfConditionalExpression(asNode(condition).ast).node;
    }

    function parenthesizeBranchOfConditionalExpression(branch: Expression): Expression {
        return astRules.parenthesizeBranchOfConditionalExpression(asNode(branch).ast).node;
    }

    function parenthesizeExpressionOfExportDefault(expression: Expression): Expression {
        return astRules.parenthesizeExpressionOfExportDefault(asNode(expression).ast).node;
    }

    function parenthesizeExpressionOfNew(expression: Expression): LeftHandSideExpression {
        return astRules.parenthesizeExpressionOfNew(asNode(expression).ast).node;
    }

    function parenthesizeLeftSideOfAccess(expression: Expression, optionalChain?: boolean): LeftHandSideExpression {
        return astRules.parenthesizeLeftSideOfAccess(asNode(expression).ast, optionalChain).node;
    }

    function parenthesizeOperandOfPostfixUnary(operand: Expression): LeftHandSideExpression {
        return astRules.parenthesizeOperandOfPostfixUnary(asNode(operand).ast).node;
    }

    function parenthesizeOperandOfPrefixUnary(operand: Expression): UnaryExpression {
        return astRules.parenthesizeOperandOfPrefixUnary(asNode(operand).ast).node;
    }

    function parenthesizeExpressionsOfCommaDelimitedList(elements: NodeArray<Expression>): NodeArray<Expression> {
        return astRules.parenthesizeExpressionsOfCommaDelimitedList(asNodeArray(elements).ast).nodes;
    }

    function parenthesizeExpressionForDisallowedComma(expression: Expression): Expression {
        return astRules.parenthesizeExpressionForDisallowedComma(asNode(expression).ast).node;
    }

    function parenthesizeExpressionOfExpressionStatement(expression: Expression): Expression {
        return astRules.parenthesizeExpressionOfExpressionStatement(asNode(expression).ast).node;
    }

    function parenthesizeConciseBodyOfArrowFunction(body: Expression): Expression;
    function parenthesizeConciseBodyOfArrowFunction(body: ConciseBody): ConciseBody;
    function parenthesizeConciseBodyOfArrowFunction(body: ConciseBody): ConciseBody {
        return astRules.parenthesizeConciseBodyOfArrowFunction(asNode(body).ast).node;
    }

    function parenthesizeCheckTypeOfConditionalType(checkType: TypeNode): TypeNode {
        return astRules.parenthesizeCheckTypeOfConditionalType(asNode(checkType).ast).node;
    }

    function parenthesizeExtendsTypeOfConditionalType(extendsType: TypeNode): TypeNode {
        return astRules.parenthesizeExtendsTypeOfConditionalType(asNode(extendsType).ast).node;
    }

    function parenthesizeConstituentTypeOfUnionType(type: TypeNode): TypeNode {
        return astRules.parenthesizeConstituentTypeOfUnionType(asNode(type).ast).node;
    }

    function parenthesizeConstituentTypesOfUnionType(members: readonly TypeNode[]): NodeArray<TypeNode> {
        return astRules.parenthesizeConstituentTypesOfUnionType(asNodeArray(members).ast).nodes;
    }

    function parenthesizeConstituentTypeOfIntersectionType(type: TypeNode): TypeNode {
        return astRules.parenthesizeConstituentTypeOfIntersectionType(asNode(type).ast).node;
    }

    function parenthesizeConstituentTypesOfIntersectionType(members: readonly TypeNode[]): NodeArray<TypeNode> {
        return astRules.parenthesizeConstituentTypesOfIntersectionType(asNodeArray(members).ast).nodes;
    }

    function parenthesizeOperandOfTypeOperator(type: TypeNode) {
        return astRules.parenthesizeOperandOfTypeOperator(asNode(type).ast).node;
    }

    function parenthesizeOperandOfReadonlyTypeOperator(type: TypeNode) {
        return astRules.parenthesizeOperandOfReadonlyTypeOperator(asNode(type).ast).node;
    }

    function parenthesizeNonArrayTypeOfPostfixType(type: TypeNode) {
        return astRules.parenthesizeNonArrayTypeOfPostfixType(asNode(type).ast).node;
    }

    function parenthesizeElementTypesOfTupleType(types: readonly (TypeNode | NamedTupleMember)[]): NodeArray<TypeNode> {
        return astRules.parenthesizeElementTypesOfTupleType(asNodeArray(types).ast).nodes;
    }

    function parenthesizeElementTypeOfTupleType(type: TypeNode | NamedTupleMember): TypeNode {
        return astRules.parenthesizeElementTypeOfTupleType(asNode(type).ast).node;
    }

    function parenthesizeTypeOfOptionalType(type: TypeNode): TypeNode {
        return astRules.parenthesizeTypeOfOptionalType(asNode(type).ast).node;
    }

    function parenthesizeLeadingTypeArgument(node: TypeNode) {
        return astRules.parenthesizeLeadingTypeArgument(asNode(node).ast).node;
    }

    function parenthesizeTypeArguments(typeArguments: NodeArray<TypeNode> | undefined): NodeArray<TypeNode> | undefined {
        return astRules.parenthesizeTypeArguments(asNodeArray(typeArguments)?.ast)?.nodes;
    }

    type ToNode<T extends Node> =
        Expression extends T ? ast.Expression :
        Statement extends T ? ast.Statement :
        TypeNode extends T ? ast.TypeNode :
        TypeElement extends T ? ast.TypeElement :
        ClassElement extends T ? ast.ClassElement :
        ObjectLiteralElement extends T ? ast.ObjectLiteralElement :
        PropertyAccessChain extends T ? ast.PropertyAccessChain :
        ElementAccessChain extends T ? ast.ElementAccessChain :
        CallChain extends T ? ast.CallChain :
        NonNullChain extends T ? ast.NonNullChain :
        ModuleBody extends T ? ast.ModuleBody :
        LiteralExpression extends T ? ast.LiteralExpression :
        JSDocNamespaceDeclaration extends T ? ast.JSDocNamespaceDeclaration :
        JSDocPropertyLikeTag extends T ? ast.JSDocPropertyLikeTag :
        JSDocClassReference extends T ? ast.JSDocClassReference :
        JsxNamespacedName extends T ? ast.JsxNamespacedName :
        ast.NodeType[T["kind"]];

    function asNode<T extends Node>(node: T): ToNode<T>;
    function asNode<T extends Node>(node: T | undefined): ToNode<T> | undefined;
    function asNode(node: Node | undefined): ast.Node | undefined {
        return node as ast.Node | undefined;
    }

    function asNodeArray<T extends Node>(array: readonly T[]): ast.NodeArray<ToNode<T>>;
    function asNodeArray<T extends Node>(array: readonly T[] | undefined): ast.NodeArray<ToNode<T>> | undefined;
    function asNodeArray(array: readonly Node[] | undefined): ast.NodeArray<ast.Node> | undefined {
        return array ? factory.createNodeArray(array) as ast.NodeArray<ast.Node> : undefined;
    }
}

/** @internal */
export const nullParenthesizerRules: ParenthesizerRules = {
    getParenthesizeLeftSideOfBinaryForOperator: _ => identity,
    getParenthesizeRightSideOfBinaryForOperator: _ => identity,
    parenthesizeLeftSideOfBinary: (_binaryOperator, leftSide) => leftSide,
    parenthesizeRightSideOfBinary: (_binaryOperator, _leftSide, rightSide) => rightSide,
    parenthesizeExpressionOfComputedPropertyName: identity,
    parenthesizeConditionOfConditionalExpression: identity,
    parenthesizeBranchOfConditionalExpression: identity,
    parenthesizeExpressionOfExportDefault: identity,
    parenthesizeExpressionOfNew: expression => cast(expression, isLeftHandSideExpression),
    parenthesizeLeftSideOfAccess: expression => cast(expression, isLeftHandSideExpression),
    parenthesizeOperandOfPostfixUnary: operand => cast(operand, isLeftHandSideExpression),
    parenthesizeOperandOfPrefixUnary: operand => cast(operand, isUnaryExpression),
    parenthesizeExpressionsOfCommaDelimitedList: nodes => cast(nodes, isNodeArray),
    parenthesizeExpressionForDisallowedComma: identity,
    parenthesizeExpressionOfExpressionStatement: identity,
    parenthesizeConciseBodyOfArrowFunction: identity,
    parenthesizeCheckTypeOfConditionalType: identity,
    parenthesizeExtendsTypeOfConditionalType: identity,
    parenthesizeConstituentTypesOfUnionType: nodes => cast(nodes, isNodeArray),
    parenthesizeConstituentTypeOfUnionType: identity,
    parenthesizeConstituentTypesOfIntersectionType: nodes => cast(nodes, isNodeArray),
    parenthesizeConstituentTypeOfIntersectionType: identity,
    parenthesizeOperandOfTypeOperator: identity,
    parenthesizeOperandOfReadonlyTypeOperator: identity,
    parenthesizeNonArrayTypeOfPostfixType: identity,
    parenthesizeElementTypesOfTupleType: nodes => cast(nodes, isNodeArray),
    parenthesizeElementTypeOfTupleType: identity,
    parenthesizeTypeOfOptionalType: identity,
    parenthesizeTypeArguments: nodes => nodes && cast(nodes, isNodeArray),
    parenthesizeLeadingTypeArgument: identity,
};

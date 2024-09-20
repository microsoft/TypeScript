import {
    BinaryOperator,
    cast,
    ConciseBody,
    Expression,
    identity,
    isLeftHandSideExpression,
    isNodeArray,
    isUnaryExpression,
    LeftHandSideExpression,
    NamedTupleMember,
    Node,
    NodeArray,
    NodeFactory,
    ParenthesizerRules,
    SyntaxKind,
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
        return astRules.parenthesizeLeftSideOfBinary(binaryOperator, leftSide.ast).node;
    }

    function parenthesizeRightSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression | undefined, rightSide: Expression): Expression {
        return astRules.parenthesizeRightSideOfBinary(binaryOperator, leftSide?.ast, rightSide.ast).node;
    }

    function parenthesizeExpressionOfComputedPropertyName(expression: Expression): Expression {
        return astRules.parenthesizeExpressionOfComputedPropertyName(expression.ast).node;
    }

    function parenthesizeConditionOfConditionalExpression(condition: Expression): Expression {
        return astRules.parenthesizeConditionOfConditionalExpression(condition.ast).node;
    }

    function parenthesizeBranchOfConditionalExpression(branch: Expression): Expression {
        return astRules.parenthesizeBranchOfConditionalExpression(branch.ast).node;
    }

    function parenthesizeExpressionOfExportDefault(expression: Expression): Expression {
        return astRules.parenthesizeExpressionOfExportDefault(expression.ast).node;
    }

    function parenthesizeExpressionOfNew(expression: Expression): LeftHandSideExpression {
        return astRules.parenthesizeExpressionOfNew(expression.ast).node;
    }

    function parenthesizeLeftSideOfAccess(expression: Expression, optionalChain?: boolean): LeftHandSideExpression {
        return astRules.parenthesizeLeftSideOfAccess(expression.ast, optionalChain).node;
    }

    function parenthesizeOperandOfPostfixUnary(operand: Expression): LeftHandSideExpression {
        return astRules.parenthesizeOperandOfPostfixUnary(operand.ast).node;
    }

    function parenthesizeOperandOfPrefixUnary(operand: Expression): UnaryExpression {
        return astRules.parenthesizeOperandOfPrefixUnary(operand.ast).node;
    }

    function parenthesizeExpressionsOfCommaDelimitedList(elements: NodeArray<Expression>): NodeArray<Expression> {
        return astRules.parenthesizeExpressionsOfCommaDelimitedList(asNodeArray(elements).ast).nodes;
    }

    function parenthesizeExpressionForDisallowedComma(expression: Expression): Expression {
        return astRules.parenthesizeExpressionForDisallowedComma(expression.ast).node;
    }

    function parenthesizeExpressionOfExpressionStatement(expression: Expression): Expression {
        return astRules.parenthesizeExpressionOfExpressionStatement(expression.ast).node;
    }

    function parenthesizeConciseBodyOfArrowFunction(body: Expression): Expression;
    function parenthesizeConciseBodyOfArrowFunction(body: ConciseBody): ConciseBody;
    function parenthesizeConciseBodyOfArrowFunction(body: ConciseBody): ConciseBody {
        return astRules.parenthesizeConciseBodyOfArrowFunction(body.ast).node;
    }

    function parenthesizeCheckTypeOfConditionalType(checkType: TypeNode): TypeNode {
        return astRules.parenthesizeCheckTypeOfConditionalType(checkType.ast).node;
    }

    function parenthesizeExtendsTypeOfConditionalType(extendsType: TypeNode): TypeNode {
        return astRules.parenthesizeExtendsTypeOfConditionalType(extendsType.ast).node;
    }

    function parenthesizeConstituentTypeOfUnionType(type: TypeNode): TypeNode {
        return astRules.parenthesizeConstituentTypeOfUnionType(type.ast).node;
    }

    function parenthesizeConstituentTypesOfUnionType(members: readonly TypeNode[]): NodeArray<TypeNode> {
        return astRules.parenthesizeConstituentTypesOfUnionType(asNodeArray(members).ast).nodes;
    }

    function parenthesizeConstituentTypeOfIntersectionType(type: TypeNode): TypeNode {
        return astRules.parenthesizeConstituentTypeOfIntersectionType(type.ast).node;
    }

    function parenthesizeConstituentTypesOfIntersectionType(members: readonly TypeNode[]): NodeArray<TypeNode> {
        return astRules.parenthesizeConstituentTypesOfIntersectionType(asNodeArray(members).ast).nodes;
    }

    function parenthesizeOperandOfTypeOperator(type: TypeNode) {
        return astRules.parenthesizeOperandOfTypeOperator(type.ast).node;
    }

    function parenthesizeOperandOfReadonlyTypeOperator(type: TypeNode) {
        return astRules.parenthesizeOperandOfReadonlyTypeOperator(type.ast).node;
    }

    function parenthesizeNonArrayTypeOfPostfixType(type: TypeNode) {
        return astRules.parenthesizeNonArrayTypeOfPostfixType(type.ast).node;
    }

    function parenthesizeElementTypesOfTupleType(types: readonly (TypeNode | NamedTupleMember)[]): NodeArray<TypeNode> {
        return astRules.parenthesizeElementTypesOfTupleType(asNodeArray(types).ast).nodes;
    }

    function parenthesizeElementTypeOfTupleType(type: TypeNode | NamedTupleMember): TypeNode {
        return astRules.parenthesizeElementTypeOfTupleType(type.ast).node;
    }

    function parenthesizeTypeOfOptionalType(type: TypeNode): TypeNode {
        return astRules.parenthesizeTypeOfOptionalType(type.ast).node;
    }

    function parenthesizeLeadingTypeArgument(node: TypeNode) {
        return astRules.parenthesizeLeadingTypeArgument(node.ast).node;
    }

    function parenthesizeTypeArguments(typeArguments: NodeArray<TypeNode> | undefined): NodeArray<TypeNode> | undefined {
        return astRules.parenthesizeTypeArguments(asNodeArray(typeArguments)?.ast)?.nodes;
    }

    function asNodeArray<T extends Node>(array: readonly T[]): NodeArray<T>;
    function asNodeArray<T extends Node>(array: readonly T[] | undefined): NodeArray<T> | undefined;
    function asNodeArray(array: readonly Node[] | undefined): NodeArray<Node> | undefined {
        return array ? factory.createNodeArray(array) : undefined;
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

import * as ts from "typescript";
import { IDisabledInterval, RuleFailure } from "./rule/rule";
export declare function getSourceFile(fileName: string, source: string): ts.SourceFile;
/** @deprecated See IDisabledInterval. */
export declare function doesIntersect(failure: RuleFailure, disabledIntervals: IDisabledInterval[]): boolean;
/**
 * @returns true if any modifier kinds passed along exist in the given modifiers array
 *
 * @deprecated use `hasModifier` from `tsutils`
 */
export declare function hasModifier(modifiers: ts.ModifiersArray | undefined, ...modifierKinds: ts.SyntaxKind[]): boolean;
/**
 * Determines if the appropriate bit in the parent (VariableDeclarationList) is set,
 * which indicates this is a "let" or "const".
 *
 * @deprecated use `isBlockScopedVariableDeclarationList` from `tsutils`
 */
export declare function isBlockScopedVariable(node: ts.VariableDeclaration | ts.VariableStatement): boolean;
/** @deprecated use `isBlockScopedVariableDeclarationList` and `getDeclarationOfBindingElement` from `tsutils` */
export declare function isBlockScopedBindingElement(node: ts.BindingElement): boolean;
/** @deprecated use `getDeclarationOfBindingElement` from `tsutils` */
export declare function getBindingElementVariableDeclaration(node: ts.BindingElement): ts.VariableDeclaration | null;
/**
 * Finds a child of a given node with a given kind.
 * Note: This uses `node.getChildren()`, which does extra parsing work to include tokens.
 *
 * @deprecated use `getChildOfKind` from `tsutils`
 */
export declare function childOfKind(node: ts.Node, kind: ts.SyntaxKind): ts.Node | undefined;
/**
 * @returns true if some ancestor of `node` satisfies `predicate`, including `node` itself.
 *
 * @deprecated no longer used, use a `while` loop instead
 */
export declare function someAncestor(node: ts.Node, predicate: (n: ts.Node) => boolean): boolean;
export declare function ancestorWhere<T extends ts.Node = ts.Node>(node: ts.Node, predicate: ((n: ts.Node) => n is T) | ((n: ts.Node) => boolean)): T | undefined;
/** @deprecated use `isBinaryExpression(node) && isAssignmentKind(node.operatorToken.kind)` with functions from `tsutils` */
export declare function isAssignment(node: ts.Node): boolean;
/**
 * Bitwise check for node flags.
 *
 * @deprecated use `isNodeFlagSet` from `tsutils`
 */
export declare function isNodeFlagSet(node: ts.Node, flagToCheck: ts.NodeFlags): boolean;
/**
 * Bitwise check for combined node flags.
 *
 * @deprecated no longer used
 */
export declare function isCombinedNodeFlagSet(node: ts.Node, flagToCheck: ts.NodeFlags): boolean;
/**
 * Bitwise check for combined modifier flags.
 *
 * @deprecated no longer used
 */
export declare function isCombinedModifierFlagSet(node: ts.Node, flagToCheck: ts.ModifierFlags): boolean;
/**
 * Bitwise check for type flags.
 *
 * @deprecated use `isTypeFlagSet` from `tsutils`
 */
export declare function isTypeFlagSet(type: ts.Type, flagToCheck: ts.TypeFlags): boolean;
/**
 * Bitwise check for symbol flags.
 *
 * @deprecated use `isSymbolFlagSet` from `tsutils`
 */
export declare function isSymbolFlagSet(symbol: ts.Symbol, flagToCheck: ts.SymbolFlags): boolean;
/**
 * Bitwise check for object flags.
 * Does not work with TypeScript 2.0.x
 *
 * @deprecated use `isObjectFlagSet` from `tsutils`
 */
export declare function isObjectFlagSet(objectType: ts.ObjectType, flagToCheck: ts.ObjectFlags): boolean;
/**
 * @returns true if decl is a nested module declaration, i.e. represents a segment of a dotted module path.
 *
 * @deprecated use `decl.parent!.kind === ts.SyntaxKind.ModuleDeclaration`
 */
export declare function isNestedModuleDeclaration(decl: ts.ModuleDeclaration): boolean;
export declare function unwrapParentheses(node: ts.Expression): ts.Expression;
/** @deprecated use `isFunctionScopeBoundary` from `tsutils` */
export declare function isScopeBoundary(node: ts.Node): boolean;
/** @deprecated use `isBlockScopeBoundary` from `tsutils` */
export declare function isBlockScopeBoundary(node: ts.Node): boolean;
/** @deprecated use `isIterationStatement` from `tsutils` or `typescript` */
export declare function isLoop(node: ts.Node): node is ts.IterationStatement;
/**
 * @returns Whether node is a numeric expression.
 */
export declare function isNumeric(node: ts.Expression): boolean;
export interface TokenPosition {
    /** The start of the token including all trivia before it */
    fullStart: number;
    /** The start of the token */
    tokenStart: number;
    /** The end of the token */
    end: number;
}
export declare type ForEachTokenCallback = (fullText: string, kind: ts.SyntaxKind, pos: TokenPosition, parent: ts.Node) => void;
export declare type ForEachCommentCallback = (fullText: string, kind: ts.SyntaxKind, pos: TokenPosition) => void;
export declare type FilterCallback = (node: ts.Node) => boolean;
/**
 * Iterate over all tokens of `node`
 *
 * @description JsDoc comments are treated like regular comments and only visited if `skipTrivia` === false.
 *
 * @param node The node whose tokens should be visited
 * @param skipTrivia If set to false all trivia preceeding `node` or any of its children is included
 * @param cb Is called for every token of `node`. It gets the full text of the SourceFile and the position of the token within that text.
 * @param filter If provided, will be called for every Node and Token found. If it returns false `cb` will not be called for this subtree.
 *
 * @deprecated use `forEachToken` or `forEachTokenWithTrivia` from `tsutils`
 */
export declare function forEachToken(node: ts.Node, skipTrivia: boolean, cb: ForEachTokenCallback, filter?: FilterCallback): void;
/**
 * Iterate over all comments owned by `node` or its children
 *
 * @deprecated use `forEachComment` from `tsutils`
 */
export declare function forEachComment(node: ts.Node, cb: ForEachCommentCallback): void;
/**
 * Checks if there are any comments between `position` and the next non-trivia token
 *
 * @param text The text to scan
 * @param position The position inside `text` where to start scanning. Make sure that this is a valid start position.
 *                 This value is typically obtained from `node.getFullStart()` or `node.getEnd()`
 */
export declare function hasCommentAfterPosition(text: string, position: number): boolean;
export interface EqualsKind {
    isPositive: boolean;
    isStrict: boolean;
}
export declare function getEqualsKind(node: ts.BinaryOperatorToken): EqualsKind | undefined;
export declare function isStrictNullChecksEnabled(options: ts.CompilerOptions): boolean;
export declare function isNegativeNumberLiteral(node: ts.Node): node is ts.PrefixUnaryExpression & {
    operand: ts.NumericLiteral;
};
/** Wrapper for compatibility with typescript@<2.3.1 */
export declare function isWhiteSpace(ch: number): boolean;

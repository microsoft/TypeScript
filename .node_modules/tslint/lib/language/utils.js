"use strict";
/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var tsutils_1 = require("tsutils");
var ts = require("typescript");
function getSourceFile(fileName, source) {
    var normalizedName = path.normalize(fileName).replace(/\\/g, "/");
    return ts.createSourceFile(normalizedName, source, ts.ScriptTarget.ES5, /*setParentNodes*/ true);
}
exports.getSourceFile = getSourceFile;
/** @deprecated See IDisabledInterval. */
function doesIntersect(failure, disabledIntervals) {
    return disabledIntervals.some(function (interval) {
        var maxStart = Math.max(interval.startPosition, failure.getStartPosition().getPosition());
        var minEnd = Math.min(interval.endPosition, failure.getEndPosition().getPosition());
        return maxStart <= minEnd;
    });
}
exports.doesIntersect = doesIntersect;
/**
 * @returns true if any modifier kinds passed along exist in the given modifiers array
 *
 * @deprecated use `hasModifier` from `tsutils`
 */
function hasModifier(modifiers) {
    var modifierKinds = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        modifierKinds[_i - 1] = arguments[_i];
    }
    if (modifiers === undefined || modifierKinds.length === 0) {
        return false;
    }
    return modifiers.some(function (m) { return modifierKinds.some(function (k) { return m.kind === k; }); });
}
exports.hasModifier = hasModifier;
/**
 * Determines if the appropriate bit in the parent (VariableDeclarationList) is set,
 * which indicates this is a "let" or "const".
 *
 * @deprecated use `isBlockScopedVariableDeclarationList` from `tsutils`
 */
function isBlockScopedVariable(node) {
    if (node.kind === ts.SyntaxKind.VariableDeclaration) {
        var parent = node.parent;
        return parent.kind === ts.SyntaxKind.CatchClause || tsutils_1.isBlockScopedVariableDeclarationList(parent);
    }
    else {
        return tsutils_1.isBlockScopedVariableDeclarationList(node.declarationList);
    }
}
exports.isBlockScopedVariable = isBlockScopedVariable;
/** @deprecated use `isBlockScopedVariableDeclarationList` and `getDeclarationOfBindingElement` from `tsutils` */
function isBlockScopedBindingElement(node) {
    var variableDeclaration = getBindingElementVariableDeclaration(node); // tslint:disable-line:deprecation
    // if no variable declaration, it must be a function param, which is block scoped
    return (variableDeclaration === null) || isBlockScopedVariable(variableDeclaration); // tslint:disable-line:deprecation
}
exports.isBlockScopedBindingElement = isBlockScopedBindingElement;
/** @deprecated use `getDeclarationOfBindingElement` from `tsutils` */
function getBindingElementVariableDeclaration(node) {
    var currentParent = node.parent;
    while (currentParent.kind !== ts.SyntaxKind.VariableDeclaration) {
        if (currentParent.parent === undefined) {
            return null; // function parameter, no variable declaration
        }
        else {
            currentParent = currentParent.parent;
        }
    }
    return currentParent;
}
exports.getBindingElementVariableDeclaration = getBindingElementVariableDeclaration;
/**
 * Finds a child of a given node with a given kind.
 * Note: This uses `node.getChildren()`, which does extra parsing work to include tokens.
 *
 * @deprecated use `getChildOfKind` from `tsutils`
 */
function childOfKind(node, kind) {
    return node.getChildren().find(function (child) { return child.kind === kind; });
}
exports.childOfKind = childOfKind;
/**
 * @returns true if some ancestor of `node` satisfies `predicate`, including `node` itself.
 *
 * @deprecated no longer used, use a `while` loop instead
 */
function someAncestor(node, predicate) {
    return predicate(node) || (node.parent !== undefined && someAncestor(node.parent, predicate)); // tslint:disable-line:deprecation
}
exports.someAncestor = someAncestor;
function ancestorWhere(node, predicate) {
    var cur = node;
    do {
        if (predicate(cur)) {
            return cur;
        }
        cur = cur.parent;
    } while (cur !== undefined);
    return undefined;
}
exports.ancestorWhere = ancestorWhere;
/** @deprecated use `isBinaryExpression(node) && isAssignmentKind(node.operatorToken.kind)` with functions from `tsutils` */
function isAssignment(node) {
    if (node.kind === ts.SyntaxKind.BinaryExpression) {
        var binaryExpression = node;
        return binaryExpression.operatorToken.kind >= ts.SyntaxKind.FirstAssignment
            && binaryExpression.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
    }
    else {
        return false;
    }
}
exports.isAssignment = isAssignment;
/**
 * Bitwise check for node flags.
 *
 * @deprecated use `isNodeFlagSet` from `tsutils`
 */
function isNodeFlagSet(node, flagToCheck) {
    // tslint:disable-next-line:no-bitwise
    return (node.flags & flagToCheck) !== 0;
}
exports.isNodeFlagSet = isNodeFlagSet;
/**
 * Bitwise check for combined node flags.
 *
 * @deprecated no longer used
 */
function isCombinedNodeFlagSet(node, flagToCheck) {
    // tslint:disable-next-line:no-bitwise
    return (ts.getCombinedNodeFlags(node) & flagToCheck) !== 0;
}
exports.isCombinedNodeFlagSet = isCombinedNodeFlagSet;
/**
 * Bitwise check for combined modifier flags.
 *
 * @deprecated no longer used
 */
function isCombinedModifierFlagSet(node, flagToCheck) {
    // tslint:disable-next-line:no-bitwise
    return (ts.getCombinedModifierFlags(node) & flagToCheck) !== 0;
}
exports.isCombinedModifierFlagSet = isCombinedModifierFlagSet;
/**
 * Bitwise check for type flags.
 *
 * @deprecated use `isTypeFlagSet` from `tsutils`
 */
function isTypeFlagSet(type, flagToCheck) {
    // tslint:disable-next-line:no-bitwise
    return (type.flags & flagToCheck) !== 0;
}
exports.isTypeFlagSet = isTypeFlagSet;
/**
 * Bitwise check for symbol flags.
 *
 * @deprecated use `isSymbolFlagSet` from `tsutils`
 */
function isSymbolFlagSet(symbol, flagToCheck) {
    // tslint:disable-next-line:no-bitwise
    return (symbol.flags & flagToCheck) !== 0;
}
exports.isSymbolFlagSet = isSymbolFlagSet;
/**
 * Bitwise check for object flags.
 * Does not work with TypeScript 2.0.x
 *
 * @deprecated use `isObjectFlagSet` from `tsutils`
 */
function isObjectFlagSet(objectType, flagToCheck) {
    // tslint:disable-next-line:no-bitwise
    return (objectType.objectFlags & flagToCheck) !== 0;
}
exports.isObjectFlagSet = isObjectFlagSet;
/**
 * @returns true if decl is a nested module declaration, i.e. represents a segment of a dotted module path.
 *
 * @deprecated use `decl.parent!.kind === ts.SyntaxKind.ModuleDeclaration`
 */
function isNestedModuleDeclaration(decl) {
    // in a declaration expression like 'module a.b.c' - 'a' is the top level module declaration node and 'b' and 'c'
    // are nested therefore we can depend that a node's position will only match with its name's position for nested
    // nodes
    return decl.name.pos === decl.pos;
}
exports.isNestedModuleDeclaration = isNestedModuleDeclaration;
function unwrapParentheses(node) {
    while (node.kind === ts.SyntaxKind.ParenthesizedExpression) {
        node = node.expression;
    }
    return node;
}
exports.unwrapParentheses = unwrapParentheses;
/** @deprecated use `isFunctionScopeBoundary` from `tsutils` */
function isScopeBoundary(node) {
    return node.kind === ts.SyntaxKind.FunctionDeclaration
        || node.kind === ts.SyntaxKind.FunctionExpression
        || node.kind === ts.SyntaxKind.PropertyAssignment
        || node.kind === ts.SyntaxKind.ShorthandPropertyAssignment
        || node.kind === ts.SyntaxKind.MethodDeclaration
        || node.kind === ts.SyntaxKind.Constructor
        || node.kind === ts.SyntaxKind.ModuleDeclaration
        || node.kind === ts.SyntaxKind.ArrowFunction
        || node.kind === ts.SyntaxKind.ParenthesizedExpression
        || node.kind === ts.SyntaxKind.ClassDeclaration
        || node.kind === ts.SyntaxKind.ClassExpression
        || node.kind === ts.SyntaxKind.InterfaceDeclaration
        || node.kind === ts.SyntaxKind.GetAccessor
        || node.kind === ts.SyntaxKind.SetAccessor
        || node.kind === ts.SyntaxKind.SourceFile && ts.isExternalModule(node);
}
exports.isScopeBoundary = isScopeBoundary;
/** @deprecated use `isBlockScopeBoundary` from `tsutils` */
function isBlockScopeBoundary(node) {
    return isScopeBoundary(node) // tslint:disable-line:deprecation
        || node.kind === ts.SyntaxKind.Block
        || isLoop(node) // tslint:disable-line:deprecation
        || node.kind === ts.SyntaxKind.WithStatement
        || node.kind === ts.SyntaxKind.SwitchStatement
        || node.parent !== undefined
            && (node.parent.kind === ts.SyntaxKind.TryStatement
                || node.parent.kind === ts.SyntaxKind.IfStatement);
}
exports.isBlockScopeBoundary = isBlockScopeBoundary;
/** @deprecated use `isIterationStatement` from `tsutils` or `typescript` */
function isLoop(node) {
    return node.kind === ts.SyntaxKind.DoStatement
        || node.kind === ts.SyntaxKind.WhileStatement
        || node.kind === ts.SyntaxKind.ForStatement
        || node.kind === ts.SyntaxKind.ForInStatement
        || node.kind === ts.SyntaxKind.ForOfStatement;
}
exports.isLoop = isLoop;
/**
 * @returns Whether node is a numeric expression.
 */
function isNumeric(node) {
    while (tsutils_1.isPrefixUnaryExpression(node) &&
        (node.operator === ts.SyntaxKind.PlusToken || node.operator === ts.SyntaxKind.MinusToken)) {
        node = node.operand;
    }
    return node.kind === ts.SyntaxKind.NumericLiteral ||
        tsutils_1.isIdentifier(node) && (node.text === "NaN" || node.text === "Infinity");
}
exports.isNumeric = isNumeric;
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
function forEachToken(node, skipTrivia, cb, filter) {
    // this function will most likely be called with SourceFile anyways, so there is no need for an additional parameter
    var sourceFile = node.getSourceFile();
    var fullText = sourceFile.text;
    var iterateFn = filter === undefined ? iterateChildren : iterateWithFilter;
    var handleTrivia = skipTrivia ? undefined : createTriviaHandler(sourceFile, cb);
    iterateFn(node);
    // this function is used to save the if condition for the common case where no filter is provided
    function iterateWithFilter(child) {
        if (filter(child)) {
            return iterateChildren(child);
        }
    }
    function iterateChildren(child) {
        if (child.kind < ts.SyntaxKind.FirstNode ||
            // for backwards compatibility to typescript 2.0.10
            // JsxText was no Token, but a Node in that version
            child.kind === ts.SyntaxKind.JsxText) {
            // we found a token, tokens have no children, stop recursing here
            return callback(child);
        }
        /* Exclude everything contained in JsDoc, it will be handled with the other trivia anyway.
         * When we would handle JsDoc tokens like regular ones, we would scan some trivia multiple times.
         * Even worse, we would scan for trivia inside the JsDoc comment, which yields unexpected results.*/
        if (child.kind !== ts.SyntaxKind.JSDocComment) {
            // recurse into Node's children to find tokens
            return child.getChildren(sourceFile).forEach(iterateFn);
        }
    }
    function callback(token) {
        var tokenStart = token.getStart(sourceFile);
        if (!skipTrivia && tokenStart !== token.pos) {
            // we only have to handle trivia before each token, because there is nothing after EndOfFileToken
            handleTrivia(token.pos, tokenStart, token);
        }
        return cb(fullText, token.kind, { tokenStart: tokenStart, fullStart: token.pos, end: token.end }, token.parent);
    }
}
exports.forEachToken = forEachToken;
function createTriviaHandler(sourceFile, cb) {
    var fullText = sourceFile.text;
    var scanner = ts.createScanner(sourceFile.languageVersion, false, sourceFile.languageVariant, fullText);
    /**
     * Scan the specified range to get all trivia tokens.
     * This includes trailing trivia of the last token and the leading trivia of the current token
     */
    function handleTrivia(start, end, token) {
        var parent = token.parent;
        // prevent false positives by not scanning inside JsxText
        if (!canHaveLeadingTrivia(token.kind, parent)) {
            return;
        }
        scanner.setTextPos(start);
        var position;
        // we only get here if start !== end, so we can scan at least one time
        do {
            var kind = scanner.scan();
            position = scanner.getTextPos();
            cb(fullText, kind, { tokenStart: scanner.getTokenPos(), end: position, fullStart: start }, parent);
        } while (position < end);
    }
    return handleTrivia;
}
/**
 * Iterate over all comments owned by `node` or its children
 *
 * @deprecated use `forEachComment` from `tsutils`
 */
function forEachComment(node, cb) {
    /* Visit all tokens and skip trivia.
       Comment ranges between tokens are parsed without the need of a scanner.
       forEachToken also does intentionally not pay attention to the correct comment ownership of nodes as it always
       scans all trivia before each token, which could include trailing comments of the previous token.
       Comment onwership is done right in this function*/
    return forEachToken(node, true, function (fullText, tokenKind, pos, parent) {
        // don't search for comments inside JsxText
        if (canHaveLeadingTrivia(tokenKind, parent)) {
            // Comments before the first token (pos.fullStart === 0) are all considered leading comments, so no need for special treatment
            var comments = ts.getLeadingCommentRanges(fullText, pos.fullStart);
            if (comments !== undefined) {
                for (var _i = 0, comments_1 = comments; _i < comments_1.length; _i++) {
                    var comment = comments_1[_i];
                    cb(fullText, comment.kind, { fullStart: pos.fullStart, tokenStart: comment.pos, end: comment.end });
                }
            }
        }
        if (canHaveTrailingTrivia(tokenKind, parent)) {
            var comments = ts.getTrailingCommentRanges(fullText, pos.end);
            if (comments !== undefined) {
                for (var _a = 0, comments_2 = comments; _a < comments_2.length; _a++) {
                    var comment = comments_2[_a];
                    cb(fullText, comment.kind, { fullStart: pos.fullStart, tokenStart: comment.pos, end: comment.end });
                }
            }
        }
    });
}
exports.forEachComment = forEachComment;
/** Exclude leading positions that would lead to scanning for trivia inside JsxText */
function canHaveLeadingTrivia(tokenKind, parent) {
    switch (tokenKind) {
        case ts.SyntaxKind.JsxText:
            return false; // there is no trivia before JsxText
        case ts.SyntaxKind.OpenBraceToken:
            // before a JsxExpression inside a JsxElement's body can only be other JsxChild, but no trivia
            return parent.kind !== ts.SyntaxKind.JsxExpression || parent.parent.kind !== ts.SyntaxKind.JsxElement;
        case ts.SyntaxKind.LessThanToken:
            switch (parent.kind) {
                case ts.SyntaxKind.JsxClosingElement:
                    return false; // would be inside the element body
                case ts.SyntaxKind.JsxOpeningElement:
                case ts.SyntaxKind.JsxSelfClosingElement:
                    // there can only be leading trivia if we are at the end of the top level element
                    return parent.parent.parent.kind !== ts.SyntaxKind.JsxElement;
                default:
                    return true;
            }
        default:
            return true;
    }
}
/** Exclude trailing positions that would lead to scanning for trivia inside JsxText */
function canHaveTrailingTrivia(tokenKind, parent) {
    switch (tokenKind) {
        case ts.SyntaxKind.JsxText:
            // there is no trivia after JsxText
            return false;
        case ts.SyntaxKind.CloseBraceToken:
            // after a JsxExpression inside a JsxElement's body can only be other JsxChild, but no trivia
            return parent.kind !== ts.SyntaxKind.JsxExpression || parent.parent.kind !== ts.SyntaxKind.JsxElement;
        case ts.SyntaxKind.GreaterThanToken:
            switch (parent.kind) {
                case ts.SyntaxKind.JsxOpeningElement:
                    return false; // would be inside the element
                case ts.SyntaxKind.JsxClosingElement:
                case ts.SyntaxKind.JsxSelfClosingElement:
                    // there can only be trailing trivia if we are at the end of the top level element
                    return parent.parent.parent.kind !== ts.SyntaxKind.JsxElement;
                default:
                    return true;
            }
        default:
            return true;
    }
}
/**
 * Checks if there are any comments between `position` and the next non-trivia token
 *
 * @param text The text to scan
 * @param position The position inside `text` where to start scanning. Make sure that this is a valid start position.
 *                 This value is typically obtained from `node.getFullStart()` or `node.getEnd()`
 */
function hasCommentAfterPosition(text, position) {
    return ts.getTrailingCommentRanges(text, position) !== undefined ||
        ts.getLeadingCommentRanges(text, position) !== undefined;
}
exports.hasCommentAfterPosition = hasCommentAfterPosition;
function getEqualsKind(node) {
    switch (node.kind) {
        case ts.SyntaxKind.EqualsEqualsToken:
            return { isPositive: true, isStrict: false };
        case ts.SyntaxKind.EqualsEqualsEqualsToken:
            return { isPositive: true, isStrict: true };
        case ts.SyntaxKind.ExclamationEqualsToken:
            return { isPositive: false, isStrict: false };
        case ts.SyntaxKind.ExclamationEqualsEqualsToken:
            return { isPositive: false, isStrict: true };
        default:
            return undefined;
    }
}
exports.getEqualsKind = getEqualsKind;
function isStrictNullChecksEnabled(options) {
    return options.strictNullChecks === true ||
        (options.strict === true && options.strictNullChecks !== false);
}
exports.isStrictNullChecksEnabled = isStrictNullChecksEnabled;
function isNegativeNumberLiteral(node) {
    return tsutils_1.isPrefixUnaryExpression(node) &&
        node.operator === ts.SyntaxKind.MinusToken &&
        node.operand.kind === ts.SyntaxKind.NumericLiteral;
}
exports.isNegativeNumberLiteral = isNegativeNumberLiteral;
/** Wrapper for compatibility with typescript@<2.3.1 */
function isWhiteSpace(ch) {
    // tslint:disable-next-line
    return (ts.isWhiteSpaceLike || ts.isWhiteSpace)(ch);
}
exports.isWhiteSpace = isWhiteSpace;

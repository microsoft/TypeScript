"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts = require("typescript");
var node_1 = require("../typeguard/node");
tslib_1.__exportStar(require("./control-flow"), exports);
function getChildOfKind(node, kind, sourceFile) {
    for (var _i = 0, _a = node.getChildren(sourceFile); _i < _a.length; _i++) {
        var child = _a[_i];
        if (child.kind === kind)
            return child;
    }
}
exports.getChildOfKind = getChildOfKind;
function isTokenKind(kind) {
    return kind >= ts.SyntaxKind.FirstToken && kind <= ts.SyntaxKind.LastToken;
}
exports.isTokenKind = isTokenKind;
function isNodeKind(kind) {
    return kind >= ts.SyntaxKind.FirstNode;
}
exports.isNodeKind = isNodeKind;
function isAssignmentKind(kind) {
    return kind >= ts.SyntaxKind.FirstAssignment && kind <= ts.SyntaxKind.LastAssignment;
}
exports.isAssignmentKind = isAssignmentKind;
function isTypeNodeKind(kind) {
    return kind >= ts.SyntaxKind.FirstTypeNode && kind <= ts.SyntaxKind.LastTypeNode;
}
exports.isTypeNodeKind = isTypeNodeKind;
function isJsDocKind(kind) {
    return kind >= ts.SyntaxKind.FirstJSDocNode && kind <= ts.SyntaxKind.LastJSDocNode;
}
exports.isJsDocKind = isJsDocKind;
function isThisParameter(parameter) {
    return parameter.name.kind === ts.SyntaxKind.Identifier && parameter.name.originalKeywordKind === ts.SyntaxKind.ThisKeyword;
}
exports.isThisParameter = isThisParameter;
function getModifier(node, kind) {
    if (node.modifiers !== undefined)
        for (var _i = 0, _a = node.modifiers; _i < _a.length; _i++) {
            var modifier = _a[_i];
            if (modifier.kind === kind)
                return modifier;
        }
}
exports.getModifier = getModifier;
function hasModifier(modifiers) {
    var kinds = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        kinds[_i - 1] = arguments[_i];
    }
    if (modifiers === undefined)
        return false;
    for (var _a = 0, modifiers_1 = modifiers; _a < modifiers_1.length; _a++) {
        var modifier = modifiers_1[_a];
        if (kinds.indexOf(modifier.kind) !== -1)
            return true;
    }
    return false;
}
exports.hasModifier = hasModifier;
function isParameterProperty(node) {
    return hasModifier(node.modifiers, ts.SyntaxKind.PublicKeyword, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ReadonlyKeyword);
}
exports.isParameterProperty = isParameterProperty;
function hasAccessModifier(node) {
    return hasModifier(node.modifiers, ts.SyntaxKind.PublicKeyword, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.PrivateKeyword);
}
exports.hasAccessModifier = hasAccessModifier;
function isFlagSet(obj, flag) {
    return (obj.flags & flag) !== 0;
}
exports.isNodeFlagSet = isFlagSet;
exports.isTypeFlagSet = isFlagSet;
exports.isSymbolFlagSet = isFlagSet;
function isObjectFlagSet(objectType, flag) {
    return (objectType.objectFlags & flag) !== 0;
}
exports.isObjectFlagSet = isObjectFlagSet;
function isModifierFlagSet(node, flag) {
    return (ts.getCombinedModifierFlags(node) & flag) !== 0;
}
exports.isModifierFlagSet = isModifierFlagSet;
function isModfierFlagSet(node, flag) {
    return isModifierFlagSet(node, flag);
}
exports.isModfierFlagSet = isModfierFlagSet;
function getPreviousStatement(statement) {
    var parent = statement.parent;
    if (node_1.isBlockLike(parent)) {
        var index = parent.statements.indexOf(statement);
        if (index > 0)
            return parent.statements[index - 1];
    }
}
exports.getPreviousStatement = getPreviousStatement;
function getNextStatement(statement) {
    var parent = statement.parent;
    if (node_1.isBlockLike(parent)) {
        var index = parent.statements.indexOf(statement);
        if (index < parent.statements.length)
            return parent.statements[index + 1];
    }
}
exports.getNextStatement = getNextStatement;
function getPreviousToken(node, sourceFile) {
    var parent = node.parent;
    while (parent !== undefined && parent.pos === node.pos)
        parent = parent.parent;
    if (parent === undefined)
        return;
    outer: while (true) {
        var children = parent.getChildren(sourceFile);
        for (var i = children.length - 1; i >= 0; --i) {
            var child = children[i];
            if (child.pos < node.pos && child.kind !== ts.SyntaxKind.JSDocComment) {
                if (isTokenKind(child.kind))
                    return child;
                parent = child;
                continue outer;
            }
        }
        return;
    }
}
exports.getPreviousToken = getPreviousToken;
function getNextToken(node, sourceFile) {
    if (sourceFile === void 0) { sourceFile = node.getSourceFile(); }
    if (node.kind === ts.SyntaxKind.SourceFile || node.kind === ts.SyntaxKind.EndOfFileToken)
        return;
    var end = node.end;
    node = node.parent;
    while (node.end === end) {
        if (node.parent === undefined)
            return node.endOfFileToken;
        node = node.parent;
    }
    return getTokenAtPositionWorker(node, end, sourceFile);
}
exports.getNextToken = getNextToken;
function getTokenAtPosition(parent, pos, sourceFile) {
    if (pos < parent.pos || pos >= parent.end)
        return;
    if (isTokenKind(parent.kind))
        return parent;
    if (sourceFile === undefined)
        sourceFile = parent.getSourceFile();
    return getTokenAtPositionWorker(parent, pos, sourceFile);
}
exports.getTokenAtPosition = getTokenAtPosition;
function getTokenAtPositionWorker(node, pos, sourceFile) {
    outer: while (true) {
        for (var _i = 0, _a = node.getChildren(sourceFile); _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.end > pos && child.kind !== ts.SyntaxKind.JSDocComment) {
                if (isTokenKind(child.kind))
                    return child;
                node = child;
                continue outer;
            }
        }
        return;
    }
}
function getCommentAtPosition(sourceFile, pos, parent) {
    if (parent === void 0) { parent = sourceFile; }
    var token = getTokenAtPosition(parent, pos, sourceFile);
    if (token === undefined || token.kind === ts.SyntaxKind.JsxText || pos >= token.end - (ts.tokenToString(token.kind) || '').length)
        return;
    var startPos = token.pos === 0
        ? (ts.getShebang(sourceFile.text) || '').length
        : token.pos;
    return startPos !== 0 && ts.forEachTrailingCommentRange(sourceFile.text, startPos, commentAtPositionCallback, pos) ||
        ts.forEachLeadingCommentRange(sourceFile.text, startPos, commentAtPositionCallback, pos);
}
exports.getCommentAtPosition = getCommentAtPosition;
function commentAtPositionCallback(pos, end, kind, _nl, at) {
    return at >= pos && at < end ? { pos: pos, end: end, kind: kind } : undefined;
}
function isPositionInComment(sourceFile, pos, parent) {
    return getCommentAtPosition(sourceFile, pos, parent) !== undefined;
}
exports.isPositionInComment = isPositionInComment;
function getWrappedNodeAtPosition(wrap, pos) {
    if (wrap.node.pos > pos || wrap.node.end <= pos)
        return;
    outer: while (true) {
        for (var _i = 0, _a = wrap.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.node.pos > pos)
                return wrap;
            if (child.node.end > pos) {
                wrap = child;
                continue outer;
            }
        }
        return wrap;
    }
}
exports.getWrappedNodeAtPosition = getWrappedNodeAtPosition;
function getPropertyName(propertyName) {
    if (propertyName.kind === ts.SyntaxKind.ComputedPropertyName) {
        if (!node_1.isLiteralExpression(propertyName.expression))
            return;
        return propertyName.expression.text;
    }
    return propertyName.kind === ts.SyntaxKind.Identifier ? getIdentifierText(propertyName) : propertyName.text;
}
exports.getPropertyName = getPropertyName;
function forEachDestructuringIdentifier(pattern, fn) {
    for (var _i = 0, _a = pattern.elements; _i < _a.length; _i++) {
        var element = _a[_i];
        if (element.kind !== ts.SyntaxKind.BindingElement)
            continue;
        var result = void 0;
        if (element.name.kind === ts.SyntaxKind.Identifier) {
            result = fn(element);
        }
        else {
            result = forEachDestructuringIdentifier(element.name, fn);
        }
        if (result)
            return result;
    }
}
exports.forEachDestructuringIdentifier = forEachDestructuringIdentifier;
function forEachDeclaredVariable(declarationList, cb) {
    for (var _i = 0, _a = declarationList.declarations; _i < _a.length; _i++) {
        var declaration = _a[_i];
        var result = void 0;
        if (declaration.name.kind === ts.SyntaxKind.Identifier) {
            result = cb(declaration);
        }
        else {
            result = forEachDestructuringIdentifier(declaration.name, cb);
        }
        if (result)
            return result;
    }
}
exports.forEachDeclaredVariable = forEachDeclaredVariable;
var VariableDeclarationKind;
(function (VariableDeclarationKind) {
    VariableDeclarationKind[VariableDeclarationKind["Var"] = 0] = "Var";
    VariableDeclarationKind[VariableDeclarationKind["Let"] = 1] = "Let";
    VariableDeclarationKind[VariableDeclarationKind["Const"] = 2] = "Const";
})(VariableDeclarationKind = exports.VariableDeclarationKind || (exports.VariableDeclarationKind = {}));
function getVariableDeclarationKind(declarationList) {
    if (declarationList.flags & ts.NodeFlags.Let)
        return 1;
    if (declarationList.flags & ts.NodeFlags.Const)
        return 2;
    return 0;
}
exports.getVariableDeclarationKind = getVariableDeclarationKind;
function isBlockScopedVariableDeclarationList(declarationList) {
    return (declarationList.flags & ts.NodeFlags.BlockScoped) !== 0;
}
exports.isBlockScopedVariableDeclarationList = isBlockScopedVariableDeclarationList;
function isBlockScopedVariableDeclaration(declaration) {
    var parent = declaration.parent;
    return parent.kind === ts.SyntaxKind.CatchClause ||
        isBlockScopedVariableDeclarationList(parent);
}
exports.isBlockScopedVariableDeclaration = isBlockScopedVariableDeclaration;
var ScopeBoundary;
(function (ScopeBoundary) {
    ScopeBoundary[ScopeBoundary["None"] = 0] = "None";
    ScopeBoundary[ScopeBoundary["Function"] = 1] = "Function";
    ScopeBoundary[ScopeBoundary["Block"] = 2] = "Block";
})(ScopeBoundary = exports.ScopeBoundary || (exports.ScopeBoundary = {}));
function isScopeBoundary(node) {
    if (isFunctionScopeBoundary(node))
        return 1;
    if (isBlockScopeBoundary(node))
        return 2;
    return 0;
}
exports.isScopeBoundary = isScopeBoundary;
function isFunctionScopeBoundary(node) {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.ConstructorType:
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.MappedType:
        case ts.SyntaxKind.ConditionalType:
            return true;
        case ts.SyntaxKind.SourceFile:
            return ts.isExternalModule(node);
        default:
            return false;
    }
}
exports.isFunctionScopeBoundary = isFunctionScopeBoundary;
function isBlockScopeBoundary(node) {
    switch (node.kind) {
        case ts.SyntaxKind.Block:
            var parent = node.parent;
            return parent.kind !== ts.SyntaxKind.CatchClause &&
                (parent.kind === ts.SyntaxKind.SourceFile ||
                    !isFunctionScopeBoundary(parent));
        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.CaseBlock:
        case ts.SyntaxKind.CatchClause:
            return true;
        default:
            return false;
    }
}
exports.isBlockScopeBoundary = isBlockScopeBoundary;
function hasOwnThisReference(node) {
    switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.FunctionExpression:
            return true;
        case ts.SyntaxKind.FunctionDeclaration:
            return node.body !== undefined;
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            return node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression;
        default:
            return false;
    }
}
exports.hasOwnThisReference = hasOwnThisReference;
function isFunctionWithBody(node) {
    switch (node.kind) {
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.Constructor:
            return node.body !== undefined;
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
            return true;
        default:
            return false;
    }
}
exports.isFunctionWithBody = isFunctionWithBody;
function forEachToken(node, cb, sourceFile) {
    if (sourceFile === void 0) { sourceFile = node.getSourceFile(); }
    return (function iterate(child) {
        if (isTokenKind(child.kind))
            return cb(child);
        if (child.kind !== ts.SyntaxKind.JSDocComment)
            return child.getChildren(sourceFile).forEach(iterate);
    })(node);
}
exports.forEachToken = forEachToken;
function forEachTokenWithTrivia(node, cb, sourceFile) {
    if (sourceFile === void 0) { sourceFile = node.getSourceFile(); }
    var fullText = sourceFile.text;
    var scanner = ts.createScanner(sourceFile.languageVersion, false, sourceFile.languageVariant, fullText);
    return forEachToken(node, function (token) {
        var tokenStart = token.kind === ts.SyntaxKind.JsxText || token.pos === token.end ? token.pos : token.getStart(sourceFile);
        if (tokenStart !== token.pos) {
            scanner.setTextPos(token.pos);
            var kind = scanner.scan();
            var pos = scanner.getTokenPos();
            while (pos < tokenStart) {
                var textPos = scanner.getTextPos();
                cb(fullText, kind, { pos: pos, end: textPos }, token.parent);
                if (textPos === tokenStart)
                    break;
                kind = scanner.scan();
                pos = scanner.getTokenPos();
            }
        }
        return cb(fullText, token.kind, { end: token.end, pos: tokenStart }, token.parent);
    }, sourceFile);
}
exports.forEachTokenWithTrivia = forEachTokenWithTrivia;
function forEachComment(node, cb, sourceFile) {
    if (sourceFile === void 0) { sourceFile = node.getSourceFile(); }
    var fullText = sourceFile.text;
    var notJsx = sourceFile.languageVariant !== ts.LanguageVariant.JSX;
    return forEachToken(node, function (token) {
        if (token.pos === token.end)
            return;
        if (token.kind !== ts.SyntaxKind.JsxText)
            ts.forEachLeadingCommentRange(fullText, token.pos === 0 ? (ts.getShebang(fullText) || '').length : token.pos, commentCallback);
        if (notJsx || canHaveTrailingTrivia(token))
            return ts.forEachTrailingCommentRange(fullText, token.end, commentCallback);
    }, sourceFile);
    function commentCallback(pos, end, kind) {
        cb(fullText, { pos: pos, end: end, kind: kind });
    }
}
exports.forEachComment = forEachComment;
function canHaveTrailingTrivia(token) {
    switch (token.kind) {
        case ts.SyntaxKind.CloseBraceToken:
            return token.parent.kind !== ts.SyntaxKind.JsxExpression || !isJsxElementOrFragment(token.parent.parent);
        case ts.SyntaxKind.GreaterThanToken:
            switch (token.parent.kind) {
                case ts.SyntaxKind.JsxOpeningElement:
                    return token.end !== token.parent.end;
                case ts.SyntaxKind.JsxOpeningFragment:
                    return false;
                case ts.SyntaxKind.JsxSelfClosingElement:
                    return token.end !== token.parent.end ||
                        !isJsxElementOrFragment(token.parent.parent);
                case ts.SyntaxKind.JsxClosingElement:
                case ts.SyntaxKind.JsxClosingFragment:
                    return !isJsxElementOrFragment(token.parent.parent.parent);
            }
    }
    return true;
}
function isJsxElementOrFragment(node) {
    return node.kind === ts.SyntaxKind.JsxElement || node.kind === ts.SyntaxKind.JsxFragment;
}
function getLineRanges(sourceFile) {
    var lineStarts = sourceFile.getLineStarts();
    var result = [];
    var length = lineStarts.length;
    var sourceText = sourceFile.text;
    var pos = 0;
    for (var i = 1; i < length; ++i) {
        var end = lineStarts[i];
        var lineEnd = end;
        for (; lineEnd > pos; --lineEnd)
            if (!ts.isLineBreak(sourceText.charCodeAt(lineEnd - 1)))
                break;
        result.push({
            pos: pos,
            end: end,
            contentLength: lineEnd - pos,
        });
        pos = end;
    }
    result.push({
        pos: pos,
        end: sourceFile.end,
        contentLength: sourceFile.end - pos,
    });
    return result;
}
exports.getLineRanges = getLineRanges;
function getLineBreakStyle(sourceFile) {
    var lineStarts = sourceFile.getLineStarts();
    return lineStarts.length === 1 || lineStarts[1] < 2 || sourceFile.text[lineStarts[1] - 2] !== '\r'
        ? '\n'
        : '\r\n';
}
exports.getLineBreakStyle = getLineBreakStyle;
var cachedScanner;
function scanToken(text) {
    if (cachedScanner === undefined)
        cachedScanner = ts.createScanner(ts.ScriptTarget.Latest, false);
    cachedScanner.setText(text);
    cachedScanner.scan();
    return cachedScanner;
}
function isValidIdentifier(text) {
    var scan = scanToken(text);
    return scan.isIdentifier() && scan.getTextPos() === text.length && scan.getTokenPos() === 0;
}
exports.isValidIdentifier = isValidIdentifier;
function isValidPropertyAccess(text) {
    if (!ts.isIdentifierStart(text.charCodeAt(0), ts.ScriptTarget.Latest))
        return false;
    for (var i = 1; i < text.length; ++i)
        if (!ts.isIdentifierPart(text.charCodeAt(i), ts.ScriptTarget.Latest))
            return false;
    return true;
}
exports.isValidPropertyAccess = isValidPropertyAccess;
function isValidPropertyName(text) {
    if (isValidPropertyAccess(text))
        return true;
    var scan = scanToken(text);
    return scan.getTextPos() === text.length &&
        scan.getToken() === ts.SyntaxKind.NumericLiteral && scan.getTokenValue() === text;
}
exports.isValidPropertyName = isValidPropertyName;
function isValidNumericLiteral(text) {
    var scan = scanToken(text);
    return scan.getToken() === ts.SyntaxKind.NumericLiteral && scan.getTextPos() === text.length && scan.getTokenPos() === 0;
}
exports.isValidNumericLiteral = isValidNumericLiteral;
function isSameLine(sourceFile, pos1, pos2) {
    return ts.getLineAndCharacterOfPosition(sourceFile, pos1).line === ts.getLineAndCharacterOfPosition(sourceFile, pos2).line;
}
exports.isSameLine = isSameLine;
var SideEffectOptions;
(function (SideEffectOptions) {
    SideEffectOptions[SideEffectOptions["None"] = 0] = "None";
    SideEffectOptions[SideEffectOptions["TaggedTemplate"] = 1] = "TaggedTemplate";
    SideEffectOptions[SideEffectOptions["Constructor"] = 2] = "Constructor";
    SideEffectOptions[SideEffectOptions["JsxElement"] = 4] = "JsxElement";
})(SideEffectOptions = exports.SideEffectOptions || (exports.SideEffectOptions = {}));
function hasSideEffects(node, options) {
    switch (node.kind) {
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.PostfixUnaryExpression:
        case ts.SyntaxKind.AwaitExpression:
        case ts.SyntaxKind.YieldExpression:
        case ts.SyntaxKind.DeleteExpression:
            return true;
        case ts.SyntaxKind.TypeAssertionExpression:
        case ts.SyntaxKind.AsExpression:
        case ts.SyntaxKind.ParenthesizedExpression:
        case ts.SyntaxKind.NonNullExpression:
        case ts.SyntaxKind.VoidExpression:
        case ts.SyntaxKind.TypeOfExpression:
        case ts.SyntaxKind.PropertyAccessExpression:
        case ts.SyntaxKind.SpreadElement:
        case ts.SyntaxKind.PartiallyEmittedExpression:
            return hasSideEffects(node.expression, options);
        case ts.SyntaxKind.BinaryExpression:
            return isAssignmentKind(node.operatorToken.kind) ||
                hasSideEffects(node.left, options) ||
                hasSideEffects(node.right, options);
        case ts.SyntaxKind.PrefixUnaryExpression:
            switch (node.operator) {
                case ts.SyntaxKind.PlusPlusToken:
                case ts.SyntaxKind.MinusMinusToken:
                    return true;
                default:
                    return hasSideEffects(node.operand, options);
            }
        case ts.SyntaxKind.ElementAccessExpression:
            return hasSideEffects(node.expression, options) ||
                node.argumentExpression !== undefined &&
                    hasSideEffects(node.argumentExpression, options);
        case ts.SyntaxKind.ConditionalExpression:
            return hasSideEffects(node.condition, options) ||
                hasSideEffects(node.whenTrue, options) ||
                hasSideEffects(node.whenFalse, options);
        case ts.SyntaxKind.NewExpression:
            if (options & 2 || hasSideEffects(node.expression, options))
                return true;
            if (node.arguments !== undefined)
                for (var _i = 0, _a = node.arguments; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (hasSideEffects(child, options))
                        return true;
                }
            return false;
        case ts.SyntaxKind.TaggedTemplateExpression:
            if (options & 1 || hasSideEffects(node.tag, options))
                return true;
            if (node.template.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral)
                return false;
            node = node.template;
        case ts.SyntaxKind.TemplateExpression:
            for (var _b = 0, _c = node.templateSpans; _b < _c.length; _b++) {
                var child = _c[_b];
                if (hasSideEffects(child.expression, options))
                    return true;
            }
            return false;
        case ts.SyntaxKind.ClassExpression:
            return classExpressionHasSideEffects(node, options);
        case ts.SyntaxKind.ArrayLiteralExpression:
            for (var _d = 0, _e = node.elements; _d < _e.length; _d++) {
                var child = _e[_d];
                if (hasSideEffects(child, options))
                    return true;
            }
            return false;
        case ts.SyntaxKind.ObjectLiteralExpression:
            for (var _f = 0, _g = node.properties; _f < _g.length; _f++) {
                var child = _g[_f];
                if (child.name !== undefined && child.name.kind === ts.SyntaxKind.ComputedPropertyName &&
                    hasSideEffects(child.name.expression, options))
                    return true;
                switch (child.kind) {
                    case ts.SyntaxKind.PropertyAssignment:
                        if (hasSideEffects(child.initializer, options))
                            return true;
                        break;
                    case ts.SyntaxKind.SpreadAssignment:
                        if (hasSideEffects(child.expression, options))
                            return true;
                }
            }
            return false;
        case ts.SyntaxKind.JsxExpression:
            return node.expression !== undefined && hasSideEffects(node.expression, options);
        case ts.SyntaxKind.JsxElement:
        case ts.SyntaxKind.JsxFragment:
            for (var _h = 0, _j = node.children; _h < _j.length; _h++) {
                var child = _j[_h];
                if (child.kind !== ts.SyntaxKind.JsxText && hasSideEffects(child, options))
                    return true;
            }
            if (node.kind === ts.SyntaxKind.JsxFragment)
                return false;
            node = node.openingElement;
        case ts.SyntaxKind.JsxSelfClosingElement:
        case ts.SyntaxKind.JsxOpeningElement:
            if (options & 4)
                return true;
            for (var _k = 0, _l = getJsxAttributes(node); _k < _l.length; _k++) {
                var child = _l[_k];
                if (child.kind === ts.SyntaxKind.JsxSpreadAttribute) {
                    if (hasSideEffects(child.expression, options))
                        return true;
                }
                else if (child.initializer !== undefined && hasSideEffects(child.initializer, options)) {
                    return true;
                }
            }
            return false;
        case ts.SyntaxKind.CommaListExpression:
            for (var _m = 0, _o = node.elements; _m < _o.length; _m++) {
                var child = _o[_m];
                if (hasSideEffects(child, options))
                    return true;
            }
            return false;
        default:
            return false;
    }
}
exports.hasSideEffects = hasSideEffects;
function getJsxAttributes(openElement) {
    var attributes = openElement.attributes;
    return Array.isArray(attributes) ? attributes : attributes.properties;
}
function classExpressionHasSideEffects(node, options) {
    if (node.heritageClauses !== undefined && node.heritageClauses[0].token === ts.SyntaxKind.ExtendsKeyword)
        for (var _i = 0, _a = node.heritageClauses[0].types; _i < _a.length; _i++) {
            var base = _a[_i];
            if (hasSideEffects(base.expression, options))
                return true;
        }
    for (var _b = 0, _c = node.members; _b < _c.length; _b++) {
        var child = _c[_b];
        if (child.name !== undefined && child.name.kind === ts.SyntaxKind.ComputedPropertyName &&
            hasSideEffects(child.name.expression, options) ||
            node_1.isPropertyDeclaration(child) && child.initializer !== undefined &&
                hasSideEffects(child.initializer, options))
            return true;
    }
    return false;
}
function getDeclarationOfBindingElement(node) {
    var parent = node.parent.parent;
    while (parent.kind === ts.SyntaxKind.BindingElement)
        parent = parent.parent.parent;
    return parent;
}
exports.getDeclarationOfBindingElement = getDeclarationOfBindingElement;
function isExpressionValueUsed(node) {
    while (true) {
        var parent = node.parent;
        switch (parent.kind) {
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.NewExpression:
            case ts.SyntaxKind.ElementAccessExpression:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.WithStatement:
            case ts.SyntaxKind.ThrowStatement:
            case ts.SyntaxKind.ReturnStatement:
            case ts.SyntaxKind.JsxExpression:
            case ts.SyntaxKind.JsxSpreadAttribute:
            case ts.SyntaxKind.JsxElement:
            case ts.SyntaxKind.JsxFragment:
            case ts.SyntaxKind.JsxSelfClosingElement:
            case ts.SyntaxKind.ComputedPropertyName:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.ExportSpecifier:
            case ts.SyntaxKind.ExportAssignment:
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ExternalModuleReference:
            case ts.SyntaxKind.Decorator:
            case ts.SyntaxKind.TaggedTemplateExpression:
            case ts.SyntaxKind.TemplateSpan:
            case ts.SyntaxKind.ExpressionWithTypeArguments:
            case ts.SyntaxKind.TypeOfExpression:
            case ts.SyntaxKind.AwaitExpression:
            case ts.SyntaxKind.YieldExpression:
            case ts.SyntaxKind.LiteralType:
            case ts.SyntaxKind.JsxAttributes:
            case ts.SyntaxKind.JsxOpeningElement:
            case ts.SyntaxKind.JsxClosingElement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.CaseClause:
            case ts.SyntaxKind.SwitchStatement:
                return true;
            case ts.SyntaxKind.PropertyAccessExpression:
                return parent.expression === node;
            case ts.SyntaxKind.QualifiedName:
                return parent.left === node;
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                return parent.objectAssignmentInitializer === node ||
                    !isInDestructuringAssignment(parent);
            case ts.SyntaxKind.PropertyAssignment:
                return parent.initializer === node && !isInDestructuringAssignment(parent);
            case ts.SyntaxKind.SpreadAssignment:
            case ts.SyntaxKind.SpreadElement:
            case ts.SyntaxKind.ArrayLiteralExpression:
                return !isInDestructuringAssignment(parent);
            case ts.SyntaxKind.ParenthesizedExpression:
            case ts.SyntaxKind.AsExpression:
            case ts.SyntaxKind.TypeAssertionExpression:
            case ts.SyntaxKind.PostfixUnaryExpression:
            case ts.SyntaxKind.PrefixUnaryExpression:
            case ts.SyntaxKind.NonNullExpression:
                node = parent;
                break;
            case ts.SyntaxKind.ForStatement:
                return parent.condition === node;
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
                return parent.expression === node;
            case ts.SyntaxKind.ConditionalExpression:
                if (parent.condition === node)
                    return true;
                node = parent;
                break;
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.BindingElement:
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.EnumMember:
                return parent.initializer === node;
            case ts.SyntaxKind.ImportEqualsDeclaration:
                return parent.moduleReference === node;
            case ts.SyntaxKind.CommaListExpression:
                if (parent.elements[parent.elements.length - 1] !== node)
                    return false;
                node = parent;
                break;
            case ts.SyntaxKind.BinaryExpression:
                if (parent.right === node) {
                    if (parent.operatorToken.kind === ts.SyntaxKind.CommaToken) {
                        node = parent;
                        break;
                    }
                    return true;
                }
                switch (parent.operatorToken.kind) {
                    case ts.SyntaxKind.CommaToken:
                    case ts.SyntaxKind.EqualsToken:
                        return false;
                    case ts.SyntaxKind.EqualsEqualsEqualsToken:
                    case ts.SyntaxKind.EqualsEqualsToken:
                    case ts.SyntaxKind.ExclamationEqualsEqualsToken:
                    case ts.SyntaxKind.ExclamationEqualsToken:
                    case ts.SyntaxKind.InstanceOfKeyword:
                    case ts.SyntaxKind.PlusToken:
                    case ts.SyntaxKind.MinusToken:
                    case ts.SyntaxKind.AsteriskToken:
                    case ts.SyntaxKind.SlashToken:
                    case ts.SyntaxKind.PercentToken:
                    case ts.SyntaxKind.AsteriskAsteriskToken:
                    case ts.SyntaxKind.GreaterThanToken:
                    case ts.SyntaxKind.GreaterThanGreaterThanToken:
                    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                    case ts.SyntaxKind.GreaterThanEqualsToken:
                    case ts.SyntaxKind.LessThanToken:
                    case ts.SyntaxKind.LessThanLessThanToken:
                    case ts.SyntaxKind.LessThanEqualsToken:
                    case ts.SyntaxKind.AmpersandToken:
                    case ts.SyntaxKind.BarToken:
                    case ts.SyntaxKind.CaretToken:
                    case ts.SyntaxKind.BarBarToken:
                    case ts.SyntaxKind.AmpersandAmpersandToken:
                    case ts.SyntaxKind.InKeyword:
                        return true;
                    default:
                        node = parent;
                }
                break;
            default:
                return false;
        }
    }
}
exports.isExpressionValueUsed = isExpressionValueUsed;
function isInDestructuringAssignment(node) {
    switch (node.kind) {
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            if (node.objectAssignmentInitializer !== undefined)
                return true;
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.SpreadAssignment:
            node = node.parent;
            break;
        case ts.SyntaxKind.SpreadElement:
            if (node.parent.kind !== ts.SyntaxKind.ArrayLiteralExpression)
                return false;
            node = node.parent;
    }
    while (true) {
        switch (node.parent.kind) {
            case ts.SyntaxKind.BinaryExpression:
                return node.parent.left === node &&
                    node.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken;
            case ts.SyntaxKind.ForOfStatement:
                return node.parent.initializer === node;
            case ts.SyntaxKind.ArrayLiteralExpression:
            case ts.SyntaxKind.ObjectLiteralExpression:
                node = node.parent;
                break;
            case ts.SyntaxKind.SpreadAssignment:
            case ts.SyntaxKind.PropertyAssignment:
                node = node.parent.parent;
                break;
            case ts.SyntaxKind.SpreadElement:
                if (node.parent.parent.kind !== ts.SyntaxKind.ArrayLiteralExpression)
                    return false;
                node = node.parent.parent;
                break;
            default:
                return false;
        }
    }
}
function isReassignmentTarget(node) {
    var parent = node.parent;
    switch (parent.kind) {
        case ts.SyntaxKind.PostfixUnaryExpression:
        case ts.SyntaxKind.DeleteExpression:
            return true;
        case ts.SyntaxKind.PrefixUnaryExpression:
            return parent.operator === ts.SyntaxKind.PlusPlusToken ||
                parent.operator === ts.SyntaxKind.MinusMinusToken;
        case ts.SyntaxKind.BinaryExpression:
            return parent.left === node &&
                isAssignmentKind(parent.operatorToken.kind);
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            return parent.name === node &&
                isInDestructuringAssignment(parent);
        case ts.SyntaxKind.PropertyAssignment:
            return parent.initializer === node &&
                isInDestructuringAssignment(parent);
        case ts.SyntaxKind.ArrayLiteralExpression:
        case ts.SyntaxKind.SpreadElement:
        case ts.SyntaxKind.SpreadAssignment:
            return isInDestructuringAssignment(parent);
        case ts.SyntaxKind.ParenthesizedExpression:
        case ts.SyntaxKind.NonNullExpression:
        case ts.SyntaxKind.TypeAssertionExpression:
        case ts.SyntaxKind.AsExpression:
            return isReassignmentTarget(parent);
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.ForInStatement:
            return parent.initializer === node;
    }
    return false;
}
exports.isReassignmentTarget = isReassignmentTarget;
function getIdentifierText(node) {
    return ts.unescapeIdentifier(node.text);
}
exports.getIdentifierText = getIdentifierText;
function canHaveJsDoc(node) {
    var kind = node.kind;
    switch (kind) {
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.ParenthesizedExpression:
        case ts.SyntaxKind.SpreadAssignment:
        case ts.SyntaxKind.ShorthandPropertyAssignment:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.LabeledStatement:
        case ts.SyntaxKind.ExpressionStatement:
        case ts.SyntaxKind.VariableStatement:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.ImportEqualsDeclaration:
        case ts.SyntaxKind.IndexSignature:
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.ConstructorType:
        case ts.SyntaxKind.JSDocFunctionType:
        case ts.SyntaxKind.EndOfFileToken:
            return true;
        default:
            return false;
    }
}
exports.canHaveJsDoc = canHaveJsDoc;
function getJsDoc(node, sourceFile) {
    if (node.kind === ts.SyntaxKind.EndOfFileToken)
        return parseJsDocWorker(node, sourceFile || node.parent);
    var result = [];
    for (var _i = 0, _a = node.getChildren(sourceFile); _i < _a.length; _i++) {
        var child = _a[_i];
        if (!node_1.isJsDoc(child))
            break;
        result.push(child);
    }
    return result;
}
exports.getJsDoc = getJsDoc;
function parseJsDocOfNode(node, considerTrailingComments, sourceFile) {
    if (sourceFile === void 0) { sourceFile = node.getSourceFile(); }
    if (canHaveJsDoc(node) && node.kind !== ts.SyntaxKind.EndOfFileToken) {
        var result = getJsDoc(node, sourceFile);
        if (result.length !== 0 || !considerTrailingComments)
            return result;
    }
    return parseJsDocWorker(node, sourceFile, considerTrailingComments);
}
exports.parseJsDocOfNode = parseJsDocOfNode;
function parseJsDocWorker(node, sourceFile, considerTrailingComments) {
    var nodeStart = node.getStart(sourceFile);
    var start = ts[considerTrailingComments && isSameLine(sourceFile, node.pos, nodeStart)
        ? 'forEachTrailingCommentRange'
        : 'forEachLeadingCommentRange'](sourceFile.text, node.pos, function (pos, _end, kind) { return kind === ts.SyntaxKind.MultiLineCommentTrivia && sourceFile.text[pos + 2] === '*' ? { pos: pos } : undefined; });
    if (start === undefined)
        return [];
    var startPos = start.pos;
    var text = sourceFile.text.slice(startPos, nodeStart);
    var newSourceFile = ts.createSourceFile('jsdoc.ts', text + "var a;", sourceFile.languageVersion);
    var result = getJsDoc(newSourceFile.statements[0], newSourceFile);
    for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
        var doc = result_1[_i];
        updateNode(doc, node);
    }
    return result;
    function updateNode(n, parent) {
        n.pos += startPos;
        n.end += startPos;
        n.parent = parent;
        return ts.forEachChild(n, function (child) { return updateNode(child, n); }, function (children) {
            children.pos += startPos;
            children.end += startPos;
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                updateNode(child, n);
            }
        });
    }
}
var ImportKind;
(function (ImportKind) {
    ImportKind[ImportKind["ImportDeclaration"] = 1] = "ImportDeclaration";
    ImportKind[ImportKind["ImportEquals"] = 2] = "ImportEquals";
    ImportKind[ImportKind["ExportFrom"] = 4] = "ExportFrom";
    ImportKind[ImportKind["DynamicImport"] = 8] = "DynamicImport";
    ImportKind[ImportKind["Require"] = 16] = "Require";
    ImportKind[ImportKind["ImportType"] = 32] = "ImportType";
    ImportKind[ImportKind["All"] = 63] = "All";
    ImportKind[ImportKind["AllImports"] = 59] = "AllImports";
    ImportKind[ImportKind["AllStaticImports"] = 3] = "AllStaticImports";
    ImportKind[ImportKind["AllImportExpressions"] = 24] = "AllImportExpressions";
    ImportKind[ImportKind["AllRequireLike"] = 18] = "AllRequireLike";
    ImportKind[ImportKind["AllNestedImports"] = 56] = "AllNestedImports";
})(ImportKind = exports.ImportKind || (exports.ImportKind = {}));
var ImportOptions;
(function (ImportOptions) {
    ImportOptions[ImportOptions["ImportDeclaration"] = 1] = "ImportDeclaration";
    ImportOptions[ImportOptions["ImportEquals"] = 2] = "ImportEquals";
    ImportOptions[ImportOptions["ExportFrom"] = 4] = "ExportFrom";
    ImportOptions[ImportOptions["DynamicImport"] = 8] = "DynamicImport";
    ImportOptions[ImportOptions["Require"] = 16] = "Require";
    ImportOptions[ImportOptions["All"] = 31] = "All";
    ImportOptions[ImportOptions["AllImports"] = 27] = "AllImports";
    ImportOptions[ImportOptions["AllStaticImports"] = 3] = "AllStaticImports";
    ImportOptions[ImportOptions["AllDynamic"] = 24] = "AllDynamic";
    ImportOptions[ImportOptions["AllRequireLike"] = 18] = "AllRequireLike";
})(ImportOptions = exports.ImportOptions || (exports.ImportOptions = {}));
function findImports(sourceFile, options) {
    return new ImportFinder(sourceFile, options).find();
}
exports.findImports = findImports;
var ImportFinder = (function () {
    function ImportFinder(_sourceFile, _options) {
        var _this = this;
        this._sourceFile = _sourceFile;
        this._options = _options;
        this._result = [];
        this._findNested = function (node) {
            if (node_1.isCallExpression(node)) {
                if (node.arguments.length === 1 &&
                    (node.expression.kind === ts.SyntaxKind.ImportKeyword && _this._options & 8 ||
                        _this._options & 16 && node.expression.kind === ts.SyntaxKind.Identifier &&
                            node.expression.text === 'require'))
                    _this._addImport(node.arguments[0]);
            }
            else if (node_1.isImportTypeNode(node) && node_1.isLiteralTypeNode(node.argument) && _this._options & 32) {
                _this._addImport(node.argument.literal);
            }
            ts.forEachChild(node, _this._findNested);
        };
    }
    ImportFinder.prototype.find = function () {
        if (this._sourceFile.isDeclarationFile)
            this._options &= ~24;
        this._findImports(this._sourceFile.statements);
        return this._result;
    };
    ImportFinder.prototype._findImports = function (statements) {
        for (var _i = 0, statements_1 = statements; _i < statements_1.length; _i++) {
            var statement = statements_1[_i];
            if (node_1.isImportDeclaration(statement)) {
                if (this._options & 1)
                    this._addImport(statement.moduleSpecifier);
            }
            else if (node_1.isImportEqualsDeclaration(statement)) {
                if (this._options & 2 &&
                    statement.moduleReference.kind === ts.SyntaxKind.ExternalModuleReference &&
                    statement.moduleReference.expression !== undefined)
                    this._addImport(statement.moduleReference.expression);
            }
            else if (node_1.isExportDeclaration(statement)) {
                if (statement.moduleSpecifier !== undefined && this._options & 4)
                    this._addImport(statement.moduleSpecifier);
            }
            else if (node_1.isModuleDeclaration(statement) &&
                this._options & (3 | 4) &&
                statement.body !== undefined && statement.name.kind === ts.SyntaxKind.StringLiteral &&
                ts.isExternalModule(this._sourceFile)) {
                this._findImports(statement.body.statements);
            }
            else if (this._options & 56) {
                ts.forEachChild(statement, this._findNested);
            }
        }
    };
    ImportFinder.prototype._addImport = function (expression) {
        if (node_1.isTextualLiteral(expression))
            this._result.push(expression);
    };
    return ImportFinder;
}());
function isStatementInAmbientContext(node) {
    while (node.flags & ts.NodeFlags.NestedNamespace)
        node = node.parent;
    return hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword) || isAmbientModuleBlock(node.parent);
}
exports.isStatementInAmbientContext = isStatementInAmbientContext;
function isAmbientModuleBlock(node) {
    while (node.kind === ts.SyntaxKind.ModuleBlock) {
        do
            node = node.parent;
        while (node.flags & ts.NodeFlags.NestedNamespace);
        if (hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword))
            return true;
        node = node.parent;
    }
    return false;
}
exports.isAmbientModuleBlock = isAmbientModuleBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQWlDO0FBRWpDLDBDQUcyQjtBQUczQix5REFBK0I7QUFFL0Isd0JBQXdELElBQWEsRUFBRSxJQUFPLEVBQUUsVUFBMEI7SUFDdEcsS0FBb0IsVUFBNEIsRUFBNUIsS0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUE1QixjQUE0QixFQUE1QixJQUE0QjtRQUEzQyxJQUFNLEtBQUssU0FBQTtRQUNaLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJO1lBQ25CLE9BQW9CLEtBQUssQ0FBQztLQUFBO0FBQ3RDLENBQUM7QUFKRCx3Q0FJQztBQUVELHFCQUE0QixJQUFtQjtJQUMzQyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7QUFDL0UsQ0FBQztBQUZELGtDQUVDO0FBRUQsb0JBQTJCLElBQW1CO0lBQzFDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO0FBQzNDLENBQUM7QUFGRCxnQ0FFQztBQUVELDBCQUFpQyxJQUFtQjtJQUNoRCxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7QUFDekYsQ0FBQztBQUZELDRDQUVDO0FBRUQsd0JBQStCLElBQW1CO0lBQzlDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztBQUNyRixDQUFDO0FBRkQsd0NBRUM7QUFFRCxxQkFBNEIsSUFBbUI7SUFDM0MsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FB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
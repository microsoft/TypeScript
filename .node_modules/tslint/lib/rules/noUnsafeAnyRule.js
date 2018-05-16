"use strict";
/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
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
var tslib_1 = require("tslib");
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var utils_1 = require("../utils");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithWalker(new NoUnsafeAnyWalker(sourceFile, this.ruleName, program.getTypeChecker()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-unsafe-any",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Warns when using an expression of type 'any' in a dynamic way.\n            Uses are only allowed if they would work for `{} | null | undefined`.\n            Type casts and tests are allowed.\n            Expressions that work on all values (such as `\"\" + x`) are allowed."], ["\n            Warns when using an expression of type 'any' in a dynamic way.\n            Uses are only allowed if they would work for \\`{} | null | undefined\\`.\n            Type casts and tests are allowed.\n            Expressions that work on all values (such as \\`\"\" + x\\`) are allowed."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            If you're dealing with data of unknown or \"any\" types, you shouldn't be accessing members of it.\n            Either add type annotations for properties that may exist or change the data type to the empty object type `{}`.\n\n            Alternately, if you're creating storage or handling for consistent but unknown types, such as in data structures\n            or serialization, use `<T>` template types for generic type handling.\n\n            Also see the `no-any` rule.\n        "], ["\n            If you're dealing with data of unknown or \"any\" types, you shouldn't be accessing members of it.\n            Either add type annotations for properties that may exist or change the data type to the empty object type \\`{}\\`.\n\n            Alternately, if you're creating storage or handling for consistent but unknown types, such as in data structures\n            or serialization, use \\`<T>\\` template types for generic type handling.\n\n            Also see the \\`no-any\\` rule.\n        "]))),
        type: "functionality",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Unsafe use of expression of type 'any'.";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
var NoUnsafeAnyWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NoUnsafeAnyWalker, _super);
    function NoUnsafeAnyWalker(sourceFile, ruleName, checker) {
        var _this = _super.call(this, sourceFile, ruleName, undefined) || this;
        _this.checker = checker;
        /** Wraps `visitNode` with the correct `this` binding and discards the return value to prevent `forEachChild` from returning early */
        _this.visitNodeCallback = function (node) { return void _this.visitNode(node); };
        return _this;
    }
    NoUnsafeAnyWalker.prototype.walk = function (sourceFile) {
        if (sourceFile.isDeclarationFile) {
            return; // Not possible in a declaration file.
        }
        sourceFile.statements.forEach(this.visitNodeCallback);
    };
    NoUnsafeAnyWalker.prototype.visitNode = function (node, anyOk) {
        switch (node.kind) {
            case ts.SyntaxKind.ParenthesizedExpression:
                // Don't warn on a parenthesized expression, warn on its contents.
                return this.visitNode(node.expression, anyOk);
            case ts.SyntaxKind.LabeledStatement:
                // Ignore label
                return this.visitNode(node.statement);
            // ignore labels
            case ts.SyntaxKind.BreakStatement:
            case ts.SyntaxKind.ContinueStatement:
            // Ignore types
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.TypeParameter:
            case ts.SyntaxKind.IndexSignature:
            // Ignore imports
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ExportDeclaration:
            case ts.SyntaxKind.ExportAssignment:
                return false;
            case ts.SyntaxKind.ThisKeyword:
            case ts.SyntaxKind.Identifier:
                return anyOk ? false : this.check(node);
            // Recurse through these, but ignore the immediate child because it is allowed to be 'any'.
            case ts.SyntaxKind.DeleteExpression:
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.TypeAssertionExpression:
            case ts.SyntaxKind.AsExpression:
            case ts.SyntaxKind.TemplateSpan: // Allow stringification (works on all values). Note: tagged templates handled differently.
            case ts.SyntaxKind.ThrowStatement:
            case ts.SyntaxKind.TypeOfExpression:
            case ts.SyntaxKind.VoidExpression:
                return this.visitNode(node.expression, true);
            case ts.SyntaxKind.PropertyAssignment: {
                var _a = node, name = _a.name, initializer = _a.initializer;
                this.visitNode(name, /*anyOk*/ true);
                if (tsutils_1.isReassignmentTarget(node.parent)) {
                    return this.visitNode(initializer, true);
                }
                return this.checkContextualType(initializer, true);
            }
            case ts.SyntaxKind.ShorthandPropertyAssignment: {
                var _b = node, name = _b.name, objectAssignmentInitializer = _b.objectAssignmentInitializer;
                if (objectAssignmentInitializer !== undefined) {
                    return this.checkContextualType(objectAssignmentInitializer);
                }
                return this.checkContextualType(name, true);
            }
            case ts.SyntaxKind.PropertyDeclaration: {
                var _c = node, name = _c.name, initializer = _c.initializer;
                this.visitNode(name, true);
                return initializer !== undefined &&
                    this.visitNode(initializer, isPropertyAny(node, this.checker));
            }
            case ts.SyntaxKind.SpreadAssignment:
                return this.visitNode(node.expression, 
                // allow any in object spread, but not in object rest
                !tsutils_1.isReassignmentTarget(node.parent));
            case ts.SyntaxKind.ComputedPropertyName:
                return this.visitNode(node.expression, true);
            case ts.SyntaxKind.TaggedTemplateExpression: {
                var _d = node, tag = _d.tag, template = _d.template;
                if (template.kind === ts.SyntaxKind.TemplateExpression) {
                    for (var _i = 0, _e = template.templateSpans; _i < _e.length; _i++) {
                        var expression = _e[_i].expression;
                        this.checkContextualType(expression);
                    }
                }
                // Also check the template expression itself
                if (this.visitNode(tag)) {
                    return true;
                }
                return anyOk ? false : this.check(node);
            }
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.NewExpression: {
                var _f = node, expression = _f.expression, args = _f.arguments;
                if (args !== undefined) {
                    for (var _g = 0, args_1 = args; _g < args_1.length; _g++) {
                        var arg = args_1[_g];
                        this.checkContextualType(arg);
                    }
                }
                if (this.visitNode(expression)) {
                    return true;
                }
                // Also check the call expression itself
                return anyOk ? false : this.check(node);
            }
            case ts.SyntaxKind.PropertyAccessExpression:
                // Don't warn for right hand side; this is redundant if we warn for the access itself.
                if (this.visitNode(node.expression)) {
                    return true;
                }
                return anyOk ? false : this.check(node);
            case ts.SyntaxKind.ElementAccessExpression: {
                var _h = node, expression = _h.expression, argumentExpression = _h.argumentExpression;
                if (argumentExpression !== undefined) {
                    this.visitNode(argumentExpression, true);
                }
                if (this.visitNode(expression)) {
                    return true;
                }
                return anyOk ? false : this.check(node);
            }
            case ts.SyntaxKind.ReturnStatement: {
                var expression = node.expression;
                return expression !== undefined && this.checkContextualType(expression, true);
            }
            case ts.SyntaxKind.SwitchStatement: {
                var _j = node, expression = _j.expression, clauses = _j.caseBlock.clauses;
                // Allow `switch (x) {}` where `x` is any
                this.visitNode(expression, /*anyOk*/ true);
                for (var _k = 0, clauses_1 = clauses; _k < clauses_1.length; _k++) {
                    var clause = clauses_1[_k];
                    if (clause.kind === ts.SyntaxKind.CaseClause) {
                        // Allow `case x:` where `x` is any
                        this.visitNode(clause.expression, /*anyOk*/ true);
                    }
                    for (var _l = 0, _m = clause.statements; _l < _m.length; _l++) {
                        var statement = _m[_l];
                        this.visitNode(statement);
                    }
                }
                return false;
            }
            case ts.SyntaxKind.ModuleDeclaration: {
                // In `declare global { ... }`, don't mark `global` as unsafe any.
                var body = node.body;
                return body !== undefined && this.visitNode(body);
            }
            case ts.SyntaxKind.IfStatement: {
                var _o = node, expression = _o.expression, thenStatement = _o.thenStatement, elseStatement = _o.elseStatement;
                this.visitNode(expression, true); // allow truthyness check
                this.visitNode(thenStatement);
                return elseStatement !== undefined && this.visitNode(elseStatement);
            }
            case ts.SyntaxKind.PrefixUnaryExpression: {
                var _p = node, operator = _p.operator, operand = _p.operand;
                this.visitNode(operand, operator === ts.SyntaxKind.ExclamationToken); // allow falsyness check
                return false;
            }
            case ts.SyntaxKind.ForStatement: {
                var _q = node, initializer = _q.initializer, condition = _q.condition, incrementor = _q.incrementor, statement = _q.statement;
                if (initializer !== undefined) {
                    this.visitNode(initializer, true);
                }
                if (condition !== undefined) {
                    this.visitNode(condition, true);
                } // allow truthyness check
                if (incrementor !== undefined) {
                    this.visitNode(incrementor, true);
                }
                return this.visitNode(statement);
            }
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.WhileStatement:
                this.visitNode(node.expression, true);
                return this.visitNode(node.statement);
            case ts.SyntaxKind.ConditionalExpression: {
                var _r = node, condition = _r.condition, whenTrue = _r.whenTrue, whenFalse = _r.whenFalse;
                this.visitNode(condition, true);
                var left = this.visitNode(whenTrue, anyOk);
                return this.visitNode(whenFalse, anyOk) || left;
            }
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.Parameter:
                return this.checkVariableOrParameterDeclaration(node);
            case ts.SyntaxKind.BinaryExpression:
                return this.checkBinaryExpression(node, anyOk);
            case ts.SyntaxKind.AwaitExpression:
                this.visitNode(node.expression);
                return anyOk ? false : this.check(node);
            case ts.SyntaxKind.YieldExpression:
                return this.checkYieldExpression(node, anyOk);
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.ClassDeclaration:
                this.checkClassLikeDeclaration(node);
                return false;
            case ts.SyntaxKind.ArrayLiteralExpression: {
                for (var _s = 0, _t = node.elements; _s < _t.length; _s++) {
                    var element = _t[_s];
                    this.checkContextualType(element, true);
                }
                return false;
            }
            case ts.SyntaxKind.JsxExpression:
                return node.expression !== undefined &&
                    this.checkContextualType(node.expression);
        }
        if (tsutils_1.isTypeNodeKind(node.kind) || tsutils_1.isTokenKind(node.kind)) {
            return false;
        }
        return ts.forEachChild(node, this.visitNodeCallback);
    };
    NoUnsafeAnyWalker.prototype.check = function (node) {
        if (!isNodeAny(node, this.checker)) {
            return false;
        }
        this.addFailureAtNode(node, Rule.FAILURE_STRING);
        return true;
    };
    NoUnsafeAnyWalker.prototype.checkContextualType = function (node, allowIfNoContextualType) {
        var type = this.checker.getContextualType(node);
        return this.visitNode(node, type === undefined && allowIfNoContextualType || isAny(type));
    };
    // Allow `const x = foo;` and `const x: any = foo`, but not `const x: Foo = foo;`.
    NoUnsafeAnyWalker.prototype.checkVariableOrParameterDeclaration = function (_a) {
        var name = _a.name, type = _a.type, initializer = _a.initializer;
        this.checkBindingName(name);
        // Always allow the LHS to be `any`. Just don't allow RHS to be `any` when LHS isn't.
        return initializer !== undefined &&
            this.visitNode(initializer, 
            /*anyOk*/
            name.kind === ts.SyntaxKind.Identifier && (type === undefined || type.kind === ts.SyntaxKind.AnyKeyword) ||
                type !== undefined && type.kind === ts.SyntaxKind.AnyKeyword);
    };
    NoUnsafeAnyWalker.prototype.checkBinaryExpression = function (node, anyOk) {
        var allowAnyLeft = false;
        var allowAnyRight = false;
        switch (node.operatorToken.kind) {
            case ts.SyntaxKind.ExclamationEqualsEqualsToken:
            case ts.SyntaxKind.ExclamationEqualsToken:
            case ts.SyntaxKind.EqualsEqualsEqualsToken:
            case ts.SyntaxKind.EqualsEqualsToken:
            case ts.SyntaxKind.CommaToken: // Allow `any, any`
            case ts.SyntaxKind.BarBarToken: // Allow `any || any`
            case ts.SyntaxKind.AmpersandAmpersandToken: // Allow `any && any`
                allowAnyLeft = allowAnyRight = true;
                break;
            case ts.SyntaxKind.InstanceOfKeyword: // Allow test
                allowAnyLeft = true;
                break;
            case ts.SyntaxKind.EqualsToken:
                // Allow assignment if the lhs is also *any*.
                allowAnyLeft = true;
                allowAnyRight = isNodeAny(node.left, this.checker);
                break;
            case ts.SyntaxKind.PlusToken: // Allow implicit stringification
            case ts.SyntaxKind.PlusEqualsToken:
                allowAnyLeft = allowAnyRight = isStringLike(node.left, this.checker)
                    || (isStringLike(node.right, this.checker) && node.operatorToken.kind === ts.SyntaxKind.PlusToken);
        }
        this.visitNode(node.left, allowAnyLeft);
        this.visitNode(node.right, allowAnyRight);
        return anyOk ? false : this.check(node);
    };
    NoUnsafeAnyWalker.prototype.checkYieldExpression = function (node, anyOk) {
        if (node.expression !== undefined) {
            this.checkContextualType(node.expression, true);
        }
        if (anyOk) {
            return false;
        }
        this.addFailureAtNode(node, Rule.FAILURE_STRING);
        return true;
    };
    NoUnsafeAnyWalker.prototype.checkClassLikeDeclaration = function (node) {
        if (node.decorators !== undefined) {
            node.decorators.forEach(this.visitNodeCallback);
        }
        if (node.heritageClauses !== undefined) {
            node.heritageClauses.forEach(this.visitNodeCallback);
        }
        return node.members.forEach(this.visitNodeCallback);
    };
    NoUnsafeAnyWalker.prototype.checkBindingName = function (node) {
        if (node.kind !== ts.SyntaxKind.Identifier) {
            if (isNodeAny(node, this.checker)) {
                this.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
            for (var _i = 0, _a = node.elements; _i < _a.length; _i++) {
                var element = _a[_i];
                if (element.kind !== ts.SyntaxKind.OmittedExpression) {
                    if (element.propertyName !== undefined && element.propertyName.kind === ts.SyntaxKind.ComputedPropertyName) {
                        this.visitNode(element.propertyName.expression);
                    }
                    this.checkBindingName(element.name);
                    if (element.initializer !== undefined) {
                        this.checkContextualType(element.initializer);
                    }
                }
            }
        }
    };
    return NoUnsafeAnyWalker;
}(Lint.AbstractWalker));
/** Check if property has no type annotation in this class and the base class */
function isPropertyAny(node, checker) {
    if (!isNodeAny(node.name, checker) || node.name.kind === ts.SyntaxKind.ComputedPropertyName) {
        return false;
    }
    for (var _i = 0, _a = checker.getBaseTypes(checker.getTypeAtLocation(node.parent)); _i < _a.length; _i++) {
        var base = _a[_i];
        var prop = base.getProperty(node.name.text);
        if (prop !== undefined && prop.declarations !== undefined) {
            return isAny(checker.getTypeOfSymbolAtLocation(prop, prop.declarations[0]));
        }
    }
    return true;
}
function isNodeAny(node, checker) {
    var symbol = checker.getSymbolAtLocation(node);
    if (symbol !== undefined && tsutils_1.isSymbolFlagSet(symbol, ts.SymbolFlags.Alias)) {
        symbol = checker.getAliasedSymbol(symbol);
    }
    if (symbol !== undefined) {
        // NamespaceModule is a type-only namespace without runtime value, its type is 'any' when used as 'ns.Type' -> avoid error
        if (tsutils_1.isSymbolFlagSet(symbol, ts.SymbolFlags.NamespaceModule)) {
            return false;
        }
        if (tsutils_1.isSymbolFlagSet(symbol, ts.SymbolFlags.Type)) {
            return isAny(checker.getDeclaredTypeOfSymbol(symbol));
        }
    }
    // Lowercase JSX elements are assumed to be allowed by design
    if (isJsxNativeElement(node)) {
        return false;
    }
    return isAny(checker.getTypeAtLocation(node));
}
var jsxElementTypes = new Set([
    ts.SyntaxKind.JsxClosingElement,
    ts.SyntaxKind.JsxOpeningElement,
    ts.SyntaxKind.JsxSelfClosingElement,
]);
function isJsxNativeElement(node) {
    if (!tsutils_1.isIdentifier(node) || node.parent === undefined) {
        return false;
    }
    // TypeScript <=2.1 incorrectly parses JSX fragments
    if (node.text === "") {
        return true;
    }
    return jsxElementTypes.has(node.parent.kind) && utils_1.isLowerCase(node.text[0]);
}
function isStringLike(expr, checker) {
    return tsutils_1.isTypeFlagSet(checker.getTypeAtLocation(expr), ts.TypeFlags.StringLike);
}
function isAny(type) {
    return type !== undefined && tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Any);
}
var templateObject_1, templateObject_2;

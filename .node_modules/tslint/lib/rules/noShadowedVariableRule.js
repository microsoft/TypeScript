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
var tslib_1 = require("tslib");
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (name) {
        return "Shadowed name: '" + name + "'";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoShadowedVariableWalker(sourceFile, this.ruleName, parseOptions(this.ruleArguments[0])));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-shadowed-variable",
        description: "Disallows shadowing variable declarations.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Shadowing a variable masks access to it and obscures to what value an identifier actually refers.\n            For example, in the following code, it can be confusing why the filter is likely never true:\n\n            ```\n            const findNeighborsWithin = (instance: MyClass, instances: MyClass[]): MyClass[] => {\n                return instances.filter((instance) => instance.neighbors.includes(instance));\n            };\n            ```\n        "], ["\n            Shadowing a variable masks access to it and obscures to what value an identifier actually refers.\n            For example, in the following code, it can be confusing why the filter is likely never true:\n\n            \\`\\`\\`\n            const findNeighborsWithin = (instance: MyClass, instances: MyClass[]): MyClass[] => {\n                return instances.filter((instance) => instance.neighbors.includes(instance));\n            };\n            \\`\\`\\`\n        "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            You can optionally pass an object to disable checking for certain kinds of declarations.\n            Possible keys are `\"class\"`, `\"enum\"`, `\"function\"`, `\"import\"`, `\"interface\"`, `\"namespace\"`, `\"typeAlias\"`\n            and `\"typeParameter\"`. Just set the value to `false` for the check you want to disable.\n            All checks default to `true`, i.e. are enabled by default.\n            Note that you cannot disable variables and parameters.\n\n            The option `\"temporalDeadZone\"` defaults to `true` which shows errors when shadowing block scoped declarations in their\n            temporal dead zone. When set to `false` parameters, classes, enums and variables declared\n            with `let` or `const` are not considered shadowed if the shadowing occurs within their\n            [temporal dead zone](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified).\n\n            The following example shows how the `\"temporalDeadZone\"` option changes the linting result:\n\n            ```ts\n            function fn(value) {\n                if (value) {\n                    const tmp = value; // no error on this line if \"temporalDeadZone\" is false\n                    return tmp;\n                }\n                let tmp = undefined;\n                if (!value) {\n                    const tmp = value; // this line always contains an error\n                    return tmp;\n                }\n            }\n            ```\n        "], ["\n            You can optionally pass an object to disable checking for certain kinds of declarations.\n            Possible keys are \\`\"class\"\\`, \\`\"enum\"\\`, \\`\"function\"\\`, \\`\"import\"\\`, \\`\"interface\"\\`, \\`\"namespace\"\\`, \\`\"typeAlias\"\\`\n            and \\`\"typeParameter\"\\`. Just set the value to \\`false\\` for the check you want to disable.\n            All checks default to \\`true\\`, i.e. are enabled by default.\n            Note that you cannot disable variables and parameters.\n\n            The option \\`\"temporalDeadZone\"\\` defaults to \\`true\\` which shows errors when shadowing block scoped declarations in their\n            temporal dead zone. When set to \\`false\\` parameters, classes, enums and variables declared\n            with \\`let\\` or \\`const\\` are not considered shadowed if the shadowing occurs within their\n            [temporal dead zone](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified).\n\n            The following example shows how the \\`\"temporalDeadZone\"\\` option changes the linting result:\n\n            \\`\\`\\`ts\n            function fn(value) {\n                if (value) {\n                    const tmp = value; // no error on this line if \"temporalDeadZone\" is false\n                    return tmp;\n                }\n                let tmp = undefined;\n                if (!value) {\n                    const tmp = value; // this line always contains an error\n                    return tmp;\n                }\n            }\n            \\`\\`\\`\n        "]))),
        options: {
            type: "object",
            properties: {
                class: { type: "boolean" },
                enum: { type: "boolean" },
                function: { type: "boolean" },
                import: { type: "boolean" },
                interface: { type: "boolean" },
                namespace: { type: "boolean" },
                typeAlias: { type: "boolean" },
                typeParameter: { type: "boolean" },
                temporalDeadZone: { type: "boolean" },
            },
        },
        optionExamples: [
            true,
            [true, { class: true, enum: true, function: true, interface: false, namespace: true, typeAlias: false, typeParameter: false }],
        ],
        type: "functionality",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function parseOptions(option) {
    return tslib_1.__assign({ class: true, enum: true, function: true, import: true, interface: true, namespace: true, temporalDeadZone: true, typeAlias: true, typeParameter: true }, option);
}
var Scope = /** @class */ (function () {
    function Scope(functionScope) {
        this.variables = new Map();
        this.variablesSeen = new Map();
        this.reassigned = new Set();
        // if no functionScope is provided we are in the process of creating a new function scope, which for consistency links to itself
        this.functionScope = functionScope !== undefined ? functionScope : this;
    }
    Scope.prototype.addVariable = function (identifier, blockScoped, tdz) {
        if (blockScoped === void 0) { blockScoped = true; }
        if (tdz === void 0) { tdz = false; }
        // block scoped variables go to the block scope, function scoped variables to the containing function scope
        var scope = blockScoped ? this : this.functionScope;
        var list = scope.variables.get(identifier.text);
        var variableInfo = {
            identifier: identifier,
            tdz: tdz,
        };
        if (list === undefined) {
            scope.variables.set(identifier.text, [variableInfo]);
        }
        else {
            list.push(variableInfo);
        }
    };
    return Scope;
}());
var NoShadowedVariableWalker = /** @class */ (function (_super) {
    tslib_1.__extends(NoShadowedVariableWalker, _super);
    function NoShadowedVariableWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoShadowedVariableWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        if (sourceFile.isDeclarationFile) {
            return;
        }
        this.scope = new Scope();
        var cb = function (node) {
            var parentScope = _this.scope;
            if ((_this.options.function && tsutils_1.isFunctionExpression(node) || _this.options.class && tsutils_1.isClassExpression(node)) &&
                node.name !== undefined) {
                /* special handling for named function and class expressions:
                   technically the name of the function is only visible inside of it,
                   but variables with the same name declared inside don't cause compiler errors.
                   Therefore we add an additional function scope only for the function name to avoid merging with other declarations */
                var functionScope = new Scope();
                functionScope.addVariable(node.name, false);
                _this.scope = new Scope();
                if (tsutils_1.isClassExpression(node)) {
                    _this.visitClassLikeDeclaration(node, functionScope, cb);
                }
                else {
                    ts.forEachChild(node, cb);
                }
                _this.onScopeEnd(functionScope);
                _this.scope = functionScope;
                _this.onScopeEnd(parentScope);
                _this.scope = parentScope;
                return;
            }
            /* Visit decorators before entering a function scope.
               In the AST decorators are children of the declaration they decorate, but we don't want to warn for the following code:
               @decorator((param) => param)
               function foo(param) {}
            */
            if (node.decorators !== undefined) {
                for (var _i = 0, _a = node.decorators; _i < _a.length; _i++) {
                    var decorator = _a[_i];
                    ts.forEachChild(decorator, cb);
                }
            }
            var boundary = tsutils_1.isScopeBoundary(node);
            if (boundary === 2 /* Block */) {
                _this.scope = new Scope(parentScope.functionScope);
            }
            else if (boundary === 1 /* Function */) {
                _this.scope = new Scope();
            }
            switch (node.kind) {
                case ts.SyntaxKind.Decorator:
                    return; // handled above
                case ts.SyntaxKind.VariableDeclarationList:
                    _this.handleVariableDeclarationList(node);
                    break;
                case ts.SyntaxKind.TypeParameter:
                    if (_this.options.typeParameter) {
                        _this.scope.addVariable(node.name);
                    }
                    break;
                case ts.SyntaxKind.FunctionDeclaration:
                    if (_this.options.function && node.name !== undefined) {
                        parentScope.addVariable(node.name, false);
                    }
                    break;
                case ts.SyntaxKind.ClassDeclaration:
                    if (_this.options.class && node.name !== undefined) {
                        parentScope.addVariable(node.name, true, true);
                    }
                // falls through
                case ts.SyntaxKind.ClassExpression:
                    _this.visitClassLikeDeclaration(node, parentScope, cb);
                    _this.onScopeEnd(parentScope);
                    _this.scope = parentScope;
                    return;
                case ts.SyntaxKind.TypeAliasDeclaration:
                    if (_this.options.typeAlias) {
                        parentScope.addVariable(node.name);
                    }
                    break;
                case ts.SyntaxKind.EnumDeclaration:
                    if (_this.options.enum) {
                        parentScope.addVariable(node.name, true, true);
                    }
                    break;
                case ts.SyntaxKind.InterfaceDeclaration:
                    if (_this.options.interface) {
                        parentScope.addVariable(node.name);
                    }
                    break;
                case ts.SyntaxKind.Parameter:
                    if (node.parent.kind !== ts.SyntaxKind.IndexSignature &&
                        !tsutils_1.isThisParameter(node) &&
                        tsutils_1.isFunctionWithBody(node.parent)) {
                        _this.handleBindingName(node.name, false, true);
                    }
                    break;
                case ts.SyntaxKind.ModuleDeclaration:
                    if (_this.options.namespace &&
                        node.parent.kind !== ts.SyntaxKind.ModuleDeclaration &&
                        node.name.kind === ts.SyntaxKind.Identifier &&
                        !tsutils_1.isNodeFlagSet(node, ts.NodeFlags.GlobalAugmentation)) {
                        parentScope.addVariable(node.name, false);
                    }
                    if (tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword)) {
                        _this.onScopeEnd(parentScope);
                        _this.scope = parentScope;
                        return; // don't check any ambient declaration blocks
                    }
                    break;
                case ts.SyntaxKind.ImportClause:
                    if (_this.options.import && node.name !== undefined) {
                        _this.scope.addVariable(node.name, false);
                    }
                    break;
                case ts.SyntaxKind.NamespaceImport:
                case ts.SyntaxKind.ImportSpecifier:
                case ts.SyntaxKind.ImportEqualsDeclaration:
                    if (_this.options.import) {
                        _this.scope.addVariable(node.name, false);
                    }
            }
            if (boundary !== 0 /* None */) {
                ts.forEachChild(node, cb);
                _this.onScopeEnd(parentScope);
                _this.scope = parentScope;
            }
            else {
                return ts.forEachChild(node, cb);
            }
        };
        ts.forEachChild(sourceFile, cb);
        this.onScopeEnd();
    };
    NoShadowedVariableWalker.prototype.visitClassLikeDeclaration = function (declaration, parentScope, cb) {
        var _this = this;
        var currentScope = this.scope;
        ts.forEachChild(declaration, function (node) {
            if (!tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword)) {
                return cb(node);
            }
            /* Don't treat static members as children of the class' scope. That avoid shadowed type parameter warnings on static members.
               class C<T> {
                   static method<T>() {}
               }
            */
            _this.scope = parentScope;
            cb(node);
            _this.scope = currentScope;
        });
    };
    NoShadowedVariableWalker.prototype.handleVariableDeclarationList = function (node) {
        var blockScoped = tsutils_1.isBlockScopedVariableDeclarationList(node);
        for (var _i = 0, _a = node.declarations; _i < _a.length; _i++) {
            var variable = _a[_i];
            this.handleBindingName(variable.name, blockScoped);
        }
    };
    NoShadowedVariableWalker.prototype.handleBindingName = function (node, blockScoped, tdz) {
        if (tdz === void 0) { tdz = blockScoped; }
        if (node.kind === ts.SyntaxKind.Identifier) {
            this.scope.addVariable(node, blockScoped, tdz);
        }
        else {
            for (var _i = 0, _a = node.elements; _i < _a.length; _i++) {
                var element = _a[_i];
                if (element.kind !== ts.SyntaxKind.OmittedExpression) {
                    this.handleBindingName(element.name, blockScoped, tdz);
                }
            }
        }
    };
    NoShadowedVariableWalker.prototype.onScopeEnd = function (parent) {
        var _this = this;
        var _a = this.scope, variables = _a.variables, variablesSeen = _a.variablesSeen;
        variablesSeen.forEach(function (identifiers, name) {
            var declarationsInScope = variables.get(name);
            var _loop_1 = function (identifier) {
                if (declarationsInScope !== undefined &&
                    (_this.options.temporalDeadZone ||
                        // check if any of the declaration either has no temporal dead zone or is declared before the identifier
                        declarationsInScope.some(function (declaration) { return !declaration.tdz || declaration.identifier.pos < identifier.pos; }))) {
                    _this.addFailureAtNode(identifier, Rule.FAILURE_STRING_FACTORY(name));
                }
                else if (parent !== undefined) {
                    addOneToList(parent.variablesSeen, name, identifier);
                }
            };
            for (var _i = 0, identifiers_1 = identifiers; _i < identifiers_1.length; _i++) {
                var identifier = identifiers_1[_i];
                _loop_1(identifier);
            }
        });
        if (parent !== undefined) {
            variables.forEach(function (identifiers, name) {
                addToList(parent.variablesSeen, name, identifiers);
            });
        }
    };
    return NoShadowedVariableWalker;
}(Lint.AbstractWalker));
function addToList(map, name, variables) {
    var list = map.get(name);
    if (list === undefined) {
        list = [];
        map.set(name, list);
    }
    for (var _i = 0, variables_1 = variables; _i < variables_1.length; _i++) {
        var variable = variables_1[_i];
        list.push(variable.identifier);
    }
}
function addOneToList(map, name, identifier) {
    var list = map.get(name);
    if (list === undefined) {
        map.set(name, [identifier]);
    }
    else {
        list.push(identifier);
    }
}
var templateObject_1, templateObject_2;

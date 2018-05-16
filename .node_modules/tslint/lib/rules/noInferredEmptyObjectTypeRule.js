"use strict";
/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithWalker(new NoInferredEmptyObjectTypeRule(sourceFile, this.ruleName, program.getTypeChecker()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-inferred-empty-object-type",
        description: "Disallow type inference of {} (empty object type) at function and constructor call sites",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            When function or constructor may be called with a type parameter but one isn't supplied or inferrable,\n            TypeScript defaults to `{}`.\n            This is often undesirable as the call is meant to be of a more specific type.\n        "], ["\n            When function or constructor may be called with a type parameter but one isn't supplied or inferrable,\n            TypeScript defaults to \\`{}\\`.\n            This is often undesirable as the call is meant to be of a more specific type.\n        "]))),
        type: "functionality",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.EMPTY_INTERFACE_INSTANCE = "Explicit type parameter needs to be provided to the constructor";
    Rule.EMPTY_INTERFACE_FUNCTION = "Explicit type parameter needs to be provided to the function call";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
var NoInferredEmptyObjectTypeRule = /** @class */ (function (_super) {
    tslib_1.__extends(NoInferredEmptyObjectTypeRule, _super);
    function NoInferredEmptyObjectTypeRule(sourceFile, ruleName, checker) {
        var _this = _super.call(this, sourceFile, ruleName, undefined) || this;
        _this.checker = checker;
        return _this;
    }
    NoInferredEmptyObjectTypeRule.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (node.kind === ts.SyntaxKind.CallExpression) {
                _this.checkCallExpression(node);
            }
            else if (node.kind === ts.SyntaxKind.NewExpression) {
                _this.checkNewExpression(node);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    NoInferredEmptyObjectTypeRule.prototype.checkNewExpression = function (node) {
        var _this = this;
        if (node.typeArguments === undefined) {
            var type = this.checker.getTypeAtLocation(node);
            if (tsutils_1.isTypeReference(type) && type.typeArguments !== undefined &&
                type.typeArguments.some(function (a) { return tsutils_1.isObjectType(a) && _this.isEmptyObjectInterface(a); })) {
                this.addFailureAtNode(node, Rule.EMPTY_INTERFACE_INSTANCE);
            }
        }
    };
    NoInferredEmptyObjectTypeRule.prototype.checkCallExpression = function (node) {
        if (node.typeArguments !== undefined) {
            return;
        }
        var callSig = this.checker.getResolvedSignature(node);
        if (callSig === undefined) {
            return;
        }
        var retType = this.checker.getReturnTypeOfSignature(callSig);
        if (tsutils_1.isObjectType(retType) && this.isEmptyObjectInterface(retType)) {
            this.addFailureAtNode(node, Rule.EMPTY_INTERFACE_FUNCTION);
        }
    };
    NoInferredEmptyObjectTypeRule.prototype.isEmptyObjectInterface = function (objType) {
        var _this = this;
        return tsutils_1.isObjectFlagSet(objType, ts.ObjectFlags.Anonymous) &&
            objType.getProperties().length === 0 &&
            objType.getNumberIndexType() === undefined &&
            objType.getStringIndexType() === undefined &&
            objType.getCallSignatures().every(function (signature) {
                var type = _this.checker.getReturnTypeOfSignature(signature);
                return tsutils_1.isObjectType(type) && _this.isEmptyObjectInterface(type);
            });
    };
    return NoInferredEmptyObjectTypeRule;
}(Lint.AbstractWalker));
var templateObject_1;

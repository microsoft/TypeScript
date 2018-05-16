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
        return this.applyWithWalker(new Walker(sourceFile, this.ruleName, this.ruleArguments, program.getTypeChecker()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-unnecessary-type-assertion",
        description: "Warns if a type assertion does not change the type of an expression.",
        options: {
            type: "list",
            listType: {
                type: "array",
                items: { type: "string" },
            },
        },
        optionsDescription: "A list of whitelisted assertion types to ignore",
        type: "typescript",
        hasFix: true,
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "This assertion is unnecessary since it does not change the type of the expression.";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
var Walker = /** @class */ (function (_super) {
    tslib_1.__extends(Walker, _super);
    function Walker(sourceFile, ruleName, options, checker) {
        var _this = _super.call(this, sourceFile, ruleName, options) || this;
        _this.checker = checker;
        return _this;
    }
    Walker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            switch (node.kind) {
                case ts.SyntaxKind.NonNullExpression:
                    _this.checkNonNullAssertion(node);
                    break;
                case ts.SyntaxKind.TypeAssertionExpression:
                case ts.SyntaxKind.AsExpression:
                    _this.verifyCast(node);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    Walker.prototype.checkNonNullAssertion = function (node) {
        var type = this.checker.getTypeAtLocation(node.expression);
        if (type === this.checker.getNonNullableType(type)) {
            this.addFailureAtNode(node, Rule.FAILURE_STRING, Lint.Replacement.deleteFromTo(node.expression.end, node.end));
        }
    };
    Walker.prototype.verifyCast = function (node) {
        if (this.options.indexOf(node.type.getText(this.sourceFile)) !== -1) {
            return;
        }
        var castType = this.checker.getTypeAtLocation(node);
        if (tsutils_1.isTypeFlagSet(castType, ts.TypeFlags.Literal) ||
            tsutils_1.isObjectType(castType) && (tsutils_1.isObjectFlagSet(castType, ts.ObjectFlags.Tuple) || couldBeTupleType(castType))) {
            // It's not always safe to remove a cast to a literal type or tuple
            // type, as those types are sometimes widened without the cast.
            return;
        }
        var uncastType = this.checker.getTypeAtLocation(node.expression);
        if (uncastType === castType) {
            this.addFailureAtNode(node, Rule.FAILURE_STRING, node.kind === ts.SyntaxKind.TypeAssertionExpression
                ? Lint.Replacement.deleteFromTo(node.getStart(), node.expression.getStart())
                : Lint.Replacement.deleteFromTo(node.expression.end, node.end));
        }
    };
    return Walker;
}(Lint.AbstractWalker));
/**
 * Sometimes tuple types don't have ObjectFlags.Tuple set, like when they're being matched against an inferred type.
 * So, in addition, check if there are integer properties 0..n and no other numeric keys
 */
function couldBeTupleType(type) {
    var properties = type.getProperties();
    if (properties.length === 0) {
        return false;
    }
    var i = 0;
    for (; i < properties.length; ++i) {
        var name = properties[i].name;
        if (String(i) !== name) {
            if (i === 0) {
                // if there are no integer properties, this is not a tuple
                return false;
            }
            break;
        }
    }
    for (; i < properties.length; ++i) {
        if (String(+properties[i].name) === properties[i].name) {
            return false; // if there are any other numeric properties, this is not a tuple
        }
    }
    return true;
}

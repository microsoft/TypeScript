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
var OPTION_ALWAYS = "always";
var OPTION_AS_NEEDED = "as-needed";
var OPTION_CONSISTENT = "consistent";
var OPTION_CONSISTENT_AS_NEEDED = "consistent-as-needed";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.UNNEEDED_QUOTES = function (name) {
        return "Unnecessarily quoted property '" + name + "' found.";
    };
    Rule.UNQUOTED_PROPERTY = function (name) {
        return "Unquoted property '" + name + "' found.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ObjectLiteralKeyQuotesWalker(sourceFile, this.ruleName, {
            option: this.ruleArguments.length === 0 ? "always" : this.ruleArguments[0],
        }));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "object-literal-key-quotes",
        description: "Enforces consistent object literal property quote style.",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Object literal property names can be defined in two ways: using literals or using strings.\n            For example, these two objects are equivalent:\n\n            var object1 = {\n                property: true\n            };\n\n            var object2 = {\n                \"property\": true\n            };\n\n            In many cases, it doesn\u2019t matter if you choose to use an identifier instead of a string\n            or vice-versa. Even so, you might decide to enforce a consistent style in your code.\n\n            This rules lets you enforce consistent quoting of property names. Either they should always\n            be quoted (default behavior) or quoted only as needed (\"as-needed\")."], ["\n            Object literal property names can be defined in two ways: using literals or using strings.\n            For example, these two objects are equivalent:\n\n            var object1 = {\n                property: true\n            };\n\n            var object2 = {\n                \"property\": true\n            };\n\n            In many cases, it doesn\u2019t matter if you choose to use an identifier instead of a string\n            or vice-versa. Even so, you might decide to enforce a consistent style in your code.\n\n            This rules lets you enforce consistent quoting of property names. Either they should always\n            be quoted (default behavior) or quoted only as needed (\"as-needed\")."]))),
        hasFix: true,
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Possible settings are:\n\n            * `\"", "\"`: Property names should always be quoted. (This is the default.)\n            * `\"", "\"`: Only property names which require quotes may be quoted (e.g. those with spaces in them).\n            * `\"", "\"`: Property names should either all be quoted or unquoted.\n            * `\"", "\"`: If any property name requires quotes, then all properties must be quoted. Otherwise, no\n            property names may be quoted.\n\n            For ES6, computed property names (`{[name]: value}`) and methods (`{foo() {}}`) never need\n            to be quoted."], ["\n            Possible settings are:\n\n            * \\`\"", "\"\\`: Property names should always be quoted. (This is the default.)\n            * \\`\"", "\"\\`: Only property names which require quotes may be quoted (e.g. those with spaces in them).\n            * \\`\"", "\"\\`: Property names should either all be quoted or unquoted.\n            * \\`\"", "\"\\`: If any property name requires quotes, then all properties must be quoted. Otherwise, no\n            property names may be quoted.\n\n            For ES6, computed property names (\\`{[name]: value}\\`) and methods (\\`{foo() {}}\\`) never need\n            to be quoted."])), OPTION_ALWAYS, OPTION_AS_NEEDED, OPTION_CONSISTENT, OPTION_CONSISTENT_AS_NEEDED),
        options: {
            type: "string",
            enum: [OPTION_ALWAYS, OPTION_AS_NEEDED, OPTION_CONSISTENT, OPTION_CONSISTENT_AS_NEEDED],
        },
        optionExamples: [[true, OPTION_AS_NEEDED], [true, OPTION_ALWAYS]],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.INCONSISTENT_PROPERTY = "All property names in this object literal must be consistently quoted or unquoted.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ObjectLiteralKeyQuotesWalker = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectLiteralKeyQuotesWalker, _super);
    function ObjectLiteralKeyQuotesWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectLiteralKeyQuotesWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (tsutils_1.isObjectLiteralExpression(node)) {
                var propertyNames = Lint.Utils.mapDefined(node.properties, mapPropertyName);
                outer: switch (_this.options.option) {
                    case "always":
                        for (var _i = 0, propertyNames_1 = propertyNames; _i < propertyNames_1.length; _i++) {
                            var name = propertyNames_1[_i];
                            if (name.kind !== ts.SyntaxKind.StringLiteral) {
                                _this.reportMissing(name);
                            }
                        }
                        break;
                    case "as-needed":
                        for (var _a = 0, propertyNames_2 = propertyNames; _a < propertyNames_2.length; _a++) {
                            var name = propertyNames_2[_a];
                            if (name.kind === ts.SyntaxKind.StringLiteral && tsutils_1.isValidPropertyName(name.text)) {
                                _this.reportUnnecessary(name);
                            }
                        }
                        break;
                    case "consistent":
                        if (hasInconsistentQuotes(propertyNames)) {
                            // No fix -- don't know if they would want to add quotes or remove them.
                            _this.addFailureAt(node.getStart(_this.sourceFile), 1, Rule.INCONSISTENT_PROPERTY);
                        }
                        break;
                    case "consistent-as-needed":
                        for (var _b = 0, propertyNames_3 = propertyNames; _b < propertyNames_3.length; _b++) {
                            var name = propertyNames_3[_b];
                            if (name.kind === ts.SyntaxKind.StringLiteral && !tsutils_1.isValidPropertyName(name.text)) {
                                for (var _c = 0, propertyNames_4 = propertyNames; _c < propertyNames_4.length; _c++) {
                                    var propertyName = propertyNames_4[_c];
                                    if (propertyName.kind !== ts.SyntaxKind.StringLiteral) {
                                        _this.reportMissing(propertyName);
                                    }
                                }
                                break outer;
                            }
                        }
                        for (var _d = 0, propertyNames_5 = propertyNames; _d < propertyNames_5.length; _d++) {
                            var name = propertyNames_5[_d];
                            if (name.kind === ts.SyntaxKind.StringLiteral) {
                                _this.reportUnnecessary(name);
                            }
                        }
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    ObjectLiteralKeyQuotesWalker.prototype.reportMissing = function (node) {
        var start = node.getStart(this.sourceFile);
        this.addFailure(start, node.end, Rule.UNQUOTED_PROPERTY(node.text), Lint.Replacement.replaceFromTo(start, node.end, "\"" + node.text + "\""));
    };
    ObjectLiteralKeyQuotesWalker.prototype.reportUnnecessary = function (node) {
        this.addFailureAtNode(node, Rule.UNNEEDED_QUOTES(node.text), Lint.Replacement.replaceNode(node, node.text, this.sourceFile));
    };
    return ObjectLiteralKeyQuotesWalker;
}(Lint.AbstractWalker));
function mapPropertyName(property) {
    if (property.kind === ts.SyntaxKind.ShorthandPropertyAssignment ||
        property.kind === ts.SyntaxKind.SpreadAssignment ||
        property.name.kind === ts.SyntaxKind.ComputedPropertyName) {
        return undefined;
    }
    return property.name;
}
function hasInconsistentQuotes(properties) {
    if (properties.length < 2) {
        return false;
    }
    var quoted = properties[0].kind === ts.SyntaxKind.StringLiteral;
    for (var i = 1; i < properties.length; ++i) {
        if (quoted !== (properties[i].kind === ts.SyntaxKind.StringLiteral)) {
            return true;
        }
    }
    return false;
}
var templateObject_1, templateObject_2;

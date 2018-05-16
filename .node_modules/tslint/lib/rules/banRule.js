"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (expression, messageAddition) {
        return "Calls to '" + expression + "' are not allowed." + (messageAddition !== undefined ? " " + messageAddition : "");
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new BanFunctionWalker(sourceFile, this.ruleName, parseOptions(this.ruleArguments)));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "ban",
        description: "Bans the use of specific functions or global methods.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            A list of banned functions or methods in the following format:\n\n            * banning functions:\n              * just the name of the function: `\"functionName\"`\n              * the name of the function in an array with one element: `[\"functionName\"]`\n              * an object in the following format: `{\"name\": \"functionName\", \"message\": \"optional explanation message\"}`\n            * banning methods:\n              * an array with the object name, method name and optional message: `[\"functionName\", \"methodName\", \"optional message\"]`\n              * an object in the following format: `{\"name\": [\"objectName\", \"methodName\"], \"message\": \"optional message\"}`\n                * you can also ban deeply nested methods: `{\"name\": [\"foo\", \"bar\", \"baz\"]}` bans `foo.bar.baz()`\n                * the first element can contain a wildcard (`*`) that matches everything. `{\"name\": [\"*\", \"forEach\"]}` bans                  `[].forEach(...)`, `$(...).forEach(...)`, `arr.forEach(...)`, etc.\n            "], ["\n            A list of banned functions or methods in the following format:\n\n            * banning functions:\n              * just the name of the function: \\`\"functionName\"\\`\n              * the name of the function in an array with one element: \\`[\"functionName\"]\\`\n              * an object in the following format: \\`{\"name\": \"functionName\", \"message\": \"optional explanation message\"}\\`\n            * banning methods:\n              * an array with the object name, method name and optional message: \\`[\"functionName\", \"methodName\", \"optional message\"]\\`\n              * an object in the following format: \\`{\"name\": [\"objectName\", \"methodName\"], \"message\": \"optional message\"}\\`\n                * you can also ban deeply nested methods: \\`{\"name\": [\"foo\", \"bar\", \"baz\"]}\\` bans \\`foo.bar.baz()\\`\n                * the first element can contain a wildcard (\\`*\\`) that matches everything. \\`{\"name\": [\"*\", \"forEach\"]}\\` bans\\\n                  \\`[].forEach(...)\\`, \\`$(...).forEach(...)\\`, \\`arr.forEach(...)\\`, etc.\n            "]))),
        options: {
            type: "list",
            listType: {
                anyOf: [
                    {
                        type: "string",
                    },
                    {
                        type: "array",
                        items: { type: "string" },
                        minLength: 1,
                        maxLength: 3,
                    },
                    {
                        type: "object",
                        properties: {
                            name: {
                                anyOf: [
                                    { type: "string" },
                                    { type: "array", items: { type: "string" }, minLength: 1 },
                                ],
                            },
                            message: { type: "string" },
                        },
                        required: ["name"],
                    },
                ],
            },
        },
        optionExamples: [
            [
                true,
                "eval",
                { name: "$", message: "please don't" },
                ["describe", "only"],
                { name: ["it", "only"], message: "don't focus tests" },
                { name: ["chai", "assert", "equal"], message: "Use 'strictEqual' instead." },
                { name: ["*", "forEach"], message: "Use a regular for loop instead." },
            ],
        ],
        type: "functionality",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function parseOptions(args) {
    var functions = [];
    var methods = [];
    for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
        var arg = args_1[_i];
        if (typeof arg === "string") {
            functions.push({ name: arg });
        }
        else if (Array.isArray(arg)) {
            switch (arg.length) {
                case 0:
                    break;
                case 1:
                    functions.push({ name: arg[0] });
                    break;
                default:
                    methods.push({ object: [arg[0]], name: arg[1], message: arg[2] });
            }
        }
        else if (!Array.isArray(arg.name)) {
            functions.push(arg);
        }
        else {
            switch (arg.name.length) {
                case 0:
                    break;
                case 1:
                    functions.push({ name: arg.name[0], message: arg.message });
                    break;
                default:
                    methods.push({ name: arg.name[arg.name.length - 1], object: arg.name.slice(0, -1), message: arg.message });
            }
        }
    }
    return { functions: functions, methods: methods };
}
var BanFunctionWalker = /** @class */ (function (_super) {
    tslib_1.__extends(BanFunctionWalker, _super);
    function BanFunctionWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BanFunctionWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (tsutils_1.isCallExpression(node)) {
                if (tsutils_1.isIdentifier(node.expression)) {
                    _this.checkFunctionBan(node.expression);
                }
                else if (tsutils_1.isPropertyAccessExpression(node.expression)) {
                    _this.checkForObjectMethodBan(node.expression);
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    BanFunctionWalker.prototype.checkForObjectMethodBan = function (expression) {
        for (var _i = 0, _a = this.options.methods; _i < _a.length; _i++) {
            var ban = _a[_i];
            if (expression.name.text !== ban.name) {
                continue;
            }
            var current = expression.expression;
            for (var i = ban.object.length - 1; i > 0; --i) {
                if (!tsutils_1.isPropertyAccessExpression(current) || current.name.text !== ban.object[i]) {
                    continue;
                }
                current = current.expression;
            }
            if (ban.object[0] === "*" ||
                tsutils_1.isIdentifier(current) && current.text === ban.object[0]) {
                this.addFailureAtNode(expression, Rule.FAILURE_STRING_FACTORY(ban.object.join(".") + "." + ban.name, ban.message));
                break;
            }
        }
    };
    BanFunctionWalker.prototype.checkFunctionBan = function (name) {
        var text = name.text;
        for (var _i = 0, _a = this.options.functions; _i < _a.length; _i++) {
            var ban = _a[_i];
            if (ban.name === text) {
                this.addFailureAtNode(name, Rule.FAILURE_STRING_FACTORY(text, ban.message));
                break;
            }
        }
    };
    return BanFunctionWalker;
}(Lint.AbstractWalker));
var templateObject_1;

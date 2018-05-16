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
var ts = require("typescript");
var Lint = require("../index");
var exclusionFactory_1 = require("./completed-docs/exclusionFactory");
exports.ALL = "all";
exports.ARGUMENT_CLASSES = "classes";
exports.ARGUMENT_ENUMS = "enums";
exports.ARGUMENT_ENUM_MEMBERS = "enum-members";
exports.ARGUMENT_FUNCTIONS = "functions";
exports.ARGUMENT_INTERFACES = "interfaces";
exports.ARGUMENT_METHODS = "methods";
exports.ARGUMENT_NAMESPACES = "namespaces";
exports.ARGUMENT_PROPERTIES = "properties";
exports.ARGUMENT_TYPES = "types";
exports.ARGUMENT_VARIABLES = "variables";
exports.DESCRIPTOR_TAGS = "tags";
exports.DESCRIPTOR_LOCATIONS = "locations";
exports.DESCRIPTOR_PRIVACIES = "privacies";
exports.DESCRIPTOR_VISIBILITIES = "visibilities";
exports.LOCATION_INSTANCE = "instance";
exports.LOCATION_STATIC = "static";
exports.PRIVACY_PRIVATE = "private";
exports.PRIVACY_PROTECTED = "protected";
exports.PRIVACY_PUBLIC = "public";
exports.TAGS_FOR_CONTENT = "content";
exports.TAGS_FOR_EXISTENCE = "existence";
exports.VISIBILITY_EXPORTED = "exported";
exports.VISIBILITY_INTERNAL = "internal";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* tslint:enable:object-literal-sort-keys */
        _this.exclusionFactory = new exclusionFactory_1.ExclusionFactory();
        return _this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        var options = this.getOptions();
        var exclusionsMap = this.getExclusionsMap(options.ruleArguments);
        return this.applyWithFunction(sourceFile, walk, exclusionsMap, program.getTypeChecker());
    };
    Rule.prototype.getExclusionsMap = function (ruleArguments) {
        if (ruleArguments.length === 0) {
            ruleArguments = [Rule.defaultArguments];
        }
        return this.exclusionFactory.constructExclusionsMap(ruleArguments);
    };
    Rule.FAILURE_STRING_EXIST = "Documentation must exist for ";
    Rule.defaultArguments = (_a = {},
        _a[exports.ARGUMENT_CLASSES] = true,
        _a[exports.ARGUMENT_FUNCTIONS] = true,
        _a[exports.ARGUMENT_METHODS] = (_b = {},
            _b[exports.DESCRIPTOR_TAGS] = (_c = {},
                _c[exports.TAGS_FOR_CONTENT] = {
                    see: ".*",
                },
                _c[exports.TAGS_FOR_EXISTENCE] = [
                    "deprecated",
                    "inheritdoc",
                ],
                _c),
            _b),
        _a[exports.ARGUMENT_PROPERTIES] = (_d = {},
            _d[exports.DESCRIPTOR_TAGS] = (_e = {},
                _e[exports.TAGS_FOR_CONTENT] = {
                    see: ".*",
                },
                _e[exports.TAGS_FOR_EXISTENCE] = [
                    "deprecated",
                    "inheritdoc",
                ],
                _e),
            _d),
        _a);
    Rule.ARGUMENT_DESCRIPTOR_BLOCK = {
        properties: (_f = {},
            _f[exports.DESCRIPTOR_TAGS] = {
                properties: (_g = {},
                    _g[exports.TAGS_FOR_CONTENT] = {
                        items: {
                            type: "string",
                        },
                        type: "object",
                    },
                    _g[exports.TAGS_FOR_EXISTENCE] = {
                        items: {
                            type: "string",
                        },
                        type: "array",
                    },
                    _g),
            },
            _f[exports.DESCRIPTOR_VISIBILITIES] = {
                enum: [
                    exports.ALL,
                    exports.VISIBILITY_EXPORTED,
                    exports.VISIBILITY_INTERNAL,
                ],
                type: "string",
            },
            _f),
        type: "object",
    };
    Rule.ARGUMENT_DESCRIPTOR_CLASS = {
        properties: (_h = {},
            _h[exports.DESCRIPTOR_TAGS] = {
                properties: (_j = {},
                    _j[exports.TAGS_FOR_CONTENT] = {
                        items: {
                            type: "string",
                        },
                        type: "object",
                    },
                    _j[exports.TAGS_FOR_EXISTENCE] = {
                        items: {
                            type: "string",
                        },
                        type: "array",
                    },
                    _j),
            },
            _h[exports.DESCRIPTOR_LOCATIONS] = {
                enum: [
                    exports.ALL,
                    exports.LOCATION_INSTANCE,
                    exports.LOCATION_STATIC,
                ],
                type: "string",
            },
            _h[exports.DESCRIPTOR_PRIVACIES] = {
                enum: [
                    exports.ALL,
                    exports.PRIVACY_PRIVATE,
                    exports.PRIVACY_PROTECTED,
                    exports.PRIVACY_PUBLIC,
                ],
                type: "string",
            },
            _h),
        type: "object",
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "completed-docs",
        description: "Enforces JSDoc comments for important items be filled out.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            `true` to enable for `[", "]`,\n            or an array with each item in one of two formats:\n\n            * `string` to enable for that type\n            * `object` keying types to when their documentation is required:\n                * `\"", "\"` and `\"", "\"` may specify:\n                    * `\"", "\"`:\n                        * `\"", "\"`\n                        * `\"", "\"`\n                        * `\"", "\"`\n                        * `\"", "\"`\n                    * `\"", "\"`:\n                        * `\"", "\"`\n                        * `\"", "\"`\n                        * `\"", "\"`\n                * Other types may specify `\"", "\"`:\n                    * `\"", "\"`\n                    * `\"", "\"`\n                    * `\"", "\"`\n                * All types may also provide `\"", "\"`\n                  with members specifying tags that allow the docs to not have a body.\n                    * `\"", "\"`: Object mapping tags to `RegExp` bodies content allowed to count as complete docs.\n                    * `\"", "\"`: Array of tags that must only exist to count as complete docs.\n\n            Types that may be enabled are:\n\n            * `\"", "\"`\n            * `\"", "\"`\n            * `\"", "\"`\n            * `\"", "\"`\n            * `\"", "\"`\n            * `\"", "\"`\n            * `\"", "\"`\n            * `\"", "\"`\n            * `\"", "\"`\n            * `\"", "\"`"], ["\n            \\`true\\` to enable for \\`[", "]\\`,\n            or an array with each item in one of two formats:\n\n            * \\`string\\` to enable for that type\n            * \\`object\\` keying types to when their documentation is required:\n                * \\`\"", "\"\\` and \\`\"", "\"\\` may specify:\n                    * \\`\"", "\"\\`:\n                        * \\`\"", "\"\\`\n                        * \\`\"", "\"\\`\n                        * \\`\"", "\"\\`\n                        * \\`\"", "\"\\`\n                    * \\`\"", "\"\\`:\n                        * \\`\"", "\"\\`\n                        * \\`\"", "\"\\`\n                        * \\`\"", "\"\\`\n                * Other types may specify \\`\"", "\"\\`:\n                    * \\`\"", "\"\\`\n                    * \\`\"", "\"\\`\n                    * \\`\"", "\"\\`\n                * All types may also provide \\`\"", "\"\\`\n                  with members specifying tags that allow the docs to not have a body.\n                    * \\`\"", "\"\\`: Object mapping tags to \\`RegExp\\` bodies content allowed to count as complete docs.\n                    * \\`\"", "\"\\`: Array of tags that must only exist to count as complete docs.\n\n            Types that may be enabled are:\n\n            * \\`\"", "\"\\`\n            * \\`\"", "\"\\`\n            * \\`\"", "\"\\`\n            * \\`\"", "\"\\`\n            * \\`\"", "\"\\`\n            * \\`\"", "\"\\`\n            * \\`\"", "\"\\`\n            * \\`\"", "\"\\`\n            * \\`\"", "\"\\`\n            * \\`\"", "\"\\`"])), Object.keys(Rule.defaultArguments).join(", "), exports.ARGUMENT_METHODS, exports.ARGUMENT_PROPERTIES, exports.DESCRIPTOR_PRIVACIES, exports.ALL, exports.PRIVACY_PRIVATE, exports.PRIVACY_PROTECTED, exports.PRIVACY_PUBLIC, exports.DESCRIPTOR_LOCATIONS, exports.ALL, exports.LOCATION_INSTANCE, exports.LOCATION_STATIC, exports.DESCRIPTOR_VISIBILITIES, exports.ALL, exports.VISIBILITY_EXPORTED, exports.VISIBILITY_INTERNAL, exports.DESCRIPTOR_TAGS, exports.TAGS_FOR_CONTENT, exports.TAGS_FOR_EXISTENCE, exports.ARGUMENT_CLASSES, exports.ARGUMENT_ENUMS, exports.ARGUMENT_ENUM_MEMBERS, exports.ARGUMENT_FUNCTIONS, exports.ARGUMENT_INTERFACES, exports.ARGUMENT_METHODS, exports.ARGUMENT_NAMESPACES, exports.ARGUMENT_PROPERTIES, exports.ARGUMENT_TYPES, exports.ARGUMENT_VARIABLES),
        options: {
            type: "array",
            items: {
                anyOf: [
                    {
                        options: [
                            exports.ARGUMENT_CLASSES,
                            exports.ARGUMENT_ENUMS,
                            exports.ARGUMENT_FUNCTIONS,
                            exports.ARGUMENT_INTERFACES,
                            exports.ARGUMENT_METHODS,
                            exports.ARGUMENT_NAMESPACES,
                            exports.ARGUMENT_PROPERTIES,
                            exports.ARGUMENT_TYPES,
                            exports.ARGUMENT_VARIABLES,
                        ],
                        type: "string",
                    },
                    {
                        type: "object",
                        properties: (_k = {},
                            _k[exports.ARGUMENT_CLASSES] = Rule.ARGUMENT_DESCRIPTOR_BLOCK,
                            _k[exports.ARGUMENT_ENUMS] = Rule.ARGUMENT_DESCRIPTOR_BLOCK,
                            _k[exports.ARGUMENT_ENUM_MEMBERS] = Rule.ARGUMENT_DESCRIPTOR_BLOCK,
                            _k[exports.ARGUMENT_FUNCTIONS] = Rule.ARGUMENT_DESCRIPTOR_BLOCK,
                            _k[exports.ARGUMENT_INTERFACES] = Rule.ARGUMENT_DESCRIPTOR_BLOCK,
                            _k[exports.ARGUMENT_METHODS] = Rule.ARGUMENT_DESCRIPTOR_CLASS,
                            _k[exports.ARGUMENT_NAMESPACES] = Rule.ARGUMENT_DESCRIPTOR_BLOCK,
                            _k[exports.ARGUMENT_PROPERTIES] = Rule.ARGUMENT_DESCRIPTOR_CLASS,
                            _k[exports.ARGUMENT_TYPES] = Rule.ARGUMENT_DESCRIPTOR_BLOCK,
                            _k[exports.ARGUMENT_VARIABLES] = Rule.ARGUMENT_DESCRIPTOR_BLOCK,
                            _k),
                    },
                ],
            },
        },
        optionExamples: [
            true,
            [true, exports.ARGUMENT_ENUMS, exports.ARGUMENT_FUNCTIONS, exports.ARGUMENT_METHODS],
            [
                true,
                (_l = {},
                    _l[exports.ARGUMENT_ENUMS] = true,
                    _l[exports.ARGUMENT_FUNCTIONS] = (_m = {},
                        _m[exports.DESCRIPTOR_VISIBILITIES] = [exports.VISIBILITY_EXPORTED],
                        _m),
                    _l[exports.ARGUMENT_METHODS] = (_o = {},
                        _o[exports.DESCRIPTOR_LOCATIONS] = exports.LOCATION_INSTANCE,
                        _o[exports.DESCRIPTOR_PRIVACIES] = [exports.PRIVACY_PUBLIC, exports.PRIVACY_PROTECTED],
                        _o),
                    _l[exports.ARGUMENT_PROPERTIES] = (_p = {},
                        _p[exports.DESCRIPTOR_TAGS] = (_q = {},
                            _q[exports.TAGS_FOR_CONTENT] = {
                                see: ["#.*"],
                            },
                            _q[exports.TAGS_FOR_EXISTENCE] = ["inheritdoc"],
                            _q),
                        _p),
                    _l),
            ],
        ],
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Helps ensure important components are documented.\n\n            Note: use this rule sparingly. It's better to have self-documenting names on components with single, consice responsibilities.\n            Comments that only restate the names of variables add nothing to code, and can easily become outdated.\n        "], ["\n            Helps ensure important components are documented.\n\n            Note: use this rule sparingly. It's better to have self-documenting names on components with single, consice responsibilities.\n            Comments that only restate the names of variables add nothing to code, and can easily become outdated.\n        "]))),
        type: "style",
        typescriptOnly: false,
        requiresTypeInfo: true,
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
var modifierAliases = {
    export: "exported",
};
function walk(context, typeChecker) {
    return ts.forEachChild(context.sourceFile, cb);
    function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
                checkNode(node, exports.ARGUMENT_CLASSES);
                break;
            case ts.SyntaxKind.EnumDeclaration:
                checkNode(node, exports.ARGUMENT_ENUMS);
                for (var _i = 0, _a = node.members; _i < _a.length; _i++) {
                    var member = _a[_i];
                    // Enum members don't have modifiers, so use the parent
                    // enum declaration when checking the requirements.
                    checkNode(member, exports.ARGUMENT_ENUM_MEMBERS, node);
                }
                break;
            case ts.SyntaxKind.FunctionDeclaration:
                checkNode(node, exports.ARGUMENT_FUNCTIONS);
                break;
            case ts.SyntaxKind.InterfaceDeclaration:
                checkNode(node, exports.ARGUMENT_INTERFACES);
                break;
            case ts.SyntaxKind.MethodDeclaration:
                if (node.parent.kind !== ts.SyntaxKind.ObjectLiteralExpression) {
                    checkNode(node, exports.ARGUMENT_METHODS);
                }
                break;
            case ts.SyntaxKind.ModuleDeclaration:
                checkNode(node, exports.ARGUMENT_NAMESPACES);
                break;
            case ts.SyntaxKind.PropertyDeclaration:
                checkNode(node, exports.ARGUMENT_PROPERTIES);
                break;
            case ts.SyntaxKind.TypeAliasDeclaration:
                checkNode(node, exports.ARGUMENT_TYPES);
                break;
            case ts.SyntaxKind.VariableStatement:
                // Only check variables at the namespace/module-level or file-level
                // and not variables declared inside functions and other things.
                switch (node.parent.kind) {
                    case ts.SyntaxKind.SourceFile:
                    case ts.SyntaxKind.ModuleBlock:
                        for (var _b = 0, _c = node.declarationList.declarations; _b < _c.length; _b++) {
                            var declaration = _c[_b];
                            checkNode(declaration, exports.ARGUMENT_VARIABLES, node);
                        }
                }
                break;
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                if (node.parent.kind !== ts.SyntaxKind.ObjectLiteralExpression) {
                    checkNode(node, exports.ARGUMENT_PROPERTIES);
                }
        }
        return ts.forEachChild(node, cb);
    }
    function checkNode(node, nodeType, requirementNode) {
        if (requirementNode === void 0) { requirementNode = node; }
        var name = node.name;
        if (name === undefined) {
            return;
        }
        var exclusions = context.options.get(nodeType);
        if (exclusions === undefined) {
            return;
        }
        for (var _i = 0, exclusions_1 = exclusions; _i < exclusions_1.length; _i++) {
            var exclusion = exclusions_1[_i];
            if (exclusion.excludes(requirementNode)) {
                return;
            }
        }
        var symbol = typeChecker.getSymbolAtLocation(name);
        if (symbol === undefined) {
            return;
        }
        var comments = symbol.getDocumentationComment(typeChecker);
        checkComments(node, describeNode(nodeType), comments, requirementNode);
    }
    function checkComments(node, nodeDescriptor, comments, requirementNode) {
        if (comments.map(function (comment) { return comment.text; }).join("").trim() === "") {
            addDocumentationFailure(node, nodeDescriptor, requirementNode);
        }
    }
    function addDocumentationFailure(node, nodeType, requirementNode) {
        var start = node.getStart();
        var width = node.getText().split(/\r|\n/g)[0].length;
        var description = describeDocumentationFailure(requirementNode, nodeType);
        context.addFailureAt(start, width, description);
    }
}
function describeDocumentationFailure(node, nodeType) {
    var description = Rule.FAILURE_STRING_EXIST;
    if (node.modifiers !== undefined) {
        description += node.modifiers.map(function (modifier) { return describeModifier(modifier.kind); }).join(" ") + " ";
    }
    return "" + description + nodeType + ".";
}
function describeModifier(kind) {
    var description = ts.SyntaxKind[kind].toLowerCase().split("keyword")[0];
    var alias = modifierAliases[description];
    return alias !== undefined ? alias : description;
}
function describeNode(nodeType) {
    return nodeType.replace("-", " ");
}
var templateObject_1, templateObject_2;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;

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
var error_1 = require("../error");
var Lint = require("../index");
var utils_1 = require("../utils");
var OPTION_ORDER = "order";
var OPTION_ALPHABETIZE = "alphabetize";
var MemberKind;
(function (MemberKind) {
    MemberKind[MemberKind["publicStaticField"] = 0] = "publicStaticField";
    MemberKind[MemberKind["publicStaticMethod"] = 1] = "publicStaticMethod";
    MemberKind[MemberKind["protectedStaticField"] = 2] = "protectedStaticField";
    MemberKind[MemberKind["protectedStaticMethod"] = 3] = "protectedStaticMethod";
    MemberKind[MemberKind["privateStaticField"] = 4] = "privateStaticField";
    MemberKind[MemberKind["privateStaticMethod"] = 5] = "privateStaticMethod";
    MemberKind[MemberKind["publicInstanceField"] = 6] = "publicInstanceField";
    MemberKind[MemberKind["protectedInstanceField"] = 7] = "protectedInstanceField";
    MemberKind[MemberKind["privateInstanceField"] = 8] = "privateInstanceField";
    MemberKind[MemberKind["publicConstructor"] = 9] = "publicConstructor";
    MemberKind[MemberKind["protectedConstructor"] = 10] = "protectedConstructor";
    MemberKind[MemberKind["privateConstructor"] = 11] = "privateConstructor";
    MemberKind[MemberKind["publicInstanceMethod"] = 12] = "publicInstanceMethod";
    MemberKind[MemberKind["protectedInstanceMethod"] = 13] = "protectedInstanceMethod";
    MemberKind[MemberKind["privateInstanceMethod"] = 14] = "privateInstanceMethod";
})(MemberKind || (MemberKind = {}));
var PRESETS = new Map([
    ["fields-first", [
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "constructor",
            "public-static-method",
            "protected-static-method",
            "private-static-method",
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
        ]],
    ["instance-sandwich", [
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "constructor",
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
            "public-static-method",
            "protected-static-method",
            "private-static-method",
        ]],
    ["statics-first", [
            "public-static-field",
            "public-static-method",
            "protected-static-field",
            "protected-static-method",
            "private-static-field",
            "private-static-method",
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "constructor",
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
        ]],
]);
var PRESET_NAMES = Array.from(PRESETS.keys());
var allMemberKindNames = utils_1.mapDefined(Object.keys(MemberKind), function (key) {
    var mk = MemberKind[key];
    return typeof mk === "number" ? MemberKind[mk].replace(/[A-Z]/g, function (cap) { return "-" + cap.toLowerCase(); }) : undefined;
});
function namesMarkdown(names) {
    return names.map(function (name) { return "* `" + name + "`"; }).join("\n    ");
}
var optionsDescription = Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    One argument, which is an object, must be provided. It should contain an `order` property.\n    The `order` property should have a value of one of the following strings:\n\n    ", "\n\n    Alternatively, the value for `order` maybe be an array consisting of the following strings:\n\n    ", "\n\n    You can also omit the access modifier to refer to \"public-\", \"protected-\", and \"private-\" all at once; for example, \"static-field\".\n\n    You can also make your own categories by using an object instead of a string:\n\n        {\n            \"name\": \"static non-private\",\n            \"kinds\": [\n                \"public-static-field\",\n                \"protected-static-field\",\n                \"public-static-method\",\n                \"protected-static-method\"\n            ]\n        }\n\n    The '", "' option will enforce that members within the same category should be alphabetically sorted by name."], ["\n    One argument, which is an object, must be provided. It should contain an \\`order\\` property.\n    The \\`order\\` property should have a value of one of the following strings:\n\n    ", "\n\n    Alternatively, the value for \\`order\\` maybe be an array consisting of the following strings:\n\n    ", "\n\n    You can also omit the access modifier to refer to \"public-\", \"protected-\", and \"private-\" all at once; for example, \"static-field\".\n\n    You can also make your own categories by using an object instead of a string:\n\n        {\n            \"name\": \"static non-private\",\n            \"kinds\": [\n                \"public-static-field\",\n                \"protected-static-field\",\n                \"public-static-method\",\n                \"protected-static-method\"\n            ]\n        }\n\n    The '", "' option will enforce that members within the same category should be alphabetically sorted by name."])), namesMarkdown(PRESET_NAMES), namesMarkdown(allMemberKindNames), OPTION_ALPHABETIZE);
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.FAILURE_STRING_ALPHABETIZE = function (prevName, curName) {
        return show(curName) + " should come alphabetically before " + show(prevName);
        function show(s) {
            return s === "" ? "Computed property" : "'" + s + "'";
        }
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.prototype.apply = function (sourceFile) {
        var options;
        try {
            options = parseOptions(this.ruleArguments);
        }
        catch (e) {
            error_1.showWarningOnce("Warning: " + this.ruleName + " - " + e.message);
            return [];
        }
        return this.applyWithWalker(new MemberOrderingWalker(sourceFile, this.ruleName, options));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "member-ordering",
        description: "Enforces member ordering.",
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            A consistent ordering for class members can make classes easier to read, navigate, and edit.\n\n            A common opposite practice to `member-ordering` is to keep related groups of classes together.\n            Instead of creating clases with multiple separate groups, consider splitting class responsibilities\n            apart across multiple single-responsibility classes.\n        "], ["\n            A consistent ordering for class members can make classes easier to read, navigate, and edit.\n\n            A common opposite practice to \\`member-ordering\\` is to keep related groups of classes together.\n            Instead of creating clases with multiple separate groups, consider splitting class responsibilities\n            apart across multiple single-responsibility classes.\n        "]))),
        optionsDescription: optionsDescription,
        options: {
            type: "object",
            properties: {
                order: {
                    oneOf: [
                        {
                            type: "string",
                            enum: PRESET_NAMES,
                        },
                        {
                            type: "array",
                            items: {
                                type: "string",
                                enum: allMemberKindNames,
                            },
                            maxLength: 13,
                        },
                    ],
                },
            },
            additionalProperties: false,
        },
        optionExamples: [
            [true, { order: "fields-first" }],
            [true, {
                    order: [
                        "public-static-field",
                        "public-instance-field",
                        "public-constructor",
                        "private-static-field",
                        "private-instance-field",
                        "private-constructor",
                        "public-instance-method",
                        "protected-instance-method",
                        "private-instance-method",
                    ],
                }],
            [true, {
                    order: [
                        {
                            name: "static non-private",
                            kinds: [
                                "public-static-field",
                                "protected-static-field",
                                "public-static-method",
                                "protected-static-method",
                            ],
                        },
                        "constructor",
                    ],
                }],
        ],
        type: "typescript",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var MemberOrderingWalker = /** @class */ (function (_super) {
    tslib_1.__extends(MemberOrderingWalker, _super);
    function MemberOrderingWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MemberOrderingWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            switch (node.kind) {
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.ClassExpression:
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.TypeLiteral:
                    _this.checkMembers(node.members);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    MemberOrderingWalker.prototype.checkMembers = function (members) {
        var prevRank = -1;
        var prevName;
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            var rank = this.memberRank(member);
            if (rank === -1) {
                // no explicit ordering for this kind of node specified, so continue
                continue;
            }
            if (rank < prevRank) {
                var nodeType = this.rankName(rank);
                var prevNodeType = this.rankName(prevRank);
                var lowerRank = this.findLowerRank(members, rank);
                var locationHint = lowerRank !== -1
                    ? "after " + this.rankName(lowerRank) + "s"
                    : "at the beginning of the class/interface";
                var errorLine1 = "Declaration of " + nodeType + " not allowed after declaration of " + prevNodeType + ". " +
                    ("Instead, this should come " + locationHint + ".");
                this.addFailureAtNode(member, errorLine1);
            }
            else {
                if (this.options.alphabetize && member.name !== undefined) {
                    if (rank !== prevRank) {
                        // No alphabetical ordering between different ranks
                        prevName = undefined;
                    }
                    var curName = nameString(member.name);
                    if (prevName !== undefined && caseInsensitiveLess(curName, prevName)) {
                        this.addFailureAtNode(member.name, Rule.FAILURE_STRING_ALPHABETIZE(this.findLowerName(members, rank, curName), curName));
                    }
                    else {
                        prevName = curName;
                    }
                }
                // keep track of last good node
                prevRank = rank;
            }
        }
    };
    /** Finds the lowest name higher than 'targetName'. */
    MemberOrderingWalker.prototype.findLowerName = function (members, targetRank, targetName) {
        for (var _i = 0, members_2 = members; _i < members_2.length; _i++) {
            var member = members_2[_i];
            if (member.name === undefined || this.memberRank(member) !== targetRank) {
                continue;
            }
            var name = nameString(member.name);
            if (caseInsensitiveLess(targetName, name)) {
                return name;
            }
        }
        throw new Error("Expected to find a name");
    };
    /** Finds the highest existing rank lower than `targetRank`. */
    MemberOrderingWalker.prototype.findLowerRank = function (members, targetRank) {
        var max = -1;
        for (var _i = 0, members_3 = members; _i < members_3.length; _i++) {
            var member = members_3[_i];
            var rank = this.memberRank(member);
            if (rank !== -1 && rank < targetRank) {
                max = Math.max(max, rank);
            }
        }
        return max;
    };
    MemberOrderingWalker.prototype.memberRank = function (member) {
        var optionName = getMemberKind(member);
        if (optionName === undefined) {
            return -1;
        }
        return this.options.order.findIndex(function (category) { return category.has(optionName); });
    };
    MemberOrderingWalker.prototype.rankName = function (rank) {
        return this.options.order[rank].name;
    };
    return MemberOrderingWalker;
}(Lint.AbstractWalker));
function caseInsensitiveLess(a, b) {
    return a.toLowerCase() < b.toLowerCase();
}
function memberKindForConstructor(access) {
    return MemberKind[access + "Constructor"];
}
function memberKindForMethodOrField(access, membership, kind) {
    return MemberKind[access + membership + kind];
}
var allAccess = ["public", "protected", "private"];
function memberKindFromName(name) {
    var kind = MemberKind[Lint.Utils.camelize(name)];
    return typeof kind === "number" ? [kind] : allAccess.map(addModifier);
    function addModifier(modifier) {
        var modifiedKind = MemberKind[Lint.Utils.camelize(modifier + "-" + name)];
        if (typeof modifiedKind !== "number") {
            throw new Error("Bad member kind: " + name);
        }
        return modifiedKind;
    }
}
function getMemberKind(member) {
    var accessLevel = tsutils_1.hasModifier(member.modifiers, ts.SyntaxKind.PrivateKeyword) ? "private"
        : tsutils_1.hasModifier(member.modifiers, ts.SyntaxKind.ProtectedKeyword) ? "protected"
            : "public";
    switch (member.kind) {
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.ConstructSignature:
            return memberKindForConstructor(accessLevel);
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
            return methodOrField(isFunctionLiteral(member.initializer));
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
            return methodOrField(true);
        default:
            return undefined;
    }
    function methodOrField(isMethod) {
        var membership = tsutils_1.hasModifier(member.modifiers, ts.SyntaxKind.StaticKeyword) ? "Static" : "Instance";
        return memberKindForMethodOrField(accessLevel, membership, isMethod ? "Method" : "Field");
    }
}
var MemberCategory = /** @class */ (function () {
    function MemberCategory(name, kinds) {
        this.name = name;
        this.kinds = kinds;
    }
    MemberCategory.prototype.has = function (kind) { return this.kinds.has(kind); };
    return MemberCategory;
}());
function parseOptions(options) {
    var _a = getOptionsJson(options), orderJson = _a.order, alphabetize = _a.alphabetize;
    var order = orderJson.map(function (cat) { return typeof cat === "string"
        ? new MemberCategory(cat.replace(/-/g, " "), new Set(memberKindFromName(cat)))
        : new MemberCategory(cat.name, new Set(utils_1.flatMap(cat.kinds, memberKindFromName))); });
    return { order: order, alphabetize: alphabetize };
}
function getOptionsJson(allOptions) {
    if (allOptions == undefined || allOptions.length === 0 || allOptions[0] == undefined) {
        throw new Error("Got empty options");
    }
    var firstOption = allOptions[0];
    if (typeof firstOption !== "object") {
        // Undocumented direct string option. Deprecate eventually.
        return { order: convertFromOldStyleOptions(allOptions), alphabetize: false }; // presume allOptions to be string[]
    }
    return { order: categoryFromOption(firstOption[OPTION_ORDER]), alphabetize: firstOption[OPTION_ALPHABETIZE] === true };
}
function categoryFromOption(orderOption) {
    if (Array.isArray(orderOption)) {
        return orderOption;
    }
    var preset = PRESETS.get(orderOption);
    if (preset === undefined) {
        throw new Error("Bad order: " + JSON.stringify(orderOption));
    }
    return preset;
}
/**
 * Convert from undocumented old-style options.
 * This is designed to mimic the old behavior and should be removed eventually.
 */
function convertFromOldStyleOptions(options) {
    var categories = [{ name: "member", kinds: allMemberKindNames }];
    if (hasOption("variables-before-functions")) {
        categories = splitOldStyleOptions(categories, function (kind) { return kind.includes("field"); }, "field", "method");
    }
    if (hasOption("static-before-instance")) {
        categories = splitOldStyleOptions(categories, function (kind) { return kind.includes("static"); }, "static", "instance");
    }
    if (hasOption("public-before-private")) {
        // 'protected' is considered public
        categories = splitOldStyleOptions(categories, function (kind) { return !kind.includes("private"); }, "public", "private");
    }
    return categories;
    function hasOption(x) {
        return options.indexOf(x) !== -1;
    }
}
function splitOldStyleOptions(categories, filter, a, b) {
    var newCategories = [];
    var _loop_1 = function (cat) {
        var yes = [];
        var no = [];
        for (var _i = 0, _a = cat.kinds; _i < _a.length; _i++) {
            var kind = _a[_i];
            if (filter(kind)) {
                yes.push(kind);
            }
            else {
                no.push(kind);
            }
        }
        var augmentName = function (s) {
            if (a === "field") {
                // Replace "member" with "field"/"method" instead of augmenting.
                return s;
            }
            return s + " " + cat.name;
        };
        newCategories.push({ name: augmentName(a), kinds: yes });
        newCategories.push({ name: augmentName(b), kinds: no });
    };
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var cat = categories_1[_i];
        _loop_1(cat);
    }
    return newCategories;
}
function isFunctionLiteral(node) {
    if (node === undefined) {
        return false;
    }
    switch (node.kind) {
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
            return true;
        default:
            return false;
    }
}
function nameString(name) {
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NumericLiteral:
            return name.text;
        default:
            return "";
    }
}
var templateObject_1, templateObject_2;

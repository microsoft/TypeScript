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
// tslint:disable no-console object-literal-sort-keys
var commander = require("commander");
var fs = require("fs");
var linter_1 = require("./linter");
var runner_1 = require("./runner");
var utils_1 = require("./utils");
var options = [
    {
        short: "c",
        name: "config",
        type: "string",
        describe: "configuration file",
        description: utils_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            The location of the configuration file that tslint will use to\n            determine which rules are activated and what options to provide\n            to the rules. If no option is specified, the config file named\n            tslint.json is used, so long as it exists in the path.\n            The format of the file is { rules: { /* rules list */ } },\n            where /* rules list */ is a key: value comma-separated list of\n            rulename: rule-options pairs. Rule-options can be either a\n            boolean true/false value denoting whether the rule is used or not,\n            or a list [boolean, ...] where the boolean provides the same role\n            as in the non-list case, and the rest of the list are options passed\n            to the rule that will determine what it checks for (such as number\n            of characters for the max-line-length rule, or what functions to ban\n            for the ban rule)."], ["\n            The location of the configuration file that tslint will use to\n            determine which rules are activated and what options to provide\n            to the rules. If no option is specified, the config file named\n            tslint.json is used, so long as it exists in the path.\n            The format of the file is { rules: { /* rules list */ } },\n            where /* rules list */ is a key: value comma-separated list of\n            rulename: rule-options pairs. Rule-options can be either a\n            boolean true/false value denoting whether the rule is used or not,\n            or a list [boolean, ...] where the boolean provides the same role\n            as in the non-list case, and the rest of the list are options passed\n            to the rule that will determine what it checks for (such as number\n            of characters for the max-line-length rule, or what functions to ban\n            for the ban rule)."]))),
    },
    {
        short: "e",
        name: "exclude",
        type: "array",
        describe: "exclude globs from path expansion",
        description: utils_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            A filename or glob which indicates files to exclude from linting.\n            This option can be supplied multiple times if you need multiple\n            globs to indicate which files to exclude."], ["\n            A filename or glob which indicates files to exclude from linting.\n            This option can be supplied multiple times if you need multiple\n            globs to indicate which files to exclude."]))),
    },
    {
        name: "fix",
        type: "boolean",
        describe: "fixes linting errors for select rules (this may overwrite linted files)",
        description: "Fixes linting errors for select rules. This may overwrite linted files.",
    },
    {
        name: "force",
        type: "boolean",
        describe: "return status code 0 even if there are lint errors",
        description: utils_1.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            Return status code 0 even if there are any lint errors.\n            Useful while running as npm script."], ["\n            Return status code 0 even if there are any lint errors.\n            Useful while running as npm script."]))),
    },
    {
        short: "i",
        name: "init",
        type: "boolean",
        describe: "generate a tslint.json config file in the current working directory",
        description: "Generates a tslint.json config file in the current working directory.",
    },
    {
        short: "o",
        name: "out",
        type: "string",
        describe: "output file",
        description: utils_1.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n            A filename to output the results to. By default, tslint outputs to\n            stdout, which is usually the console where you're running it from."], ["\n            A filename to output the results to. By default, tslint outputs to\n            stdout, which is usually the console where you're running it from."]))),
    },
    {
        name: "outputAbsolutePaths",
        type: "boolean",
        describe: "whether or not outputted file paths are absolute",
        description: "If true, all paths in the output will be absolute.",
    },
    {
        short: "r",
        name: "rules-dir",
        type: "string",
        describe: "rules directory",
        description: utils_1.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n            An additional rules directory, for user-created rules.\n            tslint will always check its default rules directory, in\n            node_modules/tslint/lib/rules, before checking the user-provided\n            rules directory, so rules in the user-provided rules directory\n            with the same name as the base rules will not be loaded."], ["\n            An additional rules directory, for user-created rules.\n            tslint will always check its default rules directory, in\n            node_modules/tslint/lib/rules, before checking the user-provided\n            rules directory, so rules in the user-provided rules directory\n            with the same name as the base rules will not be loaded."]))),
    },
    {
        short: "s",
        name: "formatters-dir",
        type: "string",
        describe: "formatters directory",
        description: utils_1.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n            An additional formatters directory, for user-created formatters.\n            Formatters are files that will format the tslint output, before\n            writing it to stdout or the file passed in --out. The default\n            directory, node_modules/tslint/build/formatters, will always be\n            checked first, so user-created formatters with the same names\n            as the base formatters will not be loaded."], ["\n            An additional formatters directory, for user-created formatters.\n            Formatters are files that will format the tslint output, before\n            writing it to stdout or the file passed in --out. The default\n            directory, node_modules/tslint/build/formatters, will always be\n            checked first, so user-created formatters with the same names\n            as the base formatters will not be loaded."]))),
    },
    {
        short: "t",
        name: "format",
        type: "string",
        describe: "output format (prose, json, stylish, verbose, pmd, msbuild, checkstyle, vso, fileslist, codeFrame)",
        description: utils_1.dedent(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n            The formatter to use to format the results of the linter before\n            outputting it to stdout or the file passed in --out. The core\n            formatters are prose (human readable), json (machine readable)\n            and verbose. prose is the default if this option is not used.\n            Other built-in options include pmd, msbuild, checkstyle, and vso.\n            Additional formatters can be added and used if the --formatters-dir\n            option is set."], ["\n            The formatter to use to format the results of the linter before\n            outputting it to stdout or the file passed in --out. The core\n            formatters are prose (human readable), json (machine readable)\n            and verbose. prose is the default if this option is not used.\n            Other built-in options include pmd, msbuild, checkstyle, and vso.\n            Additional formatters can be added and used if the --formatters-dir\n            option is set."]))),
    },
    {
        name: "test",
        type: "boolean",
        describe: "test that tslint produces the correct output for the specified directory",
        description: utils_1.dedent(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n            Runs tslint on matched directories and checks if tslint outputs\n            match the expected output in .lint files. Automatically loads the\n            tslint.json files in the directories as the configuration file for\n            the tests. See the full tslint documentation for more details on how\n            this can be used to test custom rules."], ["\n            Runs tslint on matched directories and checks if tslint outputs\n            match the expected output in .lint files. Automatically loads the\n            tslint.json files in the directories as the configuration file for\n            the tests. See the full tslint documentation for more details on how\n            this can be used to test custom rules."]))),
    },
    {
        short: "p",
        name: "project",
        type: "string",
        describe: "tsconfig.json file",
        description: utils_1.dedent(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n            The path to the tsconfig.json file or to the directory containing\n            the tsconfig.json file. The file will be used to determine which\n            files will be linted. This flag also enables rules that require the\n            type checker."], ["\n            The path to the tsconfig.json file or to the directory containing\n            the tsconfig.json file. The file will be used to determine which\n            files will be linted. This flag also enables rules that require the\n            type checker."]))),
    },
    {
        name: "type-check",
        type: "boolean",
        describe: "(deprecated) check for type errors before linting the project",
        description: utils_1.dedent(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n            (deprecated) Checks for type errors before linting a project.\n            --project must be specified in order to enable type checking."], ["\n            (deprecated) Checks for type errors before linting a project.\n            --project must be specified in order to enable type checking."]))),
    },
];
var builtinOptions = [
    {
        short: "v",
        name: "version",
        type: "boolean",
        describe: "current version",
        description: "The current version of tslint.",
    },
    {
        short: "h",
        name: "help",
        type: "boolean",
        describe: "display detailed help",
        description: "Prints this help message.",
    },
];
commander.version(linter_1.Linter.VERSION, "-v, --version");
for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
    var option = options_1[_i];
    var commanderStr = optionUsageTag(option) + optionParam(option);
    if (option.type === "array") {
        commander.option(commanderStr, option.describe, collect, []);
    }
    else {
        commander.option(commanderStr, option.describe);
    }
}
commander.on("--help", function () {
    var indent = "\n        ";
    var optionDetails = options.concat(builtinOptions).map(function (o) {
        return optionUsageTag(o) + ":" + (o.description.startsWith("\n") ? o.description.replace(/\n/g, indent) : indent + o.description);
    });
    console.log("tslint accepts the following commandline options:\n\n    " + optionDetails.join("\n\n    ") + "\n\n");
});
// Hack to get unknown option errors to work. https://github.com/visionmedia/commander.js/pull/121
var parsed = commander.parseOptions(process.argv.slice(2));
commander.args = parsed.args;
if (parsed.unknown.length !== 0) {
    commander.parseArgs([], parsed.unknown);
}
var argv = commander.opts();
if (!(argv.init || argv.test !== undefined || argv.project !== undefined || commander.args.length > 0)) {
    console.error("No files specified. Use --project to lint a project folder.");
    process.exit(1);
}
if (argv.typeCheck) {
    console.warn("--type-check is deprecated. You only need --project to enable rules which need type information.");
    if (argv.project === undefined) {
        console.error("--project must be specified in order to enable type checking.");
        process.exit(1);
    }
}
var outputStream = argv.out === undefined
    ? process.stdout
    : fs.createWriteStream(argv.out, { flags: "w+", mode: 420 });
runner_1.run({
    config: argv.config,
    exclude: argv.exclude,
    files: utils_1.arrayify(commander.args),
    fix: argv.fix,
    force: argv.force,
    format: argv.format === undefined ? "prose" : argv.format,
    formattersDirectory: argv.formattersDir,
    init: argv.init,
    out: argv.out,
    outputAbsolutePaths: argv.outputAbsolutePaths,
    project: argv.project,
    rulesDirectory: argv.rulesDir,
    test: argv.test,
    typeCheck: argv.typeCheck,
}, {
    log: function (m) {
        outputStream.write(m);
    },
    error: function (m) {
        process.stdout.write(m);
    },
})
    .then(function (rc) {
    process.exitCode = rc;
}).catch(function (e) {
    console.error(e);
    process.exitCode = 1;
});
function optionUsageTag(_a) {
    var short = _a.short, name = _a.name;
    return short !== undefined ? "-" + short + ", --" + name : "--" + name;
}
function optionParam(option) {
    switch (option.type) {
        case "string":
            return " [" + option.name + "]";
        case "array":
            return " <" + option.name + ">";
        case "boolean":
            return "";
    }
}
function collect(val, memo) {
    memo.push(val);
    return memo;
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;

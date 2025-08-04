import * as cp from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import * as url from "url";
import which from "which";

const stradaFourslashPath = path.resolve(import.meta.dirname, "../", "../", "../", "_submodules", "TypeScript", "tests", "cases", "fourslash");

let inputFileSet: Set<string> | undefined;

const failingTestsPath = path.join(import.meta.dirname, "failingTests.txt");
const manualTestsPath = path.join(import.meta.dirname, "manualTests.txt");

const outputDir = path.join(import.meta.dirname, "../", "tests", "gen");

const unparsedFiles: string[] = [];

function getFailingTests(): Set<string> {
    const failingTestsList = fs.readFileSync(failingTestsPath, "utf-8").split("\n").map(line => line.trim().substring(4)).filter(line => line.length > 0);
    return new Set(failingTestsList);
}

function getManualTests(): Set<string> {
    if (!fs.existsSync(manualTestsPath)) {
        return new Set();
    }
    const manualTestsList = fs.readFileSync(manualTestsPath, "utf-8").split("\n").map(line => line.trim()).filter(line => line.length > 0);
    return new Set(manualTestsList);
}

export function main() {
    const args = process.argv.slice(2);
    const inputFilesPath = args[0];
    if (inputFilesPath) {
        const inputFiles = fs.readFileSync(inputFilesPath, "utf-8")
            .split("\n").map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => path.basename(line));
        inputFileSet = new Set(inputFiles);
    }

    fs.rmSync(outputDir, { recursive: true, force: true });
    fs.mkdirSync(outputDir, { recursive: true });

    parseTypeScriptFiles(getFailingTests(), getManualTests(), stradaFourslashPath);
    console.log(unparsedFiles.join("\n"));
    const gofmt = which.sync("go");
    cp.execFileSync(gofmt, ["tool", "mvdan.cc/gofumpt", "-lang=go1.24", "-w", outputDir]);
}

function parseTypeScriptFiles(failingTests: Set<string>, manualTests: Set<string>, folder: string): void {
    const files = fs.readdirSync(folder);

    files.forEach(file => {
        const filePath = path.join(folder, file);
        const stat = fs.statSync(filePath);
        if (inputFileSet && !inputFileSet.has(file)) {
            return;
        }

        if (stat.isDirectory()) {
            parseTypeScriptFiles(failingTests, manualTests, filePath);
        }
        else if (file.endsWith(".ts") && !manualTests.has(file.slice(0, -3))) {
            const content = fs.readFileSync(filePath, "utf-8");
            const test = parseFileContent(file, content);
            if (test) {
                const testContent = generateGoTest(failingTests, test);
                const testPath = path.join(outputDir, `${test.name}_test.go`);
                fs.writeFileSync(testPath, testContent, "utf-8");
            }
        }
    });
}

function parseFileContent(filename: string, content: string): GoTest | undefined {
    console.error(`Parsing file: ${filename}`);
    const sourceFile = ts.createSourceFile("temp.ts", content, ts.ScriptTarget.Latest, true /*setParentNodes*/);
    const statements = sourceFile.statements;
    const goTest: GoTest = {
        name: filename.replace(".ts", "").replace(".", ""),
        content: getTestInput(content),
        commands: [],
    };
    for (const statement of statements) {
        const result = parseFourslashStatement(statement);
        if (!result) {
            unparsedFiles.push(filename);
            return undefined;
        }
        else {
            goTest.commands.push(...result);
        }
    }
    return goTest;
}

function getTestInput(content: string): string {
    const lines = content.split("\n");
    let testInput: string[] = [];
    for (const line of lines) {
        let newLine = "";
        if (line.startsWith("////")) {
            const parts = line.substring(4).split("`");
            for (let i = 0; i < parts.length; i++) {
                if (i > 0) {
                    newLine += `\` + "\`" + \``;
                }
                newLine += parts[i];
            }
            testInput.push(newLine);
        }
        else if (line.startsWith("// @") || line.startsWith("//@")) {
            testInput.push(line);
        }
        // !!! preserve non-input comments?
    }

    // chomp leading spaces
    if (!testInput.some(line => line.length != 0 && !line.startsWith(" ") && !line.startsWith("// "))) {
        testInput = testInput.map(line => {
            if (line.startsWith(" ")) return line.substring(1);
            return line;
        });
    }
    return `\`${testInput.join("\n")}\``;
}

/**
 * Parses a Strada fourslash statement and returns the corresponding Corsa commands.
 * @returns an array of commands if the statement is a valid fourslash command, or `false` if the statement could not be parsed.
 */
function parseFourslashStatement(statement: ts.Statement): Cmd[] | undefined {
    if (ts.isVariableStatement(statement)) {
        // variable declarations (for ranges and markers), e.g. `const range = test.ranges()[0];`
        return [];
    }
    else if (ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression)) {
        const callExpression = statement.expression;
        if (!ts.isPropertyAccessExpression(callExpression.expression)) {
            console.error(`Expected property access expression, got ${callExpression.expression.getText()}`);
            return undefined;
        }
        const namespace = callExpression.expression.expression;
        const func = callExpression.expression.name;
        if (!(ts.isIdentifier(namespace) || namespace.getText() === "verify.not") || !ts.isIdentifier(func)) {
            console.error(`Expected identifiers for namespace and function, got ${namespace.getText()} and ${func.getText()}`);
            return undefined;
        }
        if (!ts.isIdentifier(namespace)) {
            switch (func.text) {
                case "quickInfoExists":
                    return parseQuickInfoArgs("notQuickInfoExists", callExpression.arguments);
            }
            console.error(`Unrecognized fourslash statement: ${statement.getText()}`);
            return undefined;
        }
        // `verify.(...)`
        if (namespace.text === "verify") {
            switch (func.text) {
                case "completions":
                    // `verify.completions(...)`
                    return parseVerifyCompletionsArgs(callExpression.arguments);
                case "quickInfoAt":
                case "quickInfoExists":
                case "quickInfoIs":
                case "quickInfos":
                    // `verify.quickInfo...(...)`
                    return parseQuickInfoArgs(func.text, callExpression.arguments);
                case "baselineFindAllReferences":
                    // `verify.baselineFindAllReferences(...)`
                    return [parseBaselineFindAllReferencesArgs(callExpression.arguments)];
                case "baselineQuickInfo":
                    return [parseBaselineQuickInfo(callExpression.arguments)];
                case "baselineSignatureHelp":
                    return [parseBaselineSignatureHelp(callExpression.arguments)];
                case "baselineGoToDefinition":
                case "baselineGetDefinitionAtPosition":
                    // Both of these take the same arguments, but differ in that...
                    //  - `verify.baselineGoToDefinition(...)` called getDefinitionAndBoundSpan
                    //  - `verify.baselineGetDefinitionAtPosition(...)` called getDefinitionAtPosition
                    // LSP doesn't have two separate commands though. It's unclear how we would model bound spans though.
                    return [parseBaselineGoToDefinitionArgs(callExpression.arguments)];
            }
        }
        // `goTo....`
        if (namespace.text === "goTo") {
            return parseGoToArgs(callExpression.arguments, func.text);
        }
        // `edit....`
        if (namespace.text === "edit") {
            const result = parseEditStatement(func.text, callExpression.arguments);
            if (!result) {
                return undefined;
            }
            return [result];
        }
        // !!! other fourslash commands
    }
    console.error(`Unrecognized fourslash statement: ${statement.getText()}`);
    return undefined;
}

function parseEditStatement(funcName: string, args: readonly ts.Expression[]): EditCmd | undefined {
    switch (funcName) {
        case "insert":
        case "paste":
        case "insertLine":
            if (args.length !== 1 || !ts.isStringLiteralLike(args[0])) {
                console.error(`Expected a single string literal argument in edit.${funcName}, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            return {
                kind: "edit",
                goStatement: `f.${funcName.charAt(0).toUpperCase() + funcName.slice(1)}(t, ${getGoStringLiteral(args[0].text)})`,
            };
        case "replaceLine":
            if (args.length !== 2 || !ts.isNumericLiteral(args[0]) || !ts.isStringLiteral(args[1])) {
                console.error(`Expected a single string literal argument in edit.insert, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            return {
                kind: "edit",
                goStatement: `f.ReplaceLine(t, ${args[0].text}, ${getGoStringLiteral(args[1].text)})`,
            };
        case "backspace":
            const arg = args[0];
            if (arg) {
                if (!ts.isNumericLiteral(arg)) {
                    console.error(`Expected numeric literal argument in edit.backspace, got ${arg.getText()}`);
                    return undefined;
                }
                return {
                    kind: "edit",
                    goStatement: `f.Backspace(t, ${arg.text})`,
                };
            }
            return {
                kind: "edit",
                goStatement: `f.Backspace(t, 1)`,
            };
        default:
            console.error(`Unrecognized edit function: ${funcName}`);
            return undefined;
    }
}

function getGoStringLiteral(text: string): string {
    return `${JSON.stringify(text)}`;
}

function parseGoToArgs(args: readonly ts.Expression[], funcName: string): GoToCmd[] | undefined {
    switch (funcName) {
        case "marker":
            const arg = args[0];
            if (arg === undefined) {
                return [{
                    kind: "goTo",
                    funcName: "marker",
                    args: [`""`],
                }];
            }
            if (!ts.isStringLiteral(arg)) {
                console.error(`Unrecognized argument in goTo.marker: ${arg.getText()}`);
                return undefined;
            }
            return [{
                kind: "goTo",
                funcName: "marker",
                args: [getGoStringLiteral(arg.text)],
            }];
        case "file":
            if (args.length !== 1) {
                console.error(`Expected a single argument in goTo.file, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            if (ts.isStringLiteral(args[0])) {
                return [{
                    kind: "goTo",
                    funcName: "file",
                    args: [getGoStringLiteral(args[0].text)],
                }];
            }
            else if (ts.isNumericLiteral(args[0])) {
                return [{
                    kind: "goTo",
                    funcName: "fileNumber",
                    args: [args[0].text],
                }];
            }
            console.error(`Expected string or number literal argument in goTo.file, got ${args[0].getText()}`);
            return undefined;
        case "position":
            if (args.length !== 1 || !ts.isNumericLiteral(args[0])) {
                console.error(`Expected a single numeric literal argument in goTo.position, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            return [{
                kind: "goTo",
                funcName: "position",
                args: [`${args[0].text}`],
            }];
        case "eof":
            return [{
                kind: "goTo",
                funcName: "EOF",
                args: [],
            }];
        case "bof":
            return [{
                kind: "goTo",
                funcName: "BOF",
                args: [],
            }];
        case "select":
            if (args.length !== 2 || !ts.isStringLiteral(args[0]) || !ts.isStringLiteral(args[1])) {
                console.error(`Expected two string literal arguments in goTo.select, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            return [{
                kind: "goTo",
                funcName: "select",
                args: [getGoStringLiteral(args[0].text), getGoStringLiteral(args[1].text)],
            }];
        default:
            console.error(`Unrecognized goTo function: ${funcName}`);
            return undefined;
    }
}

function parseVerifyCompletionsArgs(args: readonly ts.Expression[]): VerifyCompletionsCmd[] | undefined {
    const cmds = [];
    for (const arg of args) {
        const result = parseVerifyCompletionArg(arg);
        if (!result) {
            return undefined;
        }
        cmds.push(result);
    }
    return cmds;
}

const completionConstants = new Map([
    ["completion.globals", "CompletionGlobals"],
    ["completion.globalTypes", "CompletionGlobalTypes"],
    ["completion.classElementKeywords", "CompletionClassElementKeywords"],
    ["completion.classElementInJsKeywords", "CompletionClassElementInJSKeywords"],
    ["completion.constructorParameterKeywords", "CompletionConstructorParameterKeywords"],
    ["completion.functionMembersWithPrototype", "CompletionFunctionMembersWithPrototype"],
    ["completion.functionMembers", "CompletionFunctionMembers"],
    ["completion.typeKeywords", "CompletionTypeKeywords"],
    ["completion.undefinedVarEntry", "CompletionUndefinedVarItem"],
    ["completion.typeAssertionKeywords", "CompletionTypeAssertionKeywords"],
]);

const completionPlus = new Map([
    ["completion.globalsPlus", "CompletionGlobalsPlus"],
    ["completion.globalTypesPlus", "CompletionGlobalTypesPlus"],
    ["completion.functionMembersPlus", "CompletionFunctionMembersPlus"],
    ["completion.functionMembersWithPrototypePlus", "CompletionFunctionMembersWithPrototypePlus"],
    ["completion.globalsInJsPlus", "CompletionGlobalsInJSPlus"],
    ["completion.typeKeywordsPlus", "CompletionTypeKeywordsPlus"],
]);

function parseVerifyCompletionArg(arg: ts.Expression): VerifyCompletionsCmd | undefined {
    let marker: string | undefined;
    let goArgs: VerifyCompletionsArgs | undefined;
    if (!ts.isObjectLiteralExpression(arg)) {
        console.error(`Expected object literal expression in verify.completions, got ${arg.getText()}`);
        return undefined;
    }
    let isNewIdentifierLocation: true | undefined;
    for (const prop of arg.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
            console.error(`Expected property assignment with identifier name, got ${prop.getText()}`);
            return undefined;
        }
        const propName = prop.name.text;
        const init = prop.initializer;
        switch (propName) {
            case "marker":
                if (ts.isStringLiteral(init)) {
                    marker = getGoStringLiteral(init.text);
                }
                else if (ts.isArrayLiteralExpression(init)) {
                    marker = "[]string{";
                    for (const elem of init.elements) {
                        if (!ts.isStringLiteral(elem)) {
                            console.error(`Expected string literal in marker array, got ${elem.getText()}`);
                            return undefined; // !!! parse marker arrays?
                        }
                        marker += `${getGoStringLiteral(elem.text)}, `;
                    }
                    marker += "}";
                }
                else if (ts.isObjectLiteralExpression(init)) {
                    // !!! parse marker objects?
                    console.error(`Unrecognized marker initializer: ${init.getText()}`);
                    return undefined;
                }
                else if (init.getText() === "test.markers()") {
                    marker = "f.Markers()";
                }
                else if (
                    ts.isCallExpression(init)
                    && init.expression.getText() === "test.marker"
                    && ts.isStringLiteralLike(init.arguments[0])
                ) {
                    marker = getGoStringLiteral(init.arguments[0].text);
                }
                else {
                    console.error(`Unrecognized marker initializer: ${init.getText()}`);
                    return undefined;
                }
                break;
            case "exact":
            case "includes":
            case "unsorted":
                if (init.getText() === "undefined") {
                    return {
                        kind: "verifyCompletions",
                        marker: marker ? marker : "nil",
                        args: "nil",
                    };
                }
                let expected: string;
                const initText = init.getText();
                if (completionConstants.has(initText)) {
                    expected = completionConstants.get(initText)!;
                }
                else if (completionPlus.keys().some(funcName => initText.startsWith(funcName))) {
                    const tsFunc = completionPlus.keys().find(funcName => initText.startsWith(funcName));
                    const funcName = completionPlus.get(tsFunc!)!;
                    const items = (init as ts.CallExpression).arguments[0];
                    const opts = (init as ts.CallExpression).arguments[1];
                    if (!ts.isArrayLiteralExpression(items)) {
                        console.error(`Expected array literal expression for completion.globalsPlus items, got ${items.getText()}`);
                        return undefined;
                    }
                    expected = `${funcName}(\n[]fourslash.CompletionsExpectedItem{`;
                    for (const elem of items.elements) {
                        const result = parseExpectedCompletionItem(elem);
                        if (!result) {
                            return undefined;
                        }
                        expected += "\n" + result + ",";
                    }
                    expected += "\n}";
                    if (opts) {
                        if (!ts.isObjectLiteralExpression(opts)) {
                            console.error(`Expected object literal expression for completion.globalsPlus options, got ${opts.getText()}`);
                            return undefined;
                        }
                        const noLib = opts.properties[0];
                        if (noLib && ts.isPropertyAssignment(noLib) && noLib.name.getText() === "noLib") {
                            if (noLib.initializer.kind === ts.SyntaxKind.TrueKeyword) {
                                expected += ", true";
                            }
                            else if (noLib.initializer.kind === ts.SyntaxKind.FalseKeyword) {
                                expected += ", false";
                            }
                            else {
                                console.error(`Expected boolean literal for noLib, got ${noLib.initializer.getText()}`);
                                return undefined;
                            }
                        }
                        else {
                            console.error(`Expected noLib property in completion.globalsPlus options, got ${opts.getText()}`);
                            return undefined;
                        }
                    }
                    else if (tsFunc === "completion.globalsPlus" || tsFunc === "completion.globalsInJsPlus") {
                        expected += ", false"; // Default for noLib
                    }
                    expected += ")";
                }
                else {
                    expected = "[]fourslash.CompletionsExpectedItem{";
                    if (ts.isArrayLiteralExpression(init)) {
                        for (const elem of init.elements) {
                            const result = parseExpectedCompletionItem(elem);
                            if (!result) {
                                return undefined;
                            }
                            expected += "\n" + result + ",";
                        }
                    }
                    else {
                        const result = parseExpectedCompletionItem(init);
                        if (!result) {
                            return undefined;
                        }
                        expected += "\n" + result + ",";
                    }
                    expected += "\n}";
                }
                if (propName === "includes") {
                    (goArgs ??= {}).includes = expected;
                }
                else if (propName === "exact") {
                    (goArgs ??= {}).exact = expected;
                }
                else {
                    (goArgs ??= {}).unsorted = expected;
                }
                break;
            case "excludes":
                let excludes = "[]string{";
                if (ts.isStringLiteral(init)) {
                    excludes += `\n${getGoStringLiteral(init.text)},`;
                }
                else if (ts.isArrayLiteralExpression(init)) {
                    for (const elem of init.elements) {
                        if (!ts.isStringLiteral(elem)) {
                            return undefined; // Shouldn't happen
                        }
                        excludes += `\n${getGoStringLiteral(elem.text)},`;
                    }
                }
                excludes += "\n}";
                (goArgs ??= {}).excludes = excludes;
                break;
            case "isNewIdentifierLocation":
                if (init.kind === ts.SyntaxKind.TrueKeyword) {
                    isNewIdentifierLocation = true;
                }
                break;
            case "preferences":
            case "triggerCharacter":
            case "defaultCommitCharacters":
                break; // !!! parse once they're supported in fourslash
            case "optionalReplacementSpan": // the only two tests that use this will require manual conversion
            case "isGlobalCompletion":
                break; // Ignored, unused
            default:
                console.error(`Unrecognized expected completion item: ${init.parent.getText()}`);
                return undefined;
        }
    }
    return {
        kind: "verifyCompletions",
        marker: marker ? marker : "nil",
        args: goArgs,
        isNewIdentifierLocation: isNewIdentifierLocation,
    };
}

function parseExpectedCompletionItem(expr: ts.Expression): string | undefined {
    if (completionConstants.has(expr.getText())) {
        return completionConstants.get(expr.getText())!;
    }
    if (ts.isStringLiteralLike(expr)) {
        return getGoStringLiteral(expr.text);
    }
    if (ts.isObjectLiteralExpression(expr)) {
        let isDeprecated = false; // !!!
        let isOptional = false;
        let extensions: string[] = []; // !!!
        let itemProps: string[] = [];
        let name: string | undefined;
        let insertText: string | undefined;
        let filterText: string | undefined;
        for (const prop of expr.properties) {
            if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
                console.error(`Expected property assignment with identifier name for completion item, got ${prop.getText()}`);
                return undefined;
            }
            const propName = prop.name.text;
            const init = prop.initializer;
            switch (propName) {
                case "name":
                    if (ts.isStringLiteralLike(init)) {
                        name = init.text;
                    }
                    else {
                        console.error(`Expected string literal for completion item name, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                case "sortText":
                    const result = parseSortText(init);
                    if (!result) {
                        return undefined;
                    }
                    itemProps.push(`SortText: PtrTo(string(${result})),`);
                    if (result === "ls.SortTextOptionalMember") {
                        isOptional = true;
                    }
                    break;
                case "insertText":
                    if (ts.isStringLiteralLike(init)) {
                        insertText = init.text;
                    }
                    else if (init.getText() === "undefined") {
                        // Ignore
                    }
                    else {
                        console.error(`Expected string literal for insertText, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                case "filterText":
                    if (ts.isStringLiteralLike(init)) {
                        filterText = init.text;
                    }
                    else {
                        console.error(`Expected string literal for filterText, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                case "isRecommended":
                    if (init.kind === ts.SyntaxKind.TrueKeyword) {
                        itemProps.push(`Preselect: PtrTo(true),`);
                    }
                    break;
                case "kind":
                    const kind = parseKind(init);
                    if (!kind) {
                        return undefined;
                    }
                    itemProps.push(`Kind: PtrTo(${kind}),`);
                    break;
                case "kindModifiers":
                    const modifiers = parseKindModifiers(init);
                    if (!modifiers) {
                        return undefined;
                    }
                    ({ isDeprecated, isOptional, extensions } = modifiers);
                    break;
                case "text":
                    if (ts.isStringLiteralLike(init)) {
                        itemProps.push(`Detail: PtrTo(${getGoStringLiteral(init.text)}),`);
                    }
                    else {
                        console.error(`Expected string literal for text, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                case "documentation":
                    if (ts.isStringLiteral(init)) {
                        itemProps.push(`Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: ${getGoStringLiteral(init.text)},
						},
					},`);
                    }
                    else {
                        console.error(`Expected string literal for documentation, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                case "isFromUncheckedFile":
                    break; // Ignored
                case "commitCharacters":
                case "replacementSpan":
                    // !!! support these later
                    break;
                default:
                    console.error(`Unrecognized property in expected completion item: ${propName}`);
                    return undefined; // Unsupported property
            }
        }
        if (!name) {
            return undefined; // Shouldn't happen
        }
        if (isOptional) {
            insertText ??= name;
            filterText ??= name;
            name += "?";
        }
        if (filterText) itemProps.unshift(`FilterText: PtrTo(${getGoStringLiteral(filterText)}),`);
        if (insertText) itemProps.unshift(`InsertText: PtrTo(${getGoStringLiteral(insertText)}),`);
        itemProps.unshift(`Label: ${getGoStringLiteral(name!)},`);
        return `&lsproto.CompletionItem{\n${itemProps.join("\n")}}`;
    }
    console.error(`Expected string literal or object literal for expected completion item, got ${expr.getText()}`);
    return undefined; // Unsupported expression type
}

function parseBaselineFindAllReferencesArgs(args: readonly ts.Expression[]): VerifyBaselineFindAllReferencesCmd {
    const newArgs = [];
    for (const arg of args) {
        if (ts.isStringLiteral(arg)) {
            newArgs.push(getGoStringLiteral(arg.text));
        }
        else if (arg.getText() === "...test.markerNames()") {
            newArgs.push("f.MarkerNames()...");
        }
        else if (arg.getText() === "...test.ranges()") {
            return {
                kind: "verifyBaselineFindAllReferences",
                markers: [],
                ranges: true,
            };
        }
    }

    return {
        kind: "verifyBaselineFindAllReferences",
        markers: newArgs,
    };
}

function parseBaselineGoToDefinitionArgs(args: readonly ts.Expression[]): VerifyBaselineGoToDefinitionCmd {
    const newArgs = [];
    for (const arg of args) {
        if (ts.isStringLiteral(arg)) {
            newArgs.push(getGoStringLiteral(arg.text));
        }
        else if (arg.getText() === "...test.markerNames()") {
            newArgs.push("f.MarkerNames()...");
        }
        else if (arg.getText() === "...test.ranges()") {
            return {
                kind: "verifyBaselineGoToDefinition",
                markers: [],
                ranges: true,
            };
        }
    }

    return {
        kind: "verifyBaselineGoToDefinition",
        markers: newArgs,
    };
}

function parseBaselineQuickInfo(args: ts.NodeArray<ts.Expression>): Cmd {
    if (args.length !== 0) {
        // All calls are currently empty!
        throw new Error("Expected no arguments in verify.baselineQuickInfo");
    }
    return {
        kind: "verifyBaselineQuickInfo",
    };
}

function parseQuickInfoArgs(funcName: string, args: readonly ts.Expression[]): VerifyQuickInfoCmd[] | undefined {
    // We currently don't support 'expectedTags'.
    switch (funcName) {
        case "quickInfoAt": {
            if (args.length < 1 || args.length > 3) {
                console.error(`Expected 1 or 2 arguments in quickInfoIs, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            if (!ts.isStringLiteralLike(args[0])) {
                console.error(`Expected string literal for first argument in quickInfoAt, got ${args[0].getText()}`);
                return undefined;
            }
            const marker = getGoStringLiteral(args[0].text);
            let text: string | undefined;
            if (args[1]) {
                if (!ts.isStringLiteralLike(args[1])) {
                    console.error(`Expected string literal for second argument in quickInfoAt, got ${args[1].getText()}`);
                    return undefined;
                }
                text = getGoStringLiteral(args[1].text);
            }
            let docs: string | undefined;
            if (args[2]) {
                if (!ts.isStringLiteralLike(args[2]) && args[2].getText() !== "undefined") {
                    console.error(`Expected string literal or undefined for third argument in quickInfoAt, got ${args[2].getText()}`);
                    return undefined;
                }
                if (ts.isStringLiteralLike(args[2])) {
                    docs = getGoStringLiteral(args[1].text);
                }
            }
            return [{
                kind: "quickInfoAt",
                marker,
                text,
                docs,
            }];
        }
        case "quickInfos": {
            const cmds: VerifyQuickInfoCmd[] = [];
            if (args.length !== 1 || !ts.isObjectLiteralExpression(args[0])) {
                console.error(`Expected a single object literal argument in quickInfos, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            for (const prop of args[0].properties) {
                if (!ts.isPropertyAssignment(prop)) {
                    console.error(`Expected property assignment in quickInfos, got ${prop.getText()}`);
                    return undefined;
                }
                if (!(ts.isIdentifier(prop.name) || ts.isStringLiteralLike(prop.name) || ts.isNumericLiteral(prop.name))) {
                    console.error(`Expected identifier or literal for property name in quickInfos, got ${prop.name.getText()}`);
                    return undefined;
                }
                const marker = getGoStringLiteral(prop.name.text);
                let text: string | undefined;
                let docs: string | undefined;
                if (ts.isArrayLiteralExpression(prop.initializer)) {
                    if (prop.initializer.elements.length !== 2) {
                        console.error(`Expected two elements in array literal for quickInfos property, got ${prop.initializer.getText()}`);
                        return undefined;
                    }
                    if (!ts.isStringLiteralLike(prop.initializer.elements[0]) || !ts.isStringLiteralLike(prop.initializer.elements[1])) {
                        console.error(`Expected string literals in array literal for quickInfos property, got ${prop.initializer.getText()}`);
                        return undefined;
                    }
                    text = getGoStringLiteral(prop.initializer.elements[0].text);
                    docs = getGoStringLiteral(prop.initializer.elements[1].text);
                }
                else if (ts.isStringLiteralLike(prop.initializer)) {
                    text = getGoStringLiteral(prop.initializer.text);
                }
                else {
                    console.error(`Expected string literal or array literal for quickInfos property, got ${prop.initializer.getText()}`);
                    return undefined;
                }
                cmds.push({
                    kind: "quickInfoAt",
                    marker,
                    text,
                    docs,
                });
            }
            return cmds;
        }
        case "quickInfoExists":
            return [{
                kind: "quickInfoExists",
            }];
        case "notQuickInfoExists":
            return [{
                kind: "notQuickInfoExists",
            }];
        case "quickInfoIs": {
            if (args.length < 1 || args.length > 2) {
                console.error(`Expected 1 or 2 arguments in quickInfoIs, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            if (!ts.isStringLiteralLike(args[0])) {
                console.error(`Expected string literal for first argument in quickInfoIs, got ${args[0].getText()}`);
                return undefined;
            }
            const text = getGoStringLiteral(args[0].text);
            let docs: string | undefined;
            if (args[1]) {
                if (!ts.isStringLiteralLike(args[1])) {
                    console.error(`Expected string literal for second argument in quickInfoIs, got ${args[1].getText()}`);
                    return undefined;
                }
                docs = getGoStringLiteral(args[1].text);
            }
            return [{
                kind: "quickInfoIs",
                text,
                docs,
            }];
        }
    }
    console.error(`Unrecognized quick info function: ${funcName}`);
    return undefined;
}

function parseBaselineSignatureHelp(args: ts.NodeArray<ts.Expression>): Cmd {
    if (args.length !== 0) {
        // All calls are currently empty!
        throw new Error("Expected no arguments in verify.baselineSignatureHelp");
    }
    return {
        kind: "verifyBaselineSignatureHelp",
    };
}

function parseKind(expr: ts.Expression): string | undefined {
    if (!ts.isStringLiteral(expr)) {
        console.error(`Expected string literal for kind, got ${expr.getText()}`);
        return undefined;
    }
    switch (expr.text) {
        case "primitive type":
        case "keyword":
            return "lsproto.CompletionItemKindKeyword";
        case "const":
        case "let":
        case "var":
        case "local var":
        case "alias":
        case "parameter":
            return "lsproto.CompletionItemKindVariable";
        case "property":
        case "getter":
        case "setter":
            return "lsproto.CompletionItemKindField";
        case "function":
        case "local function":
            return "lsproto.CompletionItemKindFunction";
        case "method":
        case "construct":
        case "call":
        case "index":
            return "lsproto.CompletionItemKindMethod";
        case "enum":
            return "lsproto.CompletionItemKindEnum";
        case "enum member":
            return "lsproto.CompletionItemKindEnumMember";
        case "module":
        case "external module name":
            return "lsproto.CompletionItemKindModule";
        case "class":
        case "type":
            return "lsproto.CompletionItemKindClass";
        case "interface":
            return "lsproto.CompletionItemKindInterface";
        case "warning":
            return "lsproto.CompletionItemKindText";
        case "script":
            return "lsproto.CompletionItemKindFile";
        case "directory":
            return "lsproto.CompletionItemKindFolder";
        case "string":
            return "lsproto.CompletionItemKindConstant";
        default:
            return "lsproto.CompletionItemKindProperty";
    }
}

const fileKindModifiers = new Set([".d.ts", ".ts", ".tsx", ".js", ".jsx", ".json"]);

function parseKindModifiers(expr: ts.Expression): { isOptional: boolean; isDeprecated: boolean; extensions: string[]; } | undefined {
    if (!ts.isStringLiteral(expr)) {
        console.error(`Expected string literal for kind modifiers, got ${expr.getText()}`);
        return undefined;
    }
    let isOptional = false;
    let isDeprecated = false;
    const extensions: string[] = [];
    const modifiers = expr.text.split(",");
    for (const modifier of modifiers) {
        switch (modifier) {
            case "optional":
                isOptional = true;
                break;
            case "deprecated":
                isDeprecated = true;
                break;
            default:
                if (fileKindModifiers.has(modifier)) {
                    extensions.push(modifier);
                }
        }
    }
    return {
        isOptional,
        isDeprecated,
        extensions,
    };
}

function parseSortText(expr: ts.Expression): string | undefined {
    if (ts.isCallExpression(expr) && expr.expression.getText() === "completion.SortText.Deprecated") {
        return `ls.DeprecateSortText(${parseSortText(expr.arguments[0])})`;
    }
    const text = expr.getText();
    switch (text) {
        case "completion.SortText.LocalDeclarationPriority":
            return "ls.SortTextLocalDeclarationPriority";
        case "completion.SortText.LocationPriority":
            return "ls.SortTextLocationPriority";
        case "completion.SortText.OptionalMember":
            return "ls.SortTextOptionalMember";
        case "completion.SortText.MemberDeclaredBySpreadAssignment":
            return "ls.SortTextMemberDeclaredBySpreadAssignment";
        case "completion.SortText.SuggestedClassMembers":
            return "ls.SortTextSuggestedClassMembers";
        case "completion.SortText.GlobalsOrKeywords":
            return "ls.SortTextGlobalsOrKeywords";
        case "completion.SortText.AutoImportSuggestions":
            return "ls.SortTextAutoImportSuggestions";
        case "completion.SortText.ClassMemberSnippets":
            return "ls.SortTextClassMemberSnippets";
        case "completion.SortText.JavascriptIdentifiers":
            return "ls.SortTextJavascriptIdentifiers";
        default:
            console.error(`Unrecognized sort text: ${text}`);
            return undefined; // !!! support deprecated/obj literal prop/etc
    }
}

interface VerifyCompletionsCmd {
    kind: "verifyCompletions";
    marker: string;
    isNewIdentifierLocation?: true;
    args?: VerifyCompletionsArgs | "nil";
}

interface VerifyCompletionsArgs {
    includes?: string;
    excludes?: string;
    exact?: string;
    unsorted?: string;
}

interface VerifyBaselineFindAllReferencesCmd {
    kind: "verifyBaselineFindAllReferences";
    markers: string[];
    ranges?: boolean;
}

interface VerifyBaselineFindAllReferencesCmd {
    kind: "verifyBaselineFindAllReferences";
    markers: string[];
    ranges?: boolean;
}

interface VerifyBaselineGoToDefinitionCmd {
    kind: "verifyBaselineGoToDefinition";
    markers: string[];
    ranges?: boolean;
}

interface VerifyBaselineQuickInfoCmd {
    kind: "verifyBaselineQuickInfo";
}

interface VerifyBaselineSignatureHelpCmd {
    kind: "verifyBaselineSignatureHelp";
}

interface GoToCmd {
    kind: "goTo";
    // !!! `selectRange` and `rangeStart` require parsing variables and `test.ranges()[n]`
    funcName: "marker" | "file" | "fileNumber" | "EOF" | "BOF" | "position" | "select";
    args: string[];
}

interface EditCmd {
    kind: "edit";
    goStatement: string;
}

interface VerifyQuickInfoCmd {
    kind: "quickInfoIs" | "quickInfoAt" | "quickInfoExists" | "notQuickInfoExists";
    marker?: string;
    text?: string;
    docs?: string;
}

type Cmd =
    | VerifyCompletionsCmd
    | VerifyBaselineFindAllReferencesCmd
    | VerifyBaselineGoToDefinitionCmd
    | VerifyBaselineQuickInfoCmd
    | VerifyBaselineSignatureHelpCmd
    | GoToCmd
    | EditCmd
    | VerifyQuickInfoCmd;

function generateVerifyCompletions({ marker, args, isNewIdentifierLocation }: VerifyCompletionsCmd): string {
    let expectedList: string;
    if (args === "nil") {
        expectedList = "nil";
    }
    else {
        const expected = [];
        if (args?.includes) expected.push(`Includes: ${args.includes},`);
        if (args?.excludes) expected.push(`Excludes: ${args.excludes},`);
        if (args?.exact) expected.push(`Exact: ${args.exact},`);
        if (args?.unsorted) expected.push(`Unsorted: ${args.unsorted},`);
        // !!! isIncomplete
        const commitCharacters = isNewIdentifierLocation ? "[]string{}" : "DefaultCommitCharacters";
        expectedList = `&fourslash.CompletionsExpectedList{
    IsIncomplete: false,
    ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
        CommitCharacters: &${commitCharacters},
        EditRange: Ignored,
    },
    Items: &fourslash.CompletionsExpectedItems{
        ${expected.join("\n")}
    },
}`;
    }
    return `f.VerifyCompletions(t, ${marker}, ${expectedList})`;
}

function generateBaselineFindAllReferences({ markers, ranges }: VerifyBaselineFindAllReferencesCmd): string {
    if (ranges || markers.length === 0) {
        return `f.VerifyBaselineFindAllReferences(t)`;
    }
    return `f.VerifyBaselineFindAllReferences(t, ${markers.join(", ")})`;
}

function generateBaselineGoToDefinition({ markers, ranges }: VerifyBaselineGoToDefinitionCmd): string {
    if (ranges || markers.length === 0) {
        return `f.VerifyBaselineGoToDefinition(t)`;
    }
    return `f.VerifyBaselineGoToDefinition(t, ${markers.join(", ")})`;
}

function generateGoToCommand({ funcName, args }: GoToCmd): string {
    const funcNameCapitalized = funcName.charAt(0).toUpperCase() + funcName.slice(1);
    return `f.GoTo${funcNameCapitalized}(t, ${args.join(", ")})`;
}

function generateQuickInfoCommand({ kind, marker, text, docs }: VerifyQuickInfoCmd): string {
    switch (kind) {
        case "quickInfoIs":
            return `f.VerifyQuickInfoIs(t, ${text!}, ${docs ? docs : `""`})`;
        case "quickInfoAt":
            return `f.VerifyQuickInfoAt(t, ${marker!}, ${text ? text : `""`}, ${docs ? docs : `""`})`;
        case "quickInfoExists":
            return `f.VerifyQuickInfoExists(t)`;
        case "notQuickInfoExists":
            return `f.VerifyNotQuickInfoExists(t)`;
    }
}

function generateCmd(cmd: Cmd): string {
    switch (cmd.kind) {
        case "verifyCompletions":
            return generateVerifyCompletions(cmd);
        case "verifyBaselineFindAllReferences":
            return generateBaselineFindAllReferences(cmd);
        case "verifyBaselineGoToDefinition":
            return generateBaselineGoToDefinition(cmd);
        case "verifyBaselineQuickInfo":
            // Quick Info -> Hover
            return `f.VerifyBaselineHover(t)`;
        case "verifyBaselineSignatureHelp":
            return `f.VerifyBaselineSignatureHelp(t)`;
        case "goTo":
            return generateGoToCommand(cmd);
        case "edit":
            return cmd.goStatement;
        case "quickInfoAt":
        case "quickInfoIs":
        case "quickInfoExists":
        case "notQuickInfoExists":
            return generateQuickInfoCommand(cmd);
        default:
            let neverCommand: never = cmd;
            throw new Error(`Unknown command kind: ${neverCommand as Cmd["kind"]}`);
    }
}

interface GoTest {
    name: string;
    content: string;
    commands: Cmd[];
}

function generateGoTest(failingTests: Set<string>, test: GoTest): string {
    const testName = (test.name[0].toUpperCase() + test.name.substring(1)).replaceAll("-", "_");
    const content = test.content;
    const commands = test.commands.map(cmd => generateCmd(cmd)).join("\n");
    const imports = [`"github.com/microsoft/typescript-go/internal/fourslash"`];
    // Only include these imports if the commands use them to avoid unused import errors.
    if (commands.includes("ls.")) {
        imports.push(`"github.com/microsoft/typescript-go/internal/ls"`);
    }
    if (commands.includes("lsproto.")) {
        imports.push(`"github.com/microsoft/typescript-go/internal/lsp/lsproto"`);
    }
    if (usesHelper(commands)) {
        imports.push(`. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"`);
    }
    imports.push(`"github.com/microsoft/typescript-go/internal/testutil"`);
    const template = `package fourslash_test

import (
	"testing"

    ${imports.join("\n\t")}
)

func Test${testName}(t *testing.T) {
    t.Parallel()
    ${failingTests.has(testName) ? "t.Skip()" : ""}
    defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ${content}
    f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
    ${commands}
}`;
    return template;
}

function usesHelper(goTxt: string): boolean {
    for (const [_, constant] of completionConstants) {
        if (goTxt.includes(constant)) {
            return true;
        }
    }
    for (const [_, constant] of completionPlus) {
        if (goTxt.includes(constant)) {
            return true;
        }
    }
    return goTxt.includes("Ignored")
        || goTxt.includes("DefaultCommitCharacters")
        || goTxt.includes("PtrTo");
}

if (url.fileURLToPath(import.meta.url) == process.argv[1]) {
    main();
}

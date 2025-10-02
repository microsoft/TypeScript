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
    cp.execFileSync(gofmt, ["tool", "mvdan.cc/gofumpt", "-lang=go1.25", "-w", outputDir]);
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
    const lines = content.split("\n").map(line => line.endsWith("\r") ? line.slice(0, -1) : line);
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
    if (
        !testInput.some(line =>
            line.length != 0 &&
            !line.startsWith(" ") &&
            !line.startsWith("// ") &&
            !line.startsWith("//@")
        )
    ) {
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
                    return parseBaselineFindAllReferencesArgs(callExpression.arguments);
                case "baselineDocumentHighlights":
                    return parseBaselineDocumentHighlightsArgs(callExpression.arguments);
                case "baselineQuickInfo":
                    return parseBaselineQuickInfo(callExpression.arguments);
                case "baselineSignatureHelp":
                    return [parseBaselineSignatureHelp(callExpression.arguments)];
                case "baselineGoToDefinition":
                case "baselineGetDefinitionAtPosition":
                    // Both of these take the same arguments, but differ in that...
                    //  - `verify.baselineGoToDefinition(...)` called getDefinitionAndBoundSpan
                    //  - `verify.baselineGetDefinitionAtPosition(...)` called getDefinitionAtPosition
                    // LSP doesn't have two separate commands though. It's unclear how we would model bound spans though.
                    return parseBaselineGoToDefinitionArgs(callExpression.arguments);
                case "baselineRename":
                case "baselineRenameAtRangesWithText":
                    // `verify.baselineRename...(...)`
                    return parseBaselineRenameArgs(func.text, callExpression.arguments);
                case "renameInfoSucceeded":
                case "renameInfoFailed":
                    return parseRenameInfo(func.text, callExpression.arguments);
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
        case "insertLine": {
            let arg0;
            if (args.length !== 1 || !(arg0 = getStringLiteralLike(args[0]))) {
                console.error(`Expected a single string literal argument in edit.${funcName}, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            return {
                kind: "edit",
                goStatement: `f.${funcName.charAt(0).toUpperCase() + funcName.slice(1)}(t, ${getGoStringLiteral(arg0.text)})`,
            };
        }
        case "replaceLine": {
            let arg0, arg1;
            if (args.length !== 2 || !(arg0 = getNumericLiteral(args[0])) || !(arg1 = getStringLiteralLike(args[1]))) {
                console.error(`Expected a single string literal argument in edit.insert, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            return {
                kind: "edit",
                goStatement: `f.ReplaceLine(t, ${arg0.text}, ${getGoStringLiteral(arg1.text)})`,
            };
        }
        case "backspace": {
            const arg = args[0];
            if (args[0]) {
                let arg0;
                if (!(arg0 = getNumericLiteral(arg))) {
                    console.error(`Expected numeric literal argument in edit.backspace, got ${arg.getText()}`);
                    return undefined;
                }
                return {
                    kind: "edit",
                    goStatement: `f.Backspace(t, ${arg0.text})`,
                };
            }
            return {
                kind: "edit",
                goStatement: `f.Backspace(t, 1)`,
            };
        }
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
        case "marker": {
            const arg = args[0];
            if (arg === undefined) {
                return [{
                    kind: "goTo",
                    funcName: "marker",
                    args: [`""`],
                }];
            }
            let strArg;
            if (!(strArg = getStringLiteralLike(arg))) {
                console.error(`Unrecognized argument in goTo.marker: ${arg.getText()}`);
                return undefined;
            }
            return [{
                kind: "goTo",
                funcName: "marker",
                args: [getGoStringLiteral(strArg.text)],
            }];
        }
        case "file": {
            if (args.length !== 1) {
                console.error(`Expected a single argument in goTo.file, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            let arg0;
            if (arg0 = getStringLiteralLike(args[0])) {
                return [{
                    kind: "goTo",
                    funcName: "file",
                    args: [getGoStringLiteral(arg0.text)],
                }];
            }
            else if (arg0 = getNumericLiteral(args[0])) {
                return [{
                    kind: "goTo",
                    funcName: "fileNumber",
                    args: [arg0.text],
                }];
            }
            console.error(`Expected string or number literal argument in goTo.file, got ${args[0].getText()}`);
            return undefined;
        }
        case "position": {
            let arg0;
            if (args.length !== 1 || !(arg0 = getNumericLiteral(args[0]))) {
                console.error(`Expected a single numeric literal argument in goTo.position, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            return [{
                kind: "goTo",
                funcName: "position",
                args: [`${arg0.text}`],
            }];
        }
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
        case "select": {
            let arg0, arg1;
            if (args.length !== 2 || !(arg0 = getStringLiteralLike(args[0])) || !(arg1 = getStringLiteralLike(args[1]))) {
                console.error(`Expected two string literal arguments in goTo.select, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            return [{
                kind: "goTo",
                funcName: "select",
                args: [getGoStringLiteral(arg0.text), getGoStringLiteral(arg1.text)],
            }];
        }
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
    ["completion.globalThisEntry", "CompletionGlobalThisItem"],
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
    const obj = getObjectLiteralExpression(arg);
    if (!obj) {
        console.error(`Expected object literal expression in verify.completions, got ${arg.getText()}`);
        return undefined;
    }
    let isNewIdentifierLocation: true | undefined;
    for (const prop of obj.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
            console.error(`Expected property assignment with identifier name, got ${prop.getText()}`);
            return undefined;
        }
        const propName = prop.name.text;
        const init = prop.initializer;
        switch (propName) {
            case "marker": {
                let markerInit;
                if (markerInit = getStringLiteralLike(init)) {
                    marker = getGoStringLiteral(markerInit.text);
                }
                else if (markerInit = getArrayLiteralExpression(init)) {
                    marker = "[]string{";
                    for (const elem of markerInit.elements) {
                        if (!ts.isStringLiteral(elem)) {
                            console.error(`Expected string literal in marker array, got ${elem.getText()}`);
                            return undefined; // !!! parse marker arrays?
                        }
                        marker += `${getGoStringLiteral(elem.text)}, `;
                    }
                    marker += "}";
                }
                else if (markerInit = getObjectLiteralExpression(init)) {
                    // !!! parse marker objects?
                    console.error(`Unrecognized marker initializer: ${markerInit.getText()}`);
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
            }
            case "exact":
            case "includes":
            case "unsorted": {
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
                    const maybeItems = (init as ts.CallExpression).arguments[0];
                    const maybeOpts = (init as ts.CallExpression).arguments[1];
                    let items;
                    if (!(items = getArrayLiteralExpression(maybeItems))) {
                        console.error(`Expected array literal expression for completion.globalsPlus items, got ${maybeItems.getText()}`);
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
                    if (maybeOpts) {
                        let opts;
                        if (!(opts = getObjectLiteralExpression(maybeOpts))) {
                            console.error(`Expected object literal expression for completion.globalsPlus options, got ${maybeOpts.getText()}`);
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
                            console.error(`Expected noLib property in completion.globalsPlus options, got ${maybeOpts.getText()}`);
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
                    let items;
                    if (items = getArrayLiteralExpression(init)) {
                        for (const elem of items.elements) {
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
            }
            case "excludes": {
                let excludes = "[]string{";
                let item;
                if (item = getStringLiteralLike(init)) {
                    excludes += `\n${getGoStringLiteral(item.text)},`;
                }
                else if (item = getArrayLiteralExpression(init)) {
                    for (const elem of item.elements) {
                        if (!ts.isStringLiteral(elem)) {
                            return undefined; // Shouldn't happen
                        }
                        excludes += `\n${getGoStringLiteral(elem.text)},`;
                    }
                }
                excludes += "\n}";
                (goArgs ??= {}).excludes = excludes;
                break;
            }
            case "isNewIdentifierLocation":
                if (init.kind === ts.SyntaxKind.TrueKeyword) {
                    isNewIdentifierLocation = true;
                }
                break;
            case "preferences":
            case "triggerCharacter":
                break; // !!! parse once they're supported in fourslash
            case "defaultCommitCharacters":
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
    let strExpr;
    if (strExpr = getStringLiteralLike(expr)) {
        return getGoStringLiteral(strExpr.text);
    }
    if (strExpr = getObjectLiteralExpression(expr)) {
        let isDeprecated = false; // !!!
        let isOptional = false;
        let extensions: string[] = []; // !!!
        let itemProps: string[] = [];
        let name: string | undefined;
        let insertText: string | undefined;
        let filterText: string | undefined;
        let replacementSpanIdx: string | undefined;
        for (const prop of strExpr.properties) {
            if (!(ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop)) || !ts.isIdentifier(prop.name)) {
                console.error(`Expected property assignment with identifier name for completion item, got ${prop.getText()}`);
                return undefined;
            }
            const propName = prop.name.text;
            const init = ts.isPropertyAssignment(prop) ? prop.initializer : prop.name;
            switch (propName) {
                case "name": {
                    let nameInit;
                    if (nameInit = getStringLiteralLike(init)) {
                        name = nameInit.text;
                    }
                    else {
                        console.error(`Expected string literal for completion item name, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                }
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
                case "insertText": {
                    let insertTextInit;
                    if (insertTextInit = getStringLiteralLike(init)) {
                        insertText = insertTextInit.text;
                    }
                    else if (init.getText() === "undefined") {
                        // Ignore
                    }
                    else {
                        console.error(`Expected string literal for insertText, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                }
                case "filterText": {
                    let filterTextInit;
                    if (filterTextInit = getStringLiteralLike(init)) {
                        filterText = filterTextInit.text;
                    }
                    else {
                        console.error(`Expected string literal for filterText, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                }
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
                case "text": {
                    let textInit;
                    if (textInit = getStringLiteralLike(init)) {
                        itemProps.push(`Detail: PtrTo(${getGoStringLiteral(textInit.text)}),`);
                    }
                    else {
                        console.error(`Expected string literal for text, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                }
                case "documentation": {
                    let docInit;
                    if (docInit = getStringLiteralLike(init)) {
                        itemProps.push(`Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: ${getGoStringLiteral(docInit.text)},
						},
					},`);
                    }
                    else {
                        console.error(`Expected string literal for documentation, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                }
                case "isFromUncheckedFile":
                    break; // Ignored
                case "commitCharacters":
                    // !!! support these later
                    break;
                case "replacementSpan": {
                    let span;
                    if (ts.isIdentifier(init)) {
                        span = getNodeOfKind(init, (n: ts.Node): n is ts.Node => !ts.isIdentifier(n));
                    }
                    else {
                        span = init;
                    }
                    if (span?.getText().startsWith("test.ranges()[")) {
                        replacementSpanIdx = span.getText().match(/\d+/)?.[0];
                    }
                    break;
                }
                default:
                    console.error(`Unrecognized property in expected completion item: ${propName}`);
                    return undefined; // Unsupported property
            }
        }
        if (!name) {
            return undefined; // Shouldn't happen
        }
        if (replacementSpanIdx) {
            itemProps.push(`TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
                TextEdit: &lsproto.TextEdit{
                    NewText: ${getGoStringLiteral(name)},
                    Range:   f.Ranges()[${replacementSpanIdx}].LSRange,
                },
            },`);
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

function parseBaselineFindAllReferencesArgs(args: readonly ts.Expression[]): [VerifyBaselineFindAllReferencesCmd] | undefined {
    const newArgs = [];
    for (const arg of args) {
        let strArg;
        if (strArg = getStringLiteralLike(arg)) {
            newArgs.push(getGoStringLiteral(strArg.text));
        }
        else if (arg.getText() === "...test.markerNames()") {
            newArgs.push("f.MarkerNames()...");
        }
        else if (arg.getText() === "...test.ranges()") {
            return [{
                kind: "verifyBaselineFindAllReferences",
                markers: [],
                ranges: true,
            }];
        }
        else {
            console.error(`Unrecognized argument in verify.baselineFindAllReferences: ${arg.getText()}`);
            return undefined;
        }
    }

    return [{
        kind: "verifyBaselineFindAllReferences",
        markers: newArgs,
    }];
}

function parseBaselineDocumentHighlightsArgs(args: readonly ts.Expression[]): [VerifyBaselineDocumentHighlightsCmd] | undefined {
    const newArgs: string[] = [];
    let preferences: string | undefined;
    for (const arg of args) {
        let strArg;
        if (strArg = getArrayLiteralExpression(arg)) {
            for (const elem of strArg.elements) {
                const newArg = parseBaselineMarkerOrRangeArg(elem);
                if (!newArg) {
                    return undefined;
                }
                newArgs.push(newArg);
            }
        }
        else if (ts.isObjectLiteralExpression(arg)) {
            // !!! todo when multiple files supported in lsp
        }
        else if (strArg = parseBaselineMarkerOrRangeArg(arg)) {
            newArgs.push(strArg);
        }
        else {
            console.error(`Unrecognized argument in verify.baselineDocumentHighlights: ${arg.getText()}`);
            return undefined;
        }
    }

    if (newArgs.length === 0) {
        newArgs.push("ToAny(f.Ranges())...");
    }

    return [{
        kind: "verifyBaselineDocumentHighlights",
        args: newArgs,
        preferences: preferences ? preferences : "nil /*preferences*/",
    }];
}

function parseBaselineGoToDefinitionArgs(args: readonly ts.Expression[]): [VerifyBaselineGoToDefinitionCmd] | undefined {
    const newArgs = [];
    for (const arg of args) {
        let strArg;
        if (strArg = getStringLiteralLike(arg)) {
            newArgs.push(getGoStringLiteral(strArg.text));
        }
        else if (arg.getText() === "...test.markerNames()") {
            newArgs.push("f.MarkerNames()...");
        }
        else if (arg.getText() === "...test.ranges()") {
            return [{
                kind: "verifyBaselineGoToDefinition",
                markers: [],
                ranges: true,
            }];
        }
        else {
            console.error(`Unrecognized argument in verify.baselineGoToDefinition: ${arg.getText()}`);
            return undefined;
        }
    }

    return [{
        kind: "verifyBaselineGoToDefinition",
        markers: newArgs,
    }];
}

function parseRenameInfo(funcName: "renameInfoSucceeded" | "renameInfoFailed", args: readonly ts.Expression[]): [VerifyRenameInfoCmd] | undefined {
    let preferences = "nil /*preferences*/";
    let prefArg;
    switch (funcName) {
        case "renameInfoSucceeded":
            if (args[6]) {
                prefArg = args[6];
            }
            break;
        case "renameInfoFailed":
            if (args[1]) {
                prefArg = args[1];
            }
            break;
    }
    if (prefArg) {
        if (!ts.isObjectLiteralExpression(prefArg)) {
            console.error(`Expected object literal expression for preferences, got ${prefArg.getText()}`);
            return undefined;
        }
        const parsedPreferences = parseUserPreferences(prefArg);
        if (!parsedPreferences) {
            console.error(`Unrecognized user preferences in ${funcName}: ${prefArg.getText()}`);
            return undefined;
        }
    }
    return [{ kind: funcName, preferences }];
}

function parseBaselineRenameArgs(funcName: string, args: readonly ts.Expression[]): [VerifyBaselineRenameCmd] | undefined {
    let newArgs: string[] = [];
    let preferences: string | undefined;
    for (const arg of args) {
        let typedArg;
        if ((typedArg = getArrayLiteralExpression(arg))) {
            for (const elem of typedArg.elements) {
                const newArg = parseBaselineMarkerOrRangeArg(elem);
                if (!newArg) {
                    return undefined;
                }
                newArgs.push(newArg);
            }
        }
        else if (ts.isObjectLiteralExpression(arg)) {
            preferences = parseUserPreferences(arg);
            if (!preferences) {
                console.error(`Unrecognized user preferences in verify.baselineRename: ${arg.getText()}`);
                return undefined;
            }
            continue;
        }
        else if (typedArg = parseBaselineMarkerOrRangeArg(arg)) {
            newArgs.push(typedArg);
        }
        else {
            return undefined;
        }
    }
    return [{
        kind: funcName === "baselineRenameAtRangesWithText" ? "verifyBaselineRenameAtRangesWithText" : "verifyBaselineRename",
        args: newArgs,
        preferences: preferences ? preferences : "nil /*preferences*/",
    }];
}

function stringToTristate(s: string): string {
    switch (s) {
        case "true":
            return "core.TSTrue";
        case "false":
            return "core.TSFalse";
        default:
            return "core.TSUnknown";
    }
}

function parseUserPreferences(arg: ts.ObjectLiteralExpression): string | undefined {
    const preferences: string[] = [];
    for (const prop of arg.properties) {
        if (ts.isPropertyAssignment(prop)) {
            switch (prop.name.getText()) {
                // !!! other preferences
                case "providePrefixAndSuffixTextForRename":
                    preferences.push(`UseAliasesForRename: ${stringToTristate(prop.initializer.getText())}`);
                    break;
                case "quotePreference":
                    preferences.push(`QuotePreference: ls.QuotePreference(${prop.initializer.getText()})`);
                    break;
            }
        }
        else {
            return undefined;
        }
    }
    if (preferences.length === 0) {
        return "nil /*preferences*/";
    }
    return `&ls.UserPreferences{${preferences.join(",")}}`;
}

function parseBaselineMarkerOrRangeArg(arg: ts.Expression): string | undefined {
    if (ts.isStringLiteral(arg)) {
        return getGoStringLiteral(arg.text);
    }
    else if (ts.isIdentifier(arg) || (ts.isElementAccessExpression(arg) && ts.isIdentifier(arg.expression))) {
        const argName = ts.isIdentifier(arg) ? arg.text : (arg.expression as ts.Identifier).text;
        const file = arg.getSourceFile();
        const varStmts = file.statements.filter(ts.isVariableStatement);
        for (const varStmt of varStmts) {
            for (const decl of varStmt.declarationList.declarations) {
                if (ts.isArrayBindingPattern(decl.name) && decl.initializer?.getText().includes("ranges")) {
                    for (let i = 0; i < decl.name.elements.length; i++) {
                        const elem = decl.name.elements[i];
                        if (ts.isBindingElement(elem) && ts.isIdentifier(elem.name) && elem.name.text === argName) {
                            // `const [range_0, ..., range_n, ...] = test.ranges();` and arg is `range_n`
                            if (elem.dotDotDotToken === undefined) {
                                return `f.Ranges()[${i}]`;
                            }
                            // `const [range_0, ..., ...rest] = test.ranges();` and arg is `rest[n]`
                            if (ts.isElementAccessExpression(arg)) {
                                return `f.Ranges()[${i + parseInt(arg.argumentExpression!.getText())}]`;
                            }
                            // `const [range_0, ..., ...rest] = test.ranges();` and arg is `rest`
                            return `ToAny(f.Ranges()[${i}:])...`;
                        }
                    }
                }
            }
        }
        const init = getNodeOfKind(arg, ts.isCallExpression);
        if (init) {
            const result = getRangesByTextArg(init);
            if (result) {
                return result;
            }
        }
    }
    else if (ts.isCallExpression(arg)) {
        const result = getRangesByTextArg(arg);
        if (result) {
            return result;
        }
    }
    console.error(`Unrecognized argument in verify.baselineRename: ${arg.getText()}`);
    return undefined;
}

function getRangesByTextArg(arg: ts.CallExpression): string | undefined {
    if (arg.getText().startsWith("test.rangesByText()")) {
        if (ts.isStringLiteralLike(arg.arguments[0])) {
            return `ToAny(f.GetRangesByText().Get(${getGoStringLiteral(arg.arguments[0].text)}))...`;
        }
    }
    return undefined;
}

function parseBaselineQuickInfo(args: ts.NodeArray<ts.Expression>): VerifyBaselineQuickInfoCmd[] | undefined {
    if (args.length !== 0) {
        // !!!
        return undefined;
    }
    return [{
        kind: "verifyBaselineQuickInfo",
    }];
}

function parseQuickInfoArgs(funcName: string, args: readonly ts.Expression[]): VerifyQuickInfoCmd[] | undefined {
    // We currently don't support 'expectedTags'.
    switch (funcName) {
        case "quickInfoAt": {
            if (args.length < 1 || args.length > 3) {
                console.error(`Expected 1 or 2 arguments in quickInfoIs, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            let arg0;
            if (!(arg0 = getStringLiteralLike(args[0]))) {
                console.error(`Expected string literal for first argument in quickInfoAt, got ${args[0].getText()}`);
                return undefined;
            }
            const marker = getGoStringLiteral(arg0.text);
            let text: string | undefined;
            let arg1;
            if (args[1]) {
                if (!(arg1 = getStringLiteralLike(args[1]))) {
                    console.error(`Expected string literal for second argument in quickInfoAt, got ${args[1].getText()}`);
                    return undefined;
                }
                text = getGoStringLiteral(arg1.text);
            }
            let docs: string | undefined;
            let arg2;
            if (args[2]) {
                if (!(arg2 = getStringLiteralLike(args[2])) && args[2].getText() !== "undefined") {
                    console.error(`Expected string literal or undefined for third argument in quickInfoAt, got ${args[2].getText()}`);
                    return undefined;
                }
                if (arg2) {
                    docs = getGoStringLiteral(arg2.text);
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
            let arg0;
            if (args.length !== 1 || !(arg0 = getObjectLiteralExpression(args[0]))) {
                console.error(`Expected a single object literal argument in quickInfos, got ${args.map(arg => arg.getText()).join(", ")}`);
                return undefined;
            }
            for (const prop of arg0.properties) {
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
                let init;
                if (init = getArrayLiteralExpression(prop.initializer)) {
                    if (init.elements.length !== 2) {
                        console.error(`Expected two elements in array literal for quickInfos property, got ${init.getText()}`);
                        return undefined;
                    }
                    let textExp, docsExp;
                    if (!(textExp = getStringLiteralLike(init.elements[0])) || !(docsExp = getStringLiteralLike(init.elements[1]))) {
                        console.error(`Expected string literals in array literal for quickInfos property, got ${init.getText()}`);
                        return undefined;
                    }
                    text = getGoStringLiteral(textExp.text);
                    docs = getGoStringLiteral(docsExp.text);
                }
                else if (init = getStringLiteralLike(prop.initializer)) {
                    text = getGoStringLiteral(init.text);
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
            let arg0;
            if (!(arg0 = getStringLiteralLike(args[0]))) {
                console.error(`Expected string literal for first argument in quickInfoIs, got ${args[0].getText()}`);
                return undefined;
            }
            const text = getGoStringLiteral(arg0.text);
            let docs: string | undefined;
            if (args[1]) {
                let arg1;
                if (!(arg1 = getStringLiteralLike(args[1]))) {
                    console.error(`Expected string literal for second argument in quickInfoIs, got ${args[1].getText()}`);
                    return undefined;
                }
                docs = getGoStringLiteral(arg1.text);
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

interface VerifyBaselineRenameCmd {
    kind: "verifyBaselineRename" | "verifyBaselineRenameAtRangesWithText";
    args: string[];
    preferences: string;
}

interface VerifyBaselineDocumentHighlightsCmd {
    kind: "verifyBaselineDocumentHighlights";
    args: string[];
    preferences: string;
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

interface VerifyRenameInfoCmd {
    kind: "renameInfoSucceeded" | "renameInfoFailed";
    preferences: string;
}

type Cmd =
    | VerifyCompletionsCmd
    | VerifyBaselineFindAllReferencesCmd
    | VerifyBaselineDocumentHighlightsCmd
    | VerifyBaselineGoToDefinitionCmd
    | VerifyBaselineQuickInfoCmd
    | VerifyBaselineSignatureHelpCmd
    | GoToCmd
    | EditCmd
    | VerifyQuickInfoCmd
    | VerifyBaselineRenameCmd
    | VerifyRenameInfoCmd;

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

function generateBaselineDocumentHighlights({ args, preferences }: VerifyBaselineDocumentHighlightsCmd): string {
    return `f.VerifyBaselineDocumentHighlights(t, ${preferences}, ${args.join(", ")})`;
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

function generateBaselineRename({ kind, args, preferences }: VerifyBaselineRenameCmd): string {
    switch (kind) {
        case "verifyBaselineRename":
            return `f.VerifyBaselineRename(t, ${preferences}, ${args.join(", ")})`;
        case "verifyBaselineRenameAtRangesWithText":
            return `f.VerifyBaselineRenameAtRangesWithText(t, ${preferences}, ${args.join(", ")})`;
    }
}

function generateCmd(cmd: Cmd): string {
    switch (cmd.kind) {
        case "verifyCompletions":
            return generateVerifyCompletions(cmd);
        case "verifyBaselineFindAllReferences":
            return generateBaselineFindAllReferences(cmd);
        case "verifyBaselineDocumentHighlights":
            return generateBaselineDocumentHighlights(cmd);
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
        case "verifyBaselineRename":
        case "verifyBaselineRenameAtRangesWithText":
            return generateBaselineRename(cmd);
        case "renameInfoSucceeded":
            return `f.VerifyRenameSucceeded(t, ${cmd.preferences})`;
        case "renameInfoFailed":
            return `f.VerifyRenameFailed(t, ${cmd.preferences})`;
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
    if (commands.includes("core.")) {
        imports.unshift(`"github.com/microsoft/typescript-go/internal/core"`);
    }
    if (commands.includes("ls.")) {
        imports.push(`"github.com/microsoft/typescript-go/internal/ls"`);
    }
    if (commands.includes("lsproto.")) {
        imports.push(`"github.com/microsoft/typescript-go/internal/lsp/lsproto"`);
    }
    if (usesFourslashUtil(commands)) {
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

function usesFourslashUtil(goTxt: string): boolean {
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
        || goTxt.includes("PtrTo")
        || goTxt.includes("ToAny");
}

function getNodeOfKind<T extends ts.Node>(node: ts.Node, hasKind: (n: ts.Node) => n is T): T | undefined {
    if (hasKind(node)) {
        return node;
    }
    if (ts.isIdentifier(node)) {
        const init = getInitializer(node);
        if (init && hasKind(init)) {
            return init;
        }
    }
    return undefined;
}

function getObjectLiteralExpression(node: ts.Node): ts.ObjectLiteralExpression | undefined {
    return getNodeOfKind(node, ts.isObjectLiteralExpression);
}

function getStringLiteralLike(node: ts.Node): ts.StringLiteralLike | undefined {
    return getNodeOfKind(node, ts.isStringLiteralLike);
}

function getNumericLiteral(node: ts.Node): ts.NumericLiteral | undefined {
    return getNodeOfKind(node, ts.isNumericLiteral);
}

function getArrayLiteralExpression(node: ts.Node): ts.ArrayLiteralExpression | undefined {
    return getNodeOfKind(node, ts.isArrayLiteralExpression);
}

function getInitializer(name: ts.Identifier): ts.Expression | undefined {
    const file = name.getSourceFile();
    const varStmts = file.statements.filter(ts.isVariableStatement);
    for (const varStmt of varStmts) {
        const decls = varStmt.declarationList.declarations.filter(varDecl => {
            if (ts.isIdentifier(varDecl.name)) {
                return varDecl.name.text === name.text;
            }
            return false;
        });
        if (decls[0]) {
            return decls[0].initializer;
        }
    }
    return undefined;
}

if (url.fileURLToPath(import.meta.url) == process.argv[1]) {
    main();
}

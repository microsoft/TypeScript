#!/usr/bin/env -S node --experimental-strip-types --no-warnings

// Usage: node --experimental-strip-types --no-warnings convertFourslash.mts [inputFileList]

import { $ } from "execa";
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import * as url from "url";

const stradaFourslashPath = path.resolve(import.meta.dirname, "../", "../", "../", "_submodules", "TypeScript", "tests", "cases", "fourslash");

let inputFileSet: Set<string>;

const manualTestsPath = path.join(import.meta.dirname, "manualTests.txt");

const outputDir = path.join(import.meta.dirname, "../", "tests", "gen");

const unparsedFiles: { file: string; error: string; }[] = [];
const unparsedReportPath = path.join(import.meta.dirname, "unparsedTests.txt");

function getManualTests(): Set<string> {
    if (!fs.existsSync(manualTestsPath)) {
        return new Set();
    }
    const manualTestsList = fs.readFileSync(manualTestsPath, "utf-8").split("\n").map(line => line.trim()).filter(line => line.length > 0);
    return new Set(manualTestsList);
}

export async function main() {
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

    // Write testmain_test.go for baseline tracking
    const testMainContent = `package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil/baseline"
)

func TestMain(m *testing.M) {
	defer baseline.Track()()
	m.Run()
}
`;
    fs.writeFileSync(path.join(outputDir, "testmain_test.go"), testMainContent, "utf-8");

    parseTypeScriptFiles(getManualTests(), stradaFourslashPath);

    unparsedFiles.sort((a, b) => a.file.localeCompare(b.file, "en-US"));
    fs.writeFileSync(unparsedReportPath, unparsedFiles.map(({ file, error }) => `${file} parse error: ${JSON.stringify(error)}`).join("\n"), "utf-8");
    console.log(`Failed to parse ${unparsedFiles.length} files. See ${unparsedReportPath} for details.`);
    await $`dprint fmt ${outputDir}/**/*.go`;
}

function hasTSExtension(file: string): boolean {
    return file.endsWith(".ts") ||
        file.endsWith(".tsx");
}

function parseTypeScriptFiles(manualTests: Set<string>, folder: string): void {
    const files = fs.readdirSync(folder);

    files.forEach(file => {
        const filePath = path.join(folder, file);
        const stat = fs.statSync(filePath);
        if (inputFileSet && !inputFileSet.has(file)) {
            return;
        }

        if (stat.isDirectory()) {
            parseTypeScriptFiles(manualTests, filePath);
        }
        else if (hasTSExtension(file) && !manualTests.has(file.slice(0, -3)) && file !== "fourslash.ts") {
            const content = fs.readFileSync(filePath, "utf-8");
            const isServer = filePath.split(path.sep).includes("server");
            try {
                const test = parseFileContent(file, content);
                const testContent = generateGoTest(test, isServer);
                const testPath = path.join(outputDir, `${test.name}_test.go`);
                fs.writeFileSync(testPath, testContent, "utf-8");
            }
            catch (e) {
                const message = e instanceof Error ? e.message : String(e);
                console.error(`Error parsing file ${file}: ${message}`);
                unparsedFiles.push({ file, error: message });
            }
        }
    });
}

function parseFileContent(filename: string, content: string): GoTest {
    console.error(`Parsing file: ${filename}`);
    const sourceFile = ts.createSourceFile("temp.ts", content, ts.ScriptTarget.Latest, true /*setParentNodes*/);
    const statements = sourceFile.statements;
    const goTest: GoTest = {
        name: filename.replace(".tsx", "").replace(".ts", "").replace(".", ""),
        content: getTestInput(content),
        commands: [],
    };
    for (const statement of statements) {
        const result = parseFourslashStatement(statement);
        goTest.commands.push(...result);
    }
    if (goTest.commands.length === 0) {
        throw new Error(`No commands parsed in file: ${filename}`);
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

function getBadStatementText(statement: ts.Statement): string {
    if (ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression)) {
        return statement.expression.expression.getText() + "(...)";
    }
    return statement.getText();
}

/**
 * Parses a Strada fourslash statement and returns the corresponding Corsa commands.
 * @returns an array of commands if the statement is a valid fourslash command, or `undefined` if the statement could not be parsed.
 */
function parseFourslashStatement(statement: ts.Statement): Cmd[] {
    if (ts.isVariableStatement(statement)) {
        // variable declarations (for ranges and markers), e.g. `const range = test.ranges()[0];`
        return [];
    }
    else if (ts.isEmptyStatement(statement)) {
        // Stray semicolons, e.g. `;;`
        return [];
    }
    else if (ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression)) {
        const callExpression = statement.expression;
        if (!ts.isPropertyAccessExpression(callExpression.expression)) {
            throw new Error(`Expected property access expression, got ${callExpression.expression.getText()}`);
        }
        const namespace = callExpression.expression.expression;
        const func = callExpression.expression.name;
        if (!ts.isIdentifier(namespace)) {
            switch (func.text) {
                case "quickInfoExists":
                    return parseQuickInfoArgs("notQuickInfoExists", callExpression.arguments);
                case "andApplyCodeAction":
                    // verify.completions({ ... }).andApplyCodeAction(...)
                    if (!(ts.isCallExpression(namespace) && namespace.expression.getText() === "verify.completions")) {
                        throw new Error(`Unrecognized fourslash statement: ${getBadStatementText(statement)}`);
                    }
                    return parseVerifyCompletionsArgs(namespace.arguments, callExpression.arguments);
            }
            throw new Error(`Unrecognized fourslash statement: ${getBadStatementText(statement)}`);
        }
        // `verify.(...)`
        if (namespace.text === "verify") {
            switch (func.text) {
                case "completions":
                    // `verify.completions(...)`
                    return parseVerifyCompletionsArgs(callExpression.arguments);
                case "applyCodeActionFromCompletion":
                    // `verify.applyCodeActionFromCompletion(...)`
                    return parseVerifyApplyCodeActionFromCompletionArgs(callExpression.arguments);
                case "importFixAtPosition":
                    // `verify.importFixAtPosition(...)`
                    return parseImportFixAtPositionArgs(callExpression.arguments);
                case "importFixModuleSpecifiers":
                    // `verify.importFixModuleSpecifiers(...)`
                    return parseImportFixModuleSpecifiersArgs(callExpression.arguments);
                case "currentLineContentIs":
                case "currentFileContentIs":
                case "indentationIs":
                case "indentationAtPositionIs":
                case "textAtCaretIs":
                    return parseCurrentContentIsArgs(func.text, callExpression.arguments);
                case "quickInfoAt":
                case "quickInfoExists":
                case "quickInfoIs":
                case "quickInfos":
                    // `verify.quickInfo...(...)`
                    return parseQuickInfoArgs(func.text, callExpression.arguments);
                case "organizeImports":
                    // `verify.organizeImports(...)`
                    return parseOrganizeImportsArgs(callExpression.arguments);
                case "baselineFindAllReferences":
                    // `verify.baselineFindAllReferences(...)`
                    return parseBaselineFindAllReferencesArgs(callExpression.arguments);
                case "baselineDocumentHighlights":
                    return parseBaselineDocumentHighlightsArgs(callExpression.arguments);
                case "baselineQuickInfo":
                    return parseBaselineQuickInfo(callExpression.arguments);
                case "baselineSignatureHelp":
                    return [parseBaselineSignatureHelp(callExpression.arguments)];
                case "signatureHelp":
                    return parseSignatureHelp(callExpression.arguments);
                case "noSignatureHelp":
                    return parseNoSignatureHelp(callExpression.arguments);
                case "signatureHelpPresentForTriggerReason":
                    return parseSignatureHelpPresentForTriggerReason(callExpression.arguments);
                case "noSignatureHelpForTriggerReason":
                    return parseNoSignatureHelpForTriggerReason(callExpression.arguments);
                case "baselineSmartSelection":
                    return [parseBaselineSmartSelection(callExpression.arguments)];
                case "baselineCallHierarchy":
                    return [parseBaselineCallHierarchy(callExpression.arguments)];
                case "baselineGoToDefinition":
                case "baselineGetDefinitionAtPosition":
                case "baselineGoToType":
                case "baselineGoToImplementation":
                    // Both `baselineGoToDefinition` and `baselineGetDefinitionAtPosition` take the same
                    // arguments, but differ in that...
                    //  - `verify.baselineGoToDefinition(...)` called getDefinitionAndBoundSpan
                    //  - `verify.baselineGetDefinitionAtPosition(...)` called getDefinitionAtPosition
                    // LSP doesn't have two separate commands though.
                    return parseBaselineGoToDefinitionArgs(func.text, callExpression.arguments);
                case "baselineRename":
                case "baselineRenameAtRangesWithText":
                    // `verify.baselineRename...(...)`
                    return parseBaselineRenameArgs(func.text, callExpression.arguments);
                case "baselineInlayHints":
                    return parseBaselineInlayHints(callExpression.arguments);
                case "baselineLinkedEditing":
                    return [{ kind: "verifyBaselineLinkedEditing" }];
                case "linkedEditing":
                    return parseVerifyLinkedEditing(callExpression.arguments);
                case "renameInfoSucceeded":
                case "renameInfoFailed":
                    return parseRenameInfo(func.text, callExpression.arguments);
                case "getSemanticDiagnostics":
                case "getSuggestionDiagnostics":
                case "getSyntacticDiagnostics":
                    return parseVerifyDiagnostics(func.text, callExpression.arguments);
                case "baselineSyntacticDiagnostics":
                case "baselineSyntacticAndSemanticDiagnostics":
                    return [{ kind: "verifyBaselineDiagnostics" }];
                case "navigateTo":
                    return parseVerifyNavigateTo(callExpression.arguments);
                case "outliningSpansInCurrentFile":
                case "outliningHintSpansInCurrentFile":
                    return parseOutliningSpansArgs(callExpression.arguments);
                case "navigationTree":
                    return parseVerifyNavTree(callExpression.arguments);
                case "navigationBar":
                    return []; // Deprecated.
                case "numberOfErrorsInCurrentFile":
                    return parseNumberOfErrorsInCurrentFile(callExpression.arguments);
                case "noErrors":
                    return [{ kind: "verifyNoErrors" }];
                case "errorExistsAtRange":
                    return parseErrorExistsAtRange(callExpression.arguments);
                case "currentLineContentIs":
                    return parseCurrentLineContentIs(callExpression.arguments);
                case "currentFileContentIs":
                    return parseCurrentFileContentIs(callExpression.arguments);
                case "errorExistsBetweenMarkers":
                    return parseErrorExistsBetweenMarkers(callExpression.arguments);
                case "errorExistsAfterMarker":
                    return parseErrorExistsAfterMarker(callExpression.arguments);
                case "errorExistsBeforeMarker":
                    return parseErrorExistsBeforeMarker(callExpression.arguments);
            }
        }
        // `goTo....`
        if (namespace.text === "goTo") {
            return parseGoToArgs(callExpression.arguments, func.text);
        }
        // `edit....`
        if (namespace.text === "edit") {
            const result = parseEditStatement(func.text, callExpression.arguments);
            return [result];
        }
        if (namespace.text === "format") {
            return parseFormatStatement(func.text, callExpression.arguments);
        }
        // !!! other fourslash commands
    }
    throw new Error(`Unrecognized fourslash statement: ${getBadStatementText(statement)}`);
}

function parseEditStatement(funcName: string, args: readonly ts.Expression[]): EditCmd {
    switch (funcName) {
        case "insert":
        case "paste":
        case "insertLine": {
            let arg0;
            if (args.length !== 1 || !(arg0 = getStringLiteralLike(args[0]))) {
                throw new Error(`Expected a single string literal argument in edit.${funcName}, got ${args.map(arg => arg.getText()).join(", ")}`);
            }
            return {
                kind: "edit",
                goStatement: `f.${funcName.charAt(0).toUpperCase() + funcName.slice(1)}(t, ${getGoStringLiteral(arg0.text)})`,
            };
        }
        case "replaceLine": {
            let arg0, arg1;
            if (args.length !== 2 || !(arg0 = getNumericLiteral(args[0])) || !(arg1 = getStringLiteralLike(args[1]))) {
                throw new Error(`Expected a single string literal argument in edit.insert, got ${args.map(arg => arg.getText()).join(", ")}`);
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
                    throw new Error(`Expected numeric literal argument in edit.backspace, got ${arg.getText()}`);
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
        case "deleteAtCaret": {
            const arg = args[0];
            if (arg) {
                let arg0;
                if (arg0 = getNumericLiteral(arg)) {
                    return {
                        kind: "edit",
                        goStatement: `f.DeleteAtCaret(t, ${arg0.text})`,
                    };
                }
                // Handle 'string'.length expressions
                const lengthValue = getStringLengthExpression(arg);
                if (lengthValue !== undefined) {
                    return {
                        kind: "edit",
                        goStatement: `f.DeleteAtCaret(t, ${lengthValue})`,
                    };
                }
                throw new Error(`Expected numeric literal argument in edit.deleteAtCaret, got ${arg.getText()}`);
            }
            return {
                kind: "edit",
                goStatement: `f.DeleteAtCaret(t, 1)`,
            };
        }
        default:
            throw new Error(`Unrecognized edit function: ${funcName}`);
    }
}

function parseFormatStatement(funcName: string, args: readonly ts.Expression[]): FormatCmd[] {
    switch (funcName) {
        case "document": {
            return [{
                kind: "format",
                goStatement: `f.FormatDocument(t, "")`,
            }];
        }
        case "setOption":
            var optName = getStringLiteralLike(args[0])!.text;
            if (optName == "newline") {
                optName = "NewLineCharacter";
            }
            var optValue = args[1].getText();
            if (
                (args[1].kind == ts.SyntaxKind.TrueKeyword || args[1].kind == ts.SyntaxKind.FalseKeyword) &&
                !(optName == "trimTrailingWhitespace" || optName == "convertTabsToSpaces")
            ) {
                optValue = stringToTristate(args[1].getText());
            }
            const varName = "opts" + args[1].pos;
            return [{
                kind: "format",
                goStatement: `${varName} := f.GetOptions()`,
            }, {
                kind: "format",
                goStatement: `${varName}.FormatCodeSettings.${optName.charAt(0).toUpperCase() + optName.slice(1)} = ${optValue}`,
            }, {
                kind: "format",
                goStatement: `f.Configure(t, ${varName})`,
            }];
        case "selection": {
            const startMarker = getStringLiteralLike(args[0])?.text;
            const endMarker = getStringLiteralLike(args[1])?.text;
            if (startMarker === undefined || endMarker === undefined) {
                throw new Error(`format.selection: expected two string literal marker names`);
            }
            return [{
                kind: "format",
                goStatement: `f.FormatSelection(t, ${JSON.stringify(startMarker)}, ${JSON.stringify(endMarker)})`,
            }];
        }
        case "onType":
        case "copyFormatOptions":
        case "setFormatOptions":
        default:
            throw new Error(`Unrecognized format function: ${funcName}`);
    }
}

function parseCurrentContentIsArgs(funcName: string, args: readonly ts.Expression[]): VerifyContentCmd[] {
    switch (funcName) {
        case "currentFileContentIs":
            return [{
                kind: "verifyContent",
                goStatement: `f.VerifyCurrentFileContent(t, ${getGoStringLiteralFromNode(args[0])!})`,
            }];
        case "currentLineContentIs":
            return [{
                kind: "verifyContent",
                goStatement: `f.VerifyCurrentLineContent(t, ${getGoStringLiteralFromNode(args[0])!})`,
            }];
        case "indentationIs":
            // return [{
            //     kind: "verifyContent",
            //     goStatement: `f.VerifyIndentation(t, ${getNumericLiteral(args[0])?.text})`,
            // }];
        case "indentationAtPositionIs":
        case "textAtCaretIs":
            // return [{
            //     kind: "verifyContent",
            //     goStatement: `f.VerifyTextAtCaret(t, ${getGoStringLiteral(args[0].getText())})`,
            // }];
        default:
            throw new Error(`Unrecognized verify content function: ${funcName}`);
    }
}

function getGoMultiLineStringLiteral(text: string): string {
    if (!text.includes("`") && !text.includes("\\")) {
        return "`" + text + "`";
    }
    return getGoStringLiteral(text);
}

function getGoStringLiteral(text: string): string {
    return `${JSON.stringify(text)}`;
}

function getGoStringLiteralFromNode(node: ts.Node): string {
    const stringLiteralLike = getStringLiteralLike(node);
    if (stringLiteralLike) {
        return getGoMultiLineStringLiteral(stringLiteralLike.text);
    }
    switch (node.kind) {
        case ts.SyntaxKind.BinaryExpression: {
            const binaryExpr = node as ts.BinaryExpression;
            const left = getGoStringLiteralFromNode(binaryExpr.left);
            const right = getGoStringLiteralFromNode(binaryExpr.right);
            const op = binaryExpr.operatorToken.getText();
            return left + op + right;
        }
        default:
            throw new Error(`Unhandled case ${node.kind} in getGoStringLiteralFromNode: ${node.getText()}`);
    }
}

function parseGoToArgs(args: readonly ts.Expression[], funcName: string): GoToCmd[] {
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
                throw new Error(`Unrecognized argument in goTo.marker: ${arg.getText()}`);
            }
            return [{
                kind: "goTo",
                funcName: "marker",
                args: [getGoStringLiteral(strArg.text)],
            }];
        }
        case "file": {
            if (args.length !== 1) {
                throw new Error(`Expected a single argument in goTo.file, got ${args.map(arg => arg.getText()).join(", ")}`);
            }
            let arg0;
            if (arg0 = getStringLiteralLike(args[0])) {
                const text = arg0.text.replace("tests/cases/fourslash/server/", "").replace("tests/cases/fourslash/", "");
                return [{
                    kind: "goTo",
                    funcName: "file",
                    args: [getGoStringLiteral(text)],
                }];
            }
            else if (arg0 = getNumericLiteral(args[0])) {
                return [{
                    kind: "goTo",
                    funcName: "fileNumber",
                    args: [arg0.text],
                }];
            }
            throw new Error(`Expected string or number literal argument in goTo.file, got ${args[0].getText()}`);
        }
        case "position": {
            let arg0;
            if (args.length !== 1 || !(arg0 = getNumericLiteral(args[0]))) {
                throw new Error(`Expected a single numeric literal argument in goTo.position, got ${args.map(arg => arg.getText()).join(", ")}`);
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
                throw new Error(`Expected two string literal arguments in goTo.select, got ${args.map(arg => arg.getText()).join(", ")}`);
            }
            return [{
                kind: "goTo",
                funcName: "select",
                args: [getGoStringLiteral(arg0.text), getGoStringLiteral(arg1.text)],
            }];
        }
        default:
            throw new Error(`Unrecognized goTo function: ${funcName}`);
    }
}

function parseVerifyCompletionsArgs(args: readonly ts.Expression[], codeActionArgs?: readonly ts.Expression[]): VerifyCompletionsCmd[] {
    const cmds = [];
    const codeAction = codeActionArgs?.[0] && parseAndApplyCodeActionArg(codeActionArgs[0]);
    for (const arg of args) {
        const result = parseVerifyCompletionArg(arg, codeAction);
        if (codeActionArgs?.length) {
            result.andApplyCodeActionArgs = parseAndApplyCodeActionArg(codeActionArgs[0]);
        }
        cmds.push(result);
    }
    return cmds;
}

function parseVerifyApplyCodeActionFromCompletionArgs(args: readonly ts.Expression[]): VerifyApplyCodeActionFromCompletionCmd[] {
    const cmds: VerifyApplyCodeActionFromCompletionCmd[] = [];
    if (args.length !== 2) {
        throw new Error(`Expected two arguments in verify.applyCodeActionFromCompletion, got ${args.map(arg => arg.getText()).join(", ")}`);
    }
    if (!ts.isStringLiteralLike(args[0]) && args[0].getText() !== "undefined") {
        throw new Error(`Expected string literal or "undefined" in verify.applyCodeActionFromCompletion, got ${args[0].getText()}`);
    }
    const markerName = getStringLiteralLike(args[0])?.text;
    const marker = markerName === undefined ? "nil" : `new(${getGoStringLiteral(markerName)})`;
    const options = parseVerifyApplyCodeActionArgs(args[1]);

    cmds.push({ kind: "verifyApplyCodeActionFromCompletion", marker, options });
    return cmds;
}

function parseVerifyApplyCodeActionArgs(arg: ts.Expression): string {
    const obj = getObjectLiteralExpression(arg);
    if (!obj) {
        throw new Error(`Expected object literal for verify.applyCodeActionFromCompletion options, got ${arg.getText()}`);
    }
    let nameInit, sourceInit, descInit, dataInit;
    const props: string[] = [];
    for (const prop of obj.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
            if (ts.isShorthandPropertyAssignment(prop) && prop.name.text === "preferences") {
                continue; // !!! parse once preferences are supported in fourslash
            }
            throw new Error(`Expected property assignment with identifier name in verify.applyCodeActionFromCompletion options, got ${prop.getText()}`);
        }
        const propName = prop.name.text;
        const init = prop.initializer;
        switch (propName) {
            case "name":
                nameInit = getStringLiteralLike(init);
                if (!nameInit) {
                    throw new Error(`Expected string literal for name in verify.applyCodeActionFromCompletion options, got ${init.getText()}`);
                }
                props.push(`Name: ${getGoStringLiteral(nameInit.text)},`);
                break;
            case "source":
                sourceInit = getStringLiteralLike(init);
                if (!sourceInit) {
                    throw new Error(`Expected string literal for source in verify.applyCodeActionFromCompletion options, got ${init.getText()}`);
                }
                props.push(`Source: ${getGoStringLiteral(sourceInit.text)},`);
                break;
            case "data":
                dataInit = getObjectLiteralExpression(init);
                if (!dataInit) {
                    throw new Error(`Expected object literal for data in verify.applyCodeActionFromCompletion options, got ${init.getText()}`);
                }
                const dataProps: string[] = [];
                for (const dataProp of dataInit.properties) {
                    if (!ts.isPropertyAssignment(dataProp) || !ts.isIdentifier(dataProp.name)) {
                        throw new Error(`Expected property assignment with identifier name in verify.applyCodeActionFromCompletion data, got ${dataProp.getText()}`);
                    }
                    const dataPropName = dataProp.name.text;
                    switch (dataPropName) {
                        case "moduleSpecifier":
                            const moduleSpecifierInit = getStringLiteralLike(dataProp.initializer);
                            if (!moduleSpecifierInit) {
                                throw new Error(`Expected string literal for moduleSpecifier in verify.applyCodeActionFromCompletion data, got ${dataProp.initializer.getText()}`);
                            }
                            dataProps.push(`ModuleSpecifier: ${getGoStringLiteral(moduleSpecifierInit.text)},`);
                            break;
                    }
                }
                props.push(`AutoImportFix: &lsproto.AutoImportFix{\n${dataProps.join("\n")}\n},`);
                break;
            case "description":
                descInit = getStringLiteralLike(init);
                if (!descInit) {
                    throw new Error(`Expected string literal for description in verify.applyCodeActionFromCompletion options, got ${init.getText()}`);
                }
                props.push(`Description: ${getGoStringLiteral(descInit.text)},`);
                break;
            case "newFileContent":
                const newFileContentInit = getStringLiteralLike(init);
                if (!newFileContentInit) {
                    throw new Error(`Expected string literal for newFileContent in verify.applyCodeActionFromCompletion options, got ${init.getText()}`);
                }
                props.push(`NewFileContent: new(${getGoMultiLineStringLiteral(newFileContentInit.text)}),`);
                break;
            case "newRangeContent":
                const newRangeContentInit = getStringLiteralLike(init);
                if (!newRangeContentInit) {
                    throw new Error(`Expected string literal for newRangeContent in verify.applyCodeActionFromCompletion options, got ${init.getText()}`);
                }
                props.push(`NewRangeContent: new(${getGoMultiLineStringLiteral(newRangeContentInit.text)}),`);
                break;
            case "preferences":
                // Few if any tests use non-default preferences
                break;
            default:
                throw new Error(`Unrecognized property in verify.applyCodeActionFromCompletion options: ${prop.getText()}`);
        }
    }
    if (!nameInit) {
        throw new Error(`Expected name property in verify.applyCodeActionFromCompletion options`);
    }
    if (!sourceInit && !dataInit) {
        throw new Error(`Expected source property in verify.applyCodeActionFromCompletion options`);
    }
    if (!descInit) {
        throw new Error(`Expected description property in verify.applyCodeActionFromCompletion options`);
    }
    return `&fourslash.ApplyCodeActionFromCompletionOptions{\n${props.join("\n")}\n}`;
}

function parseImportFixAtPositionArgs(args: readonly ts.Expression[]): VerifyImportFixAtPositionCmd[] {
    if (args.length < 1 || args.length > 3) {
        throw new Error(`Expected 1-3 arguments in verify.importFixAtPosition, got ${args.map(arg => arg.getText()).join(", ")}`);
    }
    const arrayArg = getArrayLiteralExpression(args[0]);
    if (!arrayArg) {
        throw new Error(`Expected array literal for first argument in verify.importFixAtPosition, got ${args[0].getText()}`);
    }
    const expectedTexts: string[] = [];
    for (const elem of arrayArg.elements) {
        const strElem = getStringLiteralLike(elem);
        if (!strElem) {
            throw new Error(`Expected string literal in verify.importFixAtPosition array, got ${elem.getText()}`);
        }
        expectedTexts.push(getGoMultiLineStringLiteral(strElem.text));
    }

    // If the array is empty, we should still generate valid Go code
    if (expectedTexts.length === 0) {
        expectedTexts.push(""); // This will be handled specially in code generation
    }

    let preferences: string | undefined;
    if (args.length > 2 && ts.isObjectLiteralExpression(args[2])) {
        preferences = parseUserPreferences(args[2]);
    }
    return [{
        kind: "verifyImportFixAtPosition",
        expectedTexts,
        preferences: preferences || "nil /*preferences*/",
    }];
}

function parseImportFixModuleSpecifiersArgs(args: readonly ts.Expression[]): [VerifyImportFixModuleSpecifiersCmd] {
    if (args.length < 2 || args.length > 3) {
        throw new Error(`Expected 2-3 arguments in verify.importFixModuleSpecifiers, got ${args.length}`);
    }

    const markerArg = getStringLiteralLike(args[0]);
    if (!markerArg) {
        throw new Error(`Expected string literal for marker in verify.importFixModuleSpecifiers, got ${args[0].getText()}`);
    }
    const markerName = getGoStringLiteral(markerArg.text);

    const arrayArg = getArrayLiteralExpression(args[1]);
    if (!arrayArg) {
        throw new Error(`Expected array literal for module specifiers in verify.importFixModuleSpecifiers, got ${args[1].getText()}`);
    }

    const moduleSpecifiers: string[] = [];
    for (const elem of arrayArg.elements) {
        const strElem = getStringLiteralLike(elem);
        if (!strElem) {
            throw new Error(`Expected string literal in module specifiers array, got ${elem.getText()}`);
        }
        moduleSpecifiers.push(getGoStringLiteral(strElem.text));
    }

    let preferences = "nil /*preferences*/";
    if (args.length > 2 && ts.isObjectLiteralExpression(args[2])) {
        const parsedPrefs = parseUserPreferences(args[2]);
        preferences = parsedPrefs;
    }

    return [{
        kind: "verifyImportFixModuleSpecifiers",
        markerName,
        moduleSpecifiers,
        preferences,
    }];
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

function parseVerifyCompletionArg(arg: ts.Expression, codeActionArgs?: VerifyApplyCodeActionArgs): VerifyCompletionsCmd {
    let marker: string | undefined;
    let goArgs: VerifyCompletionsArgs | undefined;
    const defaultGoArgs: VerifyCompletionsArgs = { preferences: "nil /*preferences*/" };
    const obj = getObjectLiteralExpression(arg);
    if (!obj) {
        throw new Error(`Expected object literal expression in verify.completions, got ${arg.getText()}`);
    }
    let isNewIdentifierLocation: true | undefined;
    for (const prop of obj.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
            if (ts.isShorthandPropertyAssignment(prop) && prop.name.text === "preferences") {
                continue; // !!! parse once preferences are supported in fourslash
            }
            throw new Error(`Expected property assignment with identifier name, got ${prop.getText()}`);
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
                            throw new Error(`Expected string literal in marker array, got ${elem.getText()}`); // !!! parse marker arrays?
                        }
                        marker += `${getGoStringLiteral(elem.text)}, `;
                    }
                    marker += "}";
                }
                else if (markerInit = getObjectLiteralExpression(init)) {
                    // !!! parse marker objects?
                    throw new Error(`Unrecognized marker initializer: ${markerInit.getText()}`);
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
                    throw new Error(`Unrecognized marker initializer: ${init.getText()}`);
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
                        throw new Error(`Expected array literal expression for completion.globalsPlus items, got ${maybeItems.getText()}`);
                    }
                    expected = `${funcName}(\n[]fourslash.CompletionsExpectedItem{`;
                    for (const elem of items.elements) {
                        const result = parseExpectedCompletionItem(elem, codeActionArgs);
                        expected += "\n" + result + ",";
                    }
                    expected += "\n}";
                    if (maybeOpts) {
                        let opts;
                        if (!(opts = getObjectLiteralExpression(maybeOpts))) {
                            throw new Error(`Expected object literal expression for completion.globalsPlus options, got ${maybeOpts.getText()}`);
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
                                throw new Error(`Expected boolean literal for noLib, got ${noLib.initializer.getText()}`);
                            }
                        }
                        else {
                            throw new Error(`Expected noLib property in completion.globalsPlus options, got ${maybeOpts.getText()}`);
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
                            expected += "\n" + result + ",";
                        }
                    }
                    else {
                        const result = parseExpectedCompletionItem(init);
                        expected += "\n" + result + ",";
                    }
                    expected += "\n}";
                }
                if (propName === "includes") {
                    (goArgs ??= defaultGoArgs).includes = expected;
                }
                else if (propName === "exact") {
                    (goArgs ??= defaultGoArgs).exact = expected;
                }
                else {
                    (goArgs ??= defaultGoArgs).unsorted = expected;
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
                            throw new Error(`Expected string literal in excludes array, got ${elem.getText()}`);
                        }
                        excludes += `\n${getGoStringLiteral(elem.text)},`;
                    }
                }
                excludes += "\n}";
                (goArgs ??= defaultGoArgs).excludes = excludes;
                break;
            }
            case "isNewIdentifierLocation":
                if (init.kind === ts.SyntaxKind.TrueKeyword) {
                    isNewIdentifierLocation = true;
                }
                break;
            case "preferences": {
                if (!ts.isObjectLiteralExpression(init)) {
                    throw new Error(`Expected object literal for user preferences, got ${init.getText()}`);
                }
                const preferences = parseUserPreferences(init);
                (goArgs ??= defaultGoArgs).preferences = preferences;
                break;
            }
            case "triggerCharacter":
                break; // !!! parse once they're supported in fourslash
            case "defaultCommitCharacters":
            case "optionalReplacementSpan": // the only two tests that use this will require manual conversion
            case "isGlobalCompletion":
                break; // Ignored, unused
            default:
                throw new Error(`Unrecognized expected completion item: ${init.parent.getText()}`);
        }
    }
    return {
        kind: "verifyCompletions",
        marker: marker ? marker : "nil",
        args: goArgs,
        isNewIdentifierLocation: isNewIdentifierLocation,
    };
}

function parseExpectedCompletionItem(expr: ts.Expression, codeActionArgs?: VerifyApplyCodeActionArgs): string {
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
        let sourceInit: ts.StringLiteralLike | undefined;
        let extensions: string[] = []; // !!!
        let itemProps: string[] = [];
        let name: string | undefined;
        let insertText: string | undefined;
        let filterText: string | undefined;
        let replacementSpanIdx: string | undefined;
        for (const prop of strExpr.properties) {
            if (!(ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop)) || !ts.isIdentifier(prop.name)) {
                throw new Error(`Expected property assignment with identifier name for completion item, got ${prop.getText()}`);
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
                        throw new Error(`Expected string literal for completion item name, got ${init.getText()}`);
                    }
                    break;
                }
                case "sortText":
                    const result = parseSortText(init);
                    itemProps.push(`SortText: new(string(${result})),`);
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
                        throw new Error(`Expected string literal for insertText, got ${init.getText()}`);
                    }
                    break;
                }
                case "filterText": {
                    let filterTextInit;
                    if (filterTextInit = getStringLiteralLike(init)) {
                        filterText = filterTextInit.text;
                    }
                    else {
                        throw new Error(`Expected string literal for filterText, got ${init.getText()}`);
                    }
                    break;
                }
                case "isRecommended":
                    if (init.kind === ts.SyntaxKind.TrueKeyword) {
                        itemProps.push(`Preselect: new(true),`);
                    }
                    break;
                case "kind":
                    const kind = parseKind(init);
                    itemProps.push(`Kind: new(${kind}),`);
                    break;
                case "kindModifiers":
                    const modifiers = parseKindModifiers(init);
                    ({ isDeprecated, isOptional, extensions } = modifiers);
                    break;
                case "text": {
                    let textInit;
                    if (textInit = getStringLiteralLike(init)) {
                        itemProps.push(`Detail: new(${getGoStringLiteral(textInit.text)}),`);
                    }
                    else {
                        throw new Error(`Expected string literal for text, got ${init.getText()}`);
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
                        throw new Error(`Expected string literal for documentation, got ${init.getText()}`);
                    }
                    break;
                }
                case "isFromUncheckedFile":
                    break; // Ignored
                case "hasAction":
                    itemProps.push("AdditionalTextEdits: fourslash.AnyTextEdits,");
                    break;
                case "source":
                case "sourceDisplay":
                    if (sourceInit !== undefined) {
                        break;
                    }
                    if (sourceInit = getStringLiteralLike(init)) {
                        if (propName === "source" && sourceInit.text.endsWith("/")) {
                            // source: "ClassMemberSnippet/"
                            itemProps.push(`Data: &lsproto.CompletionItemData{
                                Source: ${getGoStringLiteral(sourceInit.text)},
                            },`);
                            break;
                        }
                        itemProps.push(`Data: &lsproto.CompletionItemData{
                            AutoImport: &lsproto.AutoImportFix{
                                ModuleSpecifier: ${getGoStringLiteral(sourceInit.text)},
                            },
                        },`);
                    }
                    else if (init.getText().startsWith("completion.CompletionSource.")) {
                        const source = init.getText().slice("completion.CompletionSource.".length);
                        switch (source) {
                            // Ignore switch snippet sources
                            case "SwitchCases": {
                                continue;
                            }
                            default:
                                throw new Error(`Unrecognized source in expected completion item: ${init.getText()}`);
                        }
                    }
                    else {
                        throw new Error(`Expected string literal for source/sourceDisplay, got ${init.getText()}`);
                    }
                    break;
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
                case "isSnippet":
                    if (init.kind === ts.SyntaxKind.TrueKeyword) {
                        itemProps.push(`InsertTextFormat: new(lsproto.InsertTextFormatSnippet),`);
                    }
                    break;
                default:
                    throw new Error(`Unrecognized property in expected completion item: ${propName}`); // Unsupported property
            }
        }
        if (!name) {
            throw new Error(`Expected name property in expected completion item`);
        }
        if (codeActionArgs && codeActionArgs.name === name && codeActionArgs.source === sourceInit?.text) {
            itemProps.push(`LabelDetails: &lsproto.CompletionItemLabelDetails{
                Description: new(${getGoStringLiteral(codeActionArgs.source)}),
            },`);
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
        if (filterText) itemProps.unshift(`FilterText: new(${getGoStringLiteral(filterText)}),`);
        if (insertText) itemProps.unshift(`InsertText: new(${getGoStringLiteral(insertText)}),`);
        itemProps.unshift(`Label: ${getGoStringLiteral(name!)},`);
        return `&lsproto.CompletionItem{\n${itemProps.join("\n")}}`;
    }
    throw new Error(`Expected string literal or object literal for expected completion item, got ${expr.getText()}`); // Unsupported expression type
}

function parseAndApplyCodeActionArg(arg: ts.Expression): VerifyApplyCodeActionArgs {
    const obj = getObjectLiteralExpression(arg);
    if (!obj) {
        throw new Error(`Expected object literal for code action argument, got ${arg.getText()}`);
    }
    const nameProperty = obj.properties.find(prop =>
        ts.isPropertyAssignment(prop) &&
        ts.isIdentifier(prop.name) &&
        prop.name.text === "name" &&
        ts.isStringLiteralLike(prop.initializer)
    ) as ts.PropertyAssignment;
    if (!nameProperty) {
        throw new Error(`Expected name property in code action argument, got ${obj.getText()}`);
    }
    const sourceProperty = obj.properties.find(prop =>
        ts.isPropertyAssignment(prop) &&
        ts.isIdentifier(prop.name) &&
        prop.name.text === "source" &&
        ts.isStringLiteralLike(prop.initializer)
    ) as ts.PropertyAssignment;
    if (!sourceProperty) {
        throw new Error(`Expected source property in code action argument, got ${obj.getText()}`);
    }
    const descriptionProperty = obj.properties.find(prop =>
        ts.isPropertyAssignment(prop) &&
        ts.isIdentifier(prop.name) &&
        prop.name.text === "description" &&
        ts.isStringLiteralLike(prop.initializer)
    ) as ts.PropertyAssignment;
    if (!descriptionProperty) {
        throw new Error(`Expected description property in code action argument, got ${obj.getText()}`);
    }
    const newFileContentProperty = obj.properties.find(prop =>
        ts.isPropertyAssignment(prop) &&
        ts.isIdentifier(prop.name) &&
        prop.name.text === "newFileContent" &&
        ts.isStringLiteralLike(prop.initializer)
    ) as ts.PropertyAssignment;
    if (!newFileContentProperty) {
        throw new Error(`Expected newFileContent property in code action argument, got ${obj.getText()}`);
    }
    return {
        name: (nameProperty.initializer as ts.StringLiteralLike).text,
        source: (sourceProperty.initializer as ts.StringLiteralLike).text,
        description: (descriptionProperty.initializer as ts.StringLiteralLike).text,
        newFileContent: (newFileContentProperty.initializer as ts.StringLiteralLike).text,
    };
}

function parseBaselineFindAllReferencesArgs(args: readonly ts.Expression[]): [VerifyBaselineFindAllReferencesCmd] {
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
            throw new Error(`Unrecognized argument in verify.baselineFindAllReferences: ${arg.getText()}`);
        }
    }

    return [{
        kind: "verifyBaselineFindAllReferences",
        markers: newArgs,
    }];
}

function parseBaselineDocumentHighlightsArgs(args: readonly ts.Expression[]): [VerifyBaselineDocumentHighlightsCmd] {
    const newArgs: string[] = [];
    let preferences: string | undefined;
    for (const arg of args) {
        let strArg;
        if (strArg = getArrayLiteralExpression(arg)) {
            for (const elem of strArg.elements) {
                const newArg = parseBaselineMarkerOrRangeArg(elem);
                newArgs.push(newArg);
            }
        }
        else if (ts.isObjectLiteralExpression(arg)) {
            // !!! todo when multiple files supported in lsp
        }
        else {
            newArgs.push(parseBaselineMarkerOrRangeArg(arg));
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

function parseBaselineGoToDefinitionArgs(
    funcName: "baselineGoToDefinition" | "baselineGoToType" | "baselineGetDefinitionAtPosition" | "baselineGoToImplementation",
    args: readonly ts.Expression[],
): [VerifyBaselineGoToDefinitionCmd] {
    let boundSpan: true | undefined;
    if (funcName === "baselineGoToDefinition") {
        boundSpan = true;
    }
    let kind: "verifyBaselineGoToDefinition" | "verifyBaselineGoToType" | "verifyBaselineGoToImplementation";
    switch (funcName) {
        case "baselineGoToDefinition":
        case "baselineGetDefinitionAtPosition":
            kind = "verifyBaselineGoToDefinition";
            break;
        case "baselineGoToType":
            kind = "verifyBaselineGoToType";
            break;
        case "baselineGoToImplementation":
            kind = "verifyBaselineGoToImplementation";
            break;
    }
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
                kind,
                markers: [],
                ranges: true,
                boundSpan,
            }];
        }
        else {
            throw new Error(`Unrecognized argument in verify.${funcName}: ${arg.getText()}`);
        }
    }

    return [{
        kind,
        markers: newArgs,
        boundSpan,
    }];
}

function parseRenameInfo(funcName: "renameInfoSucceeded" | "renameInfoFailed", args: readonly ts.Expression[]): [VerifyRenameInfoCmd] {
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
            throw new Error(`Expected object literal expression for preferences, got ${prefArg.getText()}`);
        }
        const parsedPreferences = parseUserPreferences(prefArg);
        preferences = parsedPreferences;
    }
    return [{ kind: funcName, preferences }];
}

function parseBaselineRenameArgs(funcName: string, args: readonly ts.Expression[]): [VerifyBaselineRenameCmd] {
    let newArgs: string[] = [];
    let preferences: string | undefined;
    for (const arg of args) {
        let typedArg;
        if ((typedArg = getArrayLiteralExpression(arg))) {
            for (const elem of typedArg.elements) {
                const newArg = parseBaselineMarkerOrRangeArg(elem);
                newArgs.push(newArg);
            }
        }
        else if (ts.isObjectLiteralExpression(arg)) {
            preferences = parseUserPreferences(arg);
            continue;
        }
        else {
            newArgs.push(parseBaselineMarkerOrRangeArg(arg));
        }
    }
    return [{
        kind: funcName === "baselineRenameAtRangesWithText" ? "verifyBaselineRenameAtRangesWithText" : "verifyBaselineRename",
        args: newArgs,
        preferences: preferences ? preferences : "nil /*preferences*/",
    }];
}

function parseBaselineInlayHints(args: readonly ts.Expression[]): [VerifyBaselineInlayHintsCmd] {
    let preferences: string | undefined;
    // Parse span
    if (args.length > 0) {
        if (args[0].getText() !== "undefined") {
            throw new Error(`Unsupported span argument in verify.baselineInlayHints: ${args[0].getText()}`);
        }
    }
    // Parse preferences
    if (args.length > 1) {
        if (ts.isObjectLiteralExpression(args[1])) {
            preferences = parseUserPreferences(args[1]);
        }
    }
    return [{
        kind: "verifyBaselineInlayHints",
        span: "nil /*span*/", // Only supporteed manually
        preferences: preferences ? preferences : "nil /*preferences*/",
    }];
}

function parseVerifyLinkedEditing(args: readonly ts.Expression[]): [VerifyLinkedEditingCmd] {
    var ranges = "map[string][]lsproto.Range" + args[0].getText().replaceAll("undefined", "nil");
    return [{
        kind: "verifyLinkedEditing",
        ranges,
    }];
}

function parseVerifyDiagnostics(funcName: string, args: readonly ts.Expression[]): [VerifyDiagnosticsCmd] {
    if (!args[0] || !ts.isArrayLiteralExpression(args[0])) {
        throw new Error(`Expected an array literal argument in verify.${funcName}`);
    }
    const goArgs: string[] = [];
    for (const expr of args[0].elements) {
        const diag = parseExpectedDiagnostic(expr);
        goArgs.push(diag);
    }
    return [{
        kind: "verifyDiagnostics",
        arg: goArgs.length > 0 ? `[]*lsproto.Diagnostic{\n${goArgs.join(",\n")},\n}` : "nil",
        isSuggestion: funcName === "getSuggestionDiagnostics",
    }];
}

function parseExpectedDiagnostic(expr: ts.Expression): string {
    if (!ts.isObjectLiteralExpression(expr)) {
        throw new Error(`Expected object literal expression for expected diagnostic, got ${expr.getText()}`);
    }

    const diagnosticProps: string[] = [];

    for (const prop of expr.properties) {
        if (!ts.isPropertyAssignment(prop) || !(ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name))) {
            throw new Error(`Expected property assignment with identifier name for expected diagnostic, got ${prop.getText()}`);
        }

        const propName = prop.name.text;
        const init = prop.initializer;

        switch (propName) {
            case "message": {
                let messageInit;
                if (messageInit = getStringLiteralLike(init)) {
                    messageInit.text = messageInit.text.replace("/tests/cases/fourslash", "");
                    diagnosticProps.push(`Message: ${getGoStringLiteral(messageInit.text)},`);
                }
                else {
                    throw new Error(`Expected string literal for diagnostic message, got ${init.getText()}`);
                }
                break;
            }
            case "code": {
                let codeInit;
                if (codeInit = getNumericLiteral(init)) {
                    diagnosticProps.push(`Code: &lsproto.IntegerOrString{Integer: new(int32(${codeInit.text}))},`);
                }
                else {
                    throw new Error(`Expected numeric literal for diagnostic code, got ${init.getText()}`);
                }
                break;
            }
            case "range": {
                // Handle range references like ranges[0]
                const rangeArg = parseBaselineMarkerOrRangeArg(init);
                diagnosticProps.push(`Range: ${rangeArg}.LSRange,`);
                break;
            }
            case "reportsDeprecated": {
                if (init.kind === ts.SyntaxKind.TrueKeyword) {
                    diagnosticProps.push(`Tags: &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},`);
                }
                break;
            }
            case "reportsUnnecessary": {
                if (init.kind === ts.SyntaxKind.TrueKeyword) {
                    diagnosticProps.push(`Tags: &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagUnnecessary},`);
                }
                break;
            }
            default:
                throw new Error(`Unrecognized property in expected diagnostic: ${propName}`);
        }
    }

    if (diagnosticProps.length === 0) {
        throw new Error(`No valid properties found in diagnostic object`);
    }

    return `&lsproto.Diagnostic{\n${diagnosticProps.join("\n")}\n}`;
}

function parseNumberOfErrorsInCurrentFile(args: readonly ts.Expression[]): [VerifyNumberOfErrorsInCurrentFileCmd] {
    let arg0;
    if (args.length !== 1 || !(arg0 = getNumericLiteral(args[0]))) {
        throw new Error(`Expected a single numeric literal argument in verify.numberOfErrorsInCurrentFile, got ${args.map(arg => arg.getText()).join(", ")}`);
    }
    return [{
        kind: "verifyNumberOfErrorsInCurrentFile",
        expectedCount: parseInt(arg0.text, 10),
    }];
}

function parseErrorExistsAtRange(args: readonly ts.Expression[]): [VerifyErrorExistsAtRangeCmd] {
    if (args.length < 2 || args.length > 3) {
        throw new Error(`Expected 2 or 3 arguments in verify.errorExistsAtRange, got ${args.length}`);
    }

    // First arg is a range
    const rangeArg = parseBaselineMarkerOrRangeArg(args[0]);

    // Second arg is error code
    let codeArg;
    if (!(codeArg = getNumericLiteral(args[1]))) {
        throw new Error(`Expected numeric literal for code in verify.errorExistsAtRange, got ${args[1].getText()}`);
    }

    // Third arg is optional message
    let message = "";
    if (args[2]) {
        const messageArg = getStringLiteralLike(args[2]);
        if (!messageArg) {
            throw new Error(`Expected string literal for message in verify.errorExistsAtRange, got ${args[2].getText()}`);
        }
        message = messageArg.text;
    }

    return [{
        kind: "verifyErrorExistsAtRange",
        range: rangeArg,
        code: parseInt(codeArg.text, 10),
        message: message,
    }];
}

function parseCurrentLineContentIs(args: readonly ts.Expression[]): [VerifyCurrentLineContentIsCmd] {
    let arg0;
    if (args.length !== 1 || !(arg0 = getStringLiteralLike(args[0]))) {
        throw new Error(`Expected a single string literal argument in verify.currentLineContentIs, got ${args.map(arg => arg.getText()).join(", ")}`);
    }
    return [{
        kind: "verifyCurrentLineContentIs",
        text: arg0.text,
    }];
}

function parseCurrentFileContentIs(args: readonly ts.Expression[]): [VerifyCurrentFileContentIsCmd] {
    let arg0;
    if (args.length !== 1 || !(arg0 = getStringLiteralLike(args[0]))) {
        throw new Error(`Expected a single string literal argument in verify.currentFileContentIs, got ${args.map(arg => arg.getText()).join(", ")}`);
    }
    return [{
        kind: "verifyCurrentFileContentIs",
        text: arg0.text,
    }];
}

function parseErrorExistsBetweenMarkers(args: readonly ts.Expression[]): [VerifyErrorExistsBetweenMarkersCmd] {
    if (args.length !== 2) {
        throw new Error(`Expected 2 arguments in verify.errorExistsBetweenMarkers, got ${args.length}`);
    }
    let startMarker, endMarker;
    if (!(startMarker = getStringLiteralLike(args[0])) || !(endMarker = getStringLiteralLike(args[1]))) {
        throw new Error(`Expected string literal arguments in verify.errorExistsBetweenMarkers, got ${args.map(arg => arg.getText()).join(", ")}`);
    }
    return [{
        kind: "verifyErrorExistsBetweenMarkers",
        startMarker: startMarker.text,
        endMarker: endMarker.text,
    }];
}

function parseErrorExistsAfterMarker(args: readonly ts.Expression[]): [VerifyErrorExistsAfterMarkerCmd] {
    let markerName = "";
    if (args.length > 0) {
        const arg0 = getStringLiteralLike(args[0]);
        if (!arg0) {
            throw new Error(`Expected string literal argument in verify.errorExistsAfterMarker, got ${args[0].getText()}`);
        }
        markerName = arg0.text;
    }
    return [{
        kind: "verifyErrorExistsAfterMarker",
        markerName: markerName,
    }];
}

function parseErrorExistsBeforeMarker(args: readonly ts.Expression[]): [VerifyErrorExistsBeforeMarkerCmd] {
    let markerName = "";
    if (args.length > 0) {
        const arg0 = getStringLiteralLike(args[0]);
        if (!arg0) {
            throw new Error(`Expected string literal argument in verify.errorExistsBeforeMarker, got ${args[0].getText()}`);
        }
        markerName = arg0.text;
    }
    return [{
        kind: "verifyErrorExistsBeforeMarker",
        markerName: markerName,
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

function parseUserPreferences(arg: ts.ObjectLiteralExpression): string {
    const inlayHintPreferences: string[] = [];
    const preferences: string[] = [];
    for (const prop of arg.properties) {
        if (ts.isPropertyAssignment(prop)) {
            switch (prop.name.getText()) {
                // !!! other preferences
                case "providePrefixAndSuffixTextForRename":
                    preferences.push(`UseAliasesForRename: ${stringToTristate(prop.initializer.getText())}`);
                    break;
                case "quotePreference":
                    if (!ts.isStringLiteralLike(prop.initializer)) {
                        throw new Error(`Expected string literal for quotePreference, got ${prop.initializer.getText()}`);
                    }
                    preferences.push(`QuotePreference: lsutil.QuotePreference(${getGoStringLiteral(prop.initializer.text)})`);
                    break;
                case "autoImportSpecifierExcludeRegexes":
                    const regexArrayArg = getArrayLiteralExpression(prop.initializer);
                    if (!regexArrayArg) {
                        throw new Error(`Expected array literal for autoImportSpecifierExcludeRegexes, got ${prop.initializer.getText()}`);
                    }
                    const regexes: string[] = [];
                    for (const elem of regexArrayArg.elements) {
                        const strElem = getStringLiteralLike(elem);
                        if (!strElem) {
                            throw new Error(`Expected string literal in autoImportSpecifierExcludeRegexes array, got ${elem.getText()}`);
                        }
                        regexes.push(getGoStringLiteral(strElem.text));
                    }
                    preferences.push(`AutoImportSpecifierExcludeRegexes: []string{${regexes.join(", ")}}`);
                    break;
                case "importModuleSpecifierPreference":
                    if (!ts.isStringLiteralLike(prop.initializer)) {
                        throw new Error(`Expected string literal for importModuleSpecifierPreference, got ${prop.initializer.getText()}`);
                    }
                    preferences.push(`ImportModuleSpecifierPreference: ${prop.initializer.getText()}`);
                    break;
                case "importModuleSpecifierEnding":
                    if (!ts.isStringLiteralLike(prop.initializer)) {
                        throw new Error(`Expected string literal for importModuleSpecifierEnding, got ${prop.initializer.getText()}`);
                    }
                    preferences.push(`ImportModuleSpecifierEnding: ${prop.initializer.getText()}`);
                    break;
                case "includePackageJsonAutoImports":
                    if (!ts.isStringLiteralLike(prop.initializer)) {
                        throw new Error(`Expected string literal for includePackageJsonAutoImports, got ${prop.initializer.getText()}`);
                    }
                    preferences.push(`IncludePackageJsonAutoImports: ${prop.initializer.getText()}`);
                    break;
                case "allowRenameOfImportPath":
                    preferences.push(`AllowRenameOfImportPath: ${prop.initializer.getText()}`);
                    break;
                case "preferTypeOnlyAutoImports":
                    preferences.push(`PreferTypeOnlyAutoImports: ${prop.initializer.getText()}`);
                    break;
                case "organizeImportsTypeOrder":
                    if (!ts.isStringLiteralLike(prop.initializer)) {
                        return undefined;
                    }
                    switch (prop.initializer.text) {
                        case "last":
                            preferences.push(`OrganizeImportsTypeOrder: lsutil.OrganizeImportsTypeOrderLast`);
                            break;
                        case "inline":
                            preferences.push(`OrganizeImportsTypeOrder: lsutil.OrganizeImportsTypeOrderInline`);
                            break;
                        case "first":
                            preferences.push(`OrganizeImportsTypeOrder: lsutil.OrganizeImportsTypeOrderFirst`);
                            break;
                        default:
                            return undefined;
                    }
                    break;
                case "autoImportFileExcludePatterns":
                    const arrayArg = getArrayLiteralExpression(prop.initializer);
                    if (!arrayArg) {
                        throw new Error(`Expected array literal for autoImportFileExcludePatterns, got ${prop.initializer.getText()}`);
                    }
                    const patterns: string[] = [];
                    for (const elem of arrayArg.elements) {
                        const strElem = getStringLiteralLike(elem);
                        if (!strElem) {
                            throw new Error(`Expected string literal in autoImportFileExcludePatterns array, got ${elem.getText()}`);
                        }
                        patterns.push(getGoStringLiteral(strElem.text));
                    }
                    preferences.push(`AutoImportFileExcludePatterns: []string{${patterns.join(", ")}}`);
                    break;
                case "includeInlayParameterNameHints":
                    let paramHint;
                    if (!ts.isStringLiteralLike(prop.initializer)) {
                        throw new Error(`Expected string literal for includeInlayParameterNameHints, got ${prop.initializer.getText()}`);
                    }
                    switch (prop.initializer.text) {
                        case "none":
                            paramHint = "lsutil.IncludeInlayParameterNameHintsNone";
                            break;
                        case "literals":
                            paramHint = "lsutil.IncludeInlayParameterNameHintsLiterals";
                            break;
                        case "all":
                            paramHint = "lsutil.IncludeInlayParameterNameHintsAll";
                            break;
                    }
                    inlayHintPreferences.push(`IncludeInlayParameterNameHints: ${paramHint}`);
                    break;
                case "includeInlayParameterNameHintsWhenArgumentMatchesName":
                    inlayHintPreferences.push(`IncludeInlayParameterNameHintsWhenArgumentMatchesName: ${prop.initializer.getText()}`);
                    break;
                case "includeInlayFunctionParameterTypeHints":
                    inlayHintPreferences.push(`IncludeInlayFunctionParameterTypeHints: ${prop.initializer.getText()}`);
                    break;
                case "includeInlayVariableTypeHints":
                    inlayHintPreferences.push(`IncludeInlayVariableTypeHints: ${prop.initializer.getText()}`);
                    break;
                case "includeInlayVariableTypeHintsWhenTypeMatchesName":
                    inlayHintPreferences.push(`IncludeInlayVariableTypeHintsWhenTypeMatchesName: ${prop.initializer.getText()}`);
                    break;
                case "includeInlayPropertyDeclarationTypeHints":
                    inlayHintPreferences.push(`IncludeInlayPropertyDeclarationTypeHints: ${prop.initializer.getText()}`);
                    break;
                case "includeInlayFunctionLikeReturnTypeHints":
                    inlayHintPreferences.push(`IncludeInlayFunctionLikeReturnTypeHints: ${prop.initializer.getText()}`);
                    break;
                case "includeInlayEnumMemberValueHints":
                    inlayHintPreferences.push(`IncludeInlayEnumMemberValueHints: ${prop.initializer.getText()}`);
                    break;
                case "interactiveInlayHints":
                    // Ignore, deprecated
                    break;
            }
        }
        else {
            throw new Error(`Expected property assignment in user preferences object, got ${prop.getText()}`);
        }
    }

    if (inlayHintPreferences.length > 0) {
        preferences.push(`InlayHints: lsutil.InlayHintsPreferences{${inlayHintPreferences.join(",")}}`);
    }
    if (preferences.length === 0) {
        return "nil /*preferences*/";
    }
    return `&lsutil.UserPreferences{${preferences.join(",")}}`;
}

function parseBaselineMarkerOrRangeArg(arg: ts.Expression): string {
    if (ts.isStringLiteral(arg)) {
        return getGoStringLiteral(arg.text);
    }
    else if (ts.isIdentifier(arg) || (ts.isElementAccessExpression(arg) && ts.isIdentifier(arg.expression))) {
        const result = parseRangeVariable(arg);
        if (result) {
            return result;
        }
        const init = getNodeOfKind(arg, ts.isCallExpression);
        if (init) {
            const result = getRangesByTextArg(init);
            if (result) {
                return result;
            }
        }
    }
    else if (ts.isElementAccessExpression(arg) && ts.isCallExpression(arg.expression) && arg.expression.getText().includes("ranges")) {
        // `test.ranges()[n]`
        const index = arg.argumentExpression?.getText();
        if (index !== undefined) {
            return `f.Ranges()[${index}]`;
        }
    }
    else if (ts.isCallExpression(arg)) {
        const result = getRangesByTextArg(arg);
        if (result) {
            return result;
        }
        // Handle `.filter(r => !(r.marker && r.marker.data.KEY))` patterns
        const filterResult = parseFilterExpression(arg);
        if (filterResult) {
            return filterResult;
        }
    }
    if (arg.getText() === "test.markers()") {
        return "ToAny(f.Markers())...";
    }
    throw new Error(`Unrecognized marker or range argument: ${arg.getText()}`);
}

function parseRangeVariable(arg: ts.Identifier | ts.ElementAccessExpression): string | undefined {
    const argName = ts.isIdentifier(arg) ? arg.text : (arg.expression as ts.Identifier).text;
    const file = arg.getSourceFile();
    const varStmts = file.statements.filter(ts.isVariableStatement);
    for (const varStmt of varStmts) {
        for (const decl of varStmt.declarationList.declarations) {
            if (ts.isArrayBindingPattern(decl.name) && decl.initializer) {
                // Resolve the initializer to a Go expression for the source array
                const sourceExpr = resolveRangesExpression(decl.initializer, varStmts);
                if (!sourceExpr) continue;
                for (let i = 0; i < decl.name.elements.length; i++) {
                    const elem = decl.name.elements[i];
                    if (ts.isBindingElement(elem) && ts.isIdentifier(elem.name) && elem.name.text === argName) {
                        if (elem.dotDotDotToken === undefined) {
                            return `${sourceExpr}[${i}]`;
                        }
                        if (ts.isElementAccessExpression(arg)) {
                            return `${sourceExpr}[${i + parseInt(arg.argumentExpression!.getText())}]`;
                        }
                        return `ToAny(${sourceExpr}[${i}:])...`;
                    }
                }
            }
            // `const ranges = test.ranges();` and arg is `ranges[n]`
            if (ts.isIdentifier(decl.name) && decl.name.text === argName && decl.initializer?.getText().includes("ranges")) {
                if (ts.isElementAccessExpression(arg)) {
                    return `f.Ranges()[${arg.argumentExpression!.getText()}]`;
                }
            }
            // `const cRanges = ranges.get("C")` or `const cRanges = test.rangesByText().get("C")`
            if (ts.isIdentifier(decl.name) && decl.name.text === argName && decl.initializer && ts.isCallExpression(decl.initializer)) {
                const initText = decl.initializer.getText();
                if (initText.includes("rangesByText") || (ts.isPropertyAccessExpression(decl.initializer.expression) && decl.initializer.expression.name.text === "get")) {
                    // Try to find the .get("text") argument
                    const getCall = decl.initializer;
                    if (getCall.arguments.length === 1 && ts.isStringLiteralLike(getCall.arguments[0])) {
                        return `ToAny(f.GetRangesByText().Get(${getGoStringLiteral(getCall.arguments[0].text)}))...`;
                    }
                }
            }
        }
    }
    return undefined;
}

/**
 * Resolves a range initializer expression to a Go expression.
 * Handles `test.ranges()`, `test.rangesByText().get("X")`, and variable references to those.
 */
function resolveRangesExpression(expr: ts.Expression, varStmts: ts.VariableStatement[]): string | undefined {
    const text = expr.getText();
    if (text.includes("test.ranges()")) {
        return "f.Ranges()";
    }
    if (text.includes("rangesByText()") && ts.isCallExpression(expr) && expr.arguments.length === 1 && ts.isStringLiteralLike(expr.arguments[0])) {
        return `f.GetRangesByText().Get(${getGoStringLiteral(expr.arguments[0].text)})`;
    }
    // Handle `someVar.get("text")` where someVar resolves to rangesByText()
    if (ts.isCallExpression(expr) && ts.isPropertyAccessExpression(expr.expression) && expr.expression.name.text === "get" && expr.arguments.length === 1 && ts.isStringLiteralLike(expr.arguments[0])) {
        const obj = expr.expression.expression;
        if (ts.isIdentifier(obj)) {
            const resolved = resolveIdentifier(obj, varStmts);
            if (resolved?.includes("rangesByText")) {
                return `f.GetRangesByText().Get(${getGoStringLiteral(expr.arguments[0].text)})`;
            }
        }
    }
    // It might be a variable reference like `const [d0, d1] = dRanges;`
    if (ts.isIdentifier(expr)) {
        for (const varStmt of varStmts) {
            for (const decl of varStmt.declarationList.declarations) {
                if (ts.isIdentifier(decl.name) && decl.name.text === expr.text && decl.initializer) {
                    return resolveRangesExpression(decl.initializer, varStmts);
                }
            }
        }
    }
    return undefined;
}

function resolveIdentifier(id: ts.Identifier, varStmts: ts.VariableStatement[]): string | undefined {
    for (const varStmt of varStmts) {
        for (const decl of varStmt.declarationList.declarations) {
            if (ts.isIdentifier(decl.name) && decl.name.text === id.text && decl.initializer) {
                return decl.initializer.getText();
            }
        }
    }
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

/**
 * Handles `.filter(r => !(r.marker && r.marker.data.KEY))` patterns on range arrays.
 * Converts to `ToAny(core.Filter(source, func(r *fourslash.RangeMarker) bool { ... }))...`
 */
function parseFilterExpression(arg: ts.CallExpression): string | undefined {
    if (!ts.isPropertyAccessExpression(arg.expression) || arg.expression.name.text !== "filter") {
        return undefined;
    }
    if (arg.arguments.length !== 1) {
        return undefined;
    }
    const filterArg = arg.arguments[0];
    if (!ts.isArrowFunction(filterArg)) {
        return undefined;
    }

    // Resolve the source (the thing being filtered)
    const sourceExpr = arg.expression.expression;
    let sourceGo: string | undefined;

    if (ts.isIdentifier(sourceExpr)) {
        const file = sourceExpr.getSourceFile();
        const varStmts = file.statements.filter(ts.isVariableStatement);
        sourceGo = resolveRangesExpression(sourceExpr, varStmts);
    }
    else if (ts.isCallExpression(sourceExpr)) {
        // e.g. test.ranges().filter(...)
        if (sourceExpr.getText().includes("test.ranges()")) {
            sourceGo = "f.Ranges()";
        }
    }

    if (!sourceGo) {
        return undefined;
    }

    // Parse the filter body to generate a Go predicate
    const predicate = parseFilterPredicate(filterArg);
    if (!predicate) {
        return undefined;
    }

    return `ToAny(core.Filter(${sourceGo}, ${predicate}))...`;
}

function parseFilterPredicate(arrow: ts.ArrowFunction): string | undefined {
    // Handle `r => !(r.marker && r.marker.data.KEY)` → filter OUT ranges with marker.data.KEY
    const body = arrow.body;
    if (!ts.isExpression(body)) {
        return undefined;
    }

    const paramName = arrow.parameters[0]?.name.getText();
    if (!paramName) {
        return undefined;
    }

    // Check for `!(r.marker && r.marker.data.KEY)` pattern
    if (ts.isPrefixUnaryExpression(body) && body.operator === ts.SyntaxKind.ExclamationToken) {
        const inner = ts.isParenthesizedExpression(body.operand) ? body.operand.expression : body.operand;
        if (ts.isBinaryExpression(inner) && inner.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
            // Right side should be `r.marker.data.KEY`
            const right = inner.right;
            if (ts.isPropertyAccessExpression(right) && right.expression.getText() === `${paramName}.marker.data`) {
                const key = right.name.text;
                return `func(r *fourslash.RangeMarker) bool { return r.Marker == nil || r.Marker.Data[${getGoStringLiteral(key)}] == nil }`;
            }
        }
    }

    return undefined;
}

function parseBaselineQuickInfo(args: ts.NodeArray<ts.Expression>): VerifyBaselineQuickInfoCmd[] {
    if (args.length !== 0) {
        // !!!
        throw new Error(`verify.baselineQuickInfo arguments not supported`);
    }
    return [{
        kind: "verifyBaselineQuickInfo",
    }];
}

function parseQuickInfoArgs(funcName: string, args: readonly ts.Expression[]): VerifyQuickInfoCmd[] {
    // We currently don't support 'expectedTags'.
    switch (funcName) {
        case "quickInfoAt": {
            if (args.length < 1 || args.length > 3) {
                throw new Error(`Expected 1 or 2 arguments in quickInfoIs, got ${args.map(arg => arg.getText()).join(", ")}`);
            }
            let arg0;
            if (!(arg0 = getStringLiteralLike(args[0]))) {
                throw new Error(`Expected string literal for first argument in quickInfoAt, got ${args[0].getText()}`);
            }
            const marker = getGoStringLiteral(arg0.text);
            let text: string | undefined;
            let arg1;
            if (args[1]) {
                if (!(arg1 = getStringLiteralLike(args[1]))) {
                    throw new Error(`Expected string literal for second argument in quickInfoAt, got ${args[1].getText()}`);
                }
                text = getGoStringLiteral(arg1.text);
            }
            let docs: string | undefined;
            let arg2;
            if (args[2]) {
                if (!(arg2 = getStringLiteralLike(args[2])) && args[2].getText() !== "undefined") {
                    throw new Error(`Expected string literal or undefined for third argument in quickInfoAt, got ${args[2].getText()}`);
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
                throw new Error(`Expected a single object literal argument in quickInfos, got ${args.map(arg => arg.getText()).join(", ")}`);
            }
            for (const prop of arg0.properties) {
                if (!ts.isPropertyAssignment(prop)) {
                    throw new Error(`Expected property assignment in quickInfos, got ${prop.getText()}`);
                }
                if (!(ts.isIdentifier(prop.name) || ts.isStringLiteralLike(prop.name) || ts.isNumericLiteral(prop.name))) {
                    throw new Error(`Expected identifier or literal for property name in quickInfos, got ${prop.name.getText()}`);
                }
                const marker = getGoStringLiteral(prop.name.text);
                let text: string;
                let docs: string | undefined;
                let init;
                if (init = getArrayLiteralExpression(prop.initializer)) {
                    if (init.elements.length !== 2) {
                        throw new Error(`Expected two elements in array literal for quickInfos property, got ${init.getText()}`);
                    }
                    let textExp, docsExp;
                    if (!(textExp = getStringLiteralLike(init.elements[0])) || !(docsExp = getStringLiteralLike(init.elements[1]))) {
                        throw new Error(`Expected string literals in array literal for quickInfos property, got ${init.getText()}`);
                    }
                    text = getGoStringLiteral(textExp.text);
                    docs = getGoStringLiteral(docsExp.text);
                }
                else if (init = getStringLiteralLike(prop.initializer)) {
                    text = getGoStringLiteral(init.text);
                }
                else {
                    throw new Error(`Expected string literal or array literal for quickInfos property, got ${prop.initializer.getText()}`);
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
                throw new Error(`Expected 1 or 2 arguments in quickInfoIs, got ${args.map(arg => arg.getText()).join(", ")}`);
            }
            let arg0;
            if (!(arg0 = getStringLiteralLike(args[0]))) {
                throw new Error(`Expected string literal for first argument in quickInfoIs, got ${args[0].getText()}`);
            }
            const text = getGoStringLiteral(arg0.text);
            let docs: string | undefined;
            if (args[1]) {
                let arg1;
                if (!(arg1 = getStringLiteralLike(args[1]))) {
                    throw new Error(`Expected string literal for second argument in quickInfoIs, got ${args[1].getText()}`);
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
    throw new Error(`Unrecognized quick info function: ${funcName}`);
}

function parseOrganizeImportsArgs(args: readonly ts.Expression[]): [VerifyOrganizeImportsCmd] {
    if (args.length < 1 || args.length > 3) {
        throw new Error(`Expected 1-3 arguments in verify.organizeImports, got ${args.length}`);
    }

    const expectedContent = getStringLiteralLike(args[0]);
    if (!expectedContent) {
        throw new Error(`Expected string literal as first argument in verify.organizeImports, got ${args[0].getText()}`);
    }

    let mode = "lsproto.CodeActionKindSourceOrganizeImports";
    if (args.length >= 2 && args[1].getText() !== "undefined") {
        const modeExpr = args[1];
        if (
            ts.isPropertyAccessExpression(modeExpr) &&
            modeExpr.expression.getText() === "ts.OrganizeImportsMode"
        ) {
            const modeName = modeExpr.name.text;
            switch (modeName) {
                case "RemoveUnused":
                    mode = "lsproto.CodeActionKindSourceRemoveUnusedImports";
                    break;
                case "SortAndCombine":
                    mode = "lsproto.CodeActionKindSourceSortImports";
                    break;
                case "All":
                    mode = "lsproto.CodeActionKindSourceOrganizeImports";
                    break;
                default:
                    throw new Error(`Unsupported organize imports mode: ${modeName}`);
            }
        }
        else {
            throw new Error(`Unsupported organize imports mode: ${modeExpr.getText()}`);
        }
    }

    let preferences = "nil";
    if (args.length >= 3 && args[2].getText() !== "undefined") {
        const prefsObj = getObjectLiteralExpression(args[2]);
        if (!prefsObj) {
            throw new Error(`Expected object literal for preferences in verify.organizeImports, got ${args[2].getText()}`);
        }

        const prefsFields: string[] = [];
        for (const prop of prefsObj.properties) {
            if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
                continue;
            }
            const propName = prop.name.text;
            const propValue = prop.initializer;

            const goFieldName = propName.charAt(0).toUpperCase() + propName.slice(1);

            if (propName === "organizeImportsIgnoreCase") {
                if (ts.isStringLiteral(propValue) && propValue.text === "auto") {
                    prefsFields.push(`${goFieldName}: core.TSUnknown`);
                }
                else if (propValue.kind === ts.SyntaxKind.TrueKeyword) {
                    prefsFields.push(`${goFieldName}: core.TSTrue`);
                }
                else if (propValue.kind === ts.SyntaxKind.FalseKeyword) {
                    prefsFields.push(`${goFieldName}: core.TSFalse`);
                }
                else {
                    throw new Error(`Unsupported value for organizeImportsIgnoreCase: ${propValue.getText()}`);
                }
            }
            else if (propName === "organizeImportsCollation") {
                if (ts.isStringLiteral(propValue)) {
                    if (propValue.text === "unicode") {
                        prefsFields.push(`${goFieldName}: lsutil.OrganizeImportsCollationUnicode`);
                    }
                    else if (propValue.text === "ordinal") {
                        prefsFields.push(`${goFieldName}: lsutil.OrganizeImportsCollationOrdinal`);
                    }
                    else {
                        throw new Error(`Unsupported value for organizeImportsCollation: ${propValue.text}`);
                    }
                }
                else {
                    throw new Error(`Expected string literal for organizeImportsCollation, got ${propValue.getText()}`);
                }
            }
            else if (propName === "organizeImportsCaseFirst") {
                if (ts.isStringLiteral(propValue)) {
                    if (propValue.text === "upper") {
                        prefsFields.push(`${goFieldName}: lsutil.OrganizeImportsCaseFirstUpper`);
                    }
                    else if (propValue.text === "lower") {
                        prefsFields.push(`${goFieldName}: lsutil.OrganizeImportsCaseFirstLower`);
                    }
                    else {
                        throw new Error(`Unsupported value for organizeImportsCaseFirst: ${propValue.text}`);
                    }
                }
                else if (propValue.kind === ts.SyntaxKind.FalseKeyword) {
                    prefsFields.push(`${goFieldName}: lsutil.OrganizeImportsCaseFirstFalse`);
                }
                else {
                    throw new Error(`Expected string literal or false for organizeImportsCaseFirst, got ${propValue.getText()}`);
                }
            }
            else if (propName === "organizeImportsTypeOrder") {
                if (ts.isStringLiteral(propValue)) {
                    const typeOrderValue = propValue.text;
                    switch (typeOrderValue) {
                        case "last":
                            prefsFields.push(`${goFieldName}: lsutil.OrganizeImportsTypeOrderLast`);
                            break;
                        case "inline":
                            prefsFields.push(`${goFieldName}: lsutil.OrganizeImportsTypeOrderInline`);
                            break;
                        case "first":
                            prefsFields.push(`${goFieldName}: lsutil.OrganizeImportsTypeOrderFirst`);
                            break;
                        default:
                            throw new Error(`Unsupported value for organizeImportsTypeOrder: ${typeOrderValue}`);
                    }
                }
                else {
                    throw new Error(`Expected string literal for organizeImportsTypeOrder, got ${propValue.getText()}`);
                }
            }
            // Special handling for boolean fields (not Tristate)
            else if (propName === "organizeImportsNumericCollation" || propName === "organizeImportsAccentCollation") {
                if (propValue.kind === ts.SyntaxKind.TrueKeyword) {
                    prefsFields.push(`${goFieldName}: true`);
                }
                else if (propValue.kind === ts.SyntaxKind.FalseKeyword) {
                    prefsFields.push(`${goFieldName}: false`);
                }
                else {
                    throw new Error(`Expected boolean for ${propName}, got ${propValue.getText()}`);
                }
            }
            // organizeImportsLocale is a plain string, not a pointer
            else if (propName === "organizeImportsLocale") {
                if (ts.isStringLiteral(propValue)) {
                    prefsFields.push(`${goFieldName}: ${getGoStringLiteral(propValue.text)}`);
                }
                else {
                    throw new Error(`Expected string literal for organizeImportsLocale, got ${propValue.getText()}`);
                }
            }
            // Default handling for other string properties
            else if (ts.isStringLiteral(propValue)) {
                prefsFields.push(`${goFieldName}: new(${getGoStringLiteral(propValue.text)})`);
            }
            else if (propValue.kind === ts.SyntaxKind.TrueKeyword) {
                prefsFields.push(`${goFieldName}: core.TSTrue`);
            }
            else if (propValue.kind === ts.SyntaxKind.FalseKeyword) {
                prefsFields.push(`${goFieldName}: core.TSFalse`);
            }
            else {
                prefsFields.push(`${goFieldName}: ${propValue.getText()}`);
            }
        }

        if (prefsFields.length > 0) {
            preferences = `&lsutil.UserPreferences{\n${prefsFields.join(",\n")},\n}`;
        }
    }

    return [{
        kind: "verifyOrganizeImports",
        expectedContent: expectedContent.text,
        mode,
        preferences,
    }];
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

function parseSignatureHelpOptions(obj: ts.ObjectLiteralExpression): VerifySignatureHelpOptions {
    const options: VerifySignatureHelpOptions = {};

    for (const prop of obj.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
            console.error(`Unexpected property in signatureHelp options: ${prop.getText()}`);
            continue;
        }
        const name = prop.name.text;
        const value = prop.initializer;

        switch (name) {
            case "marker": {
                if (ts.isStringLiteral(value)) {
                    options.marker = value.text;
                }
                else if (ts.isArrayLiteralExpression(value)) {
                    const markers: string[] = [];
                    for (const elem of value.elements) {
                        if (ts.isStringLiteral(elem)) {
                            markers.push(elem.text);
                        }
                        else {
                            throw new Error(`Expected string literal in marker array, got ${elem.getText()}`);
                        }
                    }
                    options.marker = markers;
                }
                else {
                    throw new Error(`Expected string or array for marker, got ${value.getText()}`);
                }
                break;
            }
            case "text": {
                const str = getStringLiteralLike(value);
                if (!str) {
                    throw new Error(`Expected string for text, got ${value.getText()}`);
                }
                options.text = str.text;
                break;
            }
            case "docComment": {
                const str = getStringLiteralLike(value);
                if (!str) {
                    throw new Error(`Expected string for docComment, got ${value.getText()}`);
                }
                options.docComment = str.text;
                break;
            }
            case "parameterCount": {
                const num = getNumericLiteral(value);
                if (!num) {
                    throw new Error(`Expected number for parameterCount, got ${value.getText()}`);
                }
                options.parameterCount = parseInt(num.text, 10);
                break;
            }
            case "parameterName": {
                const str = getStringLiteralLike(value);
                if (!str) {
                    throw new Error(`Expected string for parameterName, got ${value.getText()}`);
                }
                options.parameterName = str.text;
                break;
            }
            case "parameterSpan": {
                const str = getStringLiteralLike(value);
                if (!str) {
                    throw new Error(`Expected string for parameterSpan, got ${value.getText()}`);
                }
                options.parameterSpan = str.text;
                break;
            }
            case "parameterDocComment": {
                const str = getStringLiteralLike(value);
                if (!str) {
                    throw new Error(`Expected string for parameterDocComment, got ${value.getText()}`);
                }
                options.parameterDocComment = str.text;
                break;
            }
            case "overloadsCount": {
                const num = getNumericLiteral(value);
                if (!num) {
                    throw new Error(`Expected number for overloadsCount, got ${value.getText()}`);
                }
                options.overloadsCount = parseInt(num.text, 10);
                break;
            }
            case "overrideSelectedItemIndex": {
                const num = getNumericLiteral(value);
                if (!num) {
                    throw new Error(`Expected number for overrideSelectedItemIndex, got ${value.getText()}`);
                }
                options.overrideSelectedItemIndex = parseInt(num.text, 10);
                break;
            }
            case "triggerReason": {
                // triggerReason is an object like { kind: "invoked" } or { kind: "characterTyped", triggerCharacter: "(" }
                // For now, just pass it through as a string representation
                options.triggerReason = value.getText();
                break;
            }
            case "argumentCount":
                // ignore
                break;
            case "isVariadic": {
                if (value.kind === ts.SyntaxKind.TrueKeyword) {
                    options.isVariadic = true;
                }
                else if (value.kind === ts.SyntaxKind.FalseKeyword) {
                    options.isVariadic = false;
                }
                else {
                    throw new Error(`Expected boolean for isVariadic, got ${value.getText()}`);
                }
                break;
            }
            case "tags":
                // ignore
                break;
            default:
                throw new Error(`Unknown signatureHelp option: ${name}`);
        }
    }
    return options;
}

function parseSignatureHelp(args: ts.NodeArray<ts.Expression>): Cmd[] {
    const allOptions: VerifySignatureHelpOptions[] = [];

    for (const arg of args) {
        if (ts.isObjectLiteralExpression(arg)) {
            const opts = parseSignatureHelpOptions(arg);
            allOptions.push(opts);
        }
        else if (ts.isIdentifier(arg)) {
            // Could be a variable reference like `help2` - skip for now
            throw new Error(`signatureHelp with variable reference not supported: ${arg.getText()}`);
        }
        else {
            throw new Error(`Unexpected argument type in signatureHelp: ${arg.getText()}`);
        }
    }

    if (allOptions.length === 0) {
        throw new Error("signatureHelp requires at least one options object");
    }

    return [{
        kind: "verifySignatureHelp",
        options: allOptions,
    }];
}

function parseNoSignatureHelp(args: ts.NodeArray<ts.Expression>): Cmd[] {
    const markers: string[] = [];

    for (const arg of args) {
        if (ts.isStringLiteral(arg)) {
            markers.push(arg.text);
        }
        else if (ts.isSpreadElement(arg)) {
            // Handle ...test.markerNames()
            const expr = arg.expression;
            if (
                ts.isCallExpression(expr) &&
                ts.isPropertyAccessExpression(expr.expression) &&
                ts.isIdentifier(expr.expression.expression) &&
                expr.expression.expression.text === "test" &&
                ts.isIdentifier(expr.expression.name) &&
                expr.expression.name.text === "markerNames"
            ) {
                // This means "all markers" - we'll handle this specially in the generator
                return [{
                    kind: "verifyNoSignatureHelp",
                    markers: ["...test.markerNames()"],
                }];
            }
            throw new Error(`Unsupported spread in noSignatureHelp: ${arg.getText()}`);
        }
        else {
            throw new Error(`Unexpected argument in noSignatureHelp: ${arg.getText()}`);
        }
    }

    return [{
        kind: "verifyNoSignatureHelp",
        markers,
    }];
}

interface SignatureHelpTriggerReason {
    kind: "invoked" | "characterTyped" | "retrigger";
    triggerCharacter?: string;
}

function parseTriggerReason(arg: ts.Expression): SignatureHelpTriggerReason | "undefined" {
    // Handle undefined literal
    if (ts.isIdentifier(arg) && arg.text === "undefined") {
        return "undefined";
    }

    if (!ts.isObjectLiteralExpression(arg)) {
        throw new Error(`Expected object literal for trigger reason, got ${arg.getText()}`);
    }

    let kind: "invoked" | "characterTyped" | "retrigger" | undefined;
    let triggerCharacter: string | undefined;

    for (const prop of arg.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
            throw new Error(`Unexpected property in trigger reason: ${prop.getText()}`);
        }
        const name = prop.name.text;
        if (name === "kind") {
            if (!ts.isStringLiteral(prop.initializer)) {
                throw new Error(`Expected string literal for kind, got ${prop.initializer.getText()}`);
            }
            const k = prop.initializer.text;
            if (k === "invoked" || k === "characterTyped" || k === "retrigger") {
                kind = k;
            }
            else {
                throw new Error(`Unknown trigger reason kind: ${k}`);
            }
        }
        else if (name === "triggerCharacter") {
            if (!ts.isStringLiteral(prop.initializer)) {
                throw new Error(`Expected string literal for triggerCharacter, got ${prop.initializer.getText()}`);
            }
            triggerCharacter = prop.initializer.text;
        }
    }

    if (!kind) {
        throw new Error(`Missing kind in trigger reason`);
    }

    return { kind, triggerCharacter };
}

function parseSignatureHelpPresentForTriggerReason(args: ts.NodeArray<ts.Expression>): Cmd[] {
    if (args.length === 0) {
        throw new Error("signatureHelpPresentForTriggerReason requires at least one argument");
    }

    const triggerReason = parseTriggerReason(args[0]);

    const markers: string[] = [];
    for (let i = 1; i < args.length; i++) {
        const arg = args[i];
        if (ts.isStringLiteral(arg)) {
            markers.push(arg.text);
        }
        else {
            throw new Error(`Unexpected argument in signatureHelpPresentForTriggerReason: ${arg.getText()}`);
        }
    }

    return [{
        kind: "verifySignatureHelpPresent",
        triggerReason: triggerReason === "undefined" ? undefined : triggerReason,
        markers,
    }];
}

function parseNoSignatureHelpForTriggerReason(args: ts.NodeArray<ts.Expression>): Cmd[] {
    if (args.length === 0) {
        throw new Error("noSignatureHelpForTriggerReason requires at least one argument");
    }

    const triggerReason = parseTriggerReason(args[0]);

    const markers: string[] = [];
    for (let i = 1; i < args.length; i++) {
        const arg = args[i];
        if (ts.isStringLiteral(arg)) {
            markers.push(arg.text);
        }
        else {
            throw new Error(`Unexpected argument in noSignatureHelpForTriggerReason: ${arg.getText()}`);
        }
    }

    return [{
        kind: "verifyNoSignatureHelpForTriggerReason",
        triggerReason: triggerReason === "undefined" ? undefined : triggerReason,
        markers,
    }];
}

function parseBaselineSmartSelection(args: ts.NodeArray<ts.Expression>): Cmd {
    if (args.length !== 0) {
        // All calls are currently empty!
        throw new Error("Expected no arguments in verify.baselineSmartSelection");
    }
    return {
        kind: "verifyBaselineSmartSelection",
    };
}

function parseBaselineCallHierarchy(args: ts.NodeArray<ts.Expression>): Cmd {
    if (args.length !== 0) {
        throw new Error("Expected no arguments in verify.baselineCallHierarchy");
    }
    return {
        kind: "verifyBaselineCallHierarchy",
    };
}

function parseOutliningSpansArgs(args: readonly ts.Expression[]): [VerifyOutliningSpansCmd] {
    if (args.length === 0) {
        throw new Error("Expected at least one argument in verify.outliningSpansInCurrentFile");
    }

    let spans: string = "";
    // Optional second argument for kind filter
    let foldingRangeKind: string | undefined;
    if (args.length > 1) {
        const kindArg = getStringLiteralLike(args[1]);
        if (!kindArg) {
            throw new Error(`Expected string literal for outlining kind, got ${args[1].getText()}`);
        }
        switch (kindArg.text) {
            case "comment":
                foldingRangeKind = "lsproto.FoldingRangeKindComment";
                break;
            case "region":
                foldingRangeKind = "lsproto.FoldingRangeKindRegion";
                break;
            case "imports":
                foldingRangeKind = "lsproto.FoldingRangeKindImports";
                break;
            case "code":
                break;
            default:
                throw new Error(`Unknown folding range kind: ${kindArg.text}`);
        }
    }

    return [{
        kind: "verifyOutliningSpans",
        spans,
        foldingRangeKind,
    }];
}

function parseKind(expr: ts.Expression): string {
    if (!ts.isStringLiteral(expr)) {
        throw new Error(`Expected string literal for kind, got ${expr.getText()}`);
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

function parseKindModifiers(expr: ts.Expression): { isOptional: boolean; isDeprecated: boolean; extensions: string[]; } {
    if (!ts.isStringLiteral(expr)) {
        throw new Error(`Expected string literal for kind modifiers, got ${expr.getText()}`);
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

function parseSortText(expr: ts.Expression): string {
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
            throw new Error(`Unrecognized sort text: ${text}`); // !!! support deprecated/obj literal prop/etc
    }
}

function parseVerifyNavigateTo(args: ts.NodeArray<ts.Expression>): [VerifyNavToCmd] {
    const goArgs = [];
    for (const arg of args) {
        const result = parseVerifyNavigateToArg(arg);
        goArgs.push(result);
    }
    return [{
        kind: "verifyNavigateTo",
        args: goArgs,
    }];
}

function parseVerifyNavigateToArg(arg: ts.Expression): string {
    if (!ts.isObjectLiteralExpression(arg)) {
        throw new Error(`Expected object literal expression for verify.navigateTo argument, got ${arg.getText()}`);
    }
    let prefs;
    const items = [];
    let pattern: string | undefined;
    for (const prop of arg.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
            throw new Error(`Expected property assignment with identifier name for verify.navigateTo argument, got ${prop.getText()}`);
        }
        const propName = prop.name.text;
        switch (propName) {
            case "pattern": {
                let patternInit = getStringLiteralLike(prop.initializer);
                if (!patternInit) {
                    throw new Error(`Expected string literal for pattern in verify.navigateTo argument, got ${prop.initializer.getText()}`);
                }
                pattern = getGoStringLiteral(patternInit.text);
                break;
            }
            case "fileName":
                // no longer supported
                continue;
            case "expected": {
                const init = prop.initializer;
                if (!ts.isArrayLiteralExpression(init)) {
                    throw new Error(`Expected array literal expression for expected property in verify.navigateTo argument, got ${init.getText()}`);
                }
                for (const elem of init.elements) {
                    const result = parseNavToItem(elem);
                    items.push(result);
                }
                break;
            }
            case "excludeLibFiles": {
                if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) {
                    prefs = `&lsutil.UserPreferences{ExcludeLibrarySymbolsInNavTo: false}`;
                }
            }
        }
    }
    if (!prefs) {
        prefs = "nil";
    }
    return `{
        Pattern: ${pattern ? pattern : '""'},
        Preferences: ${prefs},
        Exact: new([]*lsproto.SymbolInformation{${items.length ? items.join(",\n") + ",\n" : ""}}),
    }`;
}

function parseVerifyNavTree(args: readonly ts.Expression[]): [VerifyNavTreeCmd] {
    // Ignore arguments and use baseline tests intead.
    return [{
        kind: "verifyNavigationTree",
    }];
}

function parseNavToItem(arg: ts.Expression): string {
    let item = getNodeOfKind(arg, ts.isObjectLiteralExpression);
    if (!item) {
        throw new Error(`Expected object literal expression for navigateTo item, got ${arg.getText()}`);
    }
    const itemProps: string[] = [];
    for (const prop of item.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
            throw new Error(`Expected property assignment with identifier name for navigateTo item, got ${prop.getText()}`);
        }
        const propName = prop.name.text;
        const init = prop.initializer;
        switch (propName) {
            case "name": {
                let nameInit;
                if (!(nameInit = getStringLiteralLike(init))) {
                    throw new Error(`Expected string literal for name in navigateTo item, got ${init.getText()}`);
                }
                itemProps.push(`Name: ${getGoStringLiteral(nameInit.text)}`);
                break;
            }
            case "kind": {
                const goKind = getSymbolKind(init);
                itemProps.push(`Kind: lsproto.${goKind}`);
                break;
            }
            case "kindModifiers": {
                if (init.getText().includes("deprecated")) {
                    itemProps.push(`Tags: &[]lsproto.SymbolTag{lsproto.SymbolTagDeprecated}`);
                }
                break;
            }
            case "range": {
                if (ts.isIdentifier(init) || (ts.isElementAccessExpression(init) && ts.isIdentifier(init.expression))) {
                    let parsedRange = parseRangeVariable(init);
                    if (parsedRange) {
                        itemProps.push(`Location: ${parsedRange}.LSLocation()`);
                        continue;
                    }
                }
                if (ts.isElementAccessExpression(init) && init.expression.getText() === "test.ranges()") {
                    itemProps.push(`Location: f.Ranges()[${parseInt(init.argumentExpression.getText())}].LSLocation()`);
                    continue;
                }
                throw new Error(`Expected range variable for range in navigateTo item, got ${init.getText()}`);
            }
            case "containerName": {
                let nameInit;
                if (!(nameInit = getStringLiteralLike(init))) {
                    throw new Error(`Expected string literal for container name in navigateTo item, got ${init.getText()}`);
                }
                itemProps.push(`ContainerName: new(${getGoStringLiteral(nameInit.text)})`);
                break;
            }
            default:
                // ignore other properties
        }
    }
    return `{\n${itemProps.join(",\n")},\n}`;
}

function getSymbolKind(kind: ts.Expression): string {
    let result;
    if (!(result = getStringLiteralLike(kind))) {
        throw new Error(`Expected string literal for symbol kind, got ${kind.getText()}`);
    }
    return getSymbolKindWorker(result.text);
}

function getSymbolKindWorker(kind: string): string {
    switch (kind) {
        case "script":
            return "SymbolKindFile";
        case "module":
            return "SymbolKindNamespace";
        case "class":
        case "local class":
            return "SymbolKindClass";
        case "interface":
            return "SymbolKindInterface";
        case "type":
            return "SymbolKindClass";
        case "enum":
            return "SymbolKindEnum";
        case "enum member":
            return "SymbolKindEnumMember";
        case "var":
        case "local var":
        case "using":
        case "await using":
            return "SymbolKindVariable";
        case "function":
        case "local function":
            return "SymbolKindFunction";
        case "method":
            return "SymbolKindMethod";
        case "getter":
        case "setter":
        case "property":
        case "accessor":
            return "SymbolKindProperty";
        case "constructor":
        case "construct":
            return "SymbolKindConstructor";
        case "call":
        case "index":
            return "SymbolKindFunction";
        case "parameter":
            return "SymbolKindVariable";
        case "type parameter":
            return "SymbolKindTypeParameter";
        case "primitive type":
            return "SymbolKindObject";
        case "const":
        case "let":
            return "SymbolKindVariable";
        case "directory":
            return "SymbolKindPackage";
        case "external module name":
            return "SymbolKindModule";
        case "string":
            return "SymbolKindString";
        case "type":
            return "SymbolKindClass";
        default:
            return "SymbolKindVariable";
    }
}

interface VerifyCompletionsCmd {
    kind: "verifyCompletions";
    marker: string;
    isNewIdentifierLocation?: true;
    args?: VerifyCompletionsArgs | "nil";
    andApplyCodeActionArgs?: VerifyApplyCodeActionArgs;
}

interface VerifyCompletionsArgs {
    includes?: string;
    excludes?: string;
    exact?: string;
    unsorted?: string;
    preferences: string;
}

interface VerifyApplyCodeActionArgs {
    name: string;
    source: string;
    description: string;
    newFileContent: string;
}

interface VerifyApplyCodeActionFromCompletionCmd {
    kind: "verifyApplyCodeActionFromCompletion";
    marker: string;
    options: string;
}

interface VerifyBaselineFindAllReferencesCmd {
    kind: "verifyBaselineFindAllReferences";
    markers: string[];
    ranges?: boolean;
}

interface VerifyBaselineGoToDefinitionCmd {
    kind: "verifyBaselineGoToDefinition" | "verifyBaselineGoToType" | "verifyBaselineGoToImplementation";
    markers: string[];
    boundSpan?: true;
    ranges?: boolean;
}

interface VerifyBaselineQuickInfoCmd {
    kind: "verifyBaselineQuickInfo";
}

interface VerifyBaselineSignatureHelpCmd {
    kind: "verifyBaselineSignatureHelp";
}

interface VerifyBaselineSmartSelection {
    kind: "verifyBaselineSmartSelection";
}

interface VerifyBaselineCallHierarchy {
    kind: "verifyBaselineCallHierarchy";
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

interface VerifyBaselineInlayHintsCmd {
    kind: "verifyBaselineInlayHints";
    span: string;
    preferences: string;
}

interface VerifyImportFixAtPositionCmd {
    kind: "verifyImportFixAtPosition";
    expectedTexts: string[];
    preferences: string;
}

interface VerifyImportFixModuleSpecifiersCmd {
    kind: "verifyImportFixModuleSpecifiers";
    markerName: string;
    moduleSpecifiers: string[];
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

interface FormatCmd {
    kind: "format";
    goStatement: string;
}

interface VerifyContentCmd {
    kind: "verifyContent";
    goStatement: string;
}

interface VerifyQuickInfoCmd {
    kind: "quickInfoIs" | "quickInfoAt" | "quickInfoExists" | "notQuickInfoExists";
    marker?: string;
    text?: string;
    docs?: string;
}

interface VerifyOrganizeImportsCmd {
    kind: "verifyOrganizeImports";
    expectedContent: string;
    mode: string;
    preferences: string;
}

interface VerifyRenameInfoCmd {
    kind: "renameInfoSucceeded" | "renameInfoFailed";
    preferences: string;
}

interface VerifyBaselineLinkedEditingCmd {
    kind: "verifyBaselineLinkedEditing";
}
interface VerifyLinkedEditingCmd {
    kind: "verifyLinkedEditing";
    ranges: string;
}

interface VerifyDiagnosticsCmd {
    kind: "verifyDiagnostics";
    arg: string;
    isSuggestion: boolean;
}

interface VerifyBaselineDiagnosticsCmd {
    kind: "verifyBaselineDiagnostics";
}

interface VerifyNavToCmd {
    kind: "verifyNavigateTo";
    args: string[];
}

interface VerifySignatureHelpOptions {
    marker?: string | string[];
    text?: string;
    docComment?: string;
    parameterCount?: number;
    parameterName?: string;
    parameterSpan?: string;
    parameterDocComment?: string;
    overloadsCount?: number;
    overrideSelectedItemIndex?: number;
    triggerReason?: string;
    isVariadic?: boolean;
}

interface VerifySignatureHelpCmd {
    kind: "verifySignatureHelp";
    options: VerifySignatureHelpOptions[];
}

interface VerifyNoSignatureHelpCmd {
    kind: "verifyNoSignatureHelp";
    markers: string[];
}

interface VerifySignatureHelpPresentCmd {
    kind: "verifySignatureHelpPresent";
    triggerReason?: SignatureHelpTriggerReason;
    markers: string[];
}

interface VerifyNoSignatureHelpForTriggerReasonCmd {
    kind: "verifyNoSignatureHelpForTriggerReason";
    triggerReason?: SignatureHelpTriggerReason;
    markers: string[];
}

interface VerifyOutliningSpansCmd {
    kind: "verifyOutliningSpans";
    spans: string;
    foldingRangeKind?: string;
}

interface VerifyNavTreeCmd {
    kind: "verifyNavigationTree";
}

interface VerifyNumberOfErrorsInCurrentFileCmd {
    kind: "verifyNumberOfErrorsInCurrentFile";
    expectedCount: number;
}

interface VerifyNoErrorsCmd {
    kind: "verifyNoErrors";
}

interface VerifyErrorExistsAtRangeCmd {
    kind: "verifyErrorExistsAtRange";
    range: string;
    code: number;
    message: string;
}

interface VerifyCurrentLineContentIsCmd {
    kind: "verifyCurrentLineContentIs";
    text: string;
}

interface VerifyCurrentFileContentIsCmd {
    kind: "verifyCurrentFileContentIs";
    text: string;
}

interface VerifyErrorExistsBetweenMarkersCmd {
    kind: "verifyErrorExistsBetweenMarkers";
    startMarker: string;
    endMarker: string;
}

interface VerifyErrorExistsAfterMarkerCmd {
    kind: "verifyErrorExistsAfterMarker";
    markerName: string;
}

interface VerifyErrorExistsBeforeMarkerCmd {
    kind: "verifyErrorExistsBeforeMarker";
    markerName: string;
}

type Cmd =
    | VerifyCompletionsCmd
    | VerifyApplyCodeActionFromCompletionCmd
    | VerifyBaselineFindAllReferencesCmd
    | VerifyBaselineDocumentHighlightsCmd
    | VerifyBaselineGoToDefinitionCmd
    | VerifyBaselineQuickInfoCmd
    | VerifyBaselineSignatureHelpCmd
    | VerifyBaselineSmartSelection
    | VerifySignatureHelpCmd
    | VerifyNoSignatureHelpCmd
    | VerifySignatureHelpPresentCmd
    | VerifyNoSignatureHelpForTriggerReasonCmd
    | VerifyBaselineCallHierarchy
    | GoToCmd
    | FormatCmd
    | EditCmd
    | VerifyContentCmd
    | VerifyQuickInfoCmd
    | VerifyOrganizeImportsCmd
    | VerifyBaselineRenameCmd
    | VerifyRenameInfoCmd
    | VerifyBaselineLinkedEditingCmd
    | VerifyLinkedEditingCmd
    | VerifyNavToCmd
    | VerifyNavTreeCmd
    | VerifyBaselineInlayHintsCmd
    | VerifyImportFixAtPositionCmd
    | VerifyImportFixModuleSpecifiersCmd
    | VerifyDiagnosticsCmd
    | VerifyBaselineDiagnosticsCmd
    | VerifyOutliningSpansCmd
    | VerifyNumberOfErrorsInCurrentFileCmd
    | VerifyNoErrorsCmd
    | VerifyErrorExistsAtRangeCmd
    | VerifyCurrentLineContentIsCmd
    | VerifyCurrentFileContentIsCmd
    | VerifyErrorExistsBetweenMarkersCmd
    | VerifyErrorExistsAfterMarkerCmd
    | VerifyErrorExistsBeforeMarkerCmd;

function generateVerifyOutliningSpans({ foldingRangeKind }: VerifyOutliningSpansCmd): string {
    if (foldingRangeKind) {
        return `f.VerifyOutliningSpans(t, ${foldingRangeKind})`;
    }
    return `f.VerifyOutliningSpans(t)`;
}

function generateVerifyCompletions({ marker, args, isNewIdentifierLocation, andApplyCodeActionArgs }: VerifyCompletionsCmd): string {
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
    ${args?.preferences && !args.preferences.startsWith("nil") ? `UserPreferences: ${args.preferences},` : ""}
}`;
    }

    const call = `f.VerifyCompletions(t, ${marker}, ${expectedList})`;
    if (andApplyCodeActionArgs) {
        return `${call}.AndApplyCodeAction(t, &fourslash.CompletionsExpectedCodeAction{
            Name: ${getGoStringLiteral(andApplyCodeActionArgs.name)},
            Source: ${getGoStringLiteral(andApplyCodeActionArgs.source)},
            Description: ${getGoStringLiteral(andApplyCodeActionArgs.description)},
            NewFileContent: ${getGoMultiLineStringLiteral(andApplyCodeActionArgs.newFileContent)},
        })`;
    }
    return call;
}

function generateVerifyApplyCodeActionFromCompletion({ marker, options }: VerifyApplyCodeActionFromCompletionCmd): string {
    return `f.VerifyApplyCodeActionFromCompletion(t, ${marker}, ${options})`;
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

function generateBaselineGoToDefinition({ markers, ranges, kind, boundSpan }: VerifyBaselineGoToDefinitionCmd): string {
    const originalSelectionRange = boundSpan ? "true" : "false";
    switch (kind) {
        case "verifyBaselineGoToDefinition":
            if (ranges || markers.length === 0) {
                return `f.VerifyBaselineGoToDefinition(t, ${originalSelectionRange})`;
            }
            return `f.VerifyBaselineGoToDefinition(t, ${originalSelectionRange}, ${markers.join(", ")})`;
        case "verifyBaselineGoToType":
            if (ranges || markers.length === 0) {
                return `f.VerifyBaselineGoToTypeDefinition(t)`;
            }
            return `f.VerifyBaselineGoToTypeDefinition(t, ${markers.join(", ")})`;
        case "verifyBaselineGoToImplementation":
            if (ranges || markers.length === 0) {
                return `f.VerifyBaselineGoToImplementation(t)`;
            }
            return `f.VerifyBaselineGoToImplementation(t, ${markers.join(", ")})`;
    }
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

function generateOrganizeImports({ expectedContent, mode, preferences }: VerifyOrganizeImportsCmd): string {
    return `f.VerifyOrganizeImports(t,
        ${getGoMultiLineStringLiteral(expectedContent)},
        ${mode},
        ${preferences},
    )`;
}

function generateBaselineRename({ kind, args, preferences }: VerifyBaselineRenameCmd): string {
    switch (kind) {
        case "verifyBaselineRename":
            return `f.VerifyBaselineRename(t, ${preferences}, ${args.join(", ")})`;
        case "verifyBaselineRenameAtRangesWithText":
            return `f.VerifyBaselineRenameAtRangesWithText(t, ${preferences}, ${args.join(", ")})`;
    }
}

function generateBaselineInlayHints({ span, preferences }: VerifyBaselineInlayHintsCmd): string {
    return `f.VerifyBaselineInlayHints(t, ${span}, ${preferences})`;
}

function generateImportFixAtPosition({ expectedTexts, preferences }: VerifyImportFixAtPositionCmd): string {
    // Handle empty array case
    if (expectedTexts.length === 1 && expectedTexts[0] === "") {
        return `f.VerifyImportFixAtPosition(t, []string{}, ${preferences})`;
    }
    return `f.VerifyImportFixAtPosition(t, []string{\n${expectedTexts.join(",\n")},\n}, ${preferences})`;
}

function generateImportFixModuleSpecifiers({ markerName, moduleSpecifiers, preferences }: VerifyImportFixModuleSpecifiersCmd): string {
    const specifiersArray = moduleSpecifiers.length === 0
        ? "[]string{}"
        : `[]string{${moduleSpecifiers.join(", ")}}`;
    return `f.VerifyImportFixModuleSpecifiers(t, ${markerName}, ${specifiersArray}, ${preferences})`;
}

function generateSignatureHelpExpected(opts: VerifySignatureHelpOptions): string {
    const fields: string[] = [];

    if (opts.text !== undefined) {
        fields.push(`Text: ${getGoStringLiteral(opts.text)}`);
    }
    if (opts.docComment !== undefined) {
        fields.push(`DocComment: ${getGoStringLiteral(opts.docComment)}`);
    }
    if (opts.parameterCount !== undefined) {
        fields.push(`ParameterCount: ${opts.parameterCount}`);
    }
    if (opts.parameterName !== undefined) {
        fields.push(`ParameterName: ${getGoStringLiteral(opts.parameterName)}`);
    }
    if (opts.parameterSpan !== undefined) {
        fields.push(`ParameterSpan: ${getGoStringLiteral(opts.parameterSpan)}`);
    }
    if (opts.parameterDocComment !== undefined) {
        fields.push(`ParameterDocComment: ${getGoStringLiteral(opts.parameterDocComment)}`);
    }
    if (opts.overloadsCount !== undefined) {
        fields.push(`OverloadsCount: ${opts.overloadsCount}`);
    }
    if (opts.overrideSelectedItemIndex !== undefined) {
        fields.push(`OverrideSelectedItemIndex: ${opts.overrideSelectedItemIndex}`);
    }
    if (opts.isVariadic !== undefined) {
        fields.push(`IsVariadic: ${opts.isVariadic}`);
        fields.push(`IsVariadicSet: true`);
    }

    return `fourslash.VerifySignatureHelpOptions{${fields.join(", ")}}`;
}

function generateSignatureHelp({ options }: VerifySignatureHelpCmd): string {
    const lines: string[] = [];

    for (const opts of options) {
        const expected = generateSignatureHelpExpected(opts);

        // Add comments for unsupported options
        const unsupportedComments: string[] = [];

        if (opts.marker !== undefined) {
            const markers = Array.isArray(opts.marker) ? opts.marker : [opts.marker];
            for (const marker of markers) {
                lines.push(`f.GoToMarker(t, ${getGoStringLiteral(marker)})`);
                for (const comment of unsupportedComments) {
                    lines.push(comment);
                }
                lines.push(`f.VerifySignatureHelp(t, ${expected})`);
            }
        }
        else {
            // No marker specified, use current position
            for (const comment of unsupportedComments) {
                lines.push(comment);
            }
            lines.push(`f.VerifySignatureHelp(t, ${expected})`);
        }
    }

    return lines.join("\n");
}

function generateNoSignatureHelp({ markers }: VerifyNoSignatureHelpCmd): string {
    if (markers.length === 1 && markers[0] === "...test.markerNames()") {
        // All markers
        return `f.VerifyNoSignatureHelpForMarkers(t, f.MarkerNames()...)`;
    }
    if (markers.length === 0) {
        // Current position
        return `f.VerifyNoSignatureHelp(t)`;
    }
    // Specific markers
    const markerArgs = markers.map(m => getGoStringLiteral(m)).join(", ");
    return `f.VerifyNoSignatureHelpForMarkers(t, ${markerArgs})`;
}

function generateTriggerContext(triggerReason: SignatureHelpTriggerReason | undefined): string {
    if (!triggerReason) {
        return "nil";
    }
    switch (triggerReason.kind) {
        case "invoked":
            return `&lsproto.SignatureHelpContext{TriggerKind: lsproto.SignatureHelpTriggerKindInvoked}`;
        case "characterTyped":
            return `&lsproto.SignatureHelpContext{TriggerKind: lsproto.SignatureHelpTriggerKindTriggerCharacter, TriggerCharacter: new(${getGoStringLiteral(triggerReason.triggerCharacter ?? "")}), IsRetrigger: false}`;
        case "retrigger":
            return `&lsproto.SignatureHelpContext{TriggerKind: lsproto.SignatureHelpTriggerKindTriggerCharacter, TriggerCharacter: new(${getGoStringLiteral(triggerReason.triggerCharacter ?? "")}), IsRetrigger: true}`;
        default:
            throw new Error(`Unknown trigger reason kind: ${triggerReason}`);
    }
}

function generateSignatureHelpPresent({ triggerReason, markers }: VerifySignatureHelpPresentCmd): string {
    const context = generateTriggerContext(triggerReason);
    if (markers.length === 0) {
        // Current position
        return `f.VerifySignatureHelpPresent(t, ${context})`;
    }
    // Specific markers
    const markerArgs = markers.map(m => getGoStringLiteral(m)).join(", ");
    return `f.VerifySignatureHelpPresentForMarkers(t, ${context}, ${markerArgs})`;
}

function generateNoSignatureHelpForTriggerReason({ triggerReason, markers }: VerifyNoSignatureHelpForTriggerReasonCmd): string {
    const context = generateTriggerContext(triggerReason);
    if (markers.length === 0) {
        // Current position
        return `f.VerifyNoSignatureHelpWithContext(t, ${context})`;
    }
    // Specific markers
    const markerArgs = markers.map(m => getGoStringLiteral(m)).join(", ");
    return `f.VerifyNoSignatureHelpForMarkersWithContext(t, ${context}, ${markerArgs})`;
}

function generateNavigateTo({ args }: VerifyNavToCmd): string {
    return `f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{\n${args.join(", ")}})`;
}

function generateCmd(cmd: Cmd): string {
    switch (cmd.kind) {
        case "verifyCompletions":
            return generateVerifyCompletions(cmd);
        case "verifyApplyCodeActionFromCompletion":
            return generateVerifyApplyCodeActionFromCompletion(cmd);
        case "verifyBaselineFindAllReferences":
            return generateBaselineFindAllReferences(cmd);
        case "verifyBaselineDocumentHighlights":
            return generateBaselineDocumentHighlights(cmd);
        case "verifyBaselineGoToDefinition":
        case "verifyBaselineGoToType":
        case "verifyBaselineGoToImplementation":
            return generateBaselineGoToDefinition(cmd);
        case "verifyBaselineQuickInfo":
            // Quick Info -> Hover
            return `f.VerifyBaselineHover(t)`;
        case "verifyBaselineSignatureHelp":
            return `f.VerifyBaselineSignatureHelp(t)`;
        case "verifyBaselineSmartSelection":
            return `f.VerifyBaselineSelectionRanges(t)`;
        case "verifyBaselineCallHierarchy":
            return `f.VerifyBaselineCallHierarchy(t)`;
        case "verifyLinkedEditing":
            return `f.VerifyLinkedEditing(t, ${cmd.ranges})`;
        case "goTo":
            return generateGoToCommand(cmd);
        case "edit":
        case "format":
        case "verifyContent":
            return cmd.goStatement;
        case "quickInfoAt":
        case "quickInfoIs":
        case "quickInfoExists":
        case "notQuickInfoExists":
            return generateQuickInfoCommand(cmd);
        case "verifyOrganizeImports":
            return generateOrganizeImports(cmd);
        case "verifyBaselineRename":
        case "verifyBaselineRenameAtRangesWithText":
            return generateBaselineRename(cmd);
        case "renameInfoSucceeded":
            return `f.VerifyRenameSucceeded(t, ${cmd.preferences})`;
        case "renameInfoFailed":
            return `f.VerifyRenameFailed(t, ${cmd.preferences})`;
        case "verifyBaselineInlayHints":
            return generateBaselineInlayHints(cmd);
        case "verifyBaselineLinkedEditing":
            return `f.VerifyBaselineLinkedEditing(t)`;
        case "verifyImportFixAtPosition":
            return generateImportFixAtPosition(cmd);
        case "verifyImportFixModuleSpecifiers":
            return generateImportFixModuleSpecifiers(cmd);
        case "verifyDiagnostics":
            const funcName = cmd.isSuggestion ? "VerifySuggestionDiagnostics" : "VerifyNonSuggestionDiagnostics";
            return `f.${funcName}(t, ${cmd.arg})`;
        case "verifyBaselineDiagnostics":
            return `f.VerifyBaselineNonSuggestionDiagnostics(t)`;
        case "verifyNavigateTo":
            return generateNavigateTo(cmd);
        case "verifySignatureHelp":
            return generateSignatureHelp(cmd);
        case "verifyNoSignatureHelp":
            return generateNoSignatureHelp(cmd);
        case "verifySignatureHelpPresent":
            return generateSignatureHelpPresent(cmd);
        case "verifyNoSignatureHelpForTriggerReason":
            return generateNoSignatureHelpForTriggerReason(cmd);
        case "verifyOutliningSpans":
            return generateVerifyOutliningSpans(cmd);
        case "verifyNavigationTree":
            return `f.VerifyBaselineDocumentSymbol(t)`;
        case "verifyNumberOfErrorsInCurrentFile":
            return `f.VerifyNumberOfErrorsInCurrentFile(t, ${cmd.expectedCount})`;
        case "verifyNoErrors":
            return `f.VerifyNoErrors(t)`;
        case "verifyErrorExistsAtRange":
            return `f.VerifyErrorExistsAtRange(t, ${cmd.range}, ${cmd.code}, ${getGoStringLiteral(cmd.message)})`;
        case "verifyCurrentLineContentIs":
            return `f.VerifyCurrentLineContent(t, ${getGoStringLiteral(cmd.text)})`;
        case "verifyCurrentFileContentIs":
            return `f.VerifyCurrentFileContent(t, ${getGoStringLiteral(cmd.text)})`;
        case "verifyErrorExistsBetweenMarkers":
            return `f.VerifyErrorExistsBetweenMarkers(t, ${getGoStringLiteral(cmd.startMarker)}, ${getGoStringLiteral(cmd.endMarker)})`;
        case "verifyErrorExistsAfterMarker":
            return `f.VerifyErrorExistsAfterMarker(t, ${getGoStringLiteral(cmd.markerName)})`;
        case "verifyErrorExistsBeforeMarker":
            return `f.VerifyErrorExistsBeforeMarker(t, ${getGoStringLiteral(cmd.markerName)})`;
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

function generateGoTest(test: GoTest, isServer: boolean): string {
    const testName = (test.name[0].toUpperCase() + test.name.substring(1)).replaceAll("-", "_").replaceAll(/[^a-zA-Z0-9_]/g, "");
    const content = test.content;
    const commands = test.commands.map(cmd => generateCmd(cmd)).join("\n");
    const imports = [`"github.com/microsoft/typescript-go/internal/fourslash"`];
    // Only include these imports if the commands use them to avoid unused import errors.
    // Use regex with word boundary to avoid false positives like "underscore." matching "core."
    if (/\bcore\./.test(commands)) {
        imports.unshift(`"github.com/microsoft/typescript-go/internal/core"`);
    }
    if (/\bls\./.test(commands)) {
        imports.push(`"github.com/microsoft/typescript-go/internal/ls"`);
    }
    if (/\blsutil\./.test(commands)) {
        imports.push(`"github.com/microsoft/typescript-go/internal/ls/lsutil"`);
    }
    if (/\blsproto\./.test(commands)) {
        imports.push(`"github.com/microsoft/typescript-go/internal/lsp/lsproto"`);
    }
    if (usesFourslashUtil(commands)) {
        imports.push(`. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"`);
    }
    imports.push(`"github.com/microsoft/typescript-go/internal/testutil"`);
    const template = `// Code generated by convertFourslash; DO NOT EDIT.
// To modify this test, run "npm run makemanual ${test.name}"

package fourslash_test

import (
	"testing"

    ${imports.join("\n\t")}
)

func Test${testName}(t *testing.T) {
    fourslash.SkipIfFailing(t)
    t.Parallel()
    defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ${content}
    f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
    defer done()
    ${isServer ? `f.MarkTestAsStradaServer()\n` : ""}${commands}
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

// Parses expressions like 'string'.length or "string".length and returns the length value
function getStringLengthExpression(node: ts.Node): number | undefined {
    if (ts.isPropertyAccessExpression(node) && node.name.text === "length") {
        const stringLiteral = getStringLiteralLike(node.expression);
        if (stringLiteral) {
            return stringLiteral.text.length;
        }
    }
    return undefined;
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
    main().catch(e => {
        console.error(e);
        process.exit(1);
    });
}

import * as cp from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import which from "which";

const stradaFourslashPath = path.resolve(import.meta.dirname, "../", "../", "../", "_submodules", "TypeScript", "tests", "cases", "fourslash");

let inputFileSet: Set<string> | undefined;

const failingTestsPath = path.join(import.meta.dirname, "failingTests.txt");
const failingTestsList = fs.readFileSync(failingTestsPath, "utf-8").split("\n").map(line => line.trim().substring(4)).filter(line => line.length > 0);
const failingTests = new Set(failingTestsList);

const outputDir = path.join(import.meta.dirname, "../", "tests", "gen");

const unparsedFiles: string[] = [];

function main() {
    const args = process.argv.slice(2);
    const inputFilesPath = args[0];
    if (inputFilesPath) {
        const inputFiles = fs.readFileSync(inputFilesPath, "utf-8")
            .split("\n").map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => path.basename(line));
        inputFileSet = new Set(inputFiles);
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    generateHelperFile();
    parseTypeScriptFiles(stradaFourslashPath);
    console.log(unparsedFiles.join("\n"));
    const gofmt = which.sync("go");
    cp.execFileSync(gofmt, ["tool", "mvdan.cc/gofumpt", "-lang=go1.24", "-w", outputDir]);
}

function parseTypeScriptFiles(folder: string): void {
    const files = fs.readdirSync(folder);

    files.forEach(file => {
        const filePath = path.join(folder, file);
        const stat = fs.statSync(filePath);
        if (inputFileSet && !inputFileSet.has(file)) {
            return;
        }

        if (stat.isDirectory()) {
            parseTypeScriptFiles(filePath);
        }
        else if (file.endsWith(".ts")) {
            const content = fs.readFileSync(filePath, "utf-8");
            const test = parseFileContent(file, content);
            if (test) {
                const testContent = generateGoTest(test);
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
        name: filename.replace(".ts", ""),
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
        if (!ts.isIdentifier(namespace) || !ts.isIdentifier(func)) {
            console.error(`Expected identifiers for namespace and function, got ${namespace.getText()} and ${func.getText()}`);
            return undefined;
        }
        // `verify.completions(...)`
        if (namespace.text === "verify" && func.text === "completions") {
            return parseVerifyCompletionsArgs(callExpression.arguments);
        }
        // `goTo.marker(...)`
        if (namespace.text === "goTo" && func.text === "marker") {
            return parseGoToMarkerArgs(callExpression.arguments);
        }
        // !!! other fourslash commands
    }
    console.error(`Unrecognized fourslash statement: ${statement.getText()}`);
    return undefined;
}

function getGoStringLiteral(text: string): string {
    return `${JSON.stringify(text)}`;
}

function parseGoToMarkerArgs(args: readonly ts.Expression[]): GoToMarkerCmd[] | undefined {
    if (args.length !== 1) {
        console.error(`Expected exactly one argument in goTo.marker, got ${args.length}`);
        return undefined;
    }
    const arg = args[0];
    if (!ts.isStringLiteral(arg)) {
        console.error(`Unrecognized argument in goTo.marker: ${arg.getText()}`);
        return undefined;
    }
    return [{
        kind: "goToMarker",
        marker: getGoStringLiteral(arg.text),
    }];
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
                else {
                    console.error(`Unrecognized marker initializer: ${init.getText()}`);
                    return undefined;
                }
                break;
            case "exact":
            case "includes":
                if (init.getText() === "undefined") {
                    return {
                        kind: "verifyCompletions",
                        marker: marker ? marker : "nil",
                        args: undefined,
                    };
                }
                let expected = "[]fourslash.ExpectedCompletionItem{";
                if (ts.isArrayLiteralExpression(init)) {
                    for (const elem of init.elements) {
                        const result = parseExpectedCompletionItem(elem);
                        if (!result) {
                            return undefined;
                        }
                        expected += result + ", ";
                    }
                }
                else {
                    const result = parseExpectedCompletionItem(init);
                    if (!result) {
                        return undefined;
                    }
                    expected += result;
                }
                expected += "}";
                if (propName === "includes") {
                    (goArgs ??= {}).includes = expected;
                }
                else {
                    (goArgs ??= {}).exact = expected;
                }
                break; // !!! parse these args
            case "excludes":
                let excludes = "[]string{";
                if (ts.isStringLiteral(init)) {
                    excludes += `${getGoStringLiteral(init.text)}, `;
                }
                else if (ts.isArrayLiteralExpression(init)) {
                    for (const elem of init.elements) {
                        if (!ts.isStringLiteral(elem)) {
                            return undefined; // Shouldn't happen
                        }
                        excludes += `${getGoStringLiteral(elem.text)}, `;
                    }
                }
                excludes += "}";
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
            case "optionalReplacementSpan":
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
    if (ts.isStringLiteral(expr)) {
        return getGoStringLiteral(expr.text);
    }
    if (ts.isObjectLiteralExpression(expr)) {
        let isDeprecated = false; // !!!
        let isOptional = false;
        let extensions: string[] = []; // !!!
        let item = "&lsproto.CompletionItem{";
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
                    if (ts.isStringLiteral(init)) {
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
                    item += `SortText: ptrTo(string(${result})), `;
                    if (result === "ls.SortTextOptionalMember") {
                        isOptional = true;
                    }
                    break;
                case "insertText":
                    if (ts.isStringLiteral(init)) {
                        insertText = init.text;
                    }
                    else {
                        console.error(`Expected string literal for insertText, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                case "filterText":
                    if (ts.isStringLiteral(init)) {
                        filterText = init.text;
                    }
                    else {
                        console.error(`Expected string literal for filterText, got ${init.getText()}`);
                        return undefined;
                    }
                    break;
                case "isRecommended":
                    if (init.kind === ts.SyntaxKind.TrueKeyword) {
                        item += `Preselect: ptrTo(true), `;
                    }
                    break;
                case "kind":
                    const kind = parseKind(init);
                    if (!kind) {
                        return undefined;
                    }
                    item += `Kind: ptrTo(${kind}), `;
                    break;
                case "kindModifiers":
                    const modifiers = parseKindModifiers(init);
                    if (!modifiers) {
                        return undefined;
                    }
                    ({ isDeprecated, isOptional, extensions } = modifiers);
                    break;
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
        item += `Label: ${getGoStringLiteral(name!)}, `;
        if (insertText) item += `InsertText: ptrTo(${getGoStringLiteral(insertText)}), `;
        if (filterText) item += `FilterText: ptrTo(${getGoStringLiteral(filterText)}), `;
        item += "}";
        return item;
    }
    console.error(`Expected string literal or object literal for expected completion item, got ${expr.getText()}`);
    return undefined; // Unsupported expression type
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
        case "completion.SortText.SuggestedClassMember":
            return "ls.SortTextSuggestedClassMember";
        case "completion.SortText.GlobalsOrKeywords":
            return "ls.SortTextGlobalsOrKeywords";
        case "completion.SortText.AutoImportSuggestions":
            return "ls.SortTextAutoImportSuggestions";
        case "completion.SortText.ClassMemberSnippets":
            return "ls.SortTextClassMemberSnippets";
        case "completion.SortText.JavaScriptIdentifiers":
            return "ls.SortTextJavaScriptIdentifiers";
        default:
            console.error(`Unrecognized sort text: ${text}`);
            return undefined; // !!! support deprecated/obj literal prop/etc
    }
}

interface VerifyCompletionsCmd {
    kind: "verifyCompletions";
    marker: string;
    isNewIdentifierLocation?: true;
    args?: VerifyCompletionsArgs;
}

interface VerifyCompletionsArgs {
    includes?: string;
    excludes?: string;
    exact?: string;
}

interface GoToMarkerCmd {
    kind: "goToMarker";
    marker: string;
}

type Cmd = VerifyCompletionsCmd | GoToMarkerCmd;

function generateVerifyCompletions({ marker, args, isNewIdentifierLocation }: VerifyCompletionsCmd): string {
    let expectedList = "nil";
    if (args) {
        const expected = [];
        if (args.includes) expected.push(`Includes: ${args.includes},`);
        if (args.excludes) expected.push(`Excludes: ${args.excludes},`);
        if (args.exact) expected.push(`Exact: ${args.exact},`);
        // !!! isIncomplete
        // !!! itemDefaults/commitCharacters from `isNewIdentifierLocation`
        const commitCharacters = isNewIdentifierLocation ? "[]string{}" : "defaultCommitCharacters";
        expectedList = `&fourslash.VerifyCompletionsExpectedList{
    IsIncomplete: false,
    ItemDefaults: &lsproto.CompletionItemDefaults{
        CommitCharacters: &${commitCharacters},
    },
    Items: &fourslash.VerifyCompletionsExpectedItems{
        ${expected.join("\n")}
    },
}`;
    }
    return `f.VerifyCompletions(t, ${marker}, ${expectedList})`;
}

function generateGoToMarker({ marker }: GoToMarkerCmd): string {
    return `f.GoToMarker(t, ${marker})`;
}

function generateCmd(cmd: Cmd): string {
    switch (cmd.kind) {
        case "verifyCompletions":
            return generateVerifyCompletions(cmd as VerifyCompletionsCmd);
        case "goToMarker":
            return generateGoToMarker(cmd as GoToMarkerCmd);
        default:
            throw new Error(`Unknown command kind: ${cmd}`);
    }
}

interface GoTest {
    name: string;
    content: string;
    commands: Cmd[];
}

function generateGoTest(test: GoTest): string {
    const testName = test.name[0].toUpperCase() + test.name.substring(1);
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

function generateHelperFile() {
    const helper = `package fourslash_test

func ptrTo[T any](v T) *T {
	return &v
}

var defaultCommitCharacters = []string{".", ",", ";"}`;
    fs.writeFileSync(path.join(outputDir, "util_test.go"), helper, "utf-8");
}

main();

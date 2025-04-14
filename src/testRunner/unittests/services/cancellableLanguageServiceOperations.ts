import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: services:: cancellableLanguageServiceOperations", () => {
    const file = `
        function foo(): void;
        function foo<T>(x: T): T;
        function foo<T>(x?: T): T | void {}
        foo(f);
        `;
    it("can cancel signature help mid-request", () => {
        verifyOperationCancelledAfter(file, 4, service =>
            // Two calls are top-level in services, one is the root type, and the second should be for the parameter type
            service.getSignatureHelpItems("file.ts", file.lastIndexOf("f"), ts.emptyOptions)!, r => assert.exists(r.items[0]));
    });

    it("can cancel find all references mid-request", () => {
        verifyOperationCancelledAfter(file, 3, service =>
            // Two calls are top-level in services, one is the root type
            service.findReferences("file.ts", file.lastIndexOf("o"))!, r => assert.exists(r[0].definition));
    });

    it("can cancel quick info mid-request", () => {
        verifyOperationCancelledAfter(file, 1, service =>
            // The LS doesn't do any top-level checks on the token for quickinfo, so the first check is within the checker
            service.getQuickInfoAtPosition("file.ts", file.lastIndexOf("o"))!, r => assert.exists(r.displayParts));
    });

    it("can cancel completion entry details mid-request", () => {
        const options: ts.FormatCodeSettings = {
            indentSize: 4,
            tabSize: 4,
            newLineCharacter: "\n",
            convertTabsToSpaces: true,
            indentStyle: ts.IndentStyle.Smart,
            insertSpaceAfterConstructor: false,
            insertSpaceAfterCommaDelimiter: true,
            insertSpaceAfterSemicolonInForStatements: true,
            insertSpaceBeforeAndAfterBinaryOperators: true,
            insertSpaceAfterKeywordsInControlFlowStatements: true,
            insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
            insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
            insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
            insertSpaceBeforeFunctionParenthesis: false,
            placeOpenBraceOnNewLineForFunctions: false,
            placeOpenBraceOnNewLineForControlBlocks: false,
        };
        verifyOperationCancelledAfter(file, 1, service =>
            // The LS doesn't do any top-level checks on the token for completion entry details, so the first check is within the checker
            service.getCompletionEntryDetails("file.ts", file.lastIndexOf("f"), "foo", options, /*source*/ undefined, {}, /*data*/ undefined)!, r => assert.exists(r.displayParts));
    });

    it("can cancel suggestion diagnostics mid-request", () => {
        verifyOperationCancelledAfter(
            file,
            1,
            service =>
                // The LS doesn't do any top-level checks on the token for suggestion diagnostics, so the first check is within the checker
                service.getSuggestionDiagnostics("file.js"),
            r => assert.notEqual(r.length, 0),
            "file.js",
            "function foo() { let a = 10; }",
            { allowJs: true },
        );
    });
});

function verifyOperationCancelledAfter<T>(content: string, cancelAfter: number, operation: (service: ts.LanguageService) => T, validator: (arg: T) => void, fileName?: string, fileContent?: string, options?: ts.CompilerOptions) {
    let checks = 0;
    const token: ts.HostCancellationToken = {
        isCancellationRequested() {
            checks++;
            const result = checks >= cancelAfter;
            if (result) {
                checks = -Infinity; // Cancel just once, then disable cancellation, effectively
            }
            return result;
        },
    };
    const adapter = new Harness.LanguageService.NativeLanguageServiceAdapter(token, options);
    const host = adapter.getHost();
    host.addScript(fileName || "file.ts", fileContent || content, /*isRootFile*/ true);
    const service = adapter.getLanguageService();
    assertCancelled(() => operation(service));
    validator(operation(service));
}

/**
 * We don't just use `assert.throws` because it doesn't validate instances for thrown objects which do not inherit from `Error`
 */
function assertCancelled(cb: () => void) {
    let caught: any;
    try {
        cb();
    }
    catch (e) {
        caught = e;
    }
    assert.exists(caught, "Expected operation to be cancelled, but was not");
    assert.instanceOf(caught, ts.OperationCanceledException);
}

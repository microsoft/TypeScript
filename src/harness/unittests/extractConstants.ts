/// <reference path="..\harness.ts" />
/// <reference path="tsserverProjectSystem.ts" />

namespace ts {
    interface Range {
        start: number;
        end: number;
        name: string;
    }

    interface Test {
        source: string;
        ranges: Map<Range>;
    }

    // TODO (acasey): share
    function extractTest(source: string): Test {
        const activeRanges: Range[] = [];
        let text = "";
        let lastPos = 0;
        let pos = 0;
        const ranges = createMap<Range>();

        while (pos < source.length) {
            if (source.charCodeAt(pos) === CharacterCodes.openBracket &&
                (source.charCodeAt(pos + 1) === CharacterCodes.hash || source.charCodeAt(pos + 1) === CharacterCodes.$)) {
                const saved = pos;
                pos += 2;
                const s = pos;
                consumeIdentifier();
                const e = pos;
                if (source.charCodeAt(pos) === CharacterCodes.bar) {
                    pos++;
                    text += source.substring(lastPos, saved);
                    const name = s === e
                        ? source.charCodeAt(saved + 1) === CharacterCodes.hash ? "selection" : "extracted"
                        : source.substring(s, e);
                    activeRanges.push({ name, start: text.length, end: undefined });
                    lastPos = pos;
                    continue;
                }
                else {
                    pos = saved;
                }
            }
            else if (source.charCodeAt(pos) === CharacterCodes.bar && source.charCodeAt(pos + 1) === CharacterCodes.closeBracket) {
                text += source.substring(lastPos, pos);
                activeRanges[activeRanges.length - 1].end = text.length;
                const range = activeRanges.pop();
                if (range.name in ranges) {
                    throw new Error(`Duplicate name of range ${range.name}`);
                }
                ranges.set(range.name, range);
                pos += 2;
                lastPos = pos;
                continue;
            }
            pos++;
        }
        text += source.substring(lastPos, pos);

        function consumeIdentifier() {
            while (isIdentifierPart(source.charCodeAt(pos), ScriptTarget.Latest)) {
                pos++;
            }
        }
        return { source: text, ranges };
    }

    // TODO (acasey): share
    const newLineCharacter = "\n";
    function getRuleProvider(action?: (opts: FormatCodeSettings) => void) {
        const options = {
            indentSize: 4,
            tabSize: 4,
            newLineCharacter,
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
        if (action) {
            action(options);
        }
        const rulesProvider = new formatting.RulesProvider();
        rulesProvider.ensureUpToDate(options);
        return rulesProvider;
    }

    describe("extractConstants", () => {
        testExtractConstant("extractConstant_TopLevel",
            `let x = [#|1|];`);

        testExtractConstant("extractConstant_Namespace",
            `namespace N {
    let x = [#|1|];
}`);

        testExtractConstant("extractConstant_Class",
            `class C {
    x = [#|1|];
}`);

        testExtractConstant("extractConstant_Method",
            `class C {
    M() {
        let x = [#|1|];
    }
}`);

        testExtractConstant("extractConstant_Function",
            `function F() {
    let x = [#|1|];
}`);

        testExtractConstant("extractConstant_ExpressionStatement",
            `[#|"hello";|]`);

        testExtractConstant("extractConstant_ExpressionStatementExpression",
            `[#|"hello"|];`);

        testExtractConstant("extractConstant_BlockScopes_NoDependencies",
            `for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let x = [#|1|];
    }
}`);

        testExtractConstant("extractConstant_ClassInsertionPosition",
            `class C {
    a = 1;
    b = 2;
    M1() { }
    M2() { }
    M3() {
        let x = [#|1|];
    }
}`);

        testExtractConstantFailed("extractConstant_Parameters",
            `function F() {
    let w = 1;
    let x = [#|w + 1|];
}`);

        testExtractConstantFailed("extractConstant_TypeParameters",
            `function F<T>(t: T) {
    let x = [#|t + 1|];
}`);

        testExtractConstantFailed("extractConstant_BlockScopes_Dependencies",
            `for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let x = [#|i + 1|];
    }
}`);
    });

    // TODO (acasey): share?
    function testExtractConstant(caption: string, text: string) {
        it(caption, () => {
            Harness.Baseline.runBaseline(`extractConstant/${caption}.ts`, () => {
                const t = extractTest(text);
                const selectionRange = t.ranges.get("selection");
                if (!selectionRange) {
                    throw new Error(`Test ${caption} does not specify selection range`);
                }
                const f = {
                    path: "/a.ts",
                    content: t.source
                };
                const host = projectSystem.createServerHost([f, projectSystem.libFile]);
                const projectService = projectSystem.createProjectService(host);
                projectService.openClientFile(f.path);
                const program = projectService.inferredProjects[0].getLanguageService().getProgram();
                const sourceFile = program.getSourceFile(f.path);
                const context: RefactorContext = {
                    cancellationToken: { throwIfCancellationRequested() { }, isCancellationRequested() { return false; } },
                    newLineCharacter,
                    program,
                    file: sourceFile,
                    startPosition: selectionRange.start,
                    endPosition: selectionRange.end,
                    rulesProvider: getRuleProvider()
                };
                const rangeToExtract = refactor.extractSymbol.getRangeToExtract(sourceFile, createTextSpanFromBounds(selectionRange.start, selectionRange.end));
                assert.equal(rangeToExtract.errors, undefined, rangeToExtract.errors && "Range error: " + rangeToExtract.errors[0].messageText);
                const infos = refactor.extractSymbol.getAvailableActions(context);
                const actions = find(infos, info => info.description === Diagnostics.Extract_constant.message).actions;
                const data: string[] = [];
                data.push(`// ==ORIGINAL==`);
                data.push(sourceFile.text);
                for (const action of actions) {
                    const { renameLocation, edits } = refactor.extractSymbol.getEditsForAction(context, action.name);
                    assert.lengthOf(edits, 1);
                    data.push(`// ==SCOPE::${action.description}==`);
                    const newText = textChanges.applyChanges(sourceFile.text, edits[0].textChanges);
                    const newTextWithRename = newText.slice(0, renameLocation) + "/*RENAME*/" + newText.slice(renameLocation);
                    data.push(newTextWithRename);
                }
                return data.join(newLineCharacter);
            });
        });
    }

    // TODO (acasey): share?
    function testExtractConstantFailed(caption: string, text: string) {
        it(caption, () => {
            const t = extractTest(text);
            const selectionRange = t.ranges.get("selection");
            if (!selectionRange) {
                throw new Error(`Test ${caption} does not specify selection range`);
            }
            const f = {
                path: "/a.ts",
                content: t.source
            };
            const host = projectSystem.createServerHost([f, projectSystem.libFile]);
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(f.path);
            const program = projectService.inferredProjects[0].getLanguageService().getProgram();
            const sourceFile = program.getSourceFile(f.path);
            const context: RefactorContext = {
                cancellationToken: { throwIfCancellationRequested() { }, isCancellationRequested() { return false; } },
                newLineCharacter,
                program,
                file: sourceFile,
                startPosition: selectionRange.start,
                endPosition: selectionRange.end,
                rulesProvider: getRuleProvider()
            };
            const rangeToExtract = refactor.extractSymbol.getRangeToExtract(sourceFile, createTextSpanFromBounds(selectionRange.start, selectionRange.end));
            assert.isUndefined(rangeToExtract.errors, rangeToExtract.errors && "Range error: " + rangeToExtract.errors[0].messageText);
            const infos = refactor.extractSymbol.getAvailableActions(context);
            assert.isUndefined(find(infos, info => info.description === Diagnostics.Extract_constant.message));
        });
    }
}

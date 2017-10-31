/// <reference path="..\harness.ts" />
/// <reference path="tsserverProjectSystem.ts" />

namespace ts {
    export interface Range {
        start: number;
        end: number;
        name: string;
    }

    export interface Test {
        files: Map<{
            source: string;
            ranges: Map<Range>;
        }>;
    }

    export function extractTest(sources: Map<string>): Test {
        const files: Test["files"] = createMap();
        const entries = sources.entries();
        for (let {done, value} = entries.next(); !done; { done, value } = entries.next()) {
            const [ filename, source ] = value;
            const activeRanges: Range[] = [];
            let text = "";
            let lastPos = 0;
            let pos = 0;
            const ranges = createMap<Range>();
            const consumeIdentifier = () => {
                while (isIdentifierPart(source.charCodeAt(pos), ScriptTarget.Latest)) {
                    pos++;
                }
            };

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
            files.set(filename, { source: text, ranges });
        }
        return { files };
    }

    export const newLineCharacter = "\n";
    export const getRuleProvider = memoize(getRuleProviderInternal);
    function getRuleProviderInternal() {
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
        const rulesProvider = new formatting.RulesProvider();
        rulesProvider.ensureUpToDate(options);
        return rulesProvider;
    }

    const notImplementedHost: LanguageServiceHost = {
        getCompilationSettings: notImplemented,
        getScriptFileNames: notImplemented,
        getScriptVersion: notImplemented,
        getScriptSnapshot: notImplemented,
        getDefaultLibFileName: notImplemented,
        getCurrentDirectory: notImplemented,
    };

    export function testExtractSymbol(caption: string, files: Map<string>, baselineFolder: string, description: DiagnosticMessage, includeLib?: boolean) {
        const t = extractTest(files);
        const fsentries = arrayFrom(t.files.entries());
        const selectionRangeCandidates = filter(fsentries, t => !!t[1].ranges.get("selection"));
        if (!selectionRangeCandidates || !selectionRangeCandidates.length) {
            throw new Error(`Test ${caption} does not specify selection range`);
        }
        const selectionRange = selectionRangeCandidates[0][1].ranges.get("selection");

        [Extension.Ts, Extension.Js].forEach(extension =>
            it(`${caption} [${extension}]`, () => runBaseline(extension)));

        function runBaseline(extension: Extension) {
            const path = `/${selectionRangeCandidates[0][0]}${extension}`;
            const text = files.get(selectionRangeCandidates[0][0]);
            const program = makeProgram(map(fsentries, ([name, t]) => ({ path: `/${name}${extension}`, content: t.source })), includeLib);

            if (hasSyntacticDiagnostics(program)) {
                // Don't bother generating JS baselines for inputs that aren't valid JS.
                assert.equal(Extension.Js, extension, "Syntactic diagnostics found in non-JS file");
                return;
            }

            const sourceFile = program.getSourceFile(path);
            const context: RefactorContext = {
                cancellationToken: { throwIfCancellationRequested() { }, isCancellationRequested() { return false; } },
                newLineCharacter,
                program,
                file: sourceFile,
                startPosition: selectionRange.start,
                endPosition: selectionRange.end,
                host: notImplementedHost,
                rulesProvider: getRuleProvider()
            };
            const rangeToExtract = refactor.extractSymbol.getRangeToExtract(sourceFile, createTextSpanFromBounds(selectionRange.start, selectionRange.end));
            assert.equal(rangeToExtract.errors, undefined, rangeToExtract.errors && "Range error: " + rangeToExtract.errors[0].messageText);
            const infos = refactor.extractSymbol.getAvailableActions(context);
            const actions = find(infos, info => info.description === description.message).actions;

            Harness.Baseline.runBaseline(`${baselineFolder}/${caption}${extension}`, () => {
                const data: string[] = [];
                data.push(`// ==ORIGINAL==`);
                data.push(text.replace("[#|", "/*[#|*/").replace("|]", "/*|]*/"));
                for (const action of actions) {
                    const { renameLocation, edits } = refactor.extractSymbol.getEditsForAction(context, action.name);
                    assert.lengthOf(edits, 1);
                    data.push(`// ==SCOPE::${action.description}==`);
                    const newText = textChanges.applyChanges(sourceFile.text, edits[0].textChanges);
                    const newTextWithRename = newText.slice(0, renameLocation) + "/*RENAME*/" + newText.slice(renameLocation);
                    data.push(newTextWithRename);

                    const diagProgram = makeProgram(map(fsentries, ([name, t]) => (`/${name}${extension}` === path ? { path, content: newText } : { path: `/${name}${extension}`, content: t.source })), includeLib);
                    assert.isFalse(hasSyntacticDiagnostics(diagProgram));
                }
                return data.join(newLineCharacter);
            });
        }

        function makeProgram(f: {path: string, content: string }[], includeLib?: boolean) {
            const host = projectSystem.createServerHost(includeLib ? [...f, projectSystem.libFile] : f); // libFile is expensive to parse repeatedly - only test when required
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(f[f.length - 1].path);
            const program = projectService.inferredProjects[0].getLanguageService().getProgram();
            return program;
        }

        function hasSyntacticDiagnostics(program: Program) {
            const diags = program.getSyntacticDiagnostics();
            return length(diags) > 0;
        }
    }

    export function testExtractSymbolFailed(caption: string, files: Map<string>, description: DiagnosticMessage) {
        it(caption, () => {
            const t = extractTest(files);
            const fsentries = arrayFrom(t.files.entries());
            const selectionRangeCandidates = filter(fsentries, t => !!t[1].ranges.get("selection"));
            if (!selectionRangeCandidates || !selectionRangeCandidates.length) {
                throw new Error(`Test ${caption} does not specify selection range`);
            }
            const selectionRange = selectionRangeCandidates[0][1].ranges.get("selection");
            const testPath = `/${selectionRangeCandidates[0][0]}.ts`;

            const host = projectSystem.createServerHost([...map(fsentries, ([name, t]) => ({ path: `/${name}.ts`, content: t.source })), projectSystem.libFile]);
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(testPath);
            const program = projectService.inferredProjects[0].getLanguageService().getProgram();
            const sourceFile = program.getSourceFile(testPath);
            const context: RefactorContext = {
                cancellationToken: { throwIfCancellationRequested() { }, isCancellationRequested() { return false; } },
                newLineCharacter,
                program,
                file: sourceFile,
                startPosition: selectionRange.start,
                endPosition: selectionRange.end,
                host: notImplementedHost,
                rulesProvider: getRuleProvider()
            };
            const rangeToExtract = refactor.extractSymbol.getRangeToExtract(sourceFile, createTextSpanFromBounds(selectionRange.start, selectionRange.end));
            assert.isUndefined(rangeToExtract.errors, rangeToExtract.errors && "Range error: " + rangeToExtract.errors[0].messageText);
            const infos = refactor.extractSymbol.getAvailableActions(context);
            assert.isUndefined(find(infos, info => info.description === description.message));
        });
    }
}
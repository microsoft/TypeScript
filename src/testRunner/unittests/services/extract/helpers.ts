namespace ts {
    interface Range {
        pos: number;
        end: number;
        name: string;
    }

    interface Test {
        source: string;
        ranges: Map<Range>;
    }

    export function extractTest(source: string): Test {
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
                    activeRanges.push({ name, pos: text.length, end: undefined! }); // TODO: GH#18217
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
                const range = activeRanges.pop()!;
                if (hasProperty(ranges, range.name)) {
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

    export const newLineCharacter = "\n";

    export const notImplementedHost: LanguageServiceHost = {
        getCompilationSettings: notImplemented,
        getScriptFileNames: notImplemented,
        getScriptVersion: notImplemented,
        getScriptSnapshot: notImplemented,
        getDefaultLibFileName: notImplemented,
        getCurrentDirectory: notImplemented,
    };

    export function testExtractSymbol(caption: string, text: string, baselineFolder: string, description: DiagnosticMessage, includeLib?: boolean) {
        const t = extractTest(text);
        const selectionRange = t.ranges.get("selection")!;
        if (!selectionRange) {
            throw new Error(`Test ${caption} does not specify selection range`);
        }

        [Extension.Ts, Extension.Js].forEach(extension =>
            it(`${caption} [${extension}]`, () => runBaseline(extension)));

        function runBaseline(extension: Extension) {
            const path = "/a" + extension;
            const program = makeProgram({ path, content: t.source }, includeLib);

            if (hasSyntacticDiagnostics(program)) {
                // Don't bother generating JS baselines for inputs that aren't valid JS.
                assert.equal(Extension.Js, extension, "Syntactic diagnostics found in non-JS file");
                return;
            }

            const sourceFile = program.getSourceFile(path)!;
            const context: RefactorContext = {
                cancellationToken: { throwIfCancellationRequested: noop, isCancellationRequested: returnFalse },
                program,
                file: sourceFile,
                startPosition: selectionRange.pos,
                endPosition: selectionRange.end,
                host: notImplementedHost,
                formatContext: formatting.getFormatContext(testFormatSettings, notImplementedHost),
                preferences: emptyOptions,
            };
            const rangeToExtract = refactor.extractSymbol.getRangeToExtract(sourceFile, createTextSpanFromRange(selectionRange));
            assert.equal(rangeToExtract.errors, undefined, rangeToExtract.errors && "Range error: " + rangeToExtract.errors[0].messageText);
            const infos = refactor.extractSymbol.getAvailableActions(context);
            const actions = find(infos, info => info.description === description.message)!.actions;

            const data: string[] = [];
            data.push(`// ==ORIGINAL==`);
            data.push(text.replace("[#|", "/*[#|*/").replace("|]", "/*|]*/"));
            for (const action of actions) {
                const { renameLocation, edits } = refactor.extractSymbol.getEditsForAction(context, action.name)!;
                assert.lengthOf(edits, 1);
                data.push(`// ==SCOPE::${action.description}==`);
                const newText = textChanges.applyChanges(sourceFile.text, edits[0].textChanges);
                const newTextWithRename = newText.slice(0, renameLocation) + "/*RENAME*/" + newText.slice(renameLocation);
                data.push(newTextWithRename);

                const diagProgram = makeProgram({ path, content: newText }, includeLib);
                assert.isFalse(hasSyntacticDiagnostics(diagProgram));
            }
            Harness.Baseline.runBaseline(`${baselineFolder}/${caption}${extension}`, data.join(newLineCharacter));
        }

        function makeProgram(f: {path: string, content: string }, includeLib?: boolean) {
            const host = projectSystem.createServerHost(includeLib ? [f, projectSystem.libFile] : [f]); // libFile is expensive to parse repeatedly - only test when required
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(f.path);
            const program = projectService.inferredProjects[0].getLanguageService().getProgram()!;
            return program;
        }

        function hasSyntacticDiagnostics(program: Program) {
            const diags = program.getSyntacticDiagnostics();
            return length(diags) > 0;
        }
    }

    export function testExtractSymbolFailed(caption: string, text: string, description: DiagnosticMessage) {
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
            const program = projectService.inferredProjects[0].getLanguageService().getProgram()!;
            const sourceFile = program.getSourceFile(f.path)!;
            const context: RefactorContext = {
                cancellationToken: { throwIfCancellationRequested: noop, isCancellationRequested: returnFalse },
                program,
                file: sourceFile,
                startPosition: selectionRange.pos,
                endPosition: selectionRange.end,
                host: notImplementedHost,
                formatContext: formatting.getFormatContext(testFormatSettings, notImplementedHost),
                preferences: emptyOptions,
            };
            const rangeToExtract = refactor.extractSymbol.getRangeToExtract(sourceFile, createTextSpanFromRange(selectionRange));
            assert.isUndefined(rangeToExtract.errors, rangeToExtract.errors && "Range error: " + rangeToExtract.errors[0].messageText);
            const infos = refactor.extractSymbol.getAvailableActions(context);
            assert.isUndefined(find(infos, info => info.description === description.message));
        });
    }
}

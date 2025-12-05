import { incrementalVerifier } from "../../../../harness/incrementalUtils.js";
import { createHasErrorMessageLogger } from "../../../../harness/tsserverLogger.js";
import * as Harness from "../../../_namespaces/Harness.js";
import * as ts from "../../../_namespaces/ts.js";
import { customTypesMap } from "../../helpers/typingsInstaller.js";
import { TestServerHost } from "../../helpers/virtualFileSystemWithWatch.js";

export interface TestProjectServiceOptions extends ts.server.ProjectServiceOptions {
    host: TestServerHost;
}
export type TestProjectServicePartialOptionsAndHost = Partial<Omit<TestProjectServiceOptions, "typingsInstaller" | "logger" | "host">> & Pick<TestProjectServiceOptions, "host">;

export class TestProjectService extends ts.server.ProjectService {
    constructor(optsOrHost: TestServerHost | TestProjectServicePartialOptionsAndHost) {
        // eslint-disable-next-line local/no-in-operator
        const opts = "host" in optsOrHost ?
            optsOrHost :
            { host: optsOrHost };
        super({
            logger: createHasErrorMessageLogger(),
            session: undefined,
            cancellationToken: ts.server.nullCancellationToken,
            useSingleInferredProject: false,
            useInferredProjectPerProjectRoot: false,
            typesMapLocation: customTypesMap.path,
            incrementalVerifier,
            ...opts,
        });
    }
}

interface Range {
    pos: number;
    end: number;
    name: string;
}

interface Test {
    source: string;
    ranges: Map<string, Range>;
}

export function extractTest(source: string): Test {
    const activeRanges: Range[] = [];
    let text = "";
    let lastPos = 0;
    let pos = 0;
    const ranges = new Map<string, Range>();

    while (pos < source.length) {
        if (
            source.charCodeAt(pos) === ts.CharacterCodes.openBracket &&
            (source.charCodeAt(pos + 1) === ts.CharacterCodes.hash || source.charCodeAt(pos + 1) === ts.CharacterCodes.$)
        ) {
            const saved = pos;
            pos += 2;
            const s = pos;
            consumeIdentifier();
            const e = pos;
            if (source.charCodeAt(pos) === ts.CharacterCodes.bar) {
                pos++;
                text += source.substring(lastPos, saved);
                const name = s === e
                    ? source.charCodeAt(saved + 1) === ts.CharacterCodes.hash ? "selection" : "extracted"
                    : source.substring(s, e);
                activeRanges.push({ name, pos: text.length, end: undefined! }); // TODO: GH#18217
                lastPos = pos;
                continue;
            }
            else {
                pos = saved;
            }
        }
        else if (source.charCodeAt(pos) === ts.CharacterCodes.bar && source.charCodeAt(pos + 1) === ts.CharacterCodes.closeBracket) {
            text += source.substring(lastPos, pos);
            activeRanges[activeRanges.length - 1].end = text.length;
            const range = activeRanges.pop()!;
            if (ts.hasProperty(ranges, range.name)) {
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
        while (ts.isIdentifierPart(source.charCodeAt(pos), ts.ScriptTarget.Latest)) {
            pos++;
        }
    }
    return { source: text, ranges };
}

export const newLineCharacter = "\n";

export const notImplementedHost: ts.LanguageServiceHost = {
    getCompilationSettings: ts.notImplemented,
    getScriptFileNames: ts.notImplemented,
    getScriptVersion: ts.notImplemented,
    getScriptSnapshot: ts.notImplemented,
    getDefaultLibFileName: ts.notImplemented,
    getCurrentDirectory: ts.notImplemented,
    readFile: ts.notImplemented,
    fileExists: ts.notImplemented,
};

export function testExtractSymbol(caption: string, text: string, baselineFolder: string, description: ts.DiagnosticMessage): void {
    const t = extractTest(text);
    const selectionRange = t.ranges.get("selection")!;
    if (!selectionRange) {
        throw new Error(`Test ${caption} does not specify selection range`);
    }

    [ts.Extension.Ts, ts.Extension.Js].forEach(extension => it(`${caption} [${extension}]`, () => runBaseline(extension)));

    function runBaseline(extension: ts.Extension) {
        const path = "/home/src/workspaces/project/a" + extension;
        const { program } = makeProgram({ path, content: t.source });

        if (hasSyntacticDiagnostics(program)) {
            // Don't bother generating JS baselines for inputs that aren't valid JS.
            assert.equal(ts.Extension.Js, extension, "Syntactic diagnostics found in non-JS file");
            return;
        }

        const sourceFile = program.getSourceFile(path)!;
        const context: ts.RefactorContext = {
            cancellationToken: { throwIfCancellationRequested: ts.noop, isCancellationRequested: ts.returnFalse },
            program,
            file: sourceFile,
            startPosition: selectionRange.pos,
            endPosition: selectionRange.end,
            host: notImplementedHost,
            formatContext: ts.formatting.getFormatContext(ts.testFormatSettings, notImplementedHost),
            preferences: ts.emptyOptions,
        };
        const rangeToExtract = ts.refactor.extractSymbol.getRangeToExtract(sourceFile, ts.createTextSpanFromRange(selectionRange));
        assert.equal(rangeToExtract.errors, undefined, rangeToExtract.errors && "Range error: " + rangeToExtract.errors[0].messageText);
        const infos = ts.refactor.extractSymbol.getRefactorActionsToExtractSymbol(context);
        const actions = ts.find(infos, info => info.description === description.message)!.actions;

        const data: string[] = [];
        data.push(`// ==ORIGINAL==`);
        data.push(text.replace("[#|", "/*[#|*/").replace("|]", "/*|]*/"));
        for (const action of actions) {
            const { renameLocation, edits } = ts.refactor.extractSymbol.getRefactorEditsToExtractSymbol(context, action.name)!;
            assert.lengthOf(edits, 1);
            data.push(`// ==SCOPE::${action.description}==`);
            const newText = ts.textChanges.applyChanges(sourceFile.text, edits[0].textChanges);
            const newTextWithRename = newText.slice(0, renameLocation) + "/*RENAME*/" + newText.slice(renameLocation);
            data.push(newTextWithRename);

            const { program: diagProgram } = makeProgram({ path, content: newText });
            assert.isFalse(hasSyntacticDiagnostics(diagProgram));
        }
        Harness.Baseline.runBaseline(`${baselineFolder}/${caption}${extension}`, data.join(newLineCharacter));
    }

    function makeProgram(f: { path: string; content: string; }) {
        const host = TestServerHost.createServerHost([f]); // libFile is expensive to parse repeatedly - only test when required
        const projectService = new TestProjectService(host);
        projectService.openClientFile(f.path);
        const program = projectService.inferredProjects[0].getLanguageService().getProgram()!;
        const autoImportProvider = projectService.inferredProjects[0].getLanguageService().getAutoImportProvider();
        return { program, autoImportProvider };
    }

    function hasSyntacticDiagnostics(program: ts.Program) {
        const diags = program.getSyntacticDiagnostics();
        return ts.length(diags) > 0;
    }
}

export function testExtractSymbolFailed(caption: string, text: string, description: ts.DiagnosticMessage): void {
    it(caption, () => {
        const t = extractTest(text);
        const selectionRange = t.ranges.get("selection");
        if (!selectionRange) {
            throw new Error(`Test ${caption} does not specify selection range`);
        }
        const f = {
            path: "/home/src/workspaces/project/a.ts",
            content: t.source,
        };
        const host = TestServerHost.createServerHost([f]);
        const projectService = new TestProjectService(host);
        projectService.openClientFile(f.path);
        const program = projectService.inferredProjects[0].getLanguageService().getProgram()!;
        const sourceFile = program.getSourceFile(f.path)!;
        const context: ts.RefactorContext = {
            cancellationToken: { throwIfCancellationRequested: ts.noop, isCancellationRequested: ts.returnFalse },
            program,
            file: sourceFile,
            startPosition: selectionRange.pos,
            endPosition: selectionRange.end,
            host: notImplementedHost,
            formatContext: ts.formatting.getFormatContext(ts.testFormatSettings, notImplementedHost),
            preferences: ts.emptyOptions,
        };
        const rangeToExtract = ts.refactor.extractSymbol.getRangeToExtract(sourceFile, ts.createTextSpanFromRange(selectionRange));
        assert.isUndefined(rangeToExtract.errors, rangeToExtract.errors && "Range error: " + rangeToExtract.errors[0].messageText);
        const infos = ts.refactor.extractSymbol.getRefactorActionsToExtractSymbol(context);
        assert.isUndefined(ts.find(infos, info => info.description === description.message));
    });
}

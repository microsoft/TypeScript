import { ExpectedDiagnosticMessage, ExpectedErrorDiagnostic, ExpectedDiagnostic, SolutionBuilderHost, version, ExpectedDiagnosticLocation, System } from "../../fakes";
import { Diagnostics, isBuildInfoFile, getBuildInfo, getBuildInfoText, TestFSWithWatch, notImplemented, mapDefinedIterator, BundleFileInfo, length, emptyArray, BundleFileSectionKind, Debug, first, last, BundleFileSection, CompilerOptions, getOutputPathsForBundle, BuildKind, TscCompile, TscCompileSystem, tscCompile, verifyTscBaseline, createSolutionBuilder, arrayFrom } from "../../ts";
import { FileSystem, createResolver, Mount, FileSet, FileSystemResolverHost } from "../../vfs";
import { IO, SourceMapRecorder, Compiler } from "../../Harness";
import { resolve } from "../../vpath";
import * as ts from "../../ts";
export function errorDiagnostic(message: ExpectedDiagnosticMessage): ExpectedErrorDiagnostic {
    return { message };
}
export function getExpectedDiagnosticForProjectsInBuild(...projects: string[]): ExpectedDiagnostic {
    return [Diagnostics.Projects_in_this_build_Colon_0, projects.map(p => "\r\n    * " + p).join("")];
}
export function changeCompilerVersion(host: SolutionBuilderHost) {
    const originalReadFile = host.readFile;
    host.readFile = path => {
        const value = originalReadFile.call(host, path);
        if (!value || !isBuildInfoFile(path))
            return value;
        const buildInfo = getBuildInfo(value);
        buildInfo.version = version;
        return getBuildInfoText(buildInfo);
    };
}
export function replaceText(fs: FileSystem, path: string, oldText: string, newText: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const old = fs.readFileSync(path, "utf-8");
    if (old.indexOf(oldText) < 0) {
        throw new Error(`Text "${oldText}" does not exist in file ${path}`);
    }
    const newContent = old.replace(oldText, newText);
    fs.writeFileSync(path, newContent, "utf-8");
}
export function prependText(fs: FileSystem, path: string, additionalContent: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const old = fs.readFileSync(path, "utf-8");
    fs.writeFileSync(path, `${additionalContent}${old}`, "utf-8");
}
export function appendText(fs: FileSystem, path: string, additionalContent: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const old = fs.readFileSync(path, "utf-8");
    fs.writeFileSync(path, `${old}${additionalContent}`);
}
export function indexOf(fs: FileSystem, path: string, searchStr: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const content = fs.readFileSync(path, "utf-8");
    return content.indexOf(searchStr);
}
export function lastIndexOf(fs: FileSystem, path: string, searchStr: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const content = fs.readFileSync(path, "utf-8");
    return content.lastIndexOf(searchStr);
}
export function expectedLocationIndexOf(fs: FileSystem, file: string, searchStr: string): ExpectedDiagnosticLocation {
    return {
        file,
        start: indexOf(fs, file, searchStr),
        length: searchStr.length
    };
}
export function expectedLocationLastIndexOf(fs: FileSystem, file: string, searchStr: string): ExpectedDiagnosticLocation {
    return {
        file,
        start: lastIndexOf(fs, file, searchStr),
        length: searchStr.length
    };
}
export function getTime() {
    let currentTime = 100;
    return { tick, time, touch };
    function tick() {
        currentTime += 60000;
    }
    function time() {
        return currentTime;
    }
    function touch(fs: FileSystem, path: string) {
        if (!fs.statSync(path).isFile()) {
            throw new Error(`File ${path} does not exist`);
        }
        fs.utimesSync(path, new Date(time()), new Date(time()));
    }
}
export const libContent = `${TestFSWithWatch.libFile.content}
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };`;
export const symbolLibContent = `
interface SymbolConstructor {
    readonly species: symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
`;
/**
 * Load project from disk into /src folder
 */
export function loadProjectFromDisk(root: string, libContentToAppend?: string): FileSystem {
    const resolver = createResolver(IO);
    const fs = new FileSystem(/*ignoreCase*/ true, {
        files: {
            ["/src"]: new Mount(resolve(IO.getWorkspaceRoot(), root), resolver)
        },
        cwd: "/",
        meta: { defaultLibLocation: "/lib" },
    });
    addLibAndMakeReadonly(fs, libContentToAppend);
    return fs;
}
/**
 * All the files must be in /src
 */
export function loadProjectFromFiles(files: FileSet, libContentToAppend?: string): FileSystem {
    const fs = new FileSystem(/*ignoreCase*/ true, {
        files,
        cwd: "/",
        meta: { defaultLibLocation: "/lib" },
    });
    addLibAndMakeReadonly(fs, libContentToAppend);
    return fs;
}
function addLibAndMakeReadonly(fs: FileSystem, libContentToAppend?: string) {
    fs.mkdirSync("/lib");
    fs.writeFileSync("/lib/lib.d.ts", libContentToAppend ? `${libContent}${libContentToAppend}` : libContent);
    fs.makeReadonly();
}
/**
 * Gets the FS mountuing existing fs's /src and /lib folder
 */
export function getFsWithTime(baseFs: FileSystem) {
    const { time, tick } = getTime();
    const host = (new System(baseFs) as any as FileSystemResolverHost);
    host.getWorkspaceRoot = notImplemented;
    const resolver = createResolver(host);
    const fs = new FileSystem(/*ignoreCase*/ true, {
        files: {
            ["/src"]: new Mount("/src", resolver),
            ["/lib"]: new Mount("/lib", resolver)
        },
        cwd: "/",
        meta: { defaultLibLocation: "/lib" },
        time
    });
    return { fs, time, tick };
}
export function verifyOutputsPresent(fs: FileSystem, outputs: readonly string[]) {
    for (const output of outputs) {
        assert(fs.existsSync(output), `Expect file ${output} to exist`);
    }
}
export function verifyOutputsAbsent(fs: FileSystem, outputs: readonly string[]) {
    for (const output of outputs) {
        assert.isFalse(fs.existsSync(output), `Expect file ${output} to not exist`);
    }
}
export function generateSourceMapBaselineFiles(sys: ts.System & {
    writtenFiles: ts.Map<any>;
}) {
    const mapFileNames = mapDefinedIterator(sys.writtenFiles.keys(), f => f.endsWith(".map") ? f : undefined);
    while (true) {
        const { value: mapFile, done } = mapFileNames.next();
        if (done)
            break;
        const text = SourceMapRecorder.getSourceMapRecordWithSystem(sys, mapFile);
        sys.writeFile(`${mapFile}.baseline.txt`, text);
    }
}
function generateBundleFileSectionInfo(sys: ts.System, originalReadCall: ts.System["readFile"], baselineRecorder: Compiler.WriterAggregator, bundleFileInfo: BundleFileInfo | undefined, outFile: string | undefined) {
    if (!length(bundleFileInfo && bundleFileInfo.sections) && !outFile)
        return; // Nothing to baseline
    const content = outFile && sys.fileExists(outFile) ? originalReadCall.call(sys, outFile, "utf8")! : "";
    baselineRecorder.WriteLine("======================================================================");
    baselineRecorder.WriteLine(`File:: ${outFile}`);
    for (const section of bundleFileInfo ? bundleFileInfo.sections : emptyArray) {
        baselineRecorder.WriteLine("----------------------------------------------------------------------");
        writeSectionHeader(section);
        if (section.kind !== BundleFileSectionKind.Prepend) {
            writeTextOfSection(section.pos, section.end);
        }
        else if (section.texts.length > 0) {
            Debug.assert(section.pos === first(section.texts).pos);
            Debug.assert(section.end === last(section.texts).end);
            for (const text of section.texts) {
                baselineRecorder.WriteLine(">>--------------------------------------------------------------------");
                writeSectionHeader(text);
                writeTextOfSection(text.pos, text.end);
            }
        }
        else {
            Debug.assert(section.pos === section.end);
        }
    }
    baselineRecorder.WriteLine("======================================================================");
    function writeTextOfSection(pos: number, end: number) {
        const textLines = content.substring(pos, end).split(/\r?\n/);
        for (const line of textLines) {
            baselineRecorder.WriteLine(line);
        }
    }
    function writeSectionHeader(section: BundleFileSection) {
        baselineRecorder.WriteLine(`${section.kind}: (${section.pos}-${section.end})${section.data ? ":: " + section.data : ""}${section.kind === BundleFileSectionKind.Prepend ? " texts:: " + section.texts.length : ""}`);
    }
}
export function baselineBuildInfo(options: CompilerOptions, sys: ts.System & {
    writtenFiles: ts.Map<any>;
}, originalReadCall?: ts.System["readFile"]) {
    const out = options.outFile || options.out;
    if (!out)
        return;
    const { buildInfoPath, jsFilePath, declarationFilePath } = getOutputPathsForBundle(options, /*forceDts*/ false);
    if (!buildInfoPath || !sys.writtenFiles.has(buildInfoPath))
        return;
    if (!sys.fileExists(buildInfoPath))
        return;
    const buildInfo = getBuildInfo(((originalReadCall || sys.readFile).call(sys, buildInfoPath, "utf8")!));
    const bundle = buildInfo.bundle;
    if (!bundle || (!length(bundle.js && bundle.js.sections) && !length(bundle.dts && bundle.dts.sections)))
        return;
    // Write the baselines:
    const baselineRecorder = new Compiler.WriterAggregator();
    generateBundleFileSectionInfo(sys, originalReadCall || sys.readFile, baselineRecorder, bundle.js, jsFilePath);
    generateBundleFileSectionInfo(sys, originalReadCall || sys.readFile, baselineRecorder, bundle.dts, declarationFilePath);
    baselineRecorder.Close();
    const text = baselineRecorder.lines.join("\r\n");
    sys.writeFile(`${buildInfoPath}.baseline.txt`, text);
}
export interface TscIncremental {
    buildKind: BuildKind;
    modifyFs: (fs: FileSystem) => void;
    subScenario?: string;
    commandLineArgs?: readonly string[];
}
export interface VerifyTsBuildInput extends TscCompile {
    incrementalScenarios: TscIncremental[];
}
export function verifyTscIncrementalEdits({ subScenario, fs, scenario, commandLineArgs, baselineSourceMap, modifyFs, baselineReadFileCalls, incrementalScenarios }: VerifyTsBuildInput) {
    describe(`tsc ${commandLineArgs.join(" ")} ${scenario}:: ${subScenario}`, () => {
        let tick: () => void;
        let sys: TscCompileSystem;
        before(() => {
            let baseFs: FileSystem;
            ({ fs: baseFs, tick } = getFsWithTime(fs()));
            sys = tscCompile({
                scenario,
                subScenario,
                fs: () => baseFs.makeReadonly(),
                commandLineArgs,
                modifyFs: fs => {
                    if (modifyFs)
                        modifyFs(fs);
                    tick();
                },
                baselineSourceMap,
                baselineReadFileCalls
            });
            Debug.assert(!!incrementalScenarios.length, `${scenario}/${subScenario}:: No incremental scenarios, you probably want to use verifyTsc instead.`);
        });
        after(() => {
            sys = undefined!;
            tick = undefined!;
        });
        describe("initialBuild", () => {
            verifyTscBaseline(() => sys);
        });
        for (const { buildKind, modifyFs, subScenario: incrementalSubScenario, commandLineArgs: incrementalCommandLineArgs } of incrementalScenarios) {
            describe(incrementalSubScenario || buildKind, () => {
                let newSys: TscCompileSystem;
                before(() => {
                    Debug.assert(buildKind !== BuildKind.Initial, "Incremental edit cannot be initial compilation");
                    tick();
                    newSys = tscCompile({
                        scenario,
                        subScenario: incrementalSubScenario || subScenario,
                        buildKind,
                        fs: () => sys.vfs,
                        commandLineArgs: incrementalCommandLineArgs || commandLineArgs,
                        modifyFs: fs => {
                            tick();
                            modifyFs(fs);
                            tick();
                        },
                        baselineSourceMap,
                        baselineReadFileCalls
                    });
                });
                after(() => {
                    newSys = undefined!;
                });
                verifyTscBaseline(() => newSys);
                it(`Verify emit output file text is same when built clean`, () => {
                    const sys = tscCompile({
                        scenario,
                        subScenario,
                        fs: () => newSys.vfs,
                        commandLineArgs,
                        modifyFs: fs => {
                            tick();
                            // Delete output files
                            const host = SolutionBuilderHost.create(fs);
                            const builder = createSolutionBuilder(host, commandLineArgs, { clean: true });
                            builder.clean();
                        },
                    });
                    for (const outputFile of arrayFrom(sys.writtenFiles.keys())) {
                        const expectedText = sys.readFile(outputFile);
                        const actualText = newSys.readFile(outputFile);
                        assert.equal(actualText, expectedText, `File: ${outputFile}`);
                    }
                });
            });
        }
    });
}
export function enableStrict(fs: FileSystem, path: string) {
    replaceText(fs, path, `"strict": false`, `"strict": true`);
}
export function addTestPrologue(fs: FileSystem, path: string, prologue: string) {
    prependText(fs, path, `${prologue}
`);
}
export function addShebang(fs: FileSystem, project: string, file: string) {
    prependText(fs, `src/${project}/${file}.ts`, `#!someshebang ${project} ${file}
`);
}
export function restContent(project: string, file: string) {
    return `function for${project}${file}Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}`;
}
function nonrestContent(project: string, file: string) {
    return `function for${project}${file}Rest() { }`;
}
export function addRest(fs: FileSystem, project: string, file: string) {
    appendText(fs, `src/${project}/${file}.ts`, restContent(project, file));
}
export function removeRest(fs: FileSystem, project: string, file: string) {
    replaceText(fs, `src/${project}/${file}.ts`, restContent(project, file), nonrestContent(project, file));
}
export function addStubFoo(fs: FileSystem, project: string, file: string) {
    appendText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file));
}
export function changeStubToRest(fs: FileSystem, project: string, file: string) {
    replaceText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file), restContent(project, file));
}
export function addSpread(fs: FileSystem, project: string, file: string) {
    const path = `src/${project}/${file}.ts`;
    const content = fs.readFileSync(path, "utf8");
    fs.writeFileSync(path, `${content}
function ${project}${file}Spread(...b: number[]) { }
${project}${file}Spread(...[10, 20, 30]);`);
    replaceText(fs, `src/${project}/tsconfig.json`, `"strict": false,`, `"strict": false,
    "downlevelIteration": true,`);
}
export function getTripleSlashRef(project: string) {
    return `/src/${project}/tripleRef.d.ts`;
}
export function addTripleSlashRef(fs: FileSystem, project: string, file: string) {
    fs.writeFileSync(getTripleSlashRef(project), `declare class ${project}${file} { }`);
    prependText(fs, `src/${project}/${file}.ts`, `///<reference path="./tripleRef.d.ts"/>
const ${file}Const = new ${project}${file}();
`);
}

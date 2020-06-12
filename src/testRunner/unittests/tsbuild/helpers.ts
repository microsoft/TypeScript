namespace ts {
    export function errorDiagnostic(message: fakes.ExpectedDiagnosticMessage): fakes.ExpectedErrorDiagnostic {
        return { message };
    }

    export function getExpectedDiagnosticForProjectsInBuild(...projects: string[]): fakes.ExpectedDiagnostic {
        return [Diagnostics.Projects_in_this_build_Colon_0, projects.map(p => "\r\n    * " + p).join("")];
    }

    export function changeCompilerVersion(host: fakes.SolutionBuilderHost) {
        const originalReadFile = host.readFile;
        host.readFile = path => {
            const value = originalReadFile.call(host, path);
            if (!value || !isBuildInfoFile(path)) return value;
            const buildInfo = getBuildInfo(value);
            buildInfo.version = fakes.version;
            return getBuildInfoText(buildInfo);
        };
    }

    export function replaceText(fs: vfs.FileSystem, path: string, oldText: string, newText: string) {
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

    export function prependText(fs: vfs.FileSystem, path: string, additionalContent: string) {
        if (!fs.statSync(path).isFile()) {
            throw new Error(`File ${path} does not exist`);
        }
        const old = fs.readFileSync(path, "utf-8");
        fs.writeFileSync(path, `${additionalContent}${old}`, "utf-8");
    }

    export function appendText(fs: vfs.FileSystem, path: string, additionalContent: string) {
        if (!fs.statSync(path).isFile()) {
            throw new Error(`File ${path} does not exist`);
        }
        const old = fs.readFileSync(path, "utf-8");
        fs.writeFileSync(path, `${old}${additionalContent}`);
    }

    export function indexOf(fs: vfs.FileSystem, path: string, searchStr: string) {
        if (!fs.statSync(path).isFile()) {
            throw new Error(`File ${path} does not exist`);
        }
        const content = fs.readFileSync(path, "utf-8");
        return content.indexOf(searchStr);
    }

    export function lastIndexOf(fs: vfs.FileSystem, path: string, searchStr: string) {
        if (!fs.statSync(path).isFile()) {
            throw new Error(`File ${path} does not exist`);
        }
        const content = fs.readFileSync(path, "utf-8");
        return content.lastIndexOf(searchStr);
    }

    export function expectedLocationIndexOf(fs: vfs.FileSystem, file: string, searchStr: string): fakes.ExpectedDiagnosticLocation {
        return {
            file,
            start: indexOf(fs, file, searchStr),
            length: searchStr.length
        };
    }

    export function expectedLocationLastIndexOf(fs: vfs.FileSystem, file: string, searchStr: string): fakes.ExpectedDiagnosticLocation {
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
            currentTime += 60_000;
        }

        function time() {
            return currentTime;
        }

        function touch(fs: vfs.FileSystem, path: string) {
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
    export function loadProjectFromDisk(
        root: string,
        libContentToAppend?: string
    ): vfs.FileSystem {
        const resolver = vfs.createResolver(Harness.IO);
        const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
            files: {
                ["/src"]: new vfs.Mount(vpath.resolve(Harness.IO.getWorkspaceRoot(), root), resolver)
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
    export function loadProjectFromFiles(
        files: vfs.FileSet,
        libContentToAppend?: string
    ): vfs.FileSystem {
        const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
            files,
            cwd: "/",
            meta: { defaultLibLocation: "/lib" },
        });
        addLibAndMakeReadonly(fs, libContentToAppend);
        return fs;
    }

    function addLibAndMakeReadonly(fs: vfs.FileSystem, libContentToAppend?: string) {
        fs.mkdirSync("/lib");
        fs.writeFileSync("/lib/lib.d.ts", libContentToAppend ? `${libContent}${libContentToAppend}` : libContent);
        fs.makeReadonly();
    }

    /**
     * Gets the FS mountuing existing fs's /src and /lib folder
     */
    export function getFsWithTime(baseFs: vfs.FileSystem) {
        const { time, tick } = getTime();
        const host = new fakes.System(baseFs) as any as vfs.FileSystemResolverHost;
        host.getWorkspaceRoot = notImplemented;
        const resolver = vfs.createResolver(host);
        const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
            files: {
                ["/src"]: new vfs.Mount("/src", resolver),
                ["/lib"]: new vfs.Mount("/lib", resolver)
            },
            cwd: "/",
            meta: { defaultLibLocation: "/lib" },
            time
        });
        return { fs, time, tick };
    }

    export function verifyOutputsPresent(fs: vfs.FileSystem, outputs: readonly string[]) {
        for (const output of outputs) {
            assert(fs.existsSync(output), `Expect file ${output} to exist`);
        }
    }

    export function verifyOutputsAbsent(fs: vfs.FileSystem, outputs: readonly string[]) {
        for (const output of outputs) {
            assert.isFalse(fs.existsSync(output), `Expect file ${output} to not exist`);
        }
    }

    export function generateSourceMapBaselineFiles(sys: System & { writtenFiles: Map<any>; }) {
        const mapFileNames = mapDefinedIterator(sys.writtenFiles.keys(), f => f.endsWith(".map") ? f : undefined);
        while (true) {
            const { value: mapFile, done } = mapFileNames.next();
            if (done) break;
            const text = Harness.SourceMapRecorder.getSourceMapRecordWithSystem(sys, mapFile);
            sys.writeFile(`${mapFile}.baseline.txt`, text);
        }
    }

    function generateBundleFileSectionInfo(sys: System, originalReadCall: System["readFile"], baselineRecorder: Harness.Compiler.WriterAggregator, bundleFileInfo: BundleFileInfo | undefined, outFile: string | undefined) {
        if (!length(bundleFileInfo && bundleFileInfo.sections) && !outFile) return; // Nothing to baseline

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

    export function baselineBuildInfo(
        options: CompilerOptions,
        sys: System & { writtenFiles: Map<any>; },
        originalReadCall?: System["readFile"]
    ) {
        const out = outFile(options);
        if (!out) return;
        const { buildInfoPath, jsFilePath, declarationFilePath } = getOutputPathsForBundle(options, /*forceDts*/ false);
        if (!buildInfoPath || !sys.writtenFiles.has(buildInfoPath)) return;
        if (!sys.fileExists(buildInfoPath)) return;

        const buildInfo = getBuildInfo((originalReadCall || sys.readFile).call(sys, buildInfoPath, "utf8")!);
        const bundle = buildInfo.bundle;
        if (!bundle || (!length(bundle.js && bundle.js.sections) && !length(bundle.dts && bundle.dts.sections))) return;

        // Write the baselines:
        const baselineRecorder = new Harness.Compiler.WriterAggregator();
        generateBundleFileSectionInfo(sys, originalReadCall || sys.readFile, baselineRecorder, bundle.js, jsFilePath);
        generateBundleFileSectionInfo(sys, originalReadCall || sys.readFile, baselineRecorder, bundle.dts, declarationFilePath);
        baselineRecorder.Close();

        const text = baselineRecorder.lines.join("\r\n");
        sys.writeFile(`${buildInfoPath}.baseline.txt`, text);
    }

    interface VerifyIncrementalCorrectness {
        scenario: TscCompile["scenario"];
        subScenario: TscCompile["subScenario"];
        commandLineArgs: TscCompile["commandLineArgs"];
        modifyFs: TscCompile["modifyFs"];
        incrementalModifyFs: TscIncremental["modifyFs"];
        tick: () => void;
        baseFs: vfs.FileSystem;
        newSys: TscCompileSystem;
    }
    function verifyIncrementalCorrectness(input: () => VerifyIncrementalCorrectness, index: number) {
        it(`Verify emit output file text is same when built clean for incremental scenario at:: ${index}`, () => {
            const {
                scenario, subScenario, commandLineArgs,
                modifyFs, incrementalModifyFs,
                tick, baseFs, newSys
            } = input();
            const sys = tscCompile({
                scenario,
                subScenario,
                fs: () => baseFs.makeReadonly(),
                commandLineArgs,
                modifyFs: fs => {
                    tick();
                    if (modifyFs) modifyFs(fs);
                    incrementalModifyFs(fs);
                },
            });
            for (const outputFile of arrayFrom(sys.writtenFiles.keys())) {
                const expectedText = sys.readFile(outputFile);
                const actualText = newSys.readFile(outputFile);
                if (!isBuildInfoFile(outputFile)) {
                    assert.equal(actualText, expectedText, `File: ${outputFile}`);
                }
                else if (actualText !== expectedText) {
                    // Verify build info without affectedFilesPendingEmit
                    const { text: actualBuildInfoText, affectedFilesPendingEmit: actualAffectedFilesPendingEmit } = getBuildInfoWithoutAffectedFilesPendingEmit(actualText);
                    const { text: expectedBuildInfoText, affectedFilesPendingEmit: expectedAffectedFilesPendingEmit } = getBuildInfoWithoutAffectedFilesPendingEmit(expectedText);
                    assert.equal(actualBuildInfoText, expectedBuildInfoText, `TsBuild info text without affectedFilesPendingEmit: ${outputFile}::\nIncremental buildInfoText:: ${actualText}\nClean buildInfoText:: ${expectedText}`);
                    // Verify that incrementally pending affected file emit are in clean build since clean build can contain more files compared to incremental depending of noEmitOnError option
                    if (actualAffectedFilesPendingEmit) {
                        assert.isDefined(expectedAffectedFilesPendingEmit, `Incremental build contains affectedFilesPendingEmit, clean build should also have it: ${outputFile}::\nIncremental buildInfoText:: ${actualText}\nClean buildInfoText:: ${expectedText}`);
                        let expectedIndex = 0;
                        actualAffectedFilesPendingEmit.forEach(([actualFile]) => {
                            expectedIndex = findIndex(expectedAffectedFilesPendingEmit!, ([expectedFile]) => actualFile === expectedFile, expectedIndex);
                            assert.notEqual(expectedIndex, -1, `Incremental build contains ${actualFile} file as pending emit, clean build should also have it: ${outputFile}::\nIncremental buildInfoText:: ${actualText}\nClean buildInfoText:: ${expectedText}`);
                            expectedIndex++;
                        });
                    }
                }
            }
        });
    }

    function getBuildInfoWithoutAffectedFilesPendingEmit(text: string | undefined): { text: string | undefined; affectedFilesPendingEmit?: ProgramBuildInfo["affectedFilesPendingEmit"]; } {
        const buildInfo = text ? getBuildInfo(text) : undefined;
        if (!buildInfo?.program?.affectedFilesPendingEmit) return { text };
        const { program: { affectedFilesPendingEmit, ...programRest }, ...rest } = buildInfo;
        return {
            text: getBuildInfoText({
                ...rest,
                program: programRest
            }),
            affectedFilesPendingEmit
        };
    }

    export interface TscIncremental {
        buildKind: BuildKind;
        modifyFs: (fs: vfs.FileSystem) => void;
        subScenario?: string;
        commandLineArgs?: readonly string[];
    }

    export interface VerifyTsBuildInput extends VerifyTsBuildInputWorker {
        baselineIncremental?: boolean;
    }

    export function verifyTscIncrementalEdits(input: VerifyTsBuildInput) {
        verifyTscIncrementalEditsWorker(input);
        if (input.baselineIncremental) {
            verifyTscIncrementalEditsWorker({
                ...input,
                subScenario: `${input.subScenario} with incremental`,
                commandLineArgs: [...input.commandLineArgs, "--incremental"],
            });
        }
    }

    export interface VerifyTsBuildInputWorker extends TscCompile {
        incrementalScenarios: TscIncremental[];
    }
    function verifyTscIncrementalEditsWorker({
        subScenario, fs, scenario, commandLineArgs,
        baselineSourceMap, modifyFs, baselineReadFileCalls, baselinePrograms,
        incrementalScenarios
    }: VerifyTsBuildInputWorker) {
        describe(`tsc ${commandLineArgs.join(" ")} ${scenario}:: ${subScenario}`, () => {
            let tick: () => void;
            let sys: TscCompileSystem;
            let baseFs: vfs.FileSystem;
            before(() => {
                ({ fs: baseFs, tick } = getFsWithTime(fs()));
                sys = tscCompile({
                    scenario,
                    subScenario,
                    fs: () => baseFs.makeReadonly(),
                    commandLineArgs,
                    modifyFs: fs => {
                        if (modifyFs) modifyFs(fs);
                        tick();
                    },
                    baselineSourceMap,
                    baselineReadFileCalls,
                    baselinePrograms
                });
                Debug.assert(!!incrementalScenarios.length, `${scenario}/${subScenario}:: No incremental scenarios, you probably want to use verifyTsc instead.`);
            });
            after(() => {
                baseFs = undefined!;
                sys = undefined!;
                tick = undefined!;
            });
            describe("initialBuild", () => {
                verifyTscBaseline(() => sys);
            });

            incrementalScenarios.forEach(({
                buildKind,
                modifyFs: incrementalModifyFs,
                subScenario: incrementalSubScenario,
                commandLineArgs: incrementalCommandLineArgs
            }, index) => {
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
                                incrementalModifyFs(fs);
                                tick();
                            },
                            baselineSourceMap,
                            baselineReadFileCalls,
                            baselinePrograms
                        });
                    });
                    after(() => {
                        newSys = undefined!;
                    });
                    verifyTscBaseline(() => newSys);
                    verifyIncrementalCorrectness(() => ({
                        scenario,
                        subScenario,
                        baseFs,
                        newSys,
                        commandLineArgs,
                        incrementalModifyFs,
                        modifyFs,
                        tick
                    }), index);
                });
            });
        });
    }

    export function verifyTscSerializedIncrementalEdits(input: VerifyTsBuildInput) {
        verifyTscSerializedIncrementalEditsWorker(input);
        if (input.baselineIncremental) {
            verifyTscSerializedIncrementalEditsWorker({
                ...input,
                subScenario: `${input.subScenario} with incremental`,
                commandLineArgs: [...input.commandLineArgs, "--incremental"],
            });
        }
    }
    function verifyTscSerializedIncrementalEditsWorker({
        subScenario, fs, scenario, commandLineArgs,
        baselineSourceMap, modifyFs, baselineReadFileCalls, baselinePrograms,
        incrementalScenarios
    }: VerifyTsBuildInputWorker) {
        describe(`tsc ${commandLineArgs.join(" ")} ${scenario}:: ${subScenario} serializedEdits`, () => {
            Debug.assert(!!incrementalScenarios.length, `${scenario}/${subScenario}:: No incremental scenarios, you probably want to use verifyTsc instead.`);
            let tick: () => void;
            let sys: TscCompileSystem;
            let baseFs: vfs.FileSystem;
            let incrementalSys: TscCompileSystem[];
            before(() => {
                ({ fs: baseFs, tick } = getFsWithTime(fs()));
                sys = tscCompile({
                    scenario,
                    subScenario,
                    fs: () => baseFs.makeReadonly(),
                    commandLineArgs,
                    modifyFs: fs => {
                        if (modifyFs) modifyFs(fs);
                        tick();
                    },
                    baselineSourceMap,
                    baselineReadFileCalls,
                    baselinePrograms
                });
                incrementalScenarios.forEach((
                    { buildKind, modifyFs, subScenario: incrementalSubScenario, commandLineArgs: incrementalCommandLineArgs },
                    index
                ) => {
                    Debug.assert(buildKind !== BuildKind.Initial, "Incremental edit cannot be initial compilation");
                    tick();
                    (incrementalSys || (incrementalSys = [])).push(tscCompile({
                        scenario,
                        subScenario: incrementalSubScenario || subScenario,
                        buildKind,
                        fs: () => index === 0 ? sys.vfs : incrementalSys[index - 1].vfs,
                        commandLineArgs: incrementalCommandLineArgs || commandLineArgs,
                        modifyFs: fs => {
                            tick();
                            modifyFs(fs);
                            tick();
                        },
                        baselineSourceMap,
                        baselineReadFileCalls,
                        baselinePrograms
                    }));
                });
            });
            after(() => {
                baseFs = undefined!;
                sys = undefined!;
                tick = undefined!;
                incrementalSys = undefined!;
            });
            describe("serializedBuild", () => {

                verifyTscBaseline(() => ({
                    baseLine: () => {
                        const { file, text } = sys.baseLine();
                        const texts: string[] = [text];
                        incrementalSys.forEach((sys, index) => {
                            const incrementalScenario = incrementalScenarios[index];
                            texts.push("");
                            texts.push(`Change:: ${incrementalScenario.subScenario || incrementalScenario.buildKind}`);
                            texts.push(sys.baseLine().text);
                        });
                        return { file, text: texts.join("\r\n") };
                    }
                }));
            });
            describe("incremental correctness", () => {
                incrementalScenarios.forEach((_, index) => verifyIncrementalCorrectness(() => ({
                    scenario,
                    subScenario,
                    baseFs,
                    newSys: incrementalSys[index],
                    commandLineArgs,
                    incrementalModifyFs: fs => {
                        for (let i = 0; i <= index; i++) {
                            incrementalScenarios[i].modifyFs(fs);
                        }
                    },
                    modifyFs,
                    tick
                }), index));
            });
        });
    }

    export function enableStrict(fs: vfs.FileSystem, path: string) {
        replaceText(fs, path, `"strict": false`, `"strict": true`);
    }

    export function addTestPrologue(fs: vfs.FileSystem, path: string, prologue: string) {
        prependText(fs, path, `${prologue}
`);
    }

    export function addShebang(fs: vfs.FileSystem, project: string, file: string) {
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

    export function addRest(fs: vfs.FileSystem, project: string, file: string) {
        appendText(fs, `src/${project}/${file}.ts`, restContent(project, file));
    }

    export function removeRest(fs: vfs.FileSystem, project: string, file: string) {
        replaceText(fs, `src/${project}/${file}.ts`, restContent(project, file), nonrestContent(project, file));
    }

    export function addStubFoo(fs: vfs.FileSystem, project: string, file: string) {
        appendText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file));
    }

    export function changeStubToRest(fs: vfs.FileSystem, project: string, file: string) {
        replaceText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file), restContent(project, file));
    }

    export function addSpread(fs: vfs.FileSystem, project: string, file: string) {
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

    export function addTripleSlashRef(fs: vfs.FileSystem, project: string, file: string) {
        fs.writeFileSync(getTripleSlashRef(project), `declare class ${project}${file} { }`);
        prependText(fs, `src/${project}/${file}.ts`, `///<reference path="./tripleRef.d.ts"/>
const ${file}Const = new ${project}${file}();
`);
    }
}

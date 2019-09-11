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

    export function loadProjectFromDisk(
        root: string,
        time?: vfs.FileSystemOptions["time"],
        libContentToAppend?: string
    ): vfs.FileSystem {
        const resolver = vfs.createResolver(Harness.IO);
        const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
            files: {
                ["/src"]: new vfs.Mount(vpath.resolve(Harness.IO.getWorkspaceRoot(), root), resolver)
            },
            cwd: "/",
            meta: { defaultLibLocation: "/lib" },
            time
        });
        addLibAndMakeReadonly(fs, libContentToAppend);
        return fs;
    }

    export function loadProjectFromFiles(
        files: vfs.FileSet,
        time?: vfs.FileSystemOptions["time"],
        libContentToAppend?: string
    ): vfs.FileSystem {
        const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
            files,
            cwd: "/",
            meta: { defaultLibLocation: "/lib" },
            time
        });
        addLibAndMakeReadonly(fs, libContentToAppend);
        return fs;
    }

    function addLibAndMakeReadonly(fs: vfs.FileSystem, libContentToAppend?: string) {
        fs.mkdirSync("/lib");
        fs.writeFileSync("/lib/lib.d.ts", libContentToAppend ? `${libContent}${libContentToAppend}` : libContent);
        fs.makeReadonly();
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

    function generateSourceMapBaselineFiles(fs: vfs.FileSystem, mapFileNames: Iterator<string>) {
        while (true) {
            const { value: mapFile, done } = mapFileNames.next();
            if (done) break;
            const text = Harness.SourceMapRecorder.getSourceMapRecordWithVFS(fs, mapFile);
            fs.writeFileSync(`${mapFile}.baseline.txt`, text);
        }
    }

    // [tsbuildinfo, js, dts]
    export type BuildInfoSectionBaselineFiles = [string, string | undefined, string | undefined];
    function generateBuildInfoSectionBaselineFiles(fs: vfs.FileSystem, buildInfoFileNames: readonly BuildInfoSectionBaselineFiles[]) {
        for (const [file, jsFile, dtsFile] of buildInfoFileNames) {
            if (!fs.existsSync(file)) continue;

            const buildInfo = getBuildInfo(fs.readFileSync(file, "utf8"));
            const bundle = buildInfo.bundle;
            if (!bundle || (!length(bundle.js && bundle.js.sections) && !length(bundle.dts && bundle.dts.sections))) continue;

            // Write the baselines:
            const baselineRecorder = new Harness.Compiler.WriterAggregator();
            generateBundleFileSectionInfo(fs, baselineRecorder, bundle.js, jsFile);
            generateBundleFileSectionInfo(fs, baselineRecorder, bundle.dts, dtsFile);
            baselineRecorder.Close();

            const text = baselineRecorder.lines.join("\r\n");
            fs.writeFileSync(`${file}.baseline.txt`, text, "utf8");
        }
    }

    function generateBundleFileSectionInfo(fs: vfs.FileSystem, baselineRecorder: Harness.Compiler.WriterAggregator, bundleFileInfo: BundleFileInfo | undefined, outFile: string | undefined) {
        if (!length(bundleFileInfo && bundleFileInfo.sections) && !outFile) return; // Nothing to baseline

        const content = outFile && fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";
        baselineRecorder.WriteLine("======================================================================");
        baselineRecorder.WriteLine(`File:: ${outFile}`);
        for (const section of bundleFileInfo ? bundleFileInfo.sections : emptyArray) {
            baselineRecorder.WriteLine("----------------------------------------------------------------------");
            writeSectionHeader(section);
            if (section.kind !== BundleFileSectionKind.Prepend) {
                writeTextOfSection(section.pos, section.end);
            }
            else {
                Debug.assert(section.pos === first(section.texts).pos);
                Debug.assert(section.end === last(section.texts).end);
                for (const text of section.texts) {
                    baselineRecorder.WriteLine(">>--------------------------------------------------------------------");
                    writeSectionHeader(text);
                    writeTextOfSection(text.pos, text.end);
                }
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

    interface BuildInput {
        fs: vfs.FileSystem;
        tick: () => void;
        rootNames: readonly string[];
        modifyFs: (fs: vfs.FileSystem) => void;
        baselineSourceMap?: true;
        baselineBuildInfo?: true;
    }

    function build({ fs, tick, rootNames, modifyFs, baselineSourceMap, baselineBuildInfo }: BuildInput) {
        const actualReadFileMap = createMap<number>();
        modifyFs(fs);
        tick();

        const host = new fakes.SolutionBuilderHost(fs);
        const writtenFiles = createMap<true>();
        const originalWriteFile = host.writeFile;
        host.writeFile = (fileName, content, writeByteOrderMark) => {
            assert.isFalse(writtenFiles.has(fileName));
            writtenFiles.set(fileName, true);
            return originalWriteFile.call(host, fileName, content, writeByteOrderMark);
        };
        const builder = createSolutionBuilder(host, rootNames, { dry: false, force: false, verbose: true });
        host.clearDiagnostics();
        const originalReadFile = host.readFile;
        host.readFile = path => {
            // Dont record libs
            if (path.startsWith("/src/")) {
                actualReadFileMap.set(path, (actualReadFileMap.get(path) || 0) + 1);
            }
            return originalReadFile.call(host, path);
        };
        builder.build();
        if (baselineSourceMap) generateSourceMapBaselineFiles(fs, mapDefinedIterator(writtenFiles.keys(), f => f.endsWith(".map") ? f : undefined));
        if (baselineBuildInfo) {
            let expectedBuildInfoFiles: BuildInfoSectionBaselineFiles[] | undefined;
            for (const { options } of builder.getAllParsedConfigs()) {
                const out = options.outFile || options.out;
                if (out) {
                    const { jsFilePath, declarationFilePath, buildInfoPath } = getOutputPathsForBundle(options, /*forceDts*/ false);
                    if (buildInfoPath && writtenFiles.has(buildInfoPath)) {
                        (expectedBuildInfoFiles || (expectedBuildInfoFiles = [])).push(
                            [buildInfoPath, jsFilePath, declarationFilePath]
                        );
                    }
                }
            }
            if (expectedBuildInfoFiles) generateBuildInfoSectionBaselineFiles(fs, expectedBuildInfoFiles);
        }
        fs.makeReadonly();
        return { fs, actualReadFileMap, host, builder, writtenFiles };
    }

    function generateBaseline(fs: vfs.FileSystem, proj: string, scenario: string, subScenario: string, baseFs: vfs.FileSystem) {
        const patch = fs.diff(baseFs, { includeChangedFileWithSameContent: true });
        // eslint-disable-next-line no-null/no-null
        Harness.Baseline.runBaseline(`tsbuild/${proj}/${subScenario.split(" ").join("-")}/${scenario.split(" ").join("-")}.js`, patch ? vfs.formatPatch(patch) : null);
    }

    function verifyReadFileCalls(actualReadFileMap: Map<number>, expectedReadFiles: ReadonlyMap<number>) {
        TestFSWithWatch.verifyMapSize("readFileCalls", actualReadFileMap, arrayFrom(expectedReadFiles.keys()));
        expectedReadFiles.forEach((expected, expectedFile) => {
            const actual = actualReadFileMap.get(expectedFile);
            assert.equal(actual, expected, `Mismatch in read file call number for: ${expectedFile}
Not in Actual: ${JSON.stringify(arrayFrom(mapDefinedIterator(expectedReadFiles.keys(), f => actualReadFileMap.has(f) ? undefined : f)))}
Mismatch Actual(path, actual, expected): ${JSON.stringify(arrayFrom(mapDefinedIterator(actualReadFileMap.entries(), ([p, v]) => expectedReadFiles.get(p) !== v ? [p, v, expectedReadFiles.get(p) || 0] : undefined)))}`);
        });
    }

    export function getReadFilesMap(filesReadOnce: readonly string[], ...filesWithTwoReadCalls: string[]) {
        const map = arrayToMap(filesReadOnce, identity, () => 1);
        for (const fileWithTwoReadCalls of filesWithTwoReadCalls) {
            map.set(fileWithTwoReadCalls, 2);
        }
        return map;
    }

    export interface ExpectedBuildOutput {
        expectedDiagnostics?: readonly fakes.ExpectedDiagnostic[];
        expectedReadFiles?: ReadonlyMap<number>;
    }

    export interface BuildState extends ExpectedBuildOutput {
        modifyFs: (fs: vfs.FileSystem) => void;
    }

    export interface VerifyTsBuildInput {
        scenario: string;
        projFs: () => vfs.FileSystem;
        time: () => number;
        tick: () => void;
        proj: string;
        rootNames: readonly string[];
        initialBuild: BuildState;
        incrementalDtsChangedBuild?: BuildState;
        incrementalDtsUnchangedBuild?: BuildState;
        incrementalHeaderChangedBuild?: BuildState;
        baselineOnly?: true;
        verifyDiagnostics?: true;
        baselineSourceMap?: true;
    }

    export function verifyTsbuildOutput({
        scenario, projFs, time, tick, proj, rootNames,
        baselineOnly, verifyDiagnostics, baselineSourceMap,
        initialBuild, incrementalDtsChangedBuild, incrementalDtsUnchangedBuild, incrementalHeaderChangedBuild
    }: VerifyTsBuildInput) {
        describe(`tsc --b ${proj}:: ${scenario}`, () => {
            let fs: vfs.FileSystem;
            let actualReadFileMap: Map<number>;
            let firstBuildTime: number;
            let host: fakes.SolutionBuilderHost;
            let initialWrittenFiles: Map<true>;
            before(() => {
                const result = build({
                    fs: projFs().shadow(),
                    tick,
                    rootNames,
                    modifyFs: initialBuild.modifyFs,
                    baselineSourceMap,
                    baselineBuildInfo: true,
                });
                ({ fs, actualReadFileMap, host, writtenFiles: initialWrittenFiles } = result);
                firstBuildTime = time();
            });
            after(() => {
                fs = undefined!;
                actualReadFileMap = undefined!;
                host = undefined!;
                initialWrittenFiles = undefined!;
            });
            describe("initialBuild", () => {
                if (!baselineOnly || verifyDiagnostics) {
                    it(`verify diagnostics`, () => {
                        host.assertDiagnosticMessages(...(initialBuild.expectedDiagnostics || emptyArray));
                    });
                }
                it(`Generates files matching the baseline`, () => {
                    generateBaseline(fs, proj, scenario, "initial Build", projFs());
                });
                if (!baselineOnly) {
                    it("verify readFile calls", () => {
                        verifyReadFileCalls(actualReadFileMap, Debug.assertDefined(initialBuild.expectedReadFiles));
                    });
                }
            });

            function incrementalBuild(subScenario: string, incrementalModifyFs: (fs: vfs.FileSystem) => void, incrementalExpectedDiagnostics: readonly fakes.ExpectedDiagnostic[] | undefined, incrementalExpectedReadFiles: ReadonlyMap<number> | undefined) {
                describe(subScenario, () => {
                    let newFs: vfs.FileSystem;
                    let actualReadFileMap: Map<number>;
                    let host: fakes.SolutionBuilderHost;
                    let beforeBuildTime: number;
                    let afterBuildTime: number;
                    before(() => {
                        const lastProjectOutput = last(arrayFrom(initialWrittenFiles.keys()));
                        beforeBuildTime = fs.statSync(lastProjectOutput).mtimeMs;
                        tick();
                        newFs = fs.shadow();
                        tick();
                        ({ actualReadFileMap, host } = build({
                            fs: newFs,
                            tick,
                            rootNames,
                            modifyFs: incrementalModifyFs,
                            baselineSourceMap,
                            baselineBuildInfo: true,
                        }));
                        afterBuildTime = newFs.statSync(lastProjectOutput).mtimeMs;
                    });
                    after(() => {
                        newFs = undefined!;
                        actualReadFileMap = undefined!;
                        host = undefined!;
                    });
                    it("verify build output times", () => {
                        assert.equal(beforeBuildTime, firstBuildTime, "First build timestamp is correct");
                        assert.equal(afterBuildTime, time(), "Second build timestamp is correct");
                    });
                    if (!baselineOnly || verifyDiagnostics) {
                        it(`verify diagnostics`, () => {
                            host.assertDiagnosticMessages(...(incrementalExpectedDiagnostics || emptyArray));
                        });
                    }
                    else {
                        // Build should pass without errors if not verifying diagnostics
                        it(`verify no errors`, () => {
                            host.assertErrors(/*empty*/);
                        });
                    }
                    it(`Generates files matching the baseline`, () => {
                        generateBaseline(newFs, proj, scenario, subScenario, fs);
                    });
                    if (!baselineOnly) {
                        it("verify readFile calls", () => {
                            verifyReadFileCalls(actualReadFileMap, Debug.assertDefined(incrementalExpectedReadFiles));
                        });
                    }
                    it(`Verify emit output file text is same when built clean`, () => {
                        const { fs, writtenFiles } = build({
                            fs: newFs.shadow(),
                            tick,
                            rootNames,
                            modifyFs: fs => {
                                // Delete output files
                                const host = new fakes.SolutionBuilderHost(fs);
                                const builder = createSolutionBuilder(host, rootNames, { clean: true });
                                builder.clean();
                            },
                        });

                        for (const outputFile of arrayFrom(writtenFiles.keys())) {
                            const expectedText = fs.existsSync(outputFile) ? fs.readFileSync(outputFile, "utf8") : undefined;
                            const actualText = newFs.existsSync(outputFile) ? newFs.readFileSync(outputFile, "utf8") : undefined;
                            assert.equal(actualText, expectedText, `File: ${outputFile}`);
                        }
                    });
                });
            }
            if (incrementalDtsChangedBuild) {
                incrementalBuild(
                    "incremental declaration changes",
                    incrementalDtsChangedBuild.modifyFs,
                    incrementalDtsChangedBuild.expectedDiagnostics,
                    incrementalDtsChangedBuild.expectedReadFiles,
                );
            }

            if (incrementalDtsUnchangedBuild) {
                incrementalBuild(
                    "incremental declaration doesnt change",
                    incrementalDtsUnchangedBuild.modifyFs,
                    incrementalDtsUnchangedBuild.expectedDiagnostics,
                    incrementalDtsUnchangedBuild.expectedReadFiles
                );
            }

            if (incrementalHeaderChangedBuild) {
                incrementalBuild(
                    "incremental headers change without dts changes",
                    incrementalHeaderChangedBuild.modifyFs,
                    incrementalHeaderChangedBuild.expectedDiagnostics,
                    incrementalHeaderChangedBuild.expectedReadFiles
                );
            }
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

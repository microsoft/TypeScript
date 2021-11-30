namespace ts {
    describe("unittests:: tsbuild:: outFile:: on amd modules with --out", () => {
        let outFileFs: vfs.FileSystem;
        const enum Project { lib, app }
        function relName(path: string) {
            return path.slice(1);
        }
        type Sources = [string, readonly string[]];
        const enum Source { config, ts }
        const sources: [Sources, Sources] = [
            [
                "/src/lib/tsconfig.json",
                [
                    "/src/lib/file0.ts",
                    "/src/lib/file1.ts",
                    "/src/lib/file2.ts",
                    "/src/lib/global.ts",
                ]
            ],
            [
                "/src/app/tsconfig.json",
                [
                    "/src/app/file3.ts",
                    "/src/app/file4.ts"
                ]
            ]
        ];
        before(() => {
            outFileFs = loadProjectFromDisk("tests/projects/amdModulesWithOut");
        });
        after(() => {
            outFileFs = undefined!;
        });

        interface VerifyOutFileScenarioInput {
            subScenario: string;
            modifyFs?: (fs: vfs.FileSystem) => void;
            modifyAgainFs?: (fs: vfs.FileSystem) => void;
        }

        function verifyOutFileScenario({
            subScenario,
            modifyFs,
            modifyAgainFs
        }: VerifyOutFileScenarioInput) {
            verifyTscIncrementalEdits({
                scenario: "amdModulesWithOut",
                subScenario,
                fs: () => outFileFs,
                commandLineArgs: ["--b", "/src/app", "--verbose"],
                baselineSourceMap: true,
                modifyFs,
                incrementalScenarios: [
                    {
                        buildKind: BuildKind.IncrementalDtsUnchanged,
                        modifyFs: fs => appendText(fs, relName(sources[Project.lib][Source.ts][1]), "console.log(x);")
                    },
                    ...(modifyAgainFs ? [{
                        buildKind: BuildKind.IncrementalHeadersChange,
                        modifyFs: modifyAgainFs
                    }] : emptyArray),
                ]
            });
        }

        describe("Prepend output with .tsbuildinfo", () => {
            verifyOutFileScenario({
                subScenario: "modules and globals mixed in amd",
            });

            // Prologues
            describe("Prologues", () => {
                verifyOutFileScenario({
                    subScenario: "multiple prologues in all projects",
                    modifyFs: fs => {
                        enableStrict(fs, sources[Project.lib][Source.config]);
                        addTestPrologue(fs, sources[Project.lib][Source.ts][0], `"myPrologue"`);
                        addTestPrologue(fs, sources[Project.lib][Source.ts][2], `"myPrologueFile"`);
                        addTestPrologue(fs, sources[Project.lib][Source.ts][3], `"myPrologue3"`);
                        enableStrict(fs, sources[Project.app][Source.config]);
                        addTestPrologue(fs, sources[Project.app][Source.ts][0], `"myPrologue"`);
                        addTestPrologue(fs, sources[Project.app][Source.ts][1], `"myPrologue2";`);
                    },
                    modifyAgainFs: fs => addTestPrologue(fs, relName(sources[Project.lib][Source.ts][1]), `"myPrologue5"`)
                });
            });

            // Shebang
            describe("Shebang", () => {
                // changes declaration because its emitted in .d.ts file
                verifyOutFileScenario({
                    subScenario: "shebang in all projects",
                    modifyFs: fs => {
                        addShebang(fs, "lib", "file0");
                        addShebang(fs, "lib", "file1");
                        addShebang(fs, "app", "file3");
                    },
                });
            });

            // emitHelpers
            describe("emitHelpers", () => {
                verifyOutFileScenario({
                    subScenario: "multiple emitHelpers in all projects",
                    modifyFs: fs => {
                        addSpread(fs, "lib", "file0");
                        addRest(fs, "lib", "file1");
                        addRest(fs, "app", "file3");
                        addSpread(fs, "app", "file4");
                    },
                    modifyAgainFs: fs => removeRest(fs, "lib", "file1")
                });
            });

            // triple slash refs
            describe("triple slash refs", () => {
                // changes declaration because its emitted in .d.ts file
                verifyOutFileScenario({
                    subScenario: "triple slash refs in all projects",
                    modifyFs: fs => {
                        addTripleSlashRef(fs, "lib", "file0");
                        addTripleSlashRef(fs, "app", "file4");
                    }
                });
            });

            describe("stripInternal", () => {
                function stripInternalScenario(fs: vfs.FileSystem) {
                    const internal = "/*@internal*/";
                    replaceText(fs, sources[Project.app][Source.config], `"composite": true,`, `"composite": true,
"stripInternal": true,`);
                    replaceText(fs, sources[Project.lib][Source.ts][0], "const", `${internal} const`);
                    appendText(fs, sources[Project.lib][Source.ts][1], `
export class normalC {
    ${internal} constructor() { }
    ${internal} prop: string;
    ${internal} method() { }
    ${internal} get c() { return 10; }
    ${internal} set c(val: number) { }
}
export namespace normalN {
    ${internal} export class C { }
    ${internal} export function foo() {}
    ${internal} export namespace someNamespace { export class C {} }
    ${internal} export namespace someOther.something { export class someClass {} }
    ${internal} export import someImport = someNamespace.C;
    ${internal} export type internalType = internalC;
    ${internal} export const internalConst = 10;
    ${internal} export enum internalEnum { a, b, c }
}
${internal} export class internalC {}
${internal} export function internalfoo() {}
${internal} export namespace internalNamespace { export class someClass {} }
${internal} export namespace internalOther.something { export class someClass {} }
${internal} export import internalImport = internalNamespace.someClass;
${internal} export type internalType = internalC;
${internal} export const internalConst = 10;
${internal} export enum internalEnum { a, b, c }`);
                }

                // Verify initial + incremental edits
                verifyOutFileScenario({
                    subScenario: "stripInternal",
                    modifyFs: stripInternalScenario,
                    modifyAgainFs: fs => replaceText(fs, sources[Project.lib][Source.ts][1], `export const`, `/*@internal*/ export const`),
                });
            });

            describe("when the module resolution finds original source file", () => {
                function modifyFs(fs: vfs.FileSystem) {
                    // Make lib to output to parent dir
                    replaceText(fs, sources[Project.lib][Source.config], `"outFile": "module.js"`, `"outFile": "../module.js", "rootDir": "../"`);
                    // Change reference to file1 module to resolve to lib/file1
                    replaceText(fs, sources[Project.app][Source.ts][0], "file1", "lib/file1");
                }

                verifyTsc({
                    scenario: "amdModulesWithOut",
                    subScenario: "when the module resolution finds original source file",
                    fs: () => outFileFs,
                    commandLineArgs: ["-b", "/src/app", "--verbose"],
                    modifyFs,
                    baselineSourceMap: true,
                });
            });
        });
    });
}

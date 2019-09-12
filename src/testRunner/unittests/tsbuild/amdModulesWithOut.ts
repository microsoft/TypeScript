namespace ts {
    describe("unittests:: tsbuild:: outFile:: on amd modules with --out", () => {
        let outFileFs: vfs.FileSystem;
        const { time, tick } = getTime();
        const enum project { lib, app }
        function relName(path: string) { return path.slice(1); }
        type Sources = [string, readonly string[]];
        const enum source { config, ts }
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
            outFileFs = loadProjectFromDisk("tests/projects/amdModulesWithOut", time);
        });
        after(() => {
            outFileFs = undefined!;
        });

        interface VerifyOutFileScenarioInput {
            scenario: string;
            modifyFs: (fs: vfs.FileSystem) => void;
            modifyAgainFs?: (fs: vfs.FileSystem) => void;
        }

        function verifyOutFileScenario({
            scenario,
            modifyFs,
            modifyAgainFs
        }: VerifyOutFileScenarioInput) {
            verifyTsbuildOutput({
                scenario,
                projFs: () => outFileFs,
                time,
                tick,
                proj: "amdModulesWithOut",
                rootNames: ["/src/app"],
                baselineSourceMap: true,
                initialBuild: {
                    modifyFs
                },
                incrementalDtsUnchangedBuild: {
                    modifyFs: fs => appendText(fs, relName(sources[project.lib][source.ts][1]), "console.log(x);")
                },
                incrementalHeaderChangedBuild: modifyAgainFs ? {
                    modifyFs: modifyAgainFs
                } : undefined,
                baselineOnly: true
            });
        }

        describe("Prepend output with .tsbuildinfo", () => {
            verifyOutFileScenario({
                scenario: "modules and globals mixed in amd",
                modifyFs: noop
            });

            // Prologues
            describe("Prologues", () => {
                verifyOutFileScenario({
                    scenario: "multiple prologues in all projects",
                    modifyFs: fs => {
                        enableStrict(fs, sources[project.lib][source.config]);
                        addTestPrologue(fs, sources[project.lib][source.ts][0], `"myPrologue"`);
                        addTestPrologue(fs, sources[project.lib][source.ts][2], `"myPrologueFile"`);
                        addTestPrologue(fs, sources[project.lib][source.ts][3], `"myPrologue3"`);
                        enableStrict(fs, sources[project.app][source.config]);
                        addTestPrologue(fs, sources[project.app][source.ts][0], `"myPrologue"`);
                        addTestPrologue(fs, sources[project.app][source.ts][1], `"myPrologue2";`);
                    },
                    modifyAgainFs: fs => addTestPrologue(fs, relName(sources[project.lib][source.ts][1]), `"myPrologue5"`)
                });
            });

            // Shebang
            describe("Shebang", () => {
                // changes declaration because its emitted in .d.ts file
                verifyOutFileScenario({
                    scenario: "shebang in all projects",
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
                    scenario: "multiple emitHelpers in all projects",
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
                    scenario: "triple slash refs in all projects",
                    modifyFs: fs => {
                        addTripleSlashRef(fs, "lib", "file0");
                        addTripleSlashRef(fs, "app", "file4");
                    }
                });
            });

            describe("stripInternal", () => {
                function stripInternalScenario(fs: vfs.FileSystem) {
                    const internal = "/*@internal*/";
                    replaceText(fs, sources[project.app][source.config], `"composite": true,`, `"composite": true,
"stripInternal": true,`);
                    replaceText(fs, sources[project.lib][source.ts][0], "const", `${internal} const`);
                    appendText(fs, sources[project.lib][source.ts][1], `
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
                    scenario: "stripInternal",
                    modifyFs: stripInternalScenario,
                    modifyAgainFs: fs => replaceText(fs, sources[project.lib][source.ts][1], `export const`, `/*@internal*/ export const`),
                });
            });

            describe("when the module resolution finds original source file", () => {
                function modifyFs(fs: vfs.FileSystem) {
                    // Make lib to output to parent dir
                    replaceText(fs, sources[project.lib][source.config], `"outFile": "module.js"`, `"outFile": "../module.js", "rootDir": "../"`);
                    // Change reference to file1 module to resolve to lib/file1
                    replaceText(fs, sources[project.app][source.ts][0], "file1", "lib/file1");
                }

                verifyTsbuildOutput({
                    scenario: "when the module resolution finds original source file",
                    projFs: () => outFileFs,
                    time,
                    tick,
                    proj: "amdModulesWithOut",
                    rootNames: ["/src/app"],
                    baselineSourceMap: true,
                    initialBuild: {
                        modifyFs,
                        expectedDiagnostics: [
                            getExpectedDiagnosticForProjectsInBuild("src/lib/tsconfig.json", "src/app/tsconfig.json"),
                            [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/lib/tsconfig.json", "src/module.js"],
                            [Diagnostics.Building_project_0, sources[project.lib][source.config]],
                            [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/app/tsconfig.json", "src/app/module.js"],
                            [Diagnostics.Building_project_0, sources[project.app][source.config]],
                        ]
                    },
                    baselineOnly: true,
                    verifyDiagnostics: true
                });
            });
        });
    });
}

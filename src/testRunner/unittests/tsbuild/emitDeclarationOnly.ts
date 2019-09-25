namespace ts {
    describe("unittests:: tsbuild:: on project with emitDeclarationOnly set to true", () => {
        let projFs: vfs.FileSystem;
        const { time, tick } = getTime();
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/emitDeclarationOnly", time);
        });
        after(() => {
            projFs = undefined!;
        });

        function verifyEmitDeclarationOnly(disableMap?: true) {
            verifyTsbuildOutput({
                scenario: `only dts output in circular import project with emitDeclarationOnly${disableMap ? "" : " and declarationMap"}`,
                projFs: () => projFs,
                time,
                tick,
                proj: "emitDeclarationOnly",
                rootNames: ["/src"],
                initialBuild: {
                    modifyFs: disableMap ?
                        (fs => replaceText(fs, "/src/tsconfig.json", `"declarationMap": true,`, "")) :
                        noop,
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tsconfig.json", "src/lib/a.d.ts"],
                        [Diagnostics.Building_project_0, "/src/tsconfig.json"]
                    ]
                },
                incrementalDtsChangedBuild: {
                    modifyFs: fs => replaceText(fs, "/src/src/a.ts", "b: B;", "b: B; foo: any;"),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tsconfig.json", "src/lib/a.d.ts", "src/src/a.ts"],
                        [Diagnostics.Building_project_0, "/src/tsconfig.json"]
                    ]
                },
                baselineOnly: true,
                verifyDiagnostics: true
            });
        }
        verifyEmitDeclarationOnly();
        verifyEmitDeclarationOnly(/*disableMap*/ true);

        verifyTsbuildOutput({
            scenario: `only dts output in non circular imports project with emitDeclarationOnly`,
            projFs: () => projFs,
            time,
            tick,
            proj: "emitDeclarationOnly",
            rootNames: ["/src"],
            initialBuild: {
                modifyFs: fs => {
                    fs.rimrafSync("/src/src/index.ts");
                    replaceText(fs, "/src/src/a.ts", `import { B } from "./b";`, `export class B { prop = "hello"; }`);
                },
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tsconfig.json", "src/lib/a.d.ts"],
                    [Diagnostics.Building_project_0, "/src/tsconfig.json"]
                ]
            },
            incrementalDtsChangedBuild: {
                modifyFs: fs => replaceText(fs, "/src/src/a.ts", "b: B;", "b: B; foo: any;"),
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tsconfig.json", "src/lib/a.d.ts", "src/src/a.ts"],
                    [Diagnostics.Building_project_0, "/src/tsconfig.json"]
                ]
            },
            incrementalDtsUnchangedBuild: {
                modifyFs: fs => replaceText(fs, "/src/src/a.ts", "export interface A {", `class C { }
export interface A {`),
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tsconfig.json", "src/lib/a.d.ts", "src/src/a.ts"],
                    [Diagnostics.Building_project_0, "/src/tsconfig.json"],
                    [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, "/src/tsconfig.json"]
                ]
            },
            baselineOnly: true,
            verifyDiagnostics: true
        });
    });
}

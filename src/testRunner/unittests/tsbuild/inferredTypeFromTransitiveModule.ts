namespace ts {
    describe("unittests:: tsbuild:: inferredTypeFromTransitiveModule::", () => {
        let projFs: vfs.FileSystem;
        const { time, tick } = getTime();
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/inferredTypeFromTransitiveModule", time);
        });
        after(() => {
            projFs = undefined!;
        });

        verifyTsbuildOutput({
            scenario: "inferred type from transitive module",
            projFs: () => projFs,
            time,
            tick,
            proj: "inferredTypeFromTransitiveModule",
            rootNames: ["/src"],
            initialBuild: {
                modifyFs: noop,
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tsconfig.json", "src/obj/bar.js"],
                    [Diagnostics.Building_project_0, "/src/tsconfig.json"]
                ]
            },
            incrementalDtsChangedBuild: {
                modifyFs: changeBarParam,
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tsconfig.json", "src/obj/bar.js", "src/bar.ts"],
                    [Diagnostics.Building_project_0, "/src/tsconfig.json"],
                    [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, "/src/tsconfig.json"]
                ]
            },
            baselineOnly: true,
            verifyDiagnostics: true
        });

        verifyTsbuildOutput({
            scenario: "inferred type from transitive module with isolatedModules",
            projFs: () => projFs,
            time,
            tick,
            proj: "inferredTypeFromTransitiveModule",
            rootNames: ["/src"],
            initialBuild: { modifyFs: changeToIsolatedModules },
            incrementalDtsChangedBuild: { modifyFs: changeBarParam },
            baselineOnly: true,
        });

        it("reports errors in files affected by change in signature", () => {
            const { fs, host } = tscBuild({
                fs: projFs.shadow(),
                tick,
                rootNames: ["/src"],
                modifyFs: fs => {
                    changeToIsolatedModules(fs);
                    appendText(fs, "/src/lazyIndex.ts", `
import { default as bar } from './bar';
bar("hello");`);
                }
            });
            host.assertErrors(/*empty*/);

            tick();
            const { fs: newFs, host: newHost, writtenFiles } = tscBuild({
                fs: fs.shadow(),
                tick,
                rootNames: ["/src"],
                modifyFs: changeBarParam
            });
            // Has errors
            newHost.assertErrors({
                message: [Diagnostics.Expected_0_arguments_but_got_1, 0, 1],
                location: expectedLocationIndexOf(newFs, "/src/lazyIndex.ts", `"hello"`)
            });
            // No written files
            assert.equal(writtenFiles.size, 0);
        });
    });

    function changeToIsolatedModules(fs: vfs.FileSystem) {
        replaceText(fs, "/src/tsconfig.json", `"incremental": true`, `"incremental": true, "isolatedModules": true`);
    }

    function changeBarParam(fs: vfs.FileSystem) {
        replaceText(fs, "/src/bar.ts", "param: string", "");
    }
}

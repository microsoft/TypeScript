/// <reference path="../vfs.ts" />

namespace ts {
    let currentTime = 100;
    const bfs = new vfs.FileSystem(/*ignoreCase*/ false, { time });
    const lastDiagnostics: Diagnostic[] = [];
    const reportDiagnostic: DiagnosticReporter = diagnostic => lastDiagnostics.push(diagnostic);

    const sampleRoot = resolvePath(__dirname, "../../tests/projects/sample1");
    loadFsMirror(bfs, sampleRoot, "/src");
    bfs.mkdirpSync("/lib");
    bfs.writeFileSync("/lib/lib.d.ts", Harness.IO.readFile(combinePaths(Harness.libFolder, "lib.d.ts")));
    bfs.meta.set("defaultLibLocation", "/lib");
    bfs.makeReadonly();

    describe("tsbuild tests", () => {
        it("builds the referenced project", () => {
            const fs = bfs.shadow();
            const host = new fakes.CompilerHost(fs);
            const builder = createSolutionBuilder(host, reportDiagnostic, createBuildContext({ dry: false, force: false, verbose: false }));

            fs.chdir("/src/tests");
            fs.debugPrint();
            builder.buildProjects(["."]);
            printDiagnostics();
            fs.debugPrint();
            assertDiagnosticMessages(Diagnostics.File_0_does_not_exist);

            tick();
        });
    });

    function assertDiagnosticMessages(...expected: DiagnosticMessage[]) {
        const actual = lastDiagnostics.slice();
        actual.sort((a, b) => b.code - a.code);
        expected.sort((a, b) => b.code - a.code);
        if (actual.length !== expected.length) {
            assert.fail<any>(actual, expected, `Diagnostic arrays did not match - expected ${actual.join(",")}, got ${expected.join(",")}`);
        }
        for (let i = 0; i < actual.length; i++) {
            if (actual[i].code !== expected[i].code) {
                assert.fail(actual[i].messageText, expected[i].message, "Mismatched error code");
            }
        }
    }

    export function printDiagnostics() {
        const out = createDiagnosticReporter(sys);
        for (const d of lastDiagnostics) {
            out(d);
        }
    }

    function tick() {
        currentTime += 10;
    }
    function time() {
        return currentTime;
    }

    function loadFsMirror(vfs: vfs.FileSystem, localRoot: string, virtualRoot: string) {
        vfs.mkdirpSync(virtualRoot);
        for (const path of Harness.IO.readDirectory(localRoot)) {
            const file = getBaseFileName(path);
            vfs.writeFileSync(virtualRoot + "/" + file, Harness.IO.readFile(localRoot + "/" + file));
        }
        for (const dir of Harness.IO.getDirectories(localRoot)){
            loadFsMirror(vfs, localRoot + "/" + dir, virtualRoot + "/" + dir);
        }
    }
}
import { jsonToReadableText } from "../helpers.js";
import { forEachNoEmitTscWatch } from "../helpers/noEmit.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuildWatch:: watchMode:: with noEmit::", () => {
    function verify(outFile?: object) {
        verifyTscWatch({
            scenario: "noEmit",
            subScenario: `${outFile ? "outFile" : "multiFile"}/does not go in loop when watching when no files are emitted`,
            commandLineArgs: ["-b", "-w", "-verbose"],
            sys: () =>
                TestServerHost.createWatchedSystem({
                    "/user/username/projects/myproject/a.js": "",
                    "/user/username/projects/myproject/b.ts": "",
                    "/user/username/projects/myproject/tsconfig.json": jsonToReadableText({
                        compilerOptions: {
                            allowJs: true,
                            noEmit: true,
                            ...outFile,
                        },
                    }),
                }, { currentDirectory: "/user/username/projects/myproject" }),
            edits: [
                {
                    caption: "No change",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/a.js`, sys.readFile(`/user/username/projects/myproject/a.js`)!),
                    // build project
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "change",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/a.js`, "const x = 10;"),
                    // build project
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
            baselineIncremental: true,
        });
    }
    verify();
    verify({ outFile: "../out.js" });

    forEachNoEmitTscWatch(["-b", "-verbose"]);
});

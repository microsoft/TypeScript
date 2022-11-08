import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsc-watch:: nodeNextWatch:: emit when module emit is specified as nodenext", () => {
    ts.tscWatch.verifyTscWatch({
        scenario: "nodenext watch emit",
        subScenario: "esm-mode file is edited",
        commandLineArgs: ["--w", "--p", "/project/tsconfig.json"],
        sys: () => {
            const configFile: ts.tscWatch.File = {
                path: "/project/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        strict: true,
                        target: "es2020",
                        module: "nodenext",
                        moduleResolution: "nodenext",
                        outDir: "../dist"
                    }
                })
            };
            const packageFile: ts.tscWatch.File = {
                path: "/project/package.json",
                content: JSON.stringify({
                    name: "some-proj",
                    version: "1.0.0",
                    description: "",
                    type: "module",
                    main: "index.js",
                })
            };
            const file1: ts.tscWatch.File = {
                path: "/project/src/index.ts",
                content: Utils.dedent`
                        import * as Thing from "thing";

                        Thing.fn();`
            };
            const declFile: ts.tscWatch.File = {
                path: "/project/src/deps.d.ts",
                content: `declare module "thing";`
            };
            return ts.tscWatch.createWatchedSystem([configFile, file1, declFile, packageFile, { ...ts.tscWatch.libFile, path: "/a/lib/lib.es2020.full.d.ts" }]);
        },
        changes: [
            {
                caption: "Modify typescript file",
                change: sys => sys.modifyFile(
                    "/project/src/index.ts",
                    Utils.dedent`
                            import * as Thing from "thing";
                            Thing.fn();`,
                    {},
                ),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            }
        ],
    });
});
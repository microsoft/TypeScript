import * as Utils from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTscWatch,
} from "../helpers/tscWatch";
import {
    createWatchedSystem,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsc-watch:: nodeNextWatch:: emit when module emit is specified as nodenext", () => {
    verifyTscWatch({
        scenario: "nodenext watch emit",
        subScenario: "esm-mode file is edited",
        commandLineArgs: ["--w", "--p", "/project/tsconfig.json"],
        sys: () => {
            const configFile: File = {
                path: "/project/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        strict: true,
                        target: "es2020",
                        module: "nodenext",
                        moduleResolution: "nodenext",
                        outDir: "../dist",
                    },
                }),
            };
            const packageFile: File = {
                path: "/project/package.json",
                content: jsonToReadableText({
                    name: "some-proj",
                    version: "1.0.0",
                    description: "",
                    type: "module",
                    main: "index.js",
                }),
            };
            const file1: File = {
                path: "/project/src/index.ts",
                content: Utils.dedent`
                        import * as Thing from "thing";

                        Thing.fn();`,
            };
            const declFile: File = {
                path: "/project/src/deps.d.ts",
                content: `declare module "thing";`,
            };
            return createWatchedSystem([configFile, file1, declFile, packageFile, { ...libFile, path: "/a/lib/lib.es2020.full.d.ts" }]);
        },
        edits: [
            {
                caption: "Modify typescript file",
                edit: sys =>
                    sys.modifyFile(
                        "/project/src/index.ts",
                        Utils.dedent`
                            import * as Thing from "thing";
                            Thing.fn();`,
                        {},
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});

import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: nodeNextWatch:: emit when module emit is specified as nodenext", () => {
    verifyTscWatch({
        scenario: "nodeNextWatch",
        subScenario: "esm-mode file is edited",
        commandLineArgs: ["--w"],
        sys: () => {
            const configFile: File = {
                path: "/home/src/projects/project/tsconfig.json",
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
                path: "/home/src/projects/project/package.json",
                content: jsonToReadableText({
                    name: "some-proj",
                    version: "1.0.0",
                    description: "",
                    type: "module",
                    main: "index.js",
                }),
            };
            const file1: File = {
                path: "/home/src/projects/project/src/index.ts",
                content: dedent`
                        import * as Thing from "thing";

                        Thing.fn();`,
            };
            const declFile: File = {
                path: "/home/src/projects/project/src/deps.d.ts",
                content: `declare module "thing";`,
            };
            return TestServerHost.createWatchedSystem(
                [configFile, file1, declFile, packageFile],
                { currentDirectory: "/home/src/projects/project" },
            );
        },
        edits: [
            {
                caption: "Modify typescript file",
                edit: sys =>
                    sys.modifyFile(
                        "/home/src/projects/project/src/index.ts",
                        dedent`
                            import * as Thing from "thing";
                            Thing.fn();`,
                        {},
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});

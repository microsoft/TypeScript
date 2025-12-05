import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: ignoreConfig::", () => {
    function sysWithoutConfig() {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/project/src/a.ts": "export const a = 10;",
            "/home/src/workspaces/project/src/b.ts": "export const b = 10;",
            "/home/src/workspaces/project/c.ts": "export const c = 10;",
        });
    }
    function sysWithConfig() {
        const sys = sysWithoutConfig();
        sys.writeFile(
            "/home/src/workspaces/project/tsconfig.json",
            jsonToReadableText({
                include: ["src"],
            }),
        );
        return sys;
    }
    function runScenario(subScenario: string, commandLineArgs: readonly string[]) {
        verifyTsc({
            scenario: "ignoreConfig",
            subScenario,
            sys: sysWithConfig,
            commandLineArgs,
        });

        verifyTsc({
            scenario: "ignoreConfig",
            subScenario: subScenario + " with --ignoreConfig",
            sys: sysWithConfig,
            commandLineArgs: commandLineArgs.concat("--ignoreConfig"),
        });

        verifyTsc({
            scenario: "ignoreConfig",
            subScenario: subScenario + " when config file absent",
            sys: sysWithoutConfig,
            commandLineArgs,
        });

        verifyTsc({
            scenario: "ignoreConfig",
            subScenario: subScenario + " when config file absent with --ignoreConfig",
            sys: sysWithoutConfig,
            commandLineArgs: commandLineArgs.concat("--ignoreConfig"),
        });
    }

    runScenario("without any options", ts.emptyArray);
    runScenario("specifying files", ["src/a.ts"]);
    runScenario("specifying project", ["-p", "."]);
    runScenario("mixing project and files", ["-p", ".", "src/a.ts", "c.ts"]);
});

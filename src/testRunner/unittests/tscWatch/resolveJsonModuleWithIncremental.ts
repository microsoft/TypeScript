import { jsonToReadableText } from "../helpers.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: resolveJsonModule:: emit file --incremental", () => {
    verifyTscWatch({
        scenario: "resolveJsonModule",
        subScenario: "incremental always prefers declaration file over document",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/projects/project/main.ts": `import data from "./data.json"; let x: string = data;`,
                "/home/src/projects/project/data.json": `{}`, // this file intentionally left blank
                "/home/src/projects/project/data.d.json.ts": `declare var val: string; export default val;`,
                "/home/src/projects/project/tsconfig.json": jsonToReadableText({ compilerOptions: { resolveJsonModule: true } }),
            }, { currentDirectory: "/home/src/projects/project" }),
        commandLineArgs: ["-i", "-w"],
        edits: [{
            caption: "Change json setting",
            edit: sys => sys.writeFile("/home/src/projects/project/tsconfig.json", jsonToReadableText({ compilerOptions: { resolveJsonModule: false } })),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        }],
    });
});

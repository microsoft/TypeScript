import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTscWatch,
} from "../helpers/tscWatch";
import {
    createWatchedSystem,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsc-watch:: resolveJsonModuleWithIncremental:: emit file --incremental", () => {
    verifyTscWatch({
        scenario: "resolveJsonModule",
        subScenario: "incremental always prefers declaration file over document",
        sys: () =>
            createWatchedSystem({
                "/src/project/main.ts": `import data from "./data.json"; let x: string = data;`,
                "/src/project/data.json": `{}`, // this file intentionally left blank
                "/src/project/data.d.json.ts": `declare var val: string; export default val;`,
                "/src/project/tsconfig.json": jsonToReadableText({ compilerOptions: { resolveJsonModule: true } }),
                [libFile.path]: libFile.content,
            }),
        commandLineArgs: ["--p", "src/project", "-i", "-w"],
        edits: [{
            caption: "Change json setting",
            edit: sys => sys.writeFile("/src/project/tsconfig.json", jsonToReadableText({ compilerOptions: { resolveJsonModule: false } })),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        }],
    });
});

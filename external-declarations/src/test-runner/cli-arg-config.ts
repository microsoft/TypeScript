import { ArgType,parserConfiguration } from "../utils/cli-parser";

export const testRunnerCLIConfiguration = parserConfiguration({
    default: {
        type: ArgType.String(),
        description: "Test filter to run",
    },
    type: {
        type: ArgType.Enum("all", "tsc", "i"),
        description: "Type of run (Typescript, all, or isolated)",
    },
    shard: ArgType.Number(),
    shardCount: ArgType.Number(),
    histFolder: ArgType.String(),
    libPath: ArgType.String(),
    rootPaths: ArgType.StringArray(),
    configFile: ArgType.String(),
    category: ArgType.String(),
});

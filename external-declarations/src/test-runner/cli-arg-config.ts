import { ArgType,parserConfiguration, parseArgs } from "../utils/cli-parser";

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
    forceIsolatedDeclarations: ArgType.Boolean(),
});



const { value, printUsageOnErrors } = parseArgs(process.argv.slice(2), testRunnerCLIConfiguration);

printUsageOnErrors();

export const parsedCliArgs = value;

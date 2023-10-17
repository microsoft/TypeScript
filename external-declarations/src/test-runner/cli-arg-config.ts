import {
    ArgType,
    parseArgs,
    parserConfiguration,
} from "../utils/cli-parser";

export const testRunnerCLIConfiguration = parserConfiguration({
    default: {
        type: ArgType.String(),
        description: "Test filter to run",
    },
    type: {
        type: ArgType.Enum("all", "tsc", "dte"),
        description: "Type of run (Typescript, all, or isolated)",
    },
    shard: ArgType.Number(),
    shardCount: ArgType.Number(),
    libPath: ArgType.String(),
    outputPath: ArgType.String(),
    rootPaths: ArgType.StringArray(),
    configFile: ArgType.String(),
    category: ArgType.String(),
    forceIsolatedDeclarations: ArgType.Boolean(),
});

const { value, printUsageOnErrors } = parseArgs(process.argv.slice(2), testRunnerCLIConfiguration);

printUsageOnErrors();

export const parsedCliArgs = value;

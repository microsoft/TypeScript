import * as io from "./io";
import { ParsedArguments } from "./options";
import { TestRunTask } from "./runner";

export interface TestConfig {
    light?: boolean;
    taskConfigsFolder?: string;
    workerCount?: number;
    stackTraceLimit?: number | "full";
    tasks?: TestRunTask[];
    test?: string[];
    runUnitTests?: boolean;
}

/**
 * Get the current test configuration.
 */
export function getTestConfig(args: ParsedArguments): TestConfig {
    const content = getTestConfigContent();
    const config: TestConfig = content ? JSON.parse(content) : { };
    if (config.light === undefined) config.light = false;
    if (config.workerCount === undefined) config.workerCount = 0;
    if (config.runUnitTests === undefined) config.runUnitTests = !args.discover;
    return config;

    /**
     * Read the test configuration from either the command line, a
     * custom _mytest.config_ file, or the default _test.config_ file.
     */
    function getTestConfigContent(): string | undefined {
        return args.config && io.readFile(args.config)
            || io.readFile("mytest.config")
            || io.readFile("test.config");
    }
}
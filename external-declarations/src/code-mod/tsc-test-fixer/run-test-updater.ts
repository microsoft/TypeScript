import "source-map-support/register";

import * as fs from "fs/promises";
import path, * as fsPath from "path";
import ts from "typescript";

import {
    normalizePath,
} from "../../compiler/path-utils";
import {
    loadTestCase,
} from "../../test-runner/utils";
import {
    ArgType,
    parseArgs,
    parserConfiguration,
} from "../../utils/cli-parser";
import {
    ensureDir,
    readAllFiles,
} from "../../utils/fs-utils";
import {
    writeTestCase,
} from "./test-case-utils";
import {
    fixTestCase,
} from "./test-fixer";

(ts as any).Debug.enableDebugInfo();

export const testRunnerCLIConfiguration = parserConfiguration({
    default: {
        type: ArgType.String(),
        description: "Test filter to run",
    },
    rootPaths: ArgType.StringArray(),
    updatedOutputPath: ArgType.String(),
    shard: ArgType.Number(),
    shardCount: ArgType.Number(),
});

const excludeFilter = /\/fourslash\//;
const { value: parsedArgs, printUsageOnErrors } = parseArgs(process.argv.slice(2), testRunnerCLIConfiguration);
printUsageOnErrors();

const rootCasePaths = parsedArgs.rootPaths ?? ["./tests/sources"];

const filter = parsedArgs.default ? new RegExp(parsedArgs.default) : /.*\.ts/;

const shard = parsedArgs.shard;
const shardCount = parsedArgs.shardCount;

const allTests = rootCasePaths
    .flatMap(r => readAllFiles(r, filter).map(file => ({ file, root: r })))
    .filter(f => !excludeFilter.exec(f.file));

async function measureAndReport<T>(name: string, fn: () => Promise<T>) {
    const start = Date.now();
    try {
        return await fn();
    }
    finally {
        const time = Date.now() - start;
        if (time > 300) {
            console.log(`Test ${name} took ${time}`);
        }
    }
}
async function main() {
    const testsPerShared = shardCount && Math.round(allTests.length / shardCount);
    const [start, end] = shard === undefined || shardCount === undefined || testsPerShared === undefined ?
        [0, allTests.length] :
        [shard * testsPerShared, (shard === shardCount - 1) ? allTests.length : (shard + 1) * testsPerShared];

    for (let count = start; count < end; count++) {
        const testFile = normalizePath(allTests[count].file);
        const rootPath = normalizePath(allTests[count].root);
        const caseData = await loadTestCase(testFile);

        const updatedTestFileName = testFile.replace(rootPath, parsedArgs.updatedOutputPath ?? "./tsc-tests/updated-tests");
        const result = await measureAndReport(path.basename(testFile), () => fixTestCase(caseData, {}));
        if (result instanceof Error) {
            await ensureDir(fsPath.dirname(updatedTestFileName));
            await fs.writeFile(
                updatedTestFileName,
                `
================= CODE MOD ERROR ==============
${result.message}
${result.stack}

// ==================
// Original test file: ${testFile}
// ${caseData.code.split("\n").join("\n// ")}
`,
            );
            continue;
        }
        await writeTestCase({
            ...caseData,
            testUnitData: caseData.testUnitData.map(u => ({
                ...u,
                content: result.find(o => o.unitName === u.name)?.content!,
            })),
        }, updatedTestFileName);
        console.log(`Ran: ${count}`);
    }
}

main();

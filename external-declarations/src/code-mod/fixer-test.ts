import "source-map-support/register";

import * as fsSync from "fs";
import * as fs from "fs/promises";
import ts from "typescript";

import {
    normalizePath,
} from "../compiler/path-utils";
import { TestCaseContent } from "../test-runner/tsc-infrastructure/test-file-parser";
import {
    loadTestCase,
} from "../test-runner/utils";
import {
    ArgType,
    parseArgs,
    parserConfiguration,
} from "../utils/cli-parser";
import {
    readAllFiles,
} from "../utils/fs-utils";
import {
    testCaseToString,
} from "./tsc-test-fixer/test-case-utils";
import {
    fixTestCase,
} from "./tsc-test-fixer/test-fixer";

(ts as any).Debug.enableDebugInfo();

export const testRunnerCLIConfiguration = parserConfiguration({
    default: {
        type: ArgType.String(),
        description: "Test filter to run",
    },
    rootPaths: ArgType.StringArray(),
    update: ArgType.Boolean(),
});

const { value: parsedArgs, printUsageOnErrors } = parseArgs(process.argv.slice(2), testRunnerCLIConfiguration);
printUsageOnErrors();

const rootCasePaths = parsedArgs.rootPaths ?? ["./fixer-test/expected"];

const filter = parsedArgs.default ? new RegExp(parsedArgs.default) : /.*\.ts/;

const allTests = rootCasePaths
    .flatMap(r => readAllFiles(r, filter).map(file => ({ file, root: r })));

async function main() {
    const [start, end] = [0, allTests.length];

    for (let count = start; count < end; count++) {
        const testFile = normalizePath(allTests[count].file);
        const rootPath = normalizePath(allTests[count].root);
        const caseData = await loadTestCase(testFile);

        const updatedTestFileName = testFile.replace(rootPath, "./fixer-test/expected");
        const result = await fixTestCase(caseData, {
            target: ts.ScriptTarget.ES2019
        });
        const resultFiles = !(result instanceof Error)? result : [{
                unitName: caseData.testUnitData[0].name,
                content: `
================= CODE MOD ERROR ==============
${result.message}
${result.stack}

// ==================
// Original test file: ${testFile}
// ${caseData.code.split("\n").join("\n// ")}
`,
        }];
        await compareTestCase({
            ...caseData,
            testUnitData: caseData.testUnitData.map(u => ({
                ...u,
                content: resultFiles.find(o => o.unitName === u.name)?.content!,
            })),
        }, updatedTestFileName, !!parsedArgs.update);
        console.log(`Ran: ${count}`);
    }
}

async function compareTestCase(testData: TestCaseContent & { BOM: string }, path: string, update: boolean) {
    const content = await testCaseToString(testData);
    const original = 
        !fsSync.existsSync(path) ? undefined: await fs.readFile(path, "utf-8");
    if (content !== original) {
        if (!update) {
            throw new Error(`Expected \n${original}\n for file ${path} but seen \n${content}`);
        }
        else {
            fs.writeFile(path, content);
        }
    }
}


main();

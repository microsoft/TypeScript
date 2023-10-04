import * as fs from "fs/promises";
import * as fsPath from "path";

import {
    splitContentByNewlines,
    TestCaseContent,
} from "../../test-runner/tsc-infrastructure/test-file-parser";
import {
    ensureDir,
} from "../../utils/fs-utils";

export async function writeTestCase(testData: TestCaseContent & { BOM: string; }, path: string) {
    await ensureDir(fsPath.dirname(path))
    await fs.writeFile(path, await testCaseToString(testData));
}
export async function testCaseToString(testData: TestCaseContent & { BOM: string; }) {
    const lines = splitContentByNewlines(testData.code);
    const result: string[] = [];
    let copyFrom = 0;
    function pushFrom(target: string[], source: string[], from = 0, to: number = source.length) {
        for (let i = from; i < to; i++) {
            target.push(source[i]);
        }
    }
    for (const file of testData.testUnitData) {
        if (file.content === undefined) continue;

        pushFrom(result, lines, copyFrom, file.startLine);

        pushFrom(result, splitContentByNewlines(file.content));

        copyFrom = file.endLine + 1;
    }
    pushFrom(result, lines, copyFrom, lines.length);
    const content = testData.BOM + result.join(lines.delimiter);
    return content;
}

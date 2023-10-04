import "source-map-support/register";

import * as fs from "fs/promises";
import * as JSON from 'json5';
import * as path from "path";
import * as ts from "typescript";

import { firstDefined } from "../compiler/lang-utils";
import { normalizePath, removeExtension } from "../compiler/path-utils";
import { addToQueue, ensureDir, flushQueue, readAllFiles } from "../utils/fs-utils";
import { parsedCliArgs as parsedArgs } from "./cli-arg-config";
import { excludedTsTests } from "./excluded-ts-tests";
import { setCompilerOptionsFromHarnessSetting } from "./tsc-infrastructure/compiler-run";
import { IO } from "./tsc-infrastructure/io";
import { CompilerSettings, TestCaseContent } from "./tsc-infrastructure/test-file-parser";
import { getFileBasedTestConfigurationDescription, getFileBasedTestConfigurations } from "./tsc-infrastructure/vary-by";
import { changeExtension } from "./tsc-infrastructure/vpath";
import { loadTestCase, readDirRecursive, runIsolated, runTypeScript,TestCompilationResult } from "./utils";


const excludeFilter =/\/fourslash\//;



const shard = parsedArgs.shard;
const shardCount = parsedArgs.shardCount;
let prefix: string | undefined;
const prefixed = parsedArgs.default && /(?<index>[0-9]{5})-(((?<name>.*)\.(?<options>(.*=.*)+)(\.d\.ts))|(?<nameSimple>.*))/.exec(parsedArgs.default);
let testVersionFilter: string | undefined;
if(prefixed) {
    prefix = prefixed.groups?.index;
    parsedArgs.default = prefixed.groups?.name ?? prefixed.groups?.nameSimple;
    testVersionFilter = prefixed.groups?.options;
}

const rootCasePaths = parsedArgs.rootPaths ?? [ "./tests/source" ];
const libFolder = parsedArgs.libPath ?? path.join(rootCasePaths[0], "../lib");

const filter = parsedArgs.default ? new RegExp(parsedArgs.default) : /.*\.ts/;
const runType =
    parsedArgs.type === "all" ? { tsc: true, isolated: true } :
    parsedArgs.type === "tsc" ? { tsc: true, isolated: false } :
    { tsc: false, isolated: true };

const allTests = rootCasePaths
    .map(r => readAllFiles(r, filter))
    .flat()
    .filter(f => !excludeFilter.exec(f));

(ts as any).Debug.enableDebugInfo();

const date = new Date();
const historical = (parsedArgs.histFolder && `/${parsedArgs.histFolder}/`) ?? `/${date.toISOString().replace(/:/g, "-")}-${parsedArgs.type}/`;

function pad(num: number, size: number) {
    return ("000000000" + num).substr(-size);
}


async function main() {

    let fileConfiguration: undefined | {
        "error-categories": Record<string, number[]>,
        "test-categories": Record<string, string[]>,
    };
    const testCategories = new Map<string, string>();
    const errorCategories = new Map<number, string>();
    if(parsedArgs.configFile) {
        fileConfiguration = JSON.parse(await fs.readFile(parsedArgs.configFile, { encoding: "utf8" }));
        Object.entries(fileConfiguration?.["error-categories"] ?? {}).forEach(([name, codes]) => codes.forEach(c => errorCategories.set(c, name)));
        Object.entries(fileConfiguration?.["test-categories"] ?? {}).forEach(([name, tests]) => tests.forEach(t => testCategories.set(t, name)));
    }

    const libFiles = (await readDirRecursive(libFolder)).map(n => normalizePath(path.join("/.lib", n)));

    const testsPerShared = shardCount && Math.round(allTests.length / shardCount);
    const [start, end] = shard === undefined || shardCount === undefined || testsPerShared === undefined ?
        [0, allTests.length] :
        [shard * testsPerShared, (shard === shardCount - 1) ? allTests.length : (shard + 1) * testsPerShared];

    for (let count = start; count < end; count++) {
        const testFile = normalizePath(allTests[count]);
        const testFileNoExtension = removeExtension(path.basename(testFile), path.extname(testFile));
        if(excludedTsTests.has(testFileNoExtension)) {
            continue;
        }
        const testName = removeExtension(path.basename(testFile), path.extname(testFile));
        if(parsedArgs.category && testCategories.get(testName) !== parsedArgs.category) {
            continue;
        }
        const data = await loadTestCase(testFile);
        const variedConfiguration = getFileBasedTestConfigurations(data.settings) ?? [{}];
        for(const varConfig of variedConfiguration) {
            const varConfigDescription = getFileBasedTestConfigurationDescription(varConfig);
            if (testVersionFilter && varConfigDescription !== testVersionFilter) continue;
            const file = (prefix ?? pad(count, 5)) + "-" + changeExtension(path.basename(testFile), varConfigDescription + ".d.ts");

            if (runType.tsc) runAndWrite(testName, path.join("./tsc-tests/$now/tsc", file), varConfig, runTypeScript);

            if (runType.isolated) runAndWrite(testName, path.join("./tsc-tests/$now/isolated", file), varConfig, (t, s) => runIsolated(t, libFiles, s));

        }
        console.log(`    Ran: ${pad(count, 5)}/${allTests.length}`);

        function runAndWrite(testName: string, file: string, varySettings: CompilerSettings, fn: (data: TestCaseContent, opts: ts.CompilerOptions) => TestCompilationResult) {
            const settings: ts.CompilerOptions = {};
            setCompilerOptionsFromHarnessSetting(data.settings, settings);
            setCompilerOptionsFromHarnessSetting(varySettings, settings);

            if(parsedArgs.forceIsolatedDeclarations) {
                settings.isolatedDeclarations = true;
            }
            // Not supported
            delete settings.outFile;
            delete settings.out;
            delete settings.outDir;
            delete settings.declarationDir;

            const results = safeRun(d => fn(d, settings));
            file = normalizePath(file)
            const resultText = results.files
                .flatMap(r => [
                    "// " + r.fileName,
                    r.content
                ])
                .join(IO.newLine()) + `
// ==================
// Original test file: ${testFile}
// ` + data.code.split("\n").join(`
// `);

            if (results.diagnostics instanceof Error) {
                file = path.join(
                    path.dirname(file),
                    "critical-errors",
                    path.basename(file)
                );
            } else {
                
                let category = testCategories.get(testName);
                if(!category) {
                    const error = firstDefined(results.diagnostics, d => {
                        const category = errorCategories.get(d.code);
                        return category ? { category, code: d.code }: undefined;
                    });
                    if(error) {
                        category = path.join(error.category, error.code.toString());
                    }
                }
                if(category) {
                    file = path.join(
                        path.dirname(file),
                        category,
                        path.basename(file)
                    );
                }
            }
            if (allTests.length > 5 && parsedArgs.keepHistory) {
                writeResults(file.replace("/$now/", historical), resultText);
            }
            writeResults(file, resultText);
        }

        function safeRun(fn: (data: TestCaseContent) => TestCompilationResult): TestCompilationResult {
            try {
                return fn(data);
            }
            catch (e) {
                return {
                    diagnostics: e,
                    files: [{
                        fileName: path.basename(testFile),
                        content: `
==== ERROR ====
message: ${e.message},
${e.stack},
`,
                    }]
                };
            }
        }

        async function writeResults(fileName: string, results: string) {
            addToQueue(async () => {
                const dirName = path.dirname(fileName);
                await ensureDir(dirName);
                await fs.writeFile(fileName, results);
                console.log(`Written: ${pad(count, 5)}/${allTests.length}`);
            });
        }
    }
    await flushQueue();
}
main();

import 'source-map-support/register';
import * as path from 'path'
import * as fs from 'fs/promises'
import { loadTestCase, runTypeScript, runIsolated, FileContent } from "./utils";
import { IO } from './tsc-infrastructure/io';
import { changeExtension } from './tsc-infrastructure/vpath';
import { CompilerSettings, TestCaseContent } from './tsc-infrastructure/test-file-parser';

import * as ts from 'typescript'
import { normalizePath, removeExtension } from '../compiler/path-utils';
import { excludedTsTests } from './excluded-ts-tests';
import { getFileBasedTestConfigurationDescription, getFileBasedTestConfigurations } from './tsc-infrastructure/vary-by';
import { setCompilerOptionsFromHarnessSetting } from './tsc-infrastructure/compiler-run';
import { parseArgs } from '../utils/cli-parser';
import { testRunnerCLIConfiguration } from './cli-arg-config';
import { addToQueue, ensureDir, flushQueue, readAllFiles } from '../utils/fs-utils';


const excludeFilter =/\/fourslash\//;

const { value: parsedArgs, printUsageOnErrors } = parseArgs(process.argv.slice(2), testRunnerCLIConfiguration);

printUsageOnErrors();

const shard = parsedArgs.shard
const shardCount = parsedArgs.shardCount
let prefix: string | undefined = undefined;
const prefixed = parsedArgs.default && /(?<index>[0-9]{5})-(((?<name>.*)\.(?<options>(.*=.*)+)(\.d\.ts))|(?<nameSimple>.*))/.exec(parsedArgs.default);
let testVersionFilter: string | undefined = undefined;
if(prefixed) {
    prefix = prefixed.groups?.index;
    parsedArgs.default = prefixed.groups?.name ?? prefixed.groups?.nameSimple;
    testVersionFilter = prefixed.groups?.options;
}

const rootCasePaths = parsedArgs.rootPaths ?? [ './tests/sources' ]
const libFolder = parsedArgs.libPath ?? path.join(rootCasePaths[0], "../lib")

const filter = parsedArgs.default ? new RegExp(parsedArgs.default) : /.*\.ts/
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

function pad(num: number, size: number) { return ('000000000' + num).substr(-size); }

async function main() {

    const libFiles = (await fs.readdir(libFolder)).map(n => normalizePath(path.join("/.lib", n)));

    const testsPerShared = shardCount && Math.round(allTests.length / shardCount);
    const [start, end] = shard == undefined || shardCount == undefined || testsPerShared == undefined ?
        [0, allTests.length] :
        [shard * testsPerShared, (shard == shardCount - 1) ? allTests.length : (shard + 1) * testsPerShared];

    for (let count = start; count < end; count++) {
        const testFile = normalizePath(allTests[count]);
        const testFileNoExtension = removeExtension(path.basename(testFile), path.extname(testFile));
        if(excludedTsTests.has(testFileNoExtension)) {
            continue;
        }
        const data = await loadTestCase(testFile);
        const variedConfiguration = getFileBasedTestConfigurations(data.settings) ?? [{}];
        for(const varConfig of variedConfiguration) {
            const varConfigDescription = getFileBasedTestConfigurationDescription(varConfig);
            if (testVersionFilter && varConfigDescription !== testVersionFilter) continue;
            const file = (prefix ?? pad(count, 5)) + "-" + changeExtension(path.basename(testFile), varConfigDescription + ".d.ts");
            
            if (runType.tsc) runAndWrite(path.join("./tsc-tests/$now/tsc", file), varConfig, runTypeScript);

            if (runType.isolated) runAndWrite(path.join("./tsc-tests/$now/isolated", file), varConfig, (t, s) => runIsolated(t, libFiles, s));

        }
        console.log(`    Ran: ${pad(count, 5)}/${allTests.length}`)

        function runAndWrite(file: string, varySettings: CompilerSettings, fn: (data: TestCaseContent, opts: ts.CompilerOptions) => FileContent[]) {
            const settings: ts.CompilerOptions = {};
            setCompilerOptionsFromHarnessSetting(data.settings, settings);
            setCompilerOptionsFromHarnessSetting(varySettings, settings);

            
            // Not supported
            delete settings.outFile;
            delete settings.out;
            delete settings.outDir;
            delete settings.declarationDir;

            const results = safeRun(d => fn(d, settings));
            const resultText = results
                .flatMap(r => [
                    "// " + r.fileName,
                    r.content
                ])
                .join(IO.newLine());

            if (allTests.length > 5) {
                writeResults(normalizePath(file).replace("/$now/", historical), resultText);
            }
            writeResults(file, resultText);
        }

        function safeRun(fn: (data: TestCaseContent) => FileContent[]): FileContent[] {
            try {
                return fn(data)
            } catch (e) {
                return [{
                    fileName: path.basename(testFile),
                    content: `
==== ERROR ====
message: ${e.message},
${e.stack},
                    `,
                }]
            }
        }

        async function writeResults(fileName: string, results: string) {
            addToQueue(async () => {
                const dirName = path.dirname(fileName);
                await ensureDir(dirName);
                await fs.writeFile(fileName, results);
                console.log(`Written: ${pad(count, 5)}/${allTests.length}`)
            });
        }
    }
    await flushQueue();
}
main();
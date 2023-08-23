import "source-map-support/register";

import * as fs from "fs/promises";
import * as path from "path";
import * as ts from "typescript";

import { normalizePath, removeExtension } from "../compiler/path-utils";
import { parseArgs } from "../utils/cli-parser";
import { addToQueue, ensureDir, flushQueue, readAllFiles } from "../utils/fs-utils";
import { testRunnerCLIConfiguration } from "./cli-arg-config";
import { excludedTsTests } from "./excluded-ts-tests";
import { setCompilerOptionsFromHarnessSetting } from "./tsc-infrastructure/compiler-run";
import { IO } from "./tsc-infrastructure/io";
import { CompilerSettings, TestCaseContent } from "./tsc-infrastructure/test-file-parser";
import { getFileBasedTestConfigurationDescription, getFileBasedTestConfigurations } from "./tsc-infrastructure/vary-by";
import { changeExtension } from "./tsc-infrastructure/vpath";
import { TestCompilationResult, loadTestCase, runIsolated, runTypeScript } from "./utils";
import { Diagnostics } from "./tsc-infrastructure/diagnosticInformationMap.generated";


const excludeFilter =/\/fourslash\//;

const { value: parsedArgs, printUsageOnErrors } = parseArgs(process.argv.slice(2), testRunnerCLIConfiguration);

printUsageOnErrors();

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
const isolatedDeclarationErrors = new Set([
    Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.code
]);

const unreliableEmitErrors = new Set([
    Diagnostics.A_computed_property_name_must_be_of_type_string_number_symbol_or_any.code,
    Diagnostics.A_computed_property_name_in_a_class_property_declaration_must_have_a_simple_literal_type_or_a_unique_symbol_type.code,
    Diagnostics.A_parameter_property_may_not_be_declared_using_a_binding_pattern.code,
])

async function main() {

    const libFiles = (await fs.readdir(libFolder)).map(n => normalizePath(path.join("/.lib", n)));

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
        const data = await loadTestCase(testFile);
        const variedConfiguration = getFileBasedTestConfigurations(data.settings) ?? [{}];
        for(const varConfig of variedConfiguration) {
            const varConfigDescription = getFileBasedTestConfigurationDescription(varConfig);
            if (testVersionFilter && varConfigDescription !== testVersionFilter) continue;
            const file = (prefix ?? pad(count, 5)) + "-" + changeExtension(path.basename(testFile), varConfigDescription + ".d.ts");

            if (runType.tsc) runAndWrite(path.join("./tsc-tests/$now/tsc", file), varConfig, runTypeScript);

            if (runType.isolated) runAndWrite(path.join("./tsc-tests/$now/isolated", file), varConfig, (t, s) => runIsolated(t, libFiles, s));

        }
        console.log(`    Ran: ${pad(count, 5)}/${allTests.length}`);

        function runAndWrite(file: string, varySettings: CompilerSettings, fn: (data: TestCaseContent, opts: ts.CompilerOptions) => TestCompilationResult) {
            const settings: ts.CompilerOptions = {};
            setCompilerOptionsFromHarnessSetting(data.settings, settings);
            setCompilerOptionsFromHarnessSetting(varySettings, settings);

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
            } else if(results.diagnostics.some(d =>isolatedDeclarationErrors.has(d.code))) {
                file = path.join(
                    path.dirname(file),
                    "with-isolated-declaration-errors",
                    path.basename(file)
                );
            } else if(results.diagnostics.some(d =>unreliableEmitErrors.has(d.code))) {
                file = path.join(
                    path.dirname(file),
                    "with-unreliable-errors",
                    path.basename(file)
                );
            }
            if (allTests.length > 5) {
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

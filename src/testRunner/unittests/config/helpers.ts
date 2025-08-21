import * as fakes from "../../_namespaces/fakes.js";
import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import * as vfs from "../../_namespaces/vfs.js";

function getParsedCommandJson(
    jsonText: string,
    configFileName: string,
    host: fakes.ParseConfigHost,
    basePath: string | undefined,
    existingOptions: ts.CompilerOptions | undefined,
    existingWatchOptions: ts.WatchOptions | undefined,
) {
    const parsed = ts.parseConfigFileTextToJson(configFileName, jsonText);
    return ts.parseJsonConfigFileContent(
        parsed.config,
        host,
        basePath ?? ts.getNormalizedAbsolutePath(ts.getDirectoryPath(configFileName), host.sys.getCurrentDirectory()),
        existingOptions,
        ts.getNormalizedAbsolutePath(configFileName, host.sys.getCurrentDirectory()),
        /*resolutionStack*/ undefined,
        /*extraFileExtensions*/ undefined,
        /*extendedConfigCache*/ undefined,
        existingWatchOptions,
    );
}

function getParsedCommandJsonSourceFile(
    jsonText: string,
    configFileName: string,
    host: fakes.ParseConfigHost,
    basePath: string | undefined,
    existingOptions: ts.CompilerOptions | undefined,
    existingWatchOptions: ts.WatchOptions | undefined,
) {
    const parsed = ts.parseJsonText(configFileName, jsonText);
    return ts.parseJsonSourceFileConfigFileContent(
        parsed,
        host,
        basePath ?? ts.getNormalizedAbsolutePath(ts.getDirectoryPath(configFileName), host.sys.getCurrentDirectory()),
        existingOptions,
        ts.getNormalizedAbsolutePath(configFileName, host.sys.getCurrentDirectory()),
        /*resolutionStack*/ undefined,
        /*extraFileExtensions*/ undefined,
        /*extendedConfigCache*/ undefined,
        existingWatchOptions,
    );
}

export interface ParseConfigInput {
    createHost: (baseline: string[]) => fakes.ParseConfigHost;
    jsonText: string;
    configFileName: string;
    basePath?: string;
    existingOptions?: ts.CompilerOptions;
    existingWatchOptions?: ts.WatchOptions;
    baselineParsed(baseline: string[], parsed: ts.ParsedCommandLine): void;
}
export interface BaselineParseConfigInput {
    scenario: string;
    subScenario: string;
    input(): ParseConfigInput[];
    skipJson?: boolean;
    skipErrors?: boolean;
    skipFs?: boolean;
    header?(baseline: string[]): void;
}
export function baselineParseConfig(input: BaselineParseConfigInput): void {
    if (!input.skipJson) baselineParseConfigWith("with json api", getParsedCommandJson, input);
    baselineParseConfigWith("with jsonSourceFile api", getParsedCommandJsonSourceFile, input);
}

export function baselineParseConfigHost(baseline: string[], host: fakes.ParseConfigHost): void {
    baseline.push("Fs::", vfs.formatPatch(host.sys.vfs.diff(/*base*/ undefined, { baseIsNotShadowRoot: true })!));
}

function baselineParseConfigWith(
    jsonTest: string,
    getParsed: typeof getParsedCommandJson,
    { scenario, subScenario, input, skipErrors, skipFs, header }: BaselineParseConfigInput,
) {
    describe(subScenario, () => {
        it(jsonTest, () => {
            const baseline: string[] = [];
            header?.(baseline);
            for (const { createHost, jsonText, configFileName, existingOptions, basePath, existingWatchOptions, baselineParsed } of input()) {
                const host = createHost(baseline);
                if (!skipFs) baselineParseConfigHost(baseline, host);
                baseline.push(`configFileName:: ${configFileName}`);
                const parsed = getParsed(jsonText, configFileName, host, basePath, existingOptions, existingWatchOptions);
                baselineParsed(baseline, parsed);
                if (!skipErrors) {
                    baseline.push("Errors::");
                    baseline.push(ts.formatDiagnosticsWithColorAndContext(parsed.errors, {
                        getCurrentDirectory: () => basePath || host.sys.getCurrentDirectory(),
                        getCanonicalFileName: ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames),
                        getNewLine: () => host.sys.newLine,
                    }));
                }
                baseline.push("");
            }
            Harness.Baseline.runBaseline(`config/${scenario}/${subScenario} ${jsonTest}.js`, baseline.join("\n"));
        });
    });
}

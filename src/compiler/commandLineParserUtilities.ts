import { parseConfigFileTextToJson } from "./commandLineParser";
import { isString } from "./core";

/** @internal */
export function readJsonOrUndefined(path: string, hostOrText: { readFile(fileName: string): string | undefined } | string): object | undefined {
    const jsonText = isString(hostOrText) ? hostOrText : hostOrText.readFile(path);
    if (!jsonText) return undefined;
    // gracefully handle if readFile fails or returns not JSON
    const result = parseConfigFileTextToJson(path, jsonText);
    return !result.error ? result.config : undefined;
}

/** @internal */
export function readJson(path: string, host: { readFile(fileName: string): string | undefined }): object {
    return readJsonOrUndefined(path, host) || {};
}

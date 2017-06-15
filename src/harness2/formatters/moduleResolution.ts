import { CompilationResult } from "../compiler";
import { removeTestPathPrefixes } from "../utils";

export function formatModuleResolution(result: CompilationResult) {
    const lines = result.traces.map(removeTestPathPrefixes);
    return JSON.stringify(lines, /*replacer*/ undefined, "    ");
}

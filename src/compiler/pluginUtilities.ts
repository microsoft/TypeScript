/** @internal */
export type Entrypoint = "tsc" | "typescript" | "tsserver" | "tsserverlibrary" | "testRunner";

let currentEntrypoint: Entrypoint | undefined;
let currentTsNamespace: any;

/** @internal */
export function setTypeScriptNamespace(entrypoint: Entrypoint, ts: any) {
    if (currentEntrypoint !== undefined) throw new Error("ts namespace already set");
    currentEntrypoint = entrypoint;
    currentTsNamespace = ts;
}

/** @internal */
export function getTypeScriptNamespace(): any {
    if (currentTsNamespace === undefined) throw new Error("ts namespace unset");
    return currentTsNamespace;
}

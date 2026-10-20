export interface NodeModules {
    fs: typeof import("node:fs");
    module: typeof import("node:module");
    path: typeof import("node:path");
    url: typeof import("node:url");
}
declare function getExePath(modules: NodeModules): string;
export default getExePath;
export declare function getWasmPath(modules: NodeModules): string;

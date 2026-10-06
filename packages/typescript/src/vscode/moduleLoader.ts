import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import type { APIModules } from "./extensionApi.ts";

export interface TypeScriptModuleLoader {
    /**
     * Imports a module from the selected API package. Export paths omit the leading
     * "./", for example "unstable/async". Known keys retain their module types.
     */
    importModule<K extends string>(exportPath: K): Promise<APIModules[K]>;
}

/**
 * Loads the selected installation's API modules in this process.
 * Pass the SDK's packageJsonUri.fsPath through your server's initialization options.
 * Restart this process after an in-place package upgrade to clear its module cache.
 */
export function createTypeScriptModuleLoader(packageJsonPath: string): TypeScriptModuleLoader {
    function importModule<K extends string>(exportPath: K): Promise<APIModules[K]>;
    async function importModule(exportPath: string): Promise<unknown> {
        if (
            !exportPath
            || exportPath.startsWith(".")
            || exportPath.startsWith("/")
            || exportPath.includes("\\")
            || exportPath.split("/").includes("..")
        ) {
            throw new Error(`Invalid TypeScript API module export path '${exportPath}'.`);
        }

        const manifestPath = await fs.realpath(packageJsonPath);
        const manifest: unknown = JSON.parse(await fs.readFile(manifestPath, "utf8"));
        if (!manifest || typeof manifest !== "object" || !("name" in manifest) || typeof manifest.name !== "string") {
            throw new Error(`TypeScript API package manifest at '${packageJsonPath}' does not contain a package name.`);
        }
        const require = createRequire(manifestPath);
        const modulePath = require.resolve(`${manifest.name}/${exportPath}`);
        return import(pathToFileURL(modulePath).href);
    }

    return { importModule };
}

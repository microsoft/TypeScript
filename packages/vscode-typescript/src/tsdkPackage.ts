import {
    type APIModules,
    createTypeScriptModuleLoader,
    type TypeScriptSDK,
} from "@typescript/typescript/unstable/vscode";
import fs from "node:fs";
import module from "node:module";
import path from "node:path";
import type { ExeInfo } from "./util";

// Maps real package.json paths to their contents when API modules were first loaded.
// Node caches the entire ESM graph, so a changed manifest must not reuse that graph.
const loadedPackageManifests = new Map<string, string>();
// Records the first version exposed to a consumer at each real package.json path.
// Server restarts must not hide an in-place upgrade from already-acquired SDKs.
const acquiredPackageVersions = new Map<string, string>();

export function acquireTypeScriptSDK(sdk: TypeScriptSDK): void {
    if (!sdk.packageJsonPath) return;
    const manifestPath = fs.realpathSync.native(sdk.packageJsonPath);
    if (acquiredPackageVersions.has(manifestPath)) return;
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const version = sdk.version === "(local)" || sdk.version === "unknown" ? manifest.version : sdk.version;
    if (typeof version === "string") acquiredPackageVersions.set(manifestPath, version);
}

export async function hasModifiedAcquiredTypeScriptInstallation(packageJsonPath: string | undefined): Promise<boolean> {
    if (!packageJsonPath) return false;
    const manifestPath = await fs.promises.realpath(packageJsonPath);
    const version = acquiredPackageVersions.get(manifestPath);
    if (version === undefined) return false;
    const manifest = JSON.parse(await fs.promises.readFile(manifestPath, "utf8"));
    return manifest.version !== version;
}

export class TypeScriptPackageChangedError extends Error {
    constructor(packageJsonPath: string) {
        super(`The TypeScript API package at '${packageJsonPath}' has changed. Restart extensions to load the matching API client.`);
    }
}

export function isSameTypeScriptInstallation(current: ExeInfo | undefined, selected: ExeInfo): boolean {
    return current !== undefined
        && current.path === selected.path
        && current.version === selected.version
        && current.apiPackageJsonPath === selected.apiPackageJsonPath
        && current.isLocal === selected.isLocal;
}

export function resolvePackageExecutable(packageJsonPath: string, platformPackage: string, exeName: string): string {
    const require = module.createRequire(packageJsonPath);
    const platformPackageJson = require.resolve(`@typescript/${platformPackage}/package.json`);
    return path.join(path.dirname(platformPackageJson), "lib", exeName);
}

export function createTypeScriptSDK(
    version: string,
    packageJsonPath: string | undefined,
    openAPIPipe: (pipe?: string) => Promise<string>,
    isCurrent: () => boolean,
): TypeScriptSDK {
    const loader = packageJsonPath ? createTypeScriptModuleLoader(packageJsonPath) : undefined;
    function importModule<K extends string>(exportPath: K): Promise<APIModules[K]>;
    async function importModule(exportPath: string): Promise<unknown> {
        if (!loader || !packageJsonPath) {
            throw new Error("The selected TypeScript server does not provide a matching JavaScript API package.");
        }
        const manifest = await readAPIManifest(packageJsonPath, version);
        loadedPackageManifests.set(manifest.path, manifest.contents);
        return loader.importModule(exportPath);
    }

    return {
        version,
        packageJsonPath,
        isCurrent,
        importModule,
        async initializeAPIConnection(pipe?: string): Promise<string> {
            if (packageJsonPath) {
                await readAPIManifest(packageJsonPath, version);
            }
            return openAPIPipe(pipe);
        },
    };
}

async function readAPIManifest(packageJsonPath: string, expectedVersion: string): Promise<{ path: string; contents: string; }> {
    const manifestPath = await fs.promises.realpath(packageJsonPath);
    const contents = await fs.promises.readFile(manifestPath, "utf8");
    const packageJson: unknown = JSON.parse(contents);
    if (!packageJson || typeof packageJson !== "object" || !("name" in packageJson) || typeof packageJson.name !== "string") {
        throw new Error(`TypeScript API package manifest at '${packageJsonPath}' does not contain a package name.`);
    }
    const loadedManifest = loadedPackageManifests.get(manifestPath);
    const modulesChanged = loadedManifest !== undefined && loadedManifest !== contents;
    const versionChanged = expectedVersion !== "(local)" && expectedVersion !== "unknown"
        && "version" in packageJson && typeof packageJson.version === "string" && packageJson.version !== expectedVersion;
    if (modulesChanged || versionChanged) {
        throw new TypeScriptPackageChangedError(packageJsonPath);
    }
    return { path: manifestPath, contents };
}

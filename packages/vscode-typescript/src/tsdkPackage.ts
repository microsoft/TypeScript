import fs from "node:fs";
import module from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { ExeInfo } from "./util";

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
    packageJsonUri: Uri | undefined,
    isCurrent: () => boolean,
    initializeConnection: (pipe?: string) => Promise<{ pipe: string; }>,
): TypeScriptSDK {
    function importModule<K extends string>(exportPath: K): Promise<APIModules[K]>;
    function importModule(exportPath: string): Promise<unknown> {
        if (!packageJsonUri) {
            return Promise.reject(new Error("The selected TypeScript server does not provide a matching JavaScript API package."));
        }
        return importPackageModule(packageJsonUri.fsPath, exportPath);
    }

    function checkCurrent(): void {
        if (!isCurrent()) {
            throw new Error("This TypeScript SDK's language server initialization is no longer current.");
        }
    }

    return {
        version,
        packageJsonUri,
        importModule,
        async initializeAPIConnection(pipe?: string): Promise<string> {
            checkCurrent();
            const result = await initializeConnection(pipe);
            checkCurrent();
            return result.pipe;
        },
    };
}

export async function importPackageModule(packageJsonPath: string, exportPath: string): Promise<unknown> {
    if (
        !exportPath
        || exportPath.startsWith(".")
        || exportPath.startsWith("/")
        || exportPath.includes("\\")
        || exportPath.split("/").includes("..")
    ) {
        throw new Error(`Invalid TypeScript API module export path '${exportPath}'.`);
    }

    const packageJson: unknown = JSON.parse(await fs.promises.readFile(packageJsonPath, "utf8"));
    if (!packageJson || typeof packageJson !== "object" || !("name" in packageJson) || typeof packageJson.name !== "string") {
        throw new Error(`TypeScript API package manifest at '${packageJsonPath}' does not contain a package name.`);
    }

    const require = module.createRequire(packageJsonPath);
    const modulePath = require.resolve(`${packageJson.name}/${exportPath}`);
    return import(pathToFileURL(modulePath).href);
}
import type {
    APIModules,
    TypeScriptSDK,
    Uri,
} from "@typescript/typescript/unstable/vscode";

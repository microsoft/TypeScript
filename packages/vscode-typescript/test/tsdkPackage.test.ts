import { createTypeScriptModuleLoader } from "@typescript/typescript/unstable/vscode";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { describe } from "node:test";
import {
    acquireTypeScriptSDK,
    createTypeScriptSDK,
    hasModifiedAcquiredTypeScriptInstallation,
    isSameTypeScriptInstallation,
    resolvePackageExecutable,
    TypeScriptPackageChangedError,
} from "../src/tsdkPackage";

const platformPackage = `typescript-${process.platform}-${process.arch}`;
const exeSuffix = process.platform === "win32" ? ".exe" : "";
const exeName = `tsc${exeSuffix}`;
const nativeExeName = `tsgo${exeSuffix}`;

describe("same-client restart eligibility", () => {
    const installation = { path: "/typescript/lib/tsc", version: "7.0.2", apiPackageJsonPath: "/typescript/package.json" };

    test("permits an unchanged installation, including bare executables", () => {
        assert.equal(isSameTypeScriptInstallation(installation, { ...installation }), true);
        const bare = { path: installation.path, version: "local", isLocal: true };
        assert.equal(isSameTypeScriptInstallation(bare, { ...bare }), true);
    });

    test("requires a new session when a bare executable gains a companion package", () => {
        const bare = { path: installation.path, version: installation.version };
        assert.equal(isSameTypeScriptInstallation(bare, installation), false);
        assert.equal(isSameTypeScriptInstallation(installation, bare), false);
    });

    test("requires a new session when the package changes at the same binary path", () => {
        assert.equal(isSameTypeScriptInstallation(installation, { ...installation, apiPackageJsonPath: "/other-typescript/package.json" }), false);
    });

    test("requires a new session when the version changes at the same binary path", () => {
        assert.equal(isSameTypeScriptInstallation(installation, { ...installation, version: "7.0.3" }), false);
    });

    test("requires a new session when the executable or local status changes", () => {
        assert.equal(isSameTypeScriptInstallation(installation, { ...installation, path: "/other-typescript/lib/tsc" }), false);
        assert.equal(isSameTypeScriptInstallation(installation, { ...installation, isLocal: true }), false);
        assert.equal(isSameTypeScriptInstallation(undefined, installation), false);
    });
});

function createPackage(root: string, relativePath: string): string {
    const packagePath = path.join(root, relativePath);
    fs.mkdirSync(packagePath, { recursive: true });
    const packageJsonPath = path.join(packagePath, "package.json");
    fs.writeFileSync(packageJsonPath, "{}");
    return packageJsonPath;
}

function linkPackage(root: string, relativePath: string, targetPackageJson: string): void {
    const packagePath = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(packagePath), { recursive: true });
    fs.symlinkSync(
        path.dirname(targetPackageJson),
        packagePath,
        process.platform === "win32" ? "junction" : "dir",
    );
}

function createFixture(t: test.TestContext): string {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "tsdk-package-"));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    return fs.realpathSync(root);
}

function packageSDK(packageJsonPath: string, version = "unknown"): TypeScriptSDK {
    return createTypeScriptSDK(version, packageJsonPath, async () => "pipe", () => true);
}

interface ResolutionCase {
    packagePath: string;
    platformPath: string;
    dependencyLink?: string;
    platformPackage?: string;
    exeName?: string;
}

function testResolution(name: string, resolutionCase: ResolutionCase): void {
    test(name, t => {
        const root = createFixture(t);
        const packageJsonPath = createPackage(root, resolutionCase.packagePath);
        const platformPackageJson = createPackage(root, resolutionCase.platformPath);
        if (resolutionCase.dependencyLink) {
            linkPackage(root, resolutionCase.dependencyLink, platformPackageJson);
        }

        const resolvedExeName = resolutionCase.exeName ?? exeName;
        assert.equal(
            resolvePackageExecutable(packageJsonPath, resolutionCase.platformPackage ?? platformPackage, resolvedExeName),
            path.join(path.dirname(platformPackageJson), "lib", resolvedExeName),
        );
    });
}

describe("tsdk package resolution", { concurrency: true }, () => {
    testResolution("resolves the TypeScript 7 package", {
        packagePath: "node_modules/typescript",
        platformPath: `node_modules/@typescript/${platformPackage}`,
    });

    testResolution("resolves the TypeScript 7 scoped alias recommended in the 7.0 release post", {
        packagePath: "node_modules/@typescript/native",
        platformPath: `node_modules/@typescript/${platformPackage}`,
    });

    testResolution("resolves an unscoped TypeScript 7 alias", {
        packagePath: "node_modules/typescript-next",
        platformPath: `node_modules/@typescript/${platformPackage}`,
    });

    const nativePlatformPackage = `native-preview-${process.platform}-${process.arch}`;
    testResolution("resolves the native-preview package", {
        packagePath: "node_modules/@typescript/typescript",
        platformPath: `node_modules/@typescript/${nativePlatformPackage}`,
        platformPackage: nativePlatformPackage,
        exeName: nativeExeName,
    });

    testResolution("resolves a non-hoisted platform package", {
        packagePath: "node_modules/@typescript/native",
        platformPath: `node_modules/@typescript/native/node_modules/@typescript/${platformPackage}`,
    });

    testResolution("resolves a platform package hoisted above a workspace", {
        packagePath: "packages/app/node_modules/@typescript/native",
        platformPath: `node_modules/@typescript/${platformPackage}`,
    });

    const pnpmStore = "node_modules/.pnpm/typescript@7.0.2/node_modules";
    testResolution("resolves a pnpm virtual-store package", {
        packagePath: `${pnpmStore}/typescript`,
        platformPath: `node_modules/.pnpm/@typescript+${platformPackage}@7.0.2/node_modules/@typescript/${platformPackage}`,
        dependencyLink: `${pnpmStore}/@typescript/${platformPackage}`,
    });

    const nativePreviewVersion = "7.0.0-dev.20260707.2";
    const pnpmNativePreviewStore = `node_modules/.pnpm/@typescript+native-preview@${nativePreviewVersion}/node_modules`;
    testResolution("resolves a pnpm native-preview virtual-store package", {
        packagePath: `${pnpmNativePreviewStore}/@typescript/typescript`,
        platformPath: `node_modules/.pnpm/@typescript+${nativePlatformPackage}@${nativePreviewVersion}/node_modules/@typescript/${nativePlatformPackage}`,
        dependencyLink: `${pnpmNativePreviewStore}/@typescript/${nativePlatformPackage}`,
        platformPackage: nativePlatformPackage,
        exeName: nativeExeName,
    });

    const npmStore = "node_modules/.store/typescript@7.0.2-hash/node_modules";
    testResolution("resolves an npm linked-store package", {
        packagePath: `${npmStore}/typescript`,
        platformPath: `node_modules/.store/@typescript+${platformPackage}@7.0.2-hash/node_modules/@typescript/${platformPackage}`,
        dependencyLink: `${npmStore}/@typescript/${platformPackage}`,
    });

    test("throws when the platform package is missing", t => {
        const root = createFixture(t);
        const packageJsonPath = createPackage(root, "node_modules/@typescript/native");

        assert.throws(
            () => resolvePackageExecutable(packageJsonPath, platformPackage, exeName),
            { code: "MODULE_NOT_FOUND" },
        );
    });
});

describe("TypeScript API module loading", { concurrency: true }, () => {
    test("restart detection uses the same canonical path for SDK acquisition and lookup", async t => {
        const root = createFixture(t);
        const manifestPath = path.join(root, "package.json");
        fs.writeFileSync(manifestPath, JSON.stringify({ version: "1" }));
        const acquisitionPath = process.platform === "win32" ? manifestPath.toLowerCase() : manifestPath;
        assert.equal(fs.realpathSync.native(acquisitionPath), await fs.promises.realpath(manifestPath));
        acquireTypeScriptSDK(packageSDK(acquisitionPath, "1"));
        fs.writeFileSync(manifestPath, JSON.stringify({ version: "2" }));
        assert.equal(await hasModifiedAcquiredTypeScriptInstallation(manifestPath), true);
    });

    test("restart detection requires an acquired SDK at the same location and a changed version", async t => {
        const root = createFixture(t);
        const manifestPath = path.join(root, "package.json");
        const writeManifest = (version: string, extra = "") => fs.writeFileSync(manifestPath, JSON.stringify({ version, extra }));
        writeManifest("1");
        assert.equal(await hasModifiedAcquiredTypeScriptInstallation(manifestPath), false);
        const sdk = createTypeScriptSDK("1", manifestPath, async () => "pipe", () => true);
        acquireTypeScriptSDK(sdk);
        assert.equal(await hasModifiedAcquiredTypeScriptInstallation(manifestPath), false);
        writeManifest("1", "metadata changed");
        assert.equal(await hasModifiedAcquiredTypeScriptInstallation(manifestPath), false);
        writeManifest("2");
        assert.equal(await hasModifiedAcquiredTypeScriptInstallation(manifestPath), true);
        acquireTypeScriptSDK(createTypeScriptSDK("2", manifestPath, async () => "pipe", () => true));
        assert.equal(await hasModifiedAcquiredTypeScriptInstallation(manifestPath), true);
        const newPath = path.join(root, "other.json");
        fs.writeFileSync(newPath, JSON.stringify({ version: "2" }));
        assert.equal(await hasModifiedAcquiredTypeScriptInstallation(newPath), false);
        assert.equal(await hasModifiedAcquiredTypeScriptInstallation(undefined), false);
    });

    test("rejects in-place package upgrades instead of returning cached modules or opening a mismatched pipe", async t => {
        const root = createFixture(t);
        const packageJsonPath = path.join(root, "package.json");
        const writeManifest = (version: string) =>
            fs.writeFileSync(
                packageJsonPath,
                JSON.stringify({
                    name: "typescript-selected",
                    version,
                    type: "module",
                    exports: { "./unstable/test": "./api.js", "./unstable/other": "./other.js" },
                }),
            );
        writeManifest("1");
        fs.writeFileSync(path.join(root, "dependency.js"), "export const version = 1;");
        fs.writeFileSync(path.join(root, "api.js"), 'export { version } from "./dependency.js";');
        fs.writeFileSync(path.join(root, "other.js"), 'export { version } from "./dependency.js";');
        const originalSDK = packageSDK(packageJsonPath, "1");
        assert.equal((await originalSDK.importModule("typescript/unstable/test") as { version: number; }).version, 1);

        writeManifest("2");
        fs.writeFileSync(path.join(root, "dependency.js"), "export const version = 2;");
        await assert.rejects(originalSDK.importModule("typescript/unstable/test"), TypeScriptPackageChangedError);
        await assert.rejects(originalSDK.importModule("typescript/unstable/other"), TypeScriptPackageChangedError);

        let pipes = 0;
        const sdk = createTypeScriptSDK(
            "2",
            packageJsonPath,
            async () => {
                pipes++;
                return "mismatched-pipe";
            },
            () => true,
        );
        await assert.rejects(sdk.importModule("typescript/unstable/test"), TypeScriptPackageChangedError);
        await assert.rejects(sdk.initializeAPIConnection(), TypeScriptPackageChangedError);
        assert.equal(pipes, 0);
        const replacement = path.join(root, "replacement");
        fs.mkdirSync(replacement);
        fs.copyFileSync(packageJsonPath, path.join(replacement, "package.json"));
        for (const file of ["api.js", "other.js", "dependency.js"]) {
            fs.copyFileSync(path.join(root, file), path.join(replacement, file));
        }
        assert.equal((await packageSDK(path.join(replacement, "package.json"), "2").importModule("typescript/unstable/test") as { version: number; }).version, 2);
    });

    test("imports an exported module relative to the selected package", async t => {
        const root = createFixture(t);
        const packagePath = path.join(root, "selected-typescript");
        fs.mkdirSync(path.join(packagePath, "dist"), { recursive: true });
        const packageJsonPath = path.join(packagePath, "package.json");
        fs.writeFileSync(
            packageJsonPath,
            JSON.stringify({
                name: "typescript-selected",
                type: "module",
                exports: {
                    "./unstable/test": "./dist/async.js",
                },
            }),
        );
        fs.writeFileSync(path.join(packagePath, "dist", "async.js"), "export const selected = true;\n");

        const sdk = createTypeScriptSDK("selected", packageJsonPath, async () => {
            assert.fail("Loading an API module must not open a pipe.");
        }, () => true);
        assert.equal(sdk.packageJsonPath, packageJsonPath);
        const loaded = await sdk.importModule("typescript/unstable/test");
        assert.equal((loaded as { selected: boolean; }).selected, true);
        assert.equal(await sdk.importModule("typescript/unstable/test"), loaded);
        const loader = createTypeScriptModuleLoader(packageJsonPath);
        assert.equal(await loader.importModule("typescript/unstable/test"), loaded);
        await assert.rejects(loader.importModule("unstable/test"), /Invalid TypeScript API module export path/);
    });

    type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

    function checkType<T extends true>(_equal: T): void {}

    async function checkPublicTypes(connection: TypeScriptSDK, exportPath: string, knownExportPath: "typescript/unstable/async" | "typescript/unstable/ast"): Promise<void> {
        const asyncModule = connection.importModule("typescript/unstable/async");
        checkType<Equal<typeof asyncModule, Promise<typeof import("@typescript/typescript/unstable/async")>>>(true);
        const syncModule = connection.importModule("typescript/unstable/sync");
        checkType<Equal<typeof syncModule, Promise<typeof import("@typescript/typescript/unstable/sync")>>>(true);
        const fsModule = connection.importModule("typescript/unstable/fs");
        checkType<Equal<typeof fsModule, Promise<typeof import("@typescript/typescript/unstable/fs")>>>(true);
        const pathModule = connection.importModule("typescript/unstable/path");
        checkType<Equal<typeof pathModule, Promise<typeof import("@typescript/typescript/unstable/path")>>>(true);
        const protoModule = connection.importModule("typescript/unstable/proto");
        checkType<Equal<typeof protoModule, Promise<typeof import("@typescript/typescript/unstable/proto")>>>(true);
        const astModule = connection.importModule("typescript/unstable/ast");
        checkType<Equal<typeof astModule, Promise<typeof import("@typescript/typescript/unstable/ast")>>>(true);
        const isModule = connection.importModule("typescript/unstable/ast/is");
        checkType<Equal<typeof isModule, Promise<typeof import("@typescript/typescript/unstable/ast/is")>>>(true);
        const factoryModule = connection.importModule("typescript/unstable/ast/factory");
        checkType<Equal<typeof factoryModule, Promise<typeof import("@typescript/typescript/unstable/ast/factory")>>>(true);
        const utilsModule = connection.importModule("typescript/unstable/ast/utils");
        checkType<Equal<typeof utilsModule, Promise<typeof import("@typescript/typescript/unstable/ast/utils")>>>(true);
        const scannerModule = connection.importModule("typescript/unstable/ast/scanner");
        checkType<Equal<typeof scannerModule, Promise<typeof import("@typescript/typescript/unstable/ast/scanner")>>>(true);
        const visitorModule = connection.importModule("typescript/unstable/ast/visitor");
        checkType<Equal<typeof visitorModule, Promise<typeof import("@typescript/typescript/unstable/ast/visitor")>>>(true);
        const cloneModule = connection.importModule("typescript/unstable/ast/clone");
        checkType<Equal<typeof cloneModule, Promise<typeof import("@typescript/typescript/unstable/ast/clone")>>>(true);
        const knownModule = connection.importModule(knownExportPath);
        checkType<Equal<typeof knownModule, Promise<typeof import("@typescript/typescript/unstable/async") | typeof import("@typescript/typescript/unstable/ast")>>>(true);
        const unknownModule = connection.importModule("typescript/unstable/future");
        checkType<Equal<typeof unknownModule, Promise<unknown>>>(true);
        const dynamicModule = connection.importModule(exportPath);
        checkType<Equal<typeof dynamicModule, Promise<unknown>>>(true);
        // @ts-expect-error Module export paths must be strings despite the map's index signature.
        connection.importModule(0);
        const { API } = await asyncModule;
        const pipe = await connection.initializeAPIConnection();
        checkType<Equal<typeof pipe, string>>(true);
        checkType<Equal<typeof connection.packageJsonPath, string | undefined>>(true);
        const api = await API.fromLSPConnection({ pipe });
        void api;
    }
    void checkPublicTypes;

    function checkEventTypes(extension: ExtensionAPI): void {
        extension.onLanguageServerInitialized(sdk => {
            checkType<Equal<typeof sdk, TypeScriptSDK>>(true);
        });
        // @ts-expect-error Connection creation belongs to the initialized SDK.
        extension.initializeAPIConnection();
    }
    void checkEventTypes;

    test("bare executable SDKs connect without a package but reject module loading", async () => {
        let calls = 0;
        const sdk = createTypeScriptSDK("local", undefined, async pipe => {
            calls++;
            return pipe ?? "generated-pipe";
        }, () => true);
        assert.equal(calls, 0);
        assert.equal(sdk.packageJsonPath, undefined);
        assert.equal(await sdk.initializeAPIConnection("custom-pipe"), "custom-pipe");
        assert.equal(calls, 1);
        await assert.rejects(sdk.importModule("typescript/unstable/async"), /does not provide a matching JavaScript API package/);
    });

    test("SDK connection creation awaits the lifecycle scheduler's result", async () => {
        let finish!: (value: string) => void;
        const ready = new Promise<string>(resolve => {
            finish = resolve;
        });
        const sdk = createTypeScriptSDK("1", undefined, () => ready, () => true);
        const connection = sdk.initializeAPIConnection();
        finish("restarted-pipe");
        assert.equal(await connection, "restarted-pipe");
    });

    test("SDK connection creation forwards the synchronous transport selection", async () => {
        const sdk = createTypeScriptSDK("local", undefined, async (pipe, synchronous) => {
            assert.equal(pipe, "sync-pipe");
            assert.equal(synchronous, true);
            return pipe;
        }, () => true);
        assert.equal(await sdk.initializeAPIConnection("sync-pipe", true), "sync-pipe");
    });

    test("isCurrent is a synchronous live snapshot without opening a pipe", () => {
        let current = true;
        const sdk = createTypeScriptSDK("1", undefined, async () => assert.fail("isCurrent must not open a pipe"), () => current);
        assert.equal(sdk.isCurrent(), true);
        current = false;
        assert.equal(sdk.isCurrent(), false);
        current = true;
        assert.equal(sdk.isCurrent(), true);
    });

    test("rejects invalid export paths", async t => {
        const root = createFixture(t);
        const packageJsonPath = path.join(root, "package.json");
        fs.writeFileSync(packageJsonPath, JSON.stringify({ name: "typescript-selected" }));

        for (const exportPath of ["", "unstable/async", "typescript/", "@typescript/typescript/unstable/async", "./unstable/async", "../async", "/unstable/async", "typescript/unstable\\async", "typescript/../async"]) {
            await assert.rejects(
                packageSDK(packageJsonPath).importModule(exportPath),
                new Error(`Invalid TypeScript API module export path '${exportPath}'.`),
            );
        }
    });

    test("rejects a manifest without a package name", async t => {
        const root = createFixture(t);
        const packageJsonPath = path.join(root, "package.json");
        fs.writeFileSync(packageJsonPath, "{}");

        await assert.rejects(
            packageSDK(packageJsonPath).importModule("typescript/unstable/async"),
            new Error(`TypeScript API package manifest at '${packageJsonPath}' does not contain a package name.`),
        );
    });
});
import type {
    ExtensionAPI,
    TypeScriptSDK,
} from "@typescript/typescript/unstable/vscode";

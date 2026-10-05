import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { describe } from "node:test";
import {
    createTypeScriptSDK,
    importPackageModule,
    isSameTypeScriptInstallation,
    resolvePackageExecutable,
} from "../src/tsdkPackage";

const platformPackage = `typescript-${process.platform}-${process.arch}`;
const exeSuffix = process.platform === "win32" ? ".exe" : "";
const exeName = `tsc${exeSuffix}`;
const nativeExeName = `tsgo${exeSuffix}`;

describe("same-client restart eligibility", () => {
    const installation = { path: "/typescript/lib/tsc", version: "7.0.2", apiPackageJsonPath: "/typescript/package.json" };

    test("permits an unchanged installation, including bare executables", () => {
        assert.equal(isSameTypeScriptInstallation(installation, { ...installation }), true);
        const bare = { path: installation.path, version: "(local)", isLocal: true };
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

        const packageJsonUri: import("@typescript/typescript/unstable/vscode").Uri = {
            scheme: "file",
            authority: "",
            path: packageJsonPath,
            query: "",
            fragment: "",
            fsPath: packageJsonPath,
            with(change) {
                return { ...this, ...change };
            },
            toString() {
                return `file://${this.path}`;
            },
            toJSON() {
                return { scheme: this.scheme, path: this.path };
            },
        };
        let current = true;
        const sdk = createTypeScriptSDK("selected", packageJsonUri, () => current, async () => {
            assert.fail("Loading an API module must not open a pipe.");
        });
        assert.equal(sdk.packageJsonUri, packageJsonUri);
        const loaded = await sdk.importModule("unstable/test");
        assert.equal((loaded as { selected: boolean; }).selected, true);
        current = false;
        assert.equal(await sdk.importModule("unstable/test"), loaded);
    });

    type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

    function checkType<T extends true>(_equal: T): void {}

    async function checkPublicTypes(connection: TypeScriptSDK, exportPath: string, knownExportPath: "unstable/async" | "unstable/ast"): Promise<void> {
        const asyncModule = connection.importModule("unstable/async");
        checkType<Equal<typeof asyncModule, Promise<typeof import("@typescript/typescript/unstable/async")>>>(true);
        const syncModule = connection.importModule("unstable/sync");
        checkType<Equal<typeof syncModule, Promise<typeof import("@typescript/typescript/unstable/sync")>>>(true);
        const fsModule = connection.importModule("unstable/fs");
        checkType<Equal<typeof fsModule, Promise<typeof import("@typescript/typescript/unstable/fs")>>>(true);
        const protoModule = connection.importModule("unstable/proto");
        checkType<Equal<typeof protoModule, Promise<typeof import("@typescript/typescript/unstable/proto")>>>(true);
        const astModule = connection.importModule("unstable/ast");
        checkType<Equal<typeof astModule, Promise<typeof import("@typescript/typescript/unstable/ast")>>>(true);
        const isModule = connection.importModule("unstable/ast/is");
        checkType<Equal<typeof isModule, Promise<typeof import("@typescript/typescript/unstable/ast/is")>>>(true);
        const factoryModule = connection.importModule("unstable/ast/factory");
        checkType<Equal<typeof factoryModule, Promise<typeof import("@typescript/typescript/unstable/ast/factory")>>>(true);
        const utilsModule = connection.importModule("unstable/ast/utils");
        checkType<Equal<typeof utilsModule, Promise<typeof import("@typescript/typescript/unstable/ast/utils")>>>(true);
        const scannerModule = connection.importModule("unstable/ast/scanner");
        checkType<Equal<typeof scannerModule, Promise<typeof import("@typescript/typescript/unstable/ast/scanner")>>>(true);
        const visitorModule = connection.importModule("unstable/ast/visitor");
        checkType<Equal<typeof visitorModule, Promise<typeof import("@typescript/typescript/unstable/ast/visitor")>>>(true);
        const cloneModule = connection.importModule("unstable/ast/clone");
        checkType<Equal<typeof cloneModule, Promise<typeof import("@typescript/typescript/unstable/ast/clone")>>>(true);
        const knownModule = connection.importModule(knownExportPath);
        checkType<Equal<typeof knownModule, Promise<typeof import("@typescript/typescript/unstable/async") | typeof import("@typescript/typescript/unstable/ast")>>>(true);
        const unknownModule = connection.importModule("unstable/future");
        checkType<Equal<typeof unknownModule, Promise<unknown>>>(true);
        const dynamicModule = connection.importModule(exportPath);
        checkType<Equal<typeof dynamicModule, Promise<unknown>>>(true);
        // @ts-expect-error Module export paths must be strings despite the map's index signature.
        connection.importModule(0);
        const { API } = await asyncModule;
        const pipe = await connection.initializeAPIConnection();
        checkType<Equal<typeof pipe, string>>(true);
        const packageJsonUri: import("vscode").Uri | undefined = connection.packageJsonUri;
        void packageJsonUri;
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
        const sdk = createTypeScriptSDK("(local)", undefined, () => true, async pipe => {
            calls++;
            return { pipe: pipe ?? "generated-pipe" };
        });
        assert.equal(calls, 0);
        assert.equal(sdk.packageJsonUri, undefined);
        assert.equal(await sdk.initializeAPIConnection("custom-pipe"), "custom-pipe");
        assert.equal(calls, 1);
        await assert.rejects(sdk.importModule("unstable/async"), /does not provide a matching JavaScript API package/);
    });

    test("stale SDKs cannot create a connection to the replacement server", async () => {
        let calls = 0;
        const sdk = createTypeScriptSDK("1", undefined, () => false, async () => {
            calls++;
            return { pipe: "replacement-pipe" };
        });
        await assert.rejects(sdk.initializeAPIConnection(), /no longer current/);
        assert.equal(calls, 0);
    });

    test("a restart during pipe initialization rejects the result", async () => {
        let current = true;
        const sdk = createTypeScriptSDK("1", undefined, () => current, async () => {
            current = false;
            return { pipe: "old-pipe" };
        });
        await assert.rejects(sdk.initializeAPIConnection(), /no longer current/);
    });

    test("rejects invalid export paths", async t => {
        const root = createFixture(t);
        const packageJsonPath = path.join(root, "package.json");
        fs.writeFileSync(packageJsonPath, JSON.stringify({ name: "typescript-selected" }));

        for (const exportPath of ["", "./unstable/async", "../async", "/unstable/async", "unstable\\async"]) {
            await assert.rejects(
                importPackageModule(packageJsonPath, exportPath),
                new Error(`Invalid TypeScript API module export path '${exportPath}'.`),
            );
        }
    });

    test("rejects a manifest without a package name", async t => {
        const root = createFixture(t);
        const packageJsonPath = path.join(root, "package.json");
        fs.writeFileSync(packageJsonPath, "{}");

        await assert.rejects(
            importPackageModule(packageJsonPath, "unstable/async"),
            new Error(`TypeScript API package manifest at '${packageJsonPath}' does not contain a package name.`),
        );
    });
});
import type {
    ExtensionAPI,
    TypeScriptSDK,
} from "@typescript/typescript/unstable/vscode";

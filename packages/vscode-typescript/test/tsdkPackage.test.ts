import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { describe } from "node:test";
import {
    resolvePackageExecutable,
    workspacePackageSubpaths,
} from "../src/tsdkPackage";

const platformPackage = `typescript-${process.platform}-${process.arch}`;
const nativePlatformPackage = `native-preview-${process.platform}-${process.arch}`;
const exeSuffix = process.platform === "win32" ? ".exe" : "";
const exeName = `tsc${exeSuffix}`;
const nativeExeName = `tsgo${exeSuffix}`;

function createPackage(root: string, relativePath: string, packageJson: object = {}): string {
    const packagePath = path.join(root, relativePath);
    fs.mkdirSync(packagePath, { recursive: true });
    const packageJsonPath = path.join(packagePath, "package.json");
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, undefined, 2));
    return packageJsonPath;
}

function createFile(root: string, relativePath: string, content: string = ""): string {
    const filePath = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
    return filePath;
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

function findWorkspacePackage(workspaceRoot: string): { packagePath: string; exePath: string; version: string; } | undefined {
    for (const subpath of workspacePackageSubpaths) {
        const pkgDir = path.join(workspaceRoot, ...subpath);
        const pkgJsonPath = path.join(pkgDir, "package.json");
        if (!fs.existsSync(pkgJsonPath)) {
            continue;
        }
        if (fs.existsSync(path.join(pkgDir, "tsserver.js")) || fs.existsSync(path.join(pkgDir, "lib", "tsserver.js"))) {
            continue;
        }
        const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
        const name: string = typeof pkgJson.name === "string" ? pkgJson.name : "";
        const baseName = name.startsWith("@") ? name.split("/")[1] : name;
        if (!baseName) continue;
        const expectedBin = baseName === "typescript" ? "tsc" : "tsgo";
        const exe = `${expectedBin}${process.platform === "win32" ? ".exe" : ""}`;
        const platPkg = `${baseName}-${process.platform}-${process.arch}`;
        try {
            const exePath = resolvePackageExecutable(pkgJsonPath, platPkg, exe);
            return {
                packagePath: pkgDir,
                exePath,
                version: typeof pkgJson.version === "string" ? pkgJson.version : "unknown",
            };
        }
        catch {}
    }
    return undefined;
}

describe("workspace TypeScript package detection", { concurrency: true }, () => {
    test("detects TypeScript 7 in node_modules/typescript", t => {
        const root = createFixture(t);
        createPackage(root, "node_modules/typescript", {
            name: "typescript",
            version: "7.0.2",
            bin: { tsc: "./bin/tsc" },
        });
        const platformPkg = createPackage(root, `node_modules/@typescript/${platformPackage}`, {
            name: `@typescript/${platformPackage}`,
            version: "7.0.2",
        });
        createFile(path.dirname(platformPkg), `lib/${exeName}`);

        const detected = findWorkspacePackage(root);
        assert.ok(detected);
        assert.equal(detected.packagePath, path.join(root, "node_modules", "typescript"));
        assert.equal(detected.version, "7.0.2");
        assert.equal(detected.exePath, path.join(root, "node_modules", "@typescript", platformPackage, "lib", exeName));
    });

    test("detects TypeScript 7 nightly / next in node_modules/typescript", t => {
        const root = createFixture(t);
        createPackage(root, "node_modules/typescript", {
            name: "typescript",
            version: "7.1.0-dev.20261001",
            bin: { tsc: "./bin/tsc" },
        });
        const platformPkg = createPackage(root, `node_modules/@typescript/${platformPackage}`, {
            name: `@typescript/${platformPackage}`,
            version: "7.1.0-dev.20261001",
        });
        createFile(path.dirname(platformPkg), `lib/${exeName}`);

        const detected = findWorkspacePackage(root);
        assert.ok(detected);
        assert.equal(detected.packagePath, path.join(root, "node_modules", "typescript"));
        assert.equal(detected.version, "7.1.0-dev.20261001");
    });

    test("does not incorrectly detect TypeScript 5.x as TypeScript 7", t => {
        const root = createFixture(t);
        createPackage(root, "node_modules/typescript", {
            name: "typescript",
            version: "5.8.2",
            bin: { tsc: "./bin/tsc", tsserver: "./bin/tsserver" },
        });
        createFile(root, "node_modules/typescript/lib/tsserver.js", "// tsserver");

        const detected = findWorkspacePackage(root);
        assert.equal(detected, undefined);
    });

    test("does not incorrectly detect TypeScript 6.x as TypeScript 7", t => {
        const root = createFixture(t);
        createPackage(root, "node_modules/typescript", {
            name: "typescript",
            version: "6.0.3",
            bin: { tsc: "./bin/tsc", tsserver: "./bin/tsserver" },
        });
        createFile(root, "node_modules/typescript/lib/tsserver.js", "// tsserver");

        const detected = findWorkspacePackage(root);
        assert.equal(detected, undefined);
    });

    test("detects legacy @typescript/native-preview package", t => {
        const root = createFixture(t);
        createPackage(root, "node_modules/@typescript/native-preview", {
            name: "@typescript/native-preview",
            version: "7.0.0-dev.20260707.2",
            bin: { tsgo: "./bin/tsgo" },
        });
        const platformPkg = createPackage(root, `node_modules/@typescript/${nativePlatformPackage}`, {
            name: `@typescript/${nativePlatformPackage}`,
            version: "7.0.0-dev.20260707.2",
        });
        createFile(path.dirname(platformPkg), `lib/${nativeExeName}`);

        const detected = findWorkspacePackage(root);
        assert.ok(detected);
        assert.equal(detected.packagePath, path.join(root, "node_modules", "@typescript", "native-preview"));
        assert.equal(detected.version, "7.0.0-dev.20260707.2");
        assert.equal(detected.exePath, path.join(root, "node_modules", "@typescript", nativePlatformPackage, "lib", nativeExeName));
    });

    test("falls back to legacy @typescript/native-preview when node_modules/typescript is TS 5/6", t => {
        const root = createFixture(t);
        createPackage(root, "node_modules/typescript", {
            name: "typescript",
            version: "5.7.2",
            bin: { tsc: "./bin/tsc" },
        });
        createFile(root, "node_modules/typescript/lib/tsserver.js", "// tsserver");

        createPackage(root, "node_modules/@typescript/native-preview", {
            name: "@typescript/native-preview",
            version: "7.0.0-dev.20260707.2",
            bin: { tsgo: "./bin/tsgo" },
        });
        const platformPkg = createPackage(root, `node_modules/@typescript/${nativePlatformPackage}`, {
            name: `@typescript/${nativePlatformPackage}`,
            version: "7.0.0-dev.20260707.2",
        });
        createFile(path.dirname(platformPkg), `lib/${nativeExeName}`);

        const detected = findWorkspacePackage(root);
        assert.ok(detected);
        assert.equal(detected.packagePath, path.join(root, "node_modules", "@typescript", "native-preview"));
        assert.equal(detected.version, "7.0.0-dev.20260707.2");
    });

    test("prefers TypeScript 7 node_modules/typescript over legacy @typescript/native-preview", t => {
        const root = createFixture(t);
        createPackage(root, "node_modules/typescript", {
            name: "typescript",
            version: "7.0.2",
            bin: { tsc: "./bin/tsc" },
        });
        const platformPkg = createPackage(root, `node_modules/@typescript/${platformPackage}`, {
            name: `@typescript/${platformPackage}`,
            version: "7.0.2",
        });
        createFile(path.dirname(platformPkg), `lib/${exeName}`);

        createPackage(root, "node_modules/@typescript/native-preview", {
            name: "@typescript/native-preview",
            version: "7.0.0-dev.20260707.2",
            bin: { tsgo: "./bin/tsgo" },
        });
        const legacyPlatformPkg = createPackage(root, `node_modules/@typescript/${nativePlatformPackage}`, {
            name: `@typescript/${nativePlatformPackage}`,
            version: "7.0.0-dev.20260707.2",
        });
        createFile(path.dirname(legacyPlatformPkg), `lib/${nativeExeName}`);

        const detected = findWorkspacePackage(root);
        assert.ok(detected);
        assert.equal(detected.packagePath, path.join(root, "node_modules", "typescript"));
        assert.equal(detected.version, "7.0.2");
    });
});

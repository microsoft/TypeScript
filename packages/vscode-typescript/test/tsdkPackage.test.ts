import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { resolvePackageExecutable } from "../src/tsdkPackage";

const platformPackage = `typescript-${process.platform}-${process.arch}`;
const exeSuffix = process.platform === "win32" ? ".exe" : "";
const exeName = `tsc${exeSuffix}`;
const nativeExeName = `tsgo${exeSuffix}`;

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

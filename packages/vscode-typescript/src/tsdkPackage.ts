import module from "node:module";
import path from "node:path";

export const workspacePackageSubpaths: readonly (readonly string[])[] = [
    ["node_modules", "typescript"],
    ["node_modules", "@typescript", "native-preview"],
];

export function resolvePackageExecutable(packageJsonPath: string, platformPackage: string, exeName: string): string {
    const require = module.createRequire(packageJsonPath);
    const platformPackageJson = require.resolve(`@typescript/${platformPackage}/package.json`);
    return path.join(path.dirname(platformPackageJson), "lib", exeName);
}

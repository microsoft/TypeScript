import * as path from "path";
import * as vscode from "vscode";

export const aiConnectionString = "0c6ae279ed8443289764825290e4f9e2-1a736e7c-1324-4338-be46-fc2a58ae4d14-7255";

export const jsTsLanguageModes = [
    "typescript",
    "typescriptreact",
    "javascript",
    "javascriptreact",
];

export const builtinTSExtensionId = "vscode.typescript-language-features";

export interface ExeInfo {
    path: string;
    version: string;
}

export function getBuiltinExePath(context: vscode.ExtensionContext): string {
    return context.asAbsolutePath(path.join("./lib", `tsgo${process.platform === "win32" ? ".exe" : ""}`));
}

function workspaceResolve(relativePath: string): vscode.Uri {
    if (path.isAbsolute(relativePath)) {
        return vscode.Uri.file(relativePath);
    }
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        const workspaceFolder = vscode.workspace.workspaceFolders[0];
        return vscode.Uri.joinPath(workspaceFolder.uri, relativePath);
    }
    return vscode.Uri.file(relativePath);
}

export async function getExe(context: vscode.ExtensionContext): Promise<ExeInfo> {
    const config = vscode.workspace.getConfiguration("typescript.native-preview");
    const exeName = `tsgo${process.platform === "win32" ? ".exe" : ""}`;

    let exe = config.get<string>("tsdk");
    if (exe) {
        if (exe.endsWith("/@typescript/native-preview")) {
            try {
                const packagePath = workspaceResolve(exe);
                const packageJsonPath = vscode.Uri.joinPath(packagePath, "package.json");
                const packageJson = JSON.parse(await vscode.workspace.fs.readFile(packageJsonPath).then(buffer => buffer.toString()));
                const getExePath = (await import(vscode.Uri.joinPath(packagePath, "lib", "getExePath.js").toString())).default;
                return { path: getExePath(), version: packageJson.version };
            }
            catch {}
        }
        try {
            const exePath = workspaceResolve(path.join(exe, exeName));
            await vscode.workspace.fs.stat(exePath);
            return { path: exePath.fsPath, version: "(local)" };
        }
        catch {}
    }

    exe = context.asAbsolutePath(path.join("../", "built", "local", exeName));
    try {
        await vscode.workspace.fs.stat(vscode.Uri.file(exe));
        return { path: exe, version: "(local)" };
    }
    catch {}

    return {
        path: getBuiltinExePath(context),
        version: context.extension.packageJSON.version,
    };
}

export function getLanguageForUri(uri: vscode.Uri): string | undefined {
    const ext = path.posix.extname(uri.path);
    switch (ext) {
        case ".ts":
        case ".mts":
        case ".cts":
            return "typescript";
        case ".js":
        case ".mjs":
        case ".cjs":
            return "javascript";
        case ".tsx":
            return "typescriptreact";
        case ".jsx":
            return "javascriptreact";
        default:
            return undefined;
    }
}

export function needsExtHostRestartOnChange() {
    const majorVersion = parseInt(vscode.version.split(".")[0]);
    const minorVersion = parseInt(vscode.version.split(".")[1]);
    return majorVersion <= 1 && minorVersion < 105;
}

export async function restartExtHostOnChangeIfNeeded(): Promise<void> {
    if (needsExtHostRestartOnChange()) {
        await vscode.commands.executeCommand("workbench.action.restartExtensionHost");
    }
}

/**
 * Read the useTsgo setting from both `js/ts.experimental.useTsgo` and
 * `typescript.experimental.useTsgo`, using `inspect()` to only consider
 * explicitly set values (ignoring VS Code defaults).
 *
 * Returns `true` if either setting is explicitly `true`, `false` if either
 * is explicitly `false` (and neither is `true`), or `undefined` if neither
 * setting has been explicitly configured.
 */
export function getUseTsgo(): boolean | undefined {
    const tsValue = getExplicitUseTsgo("typescript");
    const jsTsValue = getExplicitUseTsgo("js/ts");
    if (tsValue === true || jsTsValue === true) return true;
    if (tsValue === false || jsTsValue === false) return false;
    return undefined;
}

/**
 * Returns the name of the setting that is explicitly set to `false`,
 * preferring `js/ts` over `typescript`. Returns `undefined` if neither
 * is explicitly `false`.
 */
export function getUseTsgoFalseSetting(): string | undefined {
    if (getExplicitUseTsgo("js/ts") === false) return "js/ts.experimental.useTsgo";
    if (getExplicitUseTsgo("typescript") === false) return "typescript.experimental.useTsgo";
    return undefined;
}

function getExplicitUseTsgo(section: string): boolean | undefined {
    const config = vscode.workspace.getConfiguration(section);
    const inspected = config.inspect<boolean>("experimental.useTsgo");
    if (!inspected) return undefined;

    const explicitValues: (boolean | undefined)[] = [
        inspected.workspaceFolderLanguageValue,
        inspected.workspaceLanguageValue,
        inspected.globalLanguageValue,
        inspected.workspaceFolderValue,
        inspected.workspaceValue,
        inspected.globalValue,
    ];

    if (explicitValues.some(v => v === true)) return true;
    if (explicitValues.some(v => v === false)) return false;
    return undefined;
}

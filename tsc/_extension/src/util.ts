import { exec } from "child_process";
import { get } from "http";
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

/**
 * URI schemes for which JS/TS language features should be disabled.
 */
export const disabledSchemes = new Set([
    "git",
    "vsls",
    "github",
    "azurerepos",
    "chat-editing-text-model",
]);

export function isSupportedLanguageMode(doc: vscode.TextDocument): boolean {
    return jsTsLanguageModes.includes(doc.languageId);
}

const configRegex = /^[jt]sconfig\.(.+\.)?json$/i;
export function isJsConfigOrTsConfigFileName(fileName: string): boolean {
    return configRegex.test(path.basename(fileName));
}

export interface ExeInfo {
    path: string;
    version: string;
}

export async function getBuiltinExePath(context: vscode.ExtensionContext): Promise<{ path: string; version: string; }> {
    if (context.extensionMode === vscode.ExtensionMode.Development) {
        const exeName = `tsgo${process.platform === "win32" ? ".exe" : ""}`;
        const exe = context.asAbsolutePath(path.join("../", "built", "local", exeName));
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(exe));
            return { path: exe, version: "(local)" };
        }
        catch {}
    }
    return {
        path: context.asAbsolutePath(path.join("./lib", `tsgo${process.platform === "win32" ? ".exe" : ""}`)),
        version: context.extension.packageJSON.version,
    };
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

export const useWorkspaceTsdkStorageKey = "typescript.native-preview.useWorkspaceTsdk";

export async function getExe(context: vscode.ExtensionContext): Promise<ExeInfo> {
    const config = vscode.workspace.getConfiguration("typescript.native-preview");

    let tsdk = config.get<string>("tsdk");
    const exeInspection = config.inspect<string>("tsdk");

    // If tsdk is set at the workspace level, require the user to have
    // explicitly opted in via the version picker (stored in workspace state).
    if (tsdk && (exeInspection?.workspaceValue !== undefined || exeInspection?.workspaceFolderValue !== undefined)) {
        const useWorkspaceTsdk = context.workspaceState.get<boolean>(useWorkspaceTsdkStorageKey, false);
        if (!useWorkspaceTsdk) {
            tsdk = exeInspection.globalValue;
        }
    }

    if (tsdk) {
        const exe = await resolveTsdkPathToExe(tsdk);
        if (exe) {
            return exe;
        }
    }

    return getBuiltinExePath(context);
}

export async function resolveTsdkPathToExe(tsdkPath: string): Promise<{ path: string; version: string; } | undefined> {
    if (tsdkPath.endsWith("/@typescript/native-preview")) {
        try {
            const packagePath = workspaceResolve(tsdkPath);
            const packageJsonPath = vscode.Uri.joinPath(packagePath, "package.json");
            const packageJson = JSON.parse(await vscode.workspace.fs.readFile(packageJsonPath).then(buffer => buffer.toString()));
            const getExePath = (await import(vscode.Uri.joinPath(packagePath, "lib", "getExePath.js").toString())).default;
            return { path: getExePath(), version: packageJson.version };
        }
        catch {}
    }
    try {
        const exePath = workspaceResolve(path.join(tsdkPath, `tsgo${process.platform === "win32" ? ".exe" : ""}`));
        await vscode.workspace.fs.stat(exePath);
        return { path: exePath.fsPath, version: "(local)" };
    }
    catch {}
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

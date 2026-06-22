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

/**
 * Returns the base directory for resolving relative paths in workspace config.
 * - Multi-root workspace: the directory containing the `.code-workspace` file.
 * - Single-root workspace: the lone workspace folder.
 * - No workspace: undefined.
 */
export function workspaceConfigBase(): vscode.Uri | undefined {
    const wsFile = vscode.workspace.workspaceFile;
    if (wsFile && wsFile.scheme === "file") {
        return vscode.Uri.file(path.dirname(wsFile.fsPath));
    }
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        return vscode.workspace.workspaceFolders[0].uri;
    }
    return undefined;
}

function workspaceResolve(relativePath: string): vscode.Uri {
    if (path.isAbsolute(relativePath)) {
        return vscode.Uri.file(relativePath);
    }
    const base = workspaceConfigBase();
    if (base) {
        return vscode.Uri.joinPath(base, relativePath);
    }
    return vscode.Uri.file(relativePath);
}

/**
 * Memento used to control whether the user has opted into using a tsdk location defined
 * in workspace settings. This is *not* a trust boundary - workspace trust is required
 * before the extension will prompt to set this memento to true. This setting is here to
 * provide users a way to opt out of using the workspace-provided tsdk without changing
 * committed workspace settings, e.g. when the workspace tsdk is very outdated or the user
 * is trialing a nightly TS version. Since the stored value is only a boolean, it does not
 * protect against executing a different tsdk than the one the user originally opted into
 * if the workspace settings or node_modules content changes - that's why workspace trust
 * is always required, and why the prompts that set this value should not be interpreted
 * as indicating trust for a specific tsdk installation.
 */
export const useWorkspaceTsdkStorageKey = "typescript.native-preview.useWorkspaceTsdk";

export async function getExe(context: vscode.ExtensionContext): Promise<ExeInfo> {
    const config = vscode.workspace.getConfiguration("typescript.native-preview");

    let tsdk = config.get<string>("tsdk");
    const exeInspection = config.inspect<string>("tsdk");

    // If tsdk is set at the workspace level, require both workspace trust and
    // explicit user opt-in. Workspace trust can be revoked after the memento is
    // set, so we must always check both.
    if (tsdk && exeInspection?.workspaceValue !== undefined) {
        if (!vscode.workspace.isTrusted || !context.workspaceState.get<boolean>(useWorkspaceTsdkStorageKey, false)) {
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

/**
 * Resolve a tsdk path (which may be relative) to a normalized absolute path.
 */
export function resolveTsdkPath(tsdkPath: string): string {
    return path.normalize(workspaceResolve(tsdkPath).fsPath);
}

export async function resolveTsdkPathToExe(tsdkPath: string): Promise<{ path: string; version: string; } | undefined> {
    if (tsdkPath.endsWith("/@typescript/native-preview") || tsdkPath.endsWith("\\@typescript\\native-preview")) {
        try {
            const packagePath = workspaceResolve(tsdkPath);
            const packageJsonPath = vscode.Uri.joinPath(packagePath, "package.json");
            const packageJson = JSON.parse(await vscode.workspace.fs.readFile(packageJsonPath).then(buffer => buffer.toString()));
            // NOTE: Keep in sync with _packages/native-preview/lib/getExePath.js.
            const exeName = `tsgo${process.platform === "win32" ? ".exe" : ""}`;
            const platformPackage = `native-preview-${process.platform}-${process.arch}`;
            const exePath = vscode.Uri.joinPath(packagePath, "..", platformPackage, "lib", exeName);
            await vscode.workspace.fs.stat(exePath);
            return { path: withLongPathPrefix(exePath.fsPath), version: packageJson.version };
        }
        catch {}
    }
    try {
        const exePath = workspaceResolve(path.join(tsdkPath, `tsgo${process.platform === "win32" ? ".exe" : ""}`));
        await vscode.workspace.fs.stat(exePath);
        return { path: withLongPathPrefix(exePath.fsPath), version: "(local)" };
    }
    catch {}
}

function withLongPathPrefix(exePath: string): string {
    if (process.platform === "win32" && exePath.length >= 248 && !exePath.startsWith("\\\\?\\")) {
        return "\\\\?\\" + exePath;
    }
    return exePath;
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
 * Each setting key is resolved using standard VS Code precedence (workspace
 * folder > workspace > global, with language-specific overrides taking
 * priority within each scope). When both keys are explicitly configured, the
 * value set at the most specific scope wins, and `js/ts` wins over
 * `typescript` at the same scope. Returns `undefined` if neither setting has
 * been explicitly configured.
 */
export function getUseTsgo(): boolean | undefined {
    const tsValue = getExplicitUseTsgo("typescript");
    const jsTsValue = getExplicitUseTsgo("js/ts");

    if (tsValue !== undefined || jsTsValue !== undefined) {
        const jsTsTarget = getExplicitConfigTarget(vscode.workspace.getConfiguration("js/ts"), "experimental.useTsgo");
        const tsTarget = getExplicitConfigTarget(vscode.workspace.getConfiguration("typescript"), "experimental.useTsgo");
        const mostSpecific = Math.max(jsTsTarget ?? vscode.ConfigurationTarget.Global, tsTarget ?? vscode.ConfigurationTarget.Global);
        return jsTsTarget === mostSpecific ? jsTsValue : tsValue;
    }

    return undefined;
}

export function getExplicitConfigTarget(
    config: vscode.WorkspaceConfiguration,
    key: string,
): vscode.ConfigurationTarget | undefined {
    const inspection = config.inspect(key);
    if (!inspection) return undefined;
    if (inspection.workspaceFolderValue !== undefined) return vscode.ConfigurationTarget.WorkspaceFolder;
    if (inspection.workspaceValue !== undefined) return vscode.ConfigurationTarget.Workspace;
    if (inspection.globalValue !== undefined) return vscode.ConfigurationTarget.Global;
    return undefined;
}

export enum ConfigName {
    JsTsConfigName = "js/ts.experimental.useTsgo",
    DeprecatedTypeScriptConfigName = "typescript.experimental.useTsgo",
}

/**
 * Returns the name of the setting with the appropriate precedence that is explicitly set,
 * preferring `js/ts` over `typescript`.
 * Returns `undefined` if neither is explicitly specified.
 */
export function getWinningTsgoConfigKey(): ConfigName | undefined {
    const jsTsValue = getExplicitUseTsgo("js/ts");
    const tsValue = getExplicitUseTsgo("typescript");

    if (jsTsValue !== undefined || tsValue !== undefined) {
        const jsTsTarget = getExplicitConfigTarget(vscode.workspace.getConfiguration("js/ts"), "experimental.useTsgo");
        const tsTarget = getExplicitConfigTarget(vscode.workspace.getConfiguration("typescript"), "experimental.useTsgo");
        const mostSpecific = Math.max(jsTsTarget ?? vscode.ConfigurationTarget.Global, tsTarget ?? vscode.ConfigurationTarget.Global);
        return jsTsTarget === mostSpecific ? ConfigName.JsTsConfigName : ConfigName.DeprecatedTypeScriptConfigName;
    }

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

    for (const v of explicitValues) {
        if (v !== undefined) return v;
    }
    return undefined;
}

/**
 * Read a setting following the standard `js/ts > [typescript|javascript]` precedence:
 * the unified `js/ts.<key>` setting wins if explicitly set at any scope, otherwise
 * the per-language `<fallbackSection>.<fallbackKey>` setting is used (including its
 * declared default).
 *
 * Note: we intentionally ignore the unified setting's registered default
 * (`defaultValue`/`defaultLanguageValue` from `inspect()`) so that the per-language
 * fallback's value/default can apply when the user hasn't explicitly set the
 * unified key. Both keys typically declare the same default, so this is observably
 * equivalent in the unset case.
 */
export function readUnifiedConfig<T>(
    key: string,
    fallbackSection: "typescript" | "javascript",
    fallbackKey: string,
    scope: vscode.ConfigurationScope | undefined,
    defaultValue: T,
): T {
    const unified = vscode.workspace.getConfiguration("js/ts", scope).inspect<T>(key);
    const explicit = unified && (
        unified.workspaceFolderLanguageValue
            ?? unified.workspaceFolderValue
            ?? unified.workspaceLanguageValue
            ?? unified.workspaceValue
            ?? unified.globalLanguageValue
            ?? unified.globalValue
    );
    if (explicit !== undefined) return explicit;
    return vscode.workspace.getConfiguration(fallbackSection, scope).get<T>(fallbackKey, defaultValue);
}

export interface PackageInfo {
    name: string;
    version: string;
}

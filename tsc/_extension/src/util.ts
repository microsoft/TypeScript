import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export const aiConnectionString = "0c6ae279ed8443289764825290e4f9e2-1a736e7c-1324-4338-be46-fc2a58ae4d14-7255";

export const languageClientName = "TypeScript Language Server";
export const nightlyExtensionId = "TypeScriptTeam.vscode-typescript-nightly";
export const enableContributedNightlyVersion = true;

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
    name: string;
    isLocal?: boolean;
}

const packagedExeBaseNames = ["tsc", "tsgo"];

export async function getBuiltinExePath(context: vscode.ExtensionContext): Promise<ExeInfo> {
    if (context.extensionMode === vscode.ExtensionMode.Development) {
        const exeName = `tsgo${process.platform === "win32" ? ".exe" : ""}`;
        const exe = context.asAbsolutePath(path.join("../", "built", "local", exeName));
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(exe));
            return { path: exe, version: "(local)", name: "tsgo", isLocal: true };
        }
        catch {}
    }
    return getPackagedExePath(context.extension.extensionUri, getBundledTypeScriptVersion(context.extension.packageJSON));
}

export async function getNightlyExePath(): Promise<ExeInfo | undefined> {
    const extension = vscode.extensions.getExtension(nightlyExtensionId);
    if (!extension) {
        return undefined;
    }

    return tryGetPackagedExePath(extension.extensionUri, getBundledTypeScriptVersion(extension.packageJSON));
}

export async function getDefaultExePath(context: vscode.ExtensionContext): Promise<ExeInfo> {
    if (enableContributedNightlyVersion) {
        const nightlyExe = await getNightlyExePath();
        if (nightlyExe) {
            return nightlyExe;
        }
    }
    return getBuiltinExePath(context);
}

async function getPackagedExePath(extensionUri: vscode.Uri, version: unknown): Promise<ExeInfo> {
    const exe = await tryGetPackagedExePath(extensionUri, version);
    if (exe) {
        return exe;
    }
    throw new Error(vscode.l10n.t("Could not find a TypeScript executable in the extension package."));
}

function getBundledTypeScriptVersion(packageJSON: unknown): string {
    if (packageJSON && typeof packageJSON === "object" && "bundledTypeScriptVersion" in packageJSON) {
        const version = packageJSON.bundledTypeScriptVersion;
        if (typeof version === "string") {
            return version;
        }
    }
    return "unknown";
}

async function tryGetPackagedExePath(extensionUri: vscode.Uri, version: unknown): Promise<ExeInfo | undefined> {
    for (const baseName of packagedExeBaseNames) {
        const exeName = `${baseName}${process.platform === "win32" ? ".exe" : ""}`;
        const exePath = vscode.Uri.joinPath(extensionUri, "lib", exeName);
        try {
            await vscode.workspace.fs.stat(exePath);
            return {
                path: withLongPathPrefix(exePath.fsPath),
                version: typeof version === "string" ? version : "unknown",
                name: baseName,
            };
        }
        catch {}
    }
    return undefined;
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
    for (const candidate of getTrustedTsdkCandidates(context, await getTsdkCandidates())) {
        const exe = await resolveTsdkPathToExe(candidate.value);
        if (exe) {
            return exe;
        }
    }

    return getDefaultExePath(context);
}

export async function hasTsdkConfigured(): Promise<boolean> {
    return (await getTsdkCandidates({ nativeOnly: false })).length > 0;
}

export async function hasNativeTsdkConfigured(context: vscode.ExtensionContext): Promise<boolean> {
    return await getTsdkServerKind(context) === "lsp";
}

export async function getTsdkServerKind(context: vscode.ExtensionContext): Promise<"lsp" | "tsserver" | undefined> {
    for (const candidate of getTrustedTsdkCandidates(context, await getTsdkCandidates({ nativeOnly: false }))) {
        const kind = await classifyTsdk(candidate.value);
        if (kind) {
            return kind;
        }
    }
}

async function classifyTsdk(tsdkPath: string): Promise<"lsp" | "tsserver" | undefined> {
    if (await pathHasTsserverJs(tsdkPath)) {
        return "tsserver";
    }
    if (await resolveTsdkPathToExe(tsdkPath)) {
        return "lsp";
    }
}

function getTrustedTsdkCandidates(context: vscode.ExtensionContext, tsdkCandidates: ExplicitConfigValue<string>[]): ExplicitConfigValue<string>[] {
    // If tsdk is set at the workspace level, require both workspace trust and
    // explicit user opt-in. Workspace trust can be revoked after the memento is
    // set, so we must always check both.
    if (tsdkCandidates.some(candidate => candidate.target !== vscode.ConfigurationTarget.Global)) {
        if (!vscode.workspace.isTrusted || !context.workspaceState.get<boolean>(useWorkspaceTsdkStorageKey, false)) {
            return tsdkCandidates.filter(candidate => candidate.target === vscode.ConfigurationTarget.Global);
        }
    }
    return tsdkCandidates;
}

interface ExplicitConfigValue<T> {
    value: T;
    target: vscode.ConfigurationTarget;
    order: number;
}

interface TsdkConfigSource {
    section: string;
    key: string;
    nativeOnly: boolean;
}

const tsdkConfigSources: readonly TsdkConfigSource[] = [
    { section: "js/ts", key: "tsdk.path", nativeOnly: true },
    { section: "typescript", key: "tsdk", nativeOnly: true },
    { section: "typescript.native-preview", key: "tsdk", nativeOnly: false },
];

export function readNativePreviewConfig<T>(key: string, defaultValue: T): T {
    const explicit = getExplicitConfigValues<T>("js/ts", key)[0];
    if (explicit) {
        return explicit.value;
    }
    return vscode.workspace.getConfiguration("typescript.native-preview").get<T>(key, defaultValue);
}

export function getWorkspaceTsdkConfigValue(): string | undefined {
    return vscode.workspace.getConfiguration("js/ts").inspect<string>("tsdk.path")?.workspaceValue;
}

export async function updateWorkspaceTsdkConfig(value: string): Promise<void> {
    await vscode.workspace.getConfiguration("js/ts").update("tsdk.path", value, vscode.ConfigurationTarget.Workspace);
}

export async function getWorkspaceTsdkForPrompt(): Promise<string | undefined> {
    const candidates = await getTsdkCandidates({ filter: candidate => candidate.target !== vscode.ConfigurationTarget.Global });
    for (const candidate of candidates) {
        if (await resolveTsdkPathToExe(candidate.value)) {
            return candidate.value;
        }
    }
    return undefined;
}

function getExplicitConfigValues<T>(section: string, key: string): ExplicitConfigValue<T>[] {
    const inspection = vscode.workspace.getConfiguration(section).inspect<T>(key);
    if (!inspection) {
        return [];
    }

    const candidates: Array<{ value: T | undefined; target: vscode.ConfigurationTarget; order: number; }> = [
        { value: inspection.workspaceFolderLanguageValue, target: vscode.ConfigurationTarget.WorkspaceFolder, order: 0 },
        { value: inspection.workspaceFolderValue, target: vscode.ConfigurationTarget.WorkspaceFolder, order: 1 },
        { value: inspection.workspaceLanguageValue, target: vscode.ConfigurationTarget.Workspace, order: 2 },
        { value: inspection.workspaceValue, target: vscode.ConfigurationTarget.Workspace, order: 3 },
        { value: inspection.globalLanguageValue, target: vscode.ConfigurationTarget.Global, order: 4 },
        { value: inspection.globalValue, target: vscode.ConfigurationTarget.Global, order: 5 },
    ];

    const result: ExplicitConfigValue<T>[] = [];
    for (const candidate of candidates) {
        if (candidate.value !== undefined) {
            result.push({
                value: candidate.value,
                target: candidate.target,
                order: candidate.order,
            });
        }
    }
    return result.sort(compareExplicitConfigValues);
}

function compareExplicitConfigValues<T>(a: ExplicitConfigValue<T>, b: ExplicitConfigValue<T>): number {
    return b.target - a.target || a.order - b.order;
}

async function getTsdkCandidates(options?: { nativeOnly?: boolean; filter?: (candidate: ExplicitConfigValue<string>) => boolean; }): Promise<ExplicitConfigValue<string>[]> {
    const candidates: ExplicitConfigValue<string>[] = [];
    for (let sourceIndex = 0; sourceIndex < tsdkConfigSources.length; sourceIndex++) {
        const source = tsdkConfigSources[sourceIndex];
        for (const candidate of getExplicitConfigValues<string>(source.section, source.key)) {
            if (!candidate.value || typeof candidate.value !== "string") {
                continue;
            }
            if ((options?.nativeOnly ?? true) && source.nativeOnly && await pathHasTsserverJs(candidate.value)) {
                continue;
            }
            candidates.push({
                ...candidate,
                order: candidate.order + sourceIndex * 10,
            });
        }
    }
    return candidates.filter(options?.filter ?? (() => true)).sort(compareExplicitConfigValues);
}

async function pathHasTsserverJs(tsdkPath: string): Promise<boolean> {
    const resolved = workspaceResolve(tsdkPath);
    for (const candidate of [vscode.Uri.joinPath(resolved, "tsserver.js"), vscode.Uri.joinPath(resolved, "lib", "tsserver.js")]) {
        try {
            await vscode.workspace.fs.stat(candidate);
            return true;
        }
        catch {}
    }
    return false;
}

/**
 * Resolve a tsdk path (which may be relative) to a normalized absolute path.
 */
export function resolveTsdkPath(tsdkPath: string): string {
    return path.normalize(workspaceResolve(tsdkPath).fsPath);
}

export async function resolveTsdkPathToExe(tsdkPath: string): Promise<ExeInfo | undefined> {
    const resolved = await realpathUri(workspaceResolve(tsdkPath));
    for (const packagePath of [resolved, vscode.Uri.joinPath(resolved, "..")]) {
        try {
            const packageJsonPath = vscode.Uri.joinPath(packagePath, "package.json");
            const packageJson = JSON.parse(await vscode.workspace.fs.readFile(packageJsonPath).then(buffer => buffer.toString()));
            // NOTE: Keep in sync with _packages/native-preview/lib/getExePath.js.
            const name: unknown = packageJson.name;
            const bin: unknown = packageJson.bin;
            if (typeof name !== "string" || !bin || typeof bin !== "object") continue;

            const baseName = name.startsWith("@") ? name.split("/")[1] : name;
            if (!baseName) continue;
            const expectedBinName = baseName === "typescript" ? "tsc" : "tsgo";
            if (!Object.prototype.hasOwnProperty.call(bin, expectedBinName)) continue;

            const exeName = `${expectedBinName}${process.platform === "win32" ? ".exe" : ""}`;
            const platformPackage = `${baseName}-${process.platform}-${process.arch}`;
            const nodeModules = name.startsWith("@")
                ? vscode.Uri.joinPath(packagePath, "..", "..")
                : vscode.Uri.joinPath(packagePath, "..");
            const exePath = vscode.Uri.joinPath(nodeModules, "@typescript", platformPackage, "lib", exeName);
            await vscode.workspace.fs.stat(exePath);
            return { path: withLongPathPrefix(exePath.fsPath), version: typeof packageJson.version === "string" ? packageJson.version : "unknown", name: expectedBinName };
        }
        catch {}
    }
    for (const baseName of packagedExeBaseNames) {
        try {
            const exePath = vscode.Uri.joinPath(resolved, `${baseName}${process.platform === "win32" ? ".exe" : ""}`);
            await vscode.workspace.fs.stat(exePath);
            return { path: withLongPathPrefix(exePath.fsPath), version: "(local)", name: baseName, isLocal: true };
        }
        catch {}
    }
}

async function realpathUri(uri: vscode.Uri): Promise<vscode.Uri> {
    if (uri.scheme !== "file") {
        return uri;
    }
    try {
        return vscode.Uri.file(await fs.promises.realpath(uri.fsPath));
    }
    catch {
        return uri;
    }
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

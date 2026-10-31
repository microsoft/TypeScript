import * as vscode from "vscode";

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
 * Whether the native language server should run with the current settings.
 * In development, it also runs when the built-in TypeScript extension is
 * disabled unless the setting explicitly turns it off.
 */
export function shouldStartTsgo(context: vscode.ExtensionContext): boolean {
    const useTsgo = getUseTsgo();
    if (context.extensionMode === vscode.ExtensionMode.Development && !vscode.extensions.getExtension("vscode.typescript-language-features")) {
        return useTsgo !== false;
    }
    return useTsgo === true;
}

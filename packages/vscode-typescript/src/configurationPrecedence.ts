/**
 * The explicitly-set fields of a `WorkspaceConfiguration.inspect()` result.
 *
 * Declared structurally (rather than importing `vscode`) so the precedence
 * rules can be unit-tested without an extension host.
 */
export interface ExplicitConfigurationValues<T> {
    readonly globalValue?: T;
    readonly workspaceValue?: T;
    readonly workspaceFolderValue?: T;
    readonly globalLanguageValue?: T;
    readonly workspaceLanguageValue?: T;
    readonly workspaceFolderLanguageValue?: T;
}

/**
 * Pick the explicitly-set value VS Code would resolve, ignoring defaults.
 *
 * VS Code applies language-specific values on top of the merged non-language
 * values, so any language-specific value beats any non-language value, even one
 * from a narrower scope: a `[typescript]` user setting beats a plain workspace
 * setting. See https://code.visualstudio.com/docs/configure/settings#_settings-precedence.
 *
 * `inspect()` only reports the `*LanguageValue` fields when the configuration was
 * read with a `languageId` scope.
 */
export function getExplicitConfigurationValue<T>(inspection: ExplicitConfigurationValues<T> | undefined): T | undefined {
    if (!inspection) {
        return undefined;
    }
    return inspection.workspaceFolderLanguageValue
        ?? inspection.workspaceLanguageValue
        ?? inspection.globalLanguageValue
        ?? inspection.workspaceFolderValue
        ?? inspection.workspaceValue
        ?? inspection.globalValue;
}

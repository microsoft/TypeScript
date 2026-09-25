/** Metadata shared by the compiler options, declaration, and config schema generators. */

import type messages from "../../../tsc/internal/diagnostics/diagnosticMessages.json";

export interface DiagnosticMessage {
    go: `diagnostics.${string}`;
    text: keyof typeof messages;
}

export function diagnostic(text: keyof typeof messages): DiagnosticMessage {
    const special: Record<string, string> = { "*": "_Asterisk", "/": "_Slash", ":": "_Colon" };
    let name = [...text].map(char => special[char] ?? (/[\p{L}\p{Nd}]/u.test(char) ? char : "_")).join("")
        .replace(/_+/g, "_").replace(/^_([^0-9])/, "$1").replace(/_+$/, "");
    if (!/^\p{Lu}/u.test(name)) name = (name.startsWith("_") ? "X" : "X_") + name;
    return { go: `diagnostics.${name}`, text };
}

export type GoValue = string | number | boolean | DiagnosticMessage | { go: `core.${string}`; };
export type OptionKind = "Boolean" | "String" | "Number" | "Object" | "List" | "ListOrElement" | "Enum";
export type CompilerOptionType =
    | "Tristate"
    | "string"
    | "*int"
    | "[]string"
    | "[]PluginImport"
    | "*collections.OrderedMap[string, []string]"
    | "JsxEmit"
    | "ModuleKind"
    | "ModuleResolutionKind"
    | "ModuleDetectionKind"
    | "NewLineKind"
    | "ScriptTarget"
    | "WatchFileKind"
    | "WatchDirectoryKind"
    | "PollingKind";

export interface DeclarationMetadata {
    comment?: string;
    shortName?: string;
    isFilePath?: boolean;
    isTSConfigOnly?: boolean;
    isCommandLineOnly?: boolean;
    description?: DiagnosticMessage;
    schemaDescription?: string;
    /** TSConfig reference anchor for schema hovers; defaults to the option name. False omits the link. */
    documentationAnchor?: string | false;
    defaultValueDescription?: GoValue;
    showInSimplifiedHelpView?: boolean;
    category?: DiagnosticMessage;
    extraValidation?: { go: string; };
    minValue?: number;
    allowConfigDirTemplateSubstitution?: boolean;
    affectsDeclarationPath?: boolean;
    affectsProgramStructure?: boolean;
    affectsSemanticDiagnostics?: boolean;
    affectsBuildInfo?: boolean;
    affectsBindDiagnostics?: boolean;
    affectsSourceFile?: boolean;
    affectsModuleResolution?: boolean;
    affectsEmit?: boolean;
    allowJsFlag?: boolean;
    strictFlag?: boolean;
    transpileOptionValue?: { go: string; };
    listPreserveFalsyValues?: boolean;
}

export interface Declaration extends DeclarationMetadata {
    name: string;
    kind: OptionKind;
    jsconfigDefault?: boolean;
}

export interface StoredDeclaration extends Declaration {
    field: { name: string; type: CompilerOptionType; comment?: string; };
}

export interface RootDeclaration extends Declaration {
    variable?: string;
    elementOptions?: "compilerOptions" | "typeAcquisition" | "extends";
}

type DeclarationGroup = "commonOptionsWithBuild" | "optionsForCompiler";

export interface CompilerOption {
    name: string;
    type: CompilerOptionType;
    goName?: string;
    internal?: boolean;
    deprecated?: boolean;
    comment?: string;
    parseAliases?: string[];
    parser?: "lib" | "plugins";
    declarations?: (DeclarationMetadata & {
        group: DeclarationGroup;
    })[];
    jsconfigDefault?: string | number | boolean;
}

export interface EnumMap {
    goName: string;
    values: { name: string; value: GoValue; }[];
    deprecatedKeys?: string[];
}

export interface OptionEnum {
    name: string;
    api?: boolean;
    members: {
        name: string;
        value: number | string;
        comment?: string;
        trailingComment?: string;
        excludeFromAPI?: boolean;
        lib?: string;
        libComment?: string;
        moduleResolution?: string;
    }[];
}

export interface OptionsModel {
    compilerOptions: CompilerOption[];
    declarationOrder: Record<DeclarationGroup, string[]>;
    watchOptions: StoredDeclaration[];
    typeAcquisition: StoredDeclaration[];
    buildOptions: (Declaration & { field?: StoredDeclaration["field"]; })[];
    buildOptionFieldOrder: string[];
    rootOptions: RootDeclaration[];
    elements: Record<string, Declaration>;
    enumMaps: Record<string, EnumMap>;
    enums: OptionEnum[];
}

export function optionKind(option: CompilerOption): OptionKind {
    switch (option.type) {
        case "Tristate":
            return "Boolean";
        case "string":
            return "String";
        case "*int":
            return "Number";
        case "[]string":
        case "[]PluginImport":
            return "List";
        case "*collections.OrderedMap[string, []string]":
            return "Object";
        default:
            return "Enum";
    }
}

export function fieldName(option: CompilerOption): string {
    return option.goName ?? option.name[0].toUpperCase() + option.name.slice(1);
}

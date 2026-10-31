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
export type PathKind = "file" | "directory" | "fileOrDirectory" | "sourceMapLocation" | "fileSpec" | "pathPattern" | "resolvedPathPattern" | "configLocator";
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
    | "ScriptTarget";

export interface DeclarationMetadata {
    shortName?: string;
    isFilePath?: boolean;
    pathKind?: PathKind;
    isTSConfigOnly?: boolean;
    isCommandLineOnly?: boolean;
    description?: DiagnosticMessage;
    schemaDescription?: string;
    /** TSConfig reference anchor for schema hovers; defaults to the option name. False omits the link. */
    documentationAnchor?: string | false;
    defaultValueDescription?: GoValue;
    showInSimplifiedHelpView?: boolean;
    category?: DiagnosticMessage;
    extraValidation?: "locale";
    minValue?: number;
    /** Defaults to isFilePath for compiler options; false explicitly disables substitution. */
    allowConfigDirTemplateSubstitution?: boolean;
    affectsDeclarationPath?: boolean;
    affectsSemanticDiagnostics?: boolean;
    affectsBuildInfo?: boolean;
    affectsEmit?: boolean;
    strictFlag?: boolean;
    listPreserveFalsyValues?: boolean;
}

export interface Declaration extends DeclarationMetadata {
    name: string;
    kind: OptionKind;
    jsconfigDefault?: boolean;
}

export interface StoredDeclaration extends Declaration {
    field: { name: string; type: CompilerOptionType; section?: string; };
}

export interface RootDeclaration extends Declaration {
    variable?: string;
    elementOptions?: "compilerOptions" | "typeAcquisition" | "extends";
}

export type DeclarationGroup = "commonOptionsWithBuild" | "optionsForCompiler";

export interface CompilerOption {
    name: string;
    type: CompilerOptionType;
    goName?: string;
    internal?: boolean;
    deprecated?: boolean;
    section?: string;
    comment?: string;
    pathKind?: PathKind;
    parseAliases?: string[];
    declaration?: DeclarationMetadata & {
        group: DeclarationGroup;
        /** Additional short aliases without repeated help text. */
        extraShortNames?: string[];
    };
    jsconfigDefault?: string | number | boolean;
    /** Additional exclusion beyond undeclared options and command-line/output-formatting categories. */
    showConfig?: false;
    transpile?: {
        value: boolean | "clear";
        declarationValue?: boolean | "preserve";
        /** Preserve the caller's value when the named boolean option is true. */
        unless?: string;
    };
}

export interface EnumMap {
    goName: string;
    values: { name: string; value: GoValue; }[];
    deprecatedKeys?: string[];
    /** Removed values retained only in configuration schemas, always deprecated. */
    schemaOnlyValues?: string[];
}

export type SchemaOnlyOption = {
    name: string;
    description: string;
} & ({ type: "boolean" | "string"; } | { type: "enum"; values: string[]; });

export interface OptionEnum {
    name: string;
    api?: boolean;
    /** Generate a String method that rejects zero and unknown values. */
    stringer?: "name" | { enumMap: string; };
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
    /** Removed options retained only in configuration schemas, always deprecated. */
    schemaOnlyOptions: SchemaOnlyOption[];
    declarationOrder: Record<DeclarationGroup, string[]>;
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

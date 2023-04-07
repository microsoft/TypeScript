import {
    append,
    concatenate,
    emptyArray,
    firstDefined,
    or,
} from "./core";
import {
    extensionsNotSupportingExtensionlessResolution,
    hasJSFileExtension,
    hasTSFileExtension,
} from "./extension";
import { isExpressionStatement } from "./factory/nodeTests";
import {
    nodeModulesPathPart,
    shouldAllowImportingTsExtension,
} from "./moduleNameResolver";
import { fileExtensionIsOneOf, pathIsRelative } from "./path";
import {
    CompilerOptions,
    ModuleKind,
    RequireOrImportCall,
    ResolutionMode,
    SourceFile,
    UserPreferences,
} from "./types";
import {
    isRequireCall,
    isRequireVariableStatement,
    isSourceFileJS,
    ModuleSpecifierEnding,
} from "./utilities";

/** @internal */
export interface NodeModulePathParts {
    readonly topLevelNodeModulesIndex: number;
    readonly topLevelPackageNameIndex: number;
    readonly packageRootIndex: number;
    readonly fileNameIndex: number;
}

/** @internal */
export function getNodeModulePathParts(fullPath: string): NodeModulePathParts | undefined {
    // If fullPath can't be valid module file within node_modules, returns undefined.
    // Example of expected pattern: /base/path/node_modules/[@scope/otherpackage/@otherscope/node_modules/]package/[subdirectory/]file.js
    // Returns indices:                       ^            ^                                                      ^             ^

    let topLevelNodeModulesIndex = 0;
    let topLevelPackageNameIndex = 0;
    let packageRootIndex = 0;
    let fileNameIndex = 0;

    const enum States {
        BeforeNodeModules,
        NodeModules,
        Scope,
        PackageContent
    }

    let partStart = 0;
    let partEnd = 0;
    let state = States.BeforeNodeModules;

    while (partEnd >= 0) {
        partStart = partEnd;
        partEnd = fullPath.indexOf("/", partStart + 1);
        switch (state) {
            case States.BeforeNodeModules:
                if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                    topLevelNodeModulesIndex = partStart;
                    topLevelPackageNameIndex = partEnd;
                    state = States.NodeModules;
                }
                break;
            case States.NodeModules:
            case States.Scope:
                if (state === States.NodeModules && fullPath.charAt(partStart + 1) === "@") {
                    state = States.Scope;
                }
                else {
                    packageRootIndex = partEnd;
                    state = States.PackageContent;
                }
                break;
            case States.PackageContent:
                if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                    state = States.NodeModules;
                }
                else {
                    state = States.PackageContent;
                }
                break;
        }
    }

    fileNameIndex = partStart;

    return state > States.NodeModules ? { topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex, fileNameIndex } : undefined;
}

/** @internal */
export function getModuleSpecifierEndingPreference(preference: UserPreferences["importModuleSpecifierEnding"], resolutionMode: ResolutionMode, compilerOptions: CompilerOptions, sourceFile: SourceFile): ModuleSpecifierEnding {
    if (preference === "js" || resolutionMode === ModuleKind.ESNext) {
        // Extensions are explicitly requested or required. Now choose between .js and .ts.
        if (!shouldAllowImportingTsExtension(compilerOptions)) {
            return ModuleSpecifierEnding.JsExtension;
        }
        // `allowImportingTsExtensions` is a strong signal, so use .ts unless the file
        // already uses .js extensions and no .ts extensions.
        return inferPreference() !== ModuleSpecifierEnding.JsExtension
            ? ModuleSpecifierEnding.TsExtension
            : ModuleSpecifierEnding.JsExtension;
    }
    if (preference === "minimal") {
        return ModuleSpecifierEnding.Minimal;
    }
    if (preference === "index") {
        return ModuleSpecifierEnding.Index;
    }

    // No preference was specified.
    // Look at imports and/or requires to guess whether .js, .ts, or extensionless imports are preferred.
    // N.B. that `Index` detection is not supported since it would require file system probing to do
    // accurately, and more importantly, literally nobody wants `Index` and its existence is a mystery.
    if (!shouldAllowImportingTsExtension(compilerOptions)) {
        // If .ts imports are not valid, we only need to see one .js import to go with that.
        return usesExtensionsOnImports(sourceFile) ? ModuleSpecifierEnding.JsExtension : ModuleSpecifierEnding.Minimal;
    }

    return inferPreference();

    function inferPreference() {
        let usesJsExtensions = false;
        const specifiers = sourceFile.imports.length ? sourceFile.imports.map(i => i.text) :
            isSourceFileJS(sourceFile) ? getRequiresAtTopOfFile(sourceFile).map(r => r.arguments[0].text) :
            emptyArray;
        for (const specifier of specifiers) {
            if (pathIsRelative(specifier)) {
                if (fileExtensionIsOneOf(specifier, extensionsNotSupportingExtensionlessResolution)) {
                    // These extensions are not optional, so do not indicate a preference.
                    continue;
                }
                if (hasTSFileExtension(specifier)) {
                    return ModuleSpecifierEnding.TsExtension;
                }
                if (hasJSFileExtension(specifier)) {
                    usesJsExtensions = true;
                }
            }
        }
        return usesJsExtensions ? ModuleSpecifierEnding.JsExtension : ModuleSpecifierEnding.Minimal;
    }
}

function getRequiresAtTopOfFile(sourceFile: SourceFile): readonly RequireOrImportCall[] {
    let nonRequireStatementCount = 0;
    let requires: RequireOrImportCall[] | undefined;
    for (const statement of sourceFile.statements) {
        if (nonRequireStatementCount > 3) {
            break;
        }
        if (isRequireVariableStatement(statement)) {
            requires = concatenate(requires, statement.declarationList.declarations.map(d => d.initializer));
        }
        else if (isExpressionStatement(statement) && isRequireCall(statement.expression, /*requireStringLiteralLikeArgument*/ true)) {
            requires = append(requires, statement.expression);
        }
        else {
            nonRequireStatementCount++;
        }
    }
    return requires || emptyArray;
}

function usesExtensionsOnImports({ imports }: SourceFile, hasExtension: (text: string) => boolean = or(hasJSFileExtension, hasTSFileExtension)): boolean {
    return firstDefined(imports, ({ text }) => pathIsRelative(text) && !fileExtensionIsOneOf(text, extensionsNotSupportingExtensionlessResolution)
        ? hasExtension(text)
        : undefined) || false;
}

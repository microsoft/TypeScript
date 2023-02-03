import {
    affectsDeclarationPathOptionDeclarations,
    affectsEmitOptionDeclarations,
    moduleResolutionOptionDeclarations,
    optionsAffectingProgramStructure,
    semanticDiagnosticsOptionDeclarations,
} from "./commandLineParser";
import * as Debug from "./debug";
import {
    createModeAwareCache,
    ModeAwareCache,
} from "./moduleNameResolver";
import {
    CompilerOptions,
    ResolutionMode,
    ResolutionNameAndModeGetter,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    SourceFile,
} from "./types";
import { optionsHaveChanges } from "./utilities";

/** @internal */
export function setResolvedModule(sourceFile: SourceFile, moduleNameText: string, resolvedModule: ResolvedModuleWithFailedLookupLocations, mode: ResolutionMode): void {
    if (!sourceFile.resolvedModules) {
        sourceFile.resolvedModules = createModeAwareCache();
    }
    sourceFile.resolvedModules.set(moduleNameText, mode, resolvedModule);
}

/** @internal */
export function setResolvedTypeReferenceDirective(sourceFile: SourceFile, typeReferenceDirectiveName: string, resolvedTypeReferenceDirective: ResolvedTypeReferenceDirectiveWithFailedLookupLocations, mode: ResolutionMode): void {
    if (!sourceFile.resolvedTypeReferenceDirectiveNames) {
        sourceFile.resolvedTypeReferenceDirectiveNames = createModeAwareCache();
    }
    sourceFile.resolvedTypeReferenceDirectiveNames.set(typeReferenceDirectiveName, mode, resolvedTypeReferenceDirective);
}

/** @internal */
export function hasChangesInResolutions<K, V>(
    names: readonly K[],
    newSourceFile: SourceFile,
    newResolutions: readonly V[],
    oldResolutions: ModeAwareCache<V> | undefined,
    comparer: (oldResolution: V, newResolution: V) => boolean,
    nameAndModeGetter: ResolutionNameAndModeGetter<K, SourceFile>,
): boolean {
    Debug.assert(names.length === newResolutions.length);

    for (let i = 0; i < names.length; i++) {
        const newResolution = newResolutions[i];
        const entry = names[i];
        const name = nameAndModeGetter.getName(entry);
        const mode = nameAndModeGetter.getMode(entry, newSourceFile);
        const oldResolution = oldResolutions && oldResolutions.get(name, mode);
        const changed =
            oldResolution
                ? !newResolution || !comparer(oldResolution, newResolution)
                : newResolution;
        if (changed) {
            return true;
        }
    }
    return false;
}

/** @internal */
export function changesAffectModuleResolution(oldOptions: CompilerOptions, newOptions: CompilerOptions): boolean {
    return oldOptions.configFilePath !== newOptions.configFilePath ||
        optionsHaveModuleResolutionChanges(oldOptions, newOptions);
}

/** @internal */
export function optionsHaveModuleResolutionChanges(oldOptions: CompilerOptions, newOptions: CompilerOptions) {
    return optionsHaveChanges(oldOptions, newOptions, moduleResolutionOptionDeclarations);
}

/** @internal */
export function changesAffectingProgramStructure(oldOptions: CompilerOptions, newOptions: CompilerOptions) {
    return optionsHaveChanges(oldOptions, newOptions, optionsAffectingProgramStructure);
}

/** @internal */
export function compilerOptionsAffectSemanticDiagnostics(newOptions: CompilerOptions, oldOptions: CompilerOptions): boolean {
    return optionsHaveChanges(oldOptions, newOptions, semanticDiagnosticsOptionDeclarations);
}

/** @internal */
export function compilerOptionsAffectEmit(newOptions: CompilerOptions, oldOptions: CompilerOptions): boolean {
    return optionsHaveChanges(oldOptions, newOptions, affectsEmitOptionDeclarations);
}

/** @internal */
export function compilerOptionsAffectDeclarationPath(newOptions: CompilerOptions, oldOptions: CompilerOptions): boolean {
    return optionsHaveChanges(oldOptions, newOptions, affectsDeclarationPathOptionDeclarations);
}

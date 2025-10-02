package modulespecifiers

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// Program errors validate that `noEmit` or `emitDeclarationOnly` is also set,
// so this function doesn't check them to avoid propagating errors.
func shouldAllowImportingTsExtension(compilerOptions *core.CompilerOptions, fromFileName string) bool {
	return compilerOptions.GetAllowImportingTsExtensions() || len(fromFileName) > 0 && tspath.IsDeclarationFileName(fromFileName)
}

func usesExtensionsOnImports(file SourceFileForSpecifierGeneration) bool {
	for _, ref := range file.Imports() {
		text := ref.Text()
		if tspath.PathIsRelative(text) && !tspath.FileExtensionIsOneOf(text, tspath.ExtensionsNotSupportingExtensionlessResolution) {
			return tspath.HasTSFileExtension(text) || tspath.HasJSFileExtension(text)
		}
	}
	return false
}

func inferPreference(
	resolutionMode core.ResolutionMode,
	sourceFile SourceFileForSpecifierGeneration,
	moduleResolutionIsNodeNext bool,
) ModuleSpecifierEnding {
	usesJsExtensions := false
	var specifiers []*ast.LiteralLikeNode
	if sourceFile != nil && len(sourceFile.Imports()) > 0 {
		specifiers = sourceFile.Imports()
	} else if sourceFile != nil && sourceFile.IsJS() {
		// !!! TODO: JS support
		// specifiers = core.Map(getRequiresAtTopOfFile(sourceFile), func(d *ast.Node) *ast.Node { return d.arguments[0] })
	}

	for _, specifier := range specifiers {
		path := specifier.Text()
		if tspath.PathIsRelative(path) {
			// !!! TODO: proper resolutionMode support
			if moduleResolutionIsNodeNext && resolutionMode == core.ResolutionModeCommonJS /* && getModeForUsageLocation(sourceFile!, specifier, compilerOptions) === ModuleKind.ESNext */ {
				// We're trying to decide a preference for a CommonJS module specifier, but looking at an ESM import.
				continue
			}
			if tspath.FileExtensionIsOneOf(path, tspath.ExtensionsNotSupportingExtensionlessResolution) {
				// These extensions are not optional, so do not indicate a preference.
				continue
			}
			if tspath.HasTSFileExtension(path) {
				return ModuleSpecifierEndingTsExtension
			}
			if tspath.HasJSFileExtension(path) {
				usesJsExtensions = true
			}
		}
	}

	if usesJsExtensions {
		return ModuleSpecifierEndingJsExtension
	}
	return ModuleSpecifierEndingMinimal
}

func getModuleSpecifierEndingPreference(
	pref ImportModuleSpecifierEndingPreference,
	resolutionMode core.ResolutionMode,
	compilerOptions *core.CompilerOptions,
	sourceFile SourceFileForSpecifierGeneration,
) ModuleSpecifierEnding {
	moduleResolution := compilerOptions.GetModuleResolutionKind()
	moduleResolutionIsNodeNext := core.ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= core.ModuleResolutionKindNodeNext

	if pref == ImportModuleSpecifierEndingPreferenceJs || resolutionMode == core.ResolutionModeESM && moduleResolutionIsNodeNext {
		// Extensions are explicitly requested or required. Now choose between .js and .ts.
		if !shouldAllowImportingTsExtension(compilerOptions, "") {
			return ModuleSpecifierEndingJsExtension
		}
		// `allowImportingTsExtensions` is a strong signal, so use .ts unless the file
		// already uses .js extensions and no .ts extensions.
		if inferPreference(resolutionMode, sourceFile, moduleResolutionIsNodeNext) != ModuleSpecifierEndingJsExtension {
			return ModuleSpecifierEndingTsExtension
		}
		return ModuleSpecifierEndingJsExtension
	}

	if pref == ImportModuleSpecifierEndingPreferenceMinimal {
		return ModuleSpecifierEndingMinimal
	}

	if pref == ImportModuleSpecifierEndingPreferenceIndex {
		return ModuleSpecifierEndingIndex
	}

	// No preference was specified.
	// Look at imports and/or requires to guess whether .js, .ts, or extensionless imports are preferred.
	// N.B. that `Index` detection is not supported since it would require file system probing to do
	// accurately, and more importantly, literally nobody wants `Index` and its existence is a mystery.
	if !shouldAllowImportingTsExtension(compilerOptions, "") {
		// If .ts imports are not valid, we only need to see one .js import to go with that.
		if sourceFile != nil && usesExtensionsOnImports(sourceFile) {
			return ModuleSpecifierEndingJsExtension
		}
		return ModuleSpecifierEndingMinimal
	}

	return inferPreference(resolutionMode, sourceFile, moduleResolutionIsNodeNext)
}

func getPreferredEnding(
	prefs UserPreferences,
	host ModuleSpecifierGenerationHost,
	compilerOptions *core.CompilerOptions,
	importingSourceFile SourceFileForSpecifierGeneration,
	oldImportSpecifier string,
	resolutionMode core.ResolutionMode,
) ModuleSpecifierEnding {
	if len(oldImportSpecifier) > 0 {
		if tspath.HasJSFileExtension(oldImportSpecifier) {
			return ModuleSpecifierEndingJsExtension
		}
		if strings.HasSuffix(oldImportSpecifier, "/index") {
			return ModuleSpecifierEndingIndex
		}
	}
	if resolutionMode == core.ResolutionModeNone {
		resolutionMode = host.GetDefaultResolutionModeForFile(importingSourceFile)
	}
	return getModuleSpecifierEndingPreference(
		prefs.ImportModuleSpecifierEnding,
		resolutionMode,
		compilerOptions,
		importingSourceFile,
	)
}

type ModuleSpecifierPreferences struct {
	relativePreference                RelativePreferenceKind
	getAllowedEndingsInPreferredOrder func(syntaxImpliedNodeFormat core.ResolutionMode) []ModuleSpecifierEnding
	excludeRegexes                    []string
}

func getModuleSpecifierPreferences(
	prefs UserPreferences,
	host ModuleSpecifierGenerationHost,
	compilerOptions *core.CompilerOptions,
	importingSourceFile SourceFileForSpecifierGeneration,
	oldImportSpecifier string,
) ModuleSpecifierPreferences {
	excludes := prefs.AutoImportSpecifierExcludeRegexes
	relativePreference := RelativePreferenceShortest
	if len(oldImportSpecifier) > 0 {
		if tspath.IsExternalModuleNameRelative(oldImportSpecifier) {
			relativePreference = RelativePreferenceRelative
		} else {
			relativePreference = RelativePreferenceNonRelative
		}
	} else {
		switch prefs.ImportModuleSpecifierPreference {
		case ImportModuleSpecifierPreferenceRelative:
			relativePreference = RelativePreferenceRelative
		case ImportModuleSpecifierPreferenceNonRelative:
			relativePreference = RelativePreferenceNonRelative
		case ImportModuleSpecifierPreferenceProjectRelative:
			relativePreference = RelativePreferenceExternalNonRelative
			// all others are shortest
		}
	}
	filePreferredEnding := getPreferredEnding(
		prefs,
		host,
		compilerOptions,
		importingSourceFile,
		oldImportSpecifier,
		core.ResolutionModeNone,
	)

	getAllowedEndingsInPreferredOrder := func(syntaxImpliedNodeFormat core.ResolutionMode) []ModuleSpecifierEnding {
		preferredEnding := filePreferredEnding
		resolutionMode := host.GetDefaultResolutionModeForFile(importingSourceFile)
		if resolutionMode != syntaxImpliedNodeFormat {
			preferredEnding = getPreferredEnding(
				prefs,
				host,
				compilerOptions,
				importingSourceFile,
				oldImportSpecifier,
				syntaxImpliedNodeFormat,
			)
		}
		moduleResolution := compilerOptions.GetModuleResolutionKind()
		moduleResolutionIsNodeNext := core.ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= core.ModuleResolutionKindNodeNext
		allowImportingTsExtension := shouldAllowImportingTsExtension(compilerOptions, importingSourceFile.FileName())
		if syntaxImpliedNodeFormat == core.ResolutionModeESM && moduleResolutionIsNodeNext {
			if allowImportingTsExtension {
				return []ModuleSpecifierEnding{ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingJsExtension}
			}
			return []ModuleSpecifierEnding{ModuleSpecifierEndingJsExtension}
		}
		switch preferredEnding {
		case ModuleSpecifierEndingJsExtension:
			if allowImportingTsExtension {
				return []ModuleSpecifierEnding{ModuleSpecifierEndingJsExtension, ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex}
			}
			return []ModuleSpecifierEnding{ModuleSpecifierEndingJsExtension, ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex}
		case ModuleSpecifierEndingTsExtension:
			return []ModuleSpecifierEnding{ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingMinimal, ModuleSpecifierEndingJsExtension, ModuleSpecifierEndingIndex}
		case ModuleSpecifierEndingIndex:
			if allowImportingTsExtension {
				return []ModuleSpecifierEnding{ModuleSpecifierEndingIndex, ModuleSpecifierEndingMinimal, ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingJsExtension}
			}
			return []ModuleSpecifierEnding{ModuleSpecifierEndingIndex, ModuleSpecifierEndingMinimal, ModuleSpecifierEndingJsExtension}
		case ModuleSpecifierEndingMinimal:
			if allowImportingTsExtension {
				return []ModuleSpecifierEnding{ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex, ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingJsExtension}
			}
			return []ModuleSpecifierEnding{ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex, ModuleSpecifierEndingJsExtension}
		default:
			debug.AssertNever(preferredEnding)
		}
		return []ModuleSpecifierEnding{ModuleSpecifierEndingMinimal}
	}

	return ModuleSpecifierPreferences{
		excludeRegexes:                    excludes,
		relativePreference:                relativePreference,
		getAllowedEndingsInPreferredOrder: getAllowedEndingsInPreferredOrder,
	}
}

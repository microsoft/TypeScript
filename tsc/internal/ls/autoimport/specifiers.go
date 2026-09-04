package autoimport

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/modulespecifiers"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func (v *View) GetModuleSpecifier(
	export *Export,
	userPreferences modulespecifiers.UserPreferences,
) (tspath.ModuleSpecifier, modulespecifiers.ResultKind) {
	if export.UnresolvedModuleSpecifier != "" {
		specifier := export.UnresolvedModuleSpecifier
		if specifier.IsRelative() {
			relativePath, ok := v.program.CaseSensitivity().RelativePathFromDirectory(
				v.importingFile.FileName().Directory(),
				export.ModuleFileName,
			)
			if !ok {
				return "", modulespecifiers.ResultKindNone
			}
			specifier = relativePath.AsModuleSpecifier()
		}
		if modulespecifiers.IsExcludedByRegex(specifier.AsString(), userPreferences.AutoImportSpecifierExcludeRegexes) {
			return "", modulespecifiers.ResultKindNone
		}
		return specifier, modulespecifiers.ResultKindRelative
	}

	if specifier, ok := export.ModuleID.AsModuleSpecifier(); ok {
		if modulespecifiers.IsExcludedByRegex(specifier.AsString(), userPreferences.AutoImportSpecifierExcludeRegexes) {
			return "", modulespecifiers.ResultKindNone
		}
		return specifier, modulespecifiers.ResultKindAmbient
	}

	if export.PackageName != "" {
		if entrypoints, ok := v.registry.entrypoints[export.Path]; ok {
			for _, entrypoint := range entrypoints {
				if entrypoint.IncludeConditions.IsSubsetOf(v.conditions) && !v.conditions.Intersects(entrypoint.ExcludeConditions) {
					specifier := modulespecifiers.ProcessEntrypointEnding(
						entrypoint,
						userPreferences,
						v.program,
						v.program.Options(),
						v.importingFile,
						v.getAllowedEndings(),
					)

					if !modulespecifiers.IsExcludedByRegex(specifier.AsString(), userPreferences.AutoImportSpecifierExcludeRegexes) {
						return specifier, modulespecifiers.ResultKindNodeModules
					}
				}
			}
			return "", modulespecifiers.ResultKindNone
		}
	}

	cache := v.registry.specifierCache[v.importingFilePath]
	if export.PackageName == "" {
		if specifier, ok := cache.Load(export.Path); ok {
			if specifier == "" {
				return "", modulespecifiers.ResultKindNone
			}
			return specifier, modulespecifiers.ResultKindRelative
		}
	}

	specifiers, kind := modulespecifiers.GetModuleSpecifiersForFileWithInfo(
		v.importingFile,
		export.ModuleFileName,
		v.program.Options(),
		v.program,
		userPreferences,
		modulespecifiers.ModuleSpecifierOptions{},
		true,
	)
	// !!! unsure when this could return multiple specifiers combined with the
	//     new node_modules code. Possibly with local symlinks, which should be
	//     very rare.
	for _, specifier := range specifiers {
		if strings.Contains(specifier.AsString(), "/node_modules/") {
			continue
		}
		cache.Store(export.Path, specifier)
		return specifier, kind
	}
	cache.Store(export.Path, "")
	return "", modulespecifiers.ResultKindNone
}

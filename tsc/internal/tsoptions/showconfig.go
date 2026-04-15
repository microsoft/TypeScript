package tsoptions

import (
	"reflect"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// computeFn wraps a typed getter method so it can be stored in an impliedOption's
// compute field (which has type func(*core.CompilerOptions) any).
func computeFn[T any](fn func(*core.CompilerOptions) T) func(*core.CompilerOptions) any {
	return func(opts *core.CompilerOptions) any {
		return fn(opts)
	}
}

// impliedOption describes a compiler option whose effective value can be derived from
// other options. This mirrors TypeScript's computedOptions concept used in convertToTSConfig.
type impliedOption struct {
	// name is the Go struct field name of the CompilerOptions field (e.g., "Module").
	name string
	// dependencies lists the Go struct field names that this option depends on.
	dependencies []string
	// compute returns the effective value of this option given compiler options.
	compute func(opts *core.CompilerOptions) any
}

// impliedOptions lists the compiler options that may be implied by other options,
// mirroring TypeScript's computedOptions used in convertToTSConfig.
// Each compute function delegates directly to an existing core.CompilerOptions getter.
var impliedOptions = []impliedOption{
	{name: "Module", dependencies: []string{"Target"}, compute: computeFn((*core.CompilerOptions).GetEmitModuleKind)},
	{name: "ModuleResolution", dependencies: []string{"Module", "Target"}, compute: computeFn((*core.CompilerOptions).GetModuleResolutionKind)},
	{name: "ModuleDetection", dependencies: []string{"Module", "Target"}, compute: computeFn((*core.CompilerOptions).GetEmitModuleDetectionKind)},
	{name: "IsolatedModules", dependencies: []string{"VerbatimModuleSyntax"}, compute: computeFn((*core.CompilerOptions).GetIsolatedModules)},
	{name: "PreserveConstEnums", dependencies: []string{"IsolatedModules", "VerbatimModuleSyntax"}, compute: computeFn((*core.CompilerOptions).ShouldPreserveConstEnums)},
	{name: "Declaration", dependencies: []string{"Composite"}, compute: computeFn((*core.CompilerOptions).GetEmitDeclarations)},
	{name: "DeclarationMap", dependencies: []string{"Declaration", "Composite"}, compute: computeFn((*core.CompilerOptions).GetAreDeclarationMapsEnabled)},
	{name: "Incremental", dependencies: []string{"Composite"}, compute: computeFn((*core.CompilerOptions).IsIncremental)},
	{name: "UseDefineForClassFields", dependencies: []string{"Target", "Module"}, compute: computeFn((*core.CompilerOptions).GetUseDefineForClassFields)},
	{name: "ResolvePackageJsonExports", dependencies: []string{"ModuleResolution", "Module", "Target"}, compute: computeFn((*core.CompilerOptions).GetResolvePackageJsonExports)},
	{name: "ResolvePackageJsonImports", dependencies: []string{"ModuleResolution", "ResolvePackageJsonExports", "Module", "Target"}, compute: computeFn((*core.CompilerOptions).GetResolvePackageJsonImports)},
	{name: "ResolveJsonModule", dependencies: []string{"ModuleResolution", "Module", "Target"}, compute: computeFn((*core.CompilerOptions).GetResolveJsonModule)},
	{name: "AllowJs", dependencies: []string{"CheckJs"}, compute: computeFn((*core.CompilerOptions).GetAllowJS)},
	{name: "AllowImportingTsExtensions", dependencies: []string{"RewriteRelativeImportExtensions"}, compute: computeFn((*core.CompilerOptions).GetAllowImportingTsExtensions)},
}

// TSConfig represents the output structure for --showConfig
type TSConfig struct {
	CompilerOptions *collections.OrderedMap[string, any] `json:"compilerOptions"`
	References      []any                                `json:"references,omitzero"`
	Files           []string                             `json:"files,omitzero"`
	Include         []string                             `json:"include,omitzero"`
	Exclude         []string                             `json:"exclude,omitzero"`
	CompileOnSave   *bool                                `json:"compileOnSave,omitzero"`
}

// ConvertToTSConfig generates a complete tsconfig representation for --showConfig output,
// matching the behavior of TypeScript's convertToTSConfig function.
func ConvertToTSConfig(configParseResult *ParsedCommandLine, configFileName string) *TSConfig {
	if configFileName == "" {
		configFileName = "tsconfig.json"
	}
	normalizedConfigPath := tspath.GetNormalizedAbsolutePath(configFileName, configParseResult.GetCurrentDirectory())
	comparePathsOptions := tspath.ComparePathsOptions{
		CurrentDirectory:          configParseResult.GetCurrentDirectory(),
		UseCaseSensitiveFileNames: configParseResult.UseCaseSensitiveFileNames(),
	}

	// Build the list of all resolved files as relative paths from the config file.
	var files []string
	for _, f := range configParseResult.FileNames() {
		normalizedFilePath := tspath.GetNormalizedAbsolutePath(f, configParseResult.GetCurrentDirectory())
		relativePath := tspath.GetRelativePathFromFile(normalizedConfigPath, normalizedFilePath, comparePathsOptions)
		files = append(files, relativePath)
	}

	// Serialize compiler options
	optionMap := serializeCompilerOptions(configParseResult.CompilerOptions(), normalizedConfigPath, comparePathsOptions)

	// Remove command-line-only options from the output
	for _, name := range []string{
		"showConfig", "configFile", "configFilePath", "help", "init",
		"listFilesOnly", "listEmittedFiles", "project", "build", "version",
	} {
		optionMap.Delete(name)
	}

	// Add implied compiler options (options that are derived from explicitly set options,
	// such as moduleResolution implied by module, or useDefineForClassFields implied by target).
	// This mirrors TypeScript's convertToTSConfig computedOptions logic.
	addImpliedOptions(optionMap, configParseResult.CompilerOptions(), normalizedConfigPath, comparePathsOptions)

	config := &TSConfig{
		CompilerOptions: optionMap,
	}

	// Add references
	if refs := configParseResult.ProjectReferences(); len(refs) > 0 {
		var references []any
		for _, r := range refs {
			ref := &collections.OrderedMap[string, any]{}
			ref.Set("path", r.OriginalPath)
			if r.Circular {
				ref.Set("circular", true)
			}
			references = append(references, ref)
		}
		config.References = references
	}

	// Add files
	if len(files) > 0 {
		config.Files = files
	}

	// Add include/exclude from configFileSpecs
	if configParseResult.ConfigFile != nil && configParseResult.ConfigFile.configFileSpecs != nil {
		specs := configParseResult.ConfigFile.configFileSpecs
		include := filterSameAsDefaultInclude(specs.validatedIncludeSpecs)
		if len(include) > 0 {
			config.Include = include
		}
		config.Exclude = specs.validatedExcludeSpecs
	}

	// Add compileOnSave
	if configParseResult.CompileOnSave != nil && *configParseResult.CompileOnSave {
		t := true
		config.CompileOnSave = &t
	}

	return config
}

// filterSameAsDefaultInclude returns nil if specs is the default include spec ["**/*"]
func filterSameAsDefaultInclude(specs []string) []string {
	if len(specs) == 0 {
		return nil
	}
	if len(specs) == 1 && specs[0] == defaultIncludeSpec {
		return nil
	}
	return specs
}

// getNameOfCompilerOptionValue returns the string key for a given enum value by
// searching the option's enum map.
func getNameOfCompilerOptionValue(value any, enumMap *collections.OrderedMap[string, any]) string {
	for k, v := range enumMap.Entries() {
		if v == value {
			return k
		}
	}
	return ""
}

// serializeCompilerOptions converts CompilerOptions to an ordered map with
// string names as keys and serialized values (enums as strings, paths as
// relative paths, etc.) matching the output of tsc --showConfig.
func serializeCompilerOptions(options *core.CompilerOptions, configFilePath string, comparePathsOptions tspath.ComparePathsOptions) *collections.OrderedMap[string, any] {
	result := collections.NewOrderedMapWithSizeHint[string, any](32)
	configDir := tspath.GetDirectoryPath(configFilePath)

	optionsValue := reflect.ValueOf(options).Elem()
	optionsTypeInfo := reflect.TypeFor[core.CompilerOptions]()

	for i := range optionsValue.NumField() {
		field := optionsTypeInfo.Field(i)
		if !field.IsExported() {
			continue
		}

		optionDecl := CommandLineCompilerOptionsMap.Get(field.Name)
		if optionDecl == nil {
			continue
		}

		// Skip command-line-only and output formatting options
		if optionDecl.Category == diagnostics.Command_line_Options || optionDecl.Category == diagnostics.Output_Formatting {
			continue
		}

		fieldValue := optionsValue.Field(i)

		// Skip zero values (unset options)
		if fieldValue.IsZero() {
			continue
		}

		name := optionDecl.Name
		value := fieldValue.Interface()

		enumMap := optionDecl.EnumMap()
		if enumMap != nil {
			// Enum option - convert numeric value to string name
			serialized := serializeEnumValue(value, enumMap)
			if serialized != "" {
				result.Set(name, serialized)
			}
			continue
		}

		switch optionDecl.Kind {
		case CommandLineOptionTypeListOrElement:
			debug.Assert(false, "listOrElement option should not reach serialization")
		case CommandLineOptionTypeList:
			elem := optionDecl.Elements()
			if elem != nil && elem.IsFilePath {
				// List of file paths - make relative
				if strs, ok := value.([]string); ok {
					relPaths := make([]string, len(strs))
					for j, s := range strs {
						absPath := tspath.GetNormalizedAbsolutePath(s, configDir)
						relPaths[j] = tspath.GetRelativePathFromFile(configFilePath, absPath, comparePathsOptions)
					}
					result.Set(name, relPaths)
					continue
				}
			}
			if elem != nil && elem.EnumMap() != nil {
				// List of enum values (e.g., lib)
				elemMap := elem.EnumMap()
				if strs, ok := value.([]string); ok {
					serialized := make([]string, 0, len(strs))
					for _, s := range strs {
						// lib values are already stored as the d.ts filename, need to find original key
						found := getNameOfCompilerOptionValue(s, elemMap)
						if found != "" {
							serialized = append(serialized, found)
						} else {
							serialized = append(serialized, s)
						}
					}
					result.Set(name, serialized)
					continue
				}
			}
			result.Set(name, value)

		case CommandLineOptionTypeString:
			if optionDecl.IsFilePath {
				// File path option - make relative to config
				if s, ok := value.(string); ok && s != "" {
					absPath := tspath.GetNormalizedAbsolutePath(s, configDir)
					result.Set(name, tspath.GetRelativePathFromFile(configFilePath, absPath, comparePathsOptions))
					continue
				}
			}
			result.Set(name, value)

		case CommandLineOptionTypeBoolean:
			if t, ok := value.(core.Tristate); ok {
				if t.IsTrue() {
					result.Set(name, true)
				} else if t.IsFalse() {
					result.Set(name, false)
				}
			} else {
				result.Set(name, value)
			}

		case CommandLineOptionTypeNumber:
			result.Set(name, value)

		default:
			result.Set(name, value)
		}
	}

	return result
}

// serializeEnumValue converts an enum field value to its corresponding string key
// using the option's enum map. It handles int32-based enum types.
func serializeEnumValue(value any, enumMap *collections.OrderedMap[string, any]) string {
	// The enum maps store values as core.ModuleKind, core.ScriptTarget, etc.
	// But those are all int32 underneath. We need to compare by the underlying int32 value.
	rv := reflect.ValueOf(value)
	if rv.CanInt() {
		intVal := rv.Int()
		for k, v := range enumMap.Entries() {
			ev := reflect.ValueOf(v)
			if ev.CanInt() && ev.Int() == intVal {
				return k
			}
		}
	}
	// Fallback: direct comparison
	return getNameOfCompilerOptionValue(value, enumMap)
}

// addImpliedOptions adds compiler options that are implied by other explicitly-set options,
// mirroring TypeScript's convertToTSConfig behavior for computedOptions.
// For example, when module: nodenext is set, moduleResolution: nodenext is implied.
func addImpliedOptions(
	optionMap *collections.OrderedMap[string, any],
	options *core.CompilerOptions,
	_ string,
	_ tspath.ComparePathsOptions,
) {
	// Build the set of explicitly provided option JSON names (e.g., "module", "target").
	provided := make(map[string]bool, optionMap.Size())
	for k := range optionMap.Keys() {
		provided[k] = true
	}

	defaultOpts := &core.CompilerOptions{}

	for _, entry := range impliedOptions {
		// Get the option declaration for this implied option (using case-insensitive lookup).
		optionDecl := CommandLineCompilerOptionsMap.Get(entry.name)
		if optionDecl == nil {
			continue
		}

		// Skip if this option is already explicitly provided.
		if provided[optionDecl.Name] {
			continue
		}

		// Check if any direct dependency is in the provided set.
		// This mirrors TypeScript's optionDependsOn check.
		if !anyDependencyProvided(entry.dependencies, provided) {
			continue
		}

		// Compute the effective value with current options and the default value with empty options.
		implied := entry.compute(options)
		defaultVal := entry.compute(defaultOpts)

		// If the implied value equals the default, this option doesn't add useful information.
		if reflect.DeepEqual(implied, defaultVal) {
			continue
		}

		// Serialize the implied value and add it to the option map.
		serialized := serializeImpliedOptionValue(optionDecl, implied)
		if serialized == nil {
			continue
		}
		optionMap.Set(optionDecl.Name, serialized)
	}
}

// anyDependencyProvided returns true if any of the given dependency names
// (using Go field names like "Target") corresponds to an option in the provided set.
func anyDependencyProvided(dependencies []string, provided map[string]bool) bool {
	for _, dep := range dependencies {
		depDecl := CommandLineCompilerOptionsMap.Get(dep)
		if depDecl != nil && provided[depDecl.Name] {
			return true
		}
	}
	return false
}

// serializeImpliedOptionValue converts a computed implied option value to its serializable form.
// For enum options, it converts numeric values to their string names.
// For boolean options, it returns the bool directly.
func serializeImpliedOptionValue(optionDecl *CommandLineOption, value any) any {
	if value == nil {
		return nil
	}
	enumMap := optionDecl.EnumMap()
	if enumMap != nil {
		s := serializeEnumValue(value, enumMap)
		if s != "" {
			return s
		}
		return nil
	}
	switch v := value.(type) {
	case bool:
		return v
	case core.Tristate:
		if v.IsTrue() {
			return true
		} else if v.IsFalse() {
			return false
		}
		return nil
	}
	return value
}

package tsoptions

import (
	"cmp"
	"maps"
	"reflect"
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/jsnum"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfsmatch"
)

type extendsResult struct {
	options             *parsedCompilerOptions
	include             []any
	exclude             []any
	files               []any
	contentMappers      []any
	compileOnSave       bool
	extendedSourceFiles collections.Set[tspath.RootedFilePath]
}

var compilerOptionsDeclaration = &CommandLineOption{
	Name:           "compilerOptions",
	Kind:           CommandLineOptionTypeObject,
	ElementOptions: CommandLineCompilerOptionsMap,
}

var compileOnSaveCommandLineOption = &CommandLineOption{
	Name:                    "compileOnSave",
	Kind:                    CommandLineOptionTypeBoolean,
	DefaultValueDescription: false,
}

var extendsOptionDeclaration = &CommandLineOption{
	Name:     "extends",
	Kind:     CommandLineOptionTypeListOrElement,
	Category: diagnostics.File_Management,
	ElementOptions: commandLineOptionsToMap([]*CommandLineOption{
		{Name: "extends", Kind: CommandLineOptionTypeString},
	}),
}

var tsconfigRootOptionsMap = &CommandLineOption{
	Name: "undefined", // should never be needed since this is root
	Kind: CommandLineOptionTypeObject,
	ElementOptions: commandLineOptionsToMap([]*CommandLineOption{
		compilerOptionsDeclaration,
		typeAcquisitionDeclaration,
		extendsOptionDeclaration,
		{
			Name: "references",
			Kind: CommandLineOptionTypeList, // should be a list of projectReference
			// Category: diagnostics.Projects,
		},
		{
			Name: "contentMappers",
			Kind: CommandLineOptionTypeList, // list of content mapper objects
		},
		{
			Name: "files",
			Kind: CommandLineOptionTypeList,
			// Category: diagnostics.File_Management,
		},
		{
			Name: "include",
			Kind: CommandLineOptionTypeList,
			// Category: diagnostics.File_Management,
			// DefaultValueDescription: diagnostics.if_files_is_specified_otherwise_Asterisk_Asterisk_Slash_Asterisk,
		},
		{
			Name: "exclude",
			Kind: CommandLineOptionTypeList,
			// Category: diagnostics.File_Management,
			// DefaultValueDescription: diagnostics.Node_modules_bower_components_jspm_packages_plus_the_value_of_outDir_if_one_is_specified,
		},
		compileOnSaveCommandLineOption,
	}),
}

type configFileSpecs struct {
	filesSpecs any
	// Present to report errors (user specified specs), validatedIncludeSpecs are used for file name matching
	includeSpecs any
	// Present to report errors (user specified specs), validatedExcludeSpecs are used for file name matching
	excludeSpecs                            any
	validatedFilesSpec                      []tspath.FileSpec
	validatedFileNames                      []tspath.RootedFilePath
	fileSpecByPath                          map[tspath.PathKey]tspath.FileSpec
	validatedIncludeSpecs                   []tspath.PathPattern
	validatedExcludeSpecs                   []tspath.PathPattern
	validatedFilesSpecBeforeSubstitution    []tspath.FileSpec
	validatedIncludeSpecsBeforeSubstitution []tspath.PathPattern
	isDefaultIncludeSpec                    bool
}

func (c *configFileSpecs) getMatchedIncludeSpec(fileName tspath.RootedFilePath, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) tspath.PathPattern {
	if len(c.validatedIncludeSpecs) == 0 {
		return ""
	}
	for index, spec := range c.validatedIncludeSpecs {
		includeMatcher := vfsmatch.NewSpecMatcher([]tspath.PathPattern{spec}, currentDirectory, vfsmatch.UsageFiles, caseSensitivity)
		if includeMatcher != nil && includeMatcher.MatchFileName(fileName) {
			return c.validatedIncludeSpecsBeforeSubstitution[index]
		}
	}
	return ""
}

func (c *configFileSpecs) getMatchedFileSpec(filePath tspath.PathKey) tspath.FileSpec {
	return c.fileSpecByPath[filePath]
}

type ExtendedConfigCache interface {
	GetExtendedConfig(fileName tspath.RootedFilePath, path tspath.PathKey, resolutionStack []tspath.PathKey, host ParseConfigHost) *ExtendedConfigCacheEntry
}

type ExtendedConfigCacheEntry struct {
	extendedResult *TsConfigSourceFile
	extendedConfig *parsedTsconfig
	errors         []*ast.Diagnostic
}

func (e *ExtendedConfigCacheEntry) ExtendedFileNames() []tspath.RootedFilePath {
	if e.extendedResult != nil {
		return e.extendedResult.ExtendedSourceFiles
	}
	return nil
}

type parsedTsconfig struct {
	raw                 any
	options             *parsedCompilerOptions
	typeAcquisition     *core.TypeAcquisition
	extendedConfigPaths []tspath.RootedFilePath
}

type parsedCompilerOptions struct {
	*core.CompilerOptions
	unresolvedPaths unresolvedCompilerOptionPaths
}

func (o *parsedCompilerOptions) ParseOption(key string, value any) []*ast.Diagnostic {
	return (&compilerOptionsParser{
		CompilerOptions: o.CompilerOptions,
		unresolvedPaths: o.unresolvedPaths,
	}).ParseOption(key, value)
}

func parseOwnConfigOfJsonSourceFile(
	sourceFile *ast.SourceFile,
	host ParseConfigHost,
	basePath tspath.RootedDirectoryPath,
	configFileName tspath.RootedFilePath,
) (*parsedTsconfig, []*ast.Diagnostic) {
	compilerOptions := getDefaultCompilerOptions(configFileName)
	typeAcquisition := getDefaultTypeAcquisition(configFileName)
	var extendedConfigPaths []tspath.RootedFilePath
	var rootCompilerOptions []*ast.PropertyName
	var errors []*ast.Diagnostic
	onPropertySet := func(
		keyText string,
		value any,
		propertyAssignment *ast.PropertyAssignment,
		parentOption *CommandLineOption, // TsConfigOnlyOption,
		option *CommandLineOption,
	) (any, []*ast.Diagnostic) {
		// Ensure value is verified except for extends which is handled in its own way for error reporting
		var propertySetErrors []*ast.Diagnostic
		if option != nil && option != extendsOptionDeclaration {
			value, propertySetErrors = convertJsonOption(option, value, basePath, propertyAssignment, propertyAssignment.Initializer, sourceFile)
		}
		if parentOption != nil && parentOption.Name != "undefined" && value != nil {
			if option != nil && option.Name != "" {
				var parseDiagnostics []*ast.Diagnostic
				switch parentOption.Name {
				case "compilerOptions":
					parseDiagnostics = compilerOptions.ParseOption(option.Name, value)
				case "typeAcquisition":
					parseDiagnostics = ParseTypeAcquisition(option.Name, value, typeAcquisition)
				}
				propertySetErrors = append(propertySetErrors, parseDiagnostics...)
			} else if keyText != "" && extraKeyDiagnostics(parentOption.Name) != nil {
				unknownNameDiag := extraKeyDiagnostics(parentOption.Name)
				if parentOption.ElementOptions != nil {
					possibleOption := parentOption.ElementOptions.Get(keyText)
					if possibleOption == nil {
						possibleOption = parentOption.ElementOptions.GetSpellingSuggestion(keyText)
					}
					if possibleOption != nil && possibleOption.Name != keyText {
						propertySetErrors = append(propertySetErrors, CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(
							sourceFile,
							propertyAssignment.Name(),
							extraKeyDidYouMeanDiagnostics(parentOption.Name),
							keyText,
							possibleOption.Name,
						))
					} else {
						propertySetErrors = append(propertySetErrors, createUnknownOptionError(
							keyText,
							unknownNameDiag,
							"", /*unknownOptionErrorText*/
							propertyAssignment.Name(),
							sourceFile,
							nil, /*alternateMode*/
							nil, /*unknownDidYouMeanDiagnostic*/
							nil, /*optionsNameMap*/
						))
					}
				} else {
					// errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Unknown_compiler_option_0_Did_you_mean_1, keyText, core.FindKey(parentOption.ElementOptions, keyText)))
				}
			}
		} else if parentOption == tsconfigRootOptionsMap {
			if option == extendsOptionDeclaration {
				configPath, err := getExtendsConfigPathOrArray(value, host, basePath, configFileName, propertyAssignment, propertyAssignment.Initializer, sourceFile)
				extendedConfigPaths = configPath
				propertySetErrors = append(propertySetErrors, err...)
			} else if option == nil {
				if keyText == "excludes" {
					propertySetErrors = append(propertySetErrors, CreateDiagnosticForNodeInSourceFile(sourceFile, propertyAssignment.Name(), diagnostics.Unknown_option_excludes_Did_you_mean_exclude))
				}
				if core.Find(optionsForCompiler, func(option *CommandLineOption) bool { return option.Name == keyText }) != nil {
					rootCompilerOptions = append(rootCompilerOptions, propertyAssignment.Name())
				}
			}
		}
		return value, propertySetErrors
	}

	json, err := convertConfigFileToObject(
		sourceFile,
		&jsonConversionNotifier{
			tsconfigRootOptionsMap,
			onPropertySet,
		},
	)
	errors = append(errors, err...)
	if jsonObject, ok := json.(*collections.OrderedMap[string, any]); len(rootCompilerOptions) != 0 && ok && !jsonObject.Has("compilerOptions") {
		errors = append(errors, CreateDiagnosticForNodeInSourceFile(
			sourceFile,
			rootCompilerOptions[0],
			diagnostics.X_0_should_be_set_inside_the_compilerOptions_object_of_the_config_json_file,
			ast.GetTextOfPropertyName(rootCompilerOptions[0]),
		))
	}
	return &parsedTsconfig{
		raw:                 json,
		options:             compilerOptions,
		typeAcquisition:     typeAcquisition,
		extendedConfigPaths: extendedConfigPaths,
	}, errors
}

type TsConfigSourceFile struct {
	ExtendedSourceFiles []tspath.RootedFilePath
	configFileSpecs     *configFileSpecs
	SourceFile          *ast.SourceFile
}

func tsconfigToSourceFile(tsconfigSourceFile *TsConfigSourceFile) *ast.SourceFile {
	if tsconfigSourceFile == nil {
		return nil
	}
	return tsconfigSourceFile.SourceFile
}

func NewTsconfigSourceFileFromFilePath(configFileName tspath.RootedFilePath, configPath tspath.PathKey, configSourceText string) *TsConfigSourceFile {
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: configFileName,
		PathKey:  configPath,
	}, configSourceText, core.ScriptKindJSON)
	return &TsConfigSourceFile{
		SourceFile: sourceFile,
	}
}

type jsonConversionNotifier struct {
	rootOptions   *CommandLineOption
	onPropertySet func(keyText string, value any, propertyAssignment *ast.PropertyAssignment, parentOption *CommandLineOption, option *CommandLineOption) (any, []*ast.Diagnostic)
}

func convertConfigFileToObject(
	sourceFile *ast.SourceFile,
	jsonConversionNotifier *jsonConversionNotifier,
) (any, []*ast.Diagnostic) {
	var rootExpression *ast.Expression
	if len(sourceFile.Statements.Nodes) > 0 {
		rootExpression = sourceFile.Statements.Nodes[0].Expression()
	}
	if rootExpression != nil && rootExpression.Kind != ast.KindObjectLiteralExpression {
		baseFileName := "tsconfig.json"
		if sourceFile.FileName().BaseName() == "jsconfig.json" {
			baseFileName = "jsconfig.json"
		}
		errors := []*ast.Diagnostic{CreateDiagnosticForNodeInSourceFile(sourceFile, rootExpression, diagnostics.The_root_value_of_a_0_file_must_be_an_object, baseFileName)}
		// Last-ditch error recovery. Somewhat useful because the JSON parser will recover from some parse errors by
		// synthesizing a top-level array literal expression. There's a reasonable chance the first element of that
		// array is a well-formed configuration object, made into an array element by stray characters.
		if ast.IsArrayLiteralExpression(rootExpression) {
			firstObject := core.Find(rootExpression.Elements(), ast.IsObjectLiteralExpression)
			if firstObject != nil {
				return convertToJson(sourceFile, firstObject, true /*returnValue*/, jsonConversionNotifier)
			}
		}
		return &collections.OrderedMap[string, any]{}, errors
	}
	return convertToJson(sourceFile, rootExpression, true, jsonConversionNotifier)
}

var orderedMapType = reflect.TypeFor[*collections.OrderedMap[string, any]]()

func isCompilerOptionsValue(option *CommandLineOption, value any) bool {
	if option != nil {
		if value == nil {
			return !option.DisallowNullOrUndefined()
		}
		if option.Kind == "list" {
			return reflect.TypeOf(value).Kind() == reflect.Slice
		}
		if option.Kind == "listOrElement" {
			if reflect.TypeOf(value).Kind() == reflect.Slice {
				return true
			} else {
				return isCompilerOptionsValue(option.Elements(), value)
			}
		}
		if option.Kind == "string" {
			return reflect.TypeOf(value).Kind() == reflect.String
		}
		if option.Kind == "boolean" {
			return reflect.TypeOf(value).Kind() == reflect.Bool
		}
		if option.Kind == "number" {
			return reflect.TypeOf(value).Kind() == reflect.Float64
		}
		if option.Kind == "object" {
			return reflect.TypeOf(value) == orderedMapType
		}
		if option.Kind == "enum" && reflect.TypeOf(value).Kind() == reflect.String {
			return true
		}
	}
	return false
}

func validateJsonOptionValue(
	opt *CommandLineOption,
	val any,
	valueExpression *ast.Expression,
	sourceFile *ast.SourceFile,
) (any, []*ast.Diagnostic) {
	if val == nil {
		return nil, nil
	}

	var errors []*ast.Diagnostic

	switch opt.extraValidation {
	case extraValidationSpec:
		if diag := specToDiagnostic(val.(string), false); diag != nil {
			errors = append(errors, CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, diag))
		}
	case extraValidationLocale:
		if _, ok := locale.Parse(val.(string)); !ok {
			errors = append(errors, CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, diagnostics.Locale_must_be_an_IETF_BCP_47_language_tag_Examples_Colon_0_1, "en", "ja-jp"))
		}
	}

	if len(errors) > 0 {
		return nil, errors
	}
	return val, nil
}

func convertJsonOptionOfListType(
	option *CommandLineOption,
	values any,
	basePath tspath.RootedDirectoryPath,
	propertyAssignment *ast.PropertyAssignment,
	valueExpression *ast.Node,
	sourceFile *ast.SourceFile,
) ([]any, []*ast.Diagnostic) {
	var expression *ast.Node
	var errors []*ast.Diagnostic
	if values, ok := values.([]any); ok {
		mappedValues := core.MapIndex(values, func(v any, index int) any {
			if valueExpression != nil {
				expression = valueExpression.Elements()[index]
			}
			result, err := convertJsonOption(option.Elements(), v, basePath, propertyAssignment, expression, sourceFile)
			errors = append(errors, err...)
			return result
		})
		filteredValues := mappedValues
		if !option.listPreserveFalsyValues {
			filteredValues = core.Filter(mappedValues, func(v any) bool {
				return (v != nil && v != false && v != 0 && v != "")
			})
		}
		return filteredValues, errors
	}
	return nil, errors
}

const configDirTemplate = "${configDir}"

func startsWithConfigDirTemplate(value any) bool {
	str, ok := value.(string)
	if !ok {
		return false
	}
	return strings.HasPrefix(strings.ToLower(str), strings.ToLower(configDirTemplate))
}

func normalizeNonListOptionValue(option *CommandLineOption, basePath tspath.RootedDirectoryPath, value any) any {
	if option.PathKind.IsRooted() {
		value = tspath.NormalizeSlashes(value.(string))
		if !startsWithConfigDirTemplate(value) {
			value = tspath.GetNormalizedAbsolutePath(value.(string), basePath)
		}
		if value == "" {
			value = "."
		}
	}
	return value
}

func convertJsonOption(
	opt *CommandLineOption,
	value any,
	basePath tspath.RootedDirectoryPath,
	propertyAssignment *ast.PropertyAssignment,
	valueExpression *ast.Expression,
	sourceFile *ast.SourceFile,
) (any, []*ast.Diagnostic) {
	if opt.IsCommandLineOnly {
		var nodeValue *ast.Node
		if propertyAssignment != nil {
			nodeValue = propertyAssignment.Name()
		}
		if sourceFile == nil && nodeValue == nil {
			return nil, []*ast.Diagnostic{ast.NewCompilerDiagnostic(diagnostics.Option_0_can_only_be_specified_on_command_line, opt.Name)}
		} else {
			return nil, []*ast.Diagnostic{CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, nodeValue, diagnostics.Option_0_can_only_be_specified_on_command_line, opt.Name)}
		}
	}
	if isCompilerOptionsValue(opt, value) {
		switch opt.Kind {
		case CommandLineOptionTypeList:
			return convertJsonOptionOfListType(opt, value, basePath, propertyAssignment, valueExpression, sourceFile) // as ArrayLiteralExpression | undefined
		case CommandLineOptionTypeListOrElement:
			if reflect.TypeOf(value).Kind() == reflect.Slice {
				return convertJsonOptionOfListType(opt, value, basePath, propertyAssignment, valueExpression, sourceFile)
			} else {
				return convertJsonOption(opt.Elements(), value, basePath, propertyAssignment, valueExpression, sourceFile)
			}
		case CommandLineOptionTypeEnum:
			if value == nil {
				return nil, nil
			}
			return convertJsonOptionOfEnumType(opt, value.(string), valueExpression, sourceFile)
		}

		validatedValue, errors := validateJsonOptionValue(opt, value, valueExpression, sourceFile)
		if len(errors) > 0 || validatedValue == nil {
			return validatedValue, errors
		} else {
			return normalizeNonListOptionValue(opt, basePath, validatedValue), errors
		}
	} else {
		return nil, []*ast.Diagnostic{CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, diagnostics.Compiler_option_0_requires_a_value_of_type_1, opt.Name, getCompilerOptionValueTypeString(opt))}
	}
}

func getExtendsConfigPathOrArray(
	value CompilerOptionsValue,
	host ParseConfigHost,
	basePath tspath.RootedDirectoryPath,
	configFileName tspath.RootedFilePath,
	propertyAssignment *ast.PropertyAssignment,
	valueExpression *ast.Expression,
	sourceFile *ast.SourceFile,
) ([]tspath.RootedFilePath, []*ast.Diagnostic) {
	var extendedConfigPathArray []tspath.RootedFilePath
	newBase := basePath
	if configFileName != "" {
		newBase = configFileName.Directory()
	}
	if value == nil {
		_, errors := convertJsonOption(extendsOptionDeclaration, value, basePath, propertyAssignment, valueExpression, sourceFile)
		return extendedConfigPathArray, errors
	}
	if reflect.TypeOf(value).Kind() == reflect.String {
		val, err := getExtendsConfigPath(value.(string), host, newBase, valueExpression, sourceFile)
		if val != "" {
			extendedConfigPathArray = append(extendedConfigPathArray, val)
		}
		return extendedConfigPathArray, err
	}
	var errors []*ast.Diagnostic
	if reflect.TypeOf(value).Kind() == reflect.Slice {
		for index, fileName := range value.([]any) {
			var expression *ast.Expression = nil
			if valueExpression != nil {
				expression = valueExpression.Elements()[index]
			}
			if reflect.TypeOf(fileName).Kind() == reflect.String {
				val, err := getExtendsConfigPath(fileName.(string), host, newBase, expression, sourceFile)
				if val != "" {
					extendedConfigPathArray = append(extendedConfigPathArray, val)
				}
				errors = append(errors, err...)
			} else {
				_, err := convertJsonOption(extendsOptionDeclaration.Elements(), value, basePath, propertyAssignment, expression, sourceFile)
				errors = append(errors, err...)
			}
		}
	} else {
		_, errors = convertJsonOption(extendsOptionDeclaration, value, basePath, propertyAssignment, valueExpression, sourceFile)
	}
	return extendedConfigPathArray, errors
}

func getExtendsConfigPath(
	extendedConfig string,
	host ParseConfigHost,
	basePath tspath.RootedDirectoryPath,
	valueExpression *ast.Expression,
	sourceFile *ast.SourceFile,
) (tspath.RootedFilePath, []*ast.Diagnostic) {
	extendedConfig = tspath.NormalizeSlashes(extendedConfig)
	var errors []*ast.Diagnostic
	var errorFile *ast.SourceFile
	if sourceFile != nil {
		errorFile = sourceFile
	}
	if tspath.IsRootedDiskPath(extendedConfig) || strings.HasPrefix(extendedConfig, "./") || strings.HasPrefix(extendedConfig, "../") {
		extendedConfigPath := tspath.ToRootedFilePath(extendedConfig, basePath)
		if !host.FS().FileExists(extendedConfigPath) && !extendedConfigPath.ExtensionIs(tspath.ExtensionJson) {
			extendedConfigPath = extendedConfigPath.AppendSuffix(tspath.ExtensionJson)
			if !host.FS().FileExists(extendedConfigPath) {
				errors = append(errors, CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(errorFile, valueExpression, diagnostics.File_0_not_found, extendedConfig))
				return "", errors
			}
		}
		return extendedConfigPath, errors
	}
	// If the path isn't a rooted or relative path, resolve like a module
	resolverHost := &resolverHost{host}
	if resolved := module.ResolveConfig(extendedConfig, basePath.ResolveFile("tsconfig.json"), resolverHost); resolved.IsResolved() {
		return resolved.ResolvedFileName, errors
	}
	if extendedConfig == "" {
		errors = append(errors, CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(errorFile, valueExpression, diagnostics.Compiler_option_0_cannot_be_given_an_empty_string, "extends"))
	} else {
		errors = append(errors, CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(errorFile, valueExpression, diagnostics.File_0_not_found, extendedConfig))
	}
	return "", errors
}

type tsConfigOptions struct {
	prop       map[string][]string
	references []*core.ProjectReference
	notDefined string
}

type CommandLineOptionNameMap map[string]*CommandLineOption

func (m CommandLineOptionNameMap) Get(name string) *CommandLineOption {
	opt, ok := m[name]
	if !ok {
		opt, _ = m[strings.ToLower(name)]
	}
	return opt
}

func (m CommandLineOptionNameMap) GetSpellingSuggestion(name string) *CommandLineOption {
	return core.GetSpellingSuggestion(
		name,
		maps.Values(m),
		func(option *CommandLineOption) string { return option.Name },
		func(a *CommandLineOption, b *CommandLineOption) int { return strings.Compare(a.Name, b.Name) },
	)
}

func commandLineOptionsToMap(compilerOptions []*CommandLineOption) CommandLineOptionNameMap {
	result := make(map[string]*CommandLineOption, len(compilerOptions)*2)
	for i := range compilerOptions {
		result[compilerOptions[i].Name] = compilerOptions[i]
		result[strings.ToLower(compilerOptions[i].Name)] = compilerOptions[i]
	}
	return result
}

var CommandLineCompilerOptionsMap CommandLineOptionNameMap = commandLineOptionsToMap(OptionsDeclarations)

func convertMapToOptions[O optionParser](compilerOptions *collections.OrderedMap[string, any], result O) O {
	// this assumes any `key`, `value` pair in `options` will have `value` already be the correct type. this function should no error handling
	for key, value := range compilerOptions.Entries() {
		result.ParseOption(key, value)
	}
	return result
}

func convertOptionsFromJson[O optionParser](optionsNameMap CommandLineOptionNameMap, jsonOptions any, basePath tspath.RootedDirectoryPath, result O) (O, []*ast.Diagnostic) {
	if jsonOptions == nil {
		return result, nil
	}
	jsonMap, ok := jsonOptions.(*collections.OrderedMap[string, any])
	if !ok {
		// !!! probably should be an error
		return result, nil
	}
	var errors []*ast.Diagnostic
	for key, value := range jsonMap.Entries() {
		opt := optionsNameMap.Get(key)
		if opt != nil && opt.Name != key {
			// Case-insensitive match found but exact case doesn't match - provide "did you mean" suggestion
			errors = append(errors, CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(nil, nil, result.UnknownDidYouMeanDiagnostic(), key, opt.Name))
			continue
		}
		if opt == nil {
			errors = append(errors, createUnknownOptionError(key, result.UnknownOptionDiagnostic(), "", nil, nil, nil, result.UnknownDidYouMeanDiagnostic(), optionsNameMap))
			continue
		}

		convertJson, err := convertJsonOption(opt, value, basePath, nil, nil, nil)
		errors = append(errors, err...)
		compilerOptionsErr := result.ParseOption(key, convertJson)
		errors = append(errors, compilerOptionsErr...)
	}
	return result, errors
}

func convertArrayLiteralExpressionToJson(
	sourceFile *ast.SourceFile,
	elements []*ast.Expression,
	elementOption *CommandLineOption,
	returnValue bool,
) (any, []*ast.Diagnostic) {
	if !returnValue {
		for _, element := range elements {
			convertPropertyValueToJson(sourceFile, element, elementOption, returnValue, nil)
		}
		return nil, nil
	}
	// Filter out invalid values
	if len(elements) == 0 {
		// Always return an empty array, even if elements is nil.
		// The parser will produce nil slices instead of allocating empty ones.
		return []any{}, nil
	}
	var errors []*ast.Diagnostic
	var value []any
	for _, element := range elements {
		convertedValue, err := convertPropertyValueToJson(sourceFile, element, elementOption, returnValue, nil)
		errors = append(errors, err...)
		if convertedValue != nil {
			value = append(value, convertedValue)
		}
	}
	return value, errors
}

// ParseConfigFileTextToJson parses the text of the tsconfig.json file
// fileName is the path to the config file
// jsonText is the text of the config file
func ParseConfigFileTextToJson(fileName tspath.RootedFilePath, path tspath.PathKey, jsonText string) (any, []*ast.Diagnostic) {
	jsonSourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: fileName,
		PathKey:  path,
	}, jsonText, core.ScriptKindJSON)
	config, errors := convertConfigFileToObject(jsonSourceFile /*jsonConversionNotifier*/, nil)
	if len(jsonSourceFile.Diagnostics()) > 0 {
		errors = []*ast.Diagnostic{jsonSourceFile.Diagnostics()[0]}
	}
	return config, errors
}

type ParseConfigHost interface {
	FS() vfs.FS
	GetCurrentDirectory() tspath.RootedDirectoryPath
}

type resolverHost struct {
	ParseConfigHost
}

func (r *resolverHost) Trace(msg string) {}

func ParseJsonSourceFileConfigFileContent(
	sourceFile *TsConfigSourceFile,
	host ParseConfigHost,
	basePath tspath.RootedDirectoryPath,
	existingOptions *core.CompilerOptions,
	existingOptionsRaw *collections.OrderedMap[string, any],
	resolutionStack []tspath.PathKey,
	extendedConfigCache ExtendedConfigCache,
) *ParsedCommandLine {
	// tracing?.push(tracing.Phase.Parse, "parseJsonSourceFileConfigFileContent", { path: sourceFile.fileName });
	result := parseJsonConfigFileContentWorker(nil /*json*/, sourceFile, host, basePath, existingOptions, existingOptionsRaw, sourceFile.SourceFile.FileName(), resolutionStack, extendedConfigCache)
	// tracing?.pop();
	return result
}

func convertObjectLiteralExpressionToJson(
	sourceFile *ast.SourceFile,
	returnValue bool,
	node *ast.ObjectLiteralExpression,
	objectOption *CommandLineOption,
	jsonConversionNotifier *jsonConversionNotifier,
) (*collections.OrderedMap[string, any], []*ast.Diagnostic) {
	var result *collections.OrderedMap[string, any]
	if returnValue {
		result = &collections.OrderedMap[string, any]{}
	}
	var errors []*ast.Diagnostic
	for _, element := range node.Properties.Nodes {
		if element.Kind != ast.KindPropertyAssignment {
			errors = append(errors, ast.NewDiagnostic(sourceFile, element.Loc, diagnostics.Property_assignment_expected))
			continue
		}

		if token := element.QuestionToken(); token != nil {
			errors = append(errors, ast.NewDiagnostic(sourceFile, token.Loc, diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, "?"))
		}
		textOfKey := ""
		if !ast.IsComputedNonLiteralName(element.Name()) {
			textOfKey, _ = ast.TryGetTextOfPropertyName(element.Name())
		}
		keyText := textOfKey
		var option *CommandLineOption = nil
		if keyText != "" && objectOption != nil && objectOption.ElementOptions != nil {
			option = objectOption.ElementOptions.Get(keyText)
			if option != nil && option.Name != keyText {
				option = nil
			}
		}
		value, err := convertPropertyValueToJson(sourceFile, element.AsPropertyAssignment().Initializer, option, returnValue, jsonConversionNotifier)
		errors = append(errors, err...)
		if keyText != "" {
			if returnValue {
				result.Set(keyText, value)
			}
			// Notify key value set, if user asked for it
			if jsonConversionNotifier != nil {
				_, err := jsonConversionNotifier.onPropertySet(keyText, value, element.AsPropertyAssignment(), objectOption, option)
				errors = append(errors, err...)
			}
		}
	}
	return result, errors
}

// convertToJson converts the json syntax tree into the json value and report errors
// This returns the json value (apart from checking errors) only if returnValue provided is true.
// Otherwise it just checks the errors and returns undefined
func convertToJson(
	sourceFile *ast.SourceFile,
	rootExpression *ast.Expression,
	returnValue bool,
	jsonConversionNotifier *jsonConversionNotifier,
) (any, []*ast.Diagnostic) {
	if rootExpression == nil {
		if returnValue {
			return struct{}{}, nil
		} else {
			return nil, nil
		}
	}
	var rootOptions *CommandLineOption
	if jsonConversionNotifier != nil {
		rootOptions = jsonConversionNotifier.rootOptions
	}
	return convertPropertyValueToJson(sourceFile, rootExpression, rootOptions, returnValue, jsonConversionNotifier)
}

func isDoubleQuotedString(node *ast.Node) bool {
	return ast.IsStringLiteral(node)
}

func convertPropertyValueToJson(sourceFile *ast.SourceFile, valueExpression *ast.Expression, option *CommandLineOption, returnValue bool, jsonConversionNotifier *jsonConversionNotifier) (any, []*ast.Diagnostic) {
	switch valueExpression.Kind {
	case ast.KindTrueKeyword:
		return true, nil
	case ast.KindFalseKeyword:
		return false, nil
	case ast.KindNullKeyword: // todo: how to manage null
		return nil, nil

	case ast.KindStringLiteral:
		if !isDoubleQuotedString(valueExpression) {
			return valueExpression.Text(), []*ast.Diagnostic{ast.NewDiagnostic(sourceFile, valueExpression.Loc, diagnostics.String_literal_with_double_quotes_expected)}
		}
		return valueExpression.Text(), nil

	case ast.KindNumericLiteral:
		return float64(jsnum.FromString(valueExpression.Text())), nil
	case ast.KindPrefixUnaryExpression:
		if valueExpression.AsPrefixUnaryExpression().Operator != ast.KindMinusToken || valueExpression.AsPrefixUnaryExpression().Operand.Kind != ast.KindNumericLiteral {
			break // not valid JSON syntax
		}
		return float64(-jsnum.FromString(valueExpression.AsPrefixUnaryExpression().Operand.Text())), nil
	case ast.KindObjectLiteralExpression:
		objectLiteralExpression := valueExpression.AsObjectLiteralExpression()
		// Currently having element option declaration in the tsconfig with type "object"
		// determines if it needs onSetValidOptionKeyValueInParent callback or not
		// At moment there are only "compilerOptions", "typeAcquisition" and "typingOptions"
		// that satisfies it and need it to modify options set in them (for normalizing file paths)
		// vs what we set in the json
		// If need arises, we can modify this interface and callbacks as needed
		return convertObjectLiteralExpressionToJson(sourceFile, returnValue, objectLiteralExpression, option, jsonConversionNotifier)
	case ast.KindArrayLiteralExpression:
		result, errors := convertArrayLiteralExpressionToJson(
			sourceFile,
			valueExpression.Elements(),
			option,
			returnValue,
		)
		return result, errors
	}
	// Not in expected format
	var errors []*ast.Diagnostic
	if option != nil {
		errors = []*ast.Diagnostic{ast.NewDiagnostic(sourceFile, valueExpression.Loc, diagnostics.Compiler_option_0_requires_a_value_of_type_1, option.Name, getCompilerOptionValueTypeString(option))}
	} else {
		errors = []*ast.Diagnostic{ast.NewDiagnostic(sourceFile, valueExpression.Loc, diagnostics.Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_literal)}
	}
	return nil, errors
}

// ParseJsonConfigFileContent parses the contents of a config file (tsconfig.json).
// jsonNode: The contents of the config file to parse
// host: Instance of ParseConfigHost used to enumerate files in folder.
// basePath: A root directory to resolve relative path entries in the config file to. e.g. outDir
func ParseJsonConfigFileContent(json any, host ParseConfigHost, basePath tspath.RootedDirectoryPath, existingOptions *core.CompilerOptions, configFileName tspath.RootedFilePath, resolutionStack []tspath.PathKey, extendedConfigCache ExtendedConfigCache) *ParsedCommandLine {
	normalized := normalizeJsonValue(json)
	jsonObject, ok := normalized.(*collections.OrderedMap[string, any])
	if !ok {
		jsonObject = &collections.OrderedMap[string, any]{}
	}
	result := parseJsonConfigFileContentWorker(jsonObject, nil /*sourceFile*/, host, basePath, existingOptions, nil /*existingOptionsRaw*/, configFileName, resolutionStack, extendedConfigCache)
	return result
}

func normalizeJsonValue(value any) any {
	switch value := value.(type) {
	case *collections.OrderedMap[string, any]:
		for key, child := range value.Entries() {
			value.Set(key, normalizeJsonValue(child))
		}
		return value
	case map[string]any:
		result := collections.NewOrderedMapWithSizeHint[string, any](len(value))
		for _, key := range slices.Sorted(maps.Keys(value)) {
			child := value[key]
			result.Set(key, normalizeJsonValue(child))
		}
		return result
	case []any:
		result := make([]any, len(value))
		for i, child := range value {
			result[i] = normalizeJsonValue(child)
		}
		return result
	default:
		reflected := reflect.ValueOf(value)
		if !reflected.IsValid() || (reflected.Kind() != reflect.Slice && reflected.Kind() != reflect.Array) {
			return value
		}
		if reflected.Kind() == reflect.Slice && reflected.IsNil() {
			return nil
		}
		result := make([]any, reflected.Len())
		for i := range reflected.Len() {
			result[i] = normalizeJsonValue(reflected.Index(i).Interface())
		}
		return result
	}
}

// convertToObject converts the json syntax tree into the json value
func convertToObject(sourceFile *ast.SourceFile) (any, []*ast.Diagnostic) {
	var rootExpression *ast.Expression
	if len(sourceFile.Statements.Nodes) != 0 {
		rootExpression = sourceFile.Statements.Nodes[0].Expression()
	}
	return convertToJson(sourceFile, rootExpression, true /*returnValue*/, nil /*jsonConversionNotifier*/)
}

func getDefaultCompilerOptions(configFileName tspath.RootedFilePath) *parsedCompilerOptions {
	options := &core.CompilerOptions{}
	if configFileName != "" && configFileName.BaseName() == "jsconfig.json" {
		depth := 2
		options = &core.CompilerOptions{
			AllowJs:              core.TSTrue,
			MaxNodeModuleJsDepth: &depth,
			SkipLibCheck:         core.TSTrue,
			NoEmit:               core.TSTrue,
		}
	}
	return &parsedCompilerOptions{
		CompilerOptions: options,
		unresolvedPaths: make(unresolvedCompilerOptionPaths),
	}
}

func getDefaultTypeAcquisition(configFileName tspath.RootedFilePath) *core.TypeAcquisition {
	options := &core.TypeAcquisition{}
	if configFileName != "" && configFileName.BaseName() == "jsconfig.json" {
		options.Enable = core.TSTrue
	}
	return options
}

func convertCompilerOptionsFromJsonWorker(jsonOptions any, basePath tspath.RootedDirectoryPath, configFileName tspath.RootedFilePath) (*parsedCompilerOptions, []*ast.Diagnostic) {
	options := getDefaultCompilerOptions(configFileName)
	_, errors := convertOptionsFromJson(CommandLineCompilerOptionsMap, jsonOptions, basePath, &compilerOptionsParser{
		CompilerOptions: options.CompilerOptions,
		unresolvedPaths: options.unresolvedPaths,
	})
	if configFileName != "" {
		options.ConfigFilePath = configFileName
	}
	return options, errors
}

func convertTypeAcquisitionFromJsonWorker(jsonOptions any, basePath tspath.RootedDirectoryPath, configFileName tspath.RootedFilePath) (*core.TypeAcquisition, []*ast.Diagnostic) {
	options := getDefaultTypeAcquisition(configFileName)
	_, errors := convertOptionsFromJson(typeAcquisitionDeclaration.ElementOptions, jsonOptions, basePath, &typeAcquisitionParser{options})
	return options, errors
}

func parseOwnConfigOfJson(
	json *collections.OrderedMap[string, any],
	host ParseConfigHost,
	basePath tspath.RootedDirectoryPath,
	configFileName tspath.RootedFilePath,
) (*parsedTsconfig, []*ast.Diagnostic) {
	var errors []*ast.Diagnostic
	if json.Has("excludes") {
		errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Unknown_option_excludes_Did_you_mean_exclude))
	}
	options, err := convertCompilerOptionsFromJsonWorker(json.GetOrZero("compilerOptions"), basePath, configFileName)
	typeAcquisition, err2 := convertTypeAcquisitionFromJsonWorker(json.GetOrZero("typeAcquisition"), basePath, configFileName)
	errors = append(append(errors, err...), err2...)
	if compileOnSave, ok := json.Get("compileOnSave"); ok {
		converted, compileOnSaveErrors := convertJsonOption(compileOnSaveCommandLineOption, compileOnSave, basePath, nil, nil, nil)
		errors = append(errors, compileOnSaveErrors...)
		json.Set("compileOnSave", converted)
	}
	var extendedConfigPaths []tspath.RootedFilePath
	if extends := json.GetOrZero("extends"); extends != nil && extends != "" {
		extendedConfigPaths, err = getExtendsConfigPathOrArray(extends, host, basePath, configFileName, nil, nil, nil)
		errors = append(errors, err...)
	}
	parsedConfig := &parsedTsconfig{
		raw:                 json,
		options:             options,
		typeAcquisition:     typeAcquisition,
		extendedConfigPaths: extendedConfigPaths,
	}
	return parsedConfig, errors
}

func readJsonConfigFile(fileName tspath.RootedFilePath, path tspath.PathKey, readFile func(fileName tspath.RootedFilePath) (string, bool)) (*TsConfigSourceFile, []*ast.Diagnostic) {
	text, diagnostic := tryReadFile(fileName, readFile, []*ast.Diagnostic{})
	if text != "" {
		return &TsConfigSourceFile{
			SourceFile: parser.ParseSourceFile(ast.SourceFileParseOptions{
				FileName: fileName,
				PathKey:  path,
			}, text, core.ScriptKindJSON),
		}, diagnostic
	} else {
		factory := &ast.NodeFactory{}
		file := &TsConfigSourceFile{
			SourceFile: factory.NewSourceFile(ast.SourceFileParseOptions{FileName: fileName, PathKey: path}, "", factory.NewNodeList([]*ast.Node{}), factory.NewToken(ast.KindEndOfFile)).AsSourceFile(),
		}
		file.SourceFile.SetDiagnostics(diagnostic)
		return file, diagnostic
	}
}

func getExtendedConfig(
	sourceFile *TsConfigSourceFile,
	extendedConfigFileName tspath.RootedFilePath,
	host ParseConfigHost,
	resolutionStack []tspath.PathKey,
	extendedConfigCache ExtendedConfigCache,
	result *extendsResult,
) (*parsedTsconfig, []*ast.Diagnostic) {
	var errors []*ast.Diagnostic
	extendedConfigPath := host.FS().CaseSensitivity().PathKey(tspath.RootedPath(extendedConfigFileName))

	var cacheEntry *ExtendedConfigCacheEntry
	// Bypass the cache when we detect a cycle in the resolution stack.
	// The cache locks entries during parsing, and a cycle would cause the same goroutine
	// to re-lock the same entry, resulting in a deadlock. Let parseConfig handle the
	// circularity error via its own resolution stack check.
	if extendedConfigCache != nil && !slices.Contains(resolutionStack, extendedConfigPath) {
		cacheEntry = extendedConfigCache.GetExtendedConfig(extendedConfigFileName, extendedConfigPath, resolutionStack, host)
	} else {
		cacheEntry = ParseExtendedConfig(extendedConfigFileName, extendedConfigPath, resolutionStack, host, extendedConfigCache)
	}

	if len(cacheEntry.errors) > 0 {
		errors = append(errors, cacheEntry.errors...)
	}

	if cacheEntry.extendedResult != nil {
		if sourceFile != nil {
			result.extendedSourceFiles.Add(cacheEntry.extendedResult.SourceFile.FileName())
			for _, extendedSourceFile := range cacheEntry.extendedResult.ExtendedSourceFiles {
				result.extendedSourceFiles.Add(extendedSourceFile)
			}
		}
	}
	return cacheEntry.extendedConfig, errors
}

func ParseExtendedConfig(
	fileName tspath.RootedFilePath,
	path tspath.PathKey,
	resolutionStack []tspath.PathKey,
	host ParseConfigHost,
	extendedConfigCache ExtendedConfigCache,
) *ExtendedConfigCacheEntry {
	extendedResult, readErrors := readJsonConfigFile(fileName, path, host.FS().ReadFile)
	entry := &ExtendedConfigCacheEntry{
		extendedResult: extendedResult,
	}

	if len(readErrors) > 0 {
		entry.errors = readErrors
		return entry
	}

	if parseDiagnostics := extendedResult.SourceFile.Diagnostics(); len(parseDiagnostics) > 0 {
		entry.errors = parseDiagnostics
		return entry
	}

	var parseErrors []*ast.Diagnostic
	entry.extendedConfig, parseErrors = parseConfig(nil, extendedResult, host, fileName.Directory(), fileName, resolutionStack, extendedConfigCache)
	entry.errors = parseErrors
	return entry
}

// parseConfig just extracts options/include/exclude/files out of a config file.
// It does not resolve the included files.
func parseConfig(
	json *collections.OrderedMap[string, any],
	sourceFile *TsConfigSourceFile,
	host ParseConfigHost,
	basePath tspath.RootedDirectoryPath,
	configFileName tspath.RootedFilePath,
	resolutionStack []tspath.PathKey,
	extendedConfigCache ExtendedConfigCache,
) (*parsedTsconfig, []*ast.Diagnostic) {
	caseSensitivity := host.FS().CaseSensitivity()
	resolvedPath := caseSensitivity.PathKey(basePath.AsPath())
	if configFileName != "" {
		resolvedPath = caseSensitivity.PathKey(tspath.RootedPath(configFileName))
	}
	var errors []*ast.Diagnostic
	if slices.Contains(resolutionStack, resolvedPath) {
		var result *parsedTsconfig
		errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Circularity_detected_while_resolving_configuration_Colon_0))
		if json.Size() == 0 {
			result = &parsedTsconfig{raw: json}
		} else {
			rawResult, err := convertToObject(sourceFile.SourceFile)
			errors = append(errors, err...)
			result = &parsedTsconfig{raw: rawResult}
		}
		return result, errors
	}

	var ownConfig *parsedTsconfig
	var err []*ast.Diagnostic
	if json != nil {
		ownConfig, err = parseOwnConfigOfJson(json, host, basePath, configFileName)
	} else {
		ownConfig, err = parseOwnConfigOfJsonSourceFile(tsconfigToSourceFile(sourceFile), host, basePath, configFileName)
	}
	errors = append(errors, err...)
	if ownConfig.options != nil && ownConfig.options.Paths != nil {
		// If we end up needing to resolve relative paths from 'paths' relative to
		// the config file location, we'll need to know where that config file was.
		// Since 'paths' can be inherited from an extended config in another directory,
		// we wouldn't know which directory to use unless we store it here.
		ownConfig.options.PathsBasePath = basePath
	}

	applyExtendedConfig := func(result *extendsResult, extendedConfigPath tspath.RootedFilePath) {
		extendedConfig, extendedErrors := getExtendedConfig(sourceFile, extendedConfigPath, host, resolutionStack, extendedConfigCache, result)
		errors = append(errors, extendedErrors...)
		if extendedConfig != nil && extendedConfig.options != nil {
			extendsRaw := extendedConfig.raw
			relativeDifference := ""
			setPropertyValue := func(propertyName string) {
				if rawMap, ok := ownConfig.raw.(*collections.OrderedMap[string, any]); ok && rawMap.Has(propertyName) {
					return
				}
				if propertyName == "include" || propertyName == "exclude" || propertyName == "files" {
					if rawMap, ok := extendsRaw.(*collections.OrderedMap[string, any]); ok && rawMap.Has(propertyName) {
						if slice, _ := rawMap.GetOrZero(propertyName).([]any); slice != nil {
							value := core.Map(slice, func(path any) any {
								pathStr, isString := path.(string)
								if !isString {
									return path
								}
								if startsWithConfigDirTemplate(path) || tspath.IsRootedDiskPath(pathStr) {
									return pathStr
								} else {
									if relativeDifference == "" {
										relativeDifference = tspath.ConvertToRelativePath(
											extendedConfigPath.Directory().AsString(),
											basePath,
											host.FS().CaseSensitivity(),
										)
									}
									return tspath.CombinePaths(relativeDifference, pathStr)
								}
							})
							if propertyName == "include" {
								result.include = value
							} else if propertyName == "exclude" {
								result.exclude = value
							} else if propertyName == "files" {
								result.files = value
							}
						}
					}
				}
			}

			setPropertyValue("include")
			setPropertyValue("exclude")
			setPropertyValue("files")
			if extendedRawMap, ok := extendsRaw.(*collections.OrderedMap[string, any]); ok && extendedRawMap.Has("contentMappers") {
				result.contentMappers, _ = extendedRawMap.GetOrZero("contentMappers").([]any)
			}
			if extendedRawMap, ok := extendsRaw.(*collections.OrderedMap[string, any]); ok && extendedRawMap.Has("compileOnSave") {
				if compileOnSave, ok := extendedRawMap.GetOrZero("compileOnSave").(bool); ok {
					result.compileOnSave = compileOnSave
				}
			}
			mergeParsedCompilerOptions(result.options, extendedConfig.options, extendsRaw)
		}
	}

	if len(ownConfig.extendedConfigPaths) != 0 {
		// copy the resolution stack so it is never reused between branches in potential diamond-problem scenarios.
		resolutionStack = append(resolutionStack, resolvedPath)
		var result *extendsResult = &extendsResult{
			options: &parsedCompilerOptions{
				CompilerOptions: &core.CompilerOptions{},
				unresolvedPaths: make(unresolvedCompilerOptionPaths),
			},
		}
		for _, extendedConfigPath := range ownConfig.extendedConfigPaths {
			applyExtendedConfig(result, extendedConfigPath)
		}
		if result.include != nil {
			ownConfig.raw.(*collections.OrderedMap[string, any]).Set("include", result.include)
		}
		if result.exclude != nil {
			ownConfig.raw.(*collections.OrderedMap[string, any]).Set("exclude", result.exclude)
		}
		if result.files != nil {
			ownConfig.raw.(*collections.OrderedMap[string, any]).Set("files", result.files)
		}
		if result.contentMappers != nil && !ownConfig.raw.(*collections.OrderedMap[string, any]).Has("contentMappers") {
			ownConfig.raw.(*collections.OrderedMap[string, any]).Set("contentMappers", result.contentMappers)
		}
		if result.compileOnSave && !ownConfig.raw.(*collections.OrderedMap[string, any]).Has("compileOnSave") {
			ownConfig.raw.(*collections.OrderedMap[string, any]).Set("compileOnSave", result.compileOnSave)
		}
		if sourceFile != nil {
			for extendedSourceFile := range result.extendedSourceFiles.Keys() {
				sourceFile.ExtendedSourceFiles = core.InsertSorted(sourceFile.ExtendedSourceFiles, extendedSourceFile, cmp.Compare)
			}
		}
		ownConfig.options = mergeParsedCompilerOptions(result.options, ownConfig.options, ownConfig.raw)
	}
	return ownConfig, errors
}

const defaultIncludeSpec = "**/*"

type propOfRaw struct {
	sliceValue []any
	wrongValue string
}

func isStringValue(value any) bool {
	_, ok := value.(string)
	return ok
}

// parseJsonConfigFileContentWorker parses the contents of a config file from json or json source file (tsconfig.json).
// json: The contents of the config file to parse
// sourceFile: sourceFile corresponding to the Json
// host: Instance of ParseConfigHost used to enumerate files in folder.
// basePath: A root directory to resolve relative path entries in the config file to. e.g. outDir
// resolutionStack: Only present for backwards-compatibility. Should be empty.
func parseJsonConfigFileContentWorker(
	json *collections.OrderedMap[string, any],
	sourceFile *TsConfigSourceFile,
	host ParseConfigHost,
	basePath tspath.RootedDirectoryPath,
	existingOptions *core.CompilerOptions,
	existingOptionsRaw *collections.OrderedMap[string, any],
	configFileName tspath.RootedFilePath,
	resolutionStack []tspath.PathKey,
	extendedConfigCache ExtendedConfigCache,
) *ParsedCommandLine {
	debug.Assert((json == nil && sourceFile != nil) || (json != nil && sourceFile == nil))

	baseDirectory := basePath
	var basePathForFileNames tspath.RootedDirectoryPath
	if configFileName != "" {
		basePathForFileNames = configFileName.Directory()
	} else {
		basePathForFileNames = baseDirectory
	}

	var errors []*ast.Diagnostic
	parsedConfig, errors := parseConfig(json, sourceFile, host, baseDirectory, configFileName, resolutionStack, extendedConfigCache)
	mergeParsedCompilerOptions(parsedConfig.options, &parsedCompilerOptions{CompilerOptions: existingOptions}, existingOptionsRaw)
	handleOptionConfigDirTemplateSubstitution(parsedConfig.options, basePathForFileNames)
	rawConfig := parseJsonToStringKey(parsedConfig.raw)
	if configFileName != "" && parsedConfig.options != nil {
		parsedConfig.options.ConfigFilePath = configFileName
	}
	getPropFromRaw := func(prop string, validateElement func(value any) bool, elementTypeName string) propOfRaw {
		value, exists := rawConfig.Get(prop)
		if exists && value != nil {
			if reflect.TypeOf(value).Kind() == reflect.Slice {
				result := rawConfig.GetOrZero(prop)
				if _, ok := result.([]any); ok {
					if sourceFile == nil && !core.Every(result.([]any), validateElement) {
						errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, elementTypeName))
					}
				}
				return propOfRaw{sliceValue: result.([]any)}
			} else if sourceFile == nil {
				errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, "Array"))
				return propOfRaw{sliceValue: nil, wrongValue: "not-array"}
			}
		}
		return propOfRaw{sliceValue: nil, wrongValue: "no-prop"}
	}
	referencesOfRaw := getPropFromRaw("references", func(element any) bool { return reflect.TypeOf(element) == orderedMapType }, "object")
	fileSpecs := getPropFromRaw("files", isStringValue, "string")
	if fileSpecs.sliceValue != nil || fileSpecs.wrongValue == "" {
		hasZeroOrNoReferences := false
		if referencesOfRaw.wrongValue == "no-prop" || referencesOfRaw.wrongValue == "not-array" || len(referencesOfRaw.sliceValue) == 0 {
			hasZeroOrNoReferences = true
		}
		hasExtends := rawConfig.GetOrZero("extends")
		if fileSpecs.sliceValue != nil && len(fileSpecs.sliceValue) == 0 && hasZeroOrNoReferences && hasExtends == nil {
			if sourceFile != nil {
				var fileName string
				if configFileName != "" {
					fileName = configFileName.AsString()
				} else {
					fileName = "tsconfig.json"
				}
				diagnosticMessage := diagnostics.The_files_list_in_config_file_0_is_empty
				nodeValue := ForEachTsConfigPropArray(sourceFile.SourceFile, "files", func(property *ast.PropertyAssignment) *ast.Node { return property.Initializer })
				errors = append(errors, CreateDiagnosticForNodeInSourceFile(sourceFile.SourceFile, nodeValue, diagnosticMessage, fileName))
			} else {
				errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.The_files_list_in_config_file_0_is_empty, configFileName))
			}
		}
	}
	includeSpecs := getPropFromRaw("include", isStringValue, "string")
	excludeSpecs := getPropFromRaw("exclude", isStringValue, "string")
	isDefaultIncludeSpec := false
	if excludeSpecs.wrongValue == "no-prop" && parsedConfig.options != nil {
		outDir := parsedConfig.options.OutDir
		declarationDir := parsedConfig.options.DeclarationDir
		if outDir != "" || declarationDir != "" {
			var values []any
			if outDir != "" {
				values = append(values, outDir.AsString())
			}
			if declarationDir != "" {
				values = append(values, declarationDir.AsString())
			}
			excludeSpecs = propOfRaw{sliceValue: values}
		}
	}
	if fileSpecs.sliceValue == nil && includeSpecs.sliceValue == nil {
		includeSpecs = propOfRaw{sliceValue: []any{defaultIncludeSpec}}
		isDefaultIncludeSpec = true
	}
	var validatedIncludeSpecs []tspath.PathPattern
	var validatedIncludeSpecsBeforeSubstitution []tspath.PathPattern
	var validatedExcludeSpecs []tspath.PathPattern
	var validatedFilesSpec []tspath.FileSpec
	var validatedFilesSpecBeforeSubstitution []tspath.FileSpec
	// The exclude spec list is converted into a regular expression, which allows us to quickly
	// test whether a file or directory should be excluded before recursively traversing the
	// file system.
	if includeSpecs.sliceValue != nil {
		var err []*ast.Diagnostic
		validatedIncludeSpecsBeforeSubstitution, err = validateSpecs(includeSpecs.sliceValue, true /*disallowTrailingRecursion*/, tsconfigToSourceFile(sourceFile), "include")
		errors = append(errors, err...)
		if validatedIncludeSpecs = getSubstitutedStringArrayWithConfigDirTemplate(validatedIncludeSpecsBeforeSubstitution, basePathForFileNames); validatedIncludeSpecs == nil {
			validatedIncludeSpecs = validatedIncludeSpecsBeforeSubstitution
		}
	}
	if excludeSpecs.sliceValue != nil {
		var err []*ast.Diagnostic
		validatedExcludeSpecs, err = validateSpecs(excludeSpecs.sliceValue, false /*disallowTrailingRecursion*/, tsconfigToSourceFile(sourceFile), "exclude")
		errors = append(errors, err...)
		if validatedExcludeSpecsWithSubstitution := getSubstitutedStringArrayWithConfigDirTemplate(validatedExcludeSpecs, basePathForFileNames); validatedExcludeSpecsWithSubstitution != nil {
			validatedExcludeSpecs = validatedExcludeSpecsWithSubstitution
		}
	}
	if fileSpecs.sliceValue != nil {
		fileSpecs := core.Filter(fileSpecs.sliceValue, isStringValue)
		for _, spec := range fileSpecs {
			if spec, ok := spec.(string); ok {
				validatedFilesSpecBeforeSubstitution = append(validatedFilesSpecBeforeSubstitution, tspath.ToFileSpec(spec))
			}
		}
		if validatedFilesSpec = getSubstitutedStringArrayWithConfigDirTemplate(validatedFilesSpecBeforeSubstitution, basePathForFileNames); validatedFilesSpec == nil {
			validatedFilesSpec = validatedFilesSpecBeforeSubstitution
		}
	}
	caseSensitivity := host.FS().CaseSensitivity()
	validatedFileNames := make([]tspath.RootedFilePath, len(validatedFilesSpec))
	fileSpecByPath := make(map[tspath.PathKey]tspath.FileSpec, len(validatedFilesSpec))
	for i, spec := range validatedFilesSpec {
		var fileName tspath.RootedFilePath
		if spec == "" {
			// Preserve the existing behavior where an empty file spec resolves to
			// the config base path and is reported through normal file diagnostics.
			fileName = tspath.RootedFilePathFromPath(basePathForFileNames.AsPath())
		} else {
			fileName = tspath.ToRootedFilePath(spec.AsString(), basePathForFileNames)
		}
		validatedFileNames[i] = fileName
		path := caseSensitivity.PathKey(tspath.RootedPath(fileName))
		if _, exists := fileSpecByPath[path]; !exists {
			fileSpecByPath[path] = validatedFilesSpecBeforeSubstitution[i]
		}
	}
	configFileSpecs := configFileSpecs{
		filesSpecs:                              fileSpecs.sliceValue,
		includeSpecs:                            includeSpecs.sliceValue,
		excludeSpecs:                            excludeSpecs.sliceValue,
		validatedFilesSpec:                      validatedFilesSpec,
		validatedFileNames:                      validatedFileNames,
		fileSpecByPath:                          fileSpecByPath,
		validatedIncludeSpecs:                   validatedIncludeSpecs,
		validatedExcludeSpecs:                   validatedExcludeSpecs,
		validatedFilesSpecBeforeSubstitution:    validatedFilesSpecBeforeSubstitution,
		validatedIncludeSpecsBeforeSubstitution: validatedIncludeSpecsBeforeSubstitution,
		isDefaultIncludeSpec:                    isDefaultIncludeSpec,
	}

	if sourceFile != nil {
		sourceFile.configFileSpecs = &configFileSpecs
	}

	var contentMapperSourceFile *ast.SourceFile
	if sourceFile != nil {
		contentMapperSourceFile = sourceFile.SourceFile
	}
	var contentMappers []*contentmapper.Mapper
	var contentMapperIndices []int
	contentMappersOfRaw := getPropFromRaw("contentMappers", func(element any) bool { return reflect.TypeOf(element) == orderedMapType }, "object")
	for i, element := range contentMappersOfRaw.sliceValue {
		mapper, mapperErrors := parseContentMapper(element)
		for _, mapperError := range mapperErrors {
			errors = append(errors, setContentMapperDiagnosticLocation(mapperError, contentMapperSourceFile, getContentMapperSyntax(contentMapperSourceFile, i, "")))
		}
		if mapper != nil {
			contentMappers = append(contentMappers, mapper)
			contentMapperIndices = append(contentMapperIndices, i)
		}
	}
	totalContentMapperExtensions := 0
	for _, mapper := range contentMappers {
		totalContentMapperExtensions += len(mapper.Definition.Extensions)
	}
	seenContentMapperExtensions := make(map[string]struct{}, totalContentMapperExtensions)
	contentMapperExtensions := make([]string, 0, totalContentMapperExtensions)
	nativeExtensions := core.Flatten(tspath.AllSupportedExtensionsWithJson)
	canonicalExtension := func(extension string) string {
		return host.FS().CaseSensitivity().Canonicalize(extension)
	}
	for j, mapper := range contentMappers {
		validExtensions := make([]string, 0, len(mapper.Definition.Extensions))
		for _, ext := range mapper.Definition.Extensions {
			extNode := getContentMapperExtensionSyntax(contentMapperSourceFile, contentMapperIndices[j], ext)
			canonicalExt := canonicalExtension(ext)
			switch {
			case !strings.HasPrefix(ext, "."):
				errors = append(errors, setContentMapperDiagnosticLocation(ast.NewCompilerDiagnostic(diagnostics.Content_mapper_file_extension_0_must_begin_with_a, ext), contentMapperSourceFile, extNode))
			case slices.ContainsFunc(nativeExtensions, func(nativeExtension string) bool {
				return strings.EqualFold(nativeExtension, ext)
			}):
				errors = append(errors, setContentMapperDiagnosticLocation(ast.NewCompilerDiagnostic(diagnostics.Content_mapper_file_extension_0_is_a_built_in_extension_and_cannot_be_registered_by_a_content_mapper, ext), contentMapperSourceFile, extNode))
			default:
				if _, seen := seenContentMapperExtensions[canonicalExt]; seen {
					errors = append(errors, setContentMapperDiagnosticLocation(ast.NewCompilerDiagnostic(diagnostics.Content_mapper_file_extension_0_is_registered_by_more_than_one_content_mapper, ext), contentMapperSourceFile, extNode))
				} else {
					seenContentMapperExtensions[canonicalExt] = struct{}{}
					contentMapperExtensions = append(contentMapperExtensions, ext)
					validExtensions = append(validExtensions, ext)
				}
			}
		}
		mapper.Definition.Extensions = validExtensions
	}
	if len(contentMappers) > 0 && !(parsedConfig.options != nil && parsedConfig.options.RunExternalCode.IsTrue()) {
		errors = append(errors, setContentMapperDiagnosticLocation(ast.NewCompilerDiagnostic(diagnostics.Content_mappers_require_the_runExternalCode_command_line_flag_to_be_enabled), contentMapperSourceFile, getContentMappersKeySyntax(contentMapperSourceFile)))
		// Without the flag the mappers are not trusted to run, so drop them entirely: their extensions are
		// not registered and their files are not intercepted (they are treated as unknown foreign files).
		contentMappers = nil
		contentMapperExtensions = nil
	} else if len(contentMappers) > 0 {
		// Resolve each mapper's package.json now so its name, version, and run command are available to
		// everything downstream (diagnostics, build-info staleness) without executing anything.
		containingFile := configFileName
		if containingFile == "" {
			containingFile = basePathForFileNames.ResolveFile("tsconfig.json")
		}
		resolvedContentMappers := make([]*contentmapper.Mapper, 0, len(contentMappers))
		for j, mapper := range contentMappers {
			manifest, packageDirectory, diagnostic := resolveContentMapperManifest(host, containingFile, mapper.Package)
			mapper.PackageDirectory = packageDirectory
			if diagnostic != nil {
				errors = append(errors, setContentMapperDiagnosticLocation(diagnostic, contentMapperSourceFile, getContentMapperSyntax(contentMapperSourceFile, contentMapperIndices[j], "package")))
				continue
			}
			mapper.Manifest = manifest
			resolvedContentMappers = append(resolvedContentMappers, mapper)
		}
		contentMappers = resolvedContentMappers
		contentMapperExtensions = core.FlatMap(contentMappers, func(mapper *contentmapper.Mapper) []string {
			return mapper.Definition.Extensions
		})
	}

	getFileNames := func(basePath tspath.RootedDirectoryPath) ([]tspath.RootedFilePath, int) {
		parsedConfigOptions := parsedConfig.options
		fileNames, literalFileNamesLen := getFileNamesFromConfigSpecs(configFileSpecs, basePath, parsedConfigOptions.CompilerOptions, host.FS(), contentMapperExtensions)
		if shouldReportNoInputFiles(fileNames, canJsonReportNoInputFiles(rawConfig), resolutionStack) {
			includeSpecs := configFileSpecs.includeSpecs
			excludeSpecs := configFileSpecs.excludeSpecs
			if includeSpecs == nil {
				includeSpecs = []string{}
			}
			if excludeSpecs == nil {
				excludeSpecs = []string{}
			}
			errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2, configFileName, core.Must(core.StringifyJson(includeSpecs, "", "")), core.Must(core.StringifyJson(excludeSpecs, "", ""))))
		}
		return fileNames, literalFileNamesLen
	}

	getProjectReferences := func(basePath tspath.RootedDirectoryPath) []*core.ProjectReference {
		var projectReferences []*core.ProjectReference
		newReferencesOfRaw := getPropFromRaw("references", func(element any) bool { return reflect.TypeOf(element) == orderedMapType }, "object")
		if newReferencesOfRaw.sliceValue != nil {
			projectReferences = []*core.ProjectReference{}
			for index, reference := range newReferencesOfRaw.sliceValue {
				ref := parseProjectReference(reference)
				if ref == nil {
					continue
				}
				if !ref.hasPath || !ref.pathValid {
					errors = append(errors, createDiagnosticAtProjectReferenceProperty(sourceFile, index, "path", diagnostics.Compiler_option_0_requires_a_value_of_type_1, "reference.path", "string"))
					continue
				}
				if ref.path == "" {
					errors = append(errors, createDiagnosticAtProjectReferenceProperty(sourceFile, index, "path", diagnostics.Compiler_option_0_cannot_be_given_an_empty_string, "reference.path"))
					continue
				}
				if ref.hasCircular && !ref.circularValid {
					errors = append(errors, createDiagnosticAtProjectReferenceProperty(sourceFile, index, "circular", diagnostics.Compiler_option_0_requires_a_value_of_type_1, "reference.circular", "boolean"))
				}
				projectReferences = append(projectReferences, &core.ProjectReference{
					Path:         tspath.ToRootedPath(ref.path, basePath),
					OriginalPath: ref.path,
					Circular:     ref.reference.Circular,
				})
			}
		}
		return projectReferences
	}

	fileNames, literalFileNamesLen := getFileNames(basePathForFileNames)
	compileOnSave := new(false)
	if raw, ok := parsedConfig.raw.(*collections.OrderedMap[string, any]); ok {
		if value, ok := raw.GetOrZero("compileOnSave").(bool); ok {
			compileOnSave = &value
		}
	}
	return &ParsedCommandLine{
		ParsedConfig: &ParsedOptions{
			CompilerOptions:   parsedConfig.options.CompilerOptions,
			TypeAcquisition:   parsedConfig.typeAcquisition,
			FileNames:         fileNames,
			ProjectReferences: getProjectReferences(basePathForFileNames),
			ContentMappers:    contentMappers,
		},
		ConfigFile:    sourceFile,
		Raw:           parsedConfig.raw,
		Errors:        errors,
		CompileOnSave: compileOnSave,

		configFileSpecs:     &configFileSpecs,
		baseDirectory:       basePathForFileNames,
		caseSensitivity:     host.FS().CaseSensitivity(),
		literalFileNamesLen: literalFileNamesLen,
	}
}

func canJsonReportNoInputFiles(rawConfig *collections.OrderedMap[string, any]) bool {
	filesExists := rawConfig.Has("files")
	referencesExists := rawConfig.Has("references")
	return !filesExists && !referencesExists
}

func shouldReportNoInputFiles(fileNames []tspath.RootedFilePath, canJsonReportNoInputFiles bool, resolutionStack []tspath.PathKey) bool {
	return len(fileNames) == 0 && canJsonReportNoInputFiles && len(resolutionStack) == 0
}

func validateSpecs(specs any, disallowTrailingRecursion bool, jsonSourceFile *ast.SourceFile, specKey string) ([]tspath.PathPattern, []*ast.Diagnostic) {
	createDiagnostic := func(message *diagnostics.Message, spec string) *ast.Diagnostic {
		element := GetTsConfigPropArrayElementValue(jsonSourceFile, specKey, spec)
		var node *ast.Node
		if element != nil {
			node = element.AsNode()
		}
		return CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(jsonSourceFile, node, message, spec)
	}
	var errors []*ast.Diagnostic
	var finalSpecs []tspath.PathPattern
	for _, value := range specs.([]any) {
		spec, ok := value.(string)
		if !ok {
			continue
		}
		diag := specToDiagnostic(spec, disallowTrailingRecursion)
		if diag != nil {
			errors = append(errors, createDiagnostic(diag, spec))
		} else {
			finalSpecs = append(finalSpecs, tspath.ToPathPattern(spec))
		}
	}
	return finalSpecs, errors
}

func specToDiagnostic(spec string, disallowTrailingRecursion bool) *diagnostics.Message {
	if disallowTrailingRecursion && invalidTrailingRecursion(spec) {
		return diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0
	}
	if invalidDotDotAfterRecursiveWildcard(spec) {
		return diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0
	}
	return nil
}

func invalidTrailingRecursion(spec string) bool {
	// Matches **, /**, **/, and /**/, but not a**b.
	// Strip optional trailing slash, then check if it ends with /** or is just **
	s := strings.TrimSuffix(spec, "/")
	return s == "**" || strings.HasSuffix(s, "/**")
}

func invalidDotDotAfterRecursiveWildcard(s string) bool {
	// We used to use the regex /(^|\/)\*\*\/(.*\/)?\.\.($|\/)/ to check for this case, but
	// in v8, that has polynomial performance because the recursive wildcard match - **/ -
	// can be matched in many arbitrary positions when multiple are present, resulting
	// in bad backtracking (and we don't care which is matched - just that some /.. segment
	// comes after some **/ segment).
	var wildcardIndex int
	if strings.HasPrefix(s, "**/") {
		wildcardIndex = 0
	} else {
		wildcardIndex = strings.Index(s, "/**/")
	}
	if wildcardIndex == -1 {
		return false
	}
	var lastDotIndex int
	if strings.HasSuffix(s, "/..") {
		lastDotIndex = len(s)
	} else {
		lastDotIndex = strings.LastIndex(s, "/../")
	}
	return lastDotIndex > wildcardIndex
}

func GetTsConfigPropArrayElementValue(tsConfigSourceFile *ast.SourceFile, propKey string, elementValue string) *ast.StringLiteral {
	callback := GetCallbackForFindingPropertyAssignmentByValue(elementValue)
	return ForEachTsConfigPropArray(tsConfigSourceFile, propKey, func(property *ast.PropertyAssignment) *ast.StringLiteral {
		if value := callback(property); value != nil {
			return value.AsStringLiteral()
		}
		return nil
	})
}

func ForEachTsConfigPropArray[T any](tsConfigSourceFile *ast.SourceFile, propKey string, callback func(property *ast.PropertyAssignment) *T) *T {
	if tsConfigSourceFile != nil {
		return ForEachPropertyAssignment(getTsConfigObjectLiteralExpression(tsConfigSourceFile), propKey, callback)
	}
	return nil
}

func CreateDiagnosticAtReferenceSyntax(config *ParsedCommandLine, index int, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	return ForEachTsConfigPropArray(config.ConfigFile.SourceFile, "references", func(property *ast.PropertyAssignment) *ast.Diagnostic {
		if ast.IsArrayLiteralExpression(property.Initializer) {
			value := property.Initializer.Elements()
			if len(value) > index {
				return CreateDiagnosticForNodeInSourceFile(config.ConfigFile.SourceFile, value[index], message, args...)
			}
		}
		return nil
	})
}

func createDiagnosticAtProjectReferenceProperty(sourceFile *TsConfigSourceFile, index int, propertyName string, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	var node *ast.Node
	if sourceFile != nil {
		node = ForEachTsConfigPropArray(sourceFile.SourceFile, "references", func(property *ast.PropertyAssignment) *ast.Node {
			if ast.IsArrayLiteralExpression(property.Initializer) {
				elements := property.Initializer.Elements()
				if len(elements) > index && ast.IsObjectLiteralExpression(elements[index]) {
					if propertyNode := ForEachPropertyAssignment(elements[index].AsObjectLiteralExpression(), propertyName, func(property *ast.PropertyAssignment) *ast.Node {
						return property.Initializer
					}); propertyNode != nil {
						return propertyNode
					}
					return elements[index]
				}
			}
			return nil
		})
	}
	return CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(tsconfigToSourceFile(sourceFile), node, message, args...)
}

func GetCallbackForFindingPropertyAssignmentByValue(value string) func(property *ast.PropertyAssignment) *ast.Node {
	return func(property *ast.PropertyAssignment) *ast.Node {
		if ast.IsArrayLiteralExpression(property.Initializer) {
			return core.Find(property.Initializer.Elements(), func(element *ast.Node) bool {
				return ast.IsStringLiteral(element) && element.Text() == value
			})
		}
		return nil
	}
}

func GetOptionsSyntaxByArrayElementValue(objectLiteral *ast.ObjectLiteralExpression, propKey string, elementValue string) *ast.Node {
	return ForEachPropertyAssignment(objectLiteral, propKey, GetCallbackForFindingPropertyAssignmentByValue(elementValue))
}

// getContentMapperSyntax returns the tsconfig JSON node to attribute a diagnostic about the content
// mapper at index to: the value of subKey within that mapper's object (when subKey is non-empty),
// falling back to the mapper element, then to the "contentMappers" array. An index outside the array
// (e.g. -1) yields the array itself. Returns nil when there is no source file (JSON API).
func getContentMapperSyntax(sourceFile *ast.SourceFile, index int, subKey string) *ast.Node {
	if sourceFile == nil {
		return nil
	}
	return ForEachTsConfigPropArray(sourceFile, "contentMappers", func(property *ast.PropertyAssignment) *ast.Node {
		if !ast.IsArrayLiteralExpression(property.Initializer) {
			return property.Initializer
		}
		elements := property.Initializer.Elements()
		if index < 0 || index >= len(elements) {
			return property.Initializer
		}
		element := elements[index]
		if subKey != "" && ast.IsObjectLiteralExpression(element) {
			if node := ForEachPropertyAssignment(element.AsObjectLiteralExpression(), subKey, func(property *ast.PropertyAssignment) *ast.Node {
				return property.Initializer
			}); node != nil {
				return node
			}
		}
		return element
	})
}

func GetContentMapperOptionDiagnosticLocation(config *ParsedCommandLine, mapper *contentmapper.Mapper, path []contentmapper.OptionPathSegment) (*ast.SourceFile, core.TextRange) {
	if config == nil || config.ConfigFile == nil {
		return nil, core.UndefinedTextRange()
	}
	index := slices.Index(config.ContentMappers(), mapper)
	mapperNode := getContentMapperSyntax(config.ConfigFile.SourceFile, index, "")
	node := getContentMapperSyntax(config.ConfigFile.SourceFile, index, "options")
	if node == nil {
		node = mapperNode
	}
	for _, segment := range path {
		var next *ast.Node
		switch {
		case segment.IsIndex && ast.IsArrayLiteralExpression(node):
			elements := node.Elements()
			if segment.Index < len(elements) {
				next = elements[segment.Index]
			}
		case !segment.IsIndex && ast.IsObjectLiteralExpression(node):
			next = ForEachPropertyAssignment(node.AsObjectLiteralExpression(), segment.Property, func(property *ast.PropertyAssignment) *ast.Node {
				return property.Initializer
			})
		}
		if next == nil {
			break
		}
		node = next
	}
	if node == nil {
		return nil, core.UndefinedTextRange()
	}
	file := config.ConfigFile.SourceFile
	return file, core.NewTextRange(scanner.SkipTrivia(file.Text(), node.Pos()), node.End())
}

// getContentMappersKeySyntax returns the "contentMappers" property key node, used to attribute a
// diagnostic about the setting as a whole rather than a specific mapper.
func getContentMappersKeySyntax(sourceFile *ast.SourceFile) *ast.Node {
	if sourceFile == nil {
		return nil
	}
	return ForEachTsConfigPropArray(sourceFile, "contentMappers", func(property *ast.PropertyAssignment) *ast.Node {
		return property.Name()
	})
}

// getContentMapperExtensionSyntax returns the node for a specific extension string within the content
// mapper at index, falling back to the "extensions" array or the mapper element.
func getContentMapperExtensionSyntax(sourceFile *ast.SourceFile, index int, ext string) *ast.Node {
	node := getContentMapperSyntax(sourceFile, index, "extensions")
	if node != nil && ast.IsArrayLiteralExpression(node) {
		if element := core.Find(node.Elements(), func(element *ast.Node) bool {
			return ast.IsStringLiteral(element) && element.Text() == ext
		}); element != nil {
			return element
		}
	}
	return node
}

// setContentMapperDiagnosticLocation attaches a source location to a content mapper diagnostic when a
// tsconfig source file and node are available (the jsonSourceFile API), leaving it as a location-less
// compiler diagnostic otherwise (the JSON API).
func setContentMapperDiagnosticLocation(diagnostic *ast.Diagnostic, sourceFile *ast.SourceFile, node *ast.Node) *ast.Diagnostic {
	if sourceFile != nil && node != nil {
		diagnostic.SetFile(sourceFile)
		diagnostic.SetLocation(core.NewTextRange(scanner.SkipTrivia(sourceFile.Text(), node.Pos()), node.End()))
	}
	return diagnostic
}

func ForEachPropertyAssignment[T any](objectLiteral *ast.ObjectLiteralExpression, key string, callback func(property *ast.PropertyAssignment) *T, key2 ...string) *T {
	if objectLiteral != nil {
		for _, property := range objectLiteral.Properties.Nodes {
			if !ast.IsPropertyAssignment(property) {
				continue
			}
			if propName, ok := ast.TryGetTextOfPropertyName(property.Name()); ok {
				if propName == key || (len(key2) > 0 && key2[0] == propName) {
					return callback(property.AsPropertyAssignment())
				}
			}
		}
	}
	return nil
}

func getTsConfigObjectLiteralExpression(tsConfigSourceFile *ast.SourceFile) *ast.ObjectLiteralExpression {
	if tsConfigSourceFile != nil && tsConfigSourceFile.Statements != nil && len(tsConfigSourceFile.Statements.Nodes) > 0 {
		expression := tsConfigSourceFile.Statements.Nodes[0].Expression()
		if ast.IsObjectLiteralExpression(expression) {
			return expression.AsObjectLiteralExpression()
		}
	}
	return nil
}

func getSubstitutedPathWithConfigDirTemplate(value string, basePath tspath.RootedDirectoryPath) string {
	return tspath.GetNormalizedAbsolutePath(strings.Replace(value, configDirTemplate, "./", 1), basePath)
}

func getSubstitutedStringArrayWithConfigDirTemplate[T ~string](list []T, basePath tspath.RootedDirectoryPath) []T {
	var result []T
	for i, element := range list {
		if startsWithConfigDirTemplate(string(element)) {
			if result == nil {
				result = slices.Clone(list)
			}
			result[i] = T(getSubstitutedPathWithConfigDirTemplate(string(element), basePath))
		}
	}
	if result != nil {
		return result
	}
	return nil
}

func handleOptionConfigDirTemplateSubstitution(compilerOptions *parsedCompilerOptions, basePath tspath.RootedDirectoryPath) {
	if compilerOptions == nil {
		return
	}

	// !!! don't hardcode this; use options declarations?

	var paths *collections.OrderedMap[string, []string]
	for k, v := range compilerOptions.Paths.Entries() {
		if substitution := getSubstitutedStringArrayWithConfigDirTemplate(v, basePath); substitution != nil {
			if paths == nil {
				paths = compilerOptions.Paths.Clone()
				compilerOptions.Paths = paths
			}
			paths.Set(k, substitution)
		}
	}

	for key, value := range compilerOptions.unresolvedPaths {
		option := CommandLineCompilerOptionsMap.Get(key)
		if option.Kind == CommandLineOptionTypeList {
			value = core.Map(ParseStringArray(value), func(path string) any {
				return getSubstitutedPathWithConfigDirTemplate(path, basePath)
			})
		} else {
			value = getSubstitutedPathWithConfigDirTemplate(ParseString(value), basePath)
		}
		ParseCompilerOptions(key, value, compilerOptions.CompilerOptions)
	}
	clear(compilerOptions.unresolvedPaths)
}

// hasFileWithHigherPriorityExtension determines whether a literal or wildcard file has already been included that has a higher extension priority.
// file is the path to the file.
func hasFileWithHigherPriorityExtension(file tspath.RootedFilePath, extensions [][]string, hasFile func(fileName tspath.RootedFilePath) bool) bool {
	var extensionGroup []string
	for _, group := range extensions {
		if file.ExtensionIsOneOf(group) {
			extensionGroup = append(extensionGroup, group...)
		}
	}
	if len(extensionGroup) == 0 {
		return false
	}
	for _, ext := range extensionGroup {
		// d.ts files match with .ts extension and with case sensitive sorting the file order for same files with ts tsx and dts extension is
		// d.ts, .ts, .tsx in that order so we need to handle tsx and dts of same same name case here and in remove files with same extensions
		// So dont match .d.ts files with .ts extension
		if file.ExtensionIs(ext) && (ext != tspath.ExtensionTs || !file.ExtensionIs(tspath.ExtensionDts)) {
			return false
		}
		if hasFile(file.ChangeExtension(ext)) {
			if ext == tspath.ExtensionDts && (file.ExtensionIs(tspath.ExtensionJs) || file.ExtensionIs(tspath.ExtensionJsx)) {
				// LEGACY BEHAVIOR: An off-by-one bug somewhere in the extension priority system for wildcard module loading allowed declaration
				// files to be loaded alongside their js(x) counterparts. We regard this as generally undesirable, but retain the behavior to
				// prevent breakage.
				continue
			}
			return true
		}
	}
	return false
}

// Removes files included via wildcard expansion with a lower extension priority that have already been included.
// file is the path to the file.
func removeWildcardFilesWithLowerPriorityExtension[V any](file tspath.RootedFilePath, wildcardFiles *collections.OrderedMap[tspath.PathKey, V], extensions [][]string, keyMapper func(value tspath.RootedFilePath) tspath.PathKey) {
	var extensionGroup []string
	for _, group := range extensions {
		if file.ExtensionIsOneOf(group) {
			extensionGroup = append(extensionGroup, group...)
		}
	}
	if extensionGroup == nil {
		return
	}
	for i := len(extensionGroup) - 1; i >= 0; i-- {
		ext := extensionGroup[i]
		if file.ExtensionIs(ext) {
			return
		}
		lowerPriorityPath := keyMapper(file.ChangeExtension(ext))
		wildcardFiles.Delete(lowerPriorityPath)
	}
}

// getFileNamesFromConfigSpecs gets the file names from the provided config file specs that contain, files, include, exclude and
// other properties needed to resolve the file names
// configFileSpecs is the config file specs extracted with file names to include, wildcards to include/exclude and other details
// basePath is the base path for any relative file specifications.
// options is the Compiler options.
// host is the host used to resolve files and directories.
// extraExtensions are additional file extensions (e.g. from content mappers) to treat as supported.
func getFileNamesFromConfigSpecs(
	configFileSpecs configFileSpecs,
	basePath tspath.RootedDirectoryPath, // considering this is the current directory
	options *core.CompilerOptions,
	host vfs.FS,
	extraExtensions []string,
) ([]tspath.RootedFilePath, int) {
	keyMapper := func(fileName tspath.RootedFilePath) tspath.PathKey {
		return host.CaseSensitivity().PathKey(fileName.AsPath())
	}
	// Literal file names (provided via the "files" array in tsconfig.json) are stored in a
	// file map with a possibly case insensitive key. We use this map later when when including
	// wildcard paths.
	var literalFileMap collections.OrderedMap[tspath.PathKey, tspath.RootedFilePath]
	// Wildcard paths (provided via the "includes" array in tsconfig.json) are stored in a
	// file map with a possibly case insensitive key. We use this map to store paths matched
	// via wildcard, and to handle extension priority.
	var wildcardFileMap collections.OrderedMap[tspath.PathKey, tspath.RootedFilePath]
	// Wildcard paths of json files (provided via the "includes" array in tsconfig.json) are stored in a
	// file map with a possibly case insensitive key. We use this map to store paths matched
	// via wildcard of *.json kind
	var wildCardJsonFileMap collections.OrderedMap[tspath.PathKey, tspath.RootedFilePath]
	validatedFilesSpec := configFileSpecs.validatedFilesSpec
	validatedFileNames := configFileSpecs.validatedFileNames
	validatedIncludeSpecs := configFileSpecs.validatedIncludeSpecs
	validatedExcludeSpecs := configFileSpecs.validatedExcludeSpecs
	// Rather than re-query this for each file and filespec, we query the supported extensions
	// once and store it on the expansion context.
	supportedExtensions := GetSupportedExtensions(options, extraExtensions)
	supportedExtensionsWithJsonIfResolveJsonModule := GetSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions)
	// Literal files are always included verbatim. An "include" or "exclude" specification cannot
	// remove a literal file.
	for i := range validatedFilesSpec {
		literalFileMap.Set(keyMapper(validatedFileNames[i]), validatedFileNames[i])
	}

	var jsonOnlyIncludeMatchers *vfsmatch.SpecMatcher
	if len(validatedIncludeSpecs) > 0 {
		files := vfsmatch.ReadDirectory(host, basePath, core.Flatten(supportedExtensionsWithJsonIfResolveJsonModule), validatedExcludeSpecs, validatedIncludeSpecs, vfsmatch.UnlimitedDepth)
		for _, file := range files {
			if file.ExtensionIs(tspath.ExtensionJson) {
				if jsonOnlyIncludeMatchers == nil {
					includes := core.Filter(validatedIncludeSpecs, func(include tspath.PathPattern) bool {
						return strings.HasSuffix(include.AsString(), tspath.ExtensionJson)
					})
					jsonOnlyIncludeMatchers = vfsmatch.NewSpecMatcher(includes, basePath, vfsmatch.UsageFiles, host.CaseSensitivity())
				}
				var includeIndex int = -1
				if jsonOnlyIncludeMatchers != nil {
					includeIndex = jsonOnlyIncludeMatchers.MatchFileNameIndex(file)
				}
				if includeIndex != -1 {
					key := keyMapper(file)
					if !literalFileMap.Has(key) && !wildCardJsonFileMap.Has(key) {
						wildCardJsonFileMap.Set(key, file)
					}
				}
				continue
			}
			// If we have already included a literal or wildcard path with a
			// higher priority extension, we should skip this file.
			//
			// This handles cases where we may encounter both <file>.ts and
			// <file>.d.ts (or <file>.js if "allowJs" is enabled) in the same
			// directory when they are compilation outputs.
			if hasFileWithHigherPriorityExtension(file, supportedExtensions, func(fileName tspath.RootedFilePath) bool {
				canonicalFileName := keyMapper(fileName)
				return literalFileMap.Has(canonicalFileName) || wildcardFileMap.Has(canonicalFileName)
			}) {
				continue
			}
			// We may have included a wildcard path with a lower priority
			// extension due to the user-defined order of entries in the
			// "include" array. If there is a lower priority extension in the
			// same directory, we should remove it.
			removeWildcardFilesWithLowerPriorityExtension(file, &wildcardFileMap, supportedExtensions, keyMapper)
			key := keyMapper(file)
			if !literalFileMap.Has(key) && !wildcardFileMap.Has(key) {
				wildcardFileMap.Set(key, file)
			}
		}
	}
	files := make([]tspath.RootedFilePath, 0, literalFileMap.Size()+wildcardFileMap.Size()+wildCardJsonFileMap.Size())
	for file := range literalFileMap.Values() {
		files = append(files, file)
	}
	for file := range wildcardFileMap.Values() {
		files = append(files, file)
	}
	for file := range wildCardJsonFileMap.Values() {
		files = append(files, file)
	}
	return files, literalFileMap.Size()
}

func GetSupportedExtensions(compilerOptions *core.CompilerOptions, extraExtensions []string) [][]string {
	needJSExtensions := compilerOptions.GetAllowJS()
	var builtins [][]string
	if needJSExtensions {
		builtins = tspath.AllSupportedExtensions
	} else {
		builtins = tspath.SupportedTSExtensions
	}
	if len(extraExtensions) == 0 {
		return builtins
	}
	flatBuiltins := core.Flatten(builtins)
	var result [][]string
	for _, ext := range extraExtensions {
		if !slices.Contains(flatBuiltins, ext) {
			result = append(result, []string{ext})
		}
	}
	if len(result) == 0 {
		return builtins
	}
	return slices.Concat(builtins, result)
}

func GetSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions *core.CompilerOptions, supportedExtensions [][]string) [][]string {
	if compilerOptions == nil || !compilerOptions.GetResolveJsonModule() {
		return supportedExtensions
	}
	if core.Same(supportedExtensions, tspath.AllSupportedExtensions) {
		return tspath.AllSupportedExtensionsWithJson
	}
	if core.Same(supportedExtensions, tspath.SupportedTSExtensions) {
		return tspath.SupportedTSExtensionsWithJson
	}
	return slices.Concat(supportedExtensions, [][]string{{tspath.ExtensionJson}})
}

// Reads the config file and reports errors.
func GetParsedCommandLineOfConfigFile(
	configFileName tspath.RootedFilePath,
	options *core.CompilerOptions,
	optionsRaw *collections.OrderedMap[string, any],
	sys ParseConfigHost,
	extendedConfigCache ExtendedConfigCache,
) (*ParsedCommandLine, []*ast.Diagnostic) {
	return GetParsedCommandLineOfConfigFilePath(configFileName, sys.FS().CaseSensitivity().PathKey(tspath.RootedPath(configFileName)), options, optionsRaw, sys, extendedConfigCache)
}

func GetParsedCommandLineOfConfigFilePath(
	configFileName tspath.RootedFilePath,
	path tspath.PathKey,
	options *core.CompilerOptions,
	optionsRaw *collections.OrderedMap[string, any],
	sys ParseConfigHost,
	extendedConfigCache ExtendedConfigCache,
) (*ParsedCommandLine, []*ast.Diagnostic) {
	errors := []*ast.Diagnostic{}
	configFileText, errors := tryReadFile(configFileName, sys.FS().ReadFile, errors)
	if len(errors) > 0 {
		// these are unrecoverable errors--exit to report them as diagnostics
		return nil, errors
	}

	tsConfigSourceFile := NewTsconfigSourceFileFromFilePath(configFileName, path, configFileText)
	// tsConfigSourceFile.resolvedPath = tsConfigSourceFile.FileName()
	// tsConfigSourceFile.originalFileName = tsConfigSourceFile.FileName()
	return ParseJsonSourceFileConfigFileContent(
		tsConfigSourceFile,
		sys,
		configFileName.Directory(),
		options,
		optionsRaw,
		nil,
		extendedConfigCache,
	), nil
}

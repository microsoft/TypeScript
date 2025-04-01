package tsoptions

import (
	"fmt"
	"reflect"
	"regexp"
	"slices"
	"strings"

	"github.com/dlclark/regexp2"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/compiler/module"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type extendsResult struct {
	options *core.CompilerOptions
	// watchOptions        compiler.WatchOptions
	watchOptionsCopied  bool
	include             []any
	exclude             []any
	files               []any
	compileOnSave       bool
	extendedSourceFiles core.Set[string]
}

var compilerOptionsDeclaration = &CommandLineOption{
	Name:           "compilerOptions",
	Kind:           CommandLineOptionTypeObject,
	ElementOptions: commandLineCompilerOptionsMap,
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
	ElementOptions: map[string]*CommandLineOption{
		"extends": {Name: "extends", Kind: CommandLineOptionTypeString},
	},
}

var tsconfigRootOptionsMap = &CommandLineOption{
	Name: "undefined", // should never be needed since this is root
	Kind: CommandLineOptionTypeObject,
	ElementOptions: commandLineOptionsToMap([]*CommandLineOption{
		compilerOptionsDeclaration,
		extendsOptionDeclaration,
		{
			Name: "references",
			Kind: CommandLineOptionTypeList, // should be a list of projectReference
			// Category: diagnostics.Projects,
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
	excludeSpecs          any
	validatedFilesSpec    []string
	validatedIncludeSpecs []string
	validatedExcludeSpecs []string
	isDefaultIncludeSpec  bool
}
type fileExtensionInfo struct {
	extension      string
	isMixedContent bool
	scriptKind     core.ScriptKind
}
type ExtendedConfigCacheEntry struct {
	extendedResult *TsConfigSourceFile
	extendedConfig *parsedTsconfig
}
type parsedTsconfig struct {
	raw     any
	options *core.CompilerOptions
	// watchOptions    *compiler.WatchOptions
	// typeAcquisition *compiler.TypeAcquisition
	// Note that the case of the config path has not yet been normalized, as no files have been imported into the project yet
	extendedConfigPath any
}

func parseOwnConfigOfJsonSourceFile(
	sourceFile *ast.SourceFile,
	host ParseConfigHost,
	basePath string,
	configFileName string,
) (*parsedTsconfig, []*ast.Diagnostic) {
	options := getDefaultCompilerOptions(configFileName)
	// var typeAcquisition *compiler.TypeAcquisition
	// var watchOptions *compiler.WatchOptions
	var extendedConfigPath any
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
				propertySetErrors = append(propertySetErrors, ParseCompilerOptions(option.Name, value, options)...)
			} else if keyText != "" {
				if parentOption.ElementOptions != nil {
					// !!! TODO: support suggestion
					propertySetErrors = append(propertySetErrors, createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, propertyAssignment.Name(), diagnostics.Unknown_compiler_option_0, keyText))
				} else {
					// errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Unknown_compiler_option_0_Did_you_mean_1, keyText, core.FindKey(parentOption.ElementOptions, keyText)))
				}
			}
		} else if parentOption == tsconfigRootOptionsMap {
			if option == extendsOptionDeclaration {
				configPath, err := getExtendsConfigPathOrArray(value, host, basePath, configFileName, propertyAssignment, propertyAssignment.Initializer, sourceFile)
				extendedConfigPath = configPath
				propertySetErrors = append(propertySetErrors, err...)
			} else if option == nil {
				if keyText == "excludes" {
					propertySetErrors = append(propertySetErrors, createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, propertyAssignment.Name(), diagnostics.Unknown_option_excludes_Did_you_mean_exclude))
				}
				if core.Find(OptionsDeclarations, func(option *CommandLineOption) bool { return option.Name == keyText }) != nil {
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
	// if len(rootCompilerOptions) != 0  && json != nil && json.CompilerOptions != nil {
	//    errors = append(errors, ast.NewDiagnostic(sourceFile, rootCompilerOptions[0], diagnostics.X_0_should_be_set_inside_the_compilerOptions_object_of_the_config_json_file))
	// }
	return &parsedTsconfig{
		raw:     json,
		options: options,
		// watchOptions:    watchOptions,
		// typeAcquisition: typeAcquisition,
		extendedConfigPath: extendedConfigPath,
	}, errors
}

type TsConfigSourceFile struct {
	extendedSourceFiles []string
	configFileSpecs     *configFileSpecs
	SourceFile          *ast.SourceFile
}

func tsconfigToSourceFile(tsconfigSourceFile *TsConfigSourceFile) *ast.SourceFile {
	if tsconfigSourceFile == nil {
		return nil
	}
	return tsconfigSourceFile.SourceFile
}

func NewTsconfigSourceFileFromFilePath(configFileName string, configPath tspath.Path, configSourceText string) *TsConfigSourceFile {
	sourceFile := parser.ParseJSONText(configFileName, configPath, configSourceText)
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
		rootExpression = sourceFile.Statements.Nodes[0].AsExpressionStatement().Expression
	}
	if rootExpression != nil && rootExpression.Kind != ast.KindObjectLiteralExpression {
		baseFileName := "tsconfig.json"
		if tspath.GetBaseFileName(sourceFile.FileName()) == "jsconfig.json" {
			baseFileName = "jsconfig.json"
		}
		errors := []*ast.Diagnostic{ast.NewCompilerDiagnostic(diagnostics.The_root_value_of_a_0_file_must_be_an_object, baseFileName)}
		// Last-ditch error recovery. Somewhat useful because the JSON parser will recover from some parse errors by
		// synthesizing a top-level array literal expression. There's a reasonable chance the first element of that
		// array is a well-formed configuration object, made into an array element by stray characters.
		if ast.IsArrayLiteralExpression(rootExpression) {
			firstObject := core.Find(rootExpression.AsArrayLiteralExpression().Elements.Nodes, ast.IsObjectLiteralExpression)
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
	errors := []*ast.Diagnostic{}
	if opt.extraValidation {
		diag := specToDiagnostic(val.(string), false)
		if diag != nil {
			errors = append(errors, createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, diag))
			return nil, errors
		}
	}
	return val, nil
}

func convertJsonOptionOfListType(
	option *CommandLineOption,
	values any,
	basePath string,
	propertyAssignment *ast.PropertyAssignment,
	valueExpression *ast.Node,
	sourceFile *ast.SourceFile,
) ([]any, []*ast.Diagnostic) {
	var expression *ast.Node
	var errors []*ast.Diagnostic
	if values, ok := values.([]any); ok {
		mappedValues := core.MapIndex(values, func(v any, index int) any {
			if valueExpression != nil {
				expression = valueExpression.AsArrayLiteralExpression().Elements.Nodes[index]
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

func normalizeNonListOptionValue(option *CommandLineOption, basePath string, value any) any {
	if option.isFilePath {
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
	basePath string,
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
			return nil, []*ast.Diagnostic{createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, nodeValue, diagnostics.Option_0_can_only_be_specified_on_command_line, opt.Name)}
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
			return convertJsonOptionOfEnumType(opt, value.(string), valueExpression, sourceFile)
		}

		validatedValue, errors := validateJsonOptionValue(opt, value, valueExpression, sourceFile)
		if len(errors) > 0 || validatedValue == nil {
			return validatedValue, errors
		} else {
			return normalizeNonListOptionValue(opt, basePath, validatedValue), errors
		}
	} else {
		return nil, []*ast.Diagnostic{createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, diagnostics.Compiler_option_0_requires_a_value_of_type_1, opt.Name, getCompilerOptionValueTypeString(opt))}
	}
}

func getExtendsConfigPathOrArray(
	value CompilerOptionsValue,
	host ParseConfigHost,
	basePath string,
	configFileName string,
	propertyAssignment *ast.PropertyAssignment,
	valueExpression *ast.Expression,
	sourceFile *ast.SourceFile,
) ([]string, []*ast.Diagnostic) {
	var extendedConfigPathArray []string
	newBase := basePath
	if configFileName != "" {
		newBase = directoryOfCombinedPath(configFileName, basePath)
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
				expression = valueExpression.AsArrayLiteralExpression().Elements.Nodes[index]
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
	basePath string,
	valueExpression *ast.Expression,
	sourceFile *ast.SourceFile,
) (string, []*ast.Diagnostic) {
	extendedConfig = tspath.NormalizeSlashes(extendedConfig)
	var errors []*ast.Diagnostic
	var errorFile *ast.SourceFile
	if sourceFile != nil {
		errorFile = sourceFile
	}
	if tspath.IsRootedDiskPath(extendedConfig) || strings.HasPrefix(extendedConfig, "./") || strings.HasPrefix(extendedConfig, "../") {
		extendedConfigPath := tspath.GetNormalizedAbsolutePath(extendedConfig, basePath)
		if !host.FS().FileExists(extendedConfigPath) && !strings.HasSuffix(extendedConfigPath, tspath.ExtensionJson) {
			extendedConfigPath = extendedConfigPath + tspath.ExtensionJson
			if !host.FS().FileExists(extendedConfigPath) {
				errors = append(errors, createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(errorFile, valueExpression, diagnostics.File_0_not_found, extendedConfig))
				return "", errors
			}
		}
		return extendedConfigPath, errors
	}
	// If the path isn't a rooted or relative path, resolve like a module
	resolverHost := &resolverHost{host}
	if resolved := module.ResolveConfig(extendedConfig, tspath.CombinePaths(basePath, "tsconfig.json"), resolverHost); resolved.IsResolved() {
		return resolved.ResolvedFileName, errors
	}
	if extendedConfig == "" {
		errors = append(errors, createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(errorFile, valueExpression, diagnostics.Compiler_option_0_cannot_be_given_an_empty_string, "extends"))
	} else {
		errors = append(errors, createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(errorFile, valueExpression, diagnostics.File_0_not_found, extendedConfig))
	}
	return "", errors
}

type tsConfigOptions struct {
	prop       map[string][]string
	references []core.ProjectReference
	notDefined string
}

func commandLineOptionsToMap(options []*CommandLineOption) map[string]*CommandLineOption {
	result := make(map[string]*CommandLineOption)
	for i := range options {
		result[(options[i]).Name] = options[i]
	}
	return result
}

var commandLineCompilerOptionsMap map[string]*CommandLineOption = commandLineOptionsToMap(OptionsDeclarations)

func convertMapToOptions[O optionParser](options *collections.OrderedMap[string, any], result O) O {
	// this assumes any `key`, `value` pair in `options` will have `value` already be the correct type. this function should no error handling
	for key, value := range options.Entries() {
		result.ParseOption(key, value)
	}
	return result
}

func convertOptionsFromJson[O optionParser](optionsNameMap map[string]*CommandLineOption, jsonOptions any, basePath string, result O) (O, []*ast.Diagnostic) {
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
		opt, ok := optionsNameMap[key]
		if !ok {
			// !!! TODO?: support suggestion
			errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Unknown_compiler_option_0, key))
			continue
		}

		commandLineOptionEnumMapVal := opt.EnumMap()
		if commandLineOptionEnumMapVal != nil {
			val, ok := commandLineOptionEnumMapVal.Get(strings.ToLower(value.(string)))
			if ok {
				errors = result.ParseOption(key, val)
			}
		} else {
			convertJson, err := convertJsonOption(opt, value, basePath, nil, nil, nil)
			errors = append(errors, err...)
			compilerOptionsErr := result.ParseOption(key, convertJson)
			errors = append(errors, compilerOptionsErr...)
		}
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

func directoryOfCombinedPath(fileName string, basePath string) string {
	// Use the `getNormalizedAbsolutePath` function to avoid canonicalizing the path, as it must remain noncanonical
	// until consistent casing errors are reported
	return tspath.GetDirectoryPath(tspath.GetNormalizedAbsolutePath(fileName, basePath))
}

// ParseConfigFileTextToJson parses the text of the tsconfig.json file
// fileName is the path to the config file
// jsonText is the text of the config file
func ParseConfigFileTextToJson(fileName string, path tspath.Path, jsonText string) (any, []*ast.Diagnostic) {
	jsonSourceFile := parser.ParseJSONText(fileName, path, jsonText)
	config, errors := convertConfigFileToObject(jsonSourceFile /*jsonConversionNotifier*/, nil)
	if len(jsonSourceFile.Diagnostics()) > 0 {
		errors = []*ast.Diagnostic{jsonSourceFile.Diagnostics()[0]}
	}
	return config, errors
}

type ParseConfigHost interface {
	FS() vfs.FS
	GetCurrentDirectory() string
}

type resolverHost struct {
	ParseConfigHost
}

func (r *resolverHost) Trace(msg string) {}

func ParseJsonSourceFileConfigFileContent(sourceFile *TsConfigSourceFile, host ParseConfigHost, basePath string, existingOptions *core.CompilerOptions, configFileName string, resolutionStack []tspath.Path, extraFileExtensions []fileExtensionInfo, extendedConfigCache map[tspath.Path]*ExtendedConfigCacheEntry) *ParsedCommandLine {
	// tracing?.push(tracing.Phase.Parse, "parseJsonSourceFileConfigFileContent", { path: sourceFile.fileName });
	result := parseJsonConfigFileContentWorker(nil /*json*/, sourceFile, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache)
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

		// !!!
		// if ast.IsQuestionToken(element) {
		// 	errors = append(errors, ast.NewDiagnostic(sourceFile, element.Loc, diagnostics.Property_assignment_expected))
		// }
		if element.Name() != nil && !isDoubleQuotedString(element.Name()) {
			errors = append(errors, ast.NewDiagnostic(sourceFile, element.Loc, diagnostics.String_literal_with_double_quotes_expected))
		}

		textOfKey := ""
		if !ast.IsComputedNonLiteralName(element.Name()) {
			textOfKey, _ = ast.TryGetTextOfPropertyName(element.Name())
		}
		keyText := textOfKey
		var option *CommandLineOption = nil
		if keyText != "" && objectOption != nil && objectOption.ElementOptions != nil {
			option = objectOption.ElementOptions[keyText]
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
			return valueExpression.AsStringLiteral().Text, []*ast.Diagnostic{ast.NewDiagnostic(sourceFile, valueExpression.Loc, diagnostics.String_literal_with_double_quotes_expected)}
		}
		return valueExpression.AsStringLiteral().Text, nil

	case ast.KindNumericLiteral:
		return float64(jsnum.FromString(valueExpression.AsNumericLiteral().Text)), nil
	case ast.KindPrefixUnaryExpression:
		if valueExpression.AsPrefixUnaryExpression().Operator != ast.KindMinusToken || valueExpression.AsPrefixUnaryExpression().Operand.Kind != ast.KindNumericLiteral {
			break // not valid JSON syntax
		}
		return float64(-jsnum.FromString(valueExpression.AsPrefixUnaryExpression().Operand.AsNumericLiteral().Text)), nil
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
			valueExpression.AsArrayLiteralExpression().Elements.Nodes,
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
func ParseJsonConfigFileContent(json any, host ParseConfigHost, basePath string, existingOptions *core.CompilerOptions, configFileName string, resolutionStack []tspath.Path, extraFileExtensions []fileExtensionInfo, extendedConfigCache map[tspath.Path]*ExtendedConfigCacheEntry) *ParsedCommandLine {
	result := parseJsonConfigFileContentWorker(parseJsonToStringKey(json), nil /*sourceFile*/, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache)
	return result
}

// convertToObject converts the json syntax tree into the json value
func convertToObject(sourceFile *ast.SourceFile) (any, []*ast.Diagnostic) {
	var rootExpression *ast.Expression
	if len(sourceFile.Statements.Nodes) != 0 {
		rootExpression = sourceFile.Statements.Nodes[0].AsExpressionStatement().Expression
	}
	return convertToJson(sourceFile, rootExpression, true /*returnValue*/, nil /*jsonConversionNotifier*/)
}

func getDefaultCompilerOptions(configFileName string) *core.CompilerOptions {
	options := &core.CompilerOptions{}
	if configFileName != "" && tspath.GetBaseFileName(configFileName) == "jsconfig.json" {
		depth := 2
		options = &core.CompilerOptions{
			AllowJs:                      core.TSTrue,
			MaxNodeModuleJsDepth:         &depth,
			AllowSyntheticDefaultImports: core.TSTrue,
			SkipLibCheck:                 core.TSTrue,
			NoEmit:                       core.TSTrue,
		}
	}
	return options
}

func convertCompilerOptionsFromJsonWorker(jsonOptions any, basePath string, configFileName string) (*core.CompilerOptions, []*ast.Diagnostic) {
	options := getDefaultCompilerOptions(configFileName)
	_, errors := convertOptionsFromJson(commandLineCompilerOptionsMap, jsonOptions, basePath, &compilerOptionsParser{options})
	if configFileName != "" {
		options.ConfigFilePath = tspath.NormalizeSlashes(configFileName)
	}
	return options, errors
}

func parseOwnConfigOfJson(
	json *collections.OrderedMap[string, any],
	host ParseConfigHost,
	basePath string,
	configFileName string,
) (*parsedTsconfig, []*ast.Diagnostic) {
	var errors []*ast.Diagnostic
	if json.Has("excludes") {
		errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Unknown_option_excludes_Did_you_mean_exclude))
	}
	options, err := convertCompilerOptionsFromJsonWorker(json.GetOrZero("compilerOptions"), basePath, configFileName)
	errors = append(errors, err...)
	// typeAcquisition := convertTypeAcquisitionFromJsonWorker(json.typeAcquisition, basePath, errors, configFileName)
	// watchOptions := convertWatchOptionsFromJsonWorker(json.watchOptions, basePath, errors)
	// json.compileOnSave = convertCompileOnSaveOptionFromJson(json, basePath, errors)
	var extendedConfigPath []string
	if extends := json.GetOrZero("extends"); extends != nil && extends != "" {
		extendedConfigPath, err = getExtendsConfigPathOrArray(extends, host, basePath, configFileName, nil, nil, nil)
		errors = append(errors, err...)
	}
	parsedConfig := &parsedTsconfig{
		raw:                json,
		options:            options,
		extendedConfigPath: extendedConfigPath,
	}
	return parsedConfig, errors
}

func readJsonConfigFile(fileName string, path tspath.Path, readFile func(fileName string) (string, bool)) (*TsConfigSourceFile, []*ast.Diagnostic) {
	text, diagnostic := TryReadFile(fileName, readFile, []*ast.Diagnostic{})
	if text != "" {
		return &TsConfigSourceFile{
			SourceFile: parser.ParseJSONText(fileName, path, text),
		}, diagnostic
	} else {
		file := &TsConfigSourceFile{
			SourceFile: (&ast.NodeFactory{}).NewSourceFile("", fileName, path, nil).AsSourceFile(),
		}
		file.SourceFile.SetDiagnostics(diagnostic)
		return file, diagnostic
	}
}

func getExtendedConfig(
	sourceFile *TsConfigSourceFile,
	extendedConfigPath string,
	host ParseConfigHost,
	resolutionStack []string,
	extendedConfigCache map[tspath.Path]*ExtendedConfigCacheEntry,
	result *extendsResult,
) (*parsedTsconfig, []*ast.Diagnostic) {
	path := tspath.ToPath(extendedConfigPath, host.GetCurrentDirectory(), host.FS().UseCaseSensitiveFileNames())
	var extendedResult *TsConfigSourceFile
	var extendedConfig *parsedTsconfig
	var errors []*ast.Diagnostic
	value := extendedConfigCache[path]
	if extendedConfigCache != nil && value != nil {
		extendedResult = value.extendedResult
		extendedConfig = value.extendedConfig
	} else {
		var err []*ast.Diagnostic
		extendedResult, err = readJsonConfigFile(extendedConfigPath, path, host.FS().ReadFile)
		errors = append(errors, err...)
		if len(extendedResult.SourceFile.Diagnostics()) == 0 {
			extendedConfig, err = parseConfig(nil, extendedResult, host, tspath.GetDirectoryPath(extendedConfigPath), tspath.GetBaseFileName(extendedConfigPath), resolutionStack, extendedConfigCache)
			errors = append(errors, err...)
		}
		if extendedConfigCache != nil {
			extendedConfigCache[path] = &ExtendedConfigCacheEntry{
				extendedResult: extendedResult,
				extendedConfig: extendedConfig,
			}
		}
	}
	if sourceFile != nil {
		result.extendedSourceFiles.Add(extendedResult.SourceFile.FileName())
		if len(extendedResult.extendedSourceFiles) != 0 {
			for _, extenedSourceFile := range extendedResult.extendedSourceFiles {
				result.extendedSourceFiles.Add(extenedSourceFile)
			}
		}
	}
	if len(extendedResult.SourceFile.Diagnostics()) != 0 {
		errors = append(errors, extendedResult.SourceFile.Diagnostics()...)
		return nil, errors
	}
	return extendedConfig, errors
}

// parseConfig just extracts options/include/exclude/files out of a config file.
// It does not resolve the included files.
func parseConfig(
	json *collections.OrderedMap[string, any],
	sourceFile *TsConfigSourceFile,
	host ParseConfigHost,
	basePath string,
	configFileName string,
	resolutionStack []string,
	extendedConfigCache map[tspath.Path]*ExtendedConfigCacheEntry,
) (*parsedTsconfig, []*ast.Diagnostic) {
	basePath = tspath.NormalizeSlashes(basePath)
	resolvedPath := tspath.GetNormalizedAbsolutePath(configFileName, basePath)
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

	applyExtendedConfig := func(result *extendsResult, extendedConfigPath string) {
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
								if startsWithConfigDirTemplate(path) || tspath.IsRootedDiskPath(path.(string)) {
									return path.(string)
								} else {
									if relativeDifference == "" {
										t := tspath.ComparePathsOptions{
											UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
											CurrentDirectory:          host.GetCurrentDirectory(),
										}
										relativeDifference = tspath.ConvertToRelativePath(basePath, t)
									}
									return tspath.CombinePaths(relativeDifference, path.(string))
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
			if extendedRawMap, ok := extendsRaw.(*collections.OrderedMap[string, any]); ok && extendedRawMap.Has("compileOnSave") {
				if compileOnSave, ok := extendedRawMap.GetOrZero("compileOnSave").(bool); ok {
					result.compileOnSave = compileOnSave
				}
			}
			mergeCompilerOptions(result.options, extendedConfig.options)
		}
	}

	if ownConfig.extendedConfigPath != nil {
		// copy the resolution stack so it is never reused between branches in potential diamond-problem scenarios.
		resolutionStack = append(resolutionStack, resolvedPath)
		var result *extendsResult = &extendsResult{
			options: &core.CompilerOptions{},
		}
		if reflect.TypeOf(ownConfig.extendedConfigPath).Kind() == reflect.String {
			applyExtendedConfig(result, ownConfig.extendedConfigPath.(string))
		} else if configPath, ok := ownConfig.extendedConfigPath.([]string); ok {
			for _, extendedConfigPath := range configPath {
				applyExtendedConfig(result, extendedConfigPath)
			}
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
		if result.compileOnSave && !ownConfig.raw.(*collections.OrderedMap[string, any]).Has("compileOnSave") {
			ownConfig.raw.(*collections.OrderedMap[string, any]).Set("compileOnSave", result.compileOnSave)
		}
		if sourceFile != nil {
			for extendedSourceFile := range result.extendedSourceFiles.Keys() {
				sourceFile.extendedSourceFiles = append(sourceFile.extendedSourceFiles, extendedSourceFile)
			}
		}
		ownConfig.options = mergeCompilerOptions(result.options, ownConfig.options)
		// ownConfig.watchOptions = ownConfig.watchOptions && result.watchOptions ?
		//     assignWatchOptions(result, ownConfig.watchOptions) :
		//     ownConfig.watchOptions || result.watchOptions;
	}
	return ownConfig, errors
}

const defaultIncludeSpec = "**/*"

type propOfRaw struct {
	sliceValue []any
	wrongValue string
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
	basePath string,
	existingOptions *core.CompilerOptions,
	configFileName string,
	resolutionStack []tspath.Path,
	extraFileExtensions []fileExtensionInfo,
	extendedConfigCache map[tspath.Path]*ExtendedConfigCacheEntry,
) *ParsedCommandLine {
	// Debug.assert((json === undefined && sourceFile !== undefined) || (json !== undefined && sourceFile === undefined));

	basePathForFileNames := ""
	if configFileName != "" {
		basePathForFileNames = tspath.NormalizePath(directoryOfCombinedPath(configFileName, basePath))
	} else {
		basePathForFileNames = tspath.NormalizePath(basePath)
	}

	var errors []*ast.Diagnostic
	resolutionStackString := []string{}
	parsedConfig, errors := parseConfig(json, sourceFile, host, basePath, configFileName, resolutionStackString, extendedConfigCache)
	mergeCompilerOptions(parsedConfig.options, existingOptions)
	handleOptionConfigDirTemplateSubstitution(parsedConfig.options, basePathForFileNames)
	rawConfig := parseJsonToStringKey(parsedConfig.raw)
	if configFileName != "" && parsedConfig.options != nil {
		parsedConfig.options.ConfigFilePath = tspath.NormalizeSlashes(configFileName)
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
	fileSpecs := getPropFromRaw("files", func(element any) bool { return reflect.TypeOf(element).Kind() == reflect.String }, "string")
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
					fileName = configFileName
				} else {
					fileName = "tsconfig.json"
				}
				diagnosticMessage := diagnostics.The_files_list_in_config_file_0_is_empty
				nodeValue := forEachTsConfigPropArray(sourceFile.SourceFile, "files", func(property *ast.PropertyAssignment) *ast.Node { return property.Initializer })
				errors = append(errors, ast.NewDiagnostic(sourceFile.SourceFile, core.NewTextRange(scanner.SkipTrivia(sourceFile.SourceFile.Text, nodeValue.Pos()), nodeValue.End()), diagnosticMessage, fileName))
			} else {
				errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.The_files_list_in_config_file_0_is_empty, configFileName))
			}
		}
	}
	includeSpecs := getPropFromRaw("include", func(element any) bool { return reflect.TypeOf(element).Kind() == reflect.String }, "string")
	excludeSpecs := getPropFromRaw("exclude", func(element any) bool { return reflect.TypeOf(element).Kind() == reflect.String }, "string")
	isDefaultIncludeSpec := false
	if excludeSpecs.wrongValue == "no-prop" && parsedConfig.options != nil {
		outDir := parsedConfig.options.OutDir
		declarationDir := parsedConfig.options.DeclarationDir
		if outDir != "" || declarationDir != "" {
			var values []any
			if outDir != "" {
				values = append(values, outDir)
			}
			if declarationDir != "" {
				values = append(values, declarationDir)
			}
			excludeSpecs = propOfRaw{sliceValue: values}
		}
	}
	if fileSpecs.sliceValue == nil && includeSpecs.sliceValue == nil {
		includeSpecs = propOfRaw{sliceValue: []any{defaultIncludeSpec}}
		isDefaultIncludeSpec = true
	}
	var validatedIncludeSpecs []string
	var validatedExcludeSpecs []string
	var validatedFilesSpec []string
	// The exclude spec list is converted into a regular expression, which allows us to quickly
	// test whether a file or directory should be excluded before recursively traversing the
	// file system.
	if includeSpecs.sliceValue != nil {
		var err []*ast.Diagnostic
		validatedIncludeSpecs, err = validateSpecs(includeSpecs.sliceValue, true /*disallowTrailingRecursion*/, tsconfigToSourceFile(sourceFile), "include")
		errors = append(errors, err...)
		substituteStringArrayWithConfigDirTemplate(validatedIncludeSpecs, basePathForFileNames)
	}
	if excludeSpecs.sliceValue != nil {
		var err []*ast.Diagnostic
		validatedExcludeSpecs, err = validateSpecs(excludeSpecs.sliceValue, false /*disallowTrailingRecursion*/, tsconfigToSourceFile(sourceFile), "exclude")
		errors = append(errors, err...)
		substituteStringArrayWithConfigDirTemplate(validatedExcludeSpecs, basePathForFileNames)
	}
	if fileSpecs.sliceValue != nil {
		fileSpecs := core.Filter(fileSpecs.sliceValue, func(spec any) bool { return reflect.TypeOf(spec).Kind() == reflect.String })
		for _, spec := range fileSpecs {
			if spec, ok := spec.(string); ok {
				validatedFilesSpec = append(validatedFilesSpec, spec)
			}
		}
		substituteStringArrayWithConfigDirTemplate(validatedFilesSpec, basePathForFileNames)
	}
	configFileSpecs := configFileSpecs{
		fileSpecs.sliceValue,
		includeSpecs.sliceValue,
		excludeSpecs.sliceValue,
		validatedFilesSpec,
		validatedIncludeSpecs,
		validatedExcludeSpecs,
		isDefaultIncludeSpec,
	}

	if sourceFile != nil {
		sourceFile.configFileSpecs = &configFileSpecs
	}

	getFileNames := func(basePath string) []string {
		parsedConfigOptions := parsedConfig.options
		fileNames := getFileNamesFromConfigSpecs(configFileSpecs, basePath, parsedConfigOptions, host.FS(), extraFileExtensions)
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
		return fileNames
	}

	getProjectReferences := func(basePath string) []core.ProjectReference {
		var projectReferences []core.ProjectReference = []core.ProjectReference{}
		newReferencesOfRaw := getPropFromRaw("references", func(element any) bool { return reflect.TypeOf(element) == orderedMapType }, "object")
		if newReferencesOfRaw.sliceValue != nil {
			for _, reference := range newReferencesOfRaw.sliceValue {
				for _, ref := range parseProjectReference(reference) {
					if reflect.TypeOf(ref.Path).Kind() != reflect.String {
						if sourceFile == nil {
							errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Compiler_option_0_requires_a_value_of_type_1, "reference.path", "string"))
						}
					} else {
						projectReferences = append(projectReferences, core.ProjectReference{
							Path:         tspath.GetNormalizedAbsolutePath(ref.Path, basePath),
							OriginalPath: ref.Path,
							Circular:     ref.Circular,
						})
					}
				}
			}
		}
		return projectReferences
	}

	return &ParsedCommandLine{
		ParsedConfig: &core.ParsedOptions{
			CompilerOptions:   parsedConfig.options,
			FileNames:         getFileNames(basePathForFileNames),
			ProjectReferences: getProjectReferences(basePathForFileNames),
		},
		ConfigFile: sourceFile,
		Raw:        parsedConfig.raw,
		Errors:     errors,
	}
}

func canJsonReportNoInputFiles(rawConfig *collections.OrderedMap[string, any]) bool {
	filesExists := rawConfig.Has("files")
	referencesExists := rawConfig.Has("references")
	return !filesExists && !referencesExists
}

func shouldReportNoInputFiles(fileNames []string, canJsonReportNoInputFiles bool, resolutionStack []tspath.Path) bool {
	return len(fileNames) == 0 && canJsonReportNoInputFiles && len(resolutionStack) == 0
}

func validateSpecs(specs any, disallowTrailingRecursion bool, jsonSourceFile *ast.SourceFile, specKey string) ([]string, []*ast.Diagnostic) {
	createDiagnostic := func(message *diagnostics.Message, spec string) *ast.Diagnostic {
		element := getTsConfigPropArrayElementValue(jsonSourceFile, specKey, spec)
		return createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(jsonSourceFile, element.AsNode(), message, spec)
	}
	var errors []*ast.Diagnostic
	var finalSpecs []string
	for _, spec := range specs.([]any) {
		if reflect.TypeOf(spec).Kind() != reflect.String {
			continue
		}
		diag := specToDiagnostic(spec.(string), disallowTrailingRecursion)
		if diag != nil {
			errors = append(errors, createDiagnostic(diag, spec.(string)))
		} else {
			finalSpecs = append(finalSpecs, spec.(string))
		}
	}
	return finalSpecs, errors
}

func specToDiagnostic(spec string, disallowTrailingRecursion bool) *diagnostics.Message {
	if disallowTrailingRecursion {
		if ok, _ := regexp.MatchString(invalidTrailingRecursionPattern, spec); ok {
			return diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0
		}
	} else if invalidDotDotAfterRecursiveWildcard(spec) {
		return diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0
	}
	return nil
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

// Tests for a path that ends in a recursive directory wildcard.
//
//	Matches **, \**, **\, and \**\, but not a**b.
//	NOTE: used \ in place of / above to avoid issues with multiline comments.
//
// Breakdown:
//
//	(^|\/)      # matches either the beginning of the string or a directory separator.
//	\*\*        # matches the recursive directory wildcard "**".
//	\/?$        # matches an optional trailing directory separator at the end of the string.
const invalidTrailingRecursionPattern = `(?:^|\/)\*\*\/?$`

func getTsConfigPropArrayElementValue(tsConfigSourceFile *ast.SourceFile, propKey string, elementValue string) *ast.StringLiteral {
	return forEachTsConfigPropArray(tsConfigSourceFile, propKey, func(property *ast.PropertyAssignment) *ast.StringLiteral {
		if ast.IsArrayLiteralExpression(property.Initializer) {
			value := core.Find(property.Initializer.AsArrayLiteralExpression().Elements.Nodes, func(element *ast.Node) bool {
				return ast.IsStringLiteral(element) && element.AsStringLiteral().Text == elementValue
			})
			if value != nil {
				return value.AsStringLiteral()
			}
		}
		return nil
	})
}

func forEachTsConfigPropArray[T any](tsConfigSourceFile *ast.SourceFile, propKey string, callback func(property *ast.PropertyAssignment) *T) *T {
	if tsConfigSourceFile != nil {
		return forEachPropertyAssignment(getTsConfigObjectLiteralExpression(tsConfigSourceFile), propKey, callback)
	}
	return nil
}

func forEachPropertyAssignment[T any](objectLiteral *ast.ObjectLiteralExpression, key string, callback func(property *ast.PropertyAssignment) T, key2 ...string) T {
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
	return *new(T)
}

func getTsConfigObjectLiteralExpression(tsConfigSourceFile *ast.SourceFile) *ast.ObjectLiteralExpression {
	if tsConfigSourceFile != nil && tsConfigSourceFile.Statements != nil && len(tsConfigSourceFile.Statements.Nodes) > 0 {
		expression := tsConfigSourceFile.Statements.Nodes[0].AsExpressionStatement().Expression
		return expression.AsObjectLiteralExpression()
	}
	return nil
}

func getSubstitutedPathWithConfigDirTemplate(value string, basePath string) string {
	return tspath.GetNormalizedAbsolutePath(strings.Replace(value, configDirTemplate, "./", 1), basePath)
}

func substituteStringArrayWithConfigDirTemplate(list []string, basePath string) {
	for i, element := range list {
		if startsWithConfigDirTemplate(element) {
			list[i] = getSubstitutedPathWithConfigDirTemplate(element, basePath)
		}
	}
}

func handleOptionConfigDirTemplateSubstitution(options *core.CompilerOptions, basePath string) {
	if options == nil {
		return
	}

	// !!! don't hardcode this; use options declarations?

	for v := range options.Paths.Values() {
		substituteStringArrayWithConfigDirTemplate(v, basePath)
	}

	substituteStringArrayWithConfigDirTemplate(options.RootDirs, basePath)
	substituteStringArrayWithConfigDirTemplate(options.TypeRoots, basePath)

	if startsWithConfigDirTemplate(options.GenerateCpuProfile) {
		options.GenerateCpuProfile = getSubstitutedPathWithConfigDirTemplate(options.GenerateCpuProfile, basePath)
	}
	if startsWithConfigDirTemplate(options.GenerateTrace) {
		options.GenerateTrace = getSubstitutedPathWithConfigDirTemplate(options.GenerateTrace, basePath)
	}
	if startsWithConfigDirTemplate(options.OutFile) {
		options.OutFile = getSubstitutedPathWithConfigDirTemplate(options.OutFile, basePath)
	}
	if startsWithConfigDirTemplate(options.OutDir) {
		options.OutDir = getSubstitutedPathWithConfigDirTemplate(options.OutDir, basePath)
	}
	if startsWithConfigDirTemplate(options.RootDir) {
		options.RootDir = getSubstitutedPathWithConfigDirTemplate(options.RootDir, basePath)
	}
	if startsWithConfigDirTemplate(options.TsBuildInfoFile) {
		options.TsBuildInfoFile = getSubstitutedPathWithConfigDirTemplate(options.TsBuildInfoFile, basePath)
	}
	if startsWithConfigDirTemplate(options.BaseUrl) {
		options.BaseUrl = getSubstitutedPathWithConfigDirTemplate(options.BaseUrl, basePath)
	}
	if startsWithConfigDirTemplate(options.DeclarationDir) {
		options.DeclarationDir = getSubstitutedPathWithConfigDirTemplate(options.DeclarationDir, basePath)
	}
}

// hasFileWithHigherPriorityExtension determines whether a literal or wildcard file has already been included that has a higher extension priority.
// file is the path to the file.
func hasFileWithHigherPriorityExtension(file string, literalFiles collections.OrderedMap[string, string], wildcardFiles collections.OrderedMap[string, string], extensions [][]string, keyMapper func(value string) string) bool {
	var extensionGroup []string
	for _, group := range extensions {
		if tspath.FileExtensionIsOneOf(file, group) {
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
		if tspath.FileExtensionIs(file, ext) && (ext != tspath.ExtensionTs || !tspath.FileExtensionIs(file, tspath.ExtensionDts)) {
			return false
		}
		higherPriorityPath := keyMapper(tspath.ChangeExtension(file, ext))
		if literalFiles.Has(higherPriorityPath) || wildcardFiles.Has(higherPriorityPath) {
			if ext == tspath.ExtensionDts && (tspath.FileExtensionIs(file, tspath.ExtensionJs) || tspath.FileExtensionIs(file, tspath.ExtensionJsx)) {
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
func removeWildcardFilesWithLowerPriorityExtension(file string, wildcardFiles collections.OrderedMap[string, string], extensions [][]string, keyMapper func(value string) string) {
	var extensionGroup []string
	for _, group := range extensions {
		if tspath.FileExtensionIsOneOf(file, group) {
			extensionGroup = append(extensionGroup, group...)
		}
	}
	if extensionGroup == nil {
		return
	}
	for i := len(extensionGroup) - 1; i >= 0; i-- {
		ext := extensionGroup[i]
		if tspath.FileExtensionIs(file, ext) {
			return
		}
		lowerPriorityPath := keyMapper(tspath.ChangeExtension(file, ext))
		wildcardFiles.Delete(lowerPriorityPath)
	}
}

// getFileNamesFromConfigSpecs gets the file names from the provided config file specs that contain, files, include, exclude and
// other properties needed to resolve the file names
// configFileSpecs is the config file specs extracted with file names to include, wildcards to include/exclude and other details
// basePath is the base path for any relative file specifications.
// options is the Compiler options.
// host is the host used to resolve files and directories.
// extraFileExtensions optionally file extra file extension information from host
func getFileNamesFromConfigSpecs(
	configFileSpecs configFileSpecs,
	basePath string, // considering this is the current directory
	options *core.CompilerOptions,
	host vfs.FS,
	extraFileExtensions []fileExtensionInfo,
) []string {
	extraFileExtensions = []fileExtensionInfo{}
	basePath = tspath.NormalizePath(basePath)
	keyMappper := func(value string) string { return tspath.GetCanonicalFileName(value, host.UseCaseSensitiveFileNames()) }
	// Literal file names (provided via the "files" array in tsconfig.json) are stored in a
	// file map with a possibly case insensitive key. We use this map later when when including
	// wildcard paths.
	var literalFileMap collections.OrderedMap[string, string]
	// Wildcard paths (provided via the "includes" array in tsconfig.json) are stored in a
	// file map with a possibly case insensitive key. We use this map to store paths matched
	// via wildcard, and to handle extension priority.
	var wildcardFileMap collections.OrderedMap[string, string]
	// Wildcard paths of json files (provided via the "includes" array in tsconfig.json) are stored in a
	// file map with a possibly case insensitive key. We use this map to store paths matched
	// via wildcard of *.json kind
	var wildCardJsonFileMap collections.OrderedMap[string, string]
	validatedFilesSpec := configFileSpecs.validatedFilesSpec
	validatedIncludeSpecs := configFileSpecs.validatedIncludeSpecs
	validatedExcludeSpecs := configFileSpecs.validatedExcludeSpecs
	// Rather than re-query this for each file and filespec, we query the supported extensions
	// once and store it on the expansion context.
	supportedExtensions := GetSupportedExtensions(options, extraFileExtensions)
	supportedExtensionsWithJsonIfResolveJsonModule := GetSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions)
	// Literal files are always included verbatim. An "include" or "exclude" specification cannot
	// remove a literal file.
	for _, fileName := range validatedFilesSpec {
		file := tspath.GetNormalizedAbsolutePath(fileName, basePath)
		literalFileMap.Set(keyMappper(fileName), file)
	}

	var jsonOnlyIncludeRegexes []*regexp2.Regexp
	if len(validatedIncludeSpecs) > 0 {
		files := readDirectory(host, basePath, basePath, core.Flatten(supportedExtensionsWithJsonIfResolveJsonModule), validatedExcludeSpecs, validatedIncludeSpecs, nil)
		for _, file := range files {
			if tspath.FileExtensionIs(file, tspath.ExtensionJson) {
				if jsonOnlyIncludeRegexes == nil {
					includes := core.Filter(validatedIncludeSpecs, func(include string) bool { return strings.HasSuffix(include, tspath.ExtensionJson) })
					includeFilePatterns := core.Map(getRegularExpressionsForWildcards(includes, basePath, "files"), func(pattern string) string { return fmt.Sprintf("^%s$", pattern) })
					if includeFilePatterns != nil {
						jsonOnlyIncludeRegexes = core.Map(includeFilePatterns, func(pattern string) *regexp2.Regexp {
							return getRegexFromPattern(pattern, host.UseCaseSensitiveFileNames())
						})
					} else {
						jsonOnlyIncludeRegexes = nil
					}
				}
				includeIndex := core.FindIndex(jsonOnlyIncludeRegexes, func(re *regexp2.Regexp) bool { return core.Must(re.MatchString(file)) })
				if includeIndex != -1 {
					key := keyMappper(file)
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
			if hasFileWithHigherPriorityExtension(file, literalFileMap, wildcardFileMap, supportedExtensions, keyMappper) {
				continue
			}
			// We may have included a wildcard path with a lower priority
			// extension due to the user-defined order of entries in the
			// "include" array. If there is a lower priority extension in the
			// same directory, we should remove it.
			removeWildcardFilesWithLowerPriorityExtension(file, wildcardFileMap, supportedExtensions, keyMappper)
			key := keyMappper(file)
			if !literalFileMap.Has(key) && !wildcardFileMap.Has(key) {
				wildcardFileMap.Set(key, file)
			}
		}
	}
	files := make([]string, 0, literalFileMap.Size()+wildcardFileMap.Size()+wildCardJsonFileMap.Size())
	for file := range literalFileMap.Values() {
		files = append(files, file)
	}
	for file := range wildcardFileMap.Values() {
		files = append(files, file)
	}
	for file := range wildCardJsonFileMap.Values() {
		files = append(files, file)
	}
	return files
}

func GetSupportedExtensions(options *core.CompilerOptions, extraFileExtensions []fileExtensionInfo) [][]string {
	needJsExtensions := options.GetAllowJs()
	if len(extraFileExtensions) == 0 {
		if needJsExtensions {
			return tspath.AllSupportedExtensions
		} else {
			return tspath.SupportedTSExtensions
		}
	}
	var builtins [][]string
	if needJsExtensions {
		builtins = tspath.AllSupportedExtensions
	} else {
		builtins = tspath.SupportedTSExtensions
	}
	flatBuiltins := core.Flatten(builtins)
	var result [][]string
	for _, x := range extraFileExtensions {
		if x.scriptKind == core.ScriptKindDeferred || (needJsExtensions && (x.scriptKind == core.ScriptKindJS || x.scriptKind == core.ScriptKindJSX)) && !slices.Contains(flatBuiltins, x.extension) {
			result = append(result, []string{x.extension})
		}
	}
	extensions := slices.Concat(builtins, result)
	return extensions
}

func GetSupportedExtensionsWithJsonIfResolveJsonModule(options *core.CompilerOptions, supportedExtensions [][]string) [][]string {
	if options == nil || !options.GetResolveJsonModule() {
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

package tsoptions

import (
	"reflect"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func ParseTristate(value any) core.Tristate {
	if value == nil {
		return core.TSUnknown
	}
	if v, ok := value.(core.Tristate); ok {
		return v
	}
	if value == true {
		return core.TSTrue
	} else {
		return core.TSFalse
	}
}

func ParseStringArray(value any) []string {
	if arr, ok := value.([]any); ok {
		if arr == nil {
			return nil
		}
		result := make([]string, 0, len(arr))
		for _, v := range arr {
			if str, ok := v.(string); ok {
				result = append(result, str)
			}
		}
		return result
	}
	return nil
}

func parseStringMap(value any) *collections.OrderedMap[string, []string] {
	if m, ok := value.(*collections.OrderedMap[string, any]); ok {
		result := collections.NewOrderedMapWithSizeHint[string, []string](m.Size())
		for k, v := range m.Entries() {
			result.Set(k, ParseStringArray(v))
		}
		return result
	}
	return nil
}

func ParseString(value any) string {
	if str, ok := value.(string); ok {
		return str
	}
	return ""
}

func parseNumber(value any) *int {
	if num, ok := value.(int); ok {
		return &num
	}
	if num, ok := value.(float64); ok {
		n := int(num)
		return &n
	}
	return nil
}

type projectReferenceParseResult struct {
	reference     core.ProjectReference
	hasPath       bool
	pathValid     bool
	hasCircular   bool
	circularValid bool
}

func parseProjectReference(json any) *projectReferenceParseResult {
	if v, ok := json.(*collections.OrderedMap[string, any]); ok {
		result := &projectReferenceParseResult{}
		if value, ok := v.Get("path"); ok {
			result.hasPath = true
			if path, ok := value.(string); ok {
				result.reference.Path = path
				result.pathValid = true
			}
		}
		if value, ok := v.Get("circular"); ok {
			result.hasCircular = true
			if circular, ok := value.(bool); ok {
				result.reference.Circular = circular
				result.circularValid = true
			}
		}
		return result
	}
	return nil
}

func parseContentMapper(value any) (*contentmapper.Mapper, []*ast.Diagnostic) {
	v, ok := value.(*collections.OrderedMap[string, any])
	if !ok {
		return nil, nil
	}
	var errors []*ast.Diagnostic
	mapper := &contentmapper.Mapper{}
	if pkg, ok := v.Get("package"); ok {
		if str, isString := pkg.(string); isString && str != "" {
			mapper.Package = str
		} else {
			errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Compiler_option_0_requires_a_value_of_type_1, "contentMapper.package", "string"))
		}
	} else {
		errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Compiler_option_0_requires_a_value_of_type_1, "contentMapper.package", "string"))
	}
	if extensions, ok := v.Get("extensions"); ok {
		if strs, isStringArray := parseStringArrayStrict(extensions); isStringArray {
			mapper.Definition.Extensions = strs
		} else {
			errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Compiler_option_0_requires_a_value_of_type_1, "contentMapper.extensions", "string[]"))
		}
	} else {
		errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Compiler_option_0_requires_a_value_of_type_1, "contentMapper.extensions", "string[]"))
	}
	if options, ok := v.Get("options"); ok {
		if _, isObject := options.(*collections.OrderedMap[string, any]); !isObject {
			errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Compiler_option_0_requires_a_value_of_type_1, "contentMapper.options", "object"))
		} else {
			mapper.Options, _ = json.Marshal(options)
		}
	}
	if len(errors) != 0 {
		return nil, errors
	}
	return mapper, errors
}

// parseStringArrayStrict returns the string slice and true only if value is an array whose
// elements are all strings. A missing element or wrong element type yields false.
func parseStringArrayStrict(value any) ([]string, bool) {
	arr, ok := value.([]any)
	if !ok {
		return nil, false
	}
	result := make([]string, 0, len(arr))
	for _, v := range arr {
		str, ok := v.(string)
		if !ok {
			return nil, false
		}
		result = append(result, str)
	}
	return result, true
}

func parseJsonToStringKey(json any) *collections.OrderedMap[string, any] {
	result := collections.NewOrderedMapWithSizeHint[string, any](6)
	if m, ok := json.(*collections.OrderedMap[string, any]); ok {
		if v, ok := m.Get("include"); ok {
			result.Set("include", v)
		}
		if v, ok := m.Get("exclude"); ok {
			result.Set("exclude", v)
		}
		if v, ok := m.Get("files"); ok {
			result.Set("files", v)
		}
		if v, ok := m.Get("references"); ok {
			result.Set("references", v)
		}
		if v, ok := m.Get("contentMappers"); ok {
			result.Set("contentMappers", v)
		}
		if v, ok := m.Get("extends"); ok {
			if str, ok := v.(string); ok {
				result.Set("extends", []any{str})
			}
			result.Set("extends", v)
		}
		if v, ok := m.Get("compilerOptions"); ok {
			result.Set("compilerOptions", v)
		}
		if v, ok := m.Get("excludes"); ok {
			result.Set("excludes", v)
		}
		if v, ok := m.Get("typeAcquisition"); ok {
			result.Set("typeAcquisition", v)
		}
	}
	return result
}

type optionParser interface {
	ParseOption(key string, value any) []*ast.Diagnostic
	UnknownOptionDiagnostic() *diagnostics.Message
	UnknownDidYouMeanDiagnostic() *diagnostics.Message
}

type compilerOptionsParser struct {
	*core.CompilerOptions
}

func (o *compilerOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseCompilerOptions(key, value, o.CompilerOptions)
}

func (o *compilerOptionsParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return extraKeyDiagnostics("compilerOptions")
}

func (o *compilerOptionsParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
	return extraKeyDidYouMeanDiagnostics("compilerOptions")
}

type watchOptionsParser struct {
	*core.WatchOptions
}

func (o *watchOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseWatchOptions(key, value, o.WatchOptions)
}

func (o *watchOptionsParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return extraKeyDiagnostics("watchOptions")
}

func (o *watchOptionsParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
	return extraKeyDidYouMeanDiagnostics("watchOptions")
}

type typeAcquisitionParser struct {
	*core.TypeAcquisition
}

func (o *typeAcquisitionParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseTypeAcquisition(key, value, o.TypeAcquisition)
}

func (o *typeAcquisitionParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return extraKeyDiagnostics("typeAcquisition")
}

func (o *typeAcquisitionParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
	return extraKeyDidYouMeanDiagnostics("typeAcquisition")
}

type buildOptionsParser struct {
	*core.BuildOptions
}

func (o *buildOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseBuildOptions(key, value, o.BuildOptions)
}

func (o *buildOptionsParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return extraKeyDiagnostics("buildOptions")
}

func (o *buildOptionsParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
	return extraKeyDidYouMeanDiagnostics("buildOptions")
}

func ParseCompilerOptions(key string, value any, allOptions *core.CompilerOptions) []*ast.Diagnostic {
	if value == nil {
		return nil
	}
	if allOptions == nil {
		return nil
	}
	parseCompilerOptions(key, value, allOptions)
	return nil
}

func floatOrInt32ToFlag[T ~int32](value any) T {
	if v, ok := value.(T); ok {
		return v
	}
	return T(value.(float64))
}

// mergeCompilerOptions merges the source compiler options into the target compiler options
// with optional awareness of explicitly set null values in the raw JSON.
// Fields in the source options will overwrite the corresponding fields in the target options,
// including when they are explicitly set to null in the raw configuration (if rawSource is provided).
func mergeCompilerOptions(targetOptions, sourceOptions *core.CompilerOptions, rawSource any) *core.CompilerOptions {
	if sourceOptions == nil {
		return targetOptions
	}

	// Collect explicitly null field names from raw JSON
	var explicitNullFields collections.Set[string]
	if rawSource != nil {
		if rawMap, ok := rawSource.(*collections.OrderedMap[string, any]); ok && rawMap != nil {
			// Options are nested under "compilerOptions" in both tsconfig.json and wrapped command line options
			if compilerOptionsRaw, exists := rawMap.Get("compilerOptions"); exists {
				if compilerOptionsMap, ok := compilerOptionsRaw.(*collections.OrderedMap[string, any]); ok {
					for key, value := range compilerOptionsMap.Entries() {
						if value == nil {
							explicitNullFields.Add(key)
						}
					}
				}
			}
		}
	}

	// Do the merge, handling explicit nulls during the normal merge
	targetValue := reflect.ValueOf(targetOptions).Elem()
	sourceValue := reflect.ValueOf(sourceOptions).Elem()
	targetType := targetValue.Type()

	for i := range targetValue.NumField() {
		targetField := targetValue.Field(i)
		sourceField := sourceValue.Field(i)

		// Get the JSON field name for this struct field and check if it's explicitly null
		if jsonTag := targetType.Field(i).Tag.Get("json"); jsonTag != "" {
			if jsonFieldName, _, _ := strings.Cut(jsonTag, ","); jsonFieldName != "" && explicitNullFields.Has(jsonFieldName) {
				targetField.SetZero()
				continue
			}
		}

		// Normal merge behavior: copy non-zero fields
		if !sourceField.IsZero() {
			targetField.Set(sourceField)
		}
	}

	return targetOptions
}

func convertToOptionsWithAbsolutePaths(optionsBase *collections.OrderedMap[string, any], optionMap CommandLineOptionNameMap, cwd string) *collections.OrderedMap[string, any] {
	// !!! convert to options with absolute paths was previously done with `CompilerOptions` object, but for ease of implementation, we do it pre-conversion.
	// !!! Revisit this choice if/when refactoring when conversion is done in tsconfig parsing
	if optionsBase == nil {
		return nil
	}
	for o, v := range optionsBase.Entries() {
		result, ok := ConvertOptionToAbsolutePath(o, v, optionMap, cwd)
		if ok {
			optionsBase.Set(o, result)
		}
	}
	return optionsBase
}

func ConvertOptionToAbsolutePath(o string, v any, optionMap CommandLineOptionNameMap, cwd string) (any, bool) {
	option := optionMap.Get(o)
	if option == nil {
		return nil, false
	}
	if option.Kind == "list" {
		if option.Elements().IsFilePath {
			if arr, ok := v.([]string); ok {
				return core.Map(arr, func(item string) string {
					return tspath.GetNormalizedAbsolutePath(item, cwd)
				}), true
			}
			if arr, ok := v.([]any); ok {
				return core.Map(arr, func(item any) any {
					if s, isStr := item.(string); isStr {
						return tspath.GetNormalizedAbsolutePath(s, cwd)
					}
					return item
				}), true
			}
		}
	} else if option.IsFilePath {
		if value, ok := v.(string); ok {
			return tspath.GetNormalizedAbsolutePath(value, cwd), true
		}
	}
	return nil, false
}

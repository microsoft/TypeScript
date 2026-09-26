package tsoptions

import (
	"reflect"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// Preserve the reflection-based serializer as an independent check of generated serialization.
func reflectedSerializeCompilerOptions(options *core.CompilerOptions, configFilePath string, comparePathsOptions tspath.ComparePathsOptions) *collections.OrderedMap[string, any] {
	result := collections.NewOrderedMapWithSizeHint[string, any](32)
	configDir := tspath.GetDirectoryPath(configFilePath)
	optionsValue := reflect.ValueOf(options).Elem()
	for i := range optionsValue.NumField() {
		field := optionsValue.Type().Field(i)
		if !field.IsExported() {
			continue
		}
		option := CommandLineCompilerOptionsMap.Get(field.Name)
		if option == nil || option.Category == diagnostics.Command_line_Options || option.Category == diagnostics.Output_Formatting {
			continue
		}
		fieldValue := optionsValue.Field(i)
		if fieldValue.IsZero() {
			continue
		}
		value := fieldValue.Interface()
		if enumMap := option.EnumMap(); enumMap != nil {
			for key, enumValue := range enumMap.Entries() {
				if reflect.ValueOf(enumValue).Int() == fieldValue.Int() {
					result.Set(option.Name, key)
					break
				}
			}
			continue
		}
		switch option.Kind {
		case CommandLineOptionTypeListOrElement:
			debug.Assert(false, "listOrElement option should not reach serialization")
		case CommandLineOptionTypeList:
			element := option.Elements()
			if values, ok := value.([]string); ok && element != nil {
				if element.IsFilePath {
					relative := make([]string, len(values))
					for j, path := range values {
						absolute := tspath.GetNormalizedAbsolutePath(path, configDir)
						relative[j] = tspath.GetRelativePathFromFile(configFilePath, absolute, comparePathsOptions)
					}
					result.Set(option.Name, relative)
					continue
				}
				if enumMap := element.EnumMap(); enumMap != nil {
					serialized := make([]string, 0, len(values))
					for _, item := range values {
						for key, enumValue := range enumMap.Entries() {
							if enumValue == item {
								item = key
								break
							}
						}
						serialized = append(serialized, item)
					}
					result.Set(option.Name, serialized)
					continue
				}
			}
			result.Set(option.Name, value)
		case CommandLineOptionTypeString:
			if option.IsFilePath {
				value = tspath.GetRelativePathFromFile(configFilePath, tspath.GetNormalizedAbsolutePath(value.(string), configDir), comparePathsOptions)
			}
			result.Set(option.Name, value)
		case CommandLineOptionTypeBoolean:
			tristate := value.(core.Tristate)
			if tristate.IsTrue() {
				result.Set(option.Name, true)
			} else if tristate.IsFalse() {
				result.Set(option.Name, false)
			}
		default:
			result.Set(option.Name, value)
		}
	}
	return result
}

func TestShowConfigSerialization(t *testing.T) {
	t.Parallel()

	comparePaths := tspath.ComparePathsOptions{CurrentDirectory: "/project", UseCaseSensitiveFileNames: true}
	check := func(t *testing.T, options *core.CompilerOptions) {
		t.Helper()
		got := serializeCompilerOptions(options, "/project/tsconfig.json", comparePaths)
		want := reflectedSerializeCompilerOptions(options, "/project/tsconfig.json", comparePaths)
		if !reflect.DeepEqual(got, want) {
			t.Errorf("Serialization differs:\ngot keys: %+v\nwant keys: %+v", slices.Collect(got.Keys()), slices.Collect(want.Keys()))
			for name, expected := range want.Entries() {
				if actual := got.GetOrZero(name); !reflect.DeepEqual(actual, expected) {
					t.Errorf("%s: got %#v, want %#v", name, actual, expected)
				}
			}
		}
	}
	check(t, &core.CompilerOptions{})
	allOptions := &core.CompilerOptions{}
	for field := range reflect.TypeFor[core.CompilerOptions]().Fields() {
		if !field.IsExported() {
			continue
		}
		values := compilerOptionTestValues(t, field)
		if option := CommandLineCompilerOptionsMap.Get(field.Name); option != nil && option.EnumMap() != nil {
			for value := range option.EnumMap().Values() {
				values = append(values, reflect.ValueOf(value))
			}
		}
		switch field.Type.Kind() {
		case reflect.Int32:
			invalid := reflect.New(field.Type).Elem()
			invalid.SetInt(-1)
			values = append(values, invalid)
		case reflect.Uint8:
			values = append(values, reflect.ValueOf(core.Tristate(255)))
		case reflect.String:
			values = append(values, reflect.ValueOf("/project/src"), reflect.ValueOf("../other"), reflect.ValueOf("./local"))
		}
		if field.Type == reflect.TypeFor[[]string]() {
			values = append(values, reflect.ValueOf([]string{"lib.es2015.d.ts", "lib.es2016.d.ts", "unknown", "../types"}))
		}
		reflect.ValueOf(allOptions).Elem().FieldByIndex(field.Index).Set(values[len(values)-1])
		t.Run(field.Name, func(t *testing.T) {
			t.Parallel()
			for _, value := range values {
				options := &core.CompilerOptions{}
				reflect.ValueOf(options).Elem().FieldByIndex(field.Index).Set(value)
				check(t, options)
			}
		})
	}
	check(t, allOptions)
	paths := &collections.OrderedMap[string, []string]{}
	paths.Set("@/*", []string{"./src/*", "../shared/*"})
	paths.Set("empty", []string{})
	check(t, &core.CompilerOptions{
		Paths:                paths,
		Plugins:              []core.PluginImport{{Name: "plugin"}},
		MaxNodeModuleJsDepth: new(0),
	})
}

func TestShowConfigEnumSerialization(t *testing.T) {
	t.Parallel()

	for _, option := range OptionsDeclarations {
		enumMap := option.EnumMap()
		if enumMap == nil {
			continue
		}
		t.Run(option.Name, func(t *testing.T) {
			t.Parallel()
			seen := make(map[any]string)
			for name, value := range enumMap.Entries() {
				if _, ok := seen[value]; !ok {
					seen[value] = name
				}
				if got := serializeCompilerOptionEnum(value); got != seen[value] {
					t.Errorf("%v: got %q, want first alias %q", value, got, seen[value])
				}
			}
		})
	}
}

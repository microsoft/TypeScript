package tsoptions

import (
	"fmt"
	"math"
	"reflect"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestConvertJsonOptionNumericList(t *testing.T) { //nolint:paralleltest // Modifies the element declaration map.
	const name = "testNumericList"
	commandLineOptionElements[name] = &CommandLineOption{Name: name, Kind: CommandLineOptionTypeNumber}
	t.Cleanup(func() { delete(commandLineOptionElements, name) })

	for _, preserve := range []bool{false, true} {
		option := &CommandLineOption{Name: name, Kind: CommandLineOptionTypeList, listPreserveFalsyValues: preserve}
		values := []any{float64(0), float64(1), float64(-1), math.Copysign(0, -1), nil}
		got, errors := convertJsonOptionOfListType(option, values, "/project", nil, nil, nil)
		assert.Equal(t, len(errors), 0)
		expected := []any{float64(1), float64(-1)}
		if preserve {
			expected = values
		}
		assert.DeepEqual(t, got, expected)
	}
}

func TestParseConfigCircularityPreservesRaw(t *testing.T) {
	t.Parallel()
	const fileName tspath.RootedFilePath = "/project/tsconfig.json"
	const path tspath.PathKey = "/project/tsconfig.json"
	fs := vfstest.FromMap(map[string]string{}, tspath.CaseSensitive)
	for _, text := range []string{`{}`, `{"customSetting":true,"files":["index.ts"]}`} {
		for _, fromSource := range []bool{false, true} {
			t.Run(fmt.Sprintf("%s/source=%v", text, fromSource), func(t *testing.T) {
				t.Parallel()
				value, errors := ParseConfigFileTextToJson(fileName, path, text)
				assert.Equal(t, len(errors), 0)
				raw := value.(*collections.OrderedMap[string, any])
				var source *TsConfigSourceFile
				input := raw
				if fromSource {
					input = nil
					source = NewTsconfigSourceFileFromFilePath(fileName, path, text)
				}
				got, errors := parseConfig(input, source, fs, "/project", fileName, []tspath.PathKey{path}, nil)
				assert.Equal(t, len(errors), 1)
				assert.Equal(t, errors[0].Code(), diagnostics.Circularity_detected_while_resolving_configuration_Colon_0.Code())
				assert.DeepEqual(t, errors[0].MessageArgs(), []string{"/project/tsconfig.json -> /project/tsconfig.json"})
				assert.Assert(t, got.raw != nil)
				assert.Assert(t, reflect.DeepEqual(got.raw, raw))
			})
		}
	}
}

func TestMergeCompilerOptions(t *testing.T) {
	t.Parallel()

	if mergeCompilerOptions(nil, nil, nil) != nil {
		t.Fatal("Merging nil options must return nil")
	}
	unchanged := &core.CompilerOptions{Strict: core.TSTrue}
	if mergeCompilerOptions(unchanged, nil, nil) != unchanged || unchanged.Strict != core.TSTrue {
		t.Fatal("A nil source must leave the target unchanged")
	}

	for field := range reflect.TypeFor[core.CompilerOptions]().Fields() {
		if !field.IsExported() {
			continue
		}
		t.Run(field.Name, func(t *testing.T) {
			t.Parallel()
			name, _, _ := strings.Cut(field.Tag.Get("json"), ",")
			nullOptions := &collections.OrderedMap[string, any]{}
			nullOptions.Set(name, nil)
			raw := &collections.OrderedMap[string, any]{}
			raw.Set("compilerOptions", nullOptions)
			values := compilerOptionTestValues(t, field)
			for _, targetValue := range values {
				for _, sourceValue := range values {
					for _, explicitNull := range []bool{false, true} {
						target := &core.CompilerOptions{}
						source := &core.CompilerOptions{}
						reflect.ValueOf(target).Elem().FieldByIndex(field.Index).Set(targetValue)
						reflect.ValueOf(source).Elem().FieldByIndex(field.Index).Set(sourceValue)
						expected := target.Clone()
						expectedField := reflect.ValueOf(expected).Elem().FieldByIndex(field.Index)
						var rawSource any
						if explicitNull {
							rawSource = raw
							expectedField.SetZero()
						} else if !sourceValue.IsZero() {
							expectedField.Set(sourceValue)
						}
						if got := mergeCompilerOptions(target, source, rawSource); got != target || !reflect.DeepEqual(got, expected) {
							t.Fatalf("Merge differs for target=%v, source=%v, explicitNull=%v", targetValue, sourceValue, explicitNull)
						}
						actualField := reflect.ValueOf(target).Elem().FieldByIndex(field.Index)
						if (field.Type.Kind() == reflect.Pointer || field.Type.Kind() == reflect.Slice) && actualField.Pointer() != expectedField.Pointer() {
							t.Fatal("Merge must preserve shallow sharing")
						}
						if !reflect.DeepEqual(reflect.ValueOf(source).Elem().FieldByIndex(field.Index).Interface(), sourceValue.Interface()) {
							t.Fatal("Merge must not modify the source")
						}
					}
				}
			}
		})
	}
}

func TestMergeCompilerOptionsRawNulls(t *testing.T) {
	t.Parallel()

	for _, name := range []string{"moduleDetection", "ModuleDetection", "moduleDetectionKind", "unknownOption"} {
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			rawOptions := &collections.OrderedMap[string, any]{}
			rawOptions.Set(name, nil)
			raw := &collections.OrderedMap[string, any]{}
			raw.Set("compilerOptions", rawOptions)
			target := &core.CompilerOptions{ModuleDetection: core.ModuleDetectionKindForce}
			source := &core.CompilerOptions{ModuleDetection: core.ModuleDetectionKindAuto}
			mergeCompilerOptions(target, source, raw)
			expected := core.ModuleDetectionKindAuto
			if name == "moduleDetection" {
				expected = core.ModuleDetectionKindNone
			}
			if target.ModuleDetection != expected {
				t.Fatalf("Got %v, want %v", target.ModuleDetection, expected)
			}
			mergeCompilerOptions(source, source, raw)
			if source.ModuleDetection != expected {
				t.Fatal("Merging an object with itself must still apply explicit nulls")
			}
		})
	}
}

func TestParseCompilerOptionNoMissingFields(t *testing.T) {
	t.Parallel()
	var missingKeys []string
	for _, field := range reflect.VisibleFields(reflect.TypeFor[core.CompilerOptions]()) {
		if !field.IsExported() {
			continue
		}

		keyName := field.Name
		// use the JSON key from the tag, if present
		// e.g. `json:"dog[,anythingelse]"` --> dog
		if jsonTag, ok := field.Tag.Lookup("json"); ok {
			keyName = strings.SplitN(jsonTag, ",", 2)[0]
		}
		val := reflect.Zero(field.Type).Interface()
		co := core.CompilerOptions{}
		found := parseCompilerOptions(keyName, val, &co)
		if !found {
			missingKeys = append(missingKeys, keyName)
		}
	}
	if len(missingKeys) > 0 {
		t.Errorf("The following keys are missing entries in the ParseCompilerOptions"+
			" switch statement:\n%v", missingKeys)
	}
}

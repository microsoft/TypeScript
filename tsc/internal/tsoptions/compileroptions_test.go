package tsoptions_test

import (
	"reflect"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
)

func TestGeneratedCompilerOptionParsingAndClone(t *testing.T) {
	t.Parallel()

	for field := range reflect.TypeFor[core.CompilerOptions]().Fields() {
		if !field.IsExported() {
			continue
		}
		name, _, _ := strings.Cut(field.Tag.Get("json"), ",")
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			options := &core.CompilerOptions{}
			optionsValue := reflect.ValueOf(options).Elem()
			var input any
			var expected any
			switch field.Type {
			case reflect.TypeFor[core.Tristate]():
				input, expected = true, core.TSTrue
			case reflect.TypeFor[string]():
				input, expected = "value", "value"
			case reflect.TypeFor[*int]():
				input, expected = float64(2), new(2)
			case reflect.TypeFor[[]string]():
				input, expected = []any{"first", "second"}, []string{"first", "second"}
			case reflect.TypeFor[[]core.PluginImport]():
				plugin := &collections.OrderedMap[string, any]{}
				plugin.Set("name", "plugin")
				input, expected = []any{plugin}, []core.PluginImport{{Name: "plugin"}}
			case reflect.TypeFor[*collections.OrderedMap[string, []string]]():
				paths := &collections.OrderedMap[string, any]{}
				paths.Set("@/*", []any{"src/*"})
				expectedPaths := &collections.OrderedMap[string, []string]{}
				expectedPaths.Set("@/*", []string{"src/*"})
				input, expected = paths, expectedPaths
			default:
				if field.Type.Kind() != reflect.Int32 {
					t.Fatalf("Unhandled compiler option type: %v", field.Type)
				}
				value := reflect.New(field.Type).Elem()
				value.SetInt(1)
				input, expected = value.Interface(), value.Interface()
			}
			if errors := tsoptions.ParseCompilerOptions(name, input, options); len(errors) != 0 {
				t.Fatalf("Parsing %s: %v", name, errors)
			}
			actual := optionsValue.FieldByIndex(field.Index).Interface()
			if !reflect.DeepEqual(actual, expected) {
				t.Errorf("%s: got %#v, want %#v", name, actual, expected)
			}
			if field.Type.Kind() == reflect.Int32 {
				numeric := &core.CompilerOptions{}
				tsoptions.ParseCompilerOptions(name, float64(1), numeric)
				actual := reflect.ValueOf(numeric).Elem().FieldByIndex(field.Index).Interface()
				if !reflect.DeepEqual(actual, expected) {
					t.Errorf("%s as a JSON number: got %#v, want %#v", name, actual, expected)
				}
			}
			clone := options.Clone()
			if clone == options || !reflect.DeepEqual(clone, options) {
				t.Fatal("Clone must return a distinct object with every field copied")
			}
			clonedValue := reflect.ValueOf(clone).Elem().FieldByIndex(field.Index)
			sourceValue := optionsValue.FieldByIndex(field.Index)
			if (field.Type.Kind() == reflect.Pointer || field.Type.Kind() == reflect.Slice) && clonedValue.Pointer() != sourceValue.Pointer() {
				t.Fatal("Clone must remain shallow")
			}
		})
	}

	if !reflect.DeepEqual((&core.CompilerOptions{}).Clone(), &core.CompilerOptions{}) {
		t.Fatal("Clone must preserve zero values")
	}
}

func TestGeneratedCompilerOptionParserCompatibility(t *testing.T) {
	t.Parallel()

	options := &core.CompilerOptions{}
	tsoptions.ParseCompilerOptions("STRICT", true, options)
	tsoptions.ParseCompilerOptions("moduleDetectionKind", core.ModuleDetectionKindForce, options)
	tsoptions.ParseCompilerOptions("lib", []string{"lib.es2025.d.ts"}, options)
	tsoptions.ParseCompilerOptions("strict", nil, options)
	if options.Strict != core.TSTrue || options.ModuleDetection != core.ModuleDetectionKindForce || !reflect.DeepEqual(options.Lib, []string{"lib.es2025.d.ts"}) {
		t.Fatal("Parser did not preserve aliases, typed lib values, or null handling")
	}
	before := options.Clone()
	tsoptions.ParseCompilerOptions("unknownOption", true, options)
	if !reflect.DeepEqual(options, before) {
		t.Fatal("Unknown options must not change parsed options")
	}
}

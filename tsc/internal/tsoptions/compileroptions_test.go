package tsoptions

import (
	"reflect"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

func TestOptionEnumStrings(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		value interface{ String() string }
		want  string
	}{
		{core.ModuleResolutionKindClassic, "Classic"},
		{core.ModuleResolutionKindNode10, "Node10"},
		{core.ModuleResolutionKindNode16, "Node16"},
		{core.ModuleResolutionKindNodeNext, "NodeNext"},
		{core.ModuleResolutionKindBundler, "Bundler"},
		{core.JsxEmitPreserve, "preserve"},
		{core.JsxEmitReactNative, "react-native"},
		{core.JsxEmitReact, "react"},
		{core.JsxEmitReactJSX, "react-jsx"},
		{core.JsxEmitReactJSXDev, "react-jsxdev"},
	} {
		if got := test.value.String(); got != test.want {
			t.Errorf("got %q, want %q", got, test.want)
		}
	}
	for _, test := range []struct {
		value interface{ String() string }
		want  string
	}{
		{core.ModuleResolutionKindUnknown, "should not use zero value of ModuleResolutionKind"},
		{core.ModuleResolutionKind(-1), "unhandled case in ModuleResolutionKind.String"},
		{core.ModuleResolutionKind(4), "unhandled case in ModuleResolutionKind.String"},
		{core.JsxEmitNone, "should not use zero value of JsxEmit"},
		{core.JsxEmit(-1), "unhandled case in JsxEmit.String"},
		{core.JsxEmit(6), "unhandled case in JsxEmit.String"},
	} {
		func() {
			defer func() {
				if got := recover(); got != test.want {
					t.Errorf("got panic %v, want %q", got, test.want)
				}
			}()
			_ = test.value.String()
		}()
	}
}

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
			switch {
			case field.Type == reflect.TypeFor[core.Tristate]():
				input, expected = true, core.TSTrue
			case field.Type.Kind() == reflect.String:
				input = "/value"
				expected = reflect.ValueOf(input).Convert(field.Type).Interface()
			case field.Type == reflect.TypeFor[*int]():
				input, expected = float64(2), new(2)
			case field.Type.Kind() == reflect.Slice && field.Type.Elem().Kind() == reflect.String:
				input = []any{"/first", "/second"}
				value := reflect.MakeSlice(field.Type, 2, 2)
				value.Index(0).Set(reflect.ValueOf("/first").Convert(field.Type.Elem()))
				value.Index(1).Set(reflect.ValueOf("/second").Convert(field.Type.Elem()))
				expected = value.Interface()
			case field.Type == reflect.TypeFor[[]core.PluginImport]():
				plugin := &collections.OrderedMap[string, any]{}
				plugin.Set("name", "plugin")
				input, expected = []any{plugin}, []core.PluginImport{{Name: "plugin"}}
			case field.Type == reflect.TypeFor[*collections.OrderedMap[string, []string]]():
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
			ParseCompilerOptions(name, input, options)
			actual := optionsValue.FieldByIndex(field.Index).Interface()
			if !reflect.DeepEqual(actual, expected) {
				t.Errorf("%s: got %#v, want %#v", name, actual, expected)
			}
			if field.Type.Kind() == reflect.Int32 {
				numeric := &core.CompilerOptions{}
				ParseCompilerOptions(name, float64(1), numeric)
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
	ParseCompilerOptions("STRICT", true, options)
	ParseCompilerOptions("moduleDetectionKind", core.ModuleDetectionKindForce, options)
	ParseCompilerOptions("lib", []string{"lib.es2025.d.ts"}, options)
	ParseCompilerOptions("strict", nil, options)
	if options.Strict != core.TSTrue || options.ModuleDetection != core.ModuleDetectionKindForce || !reflect.DeepEqual(options.Lib, []string{"lib.es2025.d.ts"}) {
		t.Fatal("Parser did not preserve aliases, typed lib values, or null handling")
	}
	before := options.Clone()
	ParseCompilerOptions("unknownOption", true, options)
	if !reflect.DeepEqual(options, before) {
		t.Fatal("Unknown options must not change parsed options")
	}
}

func TestCompilerOptionsEquality(t *testing.T) {
	t.Parallel()

	check := func(t *testing.T, a, b *core.CompilerOptions) {
		t.Helper()
		want := reflect.DeepEqual(a, b)
		if a != nil && b != nil {
			type pathEntry struct {
				key   string
				value []string
			}
			entries := func(paths *collections.OrderedMap[string, []string]) []pathEntry {
				var result []pathEntry
				for key, value := range paths.Entries() {
					result = append(result, pathEntry{key, value})
				}
				return result
			}
			// Compare observable paths contents, not allocation details of the ordered map.
			pathsEqual := (a.Paths == nil) == (b.Paths == nil) && reflect.DeepEqual(entries(a.Paths), entries(b.Paths))
			aFields, bFields := a.Clone(), b.Clone()
			aFields.Paths, bFields.Paths = nil, nil
			want = pathsEqual && reflect.DeepEqual(aFields, bFields)
		}
		if got := a.Equals(b); got != want {
			t.Fatalf("Got %v, want %v for\n%+v\n%+v", got, want, a, b)
		}
	}
	check(t, nil, nil)
	check(t, nil, &core.CompilerOptions{})
	check(t, &core.CompilerOptions{}, nil)
	check(t, &core.CompilerOptions{}, &core.CompilerOptions{})
	check(t, &core.CompilerOptions{}, &core.CompilerOptions{Strict: core.TSTrue})

	allOptions := &core.CompilerOptions{}
	for field := range reflect.TypeFor[core.CompilerOptions]().Fields() {
		if !field.IsExported() {
			continue
		}
		values := compilerOptionTestValues(t, field)
		switch field.Type {
		case reflect.TypeFor[*int]():
			values = append(values, reflect.ValueOf(new(1)), reflect.ValueOf(new(1)), reflect.ValueOf(new(2)))
		case reflect.TypeFor[[]string]():
			values = append(values, reflect.ValueOf([]string{"a", "b"}), reflect.ValueOf([]string{"a", "b"}), reflect.ValueOf([]string{"b", "a"}))
		case reflect.TypeFor[[]core.PluginImport]():
			values = append(values, reflect.ValueOf([]core.PluginImport{{Name: "a"}}), reflect.ValueOf([]core.PluginImport{{Name: "a"}}), reflect.ValueOf([]core.PluginImport{{Name: "b"}}))
		}
		reflect.ValueOf(allOptions).Elem().FieldByIndex(field.Index).Set(values[len(values)-1])
		t.Run(field.Name, func(t *testing.T) {
			t.Parallel()
			for _, aValue := range values {
				for _, bValue := range values {
					a, b := &core.CompilerOptions{}, &core.CompilerOptions{}
					reflect.ValueOf(a).Elem().FieldByIndex(field.Index).Set(aValue)
					reflect.ValueOf(b).Elem().FieldByIndex(field.Index).Set(bValue)
					check(t, a, b)
					check(t, a, a)
					check(t, a, a.Clone())
				}
			}
		})
	}
	check(t, allOptions, allOptions.Clone())
	check(t, allOptions, &core.CompilerOptions{})

	paths := []*collections.OrderedMap[string, []string]{
		nil,
		{},
		collections.NewOrderedMapWithSizeHint[string, []string](0),
	}
	for _, values := range [][]string{nil, {}, {"a"}, {"b"}, {"a", "b"}, {"b", "a"}} {
		for _, keys := range [][]string{{"x", "y"}, {"y", "x"}} {
			m := &collections.OrderedMap[string, []string]{}
			for _, key := range keys {
				m.Set(key, values)
			}
			paths = append(paths, m, m.Clone())
		}
	}
	cleared := paths[len(paths)-1].Clone()
	cleared.Clear()
	paths = append(paths, cleared)
	for _, a := range paths {
		for _, b := range paths {
			check(t, &core.CompilerOptions{Paths: a}, &core.CompilerOptions{Paths: b})
		}
	}
}

func compilerOptionTestValues(t *testing.T, field reflect.StructField) []reflect.Value {
	t.Helper()
	values := []reflect.Value{reflect.Zero(field.Type)}
	for _, n := range []int64{1, 2} {
		value := reflect.New(field.Type).Elem()
		switch field.Type.Kind() {
		case reflect.Int32:
			value.SetInt(n)
		case reflect.Uint8:
			value.SetUint(uint64(n))
		case reflect.String:
			value.SetString(string(rune('a' + n)))
		case reflect.Pointer:
			value.Set(reflect.New(field.Type.Elem()))
		case reflect.Slice:
			value.Set(reflect.MakeSlice(field.Type, int(n)-1, int(n)-1))
		default:
			t.Fatalf("Unhandled compiler option type: %v", field.Type)
		}
		values = append(values, value)
	}
	return values
}

func TestCompilerOptionConfigDirSubstitution(t *testing.T) {
	t.Parallel()

	handleOptionConfigDirTemplateSubstitution(nil, "/config")
	tests := []struct {
		option string
		field  string
	}{
		{option: "generateCpuProfile", field: "GenerateCpuProfile"},
		{option: "generateTrace", field: "GenerateTrace"},
		{option: "outFile", field: "OutFile"},
		{option: "outDir", field: "OutDir"},
		{option: "rootDir", field: "RootDir"},
		{option: "tsBuildInfoFile", field: "TsBuildInfoFile"},
		{option: "baseUrl", field: "BaseUrl"},
		{option: "declarationDir", field: "DeclarationDir"},
	}
	for _, test := range tests {
		t.Run(test.field, func(t *testing.T) {
			t.Parallel()
			options := &parsedCompilerOptions{
				CompilerOptions: &core.CompilerOptions{},
				unresolvedPaths: unresolvedCompilerOptionPaths{test.option: "${configDir}/output"},
			}
			handleOptionConfigDirTemplateSubstitution(options, "/config")
			actual, ok := PathValueAsString(reflect.ValueOf(options.CompilerOptions).Elem().FieldByName(test.field).Interface())
			if !ok || actual != "/config/output" {
				t.Fatalf("Got %q, want %q", actual, "/config/output")
			}
		})
	}
}

func TestCompilerOptionConfigDirSubstitutionCopyOnWrite(t *testing.T) {
	t.Parallel()

	for _, fieldName := range []string{"RootDirs", "TypeRoots"} {
		t.Run(fieldName, func(t *testing.T) {
			t.Parallel()
			optionName := "rootDirs"
			if fieldName == "TypeRoots" {
				optionName = "typeRoots"
			}
			options := &parsedCompilerOptions{
				CompilerOptions: &core.CompilerOptions{},
				unresolvedPaths: unresolvedCompilerOptionPaths{optionName: []any{"${configDir}/types", "unchanged"}},
			}
			handleOptionConfigDirTemplateSubstitution(options, "/config")
			values, ok := PathValuesAsStrings(reflect.ValueOf(options.CompilerOptions).Elem().FieldByName(fieldName).Interface())
			if !ok || !slices.Equal(values, []string{"/config/types", "/config/unchanged"}) {
				t.Fatalf("Got %v, want substituted paths", values)
			}
		})
	}

	original := &collections.OrderedMap[string, []string]{}
	unchanged := []string{"unchanged"}
	changed := []string{"${configDir}/src", "other"}
	original.Set("unchanged", unchanged)
	original.Set("changed", changed)
	options := &parsedCompilerOptions{CompilerOptions: &core.CompilerOptions{Paths: original}}
	handleOptionConfigDirTemplateSubstitution(options, "/config")
	if options.Paths == original || !slices.Equal(options.Paths.GetOrZero("changed"), []string{"/config/src", "other"}) {
		t.Fatal("Substitution must clone paths before changing them")
	}
	if changed[0] != "${configDir}/src" || &options.Paths.GetOrZero("unchanged")[0] != &unchanged[0] {
		t.Fatal("Substitution must preserve the original map and unchanged slices")
	}
	if !slices.Equal(slices.Collect(options.Paths.Keys()), []string{"unchanged", "changed"}) {
		t.Fatal("Substitution must preserve paths ordering")
	}
	substituted := options.Paths
	handleOptionConfigDirTemplateSubstitution(options, "/config")
	if options.Paths != substituted {
		t.Fatal("Unchanged paths must retain their identity")
	}
}

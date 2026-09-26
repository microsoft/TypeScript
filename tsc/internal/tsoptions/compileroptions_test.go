package tsoptions

import (
	"reflect"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
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
			if errors := ParseCompilerOptions(name, input, options); len(errors) != 0 {
				t.Fatalf("Parsing %s: %v", name, errors)
			}
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

// Keep the reflection-based implementation as an independent check of the generated code.
func forEachReflectedCompilerOptionValue(options *core.CompilerOptions, declFilter func(*CommandLineOption) bool, fn func(option *CommandLineOption, value reflect.Value, i int) bool) bool {
	optionsValue := reflect.ValueOf(options).Elem()
	optionsType := reflect.TypeFor[core.CompilerOptions]()
	for i := range optionsValue.NumField() {
		field := optionsType.Field(i)
		if !field.IsExported() {
			continue
		}
		if optionDeclaration := CommandLineCompilerOptionsMap.Get(field.Name); optionDeclaration != nil && declFilter(optionDeclaration) {
			if fn(optionDeclaration, optionsValue.Field(i), i) {
				return true
			}
		}
	}
	return false
}

func reflectedOptionsHaveChanges(oldOptions *core.CompilerOptions, newOptions *core.CompilerOptions, declFilter func(*CommandLineOption) bool) bool {
	if oldOptions == newOptions {
		return false
	}
	if oldOptions == nil || newOptions == nil {
		return true
	}
	oldOptionsValue := reflect.ValueOf(oldOptions).Elem()
	return forEachReflectedCompilerOptionValue(newOptions, declFilter, func(option *CommandLineOption, value reflect.Value, i int) bool {
		newValue := value.Interface()
		oldValue := oldOptionsValue.Field(i).Interface()
		if option.strictFlag {
			return oldOptions.GetStrictOptionValue(oldValue.(core.Tristate)) != newOptions.GetStrictOptionValue(newValue.(core.Tristate))
		}
		if option.allowJsFlag {
			return oldOptions.GetAllowJS() != newOptions.GetAllowJS()
		}
		return !reflect.DeepEqual(newValue, oldValue)
	})
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

func TestCompilerOptionComparisons(t *testing.T) {
	t.Parallel()

	comparisons := []struct {
		name    string
		compare func(*core.CompilerOptions, *core.CompilerOptions) bool
		filter  func(*CommandLineOption) bool
	}{
		{"semanticDiagnostics", CompilerOptionsAffectSemanticDiagnostics, func(option *CommandLineOption) bool { return option.AffectsSemanticDiagnostics }},
		{"declarationPath", CompilerOptionsAffectDeclarationPath, func(option *CommandLineOption) bool { return option.AffectsDeclarationPath }},
		{"emit", CompilerOptionsAffectEmit, func(option *CommandLineOption) bool { return option.AffectsEmit }},
	}
	check := func(t *testing.T, oldOptions *core.CompilerOptions, newOptions *core.CompilerOptions) {
		t.Helper()
		for _, comparison := range comparisons {
			want := reflectedOptionsHaveChanges(oldOptions, newOptions, comparison.filter)
			if got := comparison.compare(oldOptions, newOptions); got != want {
				t.Fatalf("%s: got %v, want %v\nold: %+v\nnew: %+v", comparison.name, got, want, oldOptions, newOptions)
			}
		}
	}
	check(t, nil, nil)
	check(t, nil, &core.CompilerOptions{})
	check(t, &core.CompilerOptions{}, nil)
	check(t, &core.CompilerOptions{}, &core.CompilerOptions{})

	states := []core.Tristate{core.TSUnknown, core.TSFalse, core.TSTrue}
	for field := range reflect.TypeFor[core.CompilerOptions]().Fields() {
		if !field.IsExported() {
			continue
		}
		t.Run(field.Name, func(t *testing.T) {
			t.Parallel()
			values := compilerOptionTestValues(t, field)
			for _, strict := range states {
				for _, checkJs := range states {
					for _, oldValue := range values {
						for _, newValue := range values {
							oldOptions := &core.CompilerOptions{Strict: strict, CheckJs: checkJs}
							newOptions := oldOptions.Clone()
							reflect.ValueOf(oldOptions).Elem().FieldByIndex(field.Index).Set(oldValue)
							reflect.ValueOf(newOptions).Elem().FieldByIndex(field.Index).Set(newValue)
							check(t, oldOptions, newOptions)
							check(t, oldOptions, oldOptions)
						}
					}
				}
			}
		})
	}

	t.Run("explicitStrictFlags", func(t *testing.T) {
		t.Parallel()
		for _, value := range states {
			for _, oldStrict := range states {
				for _, newStrict := range states {
					oldOptions := &core.CompilerOptions{Strict: oldStrict}
					forEachReflectedCompilerOptionValue(oldOptions, func(option *CommandLineOption) bool { return option.strictFlag }, func(_ *CommandLineOption, field reflect.Value, _ int) bool {
						field.Set(reflect.ValueOf(value))
						return false
					})
					newOptions := oldOptions.Clone()
					newOptions.Strict = newStrict
					check(t, oldOptions, newOptions)
				}
			}
		}
	})
}

func TestCompilerOptionsForBuildInfo(t *testing.T) {
	t.Parallel()

	type entry struct {
		option *CommandLineOption
		value  any
	}
	check := func(t *testing.T, options *core.CompilerOptions) {
		t.Helper()
		var want []entry
		forEachReflectedCompilerOptionValue(options, func(option *CommandLineOption) bool { return option.AffectsBuildInfo }, func(option *CommandLineOption, value reflect.Value, _ int) bool {
			if !value.IsZero() {
				want = append(want, entry{option, value.Interface()})
			}
			return false
		})
		var got []entry
		ForEachCompilerOptionAffectingBuildInfo(options, func(option *CommandLineOption, value any) {
			got = append(got, entry{option, value})
		})
		if !reflect.DeepEqual(got, want) {
			t.Fatalf("got %+v, want %+v", got, want)
		}
	}
	check(t, &core.CompilerOptions{})
	allOptions := &core.CompilerOptions{}
	for field := range reflect.TypeFor[core.CompilerOptions]().Fields() {
		if !field.IsExported() {
			continue
		}
		values := compilerOptionTestValues(t, field)
		reflect.ValueOf(allOptions).Elem().FieldByIndex(field.Index).Set(values[1])
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
}

func TestCompilerOptionConfigDirSubstitution(t *testing.T) {
	t.Parallel()

	handleOptionConfigDirTemplateSubstitution(nil, "/config")
	fields := []string{
		"GenerateCpuProfile", "GenerateTrace", "OutFile", "OutDir",
		"RootDir", "TsBuildInfoFile", "BaseUrl", "DeclarationDir",
	}
	for field := range reflect.TypeFor[core.CompilerOptions]().Fields() {
		if field.Type.Kind() != reflect.String {
			continue
		}
		t.Run(field.Name, func(t *testing.T) {
			t.Parallel()
			for _, value := range []string{"", "unchanged", "${configDir}/output", "prefix/${configDir}/output"} {
				options := &core.CompilerOptions{}
				actual := reflect.ValueOf(options).Elem().FieldByIndex(field.Index)
				actual.SetString(value)
				handleOptionConfigDirTemplateSubstitution(options, "/config")
				expected := value
				if slices.Contains(fields, field.Name) && value == "${configDir}/output" {
					expected = "/config/output"
				}
				if actual.String() != expected {
					t.Fatalf("Got %q, want %q", actual.String(), expected)
				}
			}
		})
	}
}

func TestCompilerOptionConfigDirSubstitutionCopyOnWrite(t *testing.T) {
	t.Parallel()

	for _, fieldName := range []string{"RootDirs", "TypeRoots"} {
		t.Run(fieldName, func(t *testing.T) {
			t.Parallel()
			for _, original := range [][]string{nil, {}, {"unchanged"}, {"${configDir}/types", "unchanged"}} {
				options := &core.CompilerOptions{}
				field := reflect.ValueOf(options).Elem().FieldByName(fieldName)
				field.Set(reflect.ValueOf(original))
				handleOptionConfigDirTemplateSubstitution(options, "/config")
				actual := field.Interface().([]string)
				if len(original) > 0 && original[0] == "${configDir}/types" {
					if !slices.Equal(actual, []string{"/config/types", "unchanged"}) || &actual[0] == &original[0] {
						t.Fatal("Substitution must copy the changed slice")
					}
				} else if !reflect.DeepEqual(actual, original) || field.Pointer() != reflect.ValueOf(original).Pointer() {
					t.Fatal("Unchanged slices must retain their identity")
				}
			}
		})
	}

	original := &collections.OrderedMap[string, []string]{}
	unchanged := []string{"unchanged"}
	changed := []string{"${configDir}/src", "other"}
	original.Set("unchanged", unchanged)
	original.Set("changed", changed)
	options := &core.CompilerOptions{Paths: original}
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

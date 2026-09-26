package tsoptions

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

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

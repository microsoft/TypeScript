package tsoptions

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

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

package tsoptions

import (
	"reflect"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

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

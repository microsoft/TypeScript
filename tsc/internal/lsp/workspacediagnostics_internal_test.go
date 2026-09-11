package lsp

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"gotest.tools/v3/assert"
)

// The cache compares whole preference structs rather than listing the ones that matter, so a new
// preference cannot be forgotten and leave errors in the problem list that no longer exist. That
// relies on reflect.DeepEqual holding for equal values, which is not true of funcs or channels:
// two non-nil ones never compare equal, so a single such field would make every pull see settings
// as changed and discard the cache. Comparing values cannot catch that, since the zero of both is
// nil and nil does compare equal, so check the type instead.
func TestUserPreferencesStayComparableByValue(t *testing.T) {
	t.Parallel()

	var offenders []string
	var walk func(t reflect.Type, path string, seen map[reflect.Type]bool)
	walk = func(t reflect.Type, path string, seen map[reflect.Type]bool) {
		if seen[t] {
			return
		}
		seen[t] = true
		switch t.Kind() {
		case reflect.Func, reflect.Chan, reflect.UnsafePointer:
			offenders = append(offenders, path+" is a "+t.Kind().String())
		case reflect.Struct:
			for field := range t.Fields() {
				walk(field.Type, path+"."+field.Name, seen)
			}
		case reflect.Pointer, reflect.Slice, reflect.Array:
			walk(t.Elem(), path+"[]", seen)
		case reflect.Map:
			walk(t.Key(), path+"[key]", seen)
			walk(t.Elem(), path+"[value]", seen)
		}
	}
	walk(reflect.TypeFor[lsutil.UserPreferences](), "UserPreferences", map[reflect.Type]bool{})

	assert.Equal(t, len(offenders), 0,
		"reflect.DeepEqual cannot compare these, so workspaceDiagnosticsSettings.Equal would discard the cache on every pull: %v", offenders)
}

// Equal must react to a preference the handler reads.
func TestWorkspaceDiagnosticsSettingsEqual(t *testing.T) {
	t.Parallel()

	settings := func(scope lsutil.WorkspaceDiagnosticsScope, locale string) workspaceDiagnosticsSettings {
		return workspaceDiagnosticsSettings{
			preferences: lsutil.UserPreferences{
				WorkspaceDiagnosticsScope:     scope,
				AutoImportFileExcludePatterns: []string{"**/vendor/**"},
			},
			locale: locale,
		}
	}
	base := settings(lsutil.WorkspaceDiagnosticsScopeOpenProjects, "en")

	assert.Assert(t, base.Equal(settings(lsutil.WorkspaceDiagnosticsScopeOpenProjects, "en")),
		"separately built but equal settings must compare equal")
	assert.Assert(t, !base.Equal(settings(lsutil.WorkspaceDiagnosticsScopeAllProjects, "en")),
		"a changed preference must invalidate the cache")
	assert.Assert(t, !base.Equal(settings(lsutil.WorkspaceDiagnosticsScopeOpenProjects, "de")),
		"a changed locale must invalidate the cache, since it changes what a diagnostic says")
}

package lsp

import (
	"errors"
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
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

// Only the newest pull is worth finishing: an older one reports the workspace as of a snapshot the
// newer one has already moved past, so it is cancelled rather than left to check for minutes.
func TestWorkspaceDiagnosticsPullSupersedesTheOneBeforeIt(t *testing.T) {
	t.Parallel()

	s := &Server{}
	// The cause each pull was cancelled with, which is how a pull tells why it stopped.
	causes := make([]error, 3)
	pulls := make([]*workspaceDiagnosticsPull, len(causes))
	for i := range pulls {
		pulls[i] = &workspaceDiagnosticsPull{cancel: func(cause error) { causes[i] = cause }}
	}

	s.supersedeWorkspaceDiagnostics(pulls[0])
	assert.Assert(t, causes[0] == nil, "the only pull running is not superseded")

	s.supersedeWorkspaceDiagnostics(pulls[1])
	assert.Assert(t, errors.Is(causes[0], errWorkspaceDiagnosticsSuperseded),
		"a newer pull cancels the one it replaces, saying why: %v", causes[0])

	s.supersedeWorkspaceDiagnostics(pulls[2])
	assert.Assert(t, errors.Is(causes[1], errWorkspaceDiagnosticsSuperseded), "every pull but the newest is cancelled")
	assert.Assert(t, causes[2] == nil, "the newest pull runs to completion")

	// A superseded pull unwinding afterwards must not clear the pull that replaced it.
	s.finishWorkspaceDiagnostics(pulls[0])
	s.finishWorkspaceDiagnostics(pulls[1])
	assert.Assert(t, s.workspaceDiagnosticsPull == pulls[2])

	s.finishWorkspaceDiagnostics(pulls[2])
	assert.Assert(t, s.workspaceDiagnosticsPull == nil, "nothing is running once the newest pull finishes")
}

// A pull that would repeat itself answers with nothing, which leaves the client holding whatever it
// had; a file the cache no longer tracks is only cleared by answering in full.
func TestWorkspaceDiagnosticsRepeatNeedsTheClientToHoldExactlyTheCache(t *testing.T) {
	t.Parallel()

	cache := newWorkspaceDiagnosticsCache()
	fingerprint := workspaceDiagnosticsFingerprint{snapshot: 1}
	cache.store("file:///a.ts", workspaceDiagnosticsCacheEntry{project: "/tsconfig.json", generation: 1, resultID: "a"})
	reported := collections.Set[lsproto.DocumentUri]{}
	reported.Add("file:///a.ts")
	cache.retain(&reported, fingerprint)

	assert.Assert(t, cache.repeatsLastAnswer(fingerprint, map[lsproto.DocumentUri]string{"file:///a.ts": "a"}))
	assert.Assert(t, !cache.repeatsLastAnswer(fingerprint, map[lsproto.DocumentUri]string{}),
		"a client missing a result id has to be told again")
	assert.Assert(t, !cache.repeatsLastAnswer(fingerprint, map[lsproto.DocumentUri]string{"file:///a.ts": "a", "file:///gone.ts": "b"}),
		"a client holding a result id for a file nothing reports any more has to be told to clear it")
}

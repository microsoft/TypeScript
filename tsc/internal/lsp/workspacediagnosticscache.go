package lsp

import (
	"reflect"
	"strconv"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/zeebo/xxh3"
)

// workspaceDiagnosticsCache remembers which program version produced the result id a client holds
// for a file. A program is rebuilt as a unit, so an unchanged generation means every file in the
// project can be answered "unchanged" without checking it.
type workspaceDiagnosticsCache struct {
	mu       sync.Mutex
	settings workspaceDiagnosticsSettings
	entries  map[lsproto.DocumentUri]workspaceDiagnosticsCacheEntry
}

// workspaceDiagnosticsSettings is the settings an entry was computed under. Unlike the equivalent
// in the auto-import registry, which lists the preferences it depends on, this compares all of
// them: a preference that changes what a diagnostic says but is missing from such a list would
// leave stale errors in the client's problem list, which is worse than the occasional extra sweep.
type workspaceDiagnosticsSettings struct {
	preferences lsutil.UserPreferences
	locale      string
}

func (s workspaceDiagnosticsSettings) Equal(other workspaceDiagnosticsSettings) bool {
	return s.locale == other.locale && reflect.DeepEqual(s.preferences, other.preferences)
}

type workspaceDiagnosticsCacheEntry struct {
	project    tspath.Path
	generation uint64
	resultID   string
}

func newWorkspaceDiagnosticsCache() *workspaceDiagnosticsCache {
	return &workspaceDiagnosticsCache{entries: map[lsproto.DocumentUri]workspaceDiagnosticsCacheEntry{}}
}

// useSettings discards the cache if the settings behind it changed. Comparing the whole preference
// set rather than the fields known to matter means a new preference cannot silently leave stale
// entries in place, and comparing the snapshot's copy rather than reacting to a configuration
// notification means a pull already in flight cannot repopulate under settings that have moved on.
func (c *workspaceDiagnosticsCache) useSettings(settings workspaceDiagnosticsSettings) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if !c.settings.Equal(settings) {
		c.settings = settings
		c.entries = map[lsproto.DocumentUri]workspaceDiagnosticsCacheEntry{}
	}
}

// unchangedResultID returns the result id to acknowledge, if the client still holds what we last
// computed for this generation.
func (c *workspaceDiagnosticsCache) unchangedResultID(uri lsproto.DocumentUri, project tspath.Path, generation uint64, clientHolds string) (string, bool) {
	if clientHolds == "" {
		return "", false
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	entry, ok := c.entries[uri]
	if !ok || entry.project != project || entry.generation != generation || entry.resultID != clientHolds {
		return "", false
	}
	return entry.resultID, true
}

func (c *workspaceDiagnosticsCache) store(uri lsproto.DocumentUri, entry workspaceDiagnosticsCacheEntry) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.entries[uri] = entry
}

// retain drops everything the sweep did not report.
func (c *workspaceDiagnosticsCache) retain(reported *collections.Set[lsproto.DocumentUri]) {
	c.mu.Lock()
	defer c.mu.Unlock()
	for uri := range c.entries {
		if !reported.Has(uri) {
			delete(c.entries, uri)
		}
	}
}

// workspaceDiagnosticsCacheStats describes what the cache holds. The auto-import registry reports
// its buckets the same way: a cache that decides whether a file is re-checked is worth being able
// to see when a pull takes longer than expected.
type workspaceDiagnosticsCacheStats struct {
	Files    int
	Projects int
}

func (c *workspaceDiagnosticsCache) stats() workspaceDiagnosticsCacheStats {
	c.mu.Lock()
	defer c.mu.Unlock()
	projects := collections.Set[tspath.Path]{}
	for _, entry := range c.entries {
		projects.Add(entry.project)
	}
	return workspaceDiagnosticsCacheStats{Files: len(c.entries), Projects: projects.Len()}
}

// workspaceDiagnosticsResultID hashes a file's diagnostics, so the next pull can tell whether they
// moved. Returns "" if they cannot be hashed, which forces a full report.
func workspaceDiagnosticsResultID(items []*lsproto.Diagnostic) string {
	if len(items) == 0 {
		return "empty"
	}
	encoded, err := json.Marshal(items)
	if err != nil {
		return ""
	}
	return strconv.FormatUint(xxh3.Hash(encoded), 36)
}

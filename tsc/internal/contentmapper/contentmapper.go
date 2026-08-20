// Package contentmapper defines the types describing an external content mapper: a plugin that
// transforms otherwise unsupported file content (e.g. .vue) into virtual TypeScript during program construction.
//
// A mapper is declared in tsconfig (Definition), its implementation is described by fields in its npm
// package's package.json (Manifest), and the two are combined once the package is resolved (Mapper).
// Resolution itself lives in the tsoptions package (it needs node module resolution).
//
// The package also drives the configured content mappers at build time (Host): it spawns each mapper's
// package as a child process and talks to it over a JSON-RPC connection (reusing internal/ipc), turning
// content-mapped source files into virtual TypeScript. Processes are consolidated by mapper identity, so many projects
// that use the same mapper version share a single process.
package contentmapper

import (
	"errors"
	"reflect"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/zeebo/xxh3"
)

var ErrProjectUnavailable = errors.New("content mapper project is unavailable")

// Definition is a content mapper as declared in a tsconfig's "contentMappers": the npm package that
// implements the mapper and the otherwise unsupported file extensions it registers.
type Definition struct {
	Package    string     `json:"package"`
	Extensions []string   `json:"extensions"`
	Options    json.Value `json:"options,omitempty"`
}

// Manifest is the content-mapper information read from a package's package.json: its name and version
// (which form the mapper's identity), the argv used to run it, and the compiler options it declares it
// depends on.
type Manifest struct {
	Name            string
	Version         string
	Exec            []string
	CompilerOptions []string
	DynamicConfig   bool
}

// Mapper is a resolved content mapper: its tsconfig Definition combined with the Manifest resolved from
// the package's package.json, plus the package directory used as the mapper's working directory.
type Mapper struct {
	Definition
	Manifest         `json:"-"`
	PackageDirectory string `json:"-"`
	// ContributionID is provided by an LSP client extension for inferred project content mappers.
	ContributionID string `json:"-"`
}

var supportedVirtualExtensions = collections.NewSetFromItems(
	".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts", ".json",
)

func IsSupportedVirtualExtension(extension string) bool {
	return supportedVirtualExtensions.Has(extension)
}

// DiagnosticName returns the best available user-facing name, including when manifest resolution failed.
func (m *Mapper) DiagnosticName() string {
	switch {
	case m.Name != "":
		return m.Name
	case m.Package != "":
		return m.Package
	default:
		return m.ContributionID
	}
}

// Identity returns the mapper's "name@version" identity, or just the name when it declares no version,
// or an empty string when the mapper has not been resolved to a name.
func (m *Mapper) Identity() string {
	if m.ContributionID != "" {
		return m.ContributionID + " (" + m.manifestIdentity() + ")"
	}
	return m.manifestIdentity()
}

func (m *Mapper) manifestIdentity() string {
	switch {
	case m.Name == "":
		return ""
	case m.Version == "":
		return m.Name
	default:
		return m.Name + "@" + m.Version
	}
}

// TransformIdentity returns a fingerprint of everything besides a file's content that determines the
// output of transforming it with this mapper under the given options: the mapper's identity and the
// values of the compiler options it declared it depends on. Folding it into a cache key means a change to
// the mapper version or a relevant compiler option invalidates cached results. It is a pure function of
// the mapper and options — the declared options come from the manifest, so it never starts the mapper
// process.
func (m *Mapper) TransformIdentity(options *core.CompilerOptions) xxh3.Uint128 {
	declared, _ := m.MarshalDeclaredOptions(options)
	optionsJSON, _ := json.Marshal(declared)
	buf := make([]byte, 0, len(m.Identity())+2+len(m.Options)+len(optionsJSON))
	buf = append(buf, m.Identity()...)
	buf = append(buf, 0)
	buf = append(buf, m.Options...)
	buf = append(buf, 0)
	buf = append(buf, optionsJSON...)
	return xxh3.Hash128(buf)
}

// MarshalDeclaredOptions marshals just the compiler options this mapper declared it depends on, in the
// declared order, skipping any that are unset. Marshaling only the declared fields avoids serializing the
// whole CompilerOptions when a mapper depends on few options (or none).
func (m *Mapper) MarshalDeclaredOptions(options *core.CompilerOptions) (*collections.OrderedMap[string, json.Value], error) {
	out := collections.NewOrderedMapWithSizeHint[string, json.Value](len(m.CompilerOptions))
	if options == nil || len(m.CompilerOptions) == 0 {
		return out, nil
	}
	fields := compilerOptionFields()
	v := reflect.ValueOf(options).Elem()
	for _, name := range m.CompilerOptions {
		i, ok := fields[name]
		if !ok {
			continue
		}
		field := v.Field(i)
		if field.IsZero() {
			continue
		}
		raw, err := json.Marshal(field.Interface())
		if err != nil {
			return nil, err
		}
		out.Set(name, json.Value(raw))
	}
	return out, nil
}

// compilerOptionFields maps each CompilerOptions option name (its json tag) to its struct field index.
var compilerOptionFields = sync.OnceValue(func() map[string]int {
	t := reflect.TypeFor[core.CompilerOptions]()
	fields := make(map[string]int, t.NumField())
	for i := range t.NumField() {
		name, _, _ := strings.Cut(t.Field(i).Tag.Get("json"), ",")
		if name != "" && name != "-" {
			fields[name] = i
		}
	}
	return fields
})

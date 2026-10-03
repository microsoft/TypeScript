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
	"maps"
	"reflect"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/zeebo/xxh3"
)

var ErrProjectUnavailable = errors.New("content mapper project is unavailable")

// Definition is a content mapper as declared in a tsconfig's "contentMappers": the npm package that
// implements the mapper and the otherwise unsupported file extensions it registers.
type Definition struct {
	Package    string   `json:"package"`
	Extensions []string `json:"extensions"`
	// OutputExtensions replaces the manifest defaults, including when the map is empty.
	OutputExtensions map[string]string `json:"outputExtensions,omitzero"`
	Options          json.Value        `json:"options,omitempty"`
}

// Manifest is the content-mapper information read from a package's package.json: its name and version
// (which form the mapper's identity), the argv used to run it, and the compiler options it declares it
// depends on.
type Manifest struct {
	Name                    string
	Version                 string
	Exec                    []string
	CompilerOptions         []string
	DynamicConfig           bool
	DefaultOutputExtensions map[string]string
}

// Mapper is a resolved content mapper: its tsconfig Definition combined with the Manifest resolved from
// the package's package.json, plus the package directory used as the mapper's working directory.
type Mapper struct {
	Definition
	Manifest `json:"-"`
	// PackageDirectory is the real path directory returned by package resolution for package-based mappers.
	PackageDirectory tspath.RootedDirectoryPath `json:"-"`
	// ContributionID is provided by an LSP client extension for inferred project content mappers.
	ContributionID string `json:"-"`
}

var supportedVirtualExtensions = collections.NewSetFromItems(
	".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts", ".json",
)

func IsSupportedVirtualExtension(extension string) bool {
	return supportedVirtualExtensions.Has(extension)
}

func IsValidExtension(extension string) bool {
	return len(extension) > 1 && extension[0] == '.' && !strings.ContainsAny(extension, "/\\")
}

func HasReservedSourceExtension(extension string) bool {
	for _, extensions := range tspath.AllSupportedExtensionsWithJson {
		for _, nativeExtension := range extensions {
			if len(extension) >= len(nativeExtension) &&
				strings.EqualFold(extension[len(extension)-len(nativeExtension):], nativeExtension) {
				return true
			}
		}
	}
	return false
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

// Equals compares the complete mapper configuration, not just its advertised identity.
func (m *Mapper) Equals(other *Mapper) bool {
	if m == other {
		return true
	}
	if m == nil || other == nil {
		return false
	}
	return m.Package == other.Package &&
		(m.Extensions == nil) == (other.Extensions == nil) &&
		slices.Equal(m.Extensions, other.Extensions) &&
		(m.Definition.OutputExtensions == nil) == (other.Definition.OutputExtensions == nil) &&
		maps.Equal(m.Definition.OutputExtensions, other.Definition.OutputExtensions) &&
		(m.Options == nil) == (other.Options == nil) &&
		slices.Equal(m.Options, other.Options) &&
		m.Name == other.Name &&
		m.Version == other.Version &&
		(m.Exec == nil) == (other.Exec == nil) &&
		slices.Equal(m.Exec, other.Exec) &&
		(m.CompilerOptions == nil) == (other.CompilerOptions == nil) &&
		slices.Equal(m.CompilerOptions, other.CompilerOptions) &&
		m.DynamicConfig == other.DynamicConfig &&
		(m.Manifest.DefaultOutputExtensions == nil) == (other.Manifest.DefaultOutputExtensions == nil) &&
		maps.Equal(m.Manifest.DefaultOutputExtensions, other.Manifest.DefaultOutputExtensions) &&
		m.PackageDirectory == other.PackageDirectory &&
		m.ContributionID == other.ContributionID
}

// EffectiveOutputExtensions returns the project override when present, otherwise the manifest defaults.
func (m *Mapper) EffectiveOutputExtensions() map[string]string {
	if m.Definition.OutputExtensions != nil {
		return m.Definition.OutputExtensions
	}
	return m.Manifest.DefaultOutputExtensions
}

// TransformIdentity fingerprints the mapper's identity, declared compiler options, and runtime output
// contract so both transformed-file caches and incremental emit are invalidated when these change.
// It is a pure function of the mapper and options and never starts the mapper process.
func (m *Mapper) TransformIdentity(options *core.CompilerOptions) xxh3.Uint128 {
	declared, _ := m.MarshalDeclaredOptions(options)
	optionsJSON, _ := json.Marshal(declared)
	var outputExtensionsJSON []byte
	if len(m.EffectiveOutputExtensions()) > 0 {
		outputExtensionsJSON, _ = json.Marshal(m.EffectiveOutputExtensions(), json.Deterministic(true))
	}
	buf := make([]byte, 0, len(m.Identity())+3+len(m.Options)+len(optionsJSON)+len(outputExtensionsJSON))
	buf = append(buf, m.Identity()...)
	buf = append(buf, 0)
	buf = append(buf, m.Options...)
	buf = append(buf, 0)
	buf = append(buf, optionsJSON...)
	if len(outputExtensionsJSON) > 0 {
		buf = append(buf, 0)
		buf = append(buf, outputExtensionsJSON...)
	}
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

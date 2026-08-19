package contentmapper

import (
	"fmt"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/spanmap"
)

// TransformErrorKind identifies the stage at which a content mapper transform failed.
type TransformErrorKind uint8

const (
	TransformErrorKindUnknown TransformErrorKind = iota
	TransformErrorKindInitialize
	TransformErrorKindProject
	TransformErrorKindRequest
	TransformErrorKindResponse
	TransformErrorKindMappings
)

// TransformError reports a failure while preparing, requesting, or decoding a transform.
type TransformError struct {
	Kind TransformErrorKind
	err  error
}

// NewTransformError creates a transform error for the given stage and underlying error.
func NewTransformError(kind TransformErrorKind, err error) *TransformError {
	return &TransformError{Kind: kind, err: err}
}

func (e *TransformError) Error() string {
	return fmt.Sprintf("content mapper transform failed: %v", e.err)
}

func (e *TransformError) Unwrap() error { return e.err }

// DiagnosticDirectiveErrorKind identifies why a diagnostic directive was rejected.
type DiagnosticDirectiveErrorKind uint8

const (
	DiagnosticDirectiveErrorKindInvalidRange DiagnosticDirectiveErrorKind = iota
	DiagnosticDirectiveErrorKindInvalidPolicy
	DiagnosticDirectiveErrorKindExpectMissingUnusedDiagnostic
	DiagnosticDirectiveErrorKindInvalidUnusedDiagnosticIndex
	DiagnosticDirectiveErrorKindOverlap
)

// DiagnosticDirectiveError reports an invalid diagnostic directive in a transform response.
type DiagnosticDirectiveError struct {
	Kind              DiagnosticDirectiveErrorKind
	Index             int
	SupplementalIndex int
	Policy            DiagnosticDirectivePolicy
}

func (e *DiagnosticDirectiveError) Error() string {
	return fmt.Sprintf("invalid content mapper diagnostic directive %d", e.Index)
}

// InvalidVirtualExtensionError reports an unsupported or missing virtual extension on a mapped output.
type InvalidVirtualExtensionError struct {
	Extension string
}

func (e *InvalidVirtualExtensionError) Error() string {
	return fmt.Sprintf("invalid virtual extension %q", e.Extension)
}

// ProjectErrorKind identifies why a mapper's openProject response was rejected.
type ProjectErrorKind uint8

const (
	ProjectErrorKindMalformedResponse ProjectErrorKind = iota
	ProjectErrorKindMissingConfigIdentity
	ProjectErrorKindNonAbsoluteWatchedFile
	ProjectErrorKindUnexpectedConfigIdentity
	ProjectErrorKindUnexpectedWatchedFiles
)

// ProjectError reports an invalid mapper openProject response.
type ProjectError struct {
	Kind ProjectErrorKind
}

func (e *ProjectError) Error() string {
	switch e.Kind {
	case ProjectErrorKindMalformedResponse:
		return "content mapper returned a malformed project response"
	case ProjectErrorKindMissingConfigIdentity:
		return "content mapper did not return configIdentity for dynamic configuration"
	case ProjectErrorKindNonAbsoluteWatchedFile:
		return "content mapper returned a non-absolute path in watchedFiles"
	case ProjectErrorKindUnexpectedConfigIdentity:
		return "content mapper returned configIdentity without declaring dynamicConfig"
	case ProjectErrorKindUnexpectedWatchedFiles:
		return "content mapper returned watchedFiles without declaring dynamicConfig"
	default:
		return "content mapper returned an invalid project response"
	}
}

// InitializeErrorKind identifies why a mapper's initialize response was rejected.
type InitializeErrorKind uint8

const (
	InitializeErrorKindProcessStart InitializeErrorKind = iota
	InitializeErrorKindProcessExit
	InitializeErrorKindNoResponse
	InitializeErrorKindInvalidResponse
	InitializeErrorKindRequest
	InitializeErrorKindProtocolVersion
	InitializeErrorKindPositionEncoding
	InitializeErrorKindEmptyDiagnosticSource
	InitializeErrorKindReservedDiagnosticSource
)

// InitializeError reports an invalid or unsupported mapper initialize response.
type InitializeError struct {
	Kind             InitializeErrorKind
	MapperName       string
	Command          string
	Detail           string
	ExitCode         int
	TimeoutSeconds   int
	ProtocolVersion  int
	PositionEncoding PositionEncoding
	DiagnosticSource string
}

// SupplementalFileCollisionError reports a compiler-assigned supplemental filename that already exists.
type SupplementalFileCollisionError struct {
	FileName string
}

func (e *SupplementalFileCollisionError) Error() string {
	return fmt.Sprintf("content mapper supplemental output file %q already exists", e.FileName)
}

func (e *InitializeError) Error() string {
	switch e.Kind {
	case InitializeErrorKindProcessStart:
		return fmt.Sprintf("could not start content mapper command %q: %s", e.Command, e.Detail)
	case InitializeErrorKindProcessExit:
		return fmt.Sprintf("content mapper process exited before initialization with code %d", e.ExitCode)
	case InitializeErrorKindNoResponse:
		return "content mapper did not respond to the initialize request"
	case InitializeErrorKindInvalidResponse:
		return "content mapper returned an invalid initialize response: " + e.Detail
	case InitializeErrorKindRequest:
		return "content mapper initialize request failed: " + e.Detail
	case InitializeErrorKindProtocolVersion:
		return fmt.Sprintf("unsupported protocol version %d (expected %d)", e.ProtocolVersion, ProtocolVersion)
	case InitializeErrorKindPositionEncoding:
		return fmt.Sprintf("unsupported position encoding %q", e.PositionEncoding)
	case InitializeErrorKindEmptyDiagnosticSource:
		return "diagnostic source must not be empty"
	case InitializeErrorKindReservedDiagnosticSource:
		return fmt.Sprintf("diagnostic source %q is reserved by TypeScript", e.DiagnosticSource)
	default:
		return "content mapper initialization failed"
	}
}

// Result is the outcome of transforming a content-mapped source file into virtual TypeScript.
type Result struct {
	// Text is the virtual TypeScript source text that is parsed into the program.
	Text string
	// VirtualExtension determines how Text is parsed.
	VirtualExtension string
	// Diagnostics are syntax errors in the original content.
	Diagnostics []*ast.Diagnostic
	// Mappings maps positions in Text back to the original content, so that diagnostics the compiler
	// produces against the virtual text can be reported at their original locations. A successful
	// transform must return a non-nil map; an empty map describes fully synthesized output.
	Mappings *spanmap.SpanMap
	// DiagnosticDirectives control TypeScript diagnostics produced in virtual ranges.
	DiagnosticDirectives []ast.MappedDiagnosticDirective
	// Supplemental contains additional unnamed outputs associated with the canonical result.
	Supplemental []MappedResult
}

// MappedResult is one virtual source file and its mapping to the original input.
type MappedResult struct {
	Text                 string
	VirtualExtension     string
	Mappings             *spanmap.SpanMap
	DiagnosticDirectives []ast.MappedDiagnosticDirective
}

// Request carries the inputs for transforming one content-mapped source file.
type Request struct {
	// FileName is the content-mapped source file being transformed.
	FileName string
	// Content is the content-mapped source file's text.
	Content string
}

// ProjectSpec describes the project configuration visible to its content mappers.
type ProjectSpec struct {
	// ConfigFileName is the absolute project configuration file name, or empty for a project without one.
	ConfigFileName string
	// Mappers are the resolved content mapper entries configured for the project.
	Mappers []*Mapper
	// CompilerOptions are the project's effective compiler options.
	CompilerOptions *core.CompilerOptions
}

type OptionPathSegment struct {
	Property string
	Index    int
	IsIndex  bool
}

type OptionDiagnostic struct {
	Mapper      *Mapper
	Path        []OptionPathSegment
	Source      string
	Code        int32
	MessageText string
}

// OperationTiming is the cumulative wall time and invocation count for one mapper operation.
type OperationTiming struct {
	Count    uint64
	Duration time.Duration
}

// MapperTimings is cumulative process and protocol activity for one resolved mapper identity.
type MapperTimings struct {
	Spawn        OperationTiming
	Initialize   OperationTiming
	OpenProject  OperationTiming
	CloseProject OperationTiming
	Transform    OperationTiming
}

// Timings is a cumulative snapshot of content mapper process and protocol activity.
type Timings struct {
	Mappers     map[string]MapperTimings
	RequestWait time.Duration
}

// Since returns the non-negative operation delta since previous.
func (t Timings) Since(previous Timings) Timings {
	result := Timings{
		Mappers:     make(map[string]MapperTimings, len(t.Mappers)),
		RequestWait: max(t.RequestWait-previous.RequestWait, 0),
	}
	for identity, current := range t.Mappers {
		before := previous.Mappers[identity]
		result.Mappers[identity] = MapperTimings{
			Spawn:        operationTimingSince(current.Spawn, before.Spawn),
			Initialize:   operationTimingSince(current.Initialize, before.Initialize),
			OpenProject:  operationTimingSince(current.OpenProject, before.OpenProject),
			CloseProject: operationTimingSince(current.CloseProject, before.CloseProject),
			Transform:    operationTimingSince(current.Transform, before.Transform),
		}
	}
	return result
}

func operationTimingSince(current OperationTiming, previous OperationTiming) OperationTiming {
	return OperationTiming{
		Count:    current.Count - min(current.Count, previous.Count),
		Duration: max(current.Duration-previous.Duration, 0),
	}
}

// Project is the project-scoped view of a Host. It owns mapper configuration handles and provides the
// identities and watch dependencies needed for caching and incremental builds. Mapper projects are opened
// lazily when a transform is requested, or earlier when dynamic configuration is needed.
type Project interface {
	// Refresh closes opened mapper projects so they are reopened on the next transform or configuration identity query.
	Refresh() error
	// Identities returns sorted transform identities for all configured mappers. It returns an error if
	// dynamic project configuration cannot be opened or validated.
	Identities() ([]string, error)
	// Identity returns the transform identity for mapper, or an empty string if mapper is not in this
	// project. It returns an error if dynamic project configuration cannot be opened or validated.
	Identity(mapper *Mapper) (string, error)
	// WatchedFiles returns the absolute files reported by mappers whose package.json declares dynamicConfig.
	// It returns an error if project configuration cannot be opened or validated.
	WatchedFiles() ([]string, error)
	// Diagnostics returns option diagnostics cached by mapper projects that have already been opened.
	Diagnostics() []OptionDiagnostic
	// Transform transforms one content-mapped source file using mapper in this project's configuration.
	Transform(mapper *Mapper, request Request) (result Result, err error)
	// Close releases this project reference and closes mapper project handles when no references remain.
	Close() error
}

// Host transforms otherwise unsupported file content into virtual TypeScript during program construction, by driving the
// configured content mappers. Create one with NewHost; Close tears down every mapper it spawned.
type Host interface {
	// Timings returns a cumulative snapshot of mapper process and protocol activity.
	Timings() Timings
	// Project returns a retained project-scoped view for spec. Equivalent specs share underlying mapper
	// configuration state; the caller must close the returned Project.
	Project(spec ProjectSpec) Project
	// Acquire retains the processes for the given mapper identities until the returned lease is released.
	// Acquiring a mapper does not start its process; processes remain lazy until Transform is called.
	Acquire(mappers []*Mapper) (release func())
	// SetLocale updates the locale used to initialize mapper processes. Existing processes are stopped
	// and respawned lazily so subsequent transforms use the new locale.
	SetLocale(locale locale.Locale)
	// Transform maps a content-mapped source file to virtual TypeScript using the given content mapper
	// in a short-lived project with default compiler options.
	//
	// A non-nil error indicates the mapper itself failed to produce a result — for example the
	// host hit a broken pipe, a process crash, or could not deserialize the mapper's response.
	Transform(mapper *Mapper, request Request) (result Result, err error)
	// Close shuts down every mapper process the host spawned.
	Close() error
}

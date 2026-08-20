package contentmapper

import (
	"cmp"
	"context"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"maps"
	"slices"
	"strings"
	"sync"
	"sync/atomic"
	"time"
	"unicode/utf8"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/jsonrpc"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/zeebo/xxh3"
)

// ProtocolVersion is the content mapper protocol version this host speaks.
const ProtocolVersion = 1

const initializeTimeoutSeconds = 5

const initializeTimeout = initializeTimeoutSeconds * time.Second

// Content mapper protocol method names.
const (
	MethodInitialize   = "initialize"
	MethodOpenProject  = "openProject"
	MethodCloseProject = "closeProject"
	MethodTransform    = "transform"
)

// InitializeParams is the parameter object for the initialize request.
type InitializeParams struct {
	ProtocolVersion int `json:"protocolVersion"`
	// Locale is the BCP 47 locale to use for mapper-authored diagnostic messages, when configured.
	Locale string `json:"locale,omitempty"`
	// PositionEncodings lists the coordinate spaces the host accepts.
	PositionEncodings []PositionEncoding `json:"positionEncodings"`
}

// InitializeResult is the mapper's response to the initialize request.
type InitializeResult struct {
	ProtocolVersion int `json:"protocolVersion"`
	// PositionEncoding selects the coordinate space for all mappings and diagnostics.
	PositionEncoding PositionEncoding `json:"positionEncoding"`
	// DiagnosticSource is the prefix used for every mapper-authored diagnostic code.
	DiagnosticSource string `json:"diagnosticSource"`
}

// OpenProjectParams is the parameter object for the openProject request.
type OpenProjectParams struct {
	// ConfigFileName is the absolute project configuration file name, or empty when there is none.
	ConfigFileName string `json:"configFileName"`
	// ProjectHandle is an opaque, process-local handle assigned by the host.
	ProjectHandle string `json:"projectHandle"`
	// Options is the mapper entry's options from the project's contentMappers configuration.
	Options json.Value `json:"options,omitempty"`
	// CompilerOptions contains the project's effective compiler options.
	CompilerOptions json.Value `json:"compilerOptions"`
}

// OpenProjectResult is the mapper's response to an openProject request. ConfigIdentity and WatchedFiles
// may only be returned by mappers that declare dynamicConfig.
type OpenProjectResult struct {
	// ConfigIdentity is a stable fingerprint of all dynamic configuration that can affect transforms.
	ConfigIdentity string `json:"configIdentity"`
	// WatchedFiles are absolute files whose changes may alter ConfigIdentity or transform output.
	WatchedFiles []string `json:"watchedFiles,omitempty"`
	// OptionDiagnostics report invalid mapper options. Paths are relative to the mapper entry's options object.
	OptionDiagnostics []OptionDiagnosticResult `json:"optionDiagnostics,omitempty"`
}

type OptionDiagnosticResult struct {
	Path        []json.Value `json:"path"`
	MessageText string       `json:"messageText"`
	Code        int32        `json:"code,omitempty"`
}

// CloseProjectParams is the parameter object for the closeProject request.
type CloseProjectParams struct {
	ProjectHandle string `json:"projectHandle"`
}

// PositionEncoding is the coordinate space a mapper uses for mappings and diagnostics.
type PositionEncoding string

const (
	PositionEncodingUTF8  PositionEncoding = "utf-8"
	PositionEncodingUTF16 PositionEncoding = "utf-16"
)

// TransformParams is the parameter object for the transform request.
type TransformParams struct {
	// FileName is the absolute name of the content-mapped source file being transformed.
	FileName string `json:"fileName"`
	// Content is the content-mapped source file's text.
	Content string `json:"content"`
	// ProjectHandle identifies the mapper project configuration opened for this transform.
	ProjectHandle string `json:"projectHandle"`
}

// MappedOutput is virtual source text and its mapping to an original input.
type MappedOutput struct {
	// Text is the virtual JavaScript or TypeScript source text.
	Text string `json:"text"`
	// Extension determines the virtual source file's syntax.
	Extension string `json:"extension"`
	// Mappings is the span map's tuple-array JSON (see spanmap.Marshal), expressed in the selected
	// position encoding. Absent or empty means the output is fully synthesized.
	Mappings json.Value `json:"mappings,omitempty"`
	// DiagnosticDirectives describe framework directives that suppress TypeScript diagnostics in
	// virtual ranges and optionally report an error when no diagnostic is produced.
	DiagnosticDirectives *DiagnosticDirectives `json:"diagnosticDirectives,omitempty"`
}

// DiagnosticDirectivePolicy is the numeric policy stored in a mapped diagnostic directive tuple.
type DiagnosticDirectivePolicy uint8

const (
	DiagnosticDirectivePolicyIgnore DiagnosticDirectivePolicy = iota
	DiagnosticDirectivePolicyExpect
)

type UnusedExpectDirectiveDiagnostic struct {
	Code        int32  `json:"code"`
	MessageText string `json:"messageText"`
}

// DiagnosticDirectives shares unused-expect diagnostics across compact directive tuples.
type DiagnosticDirectives struct {
	UnusedExpectDirectiveDiagnostics []UnusedExpectDirectiveDiagnostic `json:"unusedExpectDirectiveDiagnostics"`
	Directives                       []MappedDiagnosticDirective       `json:"directives"`
}

// MappedDiagnosticDirective is encoded as
// [originalStart, originalLength, virtualStart, virtualEnd, policy, unusedExpectDirectiveIndex?].
// An omitted index selects the only unused-expect diagnostic and is invalid when there is not exactly one.
type MappedDiagnosticDirective struct {
	OriginalStart              int
	OriginalLength             int
	VirtualStart               int
	VirtualEnd                 int
	Policy                     DiagnosticDirectivePolicy
	UnusedExpectDirectiveIndex *int
}

var (
	_ json.MarshalerTo     = MappedDiagnosticDirective{}
	_ json.UnmarshalerFrom = (*MappedDiagnosticDirective)(nil)
)

func (d MappedDiagnosticDirective) MarshalJSONTo(enc *json.Encoder) error {
	tuple := []any{d.OriginalStart, d.OriginalLength, d.VirtualStart, d.VirtualEnd, d.Policy}
	if d.UnusedExpectDirectiveIndex != nil {
		tuple = append(tuple, *d.UnusedExpectDirectiveIndex)
	}
	return json.MarshalEncode(enc, tuple)
}

func (d *MappedDiagnosticDirective) UnmarshalJSONFrom(dec *json.Decoder) error {
	var tuple []json.Value
	if err := json.UnmarshalDecode(dec, &tuple); err != nil {
		return err
	}
	if len(tuple) != 5 && len(tuple) != 6 {
		return fmt.Errorf("diagnostic directive tuple must contain 5 or 6 elements, got %d", len(tuple))
	}
	*d = MappedDiagnosticDirective{}
	fields := []any{&d.OriginalStart, &d.OriginalLength, &d.VirtualStart, &d.VirtualEnd, &d.Policy}
	for i, field := range fields {
		if err := json.Unmarshal(tuple[i], field); err != nil {
			return fmt.Errorf("invalid diagnostic directive tuple element %d: %w", i, err)
		}
	}
	if len(tuple) == 6 {
		var index int
		d.UnusedExpectDirectiveIndex = &index
		if err := json.Unmarshal(tuple[5], d.UnusedExpectDirectiveIndex); err != nil {
			return fmt.Errorf("invalid diagnostic directive tuple element 5: %w", err)
		}
	}
	return nil
}

type SupplementalOutput struct {
	MappedOutput
}

// TransformResult is the canonical output for one input file.
type TransformResult struct {
	MappedOutput
	// Diagnostics are mapper-authored errors expressed in original-source coordinates.
	Diagnostics []Diagnostic `json:"diagnostics,omitempty"`
	// Supplemental contains additional unnamed compiler inputs associated with this source file.
	Supplemental []SupplementalOutput `json:"supplemental,omitempty"`
}

// Diagnostic is an error reported by a mapper in original-source coordinates.
type Diagnostic struct {
	// MessageText is the diagnostic message.
	MessageText string `json:"messageText"`
	// Start and Length locate the diagnostic in the original content using the selected position encoding.
	Start  int   `json:"start"`
	Length int   `json:"length"`
	Code   int32 `json:"code,omitempty"`
}

// dialFunc establishes a running connection to a mapper. In production it spawns the mapper's process;
// tests substitute an in-memory connection. It returns the connection and a closer that tears it down.
type dialFunc func(ctx context.Context, mapper *Mapper, diagnosticLocale locale.Locale) (ipc.Conn, io.Closer, PositionEncoding, string, error)

// host manages one child process per mapper identity. It is the production implementation of Host.
type host struct {
	ctx    context.Context
	cancel context.CancelFunc
	stop   func() bool
	dial   dialFunc
	timing *timingCollector

	lifecycleMu      sync.RWMutex
	diagnosticLocale locale.Locale

	mu            sync.Mutex
	conns         map[string]*mapperConn
	projects      map[string]*projectEntry
	projectLeases map[string]*projectLease
	nextProjectID uint64
}

type projectEntry struct {
	mapper            *Mapper
	spec              ProjectSpec
	projectHandle     string
	opened            bool
	configIdentity    string
	watchedFiles      []string
	optionDiagnostics []OptionDiagnostic
}

type mapperConn struct {
	conn   ipc.Conn
	closer io.Closer
	// err, when non-nil, records that this mapper failed to start; it is cached so we do not repeatedly
	// try (and fail) to spawn a broken mapper.
	err              error
	positionEncoding PositionEncoding
	diagnosticSource string
	// refs is the number of active Acquire calls retaining this identity.
	refs int
}

type operationTiming struct {
	count    atomic.Uint64
	duration atomic.Int64
}

func (t *operationTiming) record(start time.Time) {
	t.count.Add(1)
	t.duration.Add(int64(time.Since(start)))
}

func (t *operationTiming) snapshot() OperationTiming {
	return OperationTiming{Count: t.count.Load(), Duration: time.Duration(t.duration.Load())}
}

type timingCollector struct {
	mu                 sync.Mutex
	mappers            map[string]*mapperTimingCollector
	activeRequests     uint64
	requestWaitStart   time.Time
	requestWaitElapsed time.Duration
}

type mapperTimingCollector struct {
	spawn        operationTiming
	initialize   operationTiming
	openProject  operationTiming
	closeProject operationTiming
	transform    operationTiming
	owner        *timingCollector
}

func (t *timingCollector) mapper(identity string) *mapperTimingCollector {
	t.mu.Lock()
	defer t.mu.Unlock()
	if timing := t.mappers[identity]; timing != nil {
		return timing
	}
	timing := &mapperTimingCollector{owner: t}
	t.mappers[identity] = timing
	return timing
}

func (t *timingCollector) snapshot() Timings {
	t.mu.Lock()
	requestWait := t.requestWaitElapsed
	if t.activeRequests != 0 {
		requestWait += time.Since(t.requestWaitStart)
	}
	mappers := make(map[string]*mapperTimingCollector, len(t.mappers))
	maps.Copy(mappers, t.mappers)
	t.mu.Unlock()
	result := Timings{Mappers: make(map[string]MapperTimings, len(mappers)), RequestWait: requestWait}
	for identity, timing := range mappers {
		result.Mappers[identity] = MapperTimings{
			Spawn:        timing.spawn.snapshot(),
			Initialize:   timing.initialize.snapshot(),
			OpenProject:  timing.openProject.snapshot(),
			CloseProject: timing.closeProject.snapshot(),
			Transform:    timing.transform.snapshot(),
		}
	}
	return result
}

func (t *mapperTimingCollector) startRequest() time.Time {
	t.owner.mu.Lock()
	if t.owner.activeRequests == 0 {
		t.owner.requestWaitStart = time.Now()
	}
	t.owner.activeRequests++
	t.owner.mu.Unlock()
	return time.Now()
}

func (t *mapperTimingCollector) finishRequest(operation *operationTiming, start time.Time) {
	operation.record(start)
	t.owner.mu.Lock()
	t.owner.activeRequests--
	if t.owner.activeRequests == 0 {
		t.owner.requestWaitElapsed += time.Since(t.owner.requestWaitStart)
	}
	t.owner.mu.Unlock()
}

var _ Host = (*host)(nil)

// Spawner starts a child process, returning its stdio as an io.ReadWriteCloser (Read is the
// process's stdout, Write is its stdin) whose Close tears the process down. This seam keeps os/exec out
// of this package: production hosts spawn a real process, tests supply an in-process pipe.
type Spawner interface {
	Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error)
}

type processExitState interface {
	ExitCode() (int, bool)
}

// SpawnerFunc adapts a spawn function to the Spawner interface.
type SpawnerFunc func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error)

func (f SpawnerFunc) Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	return f(command, dir, stderr)
}

// Logger receives content mapper protocol and process output as complete log lines.
type Logger func(message string)

// HostOptions configures optional content mapper process logging.
type HostOptions struct {
	Logger Logger
}

type loggingProtocol struct {
	ipc.Protocol
	mapperName string
	logger     Logger
}

func (p *loggingProtocol) log(direction string, message any) {
	data, err := json.Marshal(message)
	if err != nil {
		p.logger(fmt.Sprintf("[content mapper: %s] %s: <failed to serialize: %v>", p.mapperName, direction, err))
		return
	}
	p.logger(fmt.Sprintf("[content mapper: %s] %s: %s", p.mapperName, direction, data))
}

func (p *loggingProtocol) ReadMessage() (*ipc.Message, error) {
	message, err := p.Protocol.ReadMessage()
	if err == nil {
		p.log("receive", message)
	}
	return message, err
}

func (p *loggingProtocol) WriteRequest(id *jsonrpc.ID, method string, params any) error {
	message := jsonrpc.RequestMessage{ID: id, Method: method, Params: params}
	p.log("send", message)
	return p.Protocol.WriteRequest(id, method, params)
}

func (p *loggingProtocol) WriteNotification(method string, params any) error {
	message := jsonrpc.RequestMessage{Method: method, Params: params}
	p.log("send", message)
	return p.Protocol.WriteNotification(method, params)
}

func (p *loggingProtocol) WriteResponse(id *jsonrpc.ID, result any) error {
	message := jsonrpc.ResponseMessage{ID: id, Result: result}
	p.log("send", message)
	return p.Protocol.WriteResponse(id, result)
}

func (p *loggingProtocol) WriteError(id *jsonrpc.ID, responseError *jsonrpc.ResponseError) error {
	message := jsonrpc.ResponseMessage{ID: id, Error: responseError}
	p.log("send", message)
	return p.Protocol.WriteError(id, responseError)
}

type stderrLogger struct {
	mapperName string
	logger     Logger
	mu         sync.Mutex
	pending    string
}

func (w *stderrLogger) Write(data []byte) (int, error) {
	w.mu.Lock()
	defer w.mu.Unlock()
	w.pending += string(data)
	for {
		index := strings.IndexByte(w.pending, '\n')
		if index < 0 {
			break
		}
		w.log(strings.TrimSuffix(w.pending[:index], "\r"))
		w.pending = w.pending[index+1:]
	}
	return len(data), nil
}

func (w *stderrLogger) flush() {
	w.mu.Lock()
	defer w.mu.Unlock()
	if w.pending != "" {
		w.log(strings.TrimSuffix(w.pending, "\r"))
		w.pending = ""
	}
}

func (w *stderrLogger) log(message string) {
	w.logger(fmt.Sprintf("[content mapper: %s] stderr: %s", w.mapperName, message))
}

type loggedProcess struct {
	io.ReadWriteCloser
	stderr *stderrLogger
}

func (p *loggedProcess) Close() error {
	err := p.ReadWriteCloser.Close()
	p.stderr.flush()
	return err
}

type closeOnceReadWriteCloser struct {
	io.ReadWriteCloser
	once sync.Once
	err  error
}

func (c *closeOnceReadWriteCloser) Close() error {
	c.once.Do(func() { c.err = c.ReadWriteCloser.Close() })
	return c.err
}

func (c *closeOnceReadWriteCloser) ExitCode() (int, bool) {
	if state, ok := c.ReadWriteCloser.(processExitState); ok {
		return state.ExitCode()
	}
	return 0, false
}

// NewHost creates a Host that spawns each mapper's process via the given spawner and drives it over a
// JSON-RPC connection. The host's lifetime is bound to ctx: cancelling it (e.g. the CLI's signal context
// on SIGINT, or a build/watch session ending) tears every mapper process down, so owners of a session
// context need not close the host explicitly. Close does the same synchronously.
func NewHost(ctx context.Context, spawner Spawner, diagnosticLocale locale.Locale) Host {
	return NewHostWithOptions(ctx, spawner, diagnosticLocale, HostOptions{})
}

// NewHostWithOptions creates a Host with optional protocol and process logging.
func NewHostWithOptions(ctx context.Context, spawner Spawner, diagnosticLocale locale.Locale, options HostOptions) Host {
	logger := options.Logger
	timing := &timingCollector{mappers: make(map[string]*mapperTimingCollector)}
	return newWithDial(ctx, diagnosticLocale, timing, func(ctx context.Context, mapper *Mapper, diagnosticLocale locale.Locale) (ipc.Conn, io.Closer, PositionEncoding, string, error) {
		if len(mapper.Exec) == 0 {
			return nil, nil, "", "", fmt.Errorf("content mapper %q declares no command to run", mapper.Package)
		}
		mapperTiming := timing.mapper(mapper.Identity())
		diagnosticName := mapper.DiagnosticName()
		spawnStart := time.Now()
		var stderr io.Writer = io.Discard
		var stderrLog *stderrLogger
		if logger != nil {
			stderrLog = &stderrLogger{mapperName: diagnosticName, logger: logger}
			stderr = stderrLog
		}
		rwc, err := spawner.Spawn(mapper.Exec, mapper.PackageDirectory, stderr)
		mapperTiming.spawn.record(spawnStart)
		if err != nil {
			return nil, nil, "", "", &InitializeError{Kind: InitializeErrorKindProcessStart, MapperName: diagnosticName, Command: mapper.Exec[0], Detail: err.Error()}
		}
		if stderrLog != nil {
			rwc = &loggedProcess{ReadWriteCloser: rwc, stderr: stderrLog}
		}
		rwc = &closeOnceReadWriteCloser{ReadWriteCloser: rwc}
		protocol := ipc.Protocol(ipc.NewJSONRPCProtocol(rwc))
		if logger != nil {
			protocol = &loggingProtocol{Protocol: protocol, mapperName: diagnosticName, logger: logger}
		}
		conn := ipc.NewAsyncConnWithProtocol(rwc, protocol, rejectHandler{})
		go func() {
			_ = conn.Run(ctx)
			_ = rwc.Close()
		}()
		initializeCtx, cancel := context.WithTimeout(ctx, initializeTimeout)
		initializeStart := mapperTiming.startRequest()
		positionEncoding, diagnosticSource, err := handshake(initializeCtx, conn, diagnosticLocale)
		mapperTiming.finishRequest(&mapperTiming.initialize, initializeStart)
		initializeCtxErr := initializeCtx.Err()
		cancel()
		if err != nil {
			var exitCode int
			var exited bool
			if exitState, ok := rwc.(processExitState); ok {
				exitCode, exited = exitState.ExitCode()
			}
			_ = rwc.Close()
			if initializeError, ok := errors.AsType[*InitializeError](err); ok {
				initializeError.MapperName = diagnosticName
				return nil, nil, "", "", initializeError
			}
			if exited {
				return nil, nil, "", "", &InitializeError{Kind: InitializeErrorKindProcessExit, MapperName: diagnosticName, ExitCode: exitCode}
			}
			if initializeCtxErr != nil || errors.Is(err, context.Canceled) || errors.Is(err, context.DeadlineExceeded) {
				return nil, nil, "", "", &InitializeError{Kind: InitializeErrorKindNoResponse, MapperName: diagnosticName, TimeoutSeconds: initializeTimeoutSeconds}
			}
			return nil, nil, "", "", &InitializeError{Kind: InitializeErrorKindRequest, MapperName: diagnosticName, Detail: err.Error()}
		}
		return conn, rwc, positionEncoding, diagnosticSource, nil
	})
}

func newWithDial(ctx context.Context, diagnosticLocale locale.Locale, timing *timingCollector, dial dialFunc) *host {
	hostCtx, cancel := context.WithCancel(ctx)
	h := &host{ctx: hostCtx, cancel: cancel, dial: dial, timing: timing, diagnosticLocale: diagnosticLocale, conns: make(map[string]*mapperConn), projects: make(map[string]*projectEntry), projectLeases: make(map[string]*projectLease)}
	h.stop = context.AfterFunc(ctx, func() { _ = h.Close() })
	return h
}

func (h *host) Timings() Timings {
	return h.timing.snapshot()
}

func (h *host) SetLocale(diagnosticLocale locale.Locale) {
	h.lifecycleMu.Lock()
	defer h.lifecycleMu.Unlock()
	if h.diagnosticLocale.String() == diagnosticLocale.String() {
		return
	}
	h.diagnosticLocale = diagnosticLocale

	h.mu.Lock()
	var closers []io.Closer
	for _, entry := range h.conns {
		if entry.closer != nil {
			closers = append(closers, entry.closer)
		}
		entry.conn = nil
		entry.closer = nil
		entry.err = nil
		entry.positionEncoding = ""
		entry.diagnosticSource = ""
	}
	for _, project := range h.projects {
		project.opened = false
	}
	h.mu.Unlock()
	for _, closer := range closers {
		_ = closer.Close()
	}
}

func (h *host) Project(spec ProjectSpec) Project {
	h.lifecycleMu.RLock()
	defer h.lifecycleMu.RUnlock()

	key := projectSpecKey(spec)
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.projects == nil {
		return nil
	}
	if lease := h.projectLeases[key]; lease != nil {
		return lease.retainLocked()
	}
	lease := &projectLease{host: h, key: key, mappers: slices.Clone(spec.Mappers), entries: make(map[*Mapper]string, len(spec.Mappers))}
	lease.refs = 1
	for _, mapper := range spec.Mappers {
		entryKey := fmt.Sprintf("%s:%d", mapper.Identity(), h.nextProjectID)
		h.nextProjectID++
		entry := &projectEntry{mapper: mapper, spec: spec, projectHandle: entryKey}
		h.projects[entryKey] = entry
		connEntry := h.conns[mapper.Identity()]
		if connEntry == nil {
			connEntry = &mapperConn{}
			h.conns[mapper.Identity()] = connEntry
		}
		connEntry.refs++
		lease.entries[mapper] = entryKey
	}
	h.projectLeases[key] = lease
	return lease
}

func projectSpecKey(spec ProjectSpec) string {
	var key strings.Builder
	fmt.Fprintf(&key, "%s\x00%p", spec.ConfigFileName, spec.CompilerOptions)
	for _, mapper := range spec.Mappers {
		fmt.Fprintf(&key, "\x00%p", mapper)
	}
	return key.String()
}

func combinedIdentity(mapper *Mapper, configIdentity string, compilerOptions *core.CompilerOptions) string {
	transformIdentity := mapper.TransformIdentity(compilerOptions).Bytes()
	buf := make([]byte, 0, len(mapper.Identity())+len(mapper.Options)+len(configIdentity)+len(transformIdentity)+3)
	buf = append(buf, mapper.Identity()...)
	buf = append(buf, 0)
	buf = append(buf, mapper.Options...)
	buf = append(buf, 0)
	buf = append(buf, configIdentity...)
	buf = append(buf, 0)
	buf = append(buf, transformIdentity[:]...)
	hash := xxh3.Hash128(buf).Bytes()
	return mapper.Identity() + ":" + hex.EncodeToString(hash[:])
}

func (h *host) openProjectLocked(ctx context.Context, entry *projectEntry) error {
	if entry.opened {
		return nil
	}
	conn, _, diagnosticSource, err := h.connForLocked(entry.mapper)
	if err != nil {
		return err
	}
	compilerOptions, err := json.Marshal(entry.spec.CompilerOptions)
	if err != nil {
		return err
	}
	mapperTiming := h.timing.mapper(entry.mapper.Identity())
	start := mapperTiming.startRequest()
	raw, err := conn.Call(ctx, MethodOpenProject, OpenProjectParams{
		ConfigFileName:  entry.spec.ConfigFileName,
		ProjectHandle:   entry.projectHandle,
		Options:         entry.mapper.Options,
		CompilerOptions: compilerOptions,
	})
	mapperTiming.finishRequest(&mapperTiming.openProject, start)
	if err != nil {
		return err
	}
	var result OpenProjectResult
	if err := json.Unmarshal(raw, &result); err != nil {
		return &ProjectError{Kind: ProjectErrorKindMalformedResponse}
	}
	if entry.mapper.DynamicConfig && result.ConfigIdentity == "" {
		return &ProjectError{Kind: ProjectErrorKindMissingConfigIdentity}
	}
	if !entry.mapper.DynamicConfig && result.ConfigIdentity != "" {
		return &ProjectError{Kind: ProjectErrorKindUnexpectedConfigIdentity}
	}
	if !entry.mapper.DynamicConfig && len(result.WatchedFiles) != 0 {
		return &ProjectError{Kind: ProjectErrorKindUnexpectedWatchedFiles}
	}
	entry.configIdentity = result.ConfigIdentity
	for _, fileName := range result.WatchedFiles {
		if !tspath.PathIsAbsolute(fileName) {
			return &ProjectError{Kind: ProjectErrorKindNonAbsoluteWatchedFile}
		}
	}
	entry.watchedFiles = slices.Clone(result.WatchedFiles)
	entry.optionDiagnostics = make([]OptionDiagnostic, len(result.OptionDiagnostics))
	for i, diagnostic := range result.OptionDiagnostics {
		path := make([]OptionPathSegment, len(diagnostic.Path))
		for j, rawSegment := range diagnostic.Path {
			switch rawSegment.Kind() {
			case '"':
				var property string
				if err := json.Unmarshal(rawSegment, &property); err != nil {
					return &ProjectError{Kind: ProjectErrorKindMalformedResponse}
				}
				path[j].Property = property
			case '0':
				var index int
				if err := json.Unmarshal(rawSegment, &index); err != nil || index < 0 {
					return &ProjectError{Kind: ProjectErrorKindMalformedResponse}
				}
				path[j].Index = index
				path[j].IsIndex = true
			default:
				return &ProjectError{Kind: ProjectErrorKindMalformedResponse}
			}
		}
		entry.optionDiagnostics[i] = OptionDiagnostic{
			Mapper:      entry.mapper,
			Path:        path,
			Source:      diagnosticSource,
			Code:        diagnostic.Code,
			MessageText: diagnostic.MessageText,
		}
	}
	entry.opened = true
	return nil
}

func (h *host) closeProject(mapper *Mapper, conn ipc.Conn, projectHandle string) error {
	mapperTiming := h.timing.mapper(mapper.Identity())
	start := mapperTiming.startRequest()
	_, err := conn.Call(h.ctx, MethodCloseProject, CloseProjectParams{ProjectHandle: projectHandle})
	mapperTiming.finishRequest(&mapperTiming.closeProject, start)
	return err
}

func (h *host) Acquire(mappers []*Mapper) func() {
	seen := make(map[string]struct{}, len(mappers))
	identities := make([]string, 0, len(mappers))
	h.mu.Lock()
	if h.conns != nil {
		for _, mapper := range mappers {
			identity := mapper.Identity()
			if _, ok := seen[identity]; ok {
				continue
			}
			seen[identity] = struct{}{}
			identities = append(identities, identity)
			entry := h.conns[identity]
			if entry == nil {
				entry = &mapperConn{}
				h.conns[identity] = entry
			}
			entry.refs++
		}
	}
	h.mu.Unlock()
	return sync.OnceFunc(func() { h.release(identities) })
}

// Transform sends the file's content to the mapper's process and decodes the transformed result.
func (h *host) Transform(mapper *Mapper, request Request) (Result, error) {
	project := h.Project(ProjectSpec{
		Mappers:         []*Mapper{mapper},
		CompilerOptions: &core.CompilerOptions{},
	})
	defer project.Close()
	return project.Transform(mapper, request)
}

func (h *host) transformLocked(mapper *Mapper, request Request, projectHandle string) (Result, error) {
	if projectHandle == "" {
		return Result{}, errors.New("content mapper project handle is required")
	}
	conn, positionEncoding, diagnosticSource, err := h.connFor(mapper)
	if err != nil {
		return Result{}, NewTransformError(TransformErrorKindInitialize, err)
	}
	mapperTiming := h.timing.mapper(mapper.Identity())
	start := mapperTiming.startRequest()
	raw, err := conn.Call(h.ctx, MethodTransform, TransformParams{
		FileName:      request.FileName,
		Content:       request.Content,
		ProjectHandle: projectHandle,
	})
	mapperTiming.finishRequest(&mapperTiming.transform, start)
	if err != nil {
		return Result{}, NewTransformError(TransformErrorKindRequest, err)
	}
	decoded, err := decodeTransformResult(raw, request.Content, positionEncoding, diagnosticSource)
	if err != nil {
		return Result{}, NewTransformError(TransformErrorKindResponse, err)
	}
	return decoded, nil
}

// Close shuts down every mapper process. It is safe to call more than once and is invoked automatically
// when the context passed to New is cancelled.
func (h *host) Close() error {
	h.lifecycleMu.Lock()
	defer h.lifecycleMu.Unlock()
	h.stop()
	h.cancel()
	h.mu.Lock()
	var closers []io.Closer
	for _, mc := range h.conns {
		if mc.closer != nil {
			closers = append(closers, mc.closer)
		}
	}
	h.conns = nil
	h.projects = nil
	h.projectLeases = nil
	h.mu.Unlock()
	var errs []error
	for _, closer := range closers {
		if err := closer.Close(); err != nil {
			errs = append(errs, err)
		}
	}
	return errors.Join(errs...)
}

// connFor returns the connection for a mapper's identity, spawning its process on first use. Mappers
// sharing an identity share a single process.
func (h *host) connFor(mapper *Mapper) (ipc.Conn, PositionEncoding, string, error) {
	h.mu.Lock()
	defer h.mu.Unlock()
	return h.connForLocked(mapper)
}

func (h *host) connForLocked(mapper *Mapper) (ipc.Conn, PositionEncoding, string, error) {
	if h.conns == nil {
		return nil, "", "", errors.New("content mapper host is closed")
	}
	identity := mapper.Identity()
	entry := h.conns[identity]
	if entry == nil {
		entry = &mapperConn{}
		h.conns[identity] = entry
	}
	if entry.conn != nil || entry.err != nil {
		return entry.conn, entry.positionEncoding, entry.diagnosticSource, entry.err
	}
	conn, closer, positionEncoding, diagnosticSource, err := h.dial(h.ctx, mapper, h.diagnosticLocale)
	entry.conn = conn
	entry.closer = closer
	entry.err = err
	entry.positionEncoding = positionEncoding
	entry.diagnosticSource = diagnosticSource
	return conn, positionEncoding, diagnosticSource, err
}

type projectLease struct {
	host    *host
	key     string
	mappers []*Mapper
	entries map[*Mapper]string
	refs    int
	once    sync.Once
}

type retainedProject struct {
	*projectLease
	once sync.Once
}

func (p *projectLease) retainLocked() Project {
	p.refs++
	return &retainedProject{projectLease: p}
}

func (p *retainedProject) Close() (err error) {
	p.once.Do(func() { err = p.projectLease.release() })
	return err
}

func (p *projectLease) Refresh() error {
	p.host.lifecycleMu.RLock()
	defer p.host.lifecycleMu.RUnlock()
	p.host.mu.Lock()
	defer p.host.mu.Unlock()
	if p.host.projects == nil {
		return nil
	}
	var result error
	for _, key := range p.entries {
		entry := p.host.projects[key]
		if entry == nil || !entry.opened {
			continue
		}
		if connEntry := p.host.conns[entry.mapper.Identity()]; connEntry != nil && connEntry.conn != nil {
			result = errors.Join(result, p.host.closeProject(entry.mapper, connEntry.conn, entry.projectHandle))
		}
		entry.opened = false
	}
	return result
}

func (p *projectLease) Identities() ([]string, error) {
	p.host.lifecycleMu.RLock()
	defer p.host.lifecycleMu.RUnlock()
	p.host.mu.Lock()
	defer p.host.mu.Unlock()
	if p.host.projects == nil {
		return nil, nil
	}
	identities := make([]string, 0, len(p.entries))
	for _, mapper := range p.mappers {
		key := p.entries[mapper]
		entry := p.host.projects[key]
		if entry == nil {
			continue
		}
		if mapper.DynamicConfig {
			if err := p.host.openProjectLocked(p.host.ctx, entry); err != nil {
				return nil, err
			}
			identities = append(identities, combinedIdentity(mapper, entry.configIdentity, entry.spec.CompilerOptions))
		} else {
			hash := mapper.TransformIdentity(entry.spec.CompilerOptions).Bytes()
			identities = append(identities, mapper.Identity()+":"+hex.EncodeToString(hash[:]))
		}
	}
	return identities, nil
}

func (p *projectLease) Identity(mapper *Mapper) (string, error) {
	p.host.lifecycleMu.RLock()
	defer p.host.lifecycleMu.RUnlock()
	p.host.mu.Lock()
	defer p.host.mu.Unlock()
	if p.host.projects == nil {
		return "", nil
	}
	key, ok := p.entries[mapper]
	if !ok {
		return "", nil
	}
	entry := p.host.projects[key]
	if entry == nil {
		return "", nil
	}
	if mapper.DynamicConfig {
		if err := p.host.openProjectLocked(p.host.ctx, entry); err != nil {
			return "", err
		}
		return combinedIdentity(mapper, entry.configIdentity, entry.spec.CompilerOptions), nil
	}
	hash := mapper.TransformIdentity(entry.spec.CompilerOptions).Bytes()
	return mapper.Identity() + ":" + hex.EncodeToString(hash[:]), nil
}

func (p *projectLease) WatchedFiles() ([]string, error) {
	p.host.lifecycleMu.RLock()
	defer p.host.lifecycleMu.RUnlock()
	p.host.mu.Lock()
	defer p.host.mu.Unlock()
	if p.host.projects == nil {
		return nil, nil
	}
	var files []string
	for _, key := range p.entries {
		entry := p.host.projects[key]
		if entry == nil {
			continue
		}
		if entry.mapper.DynamicConfig {
			if err := p.host.openProjectLocked(p.host.ctx, entry); err != nil {
				return nil, err
			}
		}
		files = append(files, entry.watchedFiles...)
	}
	slices.Sort(files)
	return slices.Compact(files), nil
}

func (p *projectLease) Diagnostics() []OptionDiagnostic {
	p.host.lifecycleMu.RLock()
	defer p.host.lifecycleMu.RUnlock()
	p.host.mu.Lock()
	defer p.host.mu.Unlock()
	if p.host.projects == nil {
		return nil
	}
	var diagnostics []OptionDiagnostic
	for _, mapper := range p.mappers {
		entry := p.host.projects[p.entries[mapper]]
		if entry == nil {
			continue
		}
		if !entry.opened {
			continue
		}
		diagnostics = append(diagnostics, entry.optionDiagnostics...)
	}
	return diagnostics
}

func (p *projectLease) Transform(mapper *Mapper, request Request) (Result, error) {
	p.host.lifecycleMu.RLock()
	defer p.host.lifecycleMu.RUnlock()
	p.host.mu.Lock()
	entry := p.host.projects[p.entries[mapper]]
	if entry == nil {
		p.host.mu.Unlock()
		return Result{}, errors.New("content mapper project is closed")
	}
	if err := p.host.openProjectLocked(p.host.ctx, entry); err != nil {
		p.host.mu.Unlock()
		if _, ok := errors.AsType[*InitializeError](err); ok {
			return Result{}, NewTransformError(TransformErrorKindInitialize, err)
		}
		return Result{}, NewTransformError(TransformErrorKindProject, err)
	}
	handle := entry.projectHandle
	p.host.mu.Unlock()
	return p.host.transformLocked(mapper, request, handle)
}

func (p *projectLease) Close() error {
	var result error
	p.once.Do(func() {
		result = p.release()
	})
	return result
}

func (p *projectLease) release() error {
	var result error
	{
		p.host.lifecycleMu.RLock()
		defer p.host.lifecycleMu.RUnlock()
		var releasedIdentities []string
		p.host.mu.Lock()
		p.refs--
		if p.refs < 0 {
			p.host.mu.Unlock()
			panic("content mapper project reference count below zero")
		}
		if p.refs != 0 {
			p.host.mu.Unlock()
			return nil
		}
		if p.host.projectLeases[p.key] == p {
			delete(p.host.projectLeases, p.key)
		}
		for _, key := range p.entries {
			entry := p.host.projects[key]
			if entry == nil {
				continue
			}
			if entry.opened {
				if connEntry := p.host.conns[entry.mapper.Identity()]; connEntry != nil && connEntry.conn != nil {
					result = errors.Join(result, p.host.closeProject(entry.mapper, connEntry.conn, entry.projectHandle))
				}
			}
			delete(p.host.projects, key)
			releasedIdentities = append(releasedIdentities, entry.mapper.Identity())
		}
		p.host.mu.Unlock()
		p.host.release(releasedIdentities)
	}
	return result
}

func (h *host) release(identities []string) {
	var closers []io.Closer
	h.mu.Lock()
	if h.conns != nil {
		for _, identity := range identities {
			entry := h.conns[identity]
			if entry == nil {
				continue
			}
			entry.refs--
			if entry.refs == 0 {
				delete(h.conns, identity)
				if entry.closer != nil {
					closers = append(closers, entry.closer)
				}
			}
		}
	}
	h.mu.Unlock()
	for _, closer := range closers {
		_ = closer.Close()
	}
}

func handshake(ctx context.Context, conn ipc.Conn, diagnosticLocale locale.Locale) (PositionEncoding, string, error) {
	raw, err := conn.Call(ctx, MethodInitialize, InitializeParams{
		ProtocolVersion:   ProtocolVersion,
		Locale:            diagnosticLocale.String(),
		PositionEncodings: []PositionEncoding{PositionEncodingUTF8, PositionEncodingUTF16},
	})
	if err != nil {
		return "", "", err
	}
	var res InitializeResult
	if err := json.Unmarshal(raw, &res); err != nil {
		return "", "", &InitializeError{Kind: InitializeErrorKindInvalidResponse, Detail: err.Error()}
	}
	if res.ProtocolVersion != ProtocolVersion {
		return "", "", &InitializeError{Kind: InitializeErrorKindProtocolVersion, ProtocolVersion: res.ProtocolVersion}
	}
	if res.PositionEncoding != PositionEncodingUTF8 && res.PositionEncoding != PositionEncodingUTF16 {
		return "", "", &InitializeError{Kind: InitializeErrorKindPositionEncoding, PositionEncoding: res.PositionEncoding}
	}
	if strings.TrimSpace(res.DiagnosticSource) == "" {
		return "", "", &InitializeError{Kind: InitializeErrorKindEmptyDiagnosticSource}
	}
	if strings.EqualFold(res.DiagnosticSource, "typescript") || strings.EqualFold(res.DiagnosticSource, "tsc") {
		return "", "", &InitializeError{Kind: InitializeErrorKindReservedDiagnosticSource, DiagnosticSource: res.DiagnosticSource}
	}
	nativeExtensions := core.Flatten(tspath.AllSupportedExtensionsWithJson)
	if slices.ContainsFunc(nativeExtensions, func(extension string) bool {
		return strings.EqualFold(res.DiagnosticSource, strings.TrimPrefix(extension, "."))
	}) {
		return "", "", &InitializeError{Kind: InitializeErrorKindReservedDiagnosticSource, DiagnosticSource: res.DiagnosticSource}
	}
	return res.PositionEncoding, res.DiagnosticSource, nil
}

func decodeTransformResult(raw json.Value, originalText string, positionEncoding PositionEncoding, diagnosticSource string) (Result, error) {
	var res TransformResult
	if err := json.Unmarshal(raw, &res); err != nil {
		return Result{}, err
	}
	mapped, originalPositions, err := decodeMappedOutput(res.MappedOutput, originalText, positionEncoding, diagnosticSource)
	if err != nil {
		return Result{}, err
	}
	result := Result{
		Text:                 mapped.Text,
		VirtualExtension:     mapped.VirtualExtension,
		Mappings:             mapped.Mappings,
		DiagnosticDirectives: mapped.DiagnosticDirectives,
	}
	for supplementalIndex, supplemental := range res.Supplemental {
		mapped, _, err := decodeMappedOutput(supplemental.MappedOutput, originalText, positionEncoding, diagnosticSource)
		if err != nil {
			if directiveError, ok := errors.AsType[*DiagnosticDirectiveError](err); ok {
				directiveError.SupplementalIndex = supplementalIndex
			}
			return Result{}, err
		}
		result.Supplemental = append(result.Supplemental, mapped)
	}
	for _, d := range res.Diagnostics {
		if d.Start < 0 || d.Length < 0 || d.Start > int(^uint(0)>>1)-d.Length {
			return Result{}, fmt.Errorf("invalid content mapper diagnostic range [%d, %d)", d.Start, d.Start+d.Length)
		}
		start, err := originalPositions.normalize(d.Start)
		if err != nil {
			return Result{}, fmt.Errorf("invalid content mapper diagnostic start: %w", err)
		}
		end, err := originalPositions.normalize(d.Start + d.Length)
		if err != nil {
			return Result{}, fmt.Errorf("invalid content mapper diagnostic end: %w", err)
		}
		result.Diagnostics = append(result.Diagnostics, ast.NewExternalDiagnostic(
			nil,
			core.NewTextRange(start, end),
			diagnosticSource,
			diagnostics.CategoryError,
			d.Code,
			d.MessageText,
		))
	}
	return result, nil
}

func decodeMappedOutput(output MappedOutput, originalText string, positionEncoding PositionEncoding, diagnosticSource string) (MappedResult, *positionNormalizer, error) {
	if !IsSupportedVirtualExtension(output.Extension) {
		return MappedResult{}, nil, &InvalidVirtualExtensionError{Extension: output.Extension}
	}
	result := MappedResult{
		Text:             output.Text,
		VirtualExtension: output.Extension,
	}
	virtualPositions, err := newPositionNormalizer(output.Text, positionEncoding)
	if err != nil {
		return MappedResult{}, nil, err
	}
	originalPositions, err := newPositionNormalizer(originalText, positionEncoding)
	if err != nil {
		return MappedResult{}, nil, err
	}
	// A successful transform always carries a span map. Absent or empty mappings describe fully
	// synthesized output (no segment corresponds to the original), so decode to an empty map rather than
	// nil, which would mean "not content-mapped".
	if len(output.Mappings) > 0 {
		mappings, unmarshalErr := spanmap.Unmarshal(output.Mappings)
		if unmarshalErr != nil {
			return MappedResult{}, nil, unmarshalErr
		}
		result.Mappings, err = normalizeMappings(mappings, virtualPositions, originalPositions)
		if err != nil {
			return MappedResult{}, nil, err
		}
	} else {
		result.Mappings = spanmap.New(nil)
	}
	result.DiagnosticDirectives, err = normalizeDiagnosticDirectives(output.DiagnosticDirectives, virtualPositions, originalPositions, diagnosticSource)
	if err != nil {
		return MappedResult{}, nil, err
	}
	return result, originalPositions, nil
}

func normalizeDiagnosticDirectives(diagnosticDirectives *DiagnosticDirectives, virtualPositions, originalPositions *positionNormalizer, diagnosticSource string) ([]ast.MappedDiagnosticDirective, error) {
	if diagnosticDirectives == nil {
		return nil, nil
	}
	directives := diagnosticDirectives.Directives
	result := make([]ast.MappedDiagnosticDirective, len(directives))
	for i, directive := range directives {
		directiveError := func(kind DiagnosticDirectiveErrorKind) *DiagnosticDirectiveError {
			return &DiagnosticDirectiveError{
				Kind:              kind,
				Index:             i,
				SupplementalIndex: -1,
			}
		}
		normalized := ast.MappedDiagnosticDirective{Source: diagnosticSource}
		switch directive.Policy {
		case DiagnosticDirectivePolicyIgnore:
			normalized.Policy = ast.MappedDiagnosticDirectivePolicyIgnore
		case DiagnosticDirectivePolicyExpect:
			unusedDiagnosticIndex := 0
			if directive.UnusedExpectDirectiveIndex != nil {
				unusedDiagnosticIndex = *directive.UnusedExpectDirectiveIndex
			} else if len(diagnosticDirectives.UnusedExpectDirectiveDiagnostics) != 1 {
				return nil, directiveError(DiagnosticDirectiveErrorKindExpectMissingUnusedDiagnostic)
			}
			if unusedDiagnosticIndex < 0 || unusedDiagnosticIndex >= len(diagnosticDirectives.UnusedExpectDirectiveDiagnostics) {
				return nil, directiveError(DiagnosticDirectiveErrorKindInvalidUnusedDiagnosticIndex)
			}
			unusedDiagnostic := diagnosticDirectives.UnusedExpectDirectiveDiagnostics[unusedDiagnosticIndex]
			normalized.Policy = ast.MappedDiagnosticDirectivePolicyExpect
			normalized.UnusedCode = unusedDiagnostic.Code
			normalized.UnusedMessageText = unusedDiagnostic.MessageText
		default:
			validationError := directiveError(DiagnosticDirectiveErrorKindInvalidPolicy)
			validationError.Policy = directive.Policy
			return nil, validationError
		}
		if directive.VirtualStart < 0 || directive.VirtualEnd < directive.VirtualStart {
			return nil, directiveError(DiagnosticDirectiveErrorKindInvalidRange)
		}
		virtualStart, err := virtualPositions.normalize(directive.VirtualStart)
		if err != nil {
			return nil, directiveError(DiagnosticDirectiveErrorKindInvalidRange)
		}
		virtualEnd, err := virtualPositions.normalize(directive.VirtualEnd)
		if err != nil {
			return nil, directiveError(DiagnosticDirectiveErrorKindInvalidRange)
		}
		normalized.VirtualRange = core.NewTextRange(virtualStart, virtualEnd)
		validOriginalRange := directive.OriginalStart >= 0 && directive.OriginalLength >= 0 && directive.OriginalStart <= int(^uint(0)>>1)-directive.OriginalLength
		if validOriginalRange {
			originalStart, startErr := originalPositions.normalize(directive.OriginalStart)
			originalEnd, endErr := originalPositions.normalize(directive.OriginalStart + directive.OriginalLength)
			if startErr == nil && endErr == nil {
				normalized.OriginalRange = core.NewTextRange(originalStart, originalEnd)
			} else {
				validOriginalRange = false
			}
		}
		if normalized.Policy == ast.MappedDiagnosticDirectivePolicyExpect && !validOriginalRange {
			return nil, directiveError(DiagnosticDirectiveErrorKindInvalidRange)
		}
		result[i] = normalized
	}
	type indexedDirective struct {
		directive ast.MappedDiagnosticDirective
		index     int
	}
	sorted := make([]indexedDirective, len(result))
	for i, directive := range result {
		sorted[i] = indexedDirective{directive: directive, index: i}
	}
	slices.SortFunc(sorted, func(a, b indexedDirective) int {
		return cmp.Compare(a.directive.VirtualRange.Pos(), b.directive.VirtualRange.Pos())
	})
	for i := 1; i < len(sorted); i++ {
		if sorted[i].directive.VirtualRange.Pos() < sorted[i-1].directive.VirtualRange.End() {
			return nil, &DiagnosticDirectiveError{Kind: DiagnosticDirectiveErrorKindOverlap, Index: sorted[i].index, SupplementalIndex: -1}
		}
	}
	return result, nil
}

func normalizeMappings(mappings *spanmap.SpanMap, virtualPositions *positionNormalizer, originalPositions *positionNormalizer) (*spanmap.SpanMap, error) {
	segments := mappings.Segments()
	for i := range segments {
		segment := &segments[i]
		var err error
		segment.VirtualStart, err = virtualPositions.normalizeTextPos(segment.VirtualStart)
		if err != nil {
			return nil, fmt.Errorf("invalid content mapper mapping %d virtual start: %w", i, err)
		}
		segment.VirtualEnd, err = virtualPositions.normalizeTextPos(segment.VirtualEnd)
		if err != nil {
			return nil, fmt.Errorf("invalid content mapper mapping %d virtual end: %w", i, err)
		}
		segment.OriginalStart, err = originalPositions.normalizeTextPos(segment.OriginalStart)
		if err != nil {
			return nil, fmt.Errorf("invalid content mapper mapping %d original start: %w", i, err)
		}
		segment.OriginalEnd, err = originalPositions.normalizeTextPos(segment.OriginalEnd)
		if err != nil {
			return nil, fmt.Errorf("invalid content mapper mapping %d original end: %w", i, err)
		}
	}
	return spanmap.New(segments), nil
}

type positionNormalizer struct {
	text        string
	encoding    PositionEncoding
	positionMap *ast.PositionMap
	length      int
}

func newPositionNormalizer(text string, encoding PositionEncoding) (*positionNormalizer, error) {
	normalizer := &positionNormalizer{text: text, encoding: encoding}
	switch encoding {
	case PositionEncodingUTF8:
		normalizer.length = len(text)
	case PositionEncodingUTF16:
		normalizer.positionMap = ast.ComputePositionMap(text)
		normalizer.length = normalizer.positionMap.UTF8ToUTF16(len(text))
	default:
		return nil, fmt.Errorf("unsupported position encoding %q", encoding)
	}
	return normalizer, nil
}

func (n *positionNormalizer) normalizeTextPos(position core.TextPos) (core.TextPos, error) {
	normalized, err := n.normalize(int(position))
	return core.TextPos(normalized), err
}

func (n *positionNormalizer) normalize(position int) (int, error) {
	if position < 0 {
		return 0, fmt.Errorf("position %d is negative", position)
	}
	if position > n.length {
		return 0, fmt.Errorf("position %d exceeds %s length %d", position, n.encoding, n.length)
	}
	var bytePosition int
	switch n.encoding {
	case PositionEncodingUTF8:
		bytePosition = position
	case PositionEncodingUTF16:
		bytePosition = n.positionMap.UTF16ToUTF8(position)
	}
	if bytePosition < len(n.text) && !utf8.RuneStart(n.text[bytePosition]) {
		return 0, fmt.Errorf("position %d splits a Unicode code point", position)
	}
	return bytePosition, nil
}

// rejectHandler rejects any request initiated by the mapper. The content mapper protocol is currently
// parent-driven only; a request from the child is a protocol violation.
type rejectHandler struct{}

func (rejectHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	return nil, fmt.Errorf("content mapper sent an unexpected request: %s", method)
}

func (rejectHandler) HandleNotification(ctx context.Context, method string, params json.Value) error {
	return nil
}

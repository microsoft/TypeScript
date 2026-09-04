package contentmapper_test

import (
	"context"
	"errors"
	"fmt"
	"io"
	"net"
	"slices"
	"strings"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

// fakeMapper is an in-process mapper that transforms content verbatim and reports one diagnostic.
type fakeMapper struct{}

type responseMapper struct {
	response func(contentmapper.TransformParams) any
}

func (m responseMapper) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return contentmapper.InitializeResult{PositionEncoding: contentmapper.PositionEncodingUTF8, DiagnosticSource: "mapper"}, nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		return m.response(p), nil
	default:
		return nil, fmt.Errorf("unexpected method %s", method)
	}
}

func (responseMapper) HandleNotification(ctx context.Context, method string, params json.Value) error {
	return nil
}

func (fakeMapper) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return contentmapper.InitializeResult{PositionEncoding: contentmapper.PositionEncodingUTF8, DiagnosticSource: "vue"}, nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		mappings, err := spanmap.New([]spanmap.Segment{{
			VirtualEnd:  core.TextPos(len(p.Content)),
			OriginalEnd: core.TextPos(len(p.Content)),
			Kind:        spanmap.KindVerbatim,
		}}).Marshal()
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{
			MappedOutput: contentmapper.MappedOutput{Text: p.Content, Extension: ".ts", Mappings: json.Value(mappings)},
			Diagnostics: []contentmapper.Diagnostic{{
				MessageText: "boom",
				Start:       0,
				Length:      min(3, len(p.Content)),
				Code:        9999,
			}},
		}, nil
	default:
		return nil, fmt.Errorf("unexpected method %s", method)
	}
}

type unicodeMapper struct {
	encoding contentmapper.PositionEncoding
	source   *string
}

func protocolDiagnosticDirectives(directives []contentmapper.MappedDiagnosticDirective, unused ...contentmapper.UnusedExpectDirectiveDiagnostic) *contentmapper.DiagnosticDirectives {
	return &contentmapper.DiagnosticDirectives{
		UnusedExpectDirectiveDiagnostics: unused,
		Directives:                       directives,
	}
}

func (m unicodeMapper) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		var p contentmapper.InitializeParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		offered := slices.Contains(p.PositionEncodings, m.encoding)
		if !offered && (m.encoding == contentmapper.PositionEncodingUTF8 || m.encoding == contentmapper.PositionEncodingUTF16) {
			return nil, fmt.Errorf("position encoding %q was not offered", m.encoding)
		}
		source := "mapper"
		if m.source != nil {
			source = *m.source
		}
		return contentmapper.InitializeResult{PositionEncoding: m.encoding, DiagnosticSource: source}, nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		var emojiLength, textLength int
		switch m.encoding {
		case contentmapper.PositionEncodingUTF8:
			emojiLength, textLength = 2, 3
		case contentmapper.PositionEncodingUTF16:
			emojiLength, textLength = 1, 2
		default:
			return contentmapper.TransformResult{MappedOutput: contentmapper.MappedOutput{Text: p.Content, Extension: ".ts"}}, nil
		}
		mappings, err := json.Marshal([][5]int{
			{0, emojiLength, 0, emojiLength, int(spanmap.KindVerbatim)},
			{emojiLength, textLength - emojiLength, emojiLength, textLength - emojiLength, int(spanmap.KindVerbatim)},
		})
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{
			MappedOutput: contentmapper.MappedOutput{
				Text:      p.Content,
				Extension: ".ts",
				Mappings:  mappings,
				DiagnosticDirectives: protocolDiagnosticDirectives([]contentmapper.MappedDiagnosticDirective{{
					OriginalStart:  emojiLength,
					OriginalLength: textLength - emojiLength,
					VirtualStart:   emojiLength,
					VirtualEnd:     textLength,
					Policy:         contentmapper.DiagnosticDirectivePolicyIgnore,
				}}),
			},
			Diagnostics: []contentmapper.Diagnostic{{
				MessageText: "after non-ASCII character",
				Start:       emojiLength,
				Length:      textLength - emojiLength,
				Code:        1001,
			}},
		}, nil
	default:
		return nil, fmt.Errorf("unexpected method %s", method)
	}
}

func (unicodeMapper) HandleNotification(ctx context.Context, method string, params json.Value) error {
	return nil
}

type invalidDiagnosticMapper struct {
	encoding contentmapper.PositionEncoding
}

func (m invalidDiagnosticMapper) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return contentmapper.InitializeResult{PositionEncoding: m.encoding, DiagnosticSource: "mapper"}, nil
	case contentmapper.MethodTransform:
		return contentmapper.TransformResult{
			MappedOutput: contentmapper.MappedOutput{Extension: ".ts"},
			Diagnostics: []contentmapper.Diagnostic{{
				MessageText: "invalid boundary",
				Start:       1,
				Code:        1002,
			}},
		}, nil
	default:
		return nil, fmt.Errorf("unexpected method %s", method)
	}
}

func (invalidDiagnosticMapper) HandleNotification(ctx context.Context, method string, params json.Value) error {
	return nil
}

func (fakeMapper) HandleNotification(ctx context.Context, method string, params json.Value) error {
	return nil
}

// fakeSpawner serves each spawn request with an in-process mapper over a net.Pipe, counting spawns so
// tests can assert process consolidation. When handler is nil it serves a fakeMapper.
type fakeSpawner struct {
	spawns  atomic.Int32
	closes  atomic.Int32
	handler ipc.Handler
}

type noOpProjectMapper struct{ ipc.Handler }

func (m noOpProjectMapper) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodOpenProject:
		return contentmapper.OpenProjectResult{}, nil
	case contentmapper.MethodCloseProject:
		return nil, nil
	default:
		return m.Handler.HandleRequest(ctx, method, params)
	}
}

func (s *fakeSpawner) Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	s.spawns.Add(1)
	handler := s.handler
	if handler == nil {
		handler = fakeMapper{}
	}
	if _, ok := handler.(interface{ handlesProjects() }); !ok {
		handler = noOpProjectMapper{Handler: handler}
	}
	client, server := net.Pipe()
	go func() { _ = ipc.NewAsyncConn(server, handler).Run(context.Background()) }()
	return &countingReadWriteCloser{ReadWriteCloser: client, closes: &s.closes}, nil
}

type countingReadWriteCloser struct {
	io.ReadWriteCloser
	closes *atomic.Int32
	once   sync.Once
}

func (c *countingReadWriteCloser) Close() error {
	c.once.Do(func() { c.closes.Add(1) })
	return c.ReadWriteCloser.Close()
}

func TestRunnerTransform(t *testing.T) {
	t.Parallel()
	r := contentmapper.NewHost(t.Context(), &fakeSpawner{}, locale.Default)
	defer r.Close()

	mapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".vue"}}, Manifest: contentmapper.Manifest{Name: "vue", Version: "1.0.0", Exec: []string{"vue-mapper"}}}
	result, err := r.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: "export const x = 1;"})
	assert.NilError(t, err)
	assert.Equal(t, result.Text, "export const x = 1;")
	assert.Equal(t, result.VirtualExtension, ".ts")
	assert.Assert(t, result.Mappings != nil)
	assert.Equal(t, len(result.Diagnostics), 1)
	assert.Equal(t, result.Diagnostics[0].Code(), int32(9999))
	assert.Equal(t, result.Diagnostics[0].Source(), "vue")
}

func TestHostLogging(t *testing.T) {
	t.Parallel()
	var mu sync.Mutex
	var logs []string
	logger := func(message string) {
		mu.Lock()
		defer mu.Unlock()
		logs = append(logs, message)
	}
	spawner := contentmapper.SpawnerFunc(func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
		_, _ = io.WriteString(stderr, "mapper diagnostic\n")
		return (&fakeSpawner{}).Spawn(command, dir, stderr)
	})
	host := contentmapper.NewHostWithOptions(t.Context(), spawner, locale.Default, contentmapper.HostOptions{Logger: logger})
	defer host.Close()
	mapper := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Package: "configured", Extensions: []string{".vue"}},
		Manifest:   contentmapper.Manifest{Name: "resolved", Version: "1.0.0", Exec: []string{"mapper"}},
	}
	_, err := host.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: "export const x = 1;"})
	assert.NilError(t, err)

	mu.Lock()
	defer mu.Unlock()
	joined := strings.Join(logs, "\n")
	assert.Assert(t, strings.Contains(joined, `[content mapper: resolved] send: {"jsonrpc":"2.0","id":"api1","method":"initialize"`))
	assert.Assert(t, strings.Contains(joined, `[content mapper: resolved] receive: {"jsonrpc":"2.0","id":"api1","result":`))
	assert.Assert(t, strings.Contains(joined, `[content mapper: resolved] stderr: mapper diagnostic`))
}

func TestHostDiscardsStderrWithoutLogging(t *testing.T) {
	t.Parallel()
	spawner := contentmapper.SpawnerFunc(func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
		assert.Equal(t, stderr, io.Discard)
		return (&fakeSpawner{}).Spawn(command, dir, stderr)
	})
	host := contentmapper.NewHost(t.Context(), spawner, locale.Default)
	defer host.Close()
	mapper := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Package: "configured", Extensions: []string{".vue"}},
		Manifest:   contentmapper.Manifest{Name: "resolved", Version: "1.0.0", Exec: []string{"mapper"}},
	}
	_, err := host.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: "export const x = 1;"})
	assert.NilError(t, err)
}

func TestMapperDiagnosticName(t *testing.T) {
	t.Parallel()
	tests := []struct {
		mapper *contentmapper.Mapper
		want   string
	}{
		{mapper: &contentmapper.Mapper{Definition: contentmapper.Definition{Package: "configured"}, Manifest: contentmapper.Manifest{Name: "resolved"}, ContributionID: "contributed"}, want: "resolved"},
		{mapper: &contentmapper.Mapper{Definition: contentmapper.Definition{Package: "configured"}, ContributionID: "contributed"}, want: "configured"},
		{mapper: &contentmapper.Mapper{ContributionID: "contributed"}, want: "contributed"},
	}
	for _, test := range tests {
		assert.Equal(t, test.mapper.DiagnosticName(), test.want)
	}
}

func TestRunnerTransformResponseValidation(t *testing.T) {
	t.Parallel()
	request := contentmapper.Request{FileName: "/a.vue", Content: "a"}
	mapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".vue"}}, Manifest: contentmapper.Manifest{Name: "mapper", Exec: []string{"mapper"}}}

	t.Run("malformed result fails the request", func(t *testing.T) {
		t.Parallel()
		host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: responseMapper{response: func(p contentmapper.TransformParams) any {
			return map[string]any{"text": 1}
		}}}, locale.Default)
		defer host.Close()
		_, err := host.Transform(mapper, request)
		assert.Assert(t, err != nil)
	})
}

func TestHostClosesProcessWhenReadLoopFails(t *testing.T) {
	t.Parallel()
	closed := make(chan struct{}, 1)
	spawner := contentmapper.SpawnerFunc(func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
		client, server := net.Pipe()
		go func() {
			defer server.Close()
			protocol := ipc.NewJSONRPCProtocol(server)
			message, err := protocol.ReadMessage()
			assert.NilError(t, err)
			assert.Equal(t, message.Method, contentmapper.MethodInitialize)
			assert.NilError(t, protocol.WriteResponse(message.ID, contentmapper.InitializeResult{
				PositionEncoding: contentmapper.PositionEncodingUTF8,
				DiagnosticSource: "mapper",
			}))
			_, err = server.Write([]byte("oops\n"))
			assert.NilError(t, err)
		}()
		return &closeSignalReadWriteCloser{ReadWriteCloser: client, closed: closed}, nil
	})
	host := contentmapper.NewHost(t.Context(), spawner, locale.Default)
	defer host.Close()
	mapper := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "mapper", Exec: []string{"mapper"}}}
	_, err := host.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: ""})
	assert.Assert(t, err != nil)
	processClosed := false
	select {
	case <-closed:
		processClosed = true
	case <-time.After(time.Second):
		processClosed = false
	}
	assert.Assert(t, processClosed, "mapper process was not closed after its read loop failed")
}

func TestHostReportsInitializationTimeoutBeforeClosingProcess(t *testing.T) {
	t.Parallel()
	spawner := contentmapper.SpawnerFunc(func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
		client, server := net.Pipe()
		go func() {
			defer server.Close()
			_, _ = ipc.NewJSONRPCProtocol(server).ReadMessage()
			<-t.Context().Done()
		}()
		return &exitOnCloseReadWriteCloser{ReadWriteCloser: client}, nil
	})
	host := contentmapper.NewHost(t.Context(), spawner, locale.Default)
	defer host.Close()
	mapper := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "mapper", Exec: []string{"mapper"}}}
	_, err := host.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: ""})
	initializeError, ok := errors.AsType[*contentmapper.InitializeError](err)
	assert.Assert(t, ok, "expected InitializeError, got %v", err)
	assert.Equal(t, initializeError.Kind, contentmapper.InitializeErrorKindNoResponse)
}

func TestHostReportsProcessExitBeforeInitialization(t *testing.T) {
	t.Parallel()
	spawner := contentmapper.SpawnerFunc(func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
		client, server := net.Pipe()
		assert.NilError(t, server.Close())
		return &exitedReadWriteCloser{ReadWriteCloser: client, exitCode: 42}, nil
	})
	host := contentmapper.NewHost(t.Context(), spawner, locale.Default)
	defer host.Close()
	mapper := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "mapper", Exec: []string{"mapper"}}}
	_, err := host.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: ""})
	initializeError, ok := errors.AsType[*contentmapper.InitializeError](err)
	assert.Assert(t, ok, "expected InitializeError, got %v", err)
	assert.Equal(t, initializeError.Kind, contentmapper.InitializeErrorKindProcessExit)
	assert.Equal(t, initializeError.ExitCode, 42)
}

type exitedReadWriteCloser struct {
	io.ReadWriteCloser
	exitCode int
}

func (c *exitedReadWriteCloser) ExitCode() (int, bool) {
	return c.exitCode, true
}

type exitOnCloseReadWriteCloser struct {
	io.ReadWriteCloser
	exited atomic.Bool
}

func (c *exitOnCloseReadWriteCloser) Close() error {
	c.exited.Store(true)
	return c.ReadWriteCloser.Close()
}

func (c *exitOnCloseReadWriteCloser) ExitCode() (int, bool) {
	return 1, c.exited.Load()
}

type closeSignalReadWriteCloser struct {
	io.ReadWriteCloser
	closed chan<- struct{}
	once   sync.Once
}

func (c *closeSignalReadWriteCloser) Close() error {
	err := c.ReadWriteCloser.Close()
	c.once.Do(func() { c.closed <- struct{}{} })
	return err
}

func TestRunnerTransformDiagnosticDirectives(t *testing.T) {
	t.Parallel()
	request := contentmapper.Request{FileName: "/a.vue", Content: "directive\nsource"}
	mapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".vue"}}, Manifest: contentmapper.Manifest{Name: "mapper", Exec: []string{"mapper"}}}
	transform := func(output contentmapper.MappedOutput) (contentmapper.Result, error) {
		host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: responseMapper{response: func(p contentmapper.TransformParams) any {
			return contentmapper.TransformResult{MappedOutput: output}
		}}}, locale.Default)
		defer host.Close()
		return host.Transform(mapper, request)
	}

	result, err := transform(contentmapper.MappedOutput{
		Text: "virtual source", Extension: ".ts",
		DiagnosticDirectives: protocolDiagnosticDirectives([]contentmapper.MappedDiagnosticDirective{{
			OriginalStart:  0,
			OriginalLength: 9,
			VirtualStart:   8,
			VirtualEnd:     14,
			Policy:         contentmapper.DiagnosticDirectivePolicyExpect,
		}}, contentmapper.UnusedExpectDirectiveDiagnostic{Code: 2578, MessageText: "Unused framework directive."}),
	})
	assert.NilError(t, err)
	assert.Equal(t, len(result.DiagnosticDirectives), 1)
	directive := result.DiagnosticDirectives[0]
	assert.Equal(t, directive.OriginalRange.Pos(), 0)
	assert.Equal(t, directive.OriginalRange.End(), 9)
	assert.Equal(t, directive.VirtualRange.Pos(), 8)
	assert.Equal(t, directive.VirtualRange.End(), 14)
	assert.Equal(t, directive.Policy, ast.MappedDiagnosticDirectivePolicyExpect)
	assert.Equal(t, directive.UnusedCode, int32(2578))
	assert.Equal(t, directive.UnusedMessageText, "Unused framework directive.")
	assert.Equal(t, directive.Source, "mapper")
	unusedIndex := 1
	result, err = transform(contentmapper.MappedOutput{
		Text: "virtual source", Extension: ".ts",
		DiagnosticDirectives: protocolDiagnosticDirectives([]contentmapper.MappedDiagnosticDirective{{
			OriginalLength:             9,
			VirtualStart:               8,
			VirtualEnd:                 14,
			Policy:                     contentmapper.DiagnosticDirectivePolicyExpect,
			UnusedExpectDirectiveIndex: &unusedIndex,
		}},
			contentmapper.UnusedExpectDirectiveDiagnostic{Code: 1, MessageText: "first"},
			contentmapper.UnusedExpectDirectiveDiagnostic{Code: 2, MessageText: "second"},
		),
	})
	assert.NilError(t, err)
	assert.Equal(t, result.DiagnosticDirectives[0].UnusedCode, int32(2))
	assert.Equal(t, result.DiagnosticDirectives[0].UnusedMessageText, "second")
	_, err = transform(contentmapper.MappedOutput{
		Text: "x", Extension: ".ts",
		DiagnosticDirectives: protocolDiagnosticDirectives([]contentmapper.MappedDiagnosticDirective{{
			OriginalStart: -1,
			Policy:        contentmapper.DiagnosticDirectivePolicyIgnore,
		}}, contentmapper.UnusedExpectDirectiveDiagnostic{}),
	})
	assert.NilError(t, err)

	invalid := []struct {
		name       string
		text       string
		directives []contentmapper.MappedDiagnosticDirective
		kind       contentmapper.DiagnosticDirectiveErrorKind
	}{
		{
			name: "invalid range",
			text: "x",
			directives: []contentmapper.MappedDiagnosticDirective{{
				VirtualStart: -1,
				Policy:       contentmapper.DiagnosticDirectivePolicyIgnore,
			}},
			kind: contentmapper.DiagnosticDirectiveErrorKindInvalidRange,
		},
		{
			name: "unknown policy",
			text: "x",
			directives: []contentmapper.MappedDiagnosticDirective{{
				Policy: 2,
			}},
			kind: contentmapper.DiagnosticDirectiveErrorKindInvalidPolicy,
		},
		{
			name: "expect requires unused diagnostic",
			text: "x",
			directives: []contentmapper.MappedDiagnosticDirective{{
				Policy: contentmapper.DiagnosticDirectivePolicyExpect,
			}},
			kind: contentmapper.DiagnosticDirectiveErrorKindExpectMissingUnusedDiagnostic,
		},
		{
			name: "multiple unused diagnostics require index",
			text: "x",
			directives: []contentmapper.MappedDiagnosticDirective{{
				Policy: contentmapper.DiagnosticDirectivePolicyExpect,
			}},
			kind: contentmapper.DiagnosticDirectiveErrorKindExpectMissingUnusedDiagnostic,
		},
		{
			name: "original range out of bounds",
			text: "x",
			directives: []contentmapper.MappedDiagnosticDirective{{
				OriginalStart: 99,
				Policy:        contentmapper.DiagnosticDirectivePolicyExpect,
			}},
			kind: contentmapper.DiagnosticDirectiveErrorKindInvalidRange,
		},
		{
			name: "virtual range out of bounds",
			text: "x",
			directives: []contentmapper.MappedDiagnosticDirective{{
				VirtualStart: 99,
				Policy:       contentmapper.DiagnosticDirectivePolicyIgnore,
			}},
			kind: contentmapper.DiagnosticDirectiveErrorKindInvalidRange,
		},
		{
			name: "overlap",
			text: "abc",
			directives: []contentmapper.MappedDiagnosticDirective{
				{VirtualEnd: 2, Policy: contentmapper.DiagnosticDirectivePolicyIgnore},
				{VirtualStart: 1, VirtualEnd: 3, Policy: contentmapper.DiagnosticDirectivePolicyIgnore},
			},
			kind: contentmapper.DiagnosticDirectiveErrorKindOverlap,
		},
	}
	for _, test := range invalid {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			diagnosticDirectives := protocolDiagnosticDirectives(test.directives)
			if test.name == "original range out of bounds" {
				diagnosticDirectives.UnusedExpectDirectiveDiagnostics = []contentmapper.UnusedExpectDirectiveDiagnostic{{}}
			} else if test.name == "multiple unused diagnostics require index" {
				diagnosticDirectives.UnusedExpectDirectiveDiagnostics = []contentmapper.UnusedExpectDirectiveDiagnostic{{}, {}}
			}
			_, transformErr := transform(contentmapper.MappedOutput{Text: test.text, Extension: ".ts", DiagnosticDirectives: diagnosticDirectives})
			directiveError, ok := errors.AsType[*contentmapper.DiagnosticDirectiveError](transformErr)
			assert.Assert(t, ok)
			assert.Equal(t, directiveError.Kind, test.kind)
		})
	}
}

func TestMappedDiagnosticDirectiveJSON(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name      string
		directive contentmapper.MappedDiagnosticDirective
		want      string
	}{
		{
			name: "ignore",
			directive: contentmapper.MappedDiagnosticDirective{
				VirtualStart: 8, VirtualEnd: 14,
				OriginalStart: 0, OriginalLength: 9,
				Policy: contentmapper.DiagnosticDirectivePolicyIgnore,
			},
			want: `[0,9,8,14,0]`,
		},
		{
			name: "expect",
			directive: contentmapper.MappedDiagnosticDirective{
				VirtualStart: 8, VirtualEnd: 14,
				OriginalStart: 0, OriginalLength: 9,
				Policy: contentmapper.DiagnosticDirectivePolicyExpect,
			},
			want: `[0,9,8,14,1]`,
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			data, err := json.Marshal(test.directive)
			assert.NilError(t, err)
			assert.Equal(t, string(data), test.want)
			var decoded contentmapper.MappedDiagnosticDirective
			assert.NilError(t, json.Unmarshal(data, &decoded))
			assert.DeepEqual(t, decoded, test.directive)
		})
	}

	for _, data := range []string{
		`[0,0,0,0]`,
		`[0,0,0,0,0,1,2]`,
	} {
		var directive contentmapper.MappedDiagnosticDirective
		assert.ErrorContains(t, json.Unmarshal([]byte(data), &directive), "diagnostic directive tuple")
	}

	unusedIndex := 1
	diagnosticDirectives := contentmapper.DiagnosticDirectives{
		UnusedExpectDirectiveDiagnostics: []contentmapper.UnusedExpectDirectiveDiagnostic{
			{Code: 1, MessageText: "first"},
			{Code: 2, MessageText: "second"},
		},
		Directives: []contentmapper.MappedDiagnosticDirective{{
			OriginalStart: 2, OriginalLength: 3,
			VirtualStart: 5, VirtualEnd: 9,
			Policy:                     contentmapper.DiagnosticDirectivePolicyExpect,
			UnusedExpectDirectiveIndex: &unusedIndex,
		}},
	}
	data, err := json.Marshal(diagnosticDirectives)
	assert.NilError(t, err)
	assert.Equal(t, string(data), `{"unusedExpectDirectiveDiagnostics":[{"code":1,"messageText":"first"},{"code":2,"messageText":"second"}],"directives":[[2,3,5,9,1,1]]}`)
	var decoded contentmapper.DiagnosticDirectives
	assert.NilError(t, json.Unmarshal(data, &decoded))
	assert.DeepEqual(t, decoded, diagnosticDirectives)
}

func TestRunnerTransformSupplementalOutputs(t *testing.T) {
	t.Parallel()
	host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: responseMapper{response: func(p contentmapper.TransformParams) any {
		return contentmapper.TransformResult{
			MappedOutput: contentmapper.MappedOutput{Text: "export default 1;", Extension: ".ts"},
			Supplemental: []contentmapper.SupplementalOutput{
				{MappedOutput: contentmapper.MappedOutput{
					Text: "declare const first: string;", Extension: ".ts",
					DiagnosticDirectives: protocolDiagnosticDirectives([]contentmapper.MappedDiagnosticDirective{{
						VirtualEnd: 7,
						Policy:     contentmapper.DiagnosticDirectivePolicyIgnore,
					}}),
				}},
				{MappedOutput: contentmapper.MappedOutput{Text: "declare const second: number;", Extension: ".mjs"}},
			},
		}
	}}}, locale.Default)
	defer host.Close()
	mapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".vue"}}, Manifest: contentmapper.Manifest{Name: "mapper", Exec: []string{"mapper"}}}
	result, err := host.Transform(mapper, contentmapper.Request{FileName: "/component.vue", Content: "component"})
	assert.NilError(t, err)
	assert.Equal(t, len(result.Supplemental), 2)
	assert.Equal(t, result.Supplemental[0].Text, "declare const first: string;")
	assert.Equal(t, result.Supplemental[0].VirtualExtension, ".ts")
	assert.Assert(t, result.Supplemental[0].Mappings != nil)
	assert.Equal(t, len(result.Supplemental[0].DiagnosticDirectives), 1)
	assert.Equal(t, result.Supplemental[0].DiagnosticDirectives[0].VirtualRange.End(), 7)
	assert.Equal(t, result.Supplemental[1].VirtualExtension, ".mjs")
	assert.Assert(t, result.Supplemental[1].Mappings != nil)
}

func TestRunnerTransformInvalidSupplementalDiagnosticDirective(t *testing.T) {
	t.Parallel()
	host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: responseMapper{response: func(p contentmapper.TransformParams) any {
		return contentmapper.TransformResult{
			MappedOutput: contentmapper.MappedOutput{Text: "export {};", Extension: ".ts"},
			Supplemental: []contentmapper.SupplementalOutput{
				{MappedOutput: contentmapper.MappedOutput{Text: "export {};", Extension: ".ts"}},
				{
					MappedOutput: contentmapper.MappedOutput{
						Text: "export {};", Extension: ".ts",
						DiagnosticDirectives: protocolDiagnosticDirectives([]contentmapper.MappedDiagnosticDirective{{
							Policy: contentmapper.DiagnosticDirectivePolicyExpect,
						}}),
					},
				},
			},
		}
	}}}, locale.Default)
	defer host.Close()
	mapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".vue"}}, Manifest: contentmapper.Manifest{Name: "mapper", Exec: []string{"mapper"}}}
	_, err := host.Transform(mapper, contentmapper.Request{FileName: "/component.vue", Content: "component"})
	directiveError, ok := errors.AsType[*contentmapper.DiagnosticDirectiveError](err)
	assert.Assert(t, ok)
	assert.Equal(t, directiveError.Kind, contentmapper.DiagnosticDirectiveErrorKindExpectMissingUnusedDiagnostic)
	assert.Equal(t, directiveError.Index, 0)
	assert.Equal(t, directiveError.SupplementalIndex, 1)
}

func TestRunnerRejectsInvalidVirtualExtension(t *testing.T) {
	t.Parallel()
	for _, supplemental := range []bool{false, true} {
		for _, extension := range []string{"", ".coffee"} {
			t.Run(fmt.Sprintf("supplemental=%t/%s", supplemental, extension), func(t *testing.T) {
				t.Parallel()
				host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: responseMapper{response: func(p contentmapper.TransformParams) any {
					canonicalExtension := extension
					var supplementalOutputs []contentmapper.SupplementalOutput
					if supplemental {
						canonicalExtension = ".ts"
						supplementalOutputs = []contentmapper.SupplementalOutput{{MappedOutput: contentmapper.MappedOutput{Text: "export {};", Extension: extension}}}
					}
					return contentmapper.TransformResult{
						MappedOutput: contentmapper.MappedOutput{Text: "export {};", Extension: canonicalExtension},
						Supplemental: supplementalOutputs,
					}
				}}}, locale.Default)
				defer host.Close()
				mapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".vue"}}, Manifest: contentmapper.Manifest{Name: "mapper", Exec: []string{"mapper"}}}
				_, err := host.Transform(mapper, contentmapper.Request{FileName: "/component.vue", Content: "component"})
				assert.ErrorContains(t, err, "invalid virtual extension")
			})
		}
	}
}

func TestRunnerPositionEncodings(t *testing.T) {
	t.Parallel()
	for _, encoding := range []contentmapper.PositionEncoding{
		contentmapper.PositionEncodingUTF8,
		contentmapper.PositionEncodingUTF16,
	} {
		t.Run(string(encoding), func(t *testing.T) {
			t.Parallel()
			r := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: unicodeMapper{encoding: encoding}}, locale.Default)
			defer r.Close()
			mapper := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: string(encoding), Exec: []string{"mapper"}}}
			result, err := r.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: "éx"})
			assert.NilError(t, err)
			segments := result.Mappings.Segments()
			assert.Equal(t, len(segments), 2)
			assert.Equal(t, int(segments[0].VirtualEnd), 2)
			assert.Equal(t, int(segments[0].OriginalEnd), 2)
			assert.Equal(t, int(segments[1].VirtualStart), 2)
			assert.Equal(t, int(segments[1].OriginalStart), 2)
			assert.Equal(t, result.Text, "éx")
			problem := result.Mappings.Validate(result.Text, "éx")
			assert.Assert(t, problem == nil, "%v", problem)
			mapped, fidelity := result.Mappings.VirtualToOriginalPosition(2)
			assert.Equal(t, int(mapped), 2)
			assert.Equal(t, fidelity, spanmap.FidelityExact)
			assert.Equal(t, result.Diagnostics[0].Pos(), 2)
			assert.Equal(t, result.Diagnostics[0].End(), 3)
			assert.Equal(t, result.DiagnosticDirectives[0].OriginalRange.Pos(), 2)
			assert.Equal(t, result.DiagnosticDirectives[0].OriginalRange.End(), 3)
			assert.Equal(t, result.DiagnosticDirectives[0].VirtualRange.Pos(), 2)
			assert.Equal(t, result.DiagnosticDirectives[0].VirtualRange.End(), 3)
		})
	}
}

func TestRunnerRejectsUnsupportedPositionEncoding(t *testing.T) {
	t.Parallel()
	r := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: unicodeMapper{encoding: "utf-32"}}, locale.Default)
	defer r.Close()
	mapper := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "invalid", Exec: []string{"mapper"}}}
	_, err := r.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: "x"})
	assert.ErrorContains(t, err, "unsupported position encoding")
}

func TestRunnerRejectsInvalidDiagnosticSource(t *testing.T) {
	t.Parallel()
	for _, source := range []string{"", " ", "ts", "TS", "d.ts", "json", "typescript", "TypeScript", "tsc", "TSC"} {
		t.Run(source, func(t *testing.T) {
			t.Parallel()
			handler := unicodeMapper{encoding: contentmapper.PositionEncodingUTF8, source: &source}
			r := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: handler}, locale.Default)
			defer r.Close()
			mapper := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "invalid", Exec: []string{"mapper"}}}
			_, err := r.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: "x"})
			if strings.TrimSpace(source) == "" {
				assert.ErrorContains(t, err, "diagnostic source must not be empty")
			} else {
				assert.ErrorContains(t, err, "is reserved by TypeScript")
			}
		})
	}
}

func TestRunnerRejectsPositionsInsideUnicodeCharacters(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		encoding contentmapper.PositionEncoding
		content  string
	}{
		{encoding: contentmapper.PositionEncodingUTF8, content: "é"},
		{encoding: contentmapper.PositionEncodingUTF16, content: "😀"},
	} {
		t.Run(string(test.encoding), func(t *testing.T) {
			t.Parallel()
			r := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: invalidDiagnosticMapper{encoding: test.encoding}}, locale.Default)
			defer r.Close()
			mapper := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: string(test.encoding), Exec: []string{"mapper"}}}
			_, err := r.Transform(mapper, contentmapper.Request{FileName: "/a.vue", Content: test.content})
			assert.ErrorContains(t, err, "splits a Unicode code point")
		})
	}
}

func TestRunnerConsolidatesByIdentity(t *testing.T) {
	t.Parallel()
	var spawner fakeSpawner
	r := contentmapper.NewHost(t.Context(), &spawner, locale.Default)
	defer r.Close()

	// Two logically-separate mappers with the same identity share one process.
	vueA := &contentmapper.Mapper{Definition: contentmapper.Definition{Package: "a"}, Manifest: contentmapper.Manifest{Name: "vue", Version: "1.0.0", Exec: []string{"vue-mapper"}}}
	vueB := &contentmapper.Mapper{Definition: contentmapper.Definition{Package: "b"}, Manifest: contentmapper.Manifest{Name: "vue", Version: "1.0.0", Exec: []string{"vue-mapper"}}}
	svelte := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "svelte", Version: "2.0.0", Exec: []string{"svelte-mapper"}}}
	project := r.Project(contentmapper.ProjectSpec{Mappers: []*contentmapper.Mapper{vueA, vueB, svelte}, CompilerOptions: &core.CompilerOptions{}})
	defer project.Close()

	for _, m := range []*contentmapper.Mapper{vueA, vueB, vueA, svelte} {
		_, err := project.Transform(m, contentmapper.Request{FileName: "/x", Content: "y"})
		assert.NilError(t, err)
	}
	assert.Equal(t, spawner.spawns.Load(), int32(2), "expected one process per identity")
}

func TestRunnerLeaseLifecycle(t *testing.T) {
	t.Parallel()
	var spawner fakeSpawner
	r := contentmapper.NewHost(t.Context(), &spawner, locale.Default)
	defer r.Close()

	vueA := &contentmapper.Mapper{Definition: contentmapper.Definition{Package: "a"}, Manifest: contentmapper.Manifest{Name: "vue", Version: "1.0.0", Exec: []string{"vue-mapper"}}}
	vueB := &contentmapper.Mapper{Definition: contentmapper.Definition{Package: "b"}, Manifest: contentmapper.Manifest{Name: "vue", Version: "1.0.0", Exec: []string{"vue-mapper"}}}
	svelte := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "svelte", Version: "2.0.0", Exec: []string{"svelte-mapper"}}}

	releaseVueA := r.Acquire([]*contentmapper.Mapper{vueA, vueA})
	releaseVueB := r.Acquire([]*contentmapper.Mapper{vueB})
	releaseSvelte := r.Acquire([]*contentmapper.Mapper{svelte})
	for _, mapper := range []*contentmapper.Mapper{vueA, svelte} {
		_, err := r.Transform(mapper, contentmapper.Request{FileName: "/x", Content: "y"})
		assert.NilError(t, err)
	}
	assert.Equal(t, spawner.spawns.Load(), int32(2))

	releaseVueA()
	assert.Equal(t, spawner.closes.Load(), int32(0), "shared vue process should remain owned")
	releaseSvelte()
	assert.Equal(t, spawner.closes.Load(), int32(1), "final release should close the process")
	releaseVueB()
	releaseVueB()
	assert.Equal(t, spawner.closes.Load(), int32(2), "final vue owner should close once")

	releaseNew := r.Acquire([]*contentmapper.Mapper{vueA})
	_, err := r.Transform(vueA, contentmapper.Request{FileName: "/x", Content: "y"})
	assert.NilError(t, err)
	assert.Equal(t, spawner.spawns.Load(), int32(3), "reacquiring should spawn a fresh process lazily")
	releaseNew()
	assert.Equal(t, spawner.closes.Load(), int32(3))
}

// recordingMapper captures project configuration and lifecycle requests for host protocol tests.
type recordingMapper struct {
	mu                sync.Mutex
	received          string
	receivedOptions   string
	receivedLocale    string
	projectHandles    []string
	closedHandles     []string
	transformHandle   string
	transformParams   string
	watchedFiles      []string
	configIdentity    *string
	dynamicConfig     bool
	optionDiagnostics []contentmapper.OptionDiagnosticResult
}

type blockingMapper struct {
	recordingMapper
	started chan struct{}
	proceed chan struct{}
}

func (*recordingMapper) handlesProjects() {}

func (m *blockingMapper) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	if method == contentmapper.MethodTransform {
		close(m.started)
		<-m.proceed
	}
	return m.recordingMapper.HandleRequest(ctx, method, params)
}

func (m *recordingMapper) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		var p contentmapper.InitializeParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		m.mu.Lock()
		m.receivedLocale = p.Locale
		m.mu.Unlock()
		return contentmapper.InitializeResult{PositionEncoding: contentmapper.PositionEncodingUTF8, DiagnosticSource: "mapper"}, nil
	case contentmapper.MethodOpenProject:
		var p contentmapper.OpenProjectParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		raw, err := json.Marshal(p.CompilerOptions)
		if err != nil {
			return nil, err
		}
		m.mu.Lock()
		m.projectHandles = append(m.projectHandles, p.ProjectHandle)
		m.received = string(raw)
		m.receivedOptions = string(p.Options)
		watchedFiles := m.watchedFiles
		dynamicConfig := m.dynamicConfig
		configIdentityOverride := m.configIdentity
		optionDiagnostics := m.optionDiagnostics
		m.mu.Unlock()
		if !dynamicConfig && watchedFiles == nil && configIdentityOverride == nil && len(optionDiagnostics) == 0 {
			return contentmapper.OpenProjectResult{}, nil
		}
		if dynamicConfig && watchedFiles == nil {
			watchedFiles = []string{tspath.CombinePaths(tspath.GetDirectoryPath(p.ConfigFileName), "mapper.config.js")}
		}
		configIdentity := ""
		if dynamicConfig {
			configIdentity = "config:" + string(p.Options)
		}
		if configIdentityOverride != nil {
			configIdentity = *configIdentityOverride
		}
		return contentmapper.OpenProjectResult{
			ConfigIdentity:    configIdentity,
			WatchedFiles:      watchedFiles,
			OptionDiagnostics: optionDiagnostics,
		}, nil
	case contentmapper.MethodCloseProject:
		var p contentmapper.CloseProjectParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		m.mu.Lock()
		m.closedHandles = append(m.closedHandles, p.ProjectHandle)
		m.mu.Unlock()
		return nil, nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		m.mu.Lock()
		m.transformHandle = p.ProjectHandle
		m.transformParams = string(params)
		m.mu.Unlock()
		return contentmapper.TransformResult{MappedOutput: contentmapper.MappedOutput{Text: p.Content, Extension: ".ts"}}, nil
	default:
		return nil, fmt.Errorf("unexpected method %s", method)
	}
}

func TestProjectLifecycle(t *testing.T) {
	t.Parallel()
	mapperProcess := &recordingMapper{dynamicConfig: true}
	spawner := &fakeSpawner{handler: mapperProcess}
	host := contentmapper.NewHost(t.Context(), spawner, locale.Default)
	defer host.Close()

	staticMapper := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Options: []byte(`{"mode":"static"}`)},
		Manifest:   contentmapper.Manifest{Name: "static", Version: "1.0.0", Exec: []string{"mapper"}},
	}
	staticProject := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/repo/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{staticMapper},
		CompilerOptions: &core.CompilerOptions{},
	})
	assert.Equal(t, spawner.spawns.Load(), int32(0), "static identity should not spawn the mapper")
	staticIdentities, err := staticProject.Identities()
	assert.NilError(t, err)
	assert.Equal(t, len(staticIdentities), 1)
	assert.NilError(t, staticProject.Close())

	dynamicA := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Options: []byte(`{"mode":"a"}`)},
		Manifest:   contentmapper.Manifest{Name: "dynamic", Version: "1.0.0", Exec: []string{"mapper"}, CompilerOptions: []string{"jsx"}, DynamicConfig: true},
	}
	dynamicB := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Options: []byte(`{"mode":"b"}`)},
		Manifest:   contentmapper.Manifest{Name: "dynamic", Version: "1.0.0", Exec: []string{"mapper"}, DynamicConfig: true},
	}
	dynamicAOptions := &core.CompilerOptions{}
	projectA := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/repo/a/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{dynamicA, dynamicB},
		CompilerOptions: dynamicAOptions,
	})
	projectAReversed := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/repo/reversed/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{dynamicB, dynamicA},
		CompilerOptions: dynamicAOptions,
	})
	projectDifferentOptions := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/repo/options/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{dynamicA},
		CompilerOptions: &core.CompilerOptions{Jsx: core.JsxEmitReact},
	})
	projectB := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/repo/b/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{dynamicA},
		CompilerOptions: &core.CompilerOptions{},
	})
	projectAAgain := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/repo/a/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{dynamicA, dynamicB},
		CompilerOptions: dynamicAOptions,
	})
	assert.Equal(t, spawner.spawns.Load(), int32(0), "getting dynamic projects should not start the mapper")
	projectAIdentities, err := projectA.Identities()
	assert.NilError(t, err)
	projectAReversedIdentities, err := projectAReversed.Identities()
	assert.NilError(t, err)
	projectDifferentOptionIdentities, err := projectDifferentOptions.Identities()
	assert.NilError(t, err)
	projectBIdentities, err := projectB.Identities()
	assert.NilError(t, err)
	assert.Equal(t, len(projectAIdentities), 2)
	assert.Equal(t, len(projectAReversedIdentities), 2)
	assert.Equal(t, projectAIdentities[0], projectAReversedIdentities[1])
	assert.Equal(t, projectAIdentities[1], projectAReversedIdentities[0])
	assert.Assert(t, projectAIdentities[0] != projectDifferentOptionIdentities[0])
	assert.Equal(t, len(projectBIdentities), 1)
	assert.Equal(t, spawner.spawns.Load(), int32(1), "dynamic projects should share one mapper process")
	projectAWatchedFiles, err := projectA.WatchedFiles()
	assert.NilError(t, err)
	projectBWatchedFiles, err := projectB.WatchedFiles()
	assert.NilError(t, err)
	assert.Equal(t, len(projectAWatchedFiles), 1)
	assert.Equal(t, len(projectBWatchedFiles), 1)
	assert.Equal(t, projectAWatchedFiles[0].AsString(), "/repo/a/mapper.config.js")
	assert.Equal(t, projectBWatchedFiles[0].AsString(), "/repo/b/mapper.config.js")

	_, err = projectA.Transform(dynamicB, contentmapper.Request{FileName: "/repo/a/file.ext", Content: "x"})
	assert.NilError(t, err)
	mapperProcess.mu.Lock()
	assert.Assert(t, slices.Contains(mapperProcess.projectHandles[:2], mapperProcess.transformHandle))
	mapperProcess.mu.Unlock()

	assert.NilError(t, projectAAgain.Close())
	assert.NilError(t, projectA.Close())
	assert.NilError(t, projectAReversed.Close())
	assert.NilError(t, projectDifferentOptions.Close())
	assert.NilError(t, projectB.Close())
	timings := host.Timings()
	dynamicTimings := timings.Mappers[dynamicA.Identity()]
	assert.Equal(t, dynamicTimings.Spawn.Count, uint64(1))
	assert.Equal(t, dynamicTimings.Initialize.Count, uint64(1))
	assert.Equal(t, dynamicTimings.OpenProject.Count, uint64(6))
	assert.Equal(t, dynamicTimings.Transform.Count, uint64(1))
	assert.Equal(t, dynamicTimings.CloseProject.Count, uint64(6))
	mapperProcess.mu.Lock()
	defer mapperProcess.mu.Unlock()
	assert.Equal(t, len(mapperProcess.projectHandles), 6)
	assert.Equal(t, len(mapperProcess.closedHandles), 6)
}

func TestProjectMethodsAfterHostClose(t *testing.T) {
	t.Parallel()
	mapperProcess := &recordingMapper{dynamicConfig: true}
	host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: mapperProcess}, locale.Default)
	mapper := &contentmapper.Mapper{
		Manifest: contentmapper.Manifest{Name: "dynamic", Version: "1.0.0", Exec: []string{"mapper"}, DynamicConfig: true},
	}
	project := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/repo/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{mapper},
		CompilerOptions: &core.CompilerOptions{},
	})
	defer project.Close()
	_, err := project.Transform(mapper, contentmapper.Request{FileName: "/repo/file.ext", Content: "x"})
	assert.NilError(t, err)
	identity, err := project.Identity(&contentmapper.Mapper{})
	assert.NilError(t, err)
	assert.Equal(t, identity, "")
	assert.NilError(t, host.Close())

	assert.NilError(t, project.Refresh())
	identities, err := project.Identities()
	assert.NilError(t, err)
	assert.Equal(t, len(identities), 0)
	identity, err = project.Identity(mapper)
	assert.NilError(t, err)
	assert.Equal(t, identity, "")
	identity, err = project.Identity(&contentmapper.Mapper{})
	assert.NilError(t, err)
	assert.Equal(t, identity, "")
	watchedFiles, err := project.WatchedFiles()
	assert.NilError(t, err)
	assert.Equal(t, len(watchedFiles), 0)
	assert.Equal(t, len(project.Diagnostics()), 0)
	_, err = project.Transform(mapper, contentmapper.Request{FileName: "/repo/file.ext", Content: "x"})
	assert.ErrorContains(t, err, "content mapper project is closed")
}

func TestProjectRejectsRelativeWatchedFiles(t *testing.T) {
	t.Parallel()
	mapperProcess := &recordingMapper{watchedFiles: []string{"mapper.config.js"}, dynamicConfig: true}
	host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: mapperProcess}, locale.Default)
	defer host.Close()

	projectMapper := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Package: "dynamic"},
		Manifest:   contentmapper.Manifest{Name: "dynamic", Version: "1.0.0", Exec: []string{"mapper"}, DynamicConfig: true},
	}
	project := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/repo/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{projectMapper},
		CompilerOptions: &core.CompilerOptions{},
	})
	_, err := project.Transform(projectMapper, contentmapper.Request{FileName: "/repo/file.ext", Content: "x"})
	transformError, ok := errors.AsType[*contentmapper.TransformError](err)
	assert.Assert(t, ok)
	projectError, ok := errors.AsType[*contentmapper.ProjectError](transformError)
	assert.Assert(t, ok)
	assert.Equal(t, projectError.Kind, contentmapper.ProjectErrorKindNonAbsoluteWatchedFile)
}

func TestDynamicProjectRequiresConfigIdentity(t *testing.T) {
	t.Parallel()
	empty := ""
	mapperProcess := &recordingMapper{configIdentity: &empty, dynamicConfig: true}
	host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: mapperProcess}, locale.Default)
	defer host.Close()

	projectMapper := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Package: "dynamic"},
		Manifest:   contentmapper.Manifest{Name: "dynamic", Version: "1.0.0", Exec: []string{"mapper"}, DynamicConfig: true},
	}
	project := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/repo/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{projectMapper},
		CompilerOptions: &core.CompilerOptions{},
	})
	_, err := project.Transform(projectMapper, contentmapper.Request{FileName: "/repo/file.ext", Content: "x"})
	transformError, ok := errors.AsType[*contentmapper.TransformError](err)
	assert.Assert(t, ok)
	projectError, ok := errors.AsType[*contentmapper.ProjectError](transformError)
	assert.Assert(t, ok)
	assert.Equal(t, projectError.Kind, contentmapper.ProjectErrorKindMissingConfigIdentity)
}

func TestStaticMapperRejectsDynamicProjectResponseFields(t *testing.T) {
	t.Parallel()
	configIdentity := "dynamic"
	for _, test := range []struct {
		name   string
		mapper *recordingMapper
		kind   contentmapper.ProjectErrorKind
	}{
		{name: "config identity", mapper: &recordingMapper{configIdentity: &configIdentity}, kind: contentmapper.ProjectErrorKindUnexpectedConfigIdentity},
		{name: "watched files", mapper: &recordingMapper{watchedFiles: []string{"/repo/mapper.config.js"}}, kind: contentmapper.ProjectErrorKindUnexpectedWatchedFiles},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: test.mapper}, locale.Default)
			defer host.Close()
			projectMapper := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "static", Version: "1.0.0", Exec: []string{"mapper"}}}
			project := host.Project(contentmapper.ProjectSpec{
				ConfigFileName:  "/repo/tsconfig.json",
				Mappers:         []*contentmapper.Mapper{projectMapper},
				CompilerOptions: &core.CompilerOptions{},
			})
			defer project.Close()
			_, err := project.Transform(projectMapper, contentmapper.Request{FileName: "/repo/file.ext", Content: "x"})
			transformError, ok := errors.AsType[*contentmapper.TransformError](err)
			assert.Assert(t, ok)
			projectError, ok := errors.AsType[*contentmapper.ProjectError](transformError)
			assert.Assert(t, ok)
			assert.Equal(t, projectError.Kind, test.kind)
		})
	}
}

func TestProjectRejectsInvalidOptionDiagnosticPath(t *testing.T) {
	t.Parallel()
	mapperProcess := &recordingMapper{optionDiagnostics: []contentmapper.OptionDiagnosticResult{{
		Path:        []json.Value{json.Value(`null`)},
		MessageText: "Invalid option.",
		Code:        123,
	}}}
	host := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: mapperProcess}, locale.Default)
	defer host.Close()
	projectMapper := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "mapper", Version: "1.0.0", Exec: []string{"mapper"}}}
	project := host.Project(contentmapper.ProjectSpec{Mappers: []*contentmapper.Mapper{projectMapper}, CompilerOptions: &core.CompilerOptions{}})
	defer project.Close()
	_, err := project.Transform(projectMapper, contentmapper.Request{FileName: "/repo/file.ext", Content: "x"})
	transformError, ok := errors.AsType[*contentmapper.TransformError](err)
	assert.Assert(t, ok)
	projectError, ok := errors.AsType[*contentmapper.ProjectError](transformError)
	assert.Assert(t, ok)
	assert.Equal(t, projectError.Kind, contentmapper.ProjectErrorKindMalformedResponse)
}

func (m *recordingMapper) HandleNotification(ctx context.Context, method string, params json.Value) error {
	return nil
}

func TestRunnerForwardsProjectOptions(t *testing.T) {
	t.Parallel()
	mapper := &recordingMapper{}
	diagnosticLocale, ok := locale.Parse("cs-CZ")
	assert.Assert(t, ok)
	r := contentmapper.NewHost(t.Context(), &fakeSpawner{handler: mapper}, diagnosticLocale)
	defer r.Close()

	mapperDefinition := &contentmapper.Mapper{Definition: contentmapper.Definition{Options: []byte(`{"strictTemplates":true}`)}, Manifest: contentmapper.Manifest{Name: "vue", Version: "1.0.0", Exec: []string{"vue-mapper"}, CompilerOptions: []string{"target", "jsx"}}}
	compilerOptions := &core.CompilerOptions{Target: core.ScriptTargetES2020, Strict: core.TSTrue}
	project := r.Project(contentmapper.ProjectSpec{Mappers: []*contentmapper.Mapper{mapperDefinition}, CompilerOptions: compilerOptions})
	defer project.Close()
	_, err := project.Transform(
		mapperDefinition,
		contentmapper.Request{
			FileName: "/a.vue",
			Content:  "x",
		},
	)
	assert.NilError(t, err)

	want, err := json.Marshal(compilerOptions)
	assert.NilError(t, err)
	mapper.mu.Lock()
	defer mapper.mu.Unlock()
	assert.Equal(t, mapper.received, string(want))
	assert.Equal(t, mapper.receivedOptions, `{"strictTemplates":true}`)
	assert.Equal(t, mapper.receivedLocale, "cs-CZ")
	assert.Assert(t, !strings.Contains(mapper.transformParams, `"options"`))
	assert.Assert(t, !strings.Contains(mapper.transformParams, `"compilerOptions"`))
}

func TestHostSetLocaleRestartsMapper(t *testing.T) {
	t.Parallel()
	mapper := &recordingMapper{}
	spawner := &fakeSpawner{handler: mapper}
	r := contentmapper.NewHost(t.Context(), spawner, locale.Default)
	defer r.Close()

	definition := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "vue", Version: "1.0.0", Exec: []string{"vue-mapper"}}}
	release := r.Acquire([]*contentmapper.Mapper{definition})
	defer release()

	_, err := r.Transform(definition, contentmapper.Request{FileName: "/a.vue", Content: "x"})
	assert.NilError(t, err)
	assert.Equal(t, spawner.spawns.Load(), int32(1))

	french, ok := locale.Parse("fr")
	assert.Assert(t, ok)
	r.SetLocale(french)
	assert.Equal(t, spawner.closes.Load(), int32(1))

	_, err = r.Transform(definition, contentmapper.Request{FileName: "/a.vue", Content: "x"})
	assert.NilError(t, err)
	assert.Equal(t, spawner.spawns.Load(), int32(2))
	mapper.mu.Lock()
	defer mapper.mu.Unlock()
	assert.Equal(t, mapper.receivedLocale, "fr")
}

func TestHostSetLocaleWaitsForTransform(t *testing.T) {
	t.Parallel()
	mapper := &blockingMapper{started: make(chan struct{}), proceed: make(chan struct{})}
	spawner := &fakeSpawner{handler: mapper}
	r := contentmapper.NewHost(t.Context(), spawner, locale.Default)
	defer r.Close()
	definition := &contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "vue", Version: "1.0.0", Exec: []string{"vue-mapper"}}}

	transformDone := make(chan error)
	go func() {
		_, err := r.Transform(definition, contentmapper.Request{FileName: "/a.vue", Content: "x"})
		transformDone <- err
	}()
	<-mapper.started

	french, ok := locale.Parse("fr")
	assert.Assert(t, ok)
	setStarted := make(chan struct{})
	setDone := make(chan struct{})
	go func() {
		close(setStarted)
		r.SetLocale(french)
		close(setDone)
	}()
	<-setStarted
	setCompleted := false
	select {
	case <-setDone:
		setCompleted = true
	default:
		setCompleted = false
	}
	assert.Assert(t, !setCompleted, "SetLocale completed while a transform was in flight")

	close(mapper.proceed)
	assert.NilError(t, <-transformDone)
	<-setDone
	assert.Equal(t, spawner.closes.Load(), int32(1))
}

package contentmappertest

import (
	"context"
	"fmt"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

const preamble = "const __VERSION = \"1.0.0\";\n"

var DeclaredOptions = []string{"target", "jsx"}

const (
	diagnosticSource          = "box"
	unclosedInterpolationCode = 1000
)

// Handler implements the transforming content mapper protocol.
type Handler struct {
	noNotifications
	mu              sync.Mutex
	compilerOptions map[string]*collections.OrderedMap[string, json.Value]
}

var _ ipc.Handler = (*Handler)(nil)

func (h *Handler) OpenProject(p contentmapper.OpenProjectParams) error {
	var options *collections.OrderedMap[string, json.Value]
	if err := json.Unmarshal(p.CompilerOptions, &options); err != nil {
		return err
	}
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.compilerOptions == nil {
		h.compilerOptions = make(map[string]*collections.OrderedMap[string, json.Value])
	}
	h.compilerOptions[p.ProjectHandle] = options
	return nil
}

func (h *Handler) CloseProject(p contentmapper.CloseProjectParams) {
	h.mu.Lock()
	defer h.mu.Unlock()
	delete(h.compilerOptions, p.ProjectHandle)
}

func (h *Handler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult(diagnosticSource), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		h.mu.Lock()
		options := h.compilerOptions[p.ProjectHandle]
		h.mu.Unlock()
		if options == nil {
			return nil, fmt.Errorf("contentmappertest: project %q is not open", p.ProjectHandle)
		}
		text, mappings, diagnostics, diagnosticDirectives, err := transform(p.Content, options)
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{
			Text: text, Extension: mappedExtension(p.Content), Mappings: mappings, DiagnosticDirectives: diagnosticDirectives,
			Diagnostics: diagnostics,
		}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

func mappedExtension(content string) string {
	const prefix = "// @box-extension:"
	if firstLine, _, ok := strings.Cut(content, "\n"); ok && strings.HasPrefix(firstLine, prefix) {
		return strings.TrimSpace(strings.TrimPrefix(firstLine, prefix))
	}
	return ".ts"
}

func transform(content string, options *collections.OrderedMap[string, json.Value]) (string, json.Value, []contentmapper.Diagnostic, *contentmapper.DiagnosticDirectives, error) {
	var virtual strings.Builder
	var segments []spanmap.Segment
	var diagnostics []contentmapper.Diagnostic

	virtual.WriteString(preamble)

	writeVerbatim := func(from, to int) {
		if to <= from {
			return
		}
		virtualStart := core.TextPos(virtual.Len())
		virtual.WriteString(content[from:to])
		segments = append(segments, spanmap.Segment{
			VirtualStart:  virtualStart,
			VirtualEnd:    core.TextPos(virtual.Len()),
			OriginalStart: core.TextPos(from),
			OriginalEnd:   core.TextPos(to),
			Kind:          spanmap.KindVerbatim,
			Features:      spanmap.FeatureAll,
		})
	}

	writeAtom := func(value string, from, to int) {
		virtualStart := core.TextPos(virtual.Len())
		virtual.WriteString(value)
		segments = append(segments, spanmap.Segment{
			VirtualStart:  virtualStart,
			VirtualEnd:    core.TextPos(virtual.Len()),
			OriginalStart: core.TextPos(from),
			OriginalEnd:   core.TextPos(to),
			Kind:          spanmap.KindAtom,
			Features:      spanmap.FeatureAll,
		})
	}

	pos := 0
	for pos < len(content) {
		rel := strings.Index(content[pos:], "#{")
		if rel < 0 {
			writeVerbatim(pos, len(content))
			break
		}
		tokenStart := pos + rel

		lineEnd := tokenStart + strings.IndexByte(content[tokenStart:], '\n')
		if lineEnd < tokenStart {
			lineEnd = len(content)
		}
		closeRel := strings.IndexByte(content[tokenStart:lineEnd], '}')
		if closeRel < 0 {
			writeVerbatim(pos, tokenStart)
			writeAtom("undefined", tokenStart, lineEnd)
			diagnostics = append(diagnostics, contentmapper.Diagnostic{
				MessageText: "Unclosed interpolation.",
				Start:       tokenStart,
				Length:      lineEnd - tokenStart,
				Code:        unclosedInterpolationCode,
			})
			pos = lineEnd
			continue
		}
		tokenEnd := tokenStart + closeRel + 1
		name := content[tokenStart+len("#{") : tokenEnd-len("}")]

		writeVerbatim(pos, tokenStart)
		writeAtom(renderOption(options, name), tokenStart, tokenEnd)
		pos = tokenEnd
	}

	spanMap := spanmap.New(segments)
	mappings, err := spanMap.Marshal()
	if err != nil {
		return "", nil, nil, nil, err
	}
	return virtual.String(), json.Value(mappings), diagnostics, diagnosticDirectives(content, spanMap), nil
}

func diagnosticDirectives(content string, mappings *spanmap.SpanMap) *contentmapper.DiagnosticDirectives {
	wrap := func(directives []contentmapper.MappedDiagnosticDirective, unused ...contentmapper.UnusedExpectDirectiveDiagnostic) *contentmapper.DiagnosticDirectives {
		return &contentmapper.DiagnosticDirectives{UnusedExpectDirectiveDiagnostics: unused, Directives: directives}
	}
	const invalidPrefix = "// @box-invalid-directive:"
	if strings.HasPrefix(content, invalidPrefix) {
		switch strings.TrimSpace(strings.TrimPrefix(strings.SplitN(content, "\n", 2)[0], invalidPrefix)) {
		case "invalid-range":
			return wrap([]contentmapper.MappedDiagnosticDirective{{VirtualStart: -1, Policy: contentmapper.DiagnosticDirectivePolicyIgnore}})
		case "original-range-out-of-bounds":
			return wrap([]contentmapper.MappedDiagnosticDirective{{OriginalStart: len(content) + 1, Policy: contentmapper.DiagnosticDirectivePolicyIgnore}})
		case "virtual-range-out-of-bounds":
			return wrap([]contentmapper.MappedDiagnosticDirective{{VirtualStart: 1 << 20, VirtualEnd: 1 << 20, Policy: contentmapper.DiagnosticDirectivePolicyIgnore}})
		case "invalid-policy":
			return wrap([]contentmapper.MappedDiagnosticDirective{{Policy: 2}})
		case "ignore-with-unused-diagnostic":
			return wrap([]contentmapper.MappedDiagnosticDirective{{Policy: contentmapper.DiagnosticDirectivePolicyIgnore}}, contentmapper.UnusedExpectDirectiveDiagnostic{})
		case "expect-without-unused-diagnostic":
			return wrap([]contentmapper.MappedDiagnosticDirective{{Policy: contentmapper.DiagnosticDirectivePolicyExpect}})
		case "invalid-unused-diagnostic-index":
			index := 1
			return wrap(
				[]contentmapper.MappedDiagnosticDirective{{Policy: contentmapper.DiagnosticDirectivePolicyExpect, UnusedExpectDirectiveIndex: &index}},
				contentmapper.UnusedExpectDirectiveDiagnostic{},
			)
		case "overlap":
			return wrap([]contentmapper.MappedDiagnosticDirective{
				{VirtualEnd: 2, Policy: contentmapper.DiagnosticDirectivePolicyIgnore},
				{VirtualStart: 1, VirtualEnd: 3, Policy: contentmapper.DiagnosticDirectivePolicyIgnore},
			})
		}
	}
	const ignorePrefix = "// @box-ignore"
	const expectPrefix = "// @box-expect-error"
	var result []contentmapper.MappedDiagnosticDirective
	var unusedDiagnostics []contentmapper.UnusedExpectDirectiveDiagnostic
	for lineStart := 0; lineStart < len(content); {
		lineEnd := strings.IndexByte(content[lineStart:], '\n')
		if lineEnd < 0 {
			lineEnd = len(content)
		} else {
			lineEnd += lineStart
		}
		line := content[lineStart:lineEnd]
		trimmed := strings.TrimSpace(line)
		var policy contentmapper.DiagnosticDirectivePolicy
		hasPolicy := false
		unusedDiagnosticIndex := -1
		switch {
		case trimmed == ignorePrefix:
			policy = contentmapper.DiagnosticDirectivePolicyIgnore
			hasPolicy = true
		case strings.HasPrefix(trimmed, expectPrefix+":"):
			policy = contentmapper.DiagnosticDirectivePolicyExpect
			hasPolicy = true
			unusedDiagnosticIndex = len(unusedDiagnostics)
			unusedDiagnostics = append(unusedDiagnostics, contentmapper.UnusedExpectDirectiveDiagnostic{
				Code:        2578,
				MessageText: strings.TrimSpace(strings.TrimPrefix(trimmed, expectPrefix+":")),
			})
		}
		if hasPolicy && lineEnd < len(content) {
			affectedStart := lineEnd + 1
			affectedLength := strings.IndexByte(content[affectedStart:], '\n')
			if affectedLength < 0 {
				affectedLength = len(content) - affectedStart
			}
			virtualSpans := mappings.OriginalToVirtualSpans(core.NewTextRange(affectedStart, affectedStart+affectedLength), spanmap.FeatureAll)
			if len(virtualSpans) == 1 {
				directive := contentmapper.MappedDiagnosticDirective{
					OriginalStart:  lineStart,
					OriginalLength: lineEnd - lineStart,
					VirtualStart:   virtualSpans[0].Span.Pos(),
					VirtualEnd:     virtualSpans[0].Span.End(),
					Policy:         policy,
				}
				if unusedDiagnosticIndex >= 0 {
					directive.UnusedExpectDirectiveIndex = &unusedDiagnosticIndex
				}
				result = append(result, directive)
			}
		}
		if lineEnd == len(content) {
			break
		}
		lineStart = lineEnd + 1
	}
	if len(unusedDiagnostics) == 1 {
		for i := range result {
			result[i].UnusedExpectDirectiveIndex = nil
		}
	}
	if len(result) == 0 && len(unusedDiagnostics) == 0 {
		return nil
	}
	return wrap(result, unusedDiagnostics...)
}

func renderOption(options *collections.OrderedMap[string, json.Value], name string) string {
	if options != nil {
		if value, ok := options.Get(name); ok && len(value) > 0 {
			return string(value)
		}
	}
	return "undefined"
}

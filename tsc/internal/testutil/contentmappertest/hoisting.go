package contentmappertest

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

type hoistingHandler struct{ noNotifications }

func (hoistingHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		text, mappings, err := transformHoisting(p.Content)
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{Text: text, Extension: ".ts", Mappings: mappings}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

// transformHoisting emits the script body inside a render function, but lifts the leading run of import
// declarations above it, so the virtual text is laid out as:
//
//	///<reference types="svelte" />
//	;
//	import { existing } from "./dep";      <- original [importsStart, importsEnd)
//	function $$render() {
//	<whitespace before the first import>   <- original [scriptStart, importsStart)
//	<script body after the last import>    <- original [importsEnd, scriptEnd)
//	}
//
// This mirrors the layout svelte2tsx produces for a component. Hoisting splits the script into segments
// that are contiguous in the original but disjoint in the virtual text, so the original position at a
// splice point (importsStart) lies on the boundary of two verbatim segments and projects to two distinct
// exact virtual positions.
func transformHoisting(content string) (string, json.Value, error) {
	var virtual strings.Builder
	var segments []spanmap.Segment

	writeMapped := func(originalStart, originalEnd int) {
		virtualStart := core.TextPos(virtual.Len())
		virtual.WriteString(content[originalStart:originalEnd])
		segments = append(segments, spanmap.Segment{
			VirtualStart:  virtualStart,
			VirtualEnd:    core.TextPos(virtual.Len()),
			OriginalStart: core.TextPos(originalStart),
			OriginalEnd:   core.TextPos(originalEnd),
			Kind:          spanmap.KindVerbatim,
			Features:      spanmap.FeatureAll,
		})
	}

	scriptStart, scriptEnd, err := scriptRange(content)
	if err != nil {
		return "", nil, err
	}
	importsStart, importsEnd := leadingImportRange(content, scriptStart, scriptEnd)

	virtual.WriteString("///<reference types=\"svelte\" />\n;\n")
	writeMapped(importsStart, importsEnd)
	virtual.WriteString("\nfunction $$render() {")
	writeMapped(scriptStart, importsStart)
	writeMapped(importsEnd, scriptEnd)
	virtual.WriteString("\n;\nreturn { props: {} as Record<string, never> }}\n")

	mappings, err := spanmap.New(segments).Marshal()
	if err != nil {
		return "", nil, err
	}
	return virtual.String(), json.Value(mappings), nil
}

func scriptRange(content string) (start, end int, err error) {
	scriptOpen := strings.Index(content, "<script")
	if scriptOpen < 0 {
		return 0, 0, errors.New("contentmappertest: missing <script> tag")
	}
	openEndRel := strings.IndexByte(content[scriptOpen:], '>')
	if openEndRel < 0 {
		return 0, 0, errors.New("contentmappertest: unclosed <script> tag")
	}
	start = scriptOpen + openEndRel + 1
	closeRel := strings.Index(content[start:], "</script>")
	if closeRel < 0 {
		return 0, 0, errors.New("contentmappertest: missing </script> tag")
	}
	return start, start + closeRel, nil
}

// leadingImportRange returns the range covering the run of import declarations at the top of the script
// body, skipping the whitespace that precedes them.
func leadingImportRange(content string, scriptStart, scriptEnd int) (start, end int) {
	start = scriptStart
	for start < scriptEnd && isSpaceByte(content[start]) {
		start++
	}
	end = start
	for end < scriptEnd && strings.HasPrefix(content[end:scriptEnd], "import ") {
		lineEnd := strings.IndexByte(content[end:scriptEnd], '\n')
		if lineEnd < 0 {
			end = scriptEnd
			break
		}
		end += lineEnd
		for end < scriptEnd && isSpaceByte(content[end]) {
			end++
		}
	}
	for end > start && isSpaceByte(content[end-1]) {
		end--
	}
	return start, end
}

func isSpaceByte(ch byte) bool {
	return ch == ' ' || ch == '\t' || ch == '\r' || ch == '\n'
}

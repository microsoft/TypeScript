package contentmappertest

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/contentmapper"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/spanmap"
)

type componentHandler struct{ noNotifications }

func (componentHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		text, mappings, err := transformComponent(p.Content)
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{MappedOutput: contentmapper.MappedOutput{Text: text, Extension: ".ts", Mappings: mappings}}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

func transformComponent(content string) (string, json.Value, error) {
	var virtual strings.Builder
	var segments []spanmap.Segment

	writeSynthesized := func(text string) {
		virtual.WriteString(text)
	}
	writeMapped := func(text string, originalStart, originalEnd int, kind spanmap.Kind) {
		virtualStart := core.TextPos(virtual.Len())
		virtual.WriteString(text)
		segments = append(segments, spanmap.Segment{
			VirtualStart:  virtualStart,
			VirtualEnd:    core.TextPos(virtual.Len()),
			OriginalStart: core.TextPos(originalStart),
			OriginalEnd:   core.TextPos(originalEnd),
			Kind:          kind,
			Features:      spanmap.FeatureAll,
		})
	}

	scriptOpen := strings.Index(content, "<script")
	if scriptOpen >= 0 {
		openEndRel := strings.IndexByte(content[scriptOpen:], '>')
		if openEndRel < 0 {
			return "", nil, errors.New("contentmappertest: unclosed <script> tag")
		}
		scriptStart := scriptOpen + openEndRel + 1
		closeRel := strings.Index(content[scriptStart:], "</script>")
		if closeRel < 0 {
			return "", nil, errors.New("contentmappertest: missing </script> tag")
		}
		scriptEnd := scriptStart + closeRel
		writeMapped(content[scriptStart:scriptEnd], scriptStart, scriptEnd, spanmap.KindVerbatim)
	}

	writeSynthesized("\nfunction __render() {\n")
	for searchStart := 0; searchStart < len(content); {
		openRel := strings.Index(content[searchStart:], "{{")
		if openRel < 0 {
			break
		}
		exprStart := searchStart + openRel + len("{{")
		closeRel := strings.Index(content[exprStart:], "}}")
		if closeRel < 0 {
			return "", nil, errors.New("contentmappertest: unclosed template expression")
		}
		exprEnd := exprStart + closeRel
		writeSynthesized("  void (")
		for pos := exprStart; pos < exprEnd; {
			if !isIdentifierStart(content[pos]) {
				writeSynthesized(content[pos : pos+1])
				pos++
				continue
			}
			end := pos + 1
			for end < exprEnd && isIdentifierPart(content[end]) {
				end++
			}
			writeMapped(content[pos:end], pos, end, spanmap.KindAtom)
			pos = end
		}
		writeSynthesized(");\n")
		searchStart = exprEnd + len("}}")
	}
	writeSynthesized("}\n")
	if nameStart, nameEnd, ok := componentNameRange(content); ok {
		writeSynthesized("export class ")
		writeMapped(content[nameStart:nameEnd], nameStart, nameEnd, spanmap.KindAtom)
		writeSynthesized(" {}\n")
	}
	writeSynthesized("export default {};\n")

	mappings, err := spanmap.New(segments).Marshal()
	if err != nil {
		return "", nil, err
	}
	return virtual.String(), json.Value(mappings), nil
}

func componentNameRange(content string) (start, end int, ok bool) {
	componentStart := strings.Index(content, "<component")
	if componentStart < 0 {
		return 0, 0, false
	}
	tagEndRel := strings.IndexByte(content[componentStart:], '>')
	if tagEndRel < 0 {
		return 0, 0, false
	}
	tag := content[componentStart : componentStart+tagEndRel]
	nameRel := strings.Index(tag, `name="`)
	if nameRel < 0 {
		return 0, 0, false
	}
	start = componentStart + nameRel + len(`name="`)
	endRel := strings.IndexByte(content[start:], '"')
	if endRel < 0 {
		return 0, 0, false
	}
	return start, start + endRel, true
}

func isIdentifierStart(ch byte) bool {
	return ch == '_' || ch == '$' || ch >= 'A' && ch <= 'Z' || ch >= 'a' && ch <= 'z'
}

func isIdentifierPart(ch byte) bool {
	return isIdentifierStart(ch) || ch >= '0' && ch <= '9'
}

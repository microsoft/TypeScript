package contentmappertest

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

type prefixedSupplementalHandler struct{ noNotifications }

func (prefixedSupplementalHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		const prefix = "/* generated */\n"
		features := spanmap.FeatureAll
		if strings.Contains(p.FileName, "folding-disabled") {
			features = spanmap.FeatureNone
		}
		mappings, err := spanmap.New([]spanmap.Segment{{
			VirtualStart:  core.TextPos(len(prefix)),
			VirtualEnd:    core.TextPos(len(prefix) + len(p.Content)),
			OriginalStart: 0,
			OriginalEnd:   core.TextPos(len(p.Content)),
			Kind:          spanmap.KindVerbatim,
			Features:      features,
		}}).Marshal()
		if err != nil {
			return nil, err
		}
		canonical := contentmapper.MappedOutput{Text: "export {};", Extension: ".ts"}
		if strings.Contains(p.FileName, "folding-duplicate") {
			canonicalMappings, err := spanmap.New([]spanmap.Segment{{
				VirtualStart:  0,
				VirtualEnd:    core.TextPos(len(p.Content)),
				OriginalStart: 0,
				OriginalEnd:   core.TextPos(len(p.Content)),
				Kind:          spanmap.KindVerbatim,
				Features:      spanmap.FeatureAll,
			}}).Marshal()
			if err != nil {
				return nil, err
			}
			canonical = contentmapper.MappedOutput{Text: p.Content, Extension: ".ts", Mappings: json.Value(canonicalMappings)}
		}
		return contentmapper.TransformResult{
			MappedOutput: canonical,
			Supplemental: []contentmapper.SupplementalOutput{{MappedOutput: contentmapper.MappedOutput{
				Text:      prefix + p.Content,
				Extension: ".ts",
				Mappings:  json.Value(mappings),
			}}},
		}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

type unmappedFoldingHandler struct{ noNotifications }

func (unmappedFoldingHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		mappings, err := spanmap.New(nil).Marshal()
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{MappedOutput: contentmapper.MappedOutput{
			Text: `import "a";
import "b";
/*
 * generated
 */
export {};`,
			Extension: ".ts",
			Mappings:  json.Value(mappings),
		}}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

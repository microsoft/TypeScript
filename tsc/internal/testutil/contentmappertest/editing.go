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
		if strings.Contains(p.FileName, "folding-disabled") || strings.Contains(p.FileName, "codelens-disabled") || strings.Contains(p.FileName, "formatting-disabled") {
			features = spanmap.FeatureNone
		}
		supplementalText := prefix + p.Content
		segments := []spanmap.Segment{{
			VirtualStart:  core.TextPos(len(prefix)),
			VirtualEnd:    core.TextPos(len(prefix) + len(p.Content)),
			OriginalStart: 0,
			OriginalEnd:   core.TextPos(len(p.Content)),
			Kind:          spanmap.KindVerbatim,
			Features:      features,
		}}
		if strings.Contains(p.FileName, "formatting-split") {
			secondStart := strings.Index(p.Content, "function second")
			if secondStart < 0 {
				return nil, errors.New("contentmappertest: formatting-split input is missing function second")
			}
			const generated = "const generated={x:1};\n"
			supplementalText = prefix + p.Content[:secondStart] + generated + p.Content[secondStart:]
			segments = []spanmap.Segment{
				{
					VirtualStart:  core.TextPos(len(prefix)),
					VirtualEnd:    core.TextPos(len(prefix) + secondStart),
					OriginalStart: 0,
					OriginalEnd:   core.TextPos(secondStart),
					Kind:          spanmap.KindVerbatim,
					Features:      spanmap.FeatureAll,
				},
				{
					VirtualStart:  core.TextPos(len(prefix) + secondStart + len(generated)),
					VirtualEnd:    core.TextPos(len(supplementalText)),
					OriginalStart: core.TextPos(secondStart),
					OriginalEnd:   core.TextPos(len(p.Content)),
					Kind:          spanmap.KindVerbatim,
					Features:      spanmap.FeatureAll,
				},
			}
		}
		if strings.Contains(p.FileName, "formatting-overlap") {
			secondStart := strings.Index(p.Content, "function second")
			thirdStart := strings.Index(p.Content, "function third")
			if secondStart < 0 || thirdStart < 0 {
				return nil, errors.New("contentmappertest: formatting-overlap input is missing function second or third")
			}
			const wrapperStart = "if (true) {\n"
			const wrapperEnd = "}\n"
			supplementalText = wrapperStart + p.Content[secondStart:] + wrapperEnd
			segments = []spanmap.Segment{{
				VirtualStart:  core.TextPos(len(wrapperStart)),
				VirtualEnd:    core.TextPos(len(wrapperStart) + len(p.Content) - secondStart),
				OriginalStart: core.TextPos(secondStart),
				OriginalEnd:   core.TextPos(len(p.Content)),
				Kind:          spanmap.KindVerbatim,
				Features:      spanmap.FeatureAll,
			}}
			canonicalMappings, err := spanmap.New([]spanmap.Segment{{
				VirtualStart:  0,
				VirtualEnd:    core.TextPos(thirdStart),
				OriginalStart: 0,
				OriginalEnd:   core.TextPos(thirdStart),
				Kind:          spanmap.KindVerbatim,
				Features:      spanmap.FeatureAll,
			}}).Marshal()
			if err != nil {
				return nil, err
			}
			mappings, err := spanmap.New(segments).Marshal()
			if err != nil {
				return nil, err
			}
			return contentmapper.TransformResult{
				Text: p.Content[:thirdStart], Extension: ".ts", Mappings: json.Value(canonicalMappings),
				Supplemental: []contentmapper.SupplementalOutput{{
					Text:      supplementalText,
					Extension: ".ts",
					Mappings:  json.Value(mappings),
				}},
			}, nil
		}
		mappings, err := spanmap.New(segments).Marshal()
		if err != nil {
			return nil, err
		}
		canonical := contentmapper.MappedOutput{Text: "export {};", Extension: ".ts"}
		if strings.Contains(p.FileName, "folding-duplicate") || strings.Contains(p.FileName, "codelens-disabled") || strings.Contains(p.FileName, "codelens-duplicate") {
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
			Supplemental: []contentmapper.SupplementalOutput{{
				Text:      supplementalText,
				Extension: ".ts",
				Mappings:  json.Value(mappings),
			}},
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
		return contentmapper.TransformResult{
			Text: `import "a";
import "b";
/*
 * generated
 */
export {};`,
			Extension: ".ts",
			Mappings:  json.Value(mappings),
		}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

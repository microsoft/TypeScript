package contentmappertest

import (
	"context"
	"fmt"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

type supplementalDiagnosticsHandler struct{ noNotifications }

func (supplementalDiagnosticsHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		const prefix = "missingSupplementalGlobal;\n"
		mappings, err := spanmap.New([]spanmap.Segment{{
			VirtualStart: core.TextPos(len(prefix)),
			VirtualEnd:   core.TextPos(len(prefix) + len(p.Content)),
			OriginalEnd:  core.TextPos(len(p.Content)),
			Kind:         spanmap.KindVerbatim,
			Features:     spanmap.FeatureAll,
		}}).Marshal()
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{
			Text: "export {};", Extension: ".ts",
			Supplemental: []contentmapper.SupplementalOutput{{Text: prefix + p.Content, Extension: ".ts", Mappings: json.Value(mappings)}},
		}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

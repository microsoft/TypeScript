package contentmappertest

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

type lispHandler struct{ noNotifications }

func (lispHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("lisp"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		if strings.TrimSuffix(p.Content, "\n") != `(+ 1 2 "oops")` {
			return nil, fmt.Errorf("contentmappertest: unsupported Lisp expression %q", p.Content)
		}
		mappings, err := spanmap.New([]spanmap.Segment{
			{VirtualStart: 0, VirtualEnd: 3, OriginalStart: 1, OriginalEnd: 2, Kind: spanmap.KindAlias, Features: spanmap.FeatureAll},
			{VirtualStart: 4, VirtualEnd: 5, OriginalStart: 3, OriginalEnd: 4, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
			{VirtualStart: 7, VirtualEnd: 8, OriginalStart: 5, OriginalEnd: 6, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
			{VirtualStart: 10, VirtualEnd: 16, OriginalStart: 7, OriginalEnd: 13, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll},
		}).Marshal()
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{
			Text:      `add(1, 2, "oops");`,
			Extension: ".ts",
			Mappings:  json.Value(mappings),
		}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

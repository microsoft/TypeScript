package contentmappertest

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/contentmapper"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/spanmap"
)

type duplicateHandler struct{ noNotifications }

func (duplicateHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		if strings.Contains(p.FileName, "rename-conflict") {
			virtual := "export const " + p.Content + " = 1;\nconst object = { " + p.Content + " };\n" + p.Content + ";\n"
			first := strings.Index(virtual, p.Content)
			second := strings.Index(virtual[first+len(p.Content):], p.Content) + first + len(p.Content)
			third := strings.Index(virtual[second+len(p.Content):], p.Content) + second + len(p.Content)
			mappings, err := spanmap.New([]spanmap.Segment{
				{VirtualStart: core.TextPos(first), VirtualEnd: core.TextPos(first + len(p.Content)), OriginalStart: 0, OriginalEnd: core.TextPos(len(p.Content)), Kind: spanmap.KindVerbatim, Features: spanmap.FeatureRename},
				{VirtualStart: core.TextPos(second), VirtualEnd: core.TextPos(second + len(p.Content)), OriginalStart: 0, OriginalEnd: core.TextPos(len(p.Content)), Kind: spanmap.KindVerbatim, Features: spanmap.FeatureRename},
				{VirtualStart: core.TextPos(third), VirtualEnd: core.TextPos(third + len(p.Content)), OriginalStart: 0, OriginalEnd: core.TextPos(len(p.Content)), Kind: spanmap.KindVerbatim, Features: spanmap.FeatureRename},
			}).Marshal()
			if err != nil {
				return nil, err
			}
			return contentmapper.TransformResult{MappedOutput: contentmapper.MappedOutput{Text: virtual, Extension: ".ts", Mappings: json.Value(mappings)}}, nil
		}
		virtual := "export const " + p.Content + " = 1;\n" + p.Content + ";\n"
		first := len("export const ")
		second := first + len(p.Content) + len(" = 1;\n")
		disabled := strings.Contains(p.FileName, "disabled")
		semanticFeatures := spanmap.FeatureHover | spanmap.FeatureDefinition | spanmap.FeatureReferences | spanmap.FeatureRename
		navigationFeatures := spanmap.FeatureDefinition | spanmap.FeatureReferences | spanmap.FeatureRename
		if disabled {
			semanticFeatures = spanmap.FeatureNone
			navigationFeatures = spanmap.FeatureNone
		}
		mappings, err := spanmap.New([]spanmap.Segment{
			{VirtualStart: core.TextPos(first), VirtualEnd: core.TextPos(first + len(p.Content)), OriginalStart: 0, OriginalEnd: core.TextPos(len(p.Content)), Kind: spanmap.KindVerbatim, Features: semanticFeatures},
			{VirtualStart: core.TextPos(second), VirtualEnd: core.TextPos(second + len(p.Content)), OriginalStart: 0, OriginalEnd: core.TextPos(len(p.Content)), Kind: spanmap.KindVerbatim, Features: navigationFeatures},
		}).Marshal()
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{MappedOutput: contentmapper.MappedOutput{Text: virtual, Extension: ".ts", Mappings: json.Value(mappings)}}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

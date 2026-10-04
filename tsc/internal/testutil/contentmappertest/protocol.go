// Package contentmappertest provides realistic content mapper implementations used by tests.
package contentmappertest

import (
	"context"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

type noNotifications struct{}

func (noNotifications) HandleNotification(ctx context.Context, method string, params json.Value) error {
	return nil
}

func initializeResult(source string) contentmapper.InitializeResult {
	return contentmapper.InitializeResult{
		PositionEncoding: contentmapper.PositionEncodingUTF8,
		DiagnosticSource: source,
	}
}

func identityMappedOutput(content string) (contentmapper.MappedOutput, error) {
	mappings, err := spanmap.New([]spanmap.Segment{{
		VirtualEnd:  core.TextPos(len(content)),
		OriginalEnd: core.TextPos(len(content)),
		Kind:        spanmap.KindVerbatim,
		Features:    spanmap.FeatureAll,
	}}).Marshal()
	if err != nil {
		return contentmapper.MappedOutput{}, err
	}
	return contentmapper.MappedOutput{Text: content, Extension: ".ts", Mappings: json.Value(mappings)}, nil
}

type staticProjectHandler struct{ ipc.Handler }

type projectLifecycleHandler interface {
	OpenProject(params contentmapper.OpenProjectParams) error
	CloseProject(params contentmapper.CloseProjectParams)
}

func (h staticProjectHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodOpenProject:
		var p contentmapper.OpenProjectParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		if handler, ok := h.Handler.(projectLifecycleHandler); ok {
			if err := handler.OpenProject(p); err != nil {
				return nil, err
			}
		}
		var diagnostics []contentmapper.OptionDiagnosticResult
		if string(p.Options) == `{"plugins":[{"name":1}]}` {
			diagnostics = []contentmapper.OptionDiagnosticResult{{
				Path:        []json.Value{json.Value(`"plugins"`), json.Value(`0`), json.Value(`"name"`)},
				MessageText: "Option 'name' requires a string.",
				Code:        123,
			}}
		}
		return contentmapper.OpenProjectResult{OptionDiagnostics: diagnostics}, nil
	case contentmapper.MethodCloseProject:
		var p contentmapper.CloseProjectParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		if handler, ok := h.Handler.(projectLifecycleHandler); ok {
			handler.CloseProject(p)
		}
		return nil, nil
	default:
		return h.Handler.HandleRequest(ctx, method, params)
	}
}

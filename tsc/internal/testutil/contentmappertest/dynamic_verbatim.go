package contentmappertest

import (
	"context"
	"errors"
	"sync/atomic"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// ProjectLifecycle records mapper project protocol calls.
type ProjectLifecycle struct {
	Opens  atomic.Int32
	Closes atomic.Int32
}

type dynamicVerbatimHandler struct {
	verbatimHandler
	lifecycle *ProjectLifecycle
}

func (h dynamicVerbatimHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodOpenProject:
		if h.lifecycle != nil {
			h.lifecycle.Opens.Add(1)
		}
		var p contentmapper.OpenProjectParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		identity := p.ConfigFileName + ":" + string(p.Options)
		var diagnostics []contentmapper.OptionDiagnosticResult
		if string(p.Options) == `{"plugins":[{"name":1}]}` {
			diagnostics = []contentmapper.OptionDiagnosticResult{{
				Path:        []json.Value{json.Value(`"plugins"`), json.Value(`0`), json.Value(`"name"`)},
				MessageText: "Option 'name' requires a string.",
				Code:        123,
			}}
		}
		watchDirectory := tspath.GetDirectoryPath(p.ConfigFileName)
		if watchDirectory == "" {
			watchDirectory = "/"
		}
		return contentmapper.OpenProjectResult{
			ConfigIdentity:    identity,
			WatchedFiles:      []string{tspath.CombinePaths(watchDirectory, "mapper.config.json")},
			OptionDiagnostics: diagnostics,
		}, nil
	case contentmapper.MethodCloseProject:
		if h.lifecycle != nil {
			h.lifecycle.Closes.Add(1)
		}
		return nil, nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		if p.ProjectHandle == "" {
			return nil, errors.New("content mapper transform requires a project handle")
		}
	}
	return h.verbatimHandler.HandleRequest(ctx, method, params)
}

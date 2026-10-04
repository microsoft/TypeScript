package contentmappertest

import (
	"context"
	"fmt"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/json"
)

type verbatimHandler struct{ noNotifications }

type moduleVerbatimHandler struct{ noNotifications }

func (verbatimHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		mappedOutput, err := identityMappedOutput(p.Content)
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{MappedOutput: mappedOutput}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

func (moduleVerbatimHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		mappedOutput, err := identityMappedOutput(p.Content)
		if err != nil {
			return nil, err
		}
		mappedOutput.Extension = ".mts"
		return contentmapper.TransformResult{MappedOutput: mappedOutput}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

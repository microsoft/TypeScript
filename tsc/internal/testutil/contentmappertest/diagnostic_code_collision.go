package contentmappertest

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/contentmapper"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/json"
)

type diagnosticCodeCollisionHandler struct{ noNotifications }

func (diagnosticCodeCollisionHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
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
		start := strings.Index(p.Content, "foo")
		return contentmapper.TransformResult{
			MappedOutput: mappedOutput,
			Diagnostics: []contentmapper.Diagnostic{{
				MessageText: "Mapper diagnostic with a colliding code.",
				Start:       start,
				Length:      len("foo"),
				Code:        diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations.Code(),
			}},
		}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

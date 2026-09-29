package contentmappertest

import (
	"context"
	"fmt"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/json"
)

// duplicateProjectionHandler emits the original content as both the canonical output and a supplemental
// one, so a single original span has an identical counterpart in two distinct virtual source files that
// share an OriginalFileName. An edit to that span is therefore recorded once per projection.
type duplicateProjectionHandler struct{ noNotifications }

func (duplicateProjectionHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		canonical, err := identityMappedOutput(p.Content)
		if err != nil {
			return nil, err
		}
		supplemental, err := identityMappedOutput(p.Content)
		if err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{
			MappedOutput: canonical,
			Supplemental: []contentmapper.SupplementalOutput{{MappedOutput: supplemental}},
		}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

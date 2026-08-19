package contentmappertest

import (
	"context"
	"fmt"

	"github.com/microsoft/typescript-go/internal/contentmapper"
	"github.com/microsoft/typescript-go/internal/json"
)

type supplementalModuleHandler struct{ noNotifications }

func (supplementalModuleHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		return contentmapper.TransformResult{
			MappedOutput: contentmapper.MappedOutput{Text: "export default 1;", Extension: ".ts"},
			Supplemental: []contentmapper.SupplementalOutput{{MappedOutput: contentmapper.MappedOutput{Text: `export const privateValue: number = "wrong";`, Extension: ".ts"}}},
		}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

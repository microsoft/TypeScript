package contentmappertest

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/json"
)

type supplementalGlobalsHandler struct{ noNotifications }

func (supplementalGlobalsHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		var p contentmapper.TransformParams
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		var supplemental string
		switch {
		case strings.HasSuffix(p.FileName, "/a.vue"):
			supplemental = "/// <reference path=\"./extra.d.ts\" />\ninterface Shared extends Extra { value: string }"
		case strings.HasSuffix(p.FileName, "/b.vue"):
			supplemental = "declare const shared: Shared;"
		default:
			return nil, fmt.Errorf("contentmappertest: unexpected supplemental global input %q", p.FileName)
		}
		return contentmapper.TransformResult{
			MappedOutput: contentmapper.MappedOutput{Text: "export default shared.value;", Extension: ".ts"},
			Supplemental: []contentmapper.SupplementalOutput{{MappedOutput: contentmapper.MappedOutput{Text: supplemental, Extension: ".ts"}}},
		}, nil
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

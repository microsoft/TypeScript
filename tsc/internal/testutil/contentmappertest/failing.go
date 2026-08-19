package contentmappertest

import (
	"context"
	"errors"
	"fmt"

	"github.com/microsoft/typescript-go/internal/contentmapper"
	"github.com/microsoft/typescript-go/internal/json"
)

type failingHandler struct{ noNotifications }

func (failingHandler) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
	switch method {
	case contentmapper.MethodInitialize:
		return initializeResult("mapper"), nil
	case contentmapper.MethodTransform:
		return nil, errors.New("content mapper failed to transform the file")
	default:
		return nil, fmt.Errorf("contentmappertest: unexpected method %q", method)
	}
}

package api

import (
	"fmt"
	"strconv"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/project"
)

// projectHandlePrefix starts every compact project handle. Project IDs are rooted paths, so
// they never begin with this character.
const projectHandlePrefix = "#"

// projectHandles assigns each project ID a short, process-wide alias that clients may send in
// place of the full ID. Aliases are a pure function of the ID, so they are safe to share among
// clients and never need to be released.
var projectHandles = projectHandleTable{
	byID:     map[project.ID]string{},
	byHandle: map[string]project.ID{},
}

type projectHandleTable struct {
	mu       sync.RWMutex
	byID     map[project.ID]string
	byHandle map[string]project.ID
}

func (t *projectHandleTable) handleFor(id project.ID) string {
	t.mu.RLock()
	handle, ok := t.byID[id]
	t.mu.RUnlock()
	if ok {
		return handle
	}
	t.mu.Lock()
	defer t.mu.Unlock()
	if existing, ok := t.byID[id]; ok {
		return existing
	}
	handle = projectHandlePrefix + strconv.Itoa(len(t.byID)+1)
	t.byID[id] = handle
	t.byHandle[handle] = id
	return handle
}

func (t *projectHandleTable) resolve(handle string) (project.ID, bool) {
	t.mu.RLock()
	defer t.mu.RUnlock()
	id, ok := t.byHandle[handle]
	return id, ok
}

// requestUnmarshalOptions decode project handles back into project IDs wherever a request
// contains a project.ID.
var requestUnmarshalOptions = json.WithUnmarshalers(json.UnmarshalFromFunc(func(dec *json.Decoder, id *project.ID) error {
	token, err := dec.ReadToken()
	if err != nil {
		return err
	}
	if token.Kind() == 'n' {
		*id = ""
		return nil
	}
	if token.Kind() != '"' {
		return fmt.Errorf("%w: project ID must be a string", ErrClientError)
	}
	value := token.String()
	if !strings.HasPrefix(value, projectHandlePrefix) {
		*id = project.ID(value)
		return nil
	}
	resolved, ok := projectHandles.resolve(value)
	if !ok {
		return fmt.Errorf("%w: unknown project handle %q", ErrClientError, value)
	}
	*id = resolved
	return nil
}))

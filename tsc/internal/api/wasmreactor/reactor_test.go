package wasmreactor

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestReactor(t *testing.T) {
	t.Parallel()

	reactor := New(context.Background(), Options{Cwd: "/"})
	defer reactor.Close()

	assert.NilError(t, reactor.SetFile("/src/index.ts", "export const value = 1;"))
	contents, ok := reactor.ReadFile("/src/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, "export const value = 1;")
	_, ok = reactor.ReadFile("/src/missing.ts")
	assert.Assert(t, !ok)

	assert.Assert(t, reactor.Send(Message{Type: api.MessageTypeRequest, Method: "echo"}) != nil)
	assert.NilError(t, reactor.Start(nil))
	assert.Assert(t, reactor.Start(nil) != nil)

	request := func(method string, payload []byte) Message {
		t.Helper()
		assert.NilError(t, reactor.Send(Message{Type: api.MessageTypeRequest, Method: method, Payload: payload}))
		response, err := reactor.Receive()
		assert.NilError(t, err)
		assert.Equal(t, response.Type, api.MessageTypeResponse)
		assert.Equal(t, response.Method, method)
		return response
	}

	var initializeResponse struct {
		CurrentDirectory string `json:"currentDirectory"`
	}
	assert.NilError(t, json.Unmarshal(request("initialize", nil).Payload, &initializeResponse))
	assert.Equal(t, initializeResponse.CurrentDirectory, "/")
	assert.DeepEqual(t, request("echo", []byte("reactor")).Payload, []byte("reactor"))

	_, err := reactor.Receive()
	assert.Equal(t, err, ErrIdle)

	assert.NilError(t, reactor.RemoveFile("/src/index.ts"))
	_, ok = reactor.ReadFile("/src/index.ts")
	assert.Assert(t, !ok)

	reactor.Close()
	_, err = reactor.Receive()
	assert.Equal(t, err, io.EOF)
}

func TestMemFS(t *testing.T) {
	t.Parallel()

	m := newMemFS(tspath.CaseInsensitive)
	assert.NilError(t, m.WriteFile("/Src/Index.ts", "a"))
	assert.NilError(t, m.AppendFile("/src/index.ts", "b"))
	assert.NilError(t, m.WriteFile("/src/lib/util.ts", "c"))

	contents, ok := m.ReadFile("/SRC/INDEX.TS")
	assert.Assert(t, ok)
	assert.Equal(t, contents, "ab")
	assert.Equal(t, m.Realpath("/src/index.ts"), tspath.RootedPath("/Src/Index.ts"))
	assert.DeepEqual(t, m.GetAccessibleEntries("/src").Files, []string{"Index.ts"})
	assert.DeepEqual(t, m.GetAccessibleEntries("/src").Directories, []string{"lib"})
	assert.Assert(t, m.Stat("/src/lib").IsDir())

	assert.NilError(t, m.Remove("/src/lib"))
	assert.Assert(t, !m.FileExists("/src/lib/util.ts"))
	assert.Assert(t, !m.DirectoryExists("/src/lib"))
	assert.Assert(t, m.GetAccessibleEntries("/src").Directories == nil)
	assert.Assert(t, m.DirectoryExists("/"))

	assert.Assert(t, m.WriteFile("/src/index.ts/nested/out.js", "d") != nil)
	assert.Assert(t, !m.DirectoryExists("/src/index.ts"))

	assert.NilError(t, m.WriteFile("C:/src/index.ts", "e"))
	assert.Assert(t, m.DirectoryExists("C:/"))
	assert.NilError(t, m.Remove("/"))
	assert.NilError(t, m.WriteFile("/src/index.ts", "f"))
	assert.Assert(t, m.DirectoryExists("/"))
}

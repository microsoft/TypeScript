package wasmreactor

import (
	"bytes"
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestReactor(t *testing.T) {
	t.Parallel()

	reactor := New(context.Background(), Options{Cwd: "/"})
	defer reactor.Close()

	if err := reactor.SetFile("/src/index.ts", "export const value = 1;"); err != nil {
		t.Fatal(err)
	}
	if contents, ok := reactor.ReadFile("/src/index.ts"); !ok || contents != "export const value = 1;" {
		t.Fatalf("ReadFile() = %q, %v", contents, ok)
	}
	if _, ok := reactor.ReadFile("/src/missing.ts"); ok {
		t.Fatal("ReadFile() found a missing file")
	}

	initialize, err := reactor.HandleRequest("initialize", nil)
	if err != nil {
		t.Fatal(err)
	}
	var initializeResponse struct {
		CurrentDirectory string `json:"currentDirectory"`
	}
	if unmarshalErr := json.Unmarshal(initialize, &initializeResponse); unmarshalErr != nil {
		t.Fatal(unmarshalErr)
	}
	if initializeResponse.CurrentDirectory != "/" {
		t.Fatalf("currentDirectory = %q, want /", initializeResponse.CurrentDirectory)
	}

	payload := []byte("reactor")
	echo, err := reactor.HandleRequest("echo", payload)
	if err != nil {
		t.Fatal(err)
	}
	if !bytes.Equal(echo, payload) {
		t.Fatalf("echo = %q", echo)
	}

	if err := reactor.RemoveFile("/src/index.ts"); err != nil {
		t.Fatal(err)
	}
	if _, ok := reactor.files.ReadFile("/src/index.ts"); ok {
		t.Fatal("removed file still exists")
	}
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

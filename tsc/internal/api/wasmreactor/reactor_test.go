package wasmreactor

import (
	"bytes"
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
)

func TestReactor(t *testing.T) {
	t.Parallel()

	reactor := New(context.Background(), Options{Cwd: "/"})
	defer reactor.Close()

	if err := reactor.SetFile("/src/index.ts", "export const value = 1;"); err != nil {
		t.Fatal(err)
	}
	if contents, ok := reactor.files.ReadFile("/src/index.ts"); !ok || contents != "export const value = 1;" {
		t.Fatalf("ReadFile() = %q, %v", contents, ok)
	}

	initialize, err := reactor.HandleRequest("initialize", nil)
	if err != nil {
		t.Fatal(err)
	}
	var initializeResponse struct {
		CurrentDirectory string `json:"currentDirectory"`
	}
	if unmarshalErr := json.Unmarshal(initialize.Data, &initializeResponse); unmarshalErr != nil {
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
	if !bytes.Equal(echo.Data, payload) {
		t.Fatalf("echo = %q", echo.Data)
	}

	if err := reactor.RemoveFile("/src/index.ts"); err != nil {
		t.Fatal(err)
	}
	if _, ok := reactor.files.ReadFile("/src/index.ts"); ok {
		t.Fatal("removed file still exists")
	}
}

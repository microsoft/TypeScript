package project

import (
	"context"
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestWatchAliasDisabledSaveKeepsSnapshot(t *testing.T) {
	t.Parallel()
	for _, enabled := range []bool{false, true} {
		t.Run(strconv.FormatBool(enabled), func(t *testing.T) {
			t.Parallel()
			const uri = "file:///src/main.ts"
			const text = "export const value = 1;"
			fs := vfstest.FromMap(map[string]string{
				"/src/tsconfig.json": `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`,
				"/src/main.ts":       text,
			}, true)
			session := NewSession(&SessionInit{
				BackgroundCtx: context.Background(), FS: fs, Client: &noopClient{},
				Options: &SessionOptions{CurrentDirectory: "/src", WatchEnabled: enabled},
			})
			defer session.Close()
			session.DidOpenFile(context.Background(), uri, 1, text, lsproto.LanguageKindTypeScript)
			_, err := session.GetLanguageService(context.Background(), uri)
			assert.NilError(t, err)
			session.WaitForBackgroundTasks()
			previous := session.Snapshot()
			session.DidSaveFile(context.Background(), uri)
			_, err = session.GetLanguageService(context.Background(), uri)
			assert.NilError(t, err)
			assert.Assert(t, session.Snapshot() == previous, "hosts without alias state must not clone only to refresh aliases")
		})
	}
}

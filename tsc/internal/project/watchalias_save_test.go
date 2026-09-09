package project

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestWatchAliasSaveWithoutOverlay(t *testing.T) {
	t.Parallel()
	const main = `import {value} from "pkg"; export {value};`
	fs := vfstest.FromMap(map[string]any{
		"/project/tsconfig.json":    `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true},"files":["main.ts"]}`,
		"/project/main.ts":          main,
		"/project/node_modules/pkg": vfstest.Symlink("/packages/pkg"),
		"/packages/pkg/index.d.ts":  `export const value: "initial";`,
	}, true)
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(), FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	ctx := context.Background()
	session.DidOpenFile(ctx, "file:///project/main.ts", 1, main, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	assert.NilError(t, fs.WriteFile("/packages/pkg/index.d.ts", `export const value: "saved";`))
	session.DidSaveFile(ctx, "file:///packages/pkg/index.d.ts")
	service, err := session.GetLanguageService(ctx, "file:///project/main.ts")
	assert.NilError(t, err)
	assert.Equal(t, service.GetProgram().GetSourceFile("/project/node_modules/pkg/index.d.ts").Text(), `export const value: "saved";`)
}

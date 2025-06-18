package project_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestProjectLifetime(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}
	t.Run("configured project", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/tsconfig.json": `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true
				},
				"include": ["src"]
			}`,
			"/home/projects/TS/p1/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p1/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p1/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p2/tsconfig.json": `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true
				},
				"include": ["src"]
			}`,
			"/home/projects/TS/p2/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p2/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p2/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p3/tsconfig.json": `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true
				},
				"include": ["src"]
			}`,
			"/home/projects/TS/p3/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p3/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p3/config.ts":    `let x = 1, y = 2;`,
		}
		service, host := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"].(string), core.ScriptKindTS, "")
		service.OpenFile("/home/projects/TS/p2/src/index.ts", files["/home/projects/TS/p2/src/index.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 2)
		assert.Assert(t, service.ConfiguredProject(serviceToPath(service, "/home/projects/TS/p1/tsconfig.json")) != nil)
		assert.Assert(t, service.ConfiguredProject(serviceToPath(service, "/home/projects/TS/p2/tsconfig.json")) != nil)
		assert.Equal(t, len(host.ClientMock.WatchFilesCalls()), 2)
		configFileExists(t, service, serviceToPath(service, "/home/projects/TS/p1/tsconfig.json"), true)
		configFileExists(t, service, serviceToPath(service, "/home/projects/TS/p2/tsconfig.json"), true)

		service.CloseFile("/home/projects/TS/p1/src/index.ts")
		service.OpenFile("/home/projects/TS/p3/src/index.ts", files["/home/projects/TS/p3/src/index.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 2)
		assert.Assert(t, service.ConfiguredProject(serviceToPath(service, "/home/projects/TS/p1/tsconfig.json")) == nil)
		assert.Assert(t, service.ConfiguredProject(serviceToPath(service, "/home/projects/TS/p2/tsconfig.json")) != nil)
		assert.Assert(t, service.ConfiguredProject(serviceToPath(service, "/home/projects/TS/p3/tsconfig.json")) != nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/index.ts")) == nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/x.ts")) == nil)
		assert.Equal(t, len(host.ClientMock.WatchFilesCalls()), 3)
		assert.Equal(t, len(host.ClientMock.UnwatchFilesCalls()), 1)
		configFileExists(t, service, serviceToPath(service, "/home/projects/TS/p1/tsconfig.json"), false)
		configFileExists(t, service, serviceToPath(service, "/home/projects/TS/p2/tsconfig.json"), true)
		configFileExists(t, service, serviceToPath(service, "/home/projects/TS/p3/tsconfig.json"), true)

		service.CloseFile("/home/projects/TS/p2/src/index.ts")
		service.CloseFile("/home/projects/TS/p3/src/index.ts")
		service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"].(string), core.ScriptKindTS, "")
		assert.Assert(t, service.ConfiguredProject(serviceToPath(service, "/home/projects/TS/p1/tsconfig.json")) != nil)
		assert.Assert(t, service.ConfiguredProject(serviceToPath(service, "/home/projects/TS/p2/tsconfig.json")) == nil)
		assert.Assert(t, service.ConfiguredProject(serviceToPath(service, "/home/projects/TS/p3/tsconfig.json")) == nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p2/src/index.ts")) == nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p2/src/x.ts")) == nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p3/src/index.ts")) == nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p3/src/x.ts")) == nil)
		assert.Equal(t, len(host.ClientMock.WatchFilesCalls()), 4)
		assert.Equal(t, len(host.ClientMock.UnwatchFilesCalls()), 3)
		configFileExists(t, service, serviceToPath(service, "/home/projects/TS/p1/tsconfig.json"), true)
		configFileExists(t, service, serviceToPath(service, "/home/projects/TS/p2/tsconfig.json"), false)
		configFileExists(t, service, serviceToPath(service, "/home/projects/TS/p3/tsconfig.json"), false)
	})

	t.Run("inferred projects", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p1/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p1/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p2/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p2/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p2/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p3/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p3/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p3/config.ts":    `let x = 1, y = 2;`,
		}
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"].(string), core.ScriptKindTS, "/home/projects/TS/p1")
		service.OpenFile("/home/projects/TS/p2/src/index.ts", files["/home/projects/TS/p2/src/index.ts"].(string), core.ScriptKindTS, "/home/projects/TS/p2")
		assert.Equal(t, len(service.Projects()), 2)
		assert.Assert(t, service.InferredProject(serviceToPath(service, "/home/projects/TS/p1")) != nil)
		assert.Assert(t, service.InferredProject(serviceToPath(service, "/home/projects/TS/p2")) != nil)

		service.CloseFile("/home/projects/TS/p1/src/index.ts")
		service.OpenFile("/home/projects/TS/p3/src/index.ts", files["/home/projects/TS/p3/src/index.ts"].(string), core.ScriptKindTS, "/home/projects/TS/p3")
		assert.Equal(t, len(service.Projects()), 2)
		assert.Assert(t, service.InferredProject(serviceToPath(service, "/home/projects/TS/p1")) == nil)
		assert.Assert(t, service.InferredProject(serviceToPath(service, "/home/projects/TS/p2")) != nil)
		assert.Assert(t, service.InferredProject(serviceToPath(service, "/home/projects/TS/p3")) != nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/index.ts")) == nil)

		service.CloseFile("/home/projects/TS/p2/src/index.ts")
		service.CloseFile("/home/projects/TS/p3/src/index.ts")
		service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"].(string), core.ScriptKindTS, "/home/projects/TS/p1")
		assert.Assert(t, service.InferredProject(serviceToPath(service, "/home/projects/TS/p1")) != nil)
		assert.Assert(t, service.InferredProject(serviceToPath(service, "/home/projects/TS/p2")) == nil)
		assert.Assert(t, service.InferredProject(serviceToPath(service, "/home/projects/TS/p3")) == nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p2/src/index.ts")) == nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p3/src/index.ts")) == nil)
	})

	t.Run("unrooted inferred projects", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p1/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p1/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p2/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p2/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p2/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p3/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p3/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p3/config.ts":    `let x = 1, y = 2;`,
		}
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"].(string), core.ScriptKindTS, "")
		service.OpenFile("/home/projects/TS/p2/src/index.ts", files["/home/projects/TS/p2/src/index.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("")) != nil)

		service.CloseFile("/home/projects/TS/p1/src/index.ts")
		service.OpenFile("/home/projects/TS/p3/src/index.ts", files["/home/projects/TS/p3/src/index.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("")) != nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/index.ts")) == nil)

		service.CloseFile("/home/projects/TS/p2/src/index.ts")
		service.CloseFile("/home/projects/TS/p3/src/index.ts")
		service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"].(string), core.ScriptKindTS, "")
		assert.Assert(t, service.InferredProject(tspath.Path("")) != nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p2/src/index.ts")) == nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p3/src/index.ts")) == nil)

		service.CloseFile("/home/projects/TS/p1/src/index.ts")
		service.OpenFile("/home/projects/TS/p2/src/index.ts", files["/home/projects/TS/p2/src/index.ts"].(string), core.ScriptKindTS, "/home/projects/TS/p2")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("")) == nil)
		assert.Assert(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/index.ts")) == nil)
		assert.Assert(t, service.InferredProject(serviceToPath(service, "/home/projects/TS/p2")) != nil)
	})
}

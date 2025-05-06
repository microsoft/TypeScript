package project_test

import (
	"maps"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestService(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]string{
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
	}

	t.Run("OpenFile", func(t *testing.T) {
		t.Parallel()
		t.Run("create configured project", func(t *testing.T) {
			t.Parallel()
			service, _ := projecttestutil.Setup(files)
			assert.Equal(t, len(service.Projects()), 0)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			assert.Equal(t, len(service.Projects()), 1)
			p := service.Projects()[0]
			assert.Equal(t, p.Kind(), project.KindConfigured)
			xScriptInfo := service.GetScriptInfo("/home/projects/TS/p1/src/x.ts")
			assert.Assert(t, xScriptInfo != nil)
			assert.Equal(t, xScriptInfo.Text(), "export const x = 1;")
		})

		t.Run("create inferred project", func(t *testing.T) {
			t.Parallel()
			service, _ := projecttestutil.Setup(files)
			service.OpenFile("/home/projects/TS/p1/config.ts", files["/home/projects/TS/p1/config.ts"], core.ScriptKindTS, "")
			// Find tsconfig, load, notice config.ts is not included, create inferred project
			assert.Equal(t, len(service.Projects()), 2)
			_, proj := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/config.ts")
			assert.Equal(t, proj.Kind(), project.KindInferred)
		})

		t.Run("inferred project for in-memory files", func(t *testing.T) {
			t.Parallel()
			service, _ := projecttestutil.Setup(files)
			service.OpenFile("/home/projects/TS/p1/config.ts", files["/home/projects/TS/p1/config.ts"], core.ScriptKindTS, "")
			service.OpenFile("^/untitled/ts-nul-authority/Untitled-1", "x", core.ScriptKindTS, "")
			service.OpenFile("^/untitled/ts-nul-authority/Untitled-2", "y", core.ScriptKindTS, "")
			assert.Equal(t, len(service.Projects()), 2)
			_, p1 := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/config.ts")
			_, p2 := service.EnsureDefaultProjectForFile("^/untitled/ts-nul-authority/Untitled-1")
			_, p3 := service.EnsureDefaultProjectForFile("^/untitled/ts-nul-authority/Untitled-2")
			assert.Equal(t, p1, p2)
			assert.Equal(t, p1, p3)
		})

		t.Run("inferred project JS file", func(t *testing.T) {
			t.Parallel()
			jsFiles := map[string]string{
				"/home/projects/TS/p1/index.js": `import { x } from "./x";`,
			}
			service, _ := projecttestutil.Setup(jsFiles)
			service.OpenFile("/home/projects/TS/p1/index.js", jsFiles["/home/projects/TS/p1/index.js"], core.ScriptKindJS, "")
			assert.Equal(t, len(service.Projects()), 1)
			project := service.Projects()[0]
			assert.Assert(t, project.GetProgram().GetSourceFile("/home/projects/TS/p1/index.js") != nil)
		})
	})

	t.Run("ChangeFile", func(t *testing.T) {
		t.Parallel()
		t.Run("update script info eagerly and program lazily", func(t *testing.T) {
			t.Parallel()
			service, _ := projecttestutil.Setup(files)
			service.OpenFile("/home/projects/TS/p1/src/x.ts", files["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
			info, proj := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/x.ts")
			programBefore := proj.GetProgram()
			service.ChangeFile("/home/projects/TS/p1/src/x.ts", []ls.TextChange{{TextRange: core.NewTextRange(17, 18), NewText: "2"}})
			assert.Equal(t, info.Text(), "export const x = 2;")
			assert.Equal(t, proj.CurrentProgram(), programBefore)
			assert.Equal(t, programBefore.GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "export const x = 1;")
			assert.Equal(t, proj.GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "export const x = 2;")
		})

		t.Run("unchanged source files are reused", func(t *testing.T) {
			t.Parallel()
			service, _ := projecttestutil.Setup(files)
			service.OpenFile("/home/projects/TS/p1/src/x.ts", files["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
			_, proj := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/x.ts")
			programBefore := proj.GetProgram()
			indexFileBefore := programBefore.GetSourceFile("/home/projects/TS/p1/src/index.ts")
			service.ChangeFile("/home/projects/TS/p1/src/x.ts", nil)
			assert.Equal(t, proj.GetProgram().GetSourceFile("/home/projects/TS/p1/src/index.ts"), indexFileBefore)
		})

		t.Run("change can pull in new files", func(t *testing.T) {
			t.Parallel()
			filesCopy := maps.Clone(files)
			filesCopy["/home/projects/TS/p1/y.ts"] = `export const y = 2;`
			service, _ := projecttestutil.Setup(filesCopy)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", filesCopy["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			assert.Check(t, service.GetScriptInfo("/home/projects/TS/p1/y.ts") == nil)

			service.ChangeFile("/home/projects/TS/p1/src/index.ts", []ls.TextChange{{TextRange: core.NewTextRange(0, 0), NewText: `import { y } from "../y";\n`}})
			service.EnsureDefaultProjectForFile("/home/projects/TS/p1/y.ts")
		})
	})

	t.Run("CloseFile", func(t *testing.T) {
		t.Parallel()
		t.Run("Configured projects", func(t *testing.T) {
			t.Parallel()
			t.Run("delete a file, close it, recreate it", func(t *testing.T) {
				t.Parallel()
				service, host := projecttestutil.Setup(files)
				service.OpenFile("/home/projects/TS/p1/src/x.ts", files["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
				service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
				assert.Equal(t, service.SourceFileCount(), 2)

				filesCopy := maps.Clone(files)
				delete(filesCopy, "/home/projects/TS/p1/src/x.ts")
				host.ReplaceFS(filesCopy)

				service.CloseFile("/home/projects/TS/p1/src/x.ts")
				assert.Check(t, service.GetScriptInfo("/home/projects/TS/p1/src/x.ts") == nil)
				assert.Check(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts") == nil)
				assert.Equal(t, service.SourceFileCount(), 1)

				filesCopy["/home/projects/TS/p1/src/x.ts"] = ``
				host.ReplaceFS(filesCopy)
				service.OpenFile("/home/projects/TS/p1/src/x.ts", filesCopy["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
				assert.Equal(t, service.GetScriptInfo("/home/projects/TS/p1/src/x.ts").Text(), "")
				assert.Check(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts") != nil)
				assert.Equal(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "")
			})
		})

		t.Run("Inferred projects", func(t *testing.T) {
			t.Parallel()
			t.Run("delete a file, close it, recreate it", func(t *testing.T) {
				t.Parallel()
				filesCopy := maps.Clone(files)
				delete(filesCopy, "/home/projects/TS/p1/tsconfig.json")
				service, host := projecttestutil.Setup(filesCopy)
				service.OpenFile("/home/projects/TS/p1/src/x.ts", files["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
				service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")

				delete(filesCopy, "/home/projects/TS/p1/src/x.ts")
				host.ReplaceFS(filesCopy)

				service.CloseFile("/home/projects/TS/p1/src/x.ts")
				assert.Check(t, service.GetScriptInfo("/home/projects/TS/p1/src/x.ts") == nil)
				assert.Check(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts") == nil)

				filesCopy["/home/projects/TS/p1/src/x.ts"] = ``
				host.ReplaceFS(filesCopy)
				service.OpenFile("/home/projects/TS/p1/src/x.ts", filesCopy["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
				assert.Equal(t, service.GetScriptInfo("/home/projects/TS/p1/src/x.ts").Text(), "")
				assert.Check(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts") != nil)
				assert.Equal(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "")
			})
		})
	})

	t.Run("Source file sharing", func(t *testing.T) {
		t.Parallel()
		t.Run("projects with similar options share source files", func(t *testing.T) {
			t.Parallel()
			filesCopy := maps.Clone(files)
			filesCopy["/home/projects/TS/p2/tsconfig.json"] = `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true,
					"noCheck": true // Added
				},
			}`
			filesCopy["/home/projects/TS/p2/src/index.ts"] = `import { x } from "../../p1/src/x";`
			service, _ := projecttestutil.Setup(filesCopy)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", filesCopy["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			service.OpenFile("/home/projects/TS/p2/src/index.ts", filesCopy["/home/projects/TS/p2/src/index.ts"], core.ScriptKindTS, "")
			assert.Equal(t, len(service.Projects()), 2)
			_, p1 := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			_, p2 := service.EnsureDefaultProjectForFile("/home/projects/TS/p2/src/index.ts")
			assert.Equal(
				t,
				p1.GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts"),
				p2.GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts"),
			)
		})

		t.Run("projects with different options do not share source files", func(t *testing.T) {
			t.Parallel()
			filesCopy := maps.Clone(files)
			filesCopy["/home/projects/TS/p2/tsconfig.json"] = `{
				"compilerOptions": {
					"module": "nodenext",
					"jsx": "react"
				}
			}`
			filesCopy["/home/projects/TS/p2/src/index.ts"] = `import { x } from "../../p1/src/x";`
			service, _ := projecttestutil.Setup(filesCopy)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", filesCopy["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			service.OpenFile("/home/projects/TS/p2/src/index.ts", filesCopy["/home/projects/TS/p2/src/index.ts"], core.ScriptKindTS, "")
			assert.Equal(t, len(service.Projects()), 2)
			_, p1 := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			_, p2 := service.EnsureDefaultProjectForFile("/home/projects/TS/p2/src/index.ts")
			x1 := p1.GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts")
			x2 := p2.GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts")
			assert.Assert(t, x1 != nil && x2 != nil)
			assert.Assert(t, x1 != x2)
		})
	})
}

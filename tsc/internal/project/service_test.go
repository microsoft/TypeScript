package project_test

import (
	"maps"
	"slices"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestService(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	defaultFiles := map[string]string{
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
			service, _ := projecttestutil.Setup(defaultFiles, nil)
			assert.Equal(t, len(service.Projects()), 0)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", defaultFiles["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			assert.Equal(t, len(service.Projects()), 1)
			p := service.Projects()[0]
			assert.Equal(t, p.Kind(), project.KindConfigured)
			xScriptInfo := service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/x.ts"))
			assert.Assert(t, xScriptInfo != nil)
			assert.Equal(t, xScriptInfo.Text(), "export const x = 1;")
		})

		t.Run("create inferred project", func(t *testing.T) {
			t.Parallel()
			service, _ := projecttestutil.Setup(defaultFiles, nil)
			service.OpenFile("/home/projects/TS/p1/config.ts", defaultFiles["/home/projects/TS/p1/config.ts"], core.ScriptKindTS, "")
			// Find tsconfig, load, notice config.ts is not included, create inferred project
			assert.Equal(t, len(service.Projects()), 2)
			_, proj := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/config.ts")
			assert.Equal(t, proj.Kind(), project.KindInferred)
		})

		t.Run("inferred project for in-memory files", func(t *testing.T) {
			t.Parallel()
			service, _ := projecttestutil.Setup(defaultFiles, nil)
			service.OpenFile("/home/projects/TS/p1/config.ts", defaultFiles["/home/projects/TS/p1/config.ts"], core.ScriptKindTS, "")
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
			service, _ := projecttestutil.Setup(jsFiles, nil)
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
			service, _ := projecttestutil.Setup(defaultFiles, nil)
			service.OpenFile("/home/projects/TS/p1/src/x.ts", defaultFiles["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
			info, proj := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/x.ts")
			programBefore := proj.GetProgram()
			err := service.ChangeFile(
				lsproto.VersionedTextDocumentIdentifier{
					TextDocumentIdentifier: lsproto.TextDocumentIdentifier{
						Uri: "file:///home/projects/TS/p1/src/x.ts",
					},
					Version: 1,
				},
				[]lsproto.TextDocumentContentChangePartialOrWholeDocument{
					{
						Partial: ptrTo(lsproto.TextDocumentContentChangePartial{
							Range: lsproto.Range{
								Start: lsproto.Position{
									Line:      0,
									Character: 17,
								},
								End: lsproto.Position{
									Line:      0,
									Character: 18,
								},
							},
							Text: "2",
						}),
					},
				},
			)
			assert.NilError(t, err)
			assert.Equal(t, info.Text(), "export const x = 2;")
			assert.Equal(t, proj.CurrentProgram(), programBefore)
			assert.Equal(t, programBefore.GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "export const x = 1;")
			assert.Equal(t, proj.GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "export const x = 2;")
		})

		t.Run("unchanged source files are reused", func(t *testing.T) {
			t.Parallel()
			service, _ := projecttestutil.Setup(defaultFiles, nil)
			service.OpenFile("/home/projects/TS/p1/src/x.ts", defaultFiles["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
			_, proj := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/x.ts")
			programBefore := proj.GetProgram()
			indexFileBefore := programBefore.GetSourceFile("/home/projects/TS/p1/src/index.ts")
			err := service.ChangeFile(
				lsproto.VersionedTextDocumentIdentifier{
					TextDocumentIdentifier: lsproto.TextDocumentIdentifier{
						Uri: "file:///home/projects/TS/p1/src/x.ts",
					},
					Version: 1,
				},
				[]lsproto.TextDocumentContentChangePartialOrWholeDocument{
					{
						Partial: ptrTo(lsproto.TextDocumentContentChangePartial{
							Range: lsproto.Range{
								Start: lsproto.Position{
									Line:      0,
									Character: 0,
								},
								End: lsproto.Position{
									Line:      0,
									Character: 0,
								},
							},
							Text: ";",
						}),
					},
				},
			)
			assert.NilError(t, err)
			assert.Equal(t, proj.GetProgram().GetSourceFile("/home/projects/TS/p1/src/index.ts"), indexFileBefore)
		})

		t.Run("change can pull in new files", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			files["/home/projects/TS/p1/y.ts"] = `export const y = 2;`
			service, _ := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			assert.Check(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/y.ts")) == nil)
			// Avoid using initial file set after this point
			files = nil //nolint:ineffassign

			err := service.ChangeFile(
				lsproto.VersionedTextDocumentIdentifier{
					TextDocumentIdentifier: lsproto.TextDocumentIdentifier{
						Uri: "file:///home/projects/TS/p1/src/index.ts",
					},
					Version: 1,
				},
				[]lsproto.TextDocumentContentChangePartialOrWholeDocument{
					{
						Partial: ptrTo(lsproto.TextDocumentContentChangePartial{
							Range: lsproto.Range{
								Start: lsproto.Position{
									Line:      0,
									Character: 0,
								},
								End: lsproto.Position{
									Line:      0,
									Character: 0,
								},
							},
							Text: `import { y } from "../y";\n`,
						}),
					},
				},
			)
			assert.NilError(t, err)
			service.EnsureDefaultProjectForFile("/home/projects/TS/p1/y.ts")
		})

		t.Run("single-file change followed by config change reloads program", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			files["/home/projects/TS/p1/tsconfig.json"] = `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true,
				},
				"include": ["src/index.ts"]
			}`
			service, host := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			_, project := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			programBefore := project.GetProgram()
			assert.Equal(t, len(programBefore.GetSourceFiles()), 2)
			// Avoid using initial file set after this point
			files = nil //nolint:ineffassign

			err := service.ChangeFile(
				lsproto.VersionedTextDocumentIdentifier{
					TextDocumentIdentifier: lsproto.TextDocumentIdentifier{
						Uri: "file:///home/projects/TS/p1/src/index.ts",
					},
					Version: 1,
				},
				[]lsproto.TextDocumentContentChangePartialOrWholeDocument{
					{
						Partial: ptrTo(lsproto.TextDocumentContentChangePartial{
							Range: lsproto.Range{
								Start: lsproto.Position{
									Line:      0,
									Character: 0,
								},
								End: lsproto.Position{
									Line:      0,
									Character: 0,
								},
							},
							Text: "\n",
						}),
					},
				},
			)
			assert.NilError(t, err)

			err = host.FS().WriteFile("/home/projects/TS/p1/tsconfig.json", `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true,
				},
				"include": ["./**/*"]
			}`, false)
			assert.NilError(t, err)

			err = service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/tsconfig.json",
				},
			})
			assert.NilError(t, err)

			programAfter := project.GetProgram()
			assert.Equal(t, len(programAfter.GetSourceFiles()), 3)
		})
	})

	t.Run("CloseFile", func(t *testing.T) {
		t.Parallel()
		t.Run("Configured projects", func(t *testing.T) {
			t.Parallel()
			t.Run("delete a file, close it, recreate it", func(t *testing.T) {
				t.Parallel()
				files := maps.Clone(defaultFiles)
				service, host := projecttestutil.Setup(files, nil)
				service.OpenFile("/home/projects/TS/p1/src/x.ts", files["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
				service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
				assert.Equal(t, service.DocumentStore().SourceFileCount(), 2)
				// Avoid using initial file set after this point
				files = nil //nolint:ineffassign

				assert.NilError(t, host.FS().Remove("/home/projects/TS/p1/src/x.ts"))

				service.CloseFile("/home/projects/TS/p1/src/x.ts")
				assert.Check(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/x.ts")) == nil)
				assert.Check(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts") == nil)
				assert.Equal(t, service.DocumentStore().SourceFileCount(), 1)

				err := host.FS().WriteFile("/home/projects/TS/p1/src/x.ts", "", false)
				assert.NilError(t, err)

				service.OpenFile("/home/projects/TS/p1/src/x.ts", "", core.ScriptKindTS, "")
				assert.Equal(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/x.ts")).Text(), "")
				assert.Check(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts") != nil)
				assert.Equal(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "")
			})
		})

		t.Run("Inferred projects", func(t *testing.T) {
			t.Parallel()
			t.Run("delete a file, close it, recreate it", func(t *testing.T) {
				t.Parallel()
				files := maps.Clone(defaultFiles)
				delete(files, "/home/projects/TS/p1/tsconfig.json")
				service, host := projecttestutil.Setup(files, nil)
				service.OpenFile("/home/projects/TS/p1/src/x.ts", files["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
				service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
				// Avoid using initial file set after this point
				files = nil //nolint:ineffassign

				err := host.FS().Remove("/home/projects/TS/p1/src/x.ts")
				assert.NilError(t, err)

				service.CloseFile("/home/projects/TS/p1/src/x.ts")
				assert.Check(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/x.ts")) == nil)
				assert.Check(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts") == nil)

				err = host.FS().WriteFile("/home/projects/TS/p1/src/x.ts", "", false)
				assert.NilError(t, err)

				service.OpenFile("/home/projects/TS/p1/src/x.ts", "", core.ScriptKindTS, "")
				assert.Equal(t, service.DocumentStore().GetScriptInfoByPath(serviceToPath(service, "/home/projects/TS/p1/src/x.ts")).Text(), "")
				assert.Check(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts") != nil)
				assert.Equal(t, service.Projects()[0].GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "")
			})
		})
	})

	t.Run("Source file sharing", func(t *testing.T) {
		t.Parallel()
		t.Run("projects with similar options share source files", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			files["/home/projects/TS/p2/tsconfig.json"] = `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true,
					"noCheck": true // Added
				},
			}`
			files["/home/projects/TS/p2/src/index.ts"] = `import { x } from "../../p1/src/x";`
			service, _ := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			service.OpenFile("/home/projects/TS/p2/src/index.ts", files["/home/projects/TS/p2/src/index.ts"], core.ScriptKindTS, "")
			assert.Equal(t, len(service.Projects()), 2)
			// Avoid using initial file set after this point
			files = nil //nolint:ineffassign
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
			files := maps.Clone(defaultFiles)
			files["/home/projects/TS/p2/tsconfig.json"] = `{
				"compilerOptions": {
					"module": "nodenext",
					"jsx": "react"
				}
			}`
			files["/home/projects/TS/p2/src/index.ts"] = `import { x } from "../../p1/src/x";`
			service, _ := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			service.OpenFile("/home/projects/TS/p2/src/index.ts", files["/home/projects/TS/p2/src/index.ts"], core.ScriptKindTS, "")
			assert.Equal(t, len(service.Projects()), 2)
			// Avoid using initial file set after this point
			files = nil //nolint:ineffassign
			_, p1 := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			_, p2 := service.EnsureDefaultProjectForFile("/home/projects/TS/p2/src/index.ts")
			x1 := p1.GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts")
			x2 := p2.GetProgram().GetSourceFile("/home/projects/TS/p1/src/x.ts")
			assert.Assert(t, x1 != nil && x2 != nil)
			assert.Assert(t, x1 != x2)
		})
	})

	t.Run("Watch", func(t *testing.T) {
		t.Parallel()

		t.Run("change open file", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			service, host := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/x.ts", files["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			_, project := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			programBefore := project.GetProgram()
			// Avoid using initial file set after this point
			files = nil //nolint:ineffassign

			err := host.FS().WriteFile("/home/projects/TS/p1/src/x.ts", `export const x = 2;`, false)
			assert.NilError(t, err)

			assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/src/x.ts",
				},
			}))

			assert.Equal(t, programBefore, project.GetProgram())
		})

		t.Run("change closed program file", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			service, host := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			_, project := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			programBefore := project.GetProgram()
			// Avoid using initial file set after this point
			files = nil //nolint:ineffassign

			err := host.FS().WriteFile("/home/projects/TS/p1/src/x.ts", `export const x = 2;`, false)
			assert.NilError(t, err)

			assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/src/x.ts",
				},
			}))

			assert.Check(t, project.GetProgram() != programBefore)
		})

		t.Run("change config file", func(t *testing.T) {
			t.Parallel()
			files := map[string]string{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true,
						"strict": false
					}
				}`,
				"/home/projects/TS/p1/src/x.ts": `export declare const x: number | undefined;`,
				"/home/projects/TS/p1/src/index.ts": `
					import { x } from "./x";
					let y: number = x;`,
			}

			service, host := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			_, project := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			program := project.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)

			err := host.FS().WriteFile("/home/projects/TS/p1/tsconfig.json", `{
				"compilerOptions": {
					"noLib": false,
					"strict": true
				}
			}`, false)
			assert.NilError(t, err)

			assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/tsconfig.json",
				},
			}))

			program = project.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)
		})

		t.Run("delete explicitly included file", func(t *testing.T) {
			t.Parallel()
			files := map[string]string{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true,
					},
					"files": ["src/index.ts", "src/x.ts"]
				}`,
				"/home/projects/TS/p1/src/x.ts":     `export declare const x: number | undefined;`,
				"/home/projects/TS/p1/src/index.ts": `import { x } from "./x";`,
			}
			service, host := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			_, project := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			program := project.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)

			err := host.FS().Remove("/home/projects/TS/p1/src/x.ts")
			assert.NilError(t, err)

			assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeDeleted,
					Uri:  "file:///home/projects/TS/p1/src/x.ts",
				},
			}))

			program = project.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)
			assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts") == nil)
		})

		t.Run("delete wildcard included file", func(t *testing.T) {
			t.Parallel()
			files := map[string]string{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true
					},
					"include": ["src"]
				}`,
				"/home/projects/TS/p1/src/index.ts": `let x = 2;`,
				"/home/projects/TS/p1/src/x.ts":     `let y = x;`,
			}
			service, host := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/x.ts", files["/home/projects/TS/p1/src/x.ts"], core.ScriptKindTS, "")
			_, project := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/x.ts")
			program := project.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/x.ts"))), 0)

			err := host.FS().Remove("/home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)

			assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeDeleted,
					Uri:  "file:///home/projects/TS/p1/src/index.ts",
				},
			}))

			program = project.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/x.ts"))), 1)
		})

		t.Run("create explicitly included file", func(t *testing.T) {
			t.Parallel()
			files := map[string]string{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true
					},
					"files": ["src/index.ts", "src/y.ts"]
				}`,
				"/home/projects/TS/p1/src/index.ts": `import { y } from "./y";`,
			}
			service, host := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			_, project := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			program := project.GetProgram()

			// Initially should have an error because y.ts is missing
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)

			// Missing location should be watched
			assert.DeepEqual(t, host.ClientMock.WatchFilesCalls()[0].Watchers, []*lsproto.FileSystemWatcher{
				{
					Kind: ptrTo(lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete),
					GlobPattern: lsproto.PatternOrRelativePattern{
						Pattern: ptrTo("/home/projects/TS/p1/src/index.ts"),
					},
				},
				{
					Kind: ptrTo(lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete),
					GlobPattern: lsproto.PatternOrRelativePattern{
						Pattern: ptrTo("/home/projects/TS/p1/src/y.ts"),
					},
				},
				{
					Kind: ptrTo(lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete),
					GlobPattern: lsproto.PatternOrRelativePattern{
						Pattern: ptrTo("/home/projects/TS/p1/tsconfig.json"),
					},
				},
			})

			// Add the missing file
			err := host.FS().WriteFile("/home/projects/TS/p1/src/y.ts", `export const y = 1;`, false)
			assert.NilError(t, err)

			assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeCreated,
					Uri:  "file:///home/projects/TS/p1/src/y.ts",
				},
			}))

			// Error should be resolved
			program = project.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)
			assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/y.ts") != nil)
		})

		t.Run("create failed lookup location", func(t *testing.T) {
			t.Parallel()
			files := map[string]string{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true
					},
					"files": ["src/index.ts"]
				}`,
				"/home/projects/TS/p1/src/index.ts": `import { z } from "./z";`,
			}
			service, host := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			_, project := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			program := project.GetProgram()

			// Initially should have an error because z.ts is missing
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)

			// Missing location should be watched
			assert.Check(t, slices.ContainsFunc(host.ClientMock.WatchFilesCalls()[1].Watchers, func(w *lsproto.FileSystemWatcher) bool {
				return *w.GlobPattern.Pattern == "/home/projects/TS/p1/src/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}" && *w.Kind == lsproto.WatchKindCreate
			}))

			// Add a new file through failed lookup watch
			err := host.FS().WriteFile("/home/projects/TS/p1/src/z.ts", `export const z = 1;`, false)
			assert.NilError(t, err)

			assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeCreated,
					Uri:  "file:///home/projects/TS/p1/src/z.ts",
				},
			}))

			// Error should be resolved and the new file should be included in the program
			program = project.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)
			assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/z.ts") != nil)
		})

		t.Run("create wildcard included file", func(t *testing.T) {
			t.Parallel()
			files := map[string]string{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true
					},
					"include": ["src"]
				}`,
				"/home/projects/TS/p1/src/index.ts": `a;`,
			}
			service, host := projecttestutil.Setup(files, nil)
			service.OpenFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/src/index.ts"], core.ScriptKindTS, "")
			_, project := service.EnsureDefaultProjectForFile("/home/projects/TS/p1/src/index.ts")
			program := project.GetProgram()

			// Initially should have an error because declaration for 'a' is missing
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)

			// Add a new file through wildcard watch

			err := host.FS().WriteFile("/home/projects/TS/p1/src/a.ts", `const a = 1;`, false)
			assert.NilError(t, err)

			assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeCreated,
					Uri:  "file:///home/projects/TS/p1/src/a.ts",
				},
			}))

			// Error should be resolved and the new file should be included in the program
			program = project.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)
			assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/a.ts") != nil)
		})
	})
}

func ptrTo[T any](v T) *T {
	return &v
}

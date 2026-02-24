package project_test

import (
	"context"
	"maps"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/glob"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestSession(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	defaultFiles := map[string]any{
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

	t.Run("DidOpenFile", func(t *testing.T) {
		t.Parallel()
		t.Run("create configured project", func(t *testing.T) {
			t.Parallel()
			session, _ := projecttestutil.Setup(defaultFiles)
			snapshot, release := session.Snapshot()
			defer release()
			assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 0)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, defaultFiles["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			snapshot, release = session.Snapshot()
			defer release()
			assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)

			configuredProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json"))
			assert.Assert(t, configuredProject != nil)

			// Get language service to access the program
			ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program := ls.GetProgram()
			assert.Assert(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts") != nil)
			assert.Equal(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "export const x = 1;")
		})

		t.Run("create inferred project", func(t *testing.T) {
			t.Parallel()
			session, _ := projecttestutil.Setup(defaultFiles)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/config.ts", 1, defaultFiles["/home/projects/TS/p1/config.ts"].(string), lsproto.LanguageKindTypeScript)

			// Find tsconfig, load, notice config.ts is not included, create inferred project
			snapshot, release := session.Snapshot()
			defer release()
			assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 2)

			// Should have both configured project (for tsconfig.json) and inferred project
			configuredProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json"))
			inferredProject := snapshot.ProjectCollection.InferredProject()
			assert.Assert(t, configuredProject != nil)
			assert.Assert(t, inferredProject != nil)
		})

		t.Run("inferred project for in-memory files", func(t *testing.T) {
			t.Parallel()
			session, _ := projecttestutil.Setup(defaultFiles)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/config.ts", 1, defaultFiles["/home/projects/TS/p1/config.ts"].(string), lsproto.LanguageKindTypeScript)
			session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "x", lsproto.LanguageKindTypeScript)
			session.DidOpenFile(context.Background(), "untitled:Untitled-2", 1, "y", lsproto.LanguageKindTypeScript)

			snapshot, release := session.Snapshot()
			defer release()

			assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
			assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)
		})

		t.Run("inferred project JS file", func(t *testing.T) {
			t.Parallel()
			jsFiles := map[string]any{
				"/home/projects/TS/p1/index.js": `import { x } from "./x";`,
			}
			session, _ := projecttestutil.Setup(jsFiles)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/index.js", 1, jsFiles["/home/projects/TS/p1/index.js"].(string), lsproto.LanguageKindJavaScript)

			snapshot, release := session.Snapshot()
			defer release()
			assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)

			ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/index.js")
			assert.NilError(t, err)
			program := ls.GetProgram()
			assert.Assert(t, program.GetSourceFile("/home/projects/TS/p1/index.js") != nil)
		})
	})

	t.Run("DidChangeFile", func(t *testing.T) {
		t.Parallel()
		t.Run("update file and program", func(t *testing.T) {
			t.Parallel()
			session, _ := projecttestutil.Setup(defaultFiles)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, defaultFiles["/home/projects/TS/p1/src/x.ts"].(string), lsproto.LanguageKindTypeScript)

			lsBefore, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/x.ts")
			assert.NilError(t, err)
			programBefore := lsBefore.GetProgram()

			session.DidChangeFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
				{
					Partial: new(lsproto.TextDocumentContentChangePartial{
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
			})

			lsAfter, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/x.ts")
			assert.NilError(t, err)
			programAfter := lsAfter.GetProgram()

			// Program should change due to the file content change
			assert.Check(t, programAfter != programBefore)
			assert.Equal(t, programAfter.GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "export const x = 2;")
		})

		t.Run("unchanged source files are reused", func(t *testing.T) {
			t.Parallel()
			session, _ := projecttestutil.Setup(defaultFiles)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, defaultFiles["/home/projects/TS/p1/src/x.ts"].(string), lsproto.LanguageKindTypeScript)

			lsBefore, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/x.ts")
			assert.NilError(t, err)
			programBefore := lsBefore.GetProgram()
			indexFileBefore := programBefore.GetSourceFile("/home/projects/TS/p1/src/index.ts")

			session.DidChangeFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
				{
					Partial: new(lsproto.TextDocumentContentChangePartial{
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
			})

			lsAfter, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/x.ts")
			assert.NilError(t, err)
			programAfter := lsAfter.GetProgram()

			// Unchanged file should be reused
			assert.Equal(t, programAfter.GetSourceFile("/home/projects/TS/p1/src/index.ts"), indexFileBefore)
		})

		t.Run("change can pull in new files", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			files["/home/projects/TS/p1/y.ts"] = `export const y = 2;`
			session, _ := projecttestutil.Setup(files)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			// Verify y.ts is not initially in the program
			lsBefore, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			programBefore := lsBefore.GetProgram()
			assert.Check(t, programBefore.GetSourceFile("/home/projects/TS/p1/y.ts") == nil)

			session.DidChangeFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
				{
					Partial: new(lsproto.TextDocumentContentChangePartial{
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
			})

			lsAfter, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			programAfter := lsAfter.GetProgram()

			// y.ts should now be included in the program
			assert.Assert(t, programAfter.GetSourceFile("/home/projects/TS/p1/y.ts") != nil)
		})

		t.Run("single-file change followed by config change reloads program", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			files["/home/projects/TS/p1/tsconfig.json"] = `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true
				},
				"include": ["src/index.ts"]
			}`
			session, utils := projecttestutil.Setup(files)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			lsBefore, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			programBefore := lsBefore.GetProgram()
			assert.Equal(t, len(programBefore.GetSourceFiles()), 2)

			session.DidChangeFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
				{
					Partial: new(lsproto.TextDocumentContentChangePartial{
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
			})

			err = utils.FS().WriteFile("/home/projects/TS/p1/tsconfig.json", `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true
				},
				"include": ["./**/*"]
			}`, false)
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/tsconfig.json",
				},
			})

			lsAfter, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			programAfter := lsAfter.GetProgram()
			assert.Equal(t, len(programAfter.GetSourceFiles()), 3)
		})
	})

	t.Run("DidCloseFile", func(t *testing.T) {
		t.Parallel()
		t.Run("Configured projects", func(t *testing.T) {
			t.Parallel()
			t.Run("delete a file, close it, recreate it", func(t *testing.T) {
				t.Parallel()
				files := maps.Clone(defaultFiles)
				session, utils := projecttestutil.Setup(files)

				session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, files["/home/projects/TS/p1/src/x.ts"].(string), lsproto.LanguageKindTypeScript)
				session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

				assert.NilError(t, utils.FS().Remove("/home/projects/TS/p1/src/x.ts"))

				session.DidCloseFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts")
				ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
				assert.NilError(t, err)
				program := ls.GetProgram()
				assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts") == nil)

				err = utils.FS().WriteFile("/home/projects/TS/p1/src/x.ts", "", false)
				assert.NilError(t, err)

				session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, "", lsproto.LanguageKindTypeScript)

				ls, err = session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/x.ts")
				assert.NilError(t, err)
				program = ls.GetProgram()
				assert.Assert(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts") != nil)
				assert.Equal(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "")
			})
		})

		t.Run("Inferred projects", func(t *testing.T) {
			t.Parallel()
			t.Run("delete a file, close it, recreate it", func(t *testing.T) {
				t.Parallel()
				files := maps.Clone(defaultFiles)
				delete(files, "/home/projects/TS/p1/tsconfig.json")
				session, utils := projecttestutil.Setup(files)

				session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, files["/home/projects/TS/p1/src/x.ts"].(string), lsproto.LanguageKindTypeScript)
				session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

				err := utils.FS().Remove("/home/projects/TS/p1/src/x.ts")
				assert.NilError(t, err)

				session.DidCloseFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts")

				ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
				assert.NilError(t, err)
				program := ls.GetProgram()
				assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts") == nil)

				err = utils.FS().WriteFile("/home/projects/TS/p1/src/x.ts", "", false)
				assert.NilError(t, err)

				session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, "", lsproto.LanguageKindTypeScript)

				ls, err = session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/x.ts")
				assert.NilError(t, err)
				program = ls.GetProgram()
				assert.Assert(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts") != nil)
				assert.Equal(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts").Text(), "")
			})

			t.Run("close untitled file", func(t *testing.T) {
				t.Parallel()
				session, _ := projecttestutil.Setup(defaultFiles)

				session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "let x = 1;", lsproto.LanguageKindTypeScript)
				session.DidCloseFile(context.Background(), "untitled:Untitled-1")
				session.DidOpenFile(context.Background(), "untitled:Untitled-2", 1, "", lsproto.LanguageKindTypeScript)
			})
		})
	})

	t.Run("DidSaveFile", func(t *testing.T) {
		t.Parallel()
		t.Run("save event first", func(t *testing.T) {
			t.Parallel()
			session, _ := projecttestutil.Setup(defaultFiles)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, defaultFiles["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			snapshot, release := session.Snapshot()
			defer release()
			assert.Equal(t, snapshot.ID(), uint64(1))

			session.DidSaveFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/src/index.ts",
				},
			})

			session.WaitForBackgroundTasks()
			snapshot, release = session.Snapshot()
			defer release()
			// We didn't need a snapshot change, but the session overlays should be updated.
			assert.Equal(t, snapshot.ID(), uint64(1))

			// Open another file to force a snapshot update so we can see the changes.
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, defaultFiles["/home/projects/TS/p1/src/x.ts"].(string), lsproto.LanguageKindTypeScript)
			snapshot, release = session.Snapshot()
			defer release()
			assert.Equal(t, snapshot.GetFile("/home/projects/TS/p1/src/index.ts").MatchesDiskText(), true)
		})

		t.Run("watch event first", func(t *testing.T) {
			t.Parallel()
			session, _ := projecttestutil.Setup(defaultFiles)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, defaultFiles["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			snapshot, release := session.Snapshot()
			defer release()
			assert.Equal(t, snapshot.ID(), uint64(1))

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/src/index.ts",
				},
			})
			session.DidSaveFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts")

			session.WaitForBackgroundTasks()
			snapshot, release = session.Snapshot()
			defer release()
			// We didn't need a snapshot change, but the session overlays should be updated.
			assert.Equal(t, snapshot.ID(), uint64(1))

			// Open another file to force a snapshot update so we can see the changes.
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, defaultFiles["/home/projects/TS/p1/src/x.ts"].(string), lsproto.LanguageKindTypeScript)
			snapshot, release = session.Snapshot()
			defer release()
			assert.Equal(t, snapshot.GetFile("/home/projects/TS/p1/src/index.ts").MatchesDiskText(), true)
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
					"noCheck": true
				}
			}`
			files["/home/projects/TS/p2/src/index.ts"] = `import { x } from "../../p1/src/x";`
			session, _ := projecttestutil.Setup(files)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p2/src/index.ts", 1, files["/home/projects/TS/p2/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			snapshot, release := session.Snapshot()
			defer release()
			assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 2)

			ls1, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program1 := ls1.GetProgram()

			ls2, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p2/src/index.ts")
			assert.NilError(t, err)
			program2 := ls2.GetProgram()

			assert.Equal(t,
				program1.GetSourceFile("/home/projects/TS/p1/src/x.ts"),
				program2.GetSourceFile("/home/projects/TS/p1/src/x.ts"),
			)
		})

		t.Run("projects with different options do not share source files", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			files["/home/projects/TS/p2/tsconfig.json"] = `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true,
					"moduleDetection": "auto"
				},
				"include": ["src"]
			}`
			files["/home/projects/TS/p2/src/index.ts"] = `import { x } from "../../p1/src/x";`
			session, _ := projecttestutil.Setup(files)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p2/src/index.ts", 1, files["/home/projects/TS/p2/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			snapshot, release := session.Snapshot()
			defer release()
			assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 2)

			ls1, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program1 := ls1.GetProgram()

			ls2, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p2/src/index.ts")
			assert.NilError(t, err)
			program2 := ls2.GetProgram()

			x1 := program1.GetSourceFile("/home/projects/TS/p1/src/x.ts")
			x2 := program2.GetSourceFile("/home/projects/TS/p1/src/x.ts")
			assert.Assert(t, x1 != nil && x2 != nil)
			assert.Assert(t, x1 != x2)
		})
	})

	t.Run("DidChangeWatchedFiles", func(t *testing.T) {
		t.Parallel()

		t.Run("change open file", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			session, utils := projecttestutil.Setup(files)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, files["/home/projects/TS/p1/src/x.ts"].(string), lsproto.LanguageKindTypeScript)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			lsBefore, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			programBefore := lsBefore.GetProgram()

			err = utils.FS().WriteFile("/home/projects/TS/p1/src/x.ts", `export const x = 2;`, false)
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/src/x.ts",
				},
			})

			lsAfter, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			// Program should remain the same since the file is open and changes are handled through DidChangeTextDocument
			assert.Equal(t, programBefore, lsAfter.GetProgram())
		})

		t.Run("change closed program file", func(t *testing.T) {
			t.Parallel()
			files := maps.Clone(defaultFiles)
			session, utils := projecttestutil.Setup(files)

			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			lsBefore, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			programBefore := lsBefore.GetProgram()

			err = utils.FS().WriteFile("/home/projects/TS/p1/src/x.ts", `export const x = 2;`, false)
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/src/x.ts",
				},
			})

			lsAfter, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			assert.Check(t, lsAfter.GetProgram() != programBefore)
		})

		t.Run("change program file not in tsconfig root files", func(t *testing.T) {
			t.Parallel()
			for _, workspaceDir := range []string{"/", "/home/projects/TS/p1", "/somewhere/else/entirely"} {
				t.Run("workspaceDir="+strings.ReplaceAll(workspaceDir, "/", "_"), func(t *testing.T) {
					t.Parallel()
					files := map[string]any{
						"/home/projects/TS/p1/tsconfig.json": `{
							"compilerOptions": {
								"noLib": true,
								"module": "nodenext",
								"strict": true
							},
							"files": ["src/index.ts"]
						}`,
						"/home/projects/TS/p1/src/index.ts": `import { x } from "../../x";`,
						"/home/projects/TS/x.ts":            `export const x = 1;`,
					}

					session, utils := projecttestutil.SetupWithOptions(files, &project.SessionOptions{
						CurrentDirectory:   workspaceDir,
						DefaultLibraryPath: bundled.LibPath(),
						TypingsLocation:    projecttestutil.TestTypingsLocation,
						PositionEncoding:   lsproto.PositionEncodingKindUTF8,
						WatchEnabled:       true,
						LoggingEnabled:     true,
					})
					session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
					lsBefore, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
					assert.NilError(t, err)
					programBefore := lsBefore.GetProgram()
					session.WaitForBackgroundTasks()

					var xWatched bool
				outer:
					for _, call := range utils.Client().WatchFilesCalls() {
						for _, watcher := range call.Watchers {
							if core.Must(glob.Parse(*watcher.GlobPattern.Pattern)).Match("/home/projects/TS/x.ts") {
								xWatched = true
								break outer
							}
						}
					}
					assert.Check(t, xWatched)

					err = utils.FS().WriteFile("/home/projects/TS/x.ts", `export const x = 2;`, false)
					assert.NilError(t, err)

					session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
						{
							Type: lsproto.FileChangeTypeChanged,
							Uri:  "file:///home/projects/TS/x.ts",
						},
					})

					lsAfter, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
					assert.NilError(t, err)
					assert.Check(t, lsAfter.GetProgram() != programBefore)
				})
			}
		})

		t.Run("change config file", func(t *testing.T) {
			t.Parallel()
			files := map[string]any{
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

			session, utils := projecttestutil.Setup(files)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program := ls.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)

			err = utils.FS().WriteFile("/home/projects/TS/p1/tsconfig.json", `{
				"compilerOptions": {
					"noLib": false,
					"strict": true
				}
			}`, false)
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeChanged,
					Uri:  "file:///home/projects/TS/p1/tsconfig.json",
				},
			})

			ls, err = session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program = ls.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)
		})

		t.Run("delete explicitly included file", func(t *testing.T) {
			t.Parallel()
			files := map[string]any{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true
					},
					"files": ["src/index.ts", "src/x.ts"]
				}`,
				"/home/projects/TS/p1/src/x.ts":     `export declare const x: number | undefined;`,
				"/home/projects/TS/p1/src/index.ts": `import { x } from "./x";`,
			}
			session, utils := projecttestutil.Setup(files)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program := ls.GetProgram()
			assert.Check(t, slices.Contains(program.CommandLine().ParsedConfig.FileNames, "/home/projects/TS/p1/src/x.ts"))
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)

			err = utils.FS().Remove("/home/projects/TS/p1/src/x.ts")
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeDeleted,
					Uri:  "file:///home/projects/TS/p1/src/x.ts",
				},
			})

			ls, err = session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program = ls.GetProgram()
			// File name is still in the command line, was explicitly included
			assert.Check(t, slices.Contains(program.CommandLine().ParsedConfig.FileNames, "/home/projects/TS/p1/src/x.ts"))
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)
			assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/x.ts") == nil)

			// Open file to trigger cleanup
			session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)
			snapshot, release := session.Snapshot()
			defer release()
			assert.Check(t, snapshot.GetFile("/home/projects/TS/p1/src/x.ts") == nil)
		})

		t.Run("delete wildcard included file", func(t *testing.T) {
			t.Parallel()
			files := map[string]any{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true
					},
					"include": ["src"]
				}`,
				"/home/projects/TS/p1/src/index.ts": `let x = 2;`,
				"/home/projects/TS/p1/src/x.ts":     `let y = x;`,
			}
			session, utils := projecttestutil.Setup(files)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/x.ts", 1, files["/home/projects/TS/p1/src/x.ts"].(string), lsproto.LanguageKindTypeScript)

			ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/x.ts")
			assert.NilError(t, err)
			program := ls.GetProgram()
			assert.Check(t, slices.Contains(program.CommandLine().ParsedConfig.FileNames, "/home/projects/TS/p1/src/index.ts"))
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/x.ts"))), 0)

			err = utils.FS().Remove("/home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeDeleted,
					Uri:  "file:///home/projects/TS/p1/src/index.ts",
				},
			})

			ls, err = session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/x.ts")
			assert.NilError(t, err)
			program = ls.GetProgram()
			// File name is gone from the command line, was originally included via wildcard
			assert.Check(t, !slices.Contains(program.CommandLine().ParsedConfig.FileNames, "/home/projects/TS/p1/src/index.ts"))
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/x.ts"))), 1)

			// Open file to trigger cleanup
			session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)
			snapshot, release := session.Snapshot()
			defer release()
			assert.Check(t, snapshot.GetFile("/home/projects/TS/p1/src/index.ts") == nil)
		})

		t.Run("create explicitly included file", func(t *testing.T) {
			t.Parallel()
			files := map[string]any{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true
					},
					"files": ["src/index.ts", "src/y.ts"]
				}`,
				"/home/projects/TS/p1/src/index.ts": `import { y } from "./y";`,
			}
			session, utils := projecttestutil.Setup(files)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program := ls.GetProgram()

			// Initially should have an error because y.ts is missing
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)

			// Add the missing file
			err = utils.FS().WriteFile("/home/projects/TS/p1/src/y.ts", `export const y = 1;`, false)
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeCreated,
					Uri:  "file:///home/projects/TS/p1/src/y.ts",
				},
			})

			// Error should be resolved
			ls, err = session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program = ls.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)
			assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/y.ts") != nil)
		})

		t.Run("create failed lookup location", func(t *testing.T) {
			t.Parallel()
			files := map[string]any{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true
					},
					"files": ["src/index.ts"]
				}`,
				"/home/projects/TS/p1/src/index.ts": `import { z } from "./z";`,
			}
			session, utils := projecttestutil.Setup(files)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program := ls.GetProgram()

			// Initially should have an error because z.ts is missing
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)

			// Add a new file through failed lookup watch
			err = utils.FS().WriteFile("/home/projects/TS/p1/src/z.ts", `export const z = 1;`, false)
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeCreated,
					Uri:  "file:///home/projects/TS/p1/src/z.ts",
				},
			})

			// Error should be resolved and the new file should be included in the program
			ls, err = session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program = ls.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)
			assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/z.ts") != nil)
		})

		t.Run("create wildcard included file", func(t *testing.T) {
			t.Parallel()
			files := map[string]any{
				"/home/projects/TS/p1/tsconfig.json": `{
					"compilerOptions": {
						"noLib": true
					},
					"include": ["src"]
				}`,
				"/home/projects/TS/p1/src/index.ts": `a;`,
			}
			session, utils := projecttestutil.Setup(files)
			session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/src/index.ts", 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			ls, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program := ls.GetProgram()

			// Initially should have an error because declaration for 'a' is missing
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 1)

			// Add a new file through wildcard watch
			err = utils.FS().WriteFile("/home/projects/TS/p1/src/a.ts", `const a = 1;`, false)
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
				{
					Type: lsproto.FileChangeTypeCreated,
					Uri:  "file:///home/projects/TS/p1/src/a.ts",
				},
			})

			// Error should be resolved and the new file should be included in the program
			ls, err = session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/src/index.ts")
			assert.NilError(t, err)
			program = ls.GetProgram()
			assert.Equal(t, len(program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile("/home/projects/TS/p1/src/index.ts"))), 0)
			assert.Check(t, program.GetSourceFile("/home/projects/TS/p1/src/a.ts") != nil)
		})
	})

	t.Run("refreshes code lenses and inlay hints when relevant user preferences change", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json": "{}",
			"/src/index.ts":      "export const x = 1;",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)

		session.Configure(lsutil.NewUserConfig(nil))
		// Change user preferences for code lens and inlay hints.
		newPrefs := session.Config().TS()
		newPrefs.CodeLens.ReferencesCodeLensEnabled = !newPrefs.CodeLens.ReferencesCodeLensEnabled
		newPrefs.InlayHints.IncludeInlayFunctionLikeReturnTypeHints = !newPrefs.InlayHints.IncludeInlayFunctionLikeReturnTypeHints

		session.Configure(lsutil.NewUserConfig(newPrefs))

		codeLensRefreshCalls := utils.Client().RefreshCodeLensCalls()
		inlayHintsRefreshCalls := utils.Client().RefreshInlayHintsCalls()
		assert.Equal(t, len(codeLensRefreshCalls), 1, "expected one RefreshCodeLens call after code lens preference change")
		assert.Equal(t, len(inlayHintsRefreshCalls), 1, "expected one RefreshInlayHints call after inlay hints preference change")
	})

	t.Run("config parsing", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json": "{}",
			"/src/index.ts":      "export const x = 1;",
		}
		session, _ := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)

		configMap1 := map[string]any{
			"UseAliasesForRename":       true,
			"QuotePreference":           "single",
			"OrganizeImportsIgnoreCase": true,
		}
		// set "typescript" options only
		session.Configure(lsutil.ParseNewUserConfig(map[string]any{"typescript": configMap1}))
		actualConfig1 := session.Config()
		expectedPrefs1 := lsutil.NewDefaultUserPreferences()
		expectedPrefs1.UseAliasesForRename = core.TSTrue
		expectedPrefs1.QuotePreference = lsutil.QuotePreferenceSingle
		expectedPrefs1.OrganizeImportsIgnoreCase = core.TSTrue

		// "javascript" options should default to ts
		assert.DeepEqual(t, *actualConfig1.TS(), *expectedPrefs1)
		assert.DeepEqual(t, *actualConfig1.JS(), *expectedPrefs1)

		configMap2 := map[string]any{
			"UseAliasesForRename":       false,
			"QuotePreference":           "double",
			"OrganizeImportsIgnoreCase": false,
		}
		// set "javascript" options only
		session.Configure(lsutil.ParseNewUserConfig(map[string]any{"javascript": configMap2}))
		actualConfig2 := session.Config()
		expectedPrefs2 := lsutil.NewDefaultUserPreferences()
		expectedPrefs2.UseAliasesForRename = core.TSFalse
		expectedPrefs2.QuotePreference = lsutil.QuotePreferenceDouble
		expectedPrefs2.OrganizeImportsIgnoreCase = core.TSFalse
		// "typescript" options should not change
		assert.DeepEqual(t, *actualConfig2.TS(), *expectedPrefs1)
		assert.DeepEqual(t, *actualConfig2.JS(), *expectedPrefs2)
	})
}

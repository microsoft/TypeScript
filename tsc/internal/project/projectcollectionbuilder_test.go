package project_test

import (
	"context"
	"fmt"
	"maps"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestProjectCollectionBuilder(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("when project found is solution referencing default project directly", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-src.json"}, "", nil)
		session, _ := projecttestutil.Setup(files)
		uri := lsproto.DocumentUri("file:///user/username/projects/myproject/src/main.ts")
		content := files["/user/username/projects/myproject/src/main.ts"].(string)

		// Ensure configured project is found for open file
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json")) != nil)

		// Ensure request can use existing snapshot
		_, err := session.GetLanguageService(context.Background(), uri)
		assert.NilError(t, err)
		requestSnapshot, requestRelease := session.Snapshot()
		defer requestRelease()
		assert.Equal(t, requestSnapshot, snapshot)

		// Searched configs should be present while file is open
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") != nil, "solution config should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") != nil, "direct reference should be present")

		// Close the file and open one in an inferred project
		session.DidCloseFile(context.Background(), uri)
		dummyUri := lsproto.DocumentUri("file:///user/username/workspaces/dummy/dummy.ts")
		session.DidOpenFile(context.Background(), dummyUri, 1, "const x = 1;", lsproto.LanguageKindTypeScript)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Config files should have been released
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") == nil)
	})

	t.Run("when project found is solution referencing default project indirectly", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-indirect1.json", "./tsconfig-indirect2.json"}, "", nil)
		applyIndirectProjectFiles(files, 1, "")
		applyIndirectProjectFiles(files, 2, "")
		session, _ := projecttestutil.Setup(files)
		uri := lsproto.DocumentUri("file:///user/username/projects/myproject/src/main.ts")
		content := files["/user/username/projects/myproject/src/main.ts"].(string)

		// Ensure configured project is found for open file
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		srcProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json"))
		assert.Assert(t, srcProject != nil)

		// Verify the default project is the source project
		defaultProject := snapshot.GetDefaultProject(uri)
		assert.Equal(t, defaultProject, srcProject)

		// Searched configs should be present while file is open
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") != nil, "solution config should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-indirect1.json") != nil, "direct reference should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") != nil, "indirect reference should be present")

		// Close the file and open one in an inferred project
		session.DidCloseFile(context.Background(), uri)
		dummyUri := lsproto.DocumentUri("file:///user/username/workspaces/dummy/dummy.ts")
		session.DidOpenFile(context.Background(), dummyUri, 1, "const x = 1;", lsproto.LanguageKindTypeScript)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Config files should be released
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-indirect1.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-indirect2.json") == nil)
	})

	t.Run("when project found is solution with disableReferencedProjectLoad referencing default project directly", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-src.json"}, `"disableReferencedProjectLoad": true`, nil)
		session, _ := projecttestutil.Setup(files)
		uri := lsproto.DocumentUri("file:///user/username/projects/myproject/src/main.ts")
		content := files["/user/username/projects/myproject/src/main.ts"].(string)

		// Ensure no configured project is created due to disableReferencedProjectLoad
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json")) == nil)

		// Should use inferred project instead
		defaultProject := snapshot.GetDefaultProject(uri)
		assert.Assert(t, defaultProject != nil)
		assert.Equal(t, defaultProject.Kind, project.KindInferred)

		// Searched configs should be present while file is open
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") != nil, "solution config should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") == nil, "direct reference should not be present")

		// Close the file and open another one in the inferred project
		session.DidCloseFile(context.Background(), uri)
		dummyUri := lsproto.DocumentUri("file:///user/username/workspaces/dummy/dummy.ts")
		session.DidOpenFile(context.Background(), dummyUri, 1, "const x = 1;", lsproto.LanguageKindTypeScript)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Config files should be released
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") == nil)
	})

	t.Run("when project found is solution referencing default project indirectly through disableReferencedProjectLoad", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-indirect1.json"}, "", nil)
		applyIndirectProjectFiles(files, 1, `"disableReferencedProjectLoad": true`)
		session, _ := projecttestutil.Setup(files)
		uri := lsproto.DocumentUri("file:///user/username/projects/myproject/src/main.ts")
		content := files["/user/username/projects/myproject/src/main.ts"].(string)

		// Ensure no configured project is created due to disableReferencedProjectLoad in indirect project
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json")) == nil)

		// Should use inferred project instead
		defaultProject := snapshot.GetDefaultProject(uri)
		assert.Assert(t, defaultProject != nil)
		assert.Equal(t, defaultProject.Kind, project.KindInferred)

		// Searched configs should be present while file is open
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") != nil, "solution config should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-indirect1.json") != nil, "solution direct reference should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") == nil, "indirect reference should not be present")

		// Close the file and open another one in the inferred project
		session.DidCloseFile(context.Background(), uri)
		dummyUri := lsproto.DocumentUri("file:///user/username/workspaces/dummy/dummy.ts")
		session.DidOpenFile(context.Background(), dummyUri, 1, "const x = 1;", lsproto.LanguageKindTypeScript)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Config files should be released
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-indirect1.json") == nil)
	})

	t.Run("when project found is solution referencing default project indirectly through disableReferencedProjectLoad in one but without it in another", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-indirect1.json", "./tsconfig-indirect2.json"}, "", nil)
		applyIndirectProjectFiles(files, 1, `"disableReferencedProjectLoad": true`)
		applyIndirectProjectFiles(files, 2, "")
		session, _ := projecttestutil.Setup(files)
		uri := lsproto.DocumentUri("file:///user/username/projects/myproject/src/main.ts")
		content := files["/user/username/projects/myproject/src/main.ts"].(string)

		// Ensure configured project is found through the indirect project without disableReferencedProjectLoad
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		srcProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json"))
		assert.Assert(t, srcProject != nil)

		// Verify the default project is the source project (found through indirect2, not indirect1)
		defaultProject := snapshot.GetDefaultProject(uri)
		assert.Equal(t, defaultProject, srcProject)

		// Searched configs should be present while file is open
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") != nil, "solution config should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-indirect1.json") != nil, "direct reference 1 should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-indirect2.json") != nil, "direct reference 2 should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") != nil, "indirect reference should be present")

		// Close the file and open another one in the inferred project
		session.DidCloseFile(context.Background(), uri)
		dummyUri := lsproto.DocumentUri("file:///user/username/workspaces/dummy/dummy.ts")
		session.DidOpenFile(context.Background(), dummyUri, 1, "const x = 1;", lsproto.LanguageKindTypeScript)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Config files should be released
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-indirect1.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-indirect2.json") == nil)
	})

	t.Run("when project found is project with own files referencing the file from referenced project", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-src.json"}, "", []string{`"./own/main.ts"`})
		files["/user/username/projects/myproject/own/main.ts"] = `
			import { foo } from '../src/main';
			foo;
			export function bar() {}
		`
		session, _ := projecttestutil.Setup(files)
		uri := lsproto.DocumentUri("file:///user/username/projects/myproject/src/main.ts")
		content := files["/user/username/projects/myproject/src/main.ts"].(string)

		// Ensure configured project is found for open file - should load both projects
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 2)
		srcProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json"))
		assert.Assert(t, srcProject != nil)
		ancestorProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig.json"))
		assert.Assert(t, ancestorProject != nil)

		// Verify the default project is the source project
		defaultProject := snapshot.GetDefaultProject(uri)
		assert.Equal(t, defaultProject, srcProject)

		// Searched configs should be present while file is open
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") != nil, "solution config should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") != nil, "direct reference should be present")

		// Close the file and open another one in the inferred project
		session.DidCloseFile(context.Background(), uri)
		dummyUri := lsproto.DocumentUri("file:///user/username/workspaces/dummy/dummy.ts")
		session.DidOpenFile(context.Background(), dummyUri, 1, "const x = 1;", lsproto.LanguageKindTypeScript)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Config files should be released
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig-src.json") == nil)
	})

	t.Run("when file is not part of first config tree found, looks into ancestor folder and its references to find default project", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/src/projects/project/app/Component-demos.ts": `
                import * as helpers from 'demos/helpers';
                export const demo = () => {
                    helpers;
                }
            `,
			"/home/src/projects/project/app/Component.ts": `export const Component = () => {}`,
			"/home/src/projects/project/app/tsconfig.json": `{
				"compilerOptions": {
					"composite": true,
					"outDir": "../app-dist/",
				},
				"include": ["**/*"],
				"exclude": ["**/*-demos.*"],
			}`,
			"/home/src/projects/project/demos/helpers.ts": "export const foo = 1;",
			"/home/src/projects/project/demos/tsconfig.json": `{
				"compilerOptions": {
					"composite": true,
					"rootDir": "../",
					"outDir": "../demos-dist/",
					"paths": {
						"demos/*": ["./*"],
					},
				},
				"include": [
					"**/*",
					"../app/**/*-demos.*",
				],
			}`,
			"/home/src/projects/project/tsconfig.json": `{
				"compilerOptions": {
					"outDir": "./dist/",
				},
				"references": [
					{ "path": "./demos/tsconfig.json" },
					{ "path": "./app/tsconfig.json" },
				],
				"files": []
			}`,
		}
		session, _ := projecttestutil.Setup(files)
		uri := lsproto.DocumentUri("file:///home/src/projects/project/app/Component-demos.ts")
		content := files["/home/src/projects/project/app/Component-demos.ts"].(string)

		// Ensure configured project is found for open file
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		demoProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/src/projects/project/demos/tsconfig.json"))
		assert.Assert(t, demoProject != nil)

		// Verify the default project is the demos project (not the app project that excludes demos files)
		defaultProject := snapshot.GetDefaultProject(uri)
		assert.Equal(t, defaultProject, demoProject)

		// Searched configs should be present while file is open
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/app/tsconfig.json") != nil, "app config should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/demos/tsconfig.json") != nil, "demos config should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/tsconfig.json") != nil, "solution config should be present")

		// Close the file and open another one in the inferred project
		session.DidCloseFile(context.Background(), uri)
		dummyUri := lsproto.DocumentUri("file:///user/username/workspaces/dummy/dummy.ts")
		session.DidOpenFile(context.Background(), dummyUri, 1, "const x = 1;", lsproto.LanguageKindTypeScript)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Config files should be released
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/app/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/demos/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/tsconfig.json") == nil)
	})

	t.Run("when dts file is next to ts file and included as root in referenced project", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/src/projects/project/src/index.d.ts": `
                 declare global {
                    interface Window {
                        electron: ElectronAPI
                        api: unknown
                    }
                }
            `,
			"/home/src/projects/project/src/index.ts": `const api = {}`,
			"/home/src/projects/project/tsconfig.json": `{
				"include": [
					"src/*.d.ts",
				],
				"references": [{ "path": "./tsconfig.node.json" }],
			}`,
			"/home/src/projects/project/tsconfig.node.json": `{
				"include": ["src/**/*"],
                "compilerOptions": {
                    "composite": true,
                },
			}`,
		}
		session, _ := projecttestutil.Setup(files)
		uri := lsproto.DocumentUri("file:///home/src/projects/project/src/index.d.ts")
		content := files["/home/src/projects/project/src/index.d.ts"].(string)

		// Ensure configured projects are found for open file
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 2)
		rootProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/src/projects/project/tsconfig.json"))
		assert.Assert(t, rootProject != nil)

		// Verify the default project is inferred
		defaultProject := snapshot.GetDefaultProject(uri)
		assert.Assert(t, defaultProject != nil)
		assert.Equal(t, defaultProject.Kind, project.KindInferred)

		// Searched configs should be present while file is open
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/tsconfig.json") != nil, "root config should be present")
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/tsconfig.node.json") != nil, "node config should be present")

		// Close the file and open another one in the inferred project
		session.DidCloseFile(context.Background(), uri)
		dummyUri := lsproto.DocumentUri("file:///user/username/workspaces/dummy/dummy.ts")
		session.DidOpenFile(context.Background(), dummyUri, 1, "const x = 1;", lsproto.LanguageKindTypeScript)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Config files should be released
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/home/src/projects/project/tsconfig.node.json") == nil)
	})

	t.Run("#1630", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/project/lib/tsconfig.json": `{
				"files": ["a.ts"]
			}`,
			"/project/lib/a.ts": `export const a = 1;`,
			"/project/lib/b.ts": `export const b = 1;`,
			"/project/tsconfig.json": `{
				"files": [],
				"references": [{ "path": "./lib" }],
				"compilerOptions": {
					"disableReferencedProjectLoad": true
				}
			}`,
			"/project/index.ts": ``,
		}

		session, _ := projecttestutil.Setup(files)

		// opening b.ts puts /project/lib/tsconfig.json in the config file registry and creates the project,
		// but the project is ultimately not a match
		session.DidOpenFile(context.Background(), "file:///project/lib/b.ts", 1, files["/project/lib/b.ts"].(string), lsproto.LanguageKindTypeScript)
		// opening an unrelated file triggers cleanup of /project/lib/tsconfig.json since no open file is part of that project,
		// but will keep the config file in the registry since lib/b.ts is still open
		session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)
		// Opening index.ts searches /project/tsconfig.json and then checks /project/lib/tsconfig.json without opening it.
		// No early return on config file existence means we try to find an already open project, which returns nil,
		// triggering a crash.
		session.DidOpenFile(context.Background(), "file:///project/index.ts", 1, files["/project/index.ts"].(string), lsproto.LanguageKindTypeScript)
	})

	t.Run("inferred project root files are in stable order", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/project/a.ts": `export const a = 1;`,
			"/project/b.ts": `export const b = 1;`,
			"/project/c.ts": `export const c = 1;`,
		}

		session, _ := projecttestutil.Setup(files)

		// b, c, a
		session.DidOpenFile(context.Background(), "file:///project/b.ts", 1, files["/project/b.ts"].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(context.Background(), "file:///project/c.ts", 1, files["/project/c.ts"].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(context.Background(), "file:///project/a.ts", 1, files["/project/a.ts"].(string), lsproto.LanguageKindTypeScript)

		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		inferredProject := snapshot.ProjectCollection.InferredProject()
		assert.Assert(t, inferredProject != nil)
		// It's more bookkeeping to maintain order of opening, since any file can move into or out of
		// the inferred project due to changes in other projects. Order shouldn't matter for correctness,
		// we just want it to be consistent, in case there are observable type ordering issues.
		assert.DeepEqual(t, inferredProject.Program.CommandLine().FileNames(), []string{
			"/project/a.ts",
			"/project/b.ts",
			"/project/c.ts",
		})
	})

	t.Run("project lookup terminates", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/tsconfig.json": `{
				"files": [],
				"references": [
					{
						"path": "./packages/pkg1"
					},
					{
						"path": "./packages/pkg2"
					},
				]
			}`,
			"/packages/pkg1/tsconfig.json": `{
				"include": ["src/**/*.ts"],
				"compilerOptions": {
					"composite": true,
				},
				"references": [
					{
						"path": "../pkg2"
					},
				]
			}`,
			"/packages/pkg2/tsconfig.json": `{
				"include": ["src/**/*.ts"],
				"compilerOptions": {
					"composite": true,
				},
				"references": [
					{
						"path": "../pkg1"
					},
				]
			}`,
			"/script.ts": `export const a = 1;`,
		}
		session, _ := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///script.ts", 1, files["/script.ts"].(string), lsproto.LanguageKindTypeScript)
		// Test should terminate
	})
}

func filesForSolutionConfigFile(solutionRefs []string, compilerOptions string, ownFiles []string) map[string]any {
	var compilerOptionsStr string
	if compilerOptions != "" {
		compilerOptionsStr = fmt.Sprintf(`"compilerOptions": {
			%s
		},`, compilerOptions)
	}
	var ownFilesStr string
	if len(ownFiles) > 0 {
		ownFilesStr = strings.Join(ownFiles, ",")
	}
	files := map[string]any{
		"/user/username/projects/myproject/tsconfig.json": fmt.Sprintf(`{
			%s
			"files": [%s],
			"references": [
				%s
			]
		}`, compilerOptionsStr, ownFilesStr, strings.Join(core.Map(solutionRefs, func(ref string) string {
			return fmt.Sprintf(`{ "path": "%s" }`, ref)
		}), ",")),
		"/user/username/projects/myproject/tsconfig-src.json": `{
			"compilerOptions": {
				"composite": true,
				"outDir": "./target",
			},
			"include": ["./src/**/*"]
		}`,
		"/user/username/projects/myproject/src/main.ts": `
			import { foo } from './helpers/functions';
			export { foo };`,
		"/user/username/projects/myproject/src/helpers/functions.ts": `export const foo = 1;`,
	}
	return files
}

func applyIndirectProjectFiles(files map[string]any, projectIndex int, compilerOptions string) {
	maps.Copy(files, filesForIndirectProject(projectIndex, compilerOptions))
}

func filesForIndirectProject(projectIndex int, compilerOptions string) map[string]any {
	files := map[string]any{
		fmt.Sprintf("/user/username/projects/myproject/tsconfig-indirect%d.json", projectIndex): fmt.Sprintf(`{
			"compilerOptions": {
				"composite": true,
				"outDir": "./target/",
				%s
			},
			"files": [
				"./indirect%d/main.ts"
			],
			"references": [
				{
				"path": "./tsconfig-src.json"
				}
			]
		}`, compilerOptions, projectIndex),
		fmt.Sprintf("/user/username/projects/myproject/indirect%d/main.ts", projectIndex): `export const indirect = 1;`,
	}
	return files
}

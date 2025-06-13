package project_test

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestDefaultProjectFinder(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("when project found is solution referencing default project directly", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-src.json"}, "", nil)
		service, _ := projecttestutil.Setup(files, nil)
		service.OpenFile("/user/username/projects/myproject/src/main.ts", files["/user/username/projects/myproject/src/main.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		srcProject := service.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json"))
		assert.Assert(t, srcProject != nil)
		_, project := service.EnsureDefaultProjectForFile("/user/username/projects/myproject/src/main.ts")
		assert.Equal(t, project, srcProject)
		service.CloseFile("/user/username/projects/myproject/src/main.ts")
		service.OpenFile("/user/username/workspaces/dummy/dummy.ts", "const x = 1;", core.ScriptKindTS, "/user/username/workspaces/dummy")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("/user/username/workspaces/dummy")) != nil)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-src.json"), false)
	})

	t.Run("when project found is solution referencing default project indirectly", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-indirect1.json", "./tsconfig-indirect2.json"}, "", nil)
		applyIndirectProjectFiles(files, 1, "")
		applyIndirectProjectFiles(files, 2, "")
		service, _ := projecttestutil.Setup(files, nil)
		service.OpenFile("/user/username/projects/myproject/src/main.ts", files["/user/username/projects/myproject/src/main.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		srcProject := service.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json"))
		assert.Assert(t, srcProject != nil)
		_, project := service.EnsureDefaultProjectForFile("/user/username/projects/myproject/src/main.ts")
		assert.Equal(t, project, srcProject)
		service.CloseFile("/user/username/projects/myproject/src/main.ts")
		service.OpenFile("/user/username/workspaces/dummy/dummy.ts", "const x = 1;", core.ScriptKindTS, "/user/username/workspaces/dummy")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("/user/username/workspaces/dummy")) != nil)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-src.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-indirect1.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-indirect2.json"), false)
	})

	t.Run("when project found is solution with disableReferencedProjectLoad referencing default project directly", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-src.json"}, `"disableReferencedProjectLoad": true`, nil)
		service, _ := projecttestutil.Setup(files, nil)
		service.OpenFile("/user/username/projects/myproject/src/main.ts", files["/user/username/projects/myproject/src/main.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json")) == nil)
		// Should not create referenced project
		_, proj := service.EnsureDefaultProjectForFile("/user/username/projects/myproject/src/main.ts")
		assert.Equal(t, proj.Kind(), project.KindInferred)
		service.CloseFile("/user/username/projects/myproject/src/main.ts")
		service.OpenFile("/user/username/workspaces/dummy/dummy.ts", "const x = 1;", core.ScriptKindTS, "/user/username/workspaces/dummy")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("/user/username/workspaces/dummy")) != nil)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-src.json"), false)
	})

	t.Run("when project found is solution referencing default project indirectly through  with disableReferencedProjectLoad", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-indirect1.json"}, "", nil)
		applyIndirectProjectFiles(files, 1, `"disableReferencedProjectLoad": true`)
		service, _ := projecttestutil.Setup(files, nil)
		service.OpenFile("/user/username/projects/myproject/src/main.ts", files["/user/username/projects/myproject/src/main.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json")) == nil)
		// Inferred project because no default is found
		_, proj := service.EnsureDefaultProjectForFile("/user/username/projects/myproject/src/main.ts")
		assert.Equal(t, proj.Kind(), project.KindInferred)
		service.CloseFile("/user/username/projects/myproject/src/main.ts")
		service.OpenFile("/user/username/workspaces/dummy/dummy.ts", "const x = 1;", core.ScriptKindTS, "/user/username/workspaces/dummy")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("/user/username/workspaces/dummy")) != nil)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-src.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-indirect1.json"), false)
	})

	t.Run("when project found is solution referencing default project indirectly through  with disableReferencedProjectLoad in one but without it in another", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-indirect1.json", "./tsconfig-indirect2.json"}, "", nil)
		applyIndirectProjectFiles(files, 1, `"disableReferencedProjectLoad": true`)
		applyIndirectProjectFiles(files, 2, "")
		service, _ := projecttestutil.Setup(files, nil)
		service.OpenFile("/user/username/projects/myproject/src/main.ts", files["/user/username/projects/myproject/src/main.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		srcProject := service.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json"))
		assert.Assert(t, srcProject != nil)
		// Default project is found through one indirect
		_, proj := service.EnsureDefaultProjectForFile("/user/username/projects/myproject/src/main.ts")
		assert.Equal(t, proj, srcProject)
		service.CloseFile("/user/username/projects/myproject/src/main.ts")
		service.OpenFile("/user/username/workspaces/dummy/dummy.ts", "const x = 1;", core.ScriptKindTS, "/user/username/workspaces/dummy")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("/user/username/workspaces/dummy")) != nil)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-src.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-indirect1.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-indirect2.json"), false)
	})

	t.Run("when project found is project with own files referencing the file from referenced project", func(t *testing.T) {
		t.Parallel()
		files := filesForSolutionConfigFile([]string{"./tsconfig-src.json"}, "", []string{"./own/main.ts"})
		files["/user/username/projects/myproject/own/main.ts"] = `
			import { foo } from '../src/main';
			foo;
			export function bar() {}
		`
		service, _ := projecttestutil.Setup(files, nil)
		service.OpenFile("/user/username/projects/myproject/src/main.ts", files["/user/username/projects/myproject/src/main.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 2)
		srcProject := service.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig-src.json"))
		assert.Assert(t, srcProject != nil)
		assert.Assert(t, service.ConfiguredProject(tspath.Path("/user/username/projects/myproject/tsconfig.json")) != nil)
		_, project := service.EnsureDefaultProjectForFile("/user/username/projects/myproject/src/main.ts")
		assert.Equal(t, project, srcProject)
		service.CloseFile("/user/username/projects/myproject/src/main.ts")
		service.OpenFile("/user/username/workspaces/dummy/dummy.ts", "const x = 1;", core.ScriptKindTS, "/user/username/workspaces/dummy")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("/user/username/workspaces/dummy")) != nil)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig.json"), false)
		configFileExists(t, service, tspath.Path("/user/username/projects/myproject/tsconfig-src.json"), false)
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
		service, _ := projecttestutil.Setup(files, nil)
		service.OpenFile("/home/src/projects/project/app/Component-demos.ts", files["/home/src/projects/project/app/Component-demos.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		demoProject := service.ConfiguredProject(tspath.Path("/home/src/projects/project/demos/tsconfig.json"))
		assert.Assert(t, demoProject != nil)
		configFileExists(t, service, tspath.Path("/home/src/projects/project/app/tsconfig.json"), true)
		configFileExists(t, service, tspath.Path("/home/src/projects/project/demos/tsconfig.json"), true)
		configFileExists(t, service, tspath.Path("/home/src/projects/project/tsconfig.json"), true)
		_, project := service.EnsureDefaultProjectForFile("/home/src/projects/project/app/Component-demos.ts")
		assert.Equal(t, project, demoProject)
		service.CloseFile("/home/src/projects/project/app/Component-demos.ts")
		service.OpenFile("/user/username/workspaces/dummy/dummy.ts", "const x = 1;", core.ScriptKindTS, "/user/username/workspaces/dummy")
		assert.Equal(t, len(service.Projects()), 1)
		assert.Assert(t, service.InferredProject(tspath.Path("/user/username/workspaces/dummy")) != nil)
		configFileExists(t, service, tspath.Path("/home/src/projects/project/app/tsconfig.json"), false)
		configFileExists(t, service, tspath.Path("/home/src/projects/project/demos/tsconfig.json"), false)
		configFileExists(t, service, tspath.Path("/home/src/projects/project/tsconfig.json"), false)
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
				include: ["src/**/*"],
                compilerOptions: {
                    composite: true,
                },
			}`,
		}
		service, _ := projecttestutil.Setup(files, nil)
		service.OpenFile("/home/src/projects/project/src/index.d.ts", files["/home/src/projects/project/src/index.d.ts"].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 2)
		assert.Assert(t, service.ConfiguredProject(tspath.Path("/home/src/projects/project/tsconfig.json")) != nil)
		_, proj := service.EnsureDefaultProjectForFile("/home/src/projects/project/src/index.d.ts")
		assert.Equal(t, proj.Kind(), project.KindInferred)
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
			import { foo } from './src/helpers/functions';
			export { foo };`,
		"/user/username/projects/myproject/src/helpers/functions.ts": `export const foo = 1;`,
	}
	return files
}

func applyIndirectProjectFiles(files map[string]any, projectIndex int, compilerOptions string) {
	for k, v := range filesForIndirectProject(projectIndex, compilerOptions) {
		files[k] = v
	}
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

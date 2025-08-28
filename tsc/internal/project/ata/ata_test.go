package ata_test

import (
	"context"
	"slices"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestATA(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("local module should not be picked up", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js":    `const c = require('./config');`,
			"/user/username/projects/project/config.js": `export let x = 1`,
			"/user/username/projects/project/jsconfig.json": `{
					"compilerOptions": { "moduleResolution": "commonjs" },
					"typeAcquisition": { "enable": true }
			}`,
		}

		testOptions := &projecttestutil.TypingsInstallerOptions{
			TypesRegistry: []string{"config"},
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, testOptions)
		uri := lsproto.DocumentUri("file:///user/username/projects/project/app.js")
		content := files["/user/username/projects/project/app.js"].(string)

		// Open the file
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()
		ls, err := session.GetLanguageService(context.Background(), uri)
		assert.NilError(t, err)
		// Verify the local config.js file is included in the program
		program := ls.GetProgram()
		assert.Assert(t, program != nil)
		configFile := program.GetSourceFile("/user/username/projects/project/config.js")
		assert.Assert(t, configFile != nil, "local config.js should be included")

		// Verify that only types-registry was installed (no @types/config since it's a local module)
		npmCalls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, len(npmCalls), 1)
		assert.Equal(t, npmCalls[0].Args[2], "types-registry@latest")
	})

	t.Run("configured projects", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js": ``,
			"/user/username/projects/project/tsconfig.json": `{
				"compilerOptions": { "allowJs": true },
				"typeAcquisition": { "enable": true },
			}`,
			"/user/username/projects/project/package.json": `{
				"name": "test",
				"dependencies": {
					"jquery": "^3.1.0"
				}
			}`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				"jquery": `declare const $: { x: number }`,
			},
		})

		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"), 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()
		npmCalls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, len(npmCalls), 2)
		assert.Equal(t, npmCalls[0].Cwd, projecttestutil.TestTypingsLocation)
		assert.Equal(t, npmCalls[0].Args[2], "types-registry@latest")
		assert.Equal(t, npmCalls[1].Cwd, projecttestutil.TestTypingsLocation)
		assert.Assert(t, slices.Contains(npmCalls[1].Args, "@types/jquery@latest"))
		assert.Equal(t, len(utils.Client().RefreshDiagnosticsCalls()), 1)
	})

	t.Run("inferred projects", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js": ``,
			"/user/username/projects/project/package.json": `{
				"name": "test",
				"dependencies": {
					"jquery": "^3.1.0"
				}
			}`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				"jquery": `declare const $: { x: number }`,
			},
		})

		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"), 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()
		// Check that npm install was called twice
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 2, len(calls), "Expected exactly 2 npm install calls")
		assert.Equal(t, calls[0].Cwd, projecttestutil.TestTypingsLocation)
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})
		assert.Equal(t, calls[1].Cwd, projecttestutil.TestTypingsLocation)
		assert.Equal(t, calls[1].Args[2], "@types/jquery@latest")

		// Verify the types file was installed
		ls, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"))
		assert.NilError(t, err)
		program := ls.GetProgram()
		jqueryTypesFile := program.GetSourceFile(projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts")
		assert.Assert(t, jqueryTypesFile != nil, "jquery types should be installed")
	})

	t.Run("type acquisition with disableFilenameBasedTypeAcquisition:true", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/jquery.js": ``,
			"/user/username/projects/project/tsconfig.json": `{
				"compilerOptions": { "allowJs": true },
				"typeAcquisition": { "enable": true, "disableFilenameBasedTypeAcquisition": true }
			}`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			TypesRegistry: []string{"jquery"},
		})

		// Should only get types-registry install, no jquery install since filename-based acquisition is disabled
		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/jquery.js"), 1, files["/user/username/projects/project/jquery.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// Check that npm install was called once (only types-registry)
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 1, len(calls), "Expected exactly 1 npm install call")
		assert.Equal(t, calls[0].Cwd, projecttestutil.TestTypingsLocation)
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})
	})

	t.Run("discover from node_modules", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js": "",
			"/user/username/projects/project/package.json": `{
			    "dependencies": {
					"jquery": "1.0.0"
				}
			}`,
			"/user/username/projects/project/jsconfig.json":                           `{}`,
			"/user/username/projects/project/node_modules/commander/index.js":         "",
			"/user/username/projects/project/node_modules/commander/package.json":     `{ "name": "commander" }`,
			"/user/username/projects/project/node_modules/jquery/index.js":            "",
			"/user/username/projects/project/node_modules/jquery/package.json":        `{ "name": "jquery" }`,
			"/user/username/projects/project/node_modules/jquery/nested/package.json": `{ "name": "nested" }`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			TypesRegistry: []string{"nested", "commander"},
			PackageToFile: map[string]string{
				"jquery": "declare const jquery: { x: number }",
			},
		})

		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"), 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// Check that npm install was called twice
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 2, len(calls), "Expected exactly 2 npm install calls")
		assert.Equal(t, calls[0].Cwd, projecttestutil.TestTypingsLocation)
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})
		assert.Equal(t, calls[1].Cwd, projecttestutil.TestTypingsLocation)
		assert.Equal(t, calls[1].Args[2], "@types/jquery@latest")
	})

	t.Run("discover from node_modules empty types", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                                  "",
			"/user/username/projects/project/package.json":                            `{"dependencies": {"jquery": "1.0.0"}}`,
			"/user/username/projects/project/jsconfig.json":                           `{"compilerOptions": {"types": []}}`,
			"/user/username/projects/project/node_modules/commander/index.js":         "",
			"/user/username/projects/project/node_modules/commander/package.json":     `{ "name": "commander" }`,
			"/user/username/projects/project/node_modules/jquery/index.js":            "",
			"/user/username/projects/project/node_modules/jquery/package.json":        `{ "name": "jquery" }`,
			"/user/username/projects/project/node_modules/jquery/nested/package.json": `{ "name": "nested" }`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			TypesRegistry: []string{"nested", "commander"},
			PackageToFile: map[string]string{
				"jquery": "declare const jquery: { x: number }",
			},
		})

		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"), 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// Only types-registry should be installed
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 1, len(calls))
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})
	})

	t.Run("discover from node_modules explicit types", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                                  "",
			"/user/username/projects/project/package.json":                            `{"dependencies": {"jquery": "1.0.0"}}`,
			"/user/username/projects/project/jsconfig.json":                           `{"compilerOptions": {"types": ["jquery"]}}`,
			"/user/username/projects/project/node_modules/commander/index.js":         "",
			"/user/username/projects/project/node_modules/commander/package.json":     `{ "name": "commander" }`,
			"/user/username/projects/project/node_modules/jquery/index.js":            "",
			"/user/username/projects/project/node_modules/jquery/package.json":        `{ "name": "jquery" }`,
			"/user/username/projects/project/node_modules/jquery/nested/package.json": `{ "name": "nested" }`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			TypesRegistry: []string{"nested", "commander"},
			PackageToFile: map[string]string{
				"jquery": "declare const jquery: { x: number }",
			},
		})

		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"), 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// Only types-registry should be installed
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 1, len(calls))
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})
	})

	t.Run("discover from node_modules empty types has import", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                                  `import "jquery";`,
			"/user/username/projects/project/package.json":                            `{"dependencies": {"jquery": "1.0.0"}}`,
			"/user/username/projects/project/jsconfig.json":                           `{"compilerOptions": {"types": []}}`,
			"/user/username/projects/project/node_modules/commander/index.js":         "",
			"/user/username/projects/project/node_modules/commander/package.json":     `{ "name": "commander" }`,
			"/user/username/projects/project/node_modules/jquery/index.js":            "",
			"/user/username/projects/project/node_modules/jquery/package.json":        `{ "name": "jquery" }`,
			"/user/username/projects/project/node_modules/jquery/nested/package.json": `{ "name": "nested" }`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			TypesRegistry: []string{"nested", "commander"},
			PackageToFile: map[string]string{
				"jquery": "declare const jquery: { x: number }",
			},
		})

		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"), 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// types-registry + jquery types
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 2, len(calls))
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})
		assert.Assert(t, slices.Contains(calls[1].Args, "@types/jquery@latest"))
	})

	t.Run("discover from bower_components", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                             ``,
			"/user/username/projects/project/jsconfig.json":                      `{}`,
			"/user/username/projects/project/bower_components/jquery/index.js":   "",
			"/user/username/projects/project/bower_components/jquery/bower.json": `{ "name": "jquery" }`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				"jquery": "declare const jquery: { x: number }",
			},
		})

		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"), 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// Check that npm install was called twice
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 2, len(calls), "Expected exactly 2 npm install calls")
		assert.Equal(t, calls[0].Cwd, projecttestutil.TestTypingsLocation)
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})
		assert.Equal(t, calls[1].Cwd, projecttestutil.TestTypingsLocation)
		assert.Equal(t, calls[1].Args[2], "@types/jquery@latest")

		// Verify the types file was installed
		ls, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"))
		assert.NilError(t, err)
		jqueryTypesFile := ls.GetProgram().GetSourceFile(projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts")
		assert.Assert(t, jqueryTypesFile != nil, "jquery types should be installed")
	})

	t.Run("discover from bower.json", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":        ``,
			"/user/username/projects/project/jsconfig.json": `{}`,
			"/user/username/projects/project/bower.json": `{
				"dependencies": {
                    "jquery": "^3.1.0"
                }
			}`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				"jquery": "declare const jquery: { x: number }",
			},
		})

		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"), 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// Check that npm install was called twice
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 2, len(calls), "Expected exactly 2 npm install calls")
		assert.Equal(t, calls[0].Cwd, projecttestutil.TestTypingsLocation)
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})
		assert.Equal(t, calls[1].Cwd, projecttestutil.TestTypingsLocation)
		assert.Equal(t, calls[1].Args[2], "@types/jquery@latest")

		// Verify the types file was installed
		ls, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"))
		assert.NilError(t, err)
		jqueryTypesFile := ls.GetProgram().GetSourceFile(projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts")
		assert.Assert(t, jqueryTypesFile != nil, "jquery types should be installed")
	})

	t.Run("Malformed package.json should be watched", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":       "",
			"/user/username/projects/project/package.json": `{"dependencies": { "co } }`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				"commander": "export let x: number",
			},
		})

		uri := lsproto.DocumentUri("file:///user/username/projects/project/app.js")
		session.DidOpenFile(context.Background(), uri, 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// Initially only types-registry update attempted
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 1, len(calls))
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})

		// Fix package.json and notify watcher
		assert.NilError(t, utils.FS().WriteFile(
			"/user/username/projects/project/package.json",
			`{ "dependencies": { "commander": "0.0.2" } }`,
			false,
		))
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{
			Type: lsproto.FileChangeTypeChanged,
			Uri:  lsproto.DocumentUri("file:///user/username/projects/project/package.json"),
		}})
		// diagnostics refresh triggered - simulate by getting the language service
		_, _ = session.GetLanguageService(context.Background(), uri)
		session.WaitForBackgroundTasks()

		calls = utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 2, len(calls))
		assert.Assert(t, slices.Contains(calls[1].Args, "@types/commander@latest"))

		// Verify types file present
		ls, err := session.GetLanguageService(context.Background(), uri)
		assert.NilError(t, err)
		program := ls.GetProgram()
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/commander/index.d.ts") != nil)
	})

	t.Run("should redo resolution that resolved to '.js' file after typings are installed", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                  `\n                import * as commander from "commander";\n            `,
			"/user/username/projects/node_modules/commander/index.js": "module.exports = 0",
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				"commander": "export let commander: number",
			},
		})

		uri := lsproto.DocumentUri("file:///user/username/projects/project/app.js")
		session.DidOpenFile(context.Background(), uri, 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 2, len(calls))
		assert.Assert(t, slices.Contains(calls[1].Args, "@types/commander@latest"))

		ls, err := session.GetLanguageService(context.Background(), uri)
		assert.NilError(t, err)
		program := ls.GetProgram()
		// Types file present
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/commander/index.d.ts") != nil)
		// JS resolution should be dropped
		assert.Assert(t, program.GetSourceFile("/user/username/projects/node_modules/commander/index.js") == nil)
	})

	t.Run("expired cache entry (inferred project, should install typings)", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                                       "",
			"/user/username/projects/project/package.json":                                 `{"name":"test","dependencies":{"jquery":"^3.1.0"}}`,
			projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts": "export const x = 10;",
			projecttestutil.TestTypingsLocation + "/package.json":                          `{"dependencies":{"types-registry":"^0.1.317"},"devDependencies":{"@types/jquery":"^1.0.0"}}`,
			projecttestutil.TestTypingsLocation + "/package-lock.json":                     `{"dependencies":{"@types/jquery":{"version":"1.0.0"}}}`,
		}

		session, _ := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				"jquery": "export const y = 10",
			},
		})

		uri := lsproto.DocumentUri("file:///user/username/projects/project/app.js")
		session.DidOpenFile(context.Background(), uri, 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		ls, err := session.GetLanguageService(context.Background(), uri)
		assert.NilError(t, err)
		program := ls.GetProgram()
		// Expect updated content from installed typings
		assert.Equal(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts").Text(), "export const y = 10")
	})

	t.Run("non-expired cache entry (inferred project, should not install typings)", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                                       "",
			"/user/username/projects/project/package.json":                                 `{"name":"test","dependencies":{"jquery":"^3.1.0"}}`,
			projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts": "export const x = 10;",
			projecttestutil.TestTypingsLocation + "/package.json":                          `{"dependencies":{"types-registry":"^0.1.317"},"devDependencies":{"@types/jquery":"^1.3.0"}}`,
			projecttestutil.TestTypingsLocation + "/package-lock.json":                     `{"dependencies":{"@types/jquery":{"version":"1.3.0"}}}`,
		}

		session, _ := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			TypesRegistry: []string{"jquery"},
		})

		uri := lsproto.DocumentUri("file:///user/username/projects/project/app.js")
		session.DidOpenFile(context.Background(), uri, 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		ls, err := session.GetLanguageService(context.Background(), uri)
		assert.NilError(t, err)
		program := ls.GetProgram()
		// Expect existing content unchanged
		assert.Equal(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts").Text(), "export const x = 10;")
	})

	t.Run("deduplicate from local @types packages", func(t *testing.T) {
		t.Skip("Todo - implement removing local @types from include list")
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                              "",
			"/user/username/projects/project/node_modules/@types/node/index.d.ts": "declare var node;",
			"/user/username/projects/project/jsconfig.json": `{
				"typeAcquisition": { "include": ["node"] }
			}`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			TypesRegistry: []string{"node"},
		})

		uri := lsproto.DocumentUri("file:///user/username/projects/project/app.js")
		session.DidOpenFile(context.Background(), uri, 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// Only the types-registry should be installed; @types/node should NOT be installed since it exists locally
		npmCalls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, len(npmCalls), 1)
		assert.Equal(t, npmCalls[0].Cwd, projecttestutil.TestTypingsLocation)
		assert.DeepEqual(t, npmCalls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})

		// And the program should include the local @types/node declaration file
		ls, err := session.GetLanguageService(context.Background(), uri)
		assert.NilError(t, err)
		program := ls.GetProgram()
		assert.Assert(t, program.GetSourceFile("/user/username/projects/project/node_modules/@types/node/index.d.ts") != nil)
	})

	t.Run("expired cache entry (inferred project, should install typings) lockfile3", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                                       "",
			"/user/username/projects/project/package.json":                                 `{"name":"test","dependencies":{"jquery":"^3.1.0"}}`,
			projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts": "export const x = 10;",
			projecttestutil.TestTypingsLocation + "/package.json":                          `{"dependencies":{"types-registry":"^0.1.317"},"devDependencies":{"@types/jquery":"^1.0.0"}}`,
			projecttestutil.TestTypingsLocation + "/package-lock.json":                     `{"packages":{"node_modules/@types/jquery":{"version":"1.0.0"}}}`,
		}

		session, _ := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				"jquery": "export const y = 10",
			},
		})

		uri := lsproto.DocumentUri("file:///user/username/projects/project/app.js")
		session.DidOpenFile(context.Background(), uri, 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		ls, err := session.GetLanguageService(context.Background(), uri)
		assert.NilError(t, err)
		program := ls.GetProgram()
		// Expect updated content from installed typings
		assert.Equal(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts").Text(), "export const y = 10")
	})

	t.Run("non-expired cache entry (inferred project, should not install typings) lockfile3", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js":                                       "",
			"/user/username/projects/project/package.json":                                 `{"name":"test","dependencies":{"jquery":"^3.1.0"}}`,
			projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts": "export const x = 10;",
			projecttestutil.TestTypingsLocation + "/package.json":                          `{"dependencies":{"types-registry":"^0.1.317"},"devDependencies":{"@types/jquery":"^1.3.0"}}`,
			projecttestutil.TestTypingsLocation + "/package-lock.json":                     `{"packages":{"node_modules/@types/jquery":{"version":"1.3.0"}}}`,
		}

		session, _ := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			TypesRegistry: []string{"jquery"},
		})

		uri := lsproto.DocumentUri("file:///user/username/projects/project/app.js")
		session.DidOpenFile(context.Background(), uri, 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		ls, err := session.GetLanguageService(context.Background(), uri)
		assert.NilError(t, err)
		program := ls.GetProgram()
		// Expect existing content unchanged
		assert.Equal(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts").Text(), "export const x = 10;")
	})

	t.Run("should install typings for unresolved imports", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/project/app.js": `
				import * as fs from "fs";
                import * as commander from "commander";
                import * as component from "@ember/component";
			`,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				"node":             "export let node: number",
				"commander":        "export let commander: number",
				"ember__component": "export let ember__component: number",
			},
		})

		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"), 1, files["/user/username/projects/project/app.js"].(string), lsproto.LanguageKindJavaScript)
		session.WaitForBackgroundTasks()

		// Check that npm install was called twice
		calls := utils.NpmExecutor().NpmInstallCalls()
		assert.Equal(t, 2, len(calls), "Expected exactly 2 npm install calls")
		assert.Equal(t, calls[0].Cwd, projecttestutil.TestTypingsLocation)
		assert.DeepEqual(t, calls[0].Args, []string{"install", "--ignore-scripts", "types-registry@latest"})

		// The second call should install all three packages at once
		assert.Equal(t, calls[1].Cwd, projecttestutil.TestTypingsLocation)
		assert.Equal(t, calls[1].Args[0], "install")
		assert.Equal(t, calls[1].Args[1], "--ignore-scripts")
		// Check that all three packages are in the install command
		installArgs := calls[1].Args
		assert.Assert(t, slices.Contains(installArgs, "@types/ember__component@latest"))
		assert.Assert(t, slices.Contains(installArgs, "@types/commander@latest"))
		assert.Assert(t, slices.Contains(installArgs, "@types/node@latest"))

		// Verify the types files were installed
		ls, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///user/username/projects/project/app.js"))
		assert.NilError(t, err)
		program := ls.GetProgram()
		nodeTypesFile := program.GetSourceFile(projecttestutil.TestTypingsLocation + "/node_modules/@types/node/index.d.ts")
		assert.Assert(t, nodeTypesFile != nil, "node types should be installed")
		commanderTypesFile := program.GetSourceFile(projecttestutil.TestTypingsLocation + "/node_modules/@types/commander/index.d.ts")
		assert.Assert(t, commanderTypesFile != nil, "commander types should be installed")
		emberComponentTypesFile := program.GetSourceFile(projecttestutil.TestTypingsLocation + "/node_modules/@types/ember__component/index.d.ts")
		assert.Assert(t, emberComponentTypesFile != nil, "ember__component types should be installed")
	})
}

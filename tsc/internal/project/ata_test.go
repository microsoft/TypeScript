package project_test

import (
	"slices"
	"testing"
	"time"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestAta(t *testing.T) {
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
					"typeAcquisition": { "enable": true },
            	}`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				TypesRegistry: []string{"config"},
			},
		})
		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		assert.Equal(t, len(service.Projects()), 1)
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		assert.Equal(t, p.Kind(), project.KindConfigured)
		program := p.CurrentProgram()
		assert.Assert(t, program.GetSourceFile("/user/username/projects/project/config.js") != nil)
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Skipped 0 typings",
		})
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
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"jquery": `declare const $: { x: number }`,
				},
			},
		})
		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		assert.Equal(t, len(service.Projects()), 1)
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		assert.Equal(t, p.Kind(), project.KindConfigured)
		success := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, success, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
		program := p.GetProgram()
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts") != nil)
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 2,
			Project:   p,
			Status:    "Skipped 0 typings",
		})
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
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"jquery": `declare const $: { x: number }`,
				},
			},
		})
		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		assert.Equal(t, len(service.Projects()), 1)
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		assert.Equal(t, p.Kind(), project.KindInferred)
		success := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, success, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
		program := p.GetProgram()
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts") != nil)
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 2,
			Project:   p,
			Status:    "Skipped 1 typings",
		})
	})

	t.Run("type acquisition with disableFilenameBasedTypeAcquisition:true", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/jquery.js": ``,
			"/user/username/projects/project/tsconfig.json": `{
				"compilerOptions": { "allowJs": true },
				"typeAcquisition": { "enable": true, "disableFilenameBasedTypeAcquisition": true },
			}`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				TypesRegistry: []string{"jquery"},
			},
		})
		service.OpenFile("/user/username/projects/project/jquery.js", files["/user/username/projects/project/jquery.js"].(string), core.ScriptKindJS, "")
		assert.Equal(t, len(service.Projects()), 1)
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/jquery.js")
		assert.Equal(t, p.Kind(), project.KindConfigured)

		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Skipped 0 typings",
		})
	})

	t.Run("deduplicate from local @types packages", func(t *testing.T) {
		t.Skip("Todo - implement removing local @types from include list")
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js":                              "",
			"/user/username/projects/project/node_modules/@types/node/index.d.ts": "declare var node;",
			"/user/username/projects/project/jsconfig.json": `{
				"typeAcquisition": { "include": ["node"] },
			}`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				TypesRegistry: []string{"node"},
			},
		})
		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		assert.Equal(t, len(service.Projects()), 1)
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		assert.Equal(t, p.Kind(), project.KindConfigured)

		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Skipped 0 typings",
		})
	})

	t.Run("Throttle - scheduled run install requests without reaching limit", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project1/app.js":     "",
			"/user/username/projects/project1/file3.d.ts": "",
			"/user/username/projects/project1/jsconfig.json": `{
				"typeAcquisition": { "include": ["jquery", "cordova", "lodash"] },
			}`,
			"/user/username/projects/project2/app.js":     "",
			"/user/username/projects/project2/file3.d.ts": "",
			"/user/username/projects/project2/jsconfig.json": `{
				"typeAcquisition": { "include": ["grunt", "gulp", "commander"] },
			}`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"commander": "declare const commander: { x: number }",
					"jquery":    "declare const jquery: { x: number }",
					"lodash":    "declare const lodash: { x: number }",
					"cordova":   "declare const cordova: { x: number }",
					"grunt":     "declare const grunt: { x: number }",
					"gulp":      "declare const grunt: { x: number }",
				},
			},
		})

		service.OpenFile("/user/username/projects/project1/app.js", files["/user/username/projects/project1/app.js"].(string), core.ScriptKindJS, "")
		service.OpenFile("/user/username/projects/project2/app.js", files["/user/username/projects/project2/app.js"].(string), core.ScriptKindJS, "")
		_, p1 := service.EnsureDefaultProjectForFile("/user/username/projects/project1/app.js")
		_, p2 := service.EnsureDefaultProjectForFile("/user/username/projects/project2/app.js")
		var installStatuses []project.TypingsInstallerStatus
		installStatuses = append(installStatuses, <-host.ServiceOptions.InstallStatus, <-host.ServiceOptions.InstallStatus)
		// Order can be non deterministic since they both will run in parallel - not looking into request ID
		assert.Assert(t, slices.ContainsFunc(installStatuses, func(s project.TypingsInstallerStatus) bool {
			return s.Project == p1 && s.Status == "Success"
		}))
		assert.Assert(t, slices.ContainsFunc(installStatuses, func(s project.TypingsInstallerStatus) bool {
			return s.Project == p2 && s.Status == "Success"
		}))
	})

	t.Run("Throttle - scheduled run install requests reaching limit", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project1/app.js":     "",
			"/user/username/projects/project1/file3.d.ts": "",
			"/user/username/projects/project1/jsconfig.json": `{
				"typeAcquisition": { "include": ["jquery", "cordova", "lodash"] },
			}`,
			"/user/username/projects/project2/app.js":     "",
			"/user/username/projects/project2/file3.d.ts": "",
			"/user/username/projects/project2/jsconfig.json": `{
				"typeAcquisition": { "include": ["grunt", "gulp", "commander"] },
			}`,
		}
		expectedP1First := true
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"commander": "declare const commander: { x: number }",
					"jquery":    "declare const jquery: { x: number }",
					"lodash":    "declare const lodash: { x: number }",
					"cordova":   "declare const cordova: { x: number }",
					"grunt":     "declare const grunt: { x: number }",
					"gulp":      "declare const gulp: { x: number }",
				},
			},
			TypingsInstallerOptions: project.TypingsInstallerOptions{
				ThrottleLimit: 1,
			},
		})

		host.TestOptions.CheckBeforeNpmInstall = func(cwd string, npmInstallArgs []string) {
			for {
				pendingCount := service.TypingsInstaller().PendingRunRequestsCount()
				if pendingCount == 1 {
					if slices.Contains(npmInstallArgs, "@types/gulp@latest") {
						expectedP1First = false
					}
					host.TestOptions.CheckBeforeNpmInstall = nil // Stop checking after first run
					break
				}
				assert.NilError(t, t.Context().Err())
				time.Sleep(10 * time.Millisecond)
			}
		}

		service.OpenFile("/user/username/projects/project1/app.js", files["/user/username/projects/project1/app.js"].(string), core.ScriptKindJS, "")
		service.OpenFile("/user/username/projects/project2/app.js", files["/user/username/projects/project2/app.js"].(string), core.ScriptKindJS, "")
		_, p1 := service.EnsureDefaultProjectForFile("/user/username/projects/project1/app.js")
		_, p2 := service.EnsureDefaultProjectForFile("/user/username/projects/project2/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status.Project, core.IfElse(expectedP1First, p1, p2))
		assert.Equal(t, status.Status, "Success")
		status = <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status.Project, core.IfElse(expectedP1First, p2, p1))
		assert.Equal(t, status.Status, "Success")
	})

	t.Run("discover from node_modules", func(t *testing.T) {
		t.Skip("Skip for now - to add back when we skip external library files to lookup typings for")
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js": "",
			"/user/username/projects/project/package.json": `{
			    "dependencies": {
					"jquery": "1.0.0",
				},
			}`,
			"/user/username/projects/project/jsconfig.json":                           `{}`,
			"/user/username/projects/project/node_modules/commander/index.js":         "",
			"/user/username/projects/project/node_modules/commander/package.json":     `{ "name": "commander" }`,
			"/user/username/projects/project/node_modules/jquery/index.js":            "",
			"/user/username/projects/project/node_modules/jquery/package.json":        `{ "name": "jquery" }`,
			"/user/username/projects/project/node_modules/jquery/nested/package.json": `{ "name": "nested" }`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				TypesRegistry: []string{"nested", "commander"},
				PackageToFile: map[string]string{
					"jquery": "declare const jquery: { x: number }",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
	})

	// Explicit types prevent automatic inclusion from package.json listing
	t.Run("discover from node_modules empty types", func(t *testing.T) {
		t.Skip("Skip for now - to add back when we skip external library files to lookup typings for")
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js": "",
			"/user/username/projects/project/package.json": `{
			    "dependencies": {
					"jquery": "1.0.0",
				},
			}`,
			"/user/username/projects/project/jsconfig.json": `{
				"compilerOptions": {
					"types": []
				}
			}`,
			"/user/username/projects/project/node_modules/commander/index.js":         "",
			"/user/username/projects/project/node_modules/commander/package.json":     `{ "name": "commander" }`,
			"/user/username/projects/project/node_modules/jquery/index.js":            "",
			"/user/username/projects/project/node_modules/jquery/package.json":        `{ "name": "jquery" }`,
			"/user/username/projects/project/node_modules/jquery/nested/package.json": `{ "name": "nested" }`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				TypesRegistry: []string{"nested", "commander"},
				PackageToFile: map[string]string{
					"jquery": "declare const jquery: { x: number }",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
	})

	// A type reference directive will not resolve to the global typings cache
	t.Run("discover from node_modules explicit types", func(t *testing.T) {
		t.Skip("Skip for now - to add back when we skip external library files to lookup typings for")
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js": "",
			"/user/username/projects/project/package.json": `{
			    "dependencies": {
					"jquery": "1.0.0",
				},
			}`,
			"/user/username/projects/project/jsconfig.json": `{
				"compilerOptions": {
					"types": ["jquery"]
				}
			}`,
			"/user/username/projects/project/node_modules/commander/index.js":         "",
			"/user/username/projects/project/node_modules/commander/package.json":     `{ "name": "commander" }`,
			"/user/username/projects/project/node_modules/jquery/index.js":            "",
			"/user/username/projects/project/node_modules/jquery/package.json":        `{ "name": "jquery" }`,
			"/user/username/projects/project/node_modules/jquery/nested/package.json": `{ "name": "nested" }`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				TypesRegistry: []string{"nested", "commander"},
				PackageToFile: map[string]string{
					"jquery": "declare const jquery: { x: number }",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
	})

	// However, explicit types will not prevent unresolved imports from pulling in typings
	t.Run("discover from node_modules empty types has import", func(t *testing.T) {
		t.Skip("Skip for now - to add back when we skip external library files to lookup typings for")
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js": `import "jquery";`,
			"/user/username/projects/project/package.json": `{
			    "dependencies": {
					"jquery": "1.0.0",
				},
			}`,
			"/user/username/projects/project/jsconfig.json": `{
				"compilerOptions": {
					"types": []
				}
			}`,
			"/user/username/projects/project/node_modules/commander/index.js":         "",
			"/user/username/projects/project/node_modules/commander/package.json":     `{ "name": "commander" }`,
			"/user/username/projects/project/node_modules/jquery/index.js":            "",
			"/user/username/projects/project/node_modules/jquery/package.json":        `{ "name": "jquery" }`,
			"/user/username/projects/project/node_modules/jquery/nested/package.json": `{ "name": "nested" }`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				TypesRegistry: []string{"nested", "commander"},
				PackageToFile: map[string]string{
					"jquery": "declare const jquery: { x: number }",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
	})

	t.Run("discover from bower_components", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js":                             ``,
			"/user/username/projects/project/jsconfig.json":                      `{}`,
			"/user/username/projects/project/bower_components/jquery/index.js":   "",
			"/user/username/projects/project/bower_components/jquery/bower.json": `{ "name": "jquery" }`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"jquery": "declare const jquery: { x: number }",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
		program := p.GetProgram()
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts") != nil)
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
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"jquery": "declare const jquery: { x: number }",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
		program := p.GetProgram()
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts") != nil)
	})

	t.Run("Malformed package.json should be watched", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js":       ``,
			"/user/username/projects/project/package.json": `{ "dependencies": { "co } }`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"commander": "export let x: number",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Skipped 1 typings",
		})
		assert.NilError(t, host.FS().WriteFile(
			"/user/username/projects/project/package.json",
			`{ "dependencies": { "commander": "0.0.2" } }`,
			false,
		))
		assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
			{
				Type: lsproto.FileChangeTypeChanged,
				Uri:  "file:///user/username/projects/project/package.json",
			},
		}))
		status = <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 2,
			Project:   p,
			Status:    "Success",
		})
		program := p.GetProgram()
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/commander/index.d.ts") != nil)
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
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"node":             "export let node: number",
					"commander":        "export let commander: number",
					"ember__component": "export let ember__component: number",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
		program := p.GetProgram()
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/node/index.d.ts") != nil)
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/commander/index.d.ts") != nil)
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/ember__component/index.d.ts") != nil)
	})

	t.Run("should redo resolution that resolved to '.js' file after typings are installed", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js": `
                import * as commander from "commander";
			`,
			"/user/username/projects/node_modules/commander/index.js": "module.exports = 0",
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"commander": "export let commander: number",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
		program := p.GetProgram()
		assert.Assert(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/commander/index.d.ts") != nil)
		assert.Assert(t, program.GetSourceFile("/user/username/projects/node_modules/commander/index.js") == nil)
	})

	t.Run("expired cache entry (inferred project, should install typings)", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js": "",
			"/user/username/projects/project/package.json": `{
				"name": "test",
                "dependencies": {
                    "jquery": "^3.1.0"
                }
			}`,
			projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts": "export const x = 10;",
			projecttestutil.TestTypingsLocation + "/package.json": `{
				"dependencies": {
                    "types-registry": "^0.1.317"
                },
                "devDependencies": {
                    "@types/jquery": "^1.0.0"
                }
			}`,
			projecttestutil.TestTypingsLocation + "/package-lock.json": `{
				"dependencies": {
                    "@types/jquery": {
                    	"version": "1.0.0"
					}
                }
			}`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"jquery": "export const y = 10",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
		program := p.GetProgram()
		assert.Equal(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts").Text(), "export const y = 10")
	})

	t.Run("non-expired cache entry (inferred project, should not install typings)", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js": "",
			"/user/username/projects/project/package.json": `{
				"name": "test",
                "dependencies": {
                    "jquery": "^3.1.0"
                }
			}`,
			projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts": "export const x = 10;",
			projecttestutil.TestTypingsLocation + "/package.json": `{
				"dependencies": {
                    "types-registry": "^0.1.317"
                },
                "devDependencies": {
                    "@types/jquery": "^1.3.0"
                }
			}`,
			projecttestutil.TestTypingsLocation + "/package-lock.json": `{
				"dependencies": {
                    "@types/jquery": {
                    	"version": "1.3.0"
					}
                }
			}`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				TypesRegistry: []string{"jquery"},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Skipped 1 typings",
		})
		program := p.GetProgram()
		assert.Equal(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts").Text(), "export const x = 10;")
	})

	t.Run("expired cache entry (inferred project, should install typings) lockfile3", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js": "",
			"/user/username/projects/project/package.json": `{
				"name": "test",
                "dependencies": {
                    "jquery": "^3.1.0"
                }
			}`,
			projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts": "export const x = 10;",
			projecttestutil.TestTypingsLocation + "/package.json": `{
				"dependencies": {
                    "types-registry": "^0.1.317"
                },
                "devDependencies": {
                    "@types/jquery": "^1.0.0"
                }
			}`,
			projecttestutil.TestTypingsLocation + "/package-lock.json": `{
				"packages": {
                    "node_modules/@types/jquery": {
                    	"version": "1.0.0"
					}
                }
			}`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				PackageToFile: map[string]string{
					"jquery": "export const y = 10",
				},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Success",
		})
		program := p.GetProgram()
		assert.Equal(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts").Text(), "export const y = 10")
	})

	t.Run("non-expired cache entry (inferred project, should not install typings) lockfile3", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project/app.js": "",
			"/user/username/projects/project/package.json": `{
				"name": "test",
                "dependencies": {
                    "jquery": "^3.1.0"
                }
			}`,
			projecttestutil.TestTypingsLocation + "/node_modules/@types/jquery/index.d.ts": "export const x = 10;",
			projecttestutil.TestTypingsLocation + "/package.json": `{
				"dependencies": {
                    "types-registry": "^0.1.317"
                },
                "devDependencies": {
                    "@types/jquery": "^1.3.0"
                }
			}`,
			projecttestutil.TestTypingsLocation + "/package-lock.json": `{
				"packages": {
                    "node_modules/@types/jquery": {
                    	"version": "1.3.0"
					}
                }
			}`,
		}
		service, host := projecttestutil.Setup(files, &projecttestutil.TestTypingsInstaller{
			TestTypingsInstallerOptions: projecttestutil.TestTypingsInstallerOptions{
				TypesRegistry: []string{"jquery"},
			},
		})

		service.OpenFile("/user/username/projects/project/app.js", files["/user/username/projects/project/app.js"].(string), core.ScriptKindJS, "")
		_, p := service.EnsureDefaultProjectForFile("/user/username/projects/project/app.js")
		// Order is determinate since second install will run only after completing first one
		status := <-host.ServiceOptions.InstallStatus
		assert.Equal(t, status, project.TypingsInstallerStatus{
			RequestId: 1,
			Project:   p,
			Status:    "Skipped 1 typings",
		})
		program := p.GetProgram()
		assert.Equal(t, program.GetSourceFile(projecttestutil.TestTypingsLocation+"/node_modules/@types/jquery/index.d.ts").Text(), "export const x = 10;")
	})
}

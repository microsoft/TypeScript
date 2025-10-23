package project_test

import (
	"context"
	"fmt"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestBulkCacheInvalidation(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// Base file structure for testing
	baseFiles := map[string]any{
		"/project/tsconfig.json": `{
			"compilerOptions": {
				"strict": true,
				"target": "es2015",
				"types": ["node"]
			},
			"include": ["src/**/*"]
		}`,
		"/project/src/index.ts":     `import { helper } from "./helper"; console.log(helper);`,
		"/project/src/helper.ts":    `export const helper = "test";`,
		"/project/src/utils/lib.ts": `export function util() { return "util"; }`,

		"/project/node_modules/@types/node/index.d.ts":   `import "./fs"; import "./console";`,
		"/project/node_modules/@types/node/fs.d.ts":      ``,
		"/project/node_modules/@types/node/console.d.ts": ``,
	}

	t.Run("large number of node_modules changes invalidates only node_modules cache", func(t *testing.T) {
		t.Parallel()
		test := func(t *testing.T, fileEvents []*lsproto.FileEvent, expectNodeModulesInvalidation bool) {
			session, utils := projecttestutil.Setup(baseFiles)

			// Open a file to create the project
			session.DidOpenFile(context.Background(), "file:///project/src/index.ts", 1, baseFiles["/project/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			// Get initial snapshot and verify config
			ls, err := session.GetLanguageService(context.Background(), "file:///project/src/index.ts")
			assert.NilError(t, err)
			assert.Equal(t, ls.GetProgram().Options().Target, core.ScriptTargetES2015)

			snapshotBefore, release := session.Snapshot()
			defer release()
			configBefore := snapshotBefore.ConfigFileRegistry

			// Update tsconfig.json on disk to test that configs don't get reloaded
			err = utils.FS().WriteFile("/project/tsconfig.json", `{
			"compilerOptions": {
				"strict": true,
				"target": "esnext",
				"types": ["node"]
			},
			"include": ["src/**/*"]
		}`, false)
			assert.NilError(t, err)
			// Update fs.d.ts in node_modules
			err = utils.FS().WriteFile("/project/node_modules/@types/node/fs.d.ts", "new text", false)
			assert.NilError(t, err)

			// Process the excessive node_modules changes
			session.DidChangeWatchedFiles(context.Background(), fileEvents)

			// Get language service again to trigger snapshot update
			ls, err = session.GetLanguageService(context.Background(), "file:///project/src/index.ts")
			assert.NilError(t, err)

			snapshotAfter, release := session.Snapshot()
			defer release()
			configAfter := snapshotAfter.ConfigFileRegistry

			// Config should NOT have been reloaded (target should remain ES2015, not esnext)
			assert.Equal(t, ls.GetProgram().Options().Target, core.ScriptTargetES2015, "Config should not have been reloaded for node_modules-only changes")

			// Config registry should be the same instance (no configs reloaded)
			assert.Equal(t, configBefore, configAfter, "Config registry should not have changed for node_modules-only changes")

			fsDtsText := snapshotAfter.GetFile("/project/node_modules/@types/node/fs.d.ts").Content()
			if expectNodeModulesInvalidation {
				assert.Equal(t, fsDtsText, "new text")
			} else {
				assert.Equal(t, fsDtsText, "")
			}
		}

		t.Run("with file existing in cache", func(t *testing.T) {
			t.Parallel()
			fileEvents := generateFileEvents(1001, "file:///project/node_modules/generated/file%d.js", lsproto.FileChangeTypeCreated)
			// Include two files in the program to trigger a full program creation.
			// Exclude fs.d.ts to show that its content still gets invalidated.
			fileEvents = append(fileEvents, &lsproto.FileEvent{
				Uri:  "file:///project/node_modules/@types/node/index.d.ts",
				Type: lsproto.FileChangeTypeChanged,
			}, &lsproto.FileEvent{
				Uri:  "file:///project/node_modules/@types/node/console.d.ts",
				Type: lsproto.FileChangeTypeChanged,
			})

			test(t, fileEvents, true)
		})

		t.Run("without file existing in cache", func(t *testing.T) {
			t.Parallel()
			fileEvents := generateFileEvents(1001, "file:///project/node_modules/generated/file%d.js", lsproto.FileChangeTypeCreated)
			test(t, fileEvents, false)
		})
	})

	t.Run("large number of changes outside node_modules", func(t *testing.T) {
		t.Parallel()
		test := func(t *testing.T, fileEvents []*lsproto.FileEvent, expectConfigReload bool) {
			session, utils := projecttestutil.Setup(baseFiles)

			// Open a file to create the project
			session.DidOpenFile(context.Background(), "file:///project/src/index.ts", 1, baseFiles["/project/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			// Get initial state
			ls, err := session.GetLanguageService(context.Background(), "file:///project/src/index.ts")
			assert.NilError(t, err)
			assert.Equal(t, ls.GetProgram().Options().Target, core.ScriptTargetES2015)

			// Update tsconfig.json on disk
			err = utils.FS().WriteFile("/project/tsconfig.json", `{
			"compilerOptions": {
				"strict": true,
				"target": "esnext",
				"types": ["node"]
			},
			"include": ["src/**/*"]
		}`, false)
			assert.NilError(t, err)
			// Add root file
			err = utils.FS().WriteFile("/project/src/rootFile.ts", `console.log("root file")`, false)
			assert.NilError(t, err)

			session.DidChangeWatchedFiles(context.Background(), fileEvents)
			ls, err = session.GetLanguageService(context.Background(), "file:///project/src/index.ts")
			assert.NilError(t, err)

			if expectConfigReload {
				assert.Equal(t, ls.GetProgram().Options().Target, core.ScriptTargetESNext, "Config should have been reloaded for changes outside node_modules")
				assert.Check(t, ls.GetProgram().GetSourceFile("/project/src/rootFile.ts") != nil, "New root file should be present")
			} else {
				assert.Equal(t, ls.GetProgram().Options().Target, core.ScriptTargetES2015, "Config should not have been reloaded for changes outside node_modules")
				assert.Check(t, ls.GetProgram().GetSourceFile("/project/src/rootFile.ts") == nil, "New root file should not be present")
			}
		}

		t.Run("with event matching include glob", func(t *testing.T) {
			t.Parallel()
			fileEvents := generateFileEvents(1001, "file:///project/generated/file%d.ts", lsproto.FileChangeTypeCreated)
			fileEvents = append(fileEvents, &lsproto.FileEvent{
				Uri:  "file:///project/src/rootFile.ts",
				Type: lsproto.FileChangeTypeCreated,
			})
			test(t, fileEvents, true)
		})

		t.Run("without event matching include glob", func(t *testing.T) {
			t.Parallel()
			fileEvents := generateFileEvents(1001, "file:///project/generated/file%d.ts", lsproto.FileChangeTypeCreated)
			test(t, fileEvents, false)
		})
	})

	t.Run("large number of changes outside node_modules causes project reevaluation", func(t *testing.T) {
		t.Parallel()
		session, utils := projecttestutil.Setup(baseFiles)

		// Open a file that will initially use the root tsconfig
		session.DidOpenFile(context.Background(), "file:///project/src/utils/lib.ts", 1, baseFiles["/project/src/utils/lib.ts"].(string), lsproto.LanguageKindTypeScript)

		// Initially, the file should use the root project (strict mode)
		snapshot, release := session.Snapshot()
		defer release()
		initialProject := snapshot.GetDefaultProject("file:///project/src/utils/lib.ts")
		assert.Equal(t, initialProject.Name(), "/project/tsconfig.json", "Should initially use root tsconfig")

		// Get language service to verify initial strict mode
		ls, err := session.GetLanguageService(context.Background(), "file:///project/src/utils/lib.ts")
		assert.NilError(t, err)
		assert.Equal(t, ls.GetProgram().Options().Strict, core.TSTrue, "Should initially use strict mode from root config")

		// Now create the nested tsconfig (this would normally be detected, but we'll simulate a missed event)
		err = utils.FS().WriteFile("/project/src/utils/tsconfig.json", `{
			"compilerOptions": {
				"strict": false,
				"target": "esnext"
			}
		}`, false)
		assert.NilError(t, err)

		// Create excessive changes to trigger bulk invalidation
		fileEvents := generateFileEvents(1001, "file:///project/src/generated/file%d.ts", lsproto.FileChangeTypeCreated)

		// Process the excessive changes - this should trigger project reevaluation
		session.DidChangeWatchedFiles(context.Background(), fileEvents)

		// Get language service - this should now find the nested config and switch projects
		ls, err = session.GetLanguageService(context.Background(), "file:///project/src/utils/lib.ts")
		assert.NilError(t, err)

		snapshot, release = session.Snapshot()
		defer release()
		newProject := snapshot.GetDefaultProject("file:///project/src/utils/lib.ts")

		// The file should now use the nested tsconfig
		assert.Equal(t, newProject.Name(), "/project/src/utils/tsconfig.json", "Should now use nested tsconfig after bulk invalidation")
		assert.Equal(t, ls.GetProgram().Options().Strict, core.TSFalse, "Should now use non-strict mode from nested config")
		assert.Equal(t, ls.GetProgram().Options().Target, core.ScriptTargetESNext, "Should use esnext target from nested config")
	})

	t.Run("config file names cache", func(t *testing.T) {
		t.Parallel()
		test := func(t *testing.T, fileEvents []*lsproto.FileEvent, expectConfigDiscovery bool, testName string) {
			files := map[string]any{
				"/project/src/index.ts": `console.log("test");`, // No tsconfig initially
			}
			session, utils := projecttestutil.Setup(files)

			// Open file without tsconfig - should create inferred project
			session.DidOpenFile(context.Background(), "file:///project/src/index.ts", 1, files["/project/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			snapshot, release := session.Snapshot()
			defer release()
			assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil, "Should have inferred project")
			assert.Equal(t, snapshot.GetDefaultProject("file:///project/src/index.ts").Kind, project.KindInferred)

			// Create a tsconfig that would affect this file (simulating a missed creation event)
			err := utils.FS().WriteFile("/project/tsconfig.json", `{
		"compilerOptions": {
			"strict": true
		},
		"include": ["src/**/*"]
	}`, false)
			assert.NilError(t, err)

			// Process the changes
			session.DidChangeWatchedFiles(context.Background(), fileEvents)

			// Get language service to trigger config discovery
			_, err = session.GetLanguageService(context.Background(), "file:///project/src/index.ts")
			assert.NilError(t, err)

			snapshot, release = session.Snapshot()
			defer release()
			newProject := snapshot.GetDefaultProject("file:///project/src/index.ts")

			// Check expected behavior
			if expectConfigDiscovery {
				// Should now use configured project instead of inferred
				assert.Equal(t, newProject.Kind, project.KindConfigured, "Should now use configured project after cache invalidation")
				assert.Equal(t, newProject.Name(), "/project/tsconfig.json", "Should use the newly discovered tsconfig")
			} else {
				// Should still use inferred project (config file names cache not cleared)
				assert.Assert(t, newProject == snapshot.ProjectCollection.InferredProject(), "Should still use inferred project after node_modules-only changes")
			}
		}

		t.Run("excessive changes only in node_modules does not affect config file names cache", func(t *testing.T) {
			t.Parallel()
			fileEvents := generateFileEvents(1001, "file:///project/node_modules/generated/file%d.js", lsproto.FileChangeTypeCreated)
			test(t, fileEvents, false, "node_modules changes should not clear config cache")
		})

		t.Run("excessive changes outside node_modules clears config file names cache", func(t *testing.T) {
			t.Parallel()
			fileEvents := generateFileEvents(1001, "file:///project/src/generated/file%d.ts", lsproto.FileChangeTypeCreated)
			// Presence of any tsconfig.json file event triggers rediscovery for config for all open files
			fileEvents = append(fileEvents, &lsproto.FileEvent{
				Uri:  lsproto.DocumentUri("file:///project/src/generated/tsconfig.json"),
				Type: lsproto.FileChangeTypeCreated,
			})
			test(t, fileEvents, true, "non-node_modules changes should clear config cache")
		})
	})

	// Simulate external build tool changing files in dist/ (not included by any project)
	t.Run("excessive changes in dist folder do not invalidate", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/project/src/index.ts": `console.log("test");`, // No tsconfig initially
		}
		session, utils := projecttestutil.Setup(files)

		// Open file without tsconfig - should create inferred project
		session.DidOpenFile(context.Background(), "file:///project/src/index.ts", 1, files["/project/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, snapshot.GetDefaultProject("file:///project/src/index.ts").Kind, project.KindInferred)

		// Create a tsconfig that would affect this file (simulating a missed creation event)
		// This should NOT be discovered after dist-folder changes
		err := utils.FS().WriteFile("/project/tsconfig.json", `{
			"compilerOptions": {
				"strict": true
			},
			"include": ["src/**/*"]
		}`, false)
		assert.NilError(t, err)

		// Create excessive changes in dist folder only
		fileEvents := generateFileEvents(1001, "file:///project/dist/generated/file%d.js", lsproto.FileChangeTypeCreated)
		session.DidChangeWatchedFiles(context.Background(), fileEvents)

		// File should still use inferred project (config file names cache NOT cleared for dist changes)
		_, err = session.GetLanguageService(context.Background(), "file:///project/src/index.ts")
		assert.NilError(t, err)

		snapshot, release = session.Snapshot()
		defer release()
		newProject := snapshot.GetDefaultProject("file:///project/src/index.ts")
		assert.Equal(t, newProject.Kind, project.KindInferred, "dist-folder changes should not cause config discovery")
		// This assertion will fail until we implement logic to ignore dist folder changes
	})
}

// Helper function to generate excessive file change events
func generateFileEvents(count int, pathTemplate string, changeType lsproto.FileChangeType) []*lsproto.FileEvent {
	var events []*lsproto.FileEvent
	for i := range count {
		events = append(events, &lsproto.FileEvent{
			Uri:  lsproto.DocumentUri(fmt.Sprintf(pathTemplate, i)),
			Type: changeType,
		})
	}
	return events
}

package autoimport_test

import (
	"context"
	"fmt"
	"testing"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/ls/autoimport"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/autoimporttestutil"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestRegistryLifecycle(t *testing.T) {
	t.Parallel()
	t.Run("builds project and node_modules buckets", func(t *testing.T) {
		t.Parallel()
		fixture := autoimporttestutil.SetupLifecycleSession(t, lifecycleProjectRoot, 1)
		session := fixture.Session()
		project := fixture.SingleProject()
		mainFile := project.File(0)
		session.DidOpenFile(context.Background(), mainFile.URI(), 1, mainFile.Content(), lsproto.LanguageKindTypeScript)

		stats := autoImportStats(t, session)
		projectBucket := singleBucket(t, stats.ProjectBuckets)
		nodeModulesBucket := singleBucket(t, stats.NodeModulesBuckets)
		assert.Equal(t, true, projectBucket.State.Dirty())
		assert.Equal(t, 0, projectBucket.FileCount)
		assert.Equal(t, true, nodeModulesBucket.State.Dirty())
		assert.Equal(t, 0, nodeModulesBucket.FileCount)

		_, err := session.GetLanguageServiceWithAutoImports(context.Background(), mainFile.URI())
		assert.NilError(t, err)

		stats = autoImportStats(t, session)
		projectBucket = singleBucket(t, stats.ProjectBuckets)
		nodeModulesBucket = singleBucket(t, stats.NodeModulesBuckets)
		assert.Equal(t, false, projectBucket.State.Dirty())
		assert.Assert(t, projectBucket.ExportCount > 0)
		assert.Equal(t, false, nodeModulesBucket.State.Dirty())
		assert.Assert(t, nodeModulesBucket.ExportCount > 0)
	})

	t.Run("bucket does not rebuild on same-file change", func(t *testing.T) {
		t.Parallel()
		fixture := autoimporttestutil.SetupLifecycleSession(t, lifecycleProjectRoot, 2)
		session := fixture.Session()
		utils := fixture.Utils()
		project := fixture.SingleProject()
		mainFile := project.File(0)
		secondaryFile := project.File(1)
		session.DidOpenFile(context.Background(), mainFile.URI(), 1, mainFile.Content(), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(context.Background(), secondaryFile.URI(), 1, secondaryFile.Content(), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageServiceWithAutoImports(context.Background(), mainFile.URI())
		assert.NilError(t, err)

		updatedContent := mainFile.Content() + "// change\n"
		session.DidChangeFile(context.Background(), mainFile.URI(), 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: updatedContent}},
		})

		_, err = session.GetLanguageService(context.Background(), mainFile.URI())
		assert.NilError(t, err)

		stats := autoImportStats(t, session)
		projectBucket := singleBucket(t, stats.ProjectBuckets)
		nodeModulesBucket := singleBucket(t, stats.NodeModulesBuckets)
		assert.Equal(t, projectBucket.State.Dirty(), true)
		assert.Equal(t, projectBucket.State.DirtyFile(), utils.ToPath(mainFile.FileName()))
		assert.Equal(t, nodeModulesBucket.State.Dirty(), false)
		assert.Equal(t, nodeModulesBucket.State.DirtyFile(), tspath.Path(""))

		// Bucket should not recompute when requesting same file changed
		_, err = session.GetLanguageServiceWithAutoImports(context.Background(), mainFile.URI())
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		projectBucket = singleBucket(t, stats.ProjectBuckets)
		assert.Equal(t, projectBucket.State.Dirty(), true)
		assert.Equal(t, projectBucket.State.DirtyFile(), utils.ToPath(mainFile.FileName()))

		// Bucket should recompute when other file has changed
		session.DidChangeFile(context.Background(), secondaryFile.URI(), 1, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "// new content"}},
		})
		_, err = session.GetLanguageServiceWithAutoImports(context.Background(), mainFile.URI())
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		projectBucket = singleBucket(t, stats.ProjectBuckets)
		assert.Equal(t, projectBucket.State.Dirty(), false)
	})

	t.Run("bucket updates on same-file change when new files added to the program", func(t *testing.T) {
		t.Parallel()
		projectRoot := "/home/src/explicit-files-project"
		files := map[string]any{
			projectRoot + "/tsconfig.json": `{
				"compilerOptions": {
					"module": "esnext",
					"target": "esnext",
					"strict": true
				},
				"files": ["index.ts"]
			}`,
			projectRoot + "/index.ts": "",
			projectRoot + "/utils.ts": `export const foo = 1;
export const bar = 2;`,
		}
		session, _ := projecttestutil.Setup(files)
		t.Cleanup(session.Close)

		ctx := context.Background()
		indexURI := lsproto.DocumentUri("file://" + projectRoot + "/index.ts")

		// Open the index.ts file
		session.DidOpenFile(ctx, indexURI, 1, "", lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageServiceWithAutoImports(ctx, indexURI)
		assert.NilError(t, err)
		stats := autoImportStats(t, session)
		projectBucket := singleBucket(t, stats.ProjectBuckets)
		assert.Equal(t, 1, projectBucket.FileCount)

		// Edit index.ts to import foo from utils.ts
		newContent := `import { foo } from "./utils";`
		session.DidChangeFile(ctx, indexURI, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: newContent}},
		})

		// Bucket should be rebuilt because new files were added
		_, err = session.GetLanguageServiceWithAutoImports(ctx, indexURI)
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		projectBucket = singleBucket(t, stats.ProjectBuckets)
		assert.Equal(t, 2, projectBucket.FileCount)
	})

	t.Run("package.json dependency changes invalidate node_modules buckets", func(t *testing.T) {
		t.Parallel()
		fixture := autoimporttestutil.SetupLifecycleSession(t, lifecycleProjectRoot, 1)
		session := fixture.Session()
		sessionUtils := fixture.Utils()
		project := fixture.SingleProject()
		mainFile := project.File(0)
		nodePackage := project.NodeModules()[0]
		packageJSON := project.PackageJSONFile()
		ctx := context.Background()

		session.DidOpenFile(ctx, mainFile.URI(), 1, mainFile.Content(), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageServiceWithAutoImports(ctx, mainFile.URI())
		assert.NilError(t, err)
		stats := autoImportStats(t, session)
		nodeModulesBucket := singleBucket(t, stats.NodeModulesBuckets)
		assert.Equal(t, nodeModulesBucket.State.Dirty(), false)

		fs := sessionUtils.FS()
		updatePackageJSON := func(content string) {
			assert.NilError(t, fs.WriteFile(packageJSON.FileName(), content, false))
			session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{
				{Type: lsproto.FileChangeTypeChanged, Uri: packageJSON.URI()},
			})
		}

		sameDepsContent := fmt.Sprintf("{\n  \"name\": \"local-project-stable\",\n  \"dependencies\": {\n    \"%s\": \"*\"\n  }\n}\n", nodePackage.Name)
		updatePackageJSON(sameDepsContent)
		_, err = session.GetLanguageService(ctx, mainFile.URI())
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		nodeModulesBucket = singleBucket(t, stats.NodeModulesBuckets)
		assert.Equal(t, nodeModulesBucket.State.Dirty(), false)

		differentDepsContent := fmt.Sprintf("{\n  \"name\": \"local-project-stable\",\n  \"dependencies\": {\n    \"%s\": \"*\",\n    \"newpkg\": \"*\"\n  }\n}\n", nodePackage.Name)
		updatePackageJSON(differentDepsContent)
		_, err = session.GetLanguageServiceWithAutoImports(ctx, mainFile.URI())
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		assert.Check(t, singleBucket(t, stats.NodeModulesBuckets).DependencyNames.Has("newpkg"))
	})

	t.Run("node_modules buckets get deleted when no open files can reference them", func(t *testing.T) {
		t.Parallel()
		fixture := autoimporttestutil.SetupMonorepoLifecycleSession(t, autoimporttestutil.MonorepoSetupConfig{
			Root: monorepoProjectRoot,
			MonorepoPackageTemplate: autoimporttestutil.MonorepoPackageTemplate{
				Name:            "monorepo",
				NodeModuleNames: []string{"pkg-root"},
			},
			Packages: []autoimporttestutil.MonorepoPackageConfig{
				{FileCount: 1, MonorepoPackageTemplate: autoimporttestutil.MonorepoPackageTemplate{Name: "package-a", NodeModuleNames: []string{"pkg-a"}}},
				{FileCount: 1, MonorepoPackageTemplate: autoimporttestutil.MonorepoPackageTemplate{Name: "package-b", NodeModuleNames: []string{"pkg-b"}}},
			},
		})
		session := fixture.Session()
		monorepo := fixture.Monorepo()
		pkgA := monorepo.Package(0)
		pkgB := monorepo.Package(1)
		fileA := pkgA.File(0)
		fileB := pkgB.File(0)
		ctx := context.Background()

		// Open file in package-a, should create buckets for root and package-a node_modules
		session.DidOpenFile(ctx, fileA.URI(), 1, fileA.Content(), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageServiceWithAutoImports(ctx, fileA.URI())
		assert.NilError(t, err)

		// Open file in package-b, should also create buckets for package-b
		session.DidOpenFile(ctx, fileB.URI(), 1, fileB.Content(), lsproto.LanguageKindTypeScript)
		_, err = session.GetLanguageServiceWithAutoImports(ctx, fileB.URI())
		assert.NilError(t, err)
		stats := autoImportStats(t, session)
		assert.Equal(t, len(stats.NodeModulesBuckets), 3)
		assert.Equal(t, len(stats.ProjectBuckets), 2)

		// Close file in package-a, package-a's node_modules bucket and project bucket should be removed
		session.DidCloseFile(ctx, fileA.URI())
		_, err = session.GetLanguageServiceWithAutoImports(ctx, fileB.URI())
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		assert.Equal(t, len(stats.NodeModulesBuckets), 2)
		assert.Equal(t, len(stats.ProjectBuckets), 1)
	})

	t.Run("node_modules bucket dependency selection changes with open files", func(t *testing.T) {
		t.Parallel()
		monorepoRoot := "/home/src/monorepo"
		packageADir := tspath.CombinePaths(monorepoRoot, "packages", "a")
		monorepoIndex := tspath.CombinePaths(monorepoRoot, "index.js")
		packageAIndex := tspath.CombinePaths(packageADir, "index.js")

		fixture := autoimporttestutil.SetupMonorepoLifecycleSession(t, autoimporttestutil.MonorepoSetupConfig{
			Root: monorepoRoot,
			MonorepoPackageTemplate: autoimporttestutil.MonorepoPackageTemplate{
				Name:            "monorepo",
				NodeModuleNames: []string{"pkg1", "pkg2", "pkg3"},
				DependencyNames: []string{"pkg1"},
			},
			Packages: []autoimporttestutil.MonorepoPackageConfig{
				{
					FileCount: 0,
					MonorepoPackageTemplate: autoimporttestutil.MonorepoPackageTemplate{
						Name:            "a",
						DependencyNames: []string{"pkg1", "pkg2"},
					},
				},
			},
			ExtraFiles: []autoimporttestutil.TextFileSpec{
				{Path: monorepoIndex, Content: "export const monorepoIndex = 1;\n"},
				{Path: packageAIndex, Content: "export const pkgA = 2;\n"},
			},
		})
		session := fixture.Session()
		monorepoHandle := fixture.ExtraFile(monorepoIndex)
		packageAHandle := fixture.ExtraFile(packageAIndex)

		ctx := context.Background()

		// Open monorepo root file: expect dependencies restricted to pkg1
		session.DidOpenFile(ctx, monorepoHandle.URI(), 1, monorepoHandle.Content(), lsproto.LanguageKindJavaScript)
		_, err := session.GetLanguageServiceWithAutoImports(ctx, monorepoHandle.URI())
		assert.NilError(t, err)
		stats := autoImportStats(t, session)
		assert.Assert(t, singleBucket(t, stats.NodeModulesBuckets).DependencyNames.Equals(collections.NewSetFromItems("pkg1")))

		// Open package-a file: pkg2 should be added to existing bucket
		session.DidOpenFile(ctx, packageAHandle.URI(), 1, packageAHandle.Content(), lsproto.LanguageKindJavaScript)
		_, err = session.GetLanguageServiceWithAutoImports(ctx, packageAHandle.URI())
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		assert.Assert(t, singleBucket(t, stats.NodeModulesBuckets).DependencyNames.Equals(collections.NewSetFromItems("pkg1", "pkg2")))

		// Close package-a file; only monorepo bucket should remain
		session.DidCloseFile(ctx, packageAHandle.URI())
		_, err = session.GetLanguageServiceWithAutoImports(ctx, monorepoHandle.URI())
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		assert.Assert(t, singleBucket(t, stats.NodeModulesBuckets).DependencyNames.Equals(collections.NewSetFromItems("pkg1")))

		// Close monorepo file; no node_modules buckets should remain
		session.DidCloseFile(ctx, monorepoHandle.URI())
		session.DidOpenFile(ctx, "untitled:Untitled-1", 0, "", lsproto.LanguageKindTypeScript)
		_, err = session.GetLanguageService(ctx, "untitled:Untitled-1")
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		assert.Equal(t, len(stats.NodeModulesBuckets), 0)
	})

	t.Run("node_modules bucket includes resolved packages from all projects", func(t *testing.T) {
		// This test verifies that when multiple projects share a node_modules directory,
		// the node_modules bucket includes resolved package names from ALL projects,
		// not just the currently requested file's project.
		//
		// Scenario:
		// - Two separate projects (project-a and project-b) share a root node_modules
		// - pkg-listed is in both package.json dependencies
		// - pkg-unlisted is NOT in any package.json, but project-a imports it directly
		// - When requesting completions for project-b, pkg-unlisted should still be in
		//   the node_modules bucket because project-a's resolved packages are included.
		t.Parallel()
		monorepoRoot := "/home/src/cross-project-deps"
		packageADir := tspath.CombinePaths(monorepoRoot, "packages", "a")
		packageBDir := tspath.CombinePaths(monorepoRoot, "packages", "b")
		packageAIndex := tspath.CombinePaths(packageADir, "index.ts")
		packageBIndex := tspath.CombinePaths(packageBDir, "index.ts")

		fixture := autoimporttestutil.SetupMonorepoLifecycleSession(t, autoimporttestutil.MonorepoSetupConfig{
			Root: monorepoRoot,
			MonorepoPackageTemplate: autoimporttestutil.MonorepoPackageTemplate{
				Name: "monorepo",
				// Both pkg-listed and pkg-unlisted exist in node_modules
				NodeModuleNames: []string{"pkg-listed", "pkg-unlisted"},
				// But only pkg-listed is in the root package.json dependencies
				DependencyNames: []string{"pkg-listed"},
			},
			Packages: []autoimporttestutil.MonorepoPackageConfig{
				{
					FileCount: 0,
					MonorepoPackageTemplate: autoimporttestutil.MonorepoPackageTemplate{
						Name: "a",
						// package-a only lists pkg-listed in its package.json
						DependencyNames: []string{"pkg-listed"},
					},
				},
				{
					FileCount: 0,
					MonorepoPackageTemplate: autoimporttestutil.MonorepoPackageTemplate{
						Name: "b",
						// package-b also only lists pkg-listed in its package.json
						DependencyNames: []string{"pkg-listed"},
					},
				},
			},
			ExtraFiles: []autoimporttestutil.TextFileSpec{
				// project-a directly imports pkg-unlisted (not in package.json)
				{Path: packageAIndex, Content: "import { pkg_unlisted_value } from \"pkg-unlisted\";\nexport const a = pkg_unlisted_value;\n"},
				// project-b does not import pkg-unlisted
				{Path: packageBIndex, Content: "export const b = 1;\n"},
			},
		})
		session := fixture.Session()
		packageAHandle := fixture.ExtraFile(packageAIndex)
		packageBHandle := fixture.ExtraFile(packageBIndex)

		ctx := context.Background()

		// Open file in project-a (which imports pkg-unlisted)
		session.DidOpenFile(ctx, packageAHandle.URI(), 1, packageAHandle.Content(), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageServiceWithAutoImports(ctx, packageAHandle.URI())
		assert.NilError(t, err)

		// Open file in project-b (which does not import pkg-unlisted)
		session.DidOpenFile(ctx, packageBHandle.URI(), 1, packageBHandle.Content(), lsproto.LanguageKindTypeScript)
		// Request auto-imports for project-b
		_, err = session.GetLanguageServiceWithAutoImports(ctx, packageBHandle.URI())
		assert.NilError(t, err)

		// Verify that the node_modules bucket includes pkg-unlisted
		// even though we requested auto-imports for project-b which doesn't list it.
		// This is because project-a imports it directly, and the bucket should include
		// resolved packages from all projects that share the node_modules directory.
		stats := autoImportStats(t, session)
		nodeModulesBucket := singleBucket(t, stats.NodeModulesBuckets)
		assert.Assert(t, nodeModulesBucket.DependencyNames.Has("pkg-listed"), "pkg-listed should be in dependencies")
		assert.Assert(t, nodeModulesBucket.DependencyNames.Has("pkg-unlisted"), "pkg-unlisted should be in dependencies because project-a imports it")
	})

	t.Run("symlinked monorepo invalidates on source file change", func(t *testing.T) {
		// This test verifies that when a source file in a symlinked project reference
		// is modified, the node_modules bucket is properly invalidated.
		//
		// Scenario:
		// 1. project-a imports from project-b (symlinked into node_modules)
		// 2. project-b has projectBFunction export
		// 3. Open project-b's source file and delete the export
		// 4. Verify the node_modules bucket is invalidated and rebuilt
		//
		// We also include a regular (non-symlinked) package "other-pkg" to observe
		// whether a change to project-b triggers a full rebuild of the entire bucket
		// or a more granular update.
		t.Parallel()
		monorepoRoot := "/home/src/symlinked-monorepo-invalidation"
		projectADir := tspath.CombinePaths(monorepoRoot, "packages", "project-a")
		projectBDir := tspath.CombinePaths(monorepoRoot, "packages", "project-b")
		projectAIndex := tspath.CombinePaths(projectADir, "src", "index.ts")
		projectBSrcIndex := tspath.CombinePaths(projectBDir, "src", "index.ts")
		projectBDistIndex := tspath.CombinePaths(projectBDir, "dist", "index.d.ts")
		otherPkgDir := tspath.CombinePaths(projectADir, "node_modules", "other-pkg")

		files := map[string]any{
			// project-b: the library package
			tspath.CombinePaths(projectBDir, "tsconfig.json"): `{
				"compilerOptions": {
					"composite": true,
					"outDir": "./dist",
					"rootDir": "./src",
					"declaration": true,
					"module": "esnext",
					"strict": true
				},
				"include": ["src"]
			}`,
			tspath.CombinePaths(projectBDir, "package.json"): `{
				"name": "project-b",
				"version": "1.0.0",
				"main": "dist/index.js",
				"types": "dist/index.d.ts"
			}`,
			projectBSrcIndex: `export function projectBFunction(): string { return "hello"; }
export const projectBValue: number = 42;`,
			projectBDistIndex: `export declare function projectBFunction(): string;
export declare const projectBValue: number;`,
			// other-pkg: a regular (non-symlinked) package
			tspath.CombinePaths(otherPkgDir, "package.json"): `{
				"name": "other-pkg",
				"version": "1.0.0",
				"main": "index.js",
				"types": "index.d.ts"
			}`,
			tspath.CombinePaths(otherPkgDir, "index.d.ts"): `export declare function otherFunction(): void;
export declare const otherValue: string;`,
			// project-a: the consumer package
			tspath.CombinePaths(projectADir, "tsconfig.json"): `{
				"compilerOptions": {
					"module": "esnext",
					"strict": true,
					"outDir": "./dist",
					"rootDir": "./src"
				},
				"include": ["src"],
				"references": [{ "path": "../project-b" }]
			}`,
			tspath.CombinePaths(projectADir, "package.json"): `{
				"name": "project-a",
				"dependencies": { "project-b": "*", "other-pkg": "*" }
			}`,
			projectAIndex: `console.log("hello");
`,
			// Symlink: project-b is accessible via node_modules
			tspath.CombinePaths(projectADir, "node_modules", "project-b"): vfstest.Symlink(projectBDir),
		}

		session, _ := projecttestutil.Setup(files)
		t.Cleanup(session.Close)
		ctx := context.Background()

		// Open project-a's index file and get initial auto-imports
		projectAURI := lsconv.FileNameToDocumentURI(projectAIndex)
		projectAContent := files[projectAIndex].(string)
		session.DidOpenFile(ctx, projectAURI, 1, projectAContent, lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageServiceWithAutoImports(ctx, projectAURI)
		assert.NilError(t, err)

		// Verify initial state: bucket is clean with files
		stats := autoImportStats(t, session)
		nodeModulesBucket := singleBucket(t, stats.NodeModulesBuckets)
		initialFileCount := nodeModulesBucket.FileCount
		assert.Equal(t, nodeModulesBucket.State.Dirty(), false, "bucket should be clean initially")
		assert.Assert(t, initialFileCount > 0, "bucket should have files initially")

		// Open project-b's source file
		projectBURI := lsconv.FileNameToDocumentURI(projectBSrcIndex)
		projectBContent := files[projectBSrcIndex].(string)
		session.DidOpenFile(ctx, projectBURI, 1, projectBContent, lsproto.LanguageKindTypeScript)

		// Modify the file (delete one export)
		newProjectBContent := `export const projectBValue: number = 42;`
		session.DidChangeFile(ctx, projectBURI, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: newProjectBContent}},
		})

		// Check that the node_modules bucket is now dirty
		_, err = session.GetLanguageService(ctx, projectAURI)
		assert.NilError(t, err)
		stats = autoImportStats(t, session)
		nodeModulesBucket = singleBucket(t, stats.NodeModulesBuckets)
		assert.Equal(t, nodeModulesBucket.State.Dirty(), true, "bucket should be dirty after source file change")

		// Verify that only project-b is marked for update, not other-pkg.
		// This tests that we correctly track which packages need granular updates.
		dirtyPackages := nodeModulesBucket.State.DirtyPackages()
		assert.Assert(t, dirtyPackages != nil, "dirty packages should be tracked")
		assert.Assert(t, dirtyPackages.Has("project-b"), "project-b should be in dirty packages")
		assert.Assert(t, !dirtyPackages.Has("other-pkg"), "other-pkg should NOT be in dirty packages")
		assert.Equal(t, dirtyPackages.Len(), 1, "only one package should be dirty")

		// Rebuild by requesting auto-imports again.
		// NOTE: Currently the entire bucket is rebuilt, not just the dirty packages.
		// The dirtyPackages tracking is in place for future granular update implementation.
		_, err = session.GetLanguageServiceWithAutoImports(ctx, projectAURI)
		assert.NilError(t, err)

		// Verify bucket is clean again after rebuild
		stats = autoImportStats(t, session)
		nodeModulesBucket = singleBucket(t, stats.NodeModulesBuckets)
		assert.Equal(t, nodeModulesBucket.State.Dirty(), false, "bucket should be clean after rebuild")
	})
}

const (
	lifecycleProjectRoot = "/home/src/autoimport-lifecycle"
	monorepoProjectRoot  = "/home/src/autoimport-monorepo"
)

func autoImportStats(t *testing.T, session *project.Session) *autoimport.CacheStats {
	t.Helper()
	snapshot, release := session.Snapshot()
	defer release()
	registry := snapshot.AutoImportRegistry()
	if registry == nil {
		t.Fatal("auto import registry not initialized")
	}
	return registry.GetCacheStats()
}

func singleBucket(t *testing.T, buckets []autoimport.BucketStats) autoimport.BucketStats {
	t.Helper()
	if len(buckets) != 1 {
		t.Fatalf("expected 1 bucket, got %d", len(buckets))
	}
	return buckets[0]
}

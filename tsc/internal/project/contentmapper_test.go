package project_test

import (
	"context"
	"fmt"
	"io"
	"slices"
	"strings"
	"sync"
	"sync/atomic"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/contentmapper"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type recordingContentMapperSpawner struct {
	inner  contentmapper.Spawner
	spawns atomic.Int32
	closes atomic.Int32
}

func (s *recordingContentMapperSpawner) Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	process, err := s.inner.Spawn(command, dir, stderr)
	if err != nil {
		return nil, err
	}
	s.spawns.Add(1)
	return &recordingContentMapperProcess{ReadWriteCloser: process, closes: &s.closes}, nil
}

type recordingContentMapperProcess struct {
	io.ReadWriteCloser
	closes *atomic.Int32
	once   sync.Once
}

func (p *recordingContentMapperProcess) Close() error {
	p.once.Do(func() { p.closes.Add(1) })
	return p.ReadWriteCloser.Close()
}

func TestContentMapperInProject(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/project/tsconfig.json": `{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler", "strict": true },
			"contentMappers": [ { "package": "mapper", "extensions": [".box"] } ]
		}`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.TransformingMapper),
		"/home/project/app.box":                          "export const version = #{target};\n",
		"/home/project/main.ts":                          "import { version } from \"./app.box\";\nexport const twice: number = version * 2;\n",
	}

	newSession := func(trusted bool) (*project.Session, *projecttestutil.SessionUtils) {
		init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
			CurrentDirectory:   "/home/project",
			DefaultLibraryPath: bundled.LibPath(),
			TypingsLocation:    projecttestutil.TestTypingsLocation,
			PositionEncoding:   lsproto.PositionEncodingKindUTF8,
			LoggingEnabled:     true,
			RunExternalCode:    trusted,
		}, nil)
		init.Spawner = contentmappertest.NewSpawner()
		return project.NewSession(init), utils
	}

	t.Run("trusted workspace transforms the content-mapped file", func(t *testing.T) {
		t.Parallel()
		session, utils := newSession(true)
		defer session.Close()

		session.DidOpenFile(context.Background(), "file:///home/project/main.ts", 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
		ls, err := session.GetLanguageService(context.Background(), "file:///home/project/main.ts")
		assert.NilError(t, err)

		boxFile := ls.GetProgram().GetSourceFile("/home/project/app.box")
		assert.Assert(t, boxFile != nil, "expected app.box to be loaded into the program")
		// The #{target} token was substituted with the es2020 target value (7) by the content mapper.
		assert.Assert(t, strings.Contains(boxFile.Text(), "export const version = 7;"), "app.box was not transformed: %q", boxFile.Text())

		// The config's .box mapper should have been registered for text document synchronization.
		session.WaitForBackgroundTasks()
		calls := utils.Client().RegisterContentMapperExtensionsCalls()
		assert.Assert(t, len(calls) > 0, "expected RegisterContentMapperExtensions to be called")
		assert.DeepEqual(t, calls[len(calls)-1].Extensions, []string{".box"})
		logs := utils.Logs()
		assert.Assert(t, strings.Contains(logs, "Content mapper timings since previous snapshot adoption:"), logs)
		assert.Assert(t, strings.Contains(logs, "mapper@1.0.0:"), logs)
		assert.Assert(t, strings.Contains(logs, "Transforms: 1 ("), logs)
	})

	t.Run("untrusted workspace does not run the content mapper", func(t *testing.T) {
		t.Parallel()
		session, utils := newSession(false)
		defer session.Close()

		session.DidOpenFile(context.Background(), "file:///home/project/main.ts", 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
		ls, err := session.GetLanguageService(context.Background(), "file:///home/project/main.ts")
		assert.NilError(t, err)

		// Without workspace trust, the content mapper gate drops the mappers, so .box is not a recognized
		// extension and app.box never enters the program.
		boxFile := ls.GetProgram().GetSourceFile("/home/project/app.box")
		assert.Assert(t, boxFile == nil, "app.box should not be loaded without trust")

		// No content mapper extensions should be registered without trust.
		session.WaitForBackgroundTasks()
		for _, call := range utils.Client().RegisterContentMapperExtensionsCalls() {
			assert.Equal(t, len(call.Extensions), 0, "expected no content mapper extensions to be registered without trust")
		}
	})

	t.Run("editing an open content-mapped file reparses it through the mapper", func(t *testing.T) {
		t.Parallel()
		session, _ := newSession(true)
		defer session.Close()

		ctx := context.Background()
		session.DidOpenFile(ctx, "file:///home/project/main.ts", 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
		// Open the .box with its content-mapped language id so its overlay script kind is Unknown, matching how an
		// editor opens a content-mapped file. This is what made the incremental reparse panic.
		session.DidOpenFile(ctx, "file:///home/project/app.box", 1, files["/home/project/app.box"].(string), lsproto.LanguageKind("box"))
		_, err := session.GetLanguageService(ctx, "file:///home/project/main.ts")
		assert.NilError(t, err)

		// Editing the open .box file drives the single-file incremental reparse path
		// (Program.UpdateProgram), which must re-run the content mapper transform rather than parse the
		// raw source text.
		session.DidChangeFile(ctx, "file:///home/project/app.box", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "export const version = #{target};\nexport const extra = 1;\n"}},
		})
		ls, err := session.GetLanguageService(ctx, "file:///home/project/main.ts")
		assert.NilError(t, err)

		boxFile := ls.GetProgram().GetSourceFile("/home/project/app.box")
		assert.Assert(t, boxFile != nil, "expected app.box to be loaded")
		assert.Assert(t, strings.Contains(boxFile.Text(), "export const version = 7;"), "reparsed app.box was not transformed: %q", boxFile.Text())
		assert.Assert(t, strings.Contains(boxFile.Text(), "export const extra = 1;"), "reparsed app.box missing the edit: %q", boxFile.Text())
	})

	t.Run("watch change to a content-mapped file updates the program", func(t *testing.T) {
		t.Parallel()
		session, utils := newSession(true)
		defer session.Close()

		ctx := context.Background()
		mainURI := lsproto.DocumentUri("file:///home/project/main.ts")
		session.DidOpenFile(ctx, mainURI, 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
		languageService, err := session.GetLanguageService(ctx, mainURI)
		assert.NilError(t, err)
		original := languageService.GetProgram().GetSourceFile("/home/project/app.box")
		assert.Assert(t, original != nil, "expected app.box to be loaded")

		// Wait until the configured extension set has been published; watch filtering uses the set captured
		// when the snapshot change is created.
		session.WaitForBackgroundTasks()
		updatedContent := "export const version = #{target};\nexport const watched = true;\n"
		assert.NilError(t, utils.FS().WriteFile("/home/project/app.box", updatedContent))
		session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
			Uri:  "file:///home/project/app.box",
			Type: lsproto.FileChangeTypeChanged,
		}})

		languageService, err = session.GetLanguageService(ctx, mainURI)
		assert.NilError(t, err)
		updatedSnapshot := session.Snapshot()
		configuredProject := updatedSnapshot.GetDefaultProject(mainURI)
		assert.Assert(t, configuredProject != nil, "expected configured project")
		assert.Equal(t, configuredProject.ProgramUpdateKind, project.ProgramUpdateKindCloned)
		assert.Equal(t, configuredProject.ProgramLastUpdate, updatedSnapshot.ID())
		updated := languageService.GetProgram().GetSourceFile("/home/project/app.box")
		assert.Assert(t, updated != nil, "expected app.box to remain loaded")
		assert.Assert(t, updated != original, "expected the watched content-mapped file to be reparsed")
		assert.Assert(t, strings.Contains(updated.Text(), "export const version = 7;"), "updated app.box was not transformed: %q", updated.Text())
		assert.Assert(t, strings.Contains(updated.Text(), "export const watched = true;"), "updated app.box missing watched change: %q", updated.Text())
	})

	t.Run("unchanged content-mapped file is reused from the cache across a full rebuild", func(t *testing.T) {
		t.Parallel()
		session, utils := newSession(true)
		defer session.Close()

		ctx := context.Background()
		session.DidOpenFile(ctx, "file:///home/project/main.ts", 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
		ls, err := session.GetLanguageService(ctx, "file:///home/project/main.ts")
		assert.NilError(t, err)
		boxFile := ls.GetProgram().GetSourceFile("/home/project/app.box")
		assert.Assert(t, boxFile != nil, "expected app.box to be loaded")
		assert.Assert(t, strings.Contains(boxFile.Text(), "export const version = 7;"), "app.box was not transformed: %q", boxFile.Text())

		// Changing a compiler option the mapper does not depend on (strict) forces a full program
		// rebuild while leaving app.box's content and the mapper's transform identity unchanged, so the
		// transformed file must be served from the parse cache rather than re-transformed.
		err = utils.FS().WriteFile("/home/project/tsconfig.json", `{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler", "strict": false },
			"contentMappers": [ { "package": "mapper", "extensions": [".box"] } ]
		}`)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{Uri: "file:///home/project/tsconfig.json", Type: lsproto.FileChangeTypeChanged}})

		ls, err = session.GetLanguageService(ctx, "file:///home/project/main.ts")
		assert.NilError(t, err)
		rebuiltBox := ls.GetProgram().GetSourceFile("/home/project/app.box")
		assert.Assert(t, rebuiltBox == boxFile, "expected the unchanged content-mapped file to be reused from the parse cache, not re-transformed")
	})
}

func TestContentMapperPackageManifestChangeReloadsConfig(t *testing.T) {
	t.Parallel()
	const packageJsonPath = "/home/mapper/package.json"
	files := map[string]any{
		"/home/project/tsconfig.json": `{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler" },
			"contentMappers": [{ "package": "mapper", "extensions": [".box"] }]
		}`,
		"/home/project/node_modules/mapper": vfstest.Symlink("/home/mapper"),
		packageJsonPath: `{
			"name": "mapper",
			"version": "1.0.0",
			"typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
		}`,
		"/home/project/app.box": "export const version = #{target};\n",
		"/home/project/main.ts": "import { version } from \"./app.box\";\n",
	}
	caps := &lsproto.ResolvedClientCapabilities{}
	caps.Workspace.DidChangeWatchedFiles.RelativePatternSupport = true
	ctx := lsproto.WithClientCapabilities(context.Background(), caps)
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
		WatchEnabled:       true,
	}, nil)
	init.BackgroundCtx = ctx
	init.Spawner = contentmappertest.NewSpawner()
	session := project.NewSession(init)
	defer session.Close()

	mainURI := lsproto.DocumentUri("file:///home/project/main.ts")
	session.DidOpenFile(ctx, mainURI, 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
	_, err := session.GetLanguageService(ctx, mainURI)
	assert.NilError(t, err)
	configuredProject := session.Snapshot().GetDefaultProject(mainURI)
	assert.Assert(t, configuredProject != nil)
	mappers := configuredProject.CommandLine.ContentMappers()
	assert.Equal(t, len(mappers), 1)
	assert.Equal(t, mappers[0].PackageDirectory, "/home/mapper")
	session.WaitForBackgroundTasks()
	assert.Assert(t, utils.WatchesFile(packageJsonPath), "expected the invalid mapper package manifest to be watched")
	assert.Assert(t, slices.ContainsFunc(utils.Client().WatchFilesCalls(), func(call struct {
		Ctx      context.Context
		ID       project.WatcherID
		Watchers []*lsproto.FileSystemWatcher
	},
	) bool {
		return slices.ContainsFunc(call.Watchers, func(watcher *lsproto.FileSystemWatcher) bool {
			relative := watcher.GlobPattern.RelativePattern
			return relative != nil && relative.BaseUri.URI != nil && string(*relative.BaseUri.URI) == "file:///home/mapper" && relative.Pattern == "**/*"
		})
	}), "expected an external relative-pattern watcher for the mapper package")

	fixedManifest := strings.Replace(contentmappertest.PackageJSON(contentmappertest.TransformingMapper), `"version": "1.0.0"`, `"version": "2.0.0"`, 1)
	assert.Assert(t, strings.Contains(fixedManifest, `"version": "2.0.0"`))
	assert.NilError(t, utils.FS().WriteFile(packageJsonPath, fixedManifest))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri:  lsproto.DocumentUri("file://" + packageJsonPath),
		Type: lsproto.FileChangeTypeChanged,
	}})

	languageService, err := session.GetLanguageService(ctx, mainURI)
	assert.NilError(t, err)
	boxFile := languageService.GetProgram().GetSourceFile("/home/project/app.box")
	assert.Assert(t, boxFile != nil, "expected app.box in the rebuilt program")
	assert.Assert(t, strings.Contains(boxFile.Text(), "export const version = 7;"), "expected fixed mapper manifest to be reloaded: %q", boxFile.Text())
}

func TestContentMapperSupplementalFileClonedOnEdit(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/project/tsconfig.json":                    `{ "compilerOptions": { "strict": true }, "contentMappers": [{ "package": "mapper", "extensions": [".box"] }] }`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.SupplementalMapper),
		"/home/project/app.box":                          "declare const supplementalValue: number;\n",
		"/home/project/extra.d.ts":                       "interface Extra {}\n",
		"/home/project/main.ts":                          "const value: number = supplementalValue;\n",
	}
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	init.Spawner = contentmappertest.NewSpawner()
	session := project.NewSession(init)
	defer session.Close()

	ctx := context.Background()
	mainURI := lsproto.DocumentUri("file:///home/project/main.ts")
	session.DidOpenFile(ctx, mainURI, 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
	languageService, err := session.GetLanguageService(ctx, mainURI)
	assert.NilError(t, err)
	oldProgram := languageService.GetProgram()
	oldCanonical := oldProgram.GetSourceFile("/home/project/app.box")
	oldSupplemental := oldCanonical.SupplementalSourceFiles()
	assert.Equal(t, len(oldSupplemental), 1)
	assert.Equal(t, oldSupplemental[0].FileName(), "/home/project/app.box.0.ts")
	assert.Equal(t, oldSupplemental[0].Path(), tspath.Path("/home/project/app.box.0.ts"))
	assert.Equal(t, oldSupplemental[0].Hash, oldCanonical.Hash)
	assert.Assert(t, oldProgram.GetSourceFileByPath(oldSupplemental[0].Path()) == oldSupplemental[0])
	assert.Assert(t, oldProgram.FilesByPath()[oldSupplemental[0].Path()] == oldSupplemental[0])

	assert.NilError(t, utils.FS().WriteFile("/home/project/app.box", "declare const supplementalValue: string;\n"))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri:  "file:///home/project/app.box",
		Type: lsproto.FileChangeTypeChanged,
	}})
	languageService, err = session.GetLanguageService(ctx, mainURI)
	assert.NilError(t, err)
	updatedSnapshot := session.Snapshot()
	configuredProject := updatedSnapshot.GetDefaultProject(mainURI)
	assert.Equal(t, configuredProject.ProgramUpdateKind, project.ProgramUpdateKindCloned)

	newProgram := languageService.GetProgram()
	newCanonical := newProgram.GetSourceFile("/home/project/app.box")
	newSupplemental := newCanonical.SupplementalSourceFiles()
	assert.Equal(t, len(newSupplemental), 1)
	assert.Equal(t, newSupplemental[0].Path(), oldSupplemental[0].Path())
	assert.Assert(t, newCanonical != oldCanonical)
	assert.Assert(t, newSupplemental[0] != oldSupplemental[0])
	assert.Equal(t, newSupplemental[0].Hash, newCanonical.Hash)
	assert.Assert(t, newSupplemental[0].Hash != oldSupplemental[0].Hash)
	assert.Assert(t, newProgram.FilesByPath()[newSupplemental[0].Path()] == newSupplemental[0])
	assert.Assert(t, strings.Contains(newSupplemental[0].Text(), "supplementalValue: string"))
	mainFile := newProgram.GetSourceFile("/home/project/main.ts")
	diagnostics := newProgram.GetSemanticDiagnostics(ctx, mainFile)
	assert.Assert(t, slices.ContainsFunc(diagnostics, func(diagnostic *ast.Diagnostic) bool { return diagnostic.Code() == 2322 }))

	// Changing the supplemental file's reference graph must fall back from cloning to a full rebuild.
	assert.NilError(t, utils.FS().WriteFile("/home/project/app.box", "/// <reference path=\"./extra.d.ts\" />\ndeclare const supplementalValue: string;\n"))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri:  "file:///home/project/app.box",
		Type: lsproto.FileChangeTypeChanged,
	}})
	_, err = session.GetLanguageService(ctx, mainURI)
	assert.NilError(t, err)
	configuredProject = session.Snapshot().GetDefaultProject(mainURI)
	assert.Equal(t, configuredProject.ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
}

func TestContentMapperModuleExtensionClonedOnUnrelatedEdit(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/project/tsconfig.json":                    `{ "contentMappers": [{ "package": "mapper", "extensions": [".box"] }] }`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.ModuleVerbatimMapper),
		"/home/project/app.box":                          "export const value = 1;\n",
		"/home/project/main.ts":                          `import { value } from "./app.box"; value;`,
	}
	init, _ := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	init.Spawner = contentmappertest.NewSpawner()
	session := project.NewSession(init)
	defer session.Close()

	ctx := context.Background()
	mainURI := lsproto.DocumentUri("file:///home/project/main.ts")
	session.DidOpenFile(ctx, mainURI, 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
	languageService, err := session.GetLanguageService(ctx, mainURI)
	assert.NilError(t, err)
	mappedFile := languageService.GetProgram().GetSourceFile("/home/project/app.box")
	assert.Assert(t, mappedFile != nil)
	assert.Equal(t, mappedFile.VirtualFileName(), "/home/project/app.box.mts")
	assert.Assert(t, mappedFile.ParseOptions().ExternalModuleIndicatorOptions.Force)

	session.DidChangeFile(ctx, mainURI, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
		WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: `import { value } from "./app.box"; value + 1;`},
	}})
	languageService, err = session.GetLanguageService(ctx, mainURI)
	assert.NilError(t, err)
	configuredProject := session.Snapshot().GetDefaultProject(mainURI)
	assert.Equal(t, configuredProject.ProgramUpdateKind, project.ProgramUpdateKindCloned)
	assert.Assert(t, languageService.GetProgram().GetSourceFile("/home/project/app.box") == mappedFile)
}

func TestContentMapperLocaleChange(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/project/tsconfig.json":                    `{ "contentMappers": [ { "package": "mapper", "extensions": [".box"] } ] }`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
		"/home/project/app.box":                          "export const value = 1;\n",
		"/home/project/main.ts":                          `import { value } from "./app.box"; value;`,
	}
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
	init.Spawner = spawner

	var localeMu sync.RWMutex
	currentLocale := locale.Default
	utils.Client().GetLocaleFunc = func() locale.Locale {
		localeMu.RLock()
		defer localeMu.RUnlock()
		return currentLocale
	}
	utils.Client().SetLocaleFunc = func(value string) {
		updated, ok := locale.Parse(value)
		assert.Assert(t, ok)
		localeMu.Lock()
		currentLocale = updated
		localeMu.Unlock()
	}

	session := project.NewSession(init)
	defer session.Close()
	session.DidOpenFile(context.Background(), "file:///home/project/main.ts", 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
	_, err := session.GetLanguageService(context.Background(), "file:///home/project/main.ts")
	assert.NilError(t, err)
	assert.Equal(t, spawner.spawns.Load(), int32(1))

	preferences := session.Config()
	preferences.Locale = "fr"
	session.Configure(preferences)
	assert.Equal(t, spawner.closes.Load(), int32(1))

	_, err = session.GetLanguageService(context.Background(), "file:///home/project/main.ts")
	assert.NilError(t, err)
	assert.Equal(t, spawner.spawns.Load(), int32(2))
}

func TestDynamicContentMapperInProject(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/project/tsconfig.json":                    `{ "contentMappers": [ { "package": "mapper", "extensions": [".box"], "options": { "mode": "project" } } ] }`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.DynamicVerbatimMapper),
		"/home/project/mapper.config.json":               `{ "version": 1 }`,
		"/home/project/app.box":                          "export const value = 1;\n",
		"/home/project/main.ts":                          `import { value } from "./app.box"; value;`,
	}
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	init.Spawner = contentmappertest.NewSpawner()
	session := project.NewSession(init)
	defer session.Close()

	session.DidOpenFile(context.Background(), "file:///home/project/main.ts", 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
	languageService, err := session.GetLanguageService(context.Background(), "file:///home/project/main.ts")
	assert.NilError(t, err)
	mappedFile := languageService.GetProgram().GetSourceFile("/home/project/app.box")
	assert.Assert(t, mappedFile != nil)
	assert.Assert(t, !mappedFile.IsContentMapperFailureStub())

	program := languageService.GetProgram()
	assert.NilError(t, utils.FS().WriteFile("/home/project/mapper.config.json", `{ "version": 2 }`))
	session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{
		Uri:  "file:///home/project/mapper.config.json",
		Type: lsproto.FileChangeTypeChanged,
	}})
	languageService, err = session.GetLanguageService(context.Background(), "file:///home/project/main.ts")
	assert.NilError(t, err)
	assert.Assert(t, languageService.GetProgram() != program)
	mappedFile = languageService.GetProgram().GetSourceFile("/home/project/app.box")
	assert.Assert(t, mappedFile != nil)
	assert.Assert(t, !mappedFile.IsContentMapperFailureStub())
}

func TestDynamicContentMapperRefreshesForMixedWatchBatches(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name   string
		events func() []*lsproto.FileEvent
	}{
		{
			name: "excessive events",
			events: func() []*lsproto.FileEvent {
				events := make([]*lsproto.FileEvent, 1001)
				for i := range events {
					events[i] = &lsproto.FileEvent{Uri: lsproto.DocumentUri(fmt.Sprintf("file:///home/project/noise-%d.ts", i)), Type: lsproto.FileChangeTypeChanged}
				}
				events[0] = &lsproto.FileEvent{Uri: "file:///home/project/mapper.config.json", Type: lsproto.FileChangeTypeChanged}
				events[1] = &lsproto.FileEvent{Uri: "file:///home/project/main.ts", Type: lsproto.FileChangeTypeChanged}
				return events
			},
		},
		{
			name: "changed files make project fully dirty before mapper deletion",
			events: func() []*lsproto.FileEvent {
				return []*lsproto.FileEvent{
					{Uri: "file:///home/project/main.ts", Type: lsproto.FileChangeTypeChanged},
					{Uri: "file:///home/project/app.box", Type: lsproto.FileChangeTypeChanged},
					{Uri: "file:///home/project/mapper.config.json", Type: lsproto.FileChangeTypeDeleted},
				}
			},
		},
		{
			name: "changed files make project fully dirty before mapper creation",
			events: func() []*lsproto.FileEvent {
				return []*lsproto.FileEvent{
					{Uri: "file:///home/project/main.ts", Type: lsproto.FileChangeTypeChanged},
					{Uri: "file:///home/project/app.box", Type: lsproto.FileChangeTypeChanged},
					{Uri: "file:///home/project/mapper.config.json", Type: lsproto.FileChangeTypeCreated},
				}
			},
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			files := map[string]any{
				"/home/project/tsconfig.json":                    `{ "contentMappers": [{ "package": "mapper", "extensions": [".box"] }] }`,
				"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.DynamicVerbatimMapper),
				"/home/project/mapper.config.json":               `{ "version": 1 }`,
				"/home/project/app.box":                          "export const value = 1;\n",
				"/home/project/main.ts":                          `import { value } from "./app.box"; value;`,
			}
			init, _ := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
				CurrentDirectory:   "/home/project",
				DefaultLibraryPath: bundled.LibPath(),
				TypingsLocation:    projecttestutil.TestTypingsLocation,
				PositionEncoding:   lsproto.PositionEncodingKindUTF8,
				RunExternalCode:    true,
			}, nil)
			lifecycle := &contentmappertest.ProjectLifecycle{}
			init.Spawner = contentmappertest.NewSpawnerWithProjectLifecycle(lifecycle)
			session := project.NewSession(init)
			defer session.Close()

			ctx := context.Background()
			mainURI := lsproto.DocumentUri("file:///home/project/main.ts")
			session.DidOpenFile(ctx, mainURI, 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
			_, err := session.GetLanguageService(ctx, mainURI)
			assert.NilError(t, err)
			assert.Equal(t, lifecycle.Opens.Load(), int32(1))
			assert.Equal(t, lifecycle.Closes.Load(), int32(0))

			session.DidChangeWatchedFiles(ctx, test.events())
			session.WaitForBackgroundTasks()
			_, err = session.GetLanguageService(ctx, mainURI)
			assert.NilError(t, err)
			assert.Equal(t, lifecycle.Closes.Load(), int32(1))
			assert.Equal(t, lifecycle.Opens.Load(), int32(2))
		})
	}
}

func TestUnusedDynamicContentMapperIsNotOpened(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/project/tsconfig.json":                    `{ "contentMappers": [{ "package": "mapper", "extensions": [".box"] }] }`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.DynamicVerbatimMapper),
		"/home/project/main.ts":                          `export const value = 1;`,
	}
	init, _ := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	lifecycle := &contentmappertest.ProjectLifecycle{}
	init.Spawner = contentmappertest.NewSpawnerWithProjectLifecycle(lifecycle)
	session := project.NewSession(init)
	defer session.Close()

	uri := lsproto.DocumentUri("file:///home/project/main.ts")
	session.DidOpenFile(context.Background(), uri, 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
	_, err := session.GetLanguageService(context.Background(), uri)
	assert.NilError(t, err)
	assert.Equal(t, lifecycle.Opens.Load(), int32(0))
}

func TestContentMappersInParallelProjectReferences(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/project/tsconfig.json": `{
			"files": ["src/index.d.ts"],
			"references": [{ "path": "./a" }, { "path": "./b" }]
		}`,
		"/home/project/src/index.d.ts": "export {};",
		"/home/project/a/tsconfig.json": `{
			"compilerOptions": { "composite": true },
			"files": ["../src/index.d.ts"],
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		"/home/project/b/tsconfig.json": `{
			"compilerOptions": { "composite": true },
			"files": ["../src/index.d.ts"],
			"contentMappers": [{ "package": "mapper", "extensions": [".svelte"] }]
		}`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.TransformingMapper),
	}
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	init.Spawner = contentmappertest.NewSpawner()
	session := project.NewSession(init)
	defer session.Close()

	uri := lsproto.DocumentUri("file:///home/project/src/index.d.ts")
	session.DidOpenFile(context.Background(), uri, 1, files["/home/project/src/index.d.ts"].(string), lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	calls := utils.Client().RegisterContentMapperExtensionsCalls()
	assert.Assert(t, len(calls) > 0)
	extensions := slices.Clone(calls[len(calls)-1].Extensions)
	slices.Sort(extensions)
	assert.DeepEqual(t, extensions, []string{".svelte", ".vue"})
}

func TestContentMapperOpenFileExcludedByConfigChange(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/project/tsconfig.json": `{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler", "strict": true },
			"include": ["src"],
			"contentMappers": [ { "package": "mapper", "extensions": [".box"] } ]
		}`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.TransformingMapper),
		"/home/project/src/app.box":                      "export const version = #{target};\n",
		"/home/project/src/main.ts":                      "export const main = true;\n",
	}
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	init.Spawner = contentmappertest.NewSpawner()
	session := project.NewSession(init)
	defer session.Close()

	ctx := context.Background()
	boxURI := lsproto.DocumentUri("file:///home/project/src/app.box")
	session.SetContentMapperContributions(ctx, project.ContentMapperContributions{
		Mappers: []*contentmapper.Mapper{{
			Definition:       contentmapper.Definition{Package: "test.extension", Extensions: []string{".box"}},
			Manifest:         contentmapper.Manifest{Name: "mapper", Version: "1.0.0", Exec: []string{contentmappertest.TransformingMapper}, CompilerOptions: contentmappertest.DeclaredOptions},
			PackageDirectory: "/home/project",
			ContributionID:   "test.extension[0]",
		}},
		Extensions: []string{".box"},
	}, nil)
	session.DidOpenFile(ctx, boxURI, 1, files["/home/project/src/app.box"].(string), lsproto.LanguageKind("box"))
	languageService, err := session.GetLanguageService(ctx, boxURI)
	assert.NilError(t, err)
	assert.Assert(t, languageService.GetProgram().GetSourceFile("/home/project/src/app.box") != nil)

	assert.NilError(t, utils.FS().WriteFile("/home/project/tsconfig.json", `{
		"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler", "strict": true },
		"include": ["src/**/*.ts"],
		"contentMappers": [ { "package": "mapper", "extensions": [".box"] } ]
	}`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri:  "file:///home/project/tsconfig.json",
		Type: lsproto.FileChangeTypeChanged,
	}})

	languageService, err = session.GetLanguageService(ctx, boxURI)
	assert.NilError(t, err)
	defaultProject := session.Snapshot().GetDefaultProject(boxURI)
	assert.Assert(t, defaultProject != nil, "expected a default project for the open app.box")
	assert.Equal(t, defaultProject.Kind, project.KindInferred)
	boxFile := languageService.GetProgram().GetSourceFile("/home/project/src/app.box")
	assert.Assert(t, boxFile != nil, "expected the open app.box in the inferred project")
	assert.Assert(t, boxFile.ContentMapper() != "", "expected app.box to retain its content mapper")
	assert.Assert(t, !strings.Contains(boxFile.Text(), "#{target}"), "expected app.box to be transformed: %q", boxFile.Text())
}

func TestContentMapperRemovalWithOpenFile(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/project/tsconfig.json": `{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler" },
			"contentMappers": [ { "package": "mapper", "extensions": [".box"] } ]
		}`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.TransformingMapper),
		"/home/project/app.box":                          "export const version = #{target};\n",
	}
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
	init.Spawner = spawner
	session := project.NewSession(init)
	defer session.Close()

	ctx := context.Background()
	boxURI := lsproto.DocumentUri("file:///home/project/app.box")
	session.DidOpenFile(ctx, boxURI, 1, files["/home/project/app.box"].(string), lsproto.LanguageKind("box"))
	languageService, err := session.GetLanguageService(ctx, boxURI)
	assert.NilError(t, err)
	assert.Assert(t, languageService.GetProgram().GetSourceFile("/home/project/app.box").ContentMapper() != "")
	assert.Equal(t, spawner.spawns.Load(), int32(1))
	assert.Equal(t, spawner.closes.Load(), int32(0))
	for version := int32(2); version <= 4; version++ {
		session.DidChangeFile(ctx, boxURI, version, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: fmt.Sprintf("export const version = %d;\n", version)}},
		})
		_, err = session.GetLanguageService(ctx, boxURI)
		assert.NilError(t, err)
		assert.Equal(t, spawner.spawns.Load(), int32(1), "snapshot clone should reuse the mapper process")
		assert.Equal(t, spawner.closes.Load(), int32(0), "snapshot clone should preserve overlapping ownership")
	}
	releaseOldSnapshot, err := session.WithLanguageServiceAndSnapshot(ctx, boxURI, func(_ *ls.LanguageService, _ *project.Snapshot) (func() error, error) {
		return func() error { return nil }, nil
	})
	assert.NilError(t, err)

	assert.NilError(t, utils.FS().WriteFile("/home/project/tsconfig.json", `{
		"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler" }
	}`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri:  "file:///home/project/tsconfig.json",
		Type: lsproto.FileChangeTypeChanged,
	}})

	_, err = session.GetLanguageService(ctx, boxURI)
	assert.ErrorContains(t, err, "no project found")
	assert.Assert(t, session.Snapshot().GetFile("/home/project/app.box") != nil, "overlay should remain until didClose")
	assert.Assert(t, session.Snapshot().GetDefaultProject(boxURI) == nil, "unsupported file should not be in a project")

	session.WaitForBackgroundTasks()
	assert.Equal(t, spawner.closes.Load(), int32(0), "live old snapshot should retain the mapper process")
	assert.NilError(t, releaseOldSnapshot())
	assert.Equal(t, spawner.closes.Load(), int32(1), "process should close after the final live snapshot is released")
	calls := utils.Client().RegisterContentMapperExtensionsCalls()
	assert.Assert(t, len(calls) > 0, "expected content mapper registration updates")
	assert.Equal(t, len(calls[len(calls)-1].Extensions), 0, "expected content mapper extensions to be unregistered")

	session.DidCloseFile(ctx, boxURI)
	_, err = session.GetLanguageService(ctx, boxURI)
	assert.ErrorContains(t, err, "no project found")
}

func TestContentMapperProcessSharedAcrossProjects(t *testing.T) {
	t.Parallel()
	config := func(extension string) string {
		return fmt.Sprintf(`{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler" },
			"contentMappers": [ { "package": "mapper", "extensions": [%q] } ]
		}`, extension)
	}
	files := map[string]any{
		"/home/a/tsconfig.json":                    config(".box"),
		"/home/a/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.TransformingMapper),
		"/home/a/app.box":                          "export const a = 1;\n",
		"/home/b/tsconfig.json":                    config(".panel"),
		"/home/b/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.TransformingMapper),
		"/home/b/app.panel":                        "export const b = 1;\n",
	}
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
	init.Spawner = spawner
	session := project.NewSession(init)
	defer session.Close()

	ctx := context.Background()
	aURI := lsproto.DocumentUri("file:///home/a/app.box")
	bURI := lsproto.DocumentUri("file:///home/b/app.panel")
	session.DidOpenFile(ctx, aURI, 1, files["/home/a/app.box"].(string), lsproto.LanguageKind("box"))
	_, err := session.GetLanguageService(ctx, aURI)
	assert.NilError(t, err)
	session.DidOpenFile(ctx, bURI, 1, files["/home/b/app.panel"].(string), lsproto.LanguageKind("panel"))
	_, err = session.GetLanguageService(ctx, bURI)
	assert.NilError(t, err)
	assert.Equal(t, spawner.spawns.Load(), int32(1), "same mapper identity should share one process")

	assert.NilError(t, utils.FS().WriteFile("/home/a/tsconfig.json", `{}`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{Uri: "file:///home/a/tsconfig.json", Type: lsproto.FileChangeTypeChanged}})
	_, err = session.GetLanguageService(ctx, aURI)
	assert.ErrorContains(t, err, "no project found")
	assert.Equal(t, spawner.closes.Load(), int32(0), "second project still owns the shared process")

	assert.NilError(t, utils.FS().WriteFile("/home/b/tsconfig.json", `{}`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{Uri: "file:///home/b/tsconfig.json", Type: lsproto.FileChangeTypeChanged}})
	_, err = session.GetLanguageService(ctx, bURI)
	assert.ErrorContains(t, err, "no project found")
	assert.Equal(t, spawner.closes.Load(), int32(1), "final project owner should close the shared process")
}

func TestContentMapperInferredProjectUsesExtensionContributions(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/home/configured/tsconfig.json": `{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler" },
			"contentMappers": [ { "package": "mapper", "extensions": [".box"] } ]
		}`,
		"/home/configured/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.TransformingMapper),
		"/home/configured/main.ts":                          "export const main = true;\n",
		"/home/loose/app.box":                               "export const version = #{target};\n",
	}
	init, _ := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	init.Spawner = contentmappertest.NewSpawner()
	session := project.NewSession(init)
	defer session.Close()

	ctx := context.Background()
	configuredURI := lsproto.DocumentUri("file:///home/configured/main.ts")
	session.DidOpenFile(ctx, configuredURI, 1, files["/home/configured/main.ts"].(string), lsproto.LanguageKindTypeScript)
	_, err := session.GetLanguageService(ctx, configuredURI)
	assert.NilError(t, err)

	boxURI := lsproto.DocumentUri("file:///home/loose/app.box")
	session.DidOpenFile(ctx, boxURI, 1, files["/home/loose/app.box"].(string), lsproto.LanguageKind("box"))
	_, err = session.GetLanguageService(ctx, boxURI)
	assert.ErrorContains(t, err, "no project found", "configured mapper must not leak into inferred projects")
	session.SetContentMapperContributions(ctx, project.ContentMapperContributions{
		Mappers: []*contentmapper.Mapper{{
			Definition:       contentmapper.Definition{Package: "test.extension", Extensions: []string{".box"}},
			Manifest:         contentmapper.Manifest{Name: "mapper", Version: "1.0.0", Exec: []string{contentmappertest.TransformingMapper}, CompilerOptions: contentmappertest.DeclaredOptions},
			PackageDirectory: "/home",
			ContributionID:   "test.extension[0]",
		}},
		Extensions: []string{".box"},
	}, []lsproto.DocumentUri{boxURI})
	languageService, err := session.GetLanguageService(ctx, boxURI)
	assert.NilError(t, err)
	defaultProject := session.Snapshot().GetDefaultProject(boxURI)
	assert.Assert(t, defaultProject != nil, "expected a default project for the loose app.box")
	assert.Equal(t, defaultProject.Kind, project.KindInferred)
	boxFile := languageService.GetProgram().GetSourceFile("/home/loose/app.box")
	assert.Assert(t, boxFile != nil, "expected loose app.box in the inferred project")
	assert.Assert(t, boxFile.ContentMapper() != "", "expected loose app.box to use the extension contribution")
	assert.Assert(t, !strings.Contains(boxFile.Text(), "#{target}"), "expected loose app.box to be transformed: %q", boxFile.Text())
}

func TestContentMapperInferredProjectSurvivesTypingsInstall(t *testing.T) {
	t.Parallel()
	// A loose content-mapped file lands in the inferred project with an extension content mapper.
	// When ATA finishes installing typings, the inferred program rebuilds with the
	// typings-augmented command line; if that command line drops the content mappers, the
	// otherwise unsupported root file is parsed as plain TypeScript with an unknown script kind and the
	// server panics.
	files := map[string]any{
		"/home/configured/tsconfig.json": `{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler" },
			"contentMappers": [ { "package": "mapper", "extensions": [".box"] } ]
		}`,
		"/home/configured/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.TransformingMapper),
		"/home/configured/main.ts":                          "export const main = true;\n",
		"/home/loose/app.box":                               "export const version = #{target};\n",
		"/home/package.json":                                `{"name":"loose","dependencies":{"jquery":"^3.1.0"}}`,
	}
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		LoggingEnabled:     true,
		RunExternalCode:    true,
	}, &projecttestutil.TypingsInstallerOptions{
		PackageToFile: map[string]string{
			"jquery": `declare const $: { x: number }`,
		},
	})
	init.Spawner = contentmappertest.NewSpawner()
	session := project.NewSession(init)
	defer session.Close()

	ctx := context.Background()
	session.SetContentMapperContributions(ctx, project.ContentMapperContributions{
		Mappers: []*contentmapper.Mapper{{
			Definition:       contentmapper.Definition{Package: "test.extension", Extensions: []string{".box"}},
			Manifest:         contentmapper.Manifest{Name: "mapper", Version: "1.0.0", Exec: []string{contentmappertest.TransformingMapper}, CompilerOptions: contentmappertest.DeclaredOptions},
			PackageDirectory: "/home",
			ContributionID:   "test.extension[0]",
		}},
		Extensions: []string{".box"},
	}, nil)
	configuredURI := lsproto.DocumentUri("file:///home/configured/main.ts")
	session.DidOpenFile(ctx, configuredURI, 1, files["/home/configured/main.ts"].(string), lsproto.LanguageKindTypeScript)
	_, err := session.GetLanguageService(ctx, configuredURI)
	assert.NilError(t, err)

	boxURI := lsproto.DocumentUri("file:///home/loose/app.box")
	session.DidOpenFile(ctx, boxURI, 1, files["/home/loose/app.box"].(string), lsproto.LanguageKind("box"))
	_, err = session.GetLanguageService(ctx, boxURI)
	assert.NilError(t, err)
	assert.Equal(t, session.Snapshot().GetDefaultProject(boxURI).Kind, project.KindInferred)

	// Let ATA install the typings in the background.
	session.WaitForBackgroundTasks()
	assert.Assert(t, len(utils.NpmExecutor().NpmInstallCalls()) > 0, "expected ATA to install typings")

	// Applying the typings change rebuilds the inferred program with the typings-augmented
	// command line. The content mappers must survive that rebuild.
	languageService, err := session.GetLanguageService(ctx, boxURI)
	assert.NilError(t, err)
	boxFile := languageService.GetProgram().GetSourceFile("/home/loose/app.box")
	assert.Assert(t, boxFile != nil, "expected loose app.box in the inferred project after typings install")
	assert.Assert(t, boxFile.ContentMapper() != "", "expected loose app.box to keep its content mapper after typings install")
	assert.Assert(t, !strings.Contains(boxFile.Text(), "#{target}"), "expected loose app.box to be transformed after typings install: %q", boxFile.Text())
	var typingsFile *ast.SourceFile
	for _, file := range languageService.GetProgram().SourceFiles() {
		if strings.HasSuffix(file.FileName(), "@types/jquery/index.d.ts") {
			typingsFile = file
			break
		}
	}
	assert.Assert(t, typingsFile != nil, "expected installed typings in the inferred program (the typings-augmented rebuild did not happen)")
}

func TestContentMapperCreatedFileAdoptedByConfiguredProject(t *testing.T) {
	t.Parallel()
	// A content-mapped file created while the server is running must be adopted by the
	// configured project: the created-file root matching has to account for the content
	// mapper extensions, otherwise the file falls into the inferred project until a full
	// project reload.
	files := map[string]any{
		"/home/project/tsconfig.json": `{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler" },
			"contentMappers": [ { "package": "mapper", "extensions": [".box"] } ]
		}`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.TransformingMapper),
		"/home/project/main.ts":                          "export const main = true;\n",
	}
	init, utils := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		TypingsLocation:    projecttestutil.TestTypingsLocation,
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		RunExternalCode:    true,
	}, nil)
	init.Spawner = contentmappertest.NewSpawner()
	session := project.NewSession(init)
	defer session.Close()

	ctx := context.Background()
	mainURI := lsproto.DocumentUri("file:///home/project/main.ts")
	session.DidOpenFile(ctx, mainURI, 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
	_, err := session.GetLanguageService(ctx, mainURI)
	assert.NilError(t, err)

	assert.NilError(t, utils.FS().WriteFile("/home/project/new.box", "export const version = #{target};\n"))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{Uri: "file:///home/project/new.box", Type: lsproto.FileChangeTypeCreated}})
	boxURI := lsproto.DocumentUri("file:///home/project/new.box")
	session.DidOpenFile(ctx, boxURI, 1, "export const version = #{target};\n", lsproto.LanguageKind("box"))
	languageService, err := session.GetLanguageService(ctx, boxURI)
	assert.NilError(t, err)
	defaultProject := session.Snapshot().GetDefaultProject(boxURI)
	assert.Assert(t, defaultProject != nil, "expected a default project for the created new.box")
	assert.Equal(t, defaultProject.Kind, project.KindConfigured)
	boxFile := languageService.GetProgram().GetSourceFile("/home/project/new.box")
	assert.Assert(t, boxFile != nil, "expected new.box in the configured project")
	assert.Assert(t, !strings.Contains(boxFile.Text(), "#{target}"), "expected new.box to be transformed: %q", boxFile.Text())
}

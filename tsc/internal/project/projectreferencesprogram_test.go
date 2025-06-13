package project_test

import (
	"fmt"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestProjectReferencesProgram(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("program for referenced project", func(t *testing.T) {
		t.Parallel()
		files := filesForReferencedProjectProgram(false)
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile("/user/username/projects/myproject/main/main.ts", files["/user/username/projects/myproject/main/main.ts"].(string), core.ScriptKindTS, "/user/username/projects/myproject")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		scriptInfo := service.GetScriptInfo("/user/username/projects/myproject/dependency/fns.ts")
		assert.Assert(t, scriptInfo != nil)
		dtsScriptInfo := service.GetScriptInfo("/user/username/projects/myproject/decls/fns.d.ts")
		assert.Assert(t, dtsScriptInfo == nil)
		file := p.CurrentProgram().GetSourceFileByPath(tspath.Path("/user/username/projects/myproject/dependency/fns.ts"))
		assert.Assert(t, file != nil)
		dtsFile := p.CurrentProgram().GetSourceFileByPath(tspath.Path("/user/username/projects/myproject/decls/fns.d.ts"))
		assert.Assert(t, dtsFile == nil)
	})

	t.Run("program with disableSourceOfProjectReferenceRedirect", func(t *testing.T) {
		t.Parallel()
		files := filesForReferencedProjectProgram(true)
		files["/user/username/projects/myproject/decls/fns.d.ts"] = `
			export declare function fn1(): void;
			export declare function fn2(): void;
			export declare function fn3(): void;
			export declare function fn4(): void;
			export declare function fn5(): void;
		`
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile("/user/username/projects/myproject/main/main.ts", files["/user/username/projects/myproject/main/main.ts"].(string), core.ScriptKindTS, "/user/username/projects/myproject")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		scriptInfo := service.GetScriptInfo("/user/username/projects/myproject/dependency/fns.ts")
		assert.Assert(t, scriptInfo == nil)
		dtsScriptInfo := service.GetScriptInfo("/user/username/projects/myproject/decls/fns.d.ts")
		assert.Assert(t, dtsScriptInfo != nil)
		file := p.CurrentProgram().GetSourceFileByPath(tspath.Path("/user/username/projects/myproject/dependency/fns.ts"))
		assert.Assert(t, file == nil)
		dtsFile := p.CurrentProgram().GetSourceFileByPath(tspath.Path("/user/username/projects/myproject/decls/fns.d.ts"))
		assert.Assert(t, dtsFile != nil)
	})

	t.Run("references through symlink with index and typings", func(t *testing.T) {
		t.Parallel()
		files, aTest, bFoo, bBar := filesForSymlinkReferences(false, "")
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile(aTest, files[aTest].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		fooInfo := service.GetScriptInfo(bFoo)
		assert.Assert(t, fooInfo != nil)
		barInfo := service.GetScriptInfo(bBar)
		assert.Assert(t, barInfo != nil)
		fooFile := p.CurrentProgram().GetSourceFile(bFoo)
		assert.Assert(t, fooFile != nil)
		barFile := p.CurrentProgram().GetSourceFile(bBar)
		assert.Assert(t, barFile != nil)
	})

	t.Run("references through symlink with index and typings with preserveSymlinks", func(t *testing.T) {
		t.Parallel()
		files, aTest, bFoo, bBar := filesForSymlinkReferences(true, "")
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile(aTest, files[aTest].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		fooInfo := service.GetScriptInfo(bFoo)
		assert.Assert(t, fooInfo != nil)
		barInfo := service.GetScriptInfo(bBar)
		assert.Assert(t, barInfo != nil)
		fooFile := p.CurrentProgram().GetSourceFile(bFoo)
		assert.Assert(t, fooFile != nil)
		barFile := p.CurrentProgram().GetSourceFile(bBar)
		assert.Assert(t, barFile != nil)
	})

	t.Run("references through symlink with index and typings scoped package", func(t *testing.T) {
		t.Parallel()
		files, aTest, bFoo, bBar := filesForSymlinkReferences(false, "@issue/")
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile(aTest, files[aTest].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		fooInfo := service.GetScriptInfo(bFoo)
		assert.Assert(t, fooInfo != nil)
		barInfo := service.GetScriptInfo(bBar)
		assert.Assert(t, barInfo != nil)
		fooFile := p.CurrentProgram().GetSourceFile(bFoo)
		assert.Assert(t, fooFile != nil)
		barFile := p.CurrentProgram().GetSourceFile(bBar)
		assert.Assert(t, barFile != nil)
	})

	t.Run("references through symlink with index and typings with scoped package preserveSymlinks", func(t *testing.T) {
		t.Parallel()
		files, aTest, bFoo, bBar := filesForSymlinkReferences(true, "@issue/")
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile(aTest, files[aTest].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		fooInfo := service.GetScriptInfo(bFoo)
		assert.Assert(t, fooInfo != nil)
		barInfo := service.GetScriptInfo(bBar)
		assert.Assert(t, barInfo != nil)
		fooFile := p.CurrentProgram().GetSourceFile(bFoo)
		assert.Assert(t, fooFile != nil)
		barFile := p.CurrentProgram().GetSourceFile(bBar)
		assert.Assert(t, barFile != nil)
	})

	t.Run("references through symlink referencing from subFolder", func(t *testing.T) {
		t.Parallel()
		files, aTest, bFoo, bBar := filesForSymlinkReferencesInSubfolder(false, "")
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile(aTest, files[aTest].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		fooInfo := service.GetScriptInfo(bFoo)
		assert.Assert(t, fooInfo != nil)
		barInfo := service.GetScriptInfo(bBar)
		assert.Assert(t, barInfo != nil)
		fooFile := p.CurrentProgram().GetSourceFile(bFoo)
		assert.Assert(t, fooFile != nil)
		barFile := p.CurrentProgram().GetSourceFile(bBar)
		assert.Assert(t, barFile != nil)
	})

	t.Run("references through symlink referencing from subFolder with preserveSymlinks", func(t *testing.T) {
		t.Parallel()
		files, aTest, bFoo, bBar := filesForSymlinkReferencesInSubfolder(true, "")
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile(aTest, files[aTest].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		fooInfo := service.GetScriptInfo(bFoo)
		assert.Assert(t, fooInfo != nil)
		barInfo := service.GetScriptInfo(bBar)
		assert.Assert(t, barInfo != nil)
		fooFile := p.CurrentProgram().GetSourceFile(bFoo)
		assert.Assert(t, fooFile != nil)
		barFile := p.CurrentProgram().GetSourceFile(bBar)
		assert.Assert(t, barFile != nil)
	})

	t.Run("references through symlink referencing from subFolder scoped package", func(t *testing.T) {
		t.Parallel()
		files, aTest, bFoo, bBar := filesForSymlinkReferencesInSubfolder(false, "@issue/")
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile(aTest, files[aTest].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		fooInfo := service.GetScriptInfo(bFoo)
		assert.Assert(t, fooInfo != nil)
		barInfo := service.GetScriptInfo(bBar)
		assert.Assert(t, barInfo != nil)
		fooFile := p.CurrentProgram().GetSourceFile(bFoo)
		assert.Assert(t, fooFile != nil)
		barFile := p.CurrentProgram().GetSourceFile(bBar)
		assert.Assert(t, barFile != nil)
	})

	t.Run("references through symlink referencing from subFolder with scoped package preserveSymlinks", func(t *testing.T) {
		t.Parallel()
		files, aTest, bFoo, bBar := filesForSymlinkReferencesInSubfolder(true, "@issue/")
		service, _ := projecttestutil.Setup(files, nil)
		assert.Equal(t, len(service.Projects()), 0)
		service.OpenFile(aTest, files[aTest].(string), core.ScriptKindTS, "")
		assert.Equal(t, len(service.Projects()), 1)
		p := service.Projects()[0]
		assert.Equal(t, p.Kind(), project.KindConfigured)
		fooInfo := service.GetScriptInfo(bFoo)
		assert.Assert(t, fooInfo != nil)
		barInfo := service.GetScriptInfo(bBar)
		assert.Assert(t, barInfo != nil)
		fooFile := p.CurrentProgram().GetSourceFile(bFoo)
		assert.Assert(t, fooFile != nil)
		barFile := p.CurrentProgram().GetSourceFile(bBar)
		assert.Assert(t, barFile != nil)
	})

	t.Run("when new file is added to referenced project", func(t *testing.T) {
		t.Parallel()
		files := filesForReferencedProjectProgram(false)
		service, host := projecttestutil.Setup(files, nil)
		service.OpenFile("/user/username/projects/myproject/main/main.ts", files["/user/username/projects/myproject/main/main.ts"].(string), core.ScriptKindTS, "/user/username/projects/myproject")
		assert.Equal(t, len(service.Projects()), 1)
		project := service.Projects()[0]
		programBefore := project.GetProgram()
		err := host.FS().WriteFile("/user/username/projects/myproject/dependency/fns2.ts", `export const x = 2;`, false)
		assert.NilError(t, err)
		assert.NilError(t, service.OnWatchedFilesChanged(t.Context(), []*lsproto.FileEvent{
			{
				Type: lsproto.FileChangeTypeChanged,
				Uri:  "file:///user/username/projects/myproject/dependency/fns2.ts",
			},
		}))
		assert.Check(t, project.GetProgram() != programBefore)
	})
}

func filesForReferencedProjectProgram(disableSourceOfProjectReferenceRedirect bool) map[string]any {
	return map[string]any{
		"/user/username/projects/myproject/main/tsconfig.json": fmt.Sprintf(`{
			"compilerOptions": {
				"composite": true%s
			},
			"references": [{ "path": "../dependency" }]
		}`, core.IfElse(disableSourceOfProjectReferenceRedirect, `, "disableSourceOfProjectReferenceRedirect": true`, "")),
		"/user/username/projects/myproject/main/main.ts": `
			import {
				fn1,
				fn2,
				fn3,
				fn4,
				fn5
			} from '../decls/fns'
			fn1();
			fn2();
			fn3();
			fn4();
			fn5();
		`,
		"/user/username/projects/myproject/dependency/tsconfig.json": `{
			"compilerOptions": {
				"composite": true,
				"declarationDir": "../decls"
			},
		}`,
		"/user/username/projects/myproject/dependency/fns.ts": `
			export function fn1() { }
			export function fn2() { }
			export function fn3() { }
			export function fn4() { }
			export function fn5() { }
		`,
	}
}

func filesForSymlinkReferences(preserveSymlinks bool, scope string) (files map[string]any, aTest string, bFoo string, bBar string) {
	aTest = "/user/username/projects/myproject/packages/A/src/index.ts"
	bFoo = "/user/username/projects/myproject/packages/B/src/index.ts"
	bBar = "/user/username/projects/myproject/packages/B/src/bar.ts"
	files = map[string]any{
		"/user/username/projects/myproject/packages/B/package.json": `{
			"main": "lib/index.js",
			"types": "lib/index.d.ts",
		}`,
		aTest: fmt.Sprintf(`
			import { foo } from '%sb';
			import { bar } from '%sb/lib/bar';
			foo();
			bar();
		`, scope, scope),
		bFoo: `export function foo() { }`,
		bBar: `export function bar() { }`,
		fmt.Sprintf(`/user/username/projects/myproject/node_modules/%sb`, scope): vfstest.Symlink("/user/username/projects/myproject/packages/B"),
	}
	addConfigForPackage(files, "A", preserveSymlinks, []string{"../B"})
	addConfigForPackage(files, "B", preserveSymlinks, nil)
	return files, aTest, bFoo, bBar
}

func filesForSymlinkReferencesInSubfolder(preserveSymlinks bool, scope string) (files map[string]any, aTest string, bFoo string, bBar string) {
	aTest = "/user/username/projects/myproject/packages/A/src/test.ts"
	bFoo = "/user/username/projects/myproject/packages/B/src/foo.ts"
	bBar = "/user/username/projects/myproject/packages/B/src/bar/foo.ts"
	files = map[string]any{
		"/user/username/projects/myproject/packages/B/package.json": `{}`,
		"/user/username/projects/myproject/packages/A/src/test.ts": fmt.Sprintf(`
			import { foo } from '%sb/lib/foo';
			import { bar } from '%sb/lib/bar/foo';
			foo();
			bar();
		`, scope, scope),
		bFoo: `export function foo() { }`,
		bBar: `export function bar() { }`,
		fmt.Sprintf(`/user/username/projects/myproject/node_modules/%sb`, scope): vfstest.Symlink("/user/username/projects/myproject/packages/B"),
	}
	addConfigForPackage(files, "A", preserveSymlinks, []string{"../B"})
	addConfigForPackage(files, "B", preserveSymlinks, nil)
	return files, aTest, bFoo, bBar
}

func addConfigForPackage(files map[string]any, packageName string, preserveSymlinks bool, references []string) {
	compilerOptions := map[string]any{
		"outDir":    "lib",
		"rootDir":   "src",
		"composite": true,
	}
	if preserveSymlinks {
		compilerOptions["preserveSymlinks"] = true
	}
	var referencesToAdd []map[string]any
	for _, ref := range references {
		referencesToAdd = append(referencesToAdd, map[string]any{
			"path": ref,
		})
	}
	files[fmt.Sprintf("/user/username/projects/myproject/packages/%s/tsconfig.json", packageName)] = core.Must(core.StringifyJson(map[string]any{
		"compilerOptions": compilerOptions,
		"include":         []string{"src"},
		"references":      referencesToAdd,
	}, "    ", "  "))
}

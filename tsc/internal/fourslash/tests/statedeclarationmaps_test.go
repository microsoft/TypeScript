package fourslash_test

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDeclarationMapsOpeningOriginalLocationProject(t *testing.T) {
	t.Parallel()
	for _, disableSourceOfProjectReferenceRedirect := range []bool{false, true} {
		t.Run("TestDeclarationMapsOpeningOriginalLocationProject"+core.IfElse(disableSourceOfProjectReferenceRedirect, "DisableSourceOfProjectReferenceRedirect", ""), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := fmt.Sprintf(`
// @stateBaseline: true
// @Filename: a/a.ts
export class A { }
// @Filename: a/tsconfig.json
{}
// @Filename: a/a.d.ts
export declare class A {
}
//# sourceMappingURL=a.d.ts.map
// @Filename: a/a.d.ts.map
{
	"version": 3,
	"file": "a.d.ts",
	"sourceRoot": "",
	"sources": ["./a.ts"],
	"names": [],
	"mappings": "AAAA,qBAAa,CAAC;CAAI"
}
// @Filename: b/b.ts
import {A} from "../a/a";
new /*1*/A();
// @Filename: b/tsconfig.json
{
	"compilerOptions": {
		"disableSourceOfProjectReferenceRedirect": %t
	},
	"references": [
		{ "path": "../a" }
	]
}`, disableSourceOfProjectReferenceRedirect)
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.VerifyBaselineFindAllReferences(t, "1")
		})
	}
}

func TestDeclarationMapTestCasesForMaps(t *testing.T) {
	t.Parallel()
	type testCase struct {
		name       string
		goToMarker string
		opMarker   string
	}
	tests := []testCase{
		{"FindAllRefs", "userFnA", "userFnA"},
		{"FindAllRefsStartingAtDefinition", "userFnA", "fnADef"},
		{"FindAllRefsTargetDoesNotExist", "userFnB", "userFnB"},
		{"Rename", "userFnA", "userFnA"},
		{"RenameStartingAtDefinition", "userFnA", "fnADef"},
		{"RenameTargetDoesNotExist", "userFnB", "userFnB"},
	}
	for _, tc := range tests {
		t.Run("TestDeclarationMaps"+tc.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := `
// @stateBaseline: true
// @Filename: a/a.ts
export function /*fnADef*/fnA() {}
export interface IfaceA {}
export const instanceA: IfaceA = {};
// @Filename: a/tsconfig.json
{
	"compilerOptions": {
		"outDir": "bin",
		"declarationMap": true,
		"composite": true
	}
}
// @Filename: a/bin/a.d.ts.map
{
	"version": 3,
	"file": "a.d.ts",
	"sourceRoot": "",
	"sources": ["../a.ts"],
	"names": [],
	"mappings": "AAAA,wBAAgB,GAAG,SAAK;AACxB,MAAM,WAAW,MAAM;CAAG;AAC1B,eAAO,MAAM,SAAS,EAAE,MAAW,CAAC"
}
// @Filename: a/bin/a.d.ts
export declare function fnA(): void;
export interface IfaceA {
}
export declare const instanceA: IfaceA;
//# sourceMappingURL=a.d.ts.map
// @Filename: b/tsconfig.json
{
	"compilerOptions": {
		"outDir": "bin",
		"declarationMap": true,
		"composite": true
	}
}
// @Filename: b/bin/b.d.ts.map
{
	"version": 3,
	"file": "b.d.ts",
	"sourceRoot": "",
	"sources": ["../b.ts"],
	"names": [],
	"mappings": "AAAA,wBAAgB,GAAG,SAAK"
}
// @Filename: b/bin/b.d.ts
export declare function fnB(): void;
//# sourceMappingURL=b.d.ts.map
// @Filename: user/user.ts
import * as a from "../a/bin/a";
import * as b from "../b/bin/b";
export function fnUser() { a./*userFnA*/fnA(); b./*userFnB*/fnB(); a.instanceA; }
// @Filename: dummy/dummy.ts
/*dummy*/export const a = 10;
// @Filename: dummy/tsconfig.json
{}`
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.GoToMarker(t, tc.goToMarker)
			// Ref projects are loaded after as part of this command
			if strings.HasPrefix(tc.name, "Rename") {
				f.VerifyBaselineRename(t, nil /*preferences*/, tc.opMarker)
			} else {
				f.VerifyBaselineFindAllReferences(t, tc.opMarker)
			}
			// Open temp file and verify all projects alive
			f.CloseFileOfMarker(t, tc.goToMarker)
			f.GoToMarker(t, "dummy")
		})
	}
}

func TestDeclarationMapsWorkspaceSymbols(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `// @stateBaseline: true
// @Filename: a/a.ts
export function fnA() {}
export interface IfaceA {}
export const instanceA: IfaceA = {};
// @Filename: a/tsconfig.json
{
	"compilerOptions": {
		"outDir": "bin",
		"declarationMap": true,
		"composite": true
	}
}
// @Filename: a/bin/a.d.ts.map
{
	"version": 3,
	"file": "a.d.ts",
	"sourceRoot": "",
	"sources": ["../a.ts"],
	"names": [],
	"mappings": "AAAA,wBAAgB,GAAG,SAAK;AACxB,MAAM,WAAW,MAAM;CAAG;AAC1B,eAAO,MAAM,SAAS,EAAE,MAAW,CAAC"
}
// @Filename: a/bin/a.d.ts
export declare function fnA(): void;
export interface IfaceA {
}
export declare const instanceA: IfaceA;
//# sourceMappingURL=a.d.ts.map
// @Filename: b/b.ts
export function fnB() {}
// @Filename: b/c.ts
export function fnC() {}
// @Filename: b/tsconfig.json
{
	"compilerOptions": {
		"outDir": "bin",
		"declarationMap": true,
		"composite": true
	}
}
// @Filename: b/bin/b.d.ts.map
{
	"version": 3,
	"file": "b.d.ts",
	"sourceRoot": "",
	"sources": ["../b.ts"],
	"names": [],
	"mappings": "AAAA,wBAAgB,GAAG,SAAK"
}
// @Filename: b/bin/b.d.ts
export declare function fnB(): void;
//# sourceMappingURL=b.d.ts.map
// @Filename: user/user.ts
/*user*/import * as a from "../a/a";
import * as b from "../b/b";
export function fnUser() {
	a.fnA();
	b.fnB();
	a.instanceA;
}
// @Filename: user/tsconfig.json
{
	"references": [
		{ "path": "../a" },
		{ "path": "../b" }
	]
}
// @Filename: dummy/dummy.ts
/*dummy*/export const a = 10;
// @Filename: dummy/tsconfig.json
{}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "user")
	// Ref projects are loaded after as part of this command
	f.VerifyBaselineWorkspaceSymbol(t, "fn")
	// Open temp file and verify all projects alive
	f.CloseFileOfMarker(t, "user")
	f.GoToMarker(t, "dummy")
}

func TestDeclarationMapsFindAllRefsDefinitionInMappedFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true 
//@Filename: a/a.ts
export function f() {}
// @Filename: a/tsconfig.json
{
	"compilerOptions": {
		"outDir": "../bin",
		"declarationMap": true,
		"composite": true
	}
}
//@Filename: b/b.ts
import { f } from "../bin/a";
/*1*/f();
// @Filename: b/tsconfig.json
{
	"references": [
		{ "path": "../a" }
	]
}
// @Filename: bin/a.d.ts
export declare function f(): void;
//# sourceMappingURL=a.d.ts.map
// @Filename: bin/a.d.ts.map
{
	"version":3,
	"file":"a.d.ts",
	"sourceRoot":"",
	"sources":["a.ts"],
	"names":[],
	"mappings":"AAAA,wBAAgB,CAAC,SAAK"
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1")
}

func TestDeclarationMapsRename(t *testing.T) {
	t.Parallel()
	type testCase struct {
		name                                    string
		dontBuild                               bool
		mainWithNoRef                           bool
		disableSourceOfProjectReferenceRedirect bool
		tsconfigNotSolution                     bool
	}
	for _, tc := range []testCase{
		{name: "ProjectReferences", dontBuild: true},
		{name: "DisableSourceOfProjectReferenceRedirect", disableSourceOfProjectReferenceRedirect: true},
		{name: "SourceMaps", mainWithNoRef: true},
		{name: "SourceMapsNotSolution", mainWithNoRef: true, tsconfigNotSolution: true},
	} {
		buildStr := core.IfElse(!tc.dontBuild, "// @tsc: --build /myproject/dependency,--build /myproject/main", "")
		mainRefsStr := core.IfElse(!tc.mainWithNoRef, `"references": [{ "path": "../dependency" }]`, "")
		filesStr := core.IfElse(!tc.tsconfigNotSolution, `"files": [],`, "")
		content := fmt.Sprintf(`
// @stateBaseline: true 
%s
//@Filename: myproject/dependency/FnS.ts
/*firstLine*/export function fn1() { }
export function fn2() { }
export function /*rename*/fn3() { }
export function fn4() { }
export function fn5() { }
/*lastLine*/
// @Filename: myproject/dependency/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
		"declarationMap": true,
		"declarationDir": "../decls"
	}
}
//@Filename: myproject/main/main.ts
import {
	fn1,
	fn2,
	fn3,
	fn4,
	fn5
} from "../decls/FnS";

fn1();
fn2();
fn3();
fn4();
fn5();
// @Filename: myproject/main/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
		"declarationMap": true,
		"disableSourceOfProjectReferenceRedirect": %t
	},
	%s
}
// @Filename: myproject/tsconfig.json
{
	"compilerOptions": {
		"disableSourceOfProjectReferenceRedirect": %t
	},
	%s
	"references": [
		{ "path": "dependency" },
		{ "path": "main" }
	]
}
// @Filename: random/random.ts
/*dummy*/export const a = 10;
// @Filename: random/tsconfig.json
{}`, buildStr, tc.disableSourceOfProjectReferenceRedirect, mainRefsStr, tc.disableSourceOfProjectReferenceRedirect, filesStr)
		t.Run("TestDeclarationMapsRenameWith"+tc.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.GoToMarker(t, "dummy")
			// Ref projects are loaded after as part of this command
			f.VerifyBaselineRename(t, nil /*preferences*/, "rename")
			// Collecting at this point retains dependency.d.ts and map
			f.CloseFileOfMarker(t, "dummy")
			f.GoToMarker(t, "dummy")
			// Closing open file, removes dependencies too
			f.CloseFileOfMarker(t, "rename")
			f.CloseFileOfMarker(t, "dummy")
			f.GoToMarker(t, "dummy")
		})
		t.Run("TestDeclarationMapsRenameWith"+tc.name+"Edit", func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			// Ref projects are loaded after as part of this command
			f.VerifyBaselineRename(t, nil /*preferences*/, "rename")
			f.GoToMarker(t, "firstLine")
			f.Insert(t, "function fooBar() { }\n")
			f.VerifyBaselineRename(t, nil /*preferences*/, "rename")
		})
		t.Run("TestDeclarationMapsRenameWith"+tc.name+"EditEnd", func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			// Ref projects are loaded after as part of this command
			f.VerifyBaselineRename(t, nil /*preferences*/, "rename")
			f.GoToMarker(t, "lastLine")
			f.Insert(t, "const x = 10;")
			f.VerifyBaselineRename(t, nil /*preferences*/, "rename")
		})
	}
}

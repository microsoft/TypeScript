package fourslash_test

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/stringtestutil"
)

func TestFindAllRefsSolutionReferencingDefaultProjectDirectly(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true 
// @tsc: --build /myproject/tsconfig.json
// @Filename: dummy/dummy.ts
/*dummy*/const x = 1;
// @Filename: dummy/tsconfig.json
{ }
// @Filename: myproject/tsconfig.json
{
	"files": [],
	"references": [{ "path": "./tsconfig-src.json" }]
}
// @Filename: myproject/tsconfig-src.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target",
		"declarationMap": true,
	},
	"include": ["./src/\**/*"]
}
// @Filename: myproject/src/main.ts
import { foo } from './helpers/functions';
export { /*mainFoo*/foo };
// @Filename: myproject/src/helpers/functions.ts
export function foo() { return 1; }
// @Filename: myproject/indirect3/tsconfig.json
{ }
// @Filename: myproject/indirect3/main.ts
import { /*fooIndirect3Import*/foo } from '../target/src/main';
foo()
export function bar() {}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Ensure configured project is found for open file
	f.GoToMarker(t, "mainFoo")
	// !!! TODO Verify errors
	f.GoToMarker(t, "dummy")

	// Projects lifetime
	f.CloseFileOfMarker(t, "dummy")
	f.CloseFileOfMarker(t, "mainFoo")
	f.GoToMarker(t, "dummy")

	f.CloseFileOfMarker(t, "dummy")

	// Find all refs in default project
	f.VerifyBaselineFindAllReferences(t, "mainFoo")

	f.CloseFileOfMarker(t, "mainFoo")

	// Find all ref in non default project
	f.VerifyBaselineFindAllReferences(t, "fooIndirect3Import")
}

func TestFindAllRefsSolutionReferencingDefaultProjectIndirectly(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true 
// @tsc: --build /myproject/tsconfig.json
// @Filename: dummy/dummy.ts
/*dummy*/const x = 1;
// @Filename: dummy/tsconfig.json
{ }
// @Filename: myproject/tsconfig.json
{
	"files": [],
	"references":  [
		{ "path": "./tsconfig-indirect1.json" },
		{ "path": "./tsconfig-indirect2.json" },
	]
}
// @Filename: myproject/tsconfig-src.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target",
		"declarationMap": true,
	},
	"include": ["./src/\**/*"]
}
// @Filename: myproject/src/main.ts
import { foo } from './helpers/functions';
export { /*mainFoo*/foo };
// @Filename: myproject/src/helpers/functions.ts
export function foo() { return 1; }
// @Filename: myproject/indirect3/tsconfig.json
{ }
// @Filename: myproject/indirect3/main.ts
import { /*fooIndirect3Import*/foo } from '../target/src/main';
foo()
export function bar() {}
// @FileName: myproject/indirect1/main.ts
export const indirect = 1;
// @Filename: myproject/tsconfig-indirect1.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target/",
	},
	"files": [
		"./indirect1/main.ts"
	],
	"references": [
		{
			"path": "./tsconfig-src.json"
		}
	]
}
// @FileName: myproject/indirect2/main.ts
export const indirect = 1;
// @Filename: myproject/tsconfig-indirect2.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target/",
	},
	"files": [
		"./indirect2/main.ts"
	],
	"references": [
		{
			"path": "./tsconfig-src.json"
		}
	]
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Ensure configured project is found for open file
	f.GoToMarker(t, "mainFoo")
	// !!! TODO Verify errors
	f.GoToMarker(t, "dummy")

	// Projects lifetime
	f.CloseFileOfMarker(t, "dummy")
	f.CloseFileOfMarker(t, "mainFoo")
	f.GoToMarker(t, "dummy")

	f.CloseFileOfMarker(t, "dummy")

	// Find all refs in default project
	f.VerifyBaselineFindAllReferences(t, "mainFoo")

	f.CloseFileOfMarker(t, "mainFoo")

	// Find all ref in non default project
	f.VerifyBaselineFindAllReferences(t, "fooIndirect3Import")
}

func TestFindAllRefsSolutionWithDisableReferencedProjectLoadReferencingDefaultProjectDirectly(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true 
// @tsc: --build /myproject/tsconfig.json
// @Filename: dummy/dummy.ts
/*dummy*/const x = 1;
// @Filename: dummy/tsconfig.json
{ }
// @Filename: myproject/tsconfig.json
{
	"compilerOptions": {
		"disableReferencedProjectLoad": true
	},
	"files": [],
	"references": [{ "path": "./tsconfig-src.json" }]
}
// @Filename: myproject/tsconfig-src.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target",
		"declarationMap": true,
	},
	"include": ["./src/\**/*"]
}
// @Filename: myproject/src/main.ts
import { foo } from './helpers/functions';
export { /*mainFoo*/foo };
// @Filename: myproject/src/helpers/functions.ts
export function foo() { return 1; }
// @Filename: myproject/indirect3/tsconfig.json
{ }
// @Filename: myproject/indirect3/main.ts
import { /*fooIndirect3Import*/foo } from '../target/src/main';
foo()
export function bar() {}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Ensure configured project is found for open file
	f.GoToMarker(t, "mainFoo")
	// !!! TODO Verify errors
	f.GoToMarker(t, "dummy")

	// Projects lifetime
	f.CloseFileOfMarker(t, "dummy")
	f.CloseFileOfMarker(t, "mainFoo")
	f.GoToMarker(t, "dummy")

	f.CloseFileOfMarker(t, "dummy")

	// Find all refs in default project
	f.VerifyBaselineFindAllReferences(t, "mainFoo")

	f.CloseFileOfMarker(t, "mainFoo")

	// Find all ref in non default project
	f.VerifyBaselineFindAllReferences(t, "fooIndirect3Import")
}

func TestFindAllRefsSolutionReferencingDefaultProjectIndirectlyThroughDisableReferencedProjectLoad(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true 
// @tsc: --build /myproject/tsconfig.json
// @Filename: dummy/dummy.ts
/*dummy*/const x = 1;
// @Filename: dummy/tsconfig.json
{ }
// @Filename: myproject/tsconfig.json
{
	"files": [],
	"references":  [
		{ "path": "./tsconfig-indirect1.json" },
		{ "path": "./tsconfig-indirect2.json" },
	]
}
// @Filename: myproject/tsconfig-src.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target",
		"declarationMap": true,
	},
	"include": ["./src/\**/*"]
}
// @Filename: myproject/src/main.ts
import { foo } from './helpers/functions';
export { /*mainFoo*/foo };
// @Filename: myproject/src/helpers/functions.ts
export function foo() { return 1; }
// @Filename: myproject/indirect3/tsconfig.json
{ }
// @Filename: myproject/indirect3/main.ts
import { /*fooIndirect3Import*/foo } from '../target/src/main';
foo()
export function bar() {}
// @FileName: myproject/indirect1/main.ts
export const indirect = 1;
// @Filename: myproject/tsconfig-indirect1.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target/",
		"disableReferencedProjectLoad": true,
	},
	"files": [
		"./indirect1/main.ts"
	],
	"references": [
		{
			"path": "./tsconfig-src.json"
		}
	]
}
// @FileName: myproject/indirect2/main.ts
export const indirect = 1;
// @Filename: myproject/tsconfig-indirect2.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target/",
		"disableReferencedProjectLoad": true,
	},
	"files": [
		"./indirect2/main.ts"
	],
	"references": [
		{
			"path": "./tsconfig-src.json"
		}
	]
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Ensure configured project is found for open file
	f.GoToMarker(t, "mainFoo")
	// !!! TODO Verify errors
	f.GoToMarker(t, "dummy")

	// Projects lifetime
	f.CloseFileOfMarker(t, "dummy")
	f.CloseFileOfMarker(t, "mainFoo")
	f.GoToMarker(t, "dummy")

	f.CloseFileOfMarker(t, "dummy")

	// Find all refs in default project
	f.VerifyBaselineFindAllReferences(t, "mainFoo")

	f.CloseFileOfMarker(t, "mainFoo")

	// Find all ref in non default project
	f.VerifyBaselineFindAllReferences(t, "fooIndirect3Import")
}

func TestFindAllRefsSolutionReferencingDefaultProjectIndirectlyThroughDisableReferencedProjectLoadInOneButWithoutItInAnother(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true 
// @tsc: --build /myproject/tsconfig.json
// @Filename: dummy/dummy.ts
/*dummy*/const x = 1;
// @Filename: dummy/tsconfig.json
{ }
// @Filename: myproject/tsconfig.json
{
	"files": [],
	"references":  [
		{ "path": "./tsconfig-indirect1.json" },
		{ "path": "./tsconfig-indirect2.json" },
	]
}
// @Filename: myproject/tsconfig-src.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target",
		"declarationMap": true,
	},
	"include": ["./src/\**/*"]
}
// @Filename: myproject/src/main.ts
import { foo } from './helpers/functions';
export { /*mainFoo*/foo };
// @Filename: myproject/src/helpers/functions.ts
export function foo() { return 1; }
// @Filename: myproject/indirect3/tsconfig.json
{ }
// @Filename: myproject/indirect3/main.ts
import { /*fooIndirect3Import*/foo } from '../target/src/main';
foo()
export function bar() {}
// @FileName: myproject/indirect1/main.ts
export const indirect = 1;
// @Filename: myproject/tsconfig-indirect1.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target/",
		"disableReferencedProjectLoad": true,
	},
	"files": [
		"./indirect1/main.ts"
	],
	"references": [
		{
			"path": "./tsconfig-src.json"
		}
	]
}
// @FileName: myproject/indirect2/main.ts
export const indirect = 1;
// @Filename: myproject/tsconfig-indirect2.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target/",
	},
	"files": [
		"./indirect2/main.ts"
	],
	"references": [
		{
			"path": "./tsconfig-src.json"
		}
	]
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Ensure configured project is found for open file
	f.GoToMarker(t, "mainFoo")
	// !!! TODO Verify errors
	f.GoToMarker(t, "dummy")

	// Projects lifetime
	f.CloseFileOfMarker(t, "dummy")
	f.CloseFileOfMarker(t, "mainFoo")
	f.GoToMarker(t, "dummy")

	f.CloseFileOfMarker(t, "dummy")

	// Find all refs in default project
	f.VerifyBaselineFindAllReferences(t, "mainFoo")

	f.CloseFileOfMarker(t, "mainFoo")

	// Find all ref in non default project
	f.VerifyBaselineFindAllReferences(t, "fooIndirect3Import")
}

func TestFindAllRefsProjectWithOwnFilesReferencingFileFromReferencedProject(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true 
// @tsc: --build /myproject/tsconfig.json
// @Filename: dummy/dummy.ts
/*dummy*/const x = 1;
// @Filename: dummy/tsconfig.json
{ }
// @Filename: myproject/tsconfig.json
{
	"files": ["./own/main.ts"],
	"references": [{ "path": "./tsconfig-src.json" }]
}
// @Filename: myproject/own/main.ts
import { foo } from '../target/src/main';
foo();
export function bar() {}
// @Filename: myproject/tsconfig-src.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "./target",
		"declarationMap": true,
	},
	"include": ["./src/\**/*"]
}
// @Filename: myproject/src/main.ts
import { foo } from './helpers/functions';
export { /*mainFoo*/foo };
// @Filename: myproject/src/helpers/functions.ts
export function foo() { return 1; }
// @Filename: myproject/indirect3/tsconfig.json
{ }
// @Filename: myproject/indirect3/main.ts
import { /*fooIndirect3Import*/foo } from '../target/src/main';
foo()
export function bar() {}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Ensure configured project is found for open file
	f.GoToMarker(t, "mainFoo")
	// !!! TODO Verify errors
	f.GoToMarker(t, "dummy")

	// Projects lifetime
	f.CloseFileOfMarker(t, "dummy")
	f.CloseFileOfMarker(t, "mainFoo")
	f.GoToMarker(t, "dummy")

	f.CloseFileOfMarker(t, "dummy")

	// Find all refs in default project
	f.VerifyBaselineFindAllReferences(t, "mainFoo")

	f.CloseFileOfMarker(t, "mainFoo")

	// Find all ref in non default project
	f.VerifyBaselineFindAllReferences(t, "fooIndirect3Import")
}

func TestFindAllRefsRootOfReferencedProject(t *testing.T) {
	t.Parallel()
	for _, disableSourceOfProjectReferenceRedirect := range []bool{false, true} {
		t.Run("TestFindAllRefsRootOfReferencedProject"+core.IfElse(disableSourceOfProjectReferenceRedirect, "DeclarationMaps", ""), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := fmt.Sprintf(`
// @stateBaseline: true
%s
// @Filename: src/common/input/keyboard.ts
function bar() { return "just a random function so .d.ts location doesnt match"; }
export function /*keyboard*/evaluateKeyboardEvent() { }
// @Filename: src/common/input/keyboard.test.ts
import { evaluateKeyboardEvent } from 'common/input/keyboard';
function testEvaluateKeyboardEvent() {
	return evaluateKeyboardEvent();
}
// @Filename: src/terminal.ts
/*terminal*/import { evaluateKeyboardEvent } from 'common/input/keyboard';
function foo() {
	return evaluateKeyboardEvent();
}
// @Filename: /src/common/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
		"declarationMap": true,
		"outDir": "../../out",
		"disableSourceOfProjectReferenceRedirect": %v,
		"paths": {
			"*": ["../*"],
		},
	},
	"include": ["./\**/*"]
}
// @Filename: src/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
		"declarationMap": true,
		"outDir": "../out",
		"disableSourceOfProjectReferenceRedirect": %v,
		"paths": {
			"common/*": ["./common/*"],
		},
		"tsBuildInfoFile": "../out/src.tsconfig.tsbuildinfo"
	},
	"include": ["./\**/*"],
	"references": [
		{ "path": "./common" },
	],
}`, core.IfElse(disableSourceOfProjectReferenceRedirect, "// @tsc: --build /src/tsconfig.json", ""), disableSourceOfProjectReferenceRedirect, disableSourceOfProjectReferenceRedirect)
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.GoToMarker(t, "keyboard")
			f.GoToMarker(t, "terminal")
			// Find all ref in default project
			f.VerifyBaselineFindAllReferences(t, "keyboard")
		})
	}
}

func TestFindAllRefsAncestorSiblingProjectsLoading(t *testing.T) {
	t.Parallel()
	for _, disableSolutionSearching := range []bool{false, true} {
		t.Run("TestFindAllRefsAncestorSiblingProjectsLoading"+core.IfElse(disableSolutionSearching, "DisableSolutionSearching", ""), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := fmt.Sprintf(`
// @stateBaseline: true
// @Filename: solution/tsconfig.json
{
	"files": [],
	"include": [],
	"references": [
		{ "path": "./compiler" },
		{ "path": "./services" },
	],
}
// @Filename: solution/compiler/tsconfig.json
{
	"compilerOptions": { 
		"composite": true,
		"disableSolutionSearching": %t,
	},
	"files": ["./types.ts", "./program.ts"]
}
// @Filename: solution/compiler/types.ts
namespace ts {
	export interface Program {
		getSourceFiles(): string[];
	}
}
// @Filename: solution/compiler/program.ts
namespace ts {
	export const program: Program = {
		/*notLocal*/getSourceFiles: () => [/*local*/getSourceFile()]
	};
	function getSourceFile() { return "something"; }
}
// @Filename: solution/services/tsconfig.json
{
	"compilerOptions": {
		"composite": true
	},
	"files": ["./services.ts"],
	"references": [
		{ "path": "../compiler" },
	],
}
// @Filename: solution/services/services.ts
/// <reference path="../compiler/types.ts" />
/// <reference path="../compiler/program.ts" />
namespace ts {
	const result = program.getSourceFiles();
}`, disableSolutionSearching)
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			// Find all references for getSourceFile
			// Shouldnt load more projects
			f.VerifyBaselineFindAllReferences(t, "local")

			// Find all references for getSourceFiles
			// Should load more projects only if disableSolutionSearching is not set to true
			f.VerifyBaselineFindAllReferences(t, "notLocal")
		})
	}
}

func TestFindAllRefsOverlappingProjects(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true 
// @Filename: solution/tsconfig.json
{
	"files": [],
	"include": [],
	"references": [
		{ "path": "./a" },
		{ "path": "./b" },
		{ "path": "./c" },
		{ "path": "./d" },
	],
}
// @Filename: solution/a/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"files": ["./index.ts"]
}
// @Filename: solution/a/index.ts
export interface I {
	M(): void;
}
// @Filename: solution/b/tsconfig.json
{
	"compilerOptions": {
		"composite": true
	},
	"files": ["./index.ts"],
	"references": [
		{ "path": "../a" },
	],
}
// @Filename: solution/b/index.ts
import { I } from "../a";
export class B implements /**/I {
	M() {}
}
// @Filename: solution/c/tsconfig.json
{
	"compilerOptions": {
		"composite": true
	},
	"files": ["./index.ts"],
	"references": [
		{ "path": "../b" },
	],
}
// @Filename: solution/c/index.ts
import { I } from "../a";
import { B } from "../b";
export const C: I = new B();
// @Filename: solution/d/tsconfig.json
{
	"compilerOptions": {
		"composite": true
	},
	"files": ["./index.ts"],
	"references": [
		{ "path": "../c" },
	],
}
// @Filename: solution/d/index.ts
import { I } from "../a";
import { C } from "../c";
export const D: I = C;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// The first search will trigger project loads
	f.VerifyBaselineFindAllReferences(t, "")

	// The second search starts with the projects already loaded
	// Formerly, this would search some projects multiple times
	f.VerifyBaselineFindAllReferences(t, "")
}

func TestFindAllRefsTwoProjectsOpenAndOneProjectReferences(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true
// @Filename: /myproject/main/src/file1.ts
/*main*/export const mainConst = 10;
// @Filename: /myproject/main/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"references": [
		{ "path": "../core" },
		{ "path": "../indirect" },
		{ "path": "../noCoreRef1" },
		{ "path": "../indirectDisabledChildLoad1" },
		{ "path": "../indirectDisabledChildLoad2" },
		{ "path": "../refToCoreRef3" },
		{ "path": "../indirectNoCoreRef" }
	]
}
// @Filename: /myproject/core/src/file1.ts
export const /*find*/coreConst = 10;
// @Filename: /myproject/core/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
}
// @Filename: /myproject/noCoreRef1/src/file1.ts
export const noCoreRef1Const = 10;
// @Filename: /myproject/noCoreRef1/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
}
// @Filename: /myproject/indirect/src/file1.ts
export const indirectConst = 10;
// @Filename: /myproject/indirect/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"references": [
		{ "path": "../coreRef1" },
	]
}
// @Filename: /myproject/coreRef1/src/file1.ts
export const coreRef1Const = 10;
// @Filename: /myproject/coreRef1/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"references": [
		{ "path": "../core" },
	]
}
// @Filename: /myproject/indirectDisabledChildLoad1/src/file1.ts
export const indirectDisabledChildLoad1Const = 10;
// @Filename: /myproject/indirectDisabledChildLoad1/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
		"disableReferencedProjectLoad": true,
	},
	"references": [
		{ "path": "../coreRef2" },
	]
}
// @Filename: /myproject/coreRef2/src/file1.ts
export const coreRef2Const = 10;
// @Filename: /myproject/coreRef2/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"references": [
		{ "path": "../core" },
	]
}
// @Filename: /myproject/indirectDisabledChildLoad2/src/file1.ts
export const indirectDisabledChildLoad2Const = 10;
// @Filename: /myproject/indirectDisabledChildLoad2/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
		"disableReferencedProjectLoad": true,
	},
	"references": [
		{ "path": "../coreRef3" },
	]
}
// @Filename: /myproject/coreRef3/src/file1.ts
export const coreRef3Const = 10;
// @Filename: /myproject/coreRef3/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"references": [
		{ "path": "../core" },
	]
}
// @Filename: /myproject/refToCoreRef3/src/file1.ts
export const refToCoreRef3Const = 10;
// @Filename: /myproject/refToCoreRef3/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"references": [
		{ "path": "../coreRef3" },
	]
}
// @Filename: /myproject/indirectNoCoreRef/src/file1.ts
export const indirectNoCoreRefConst = 10;
// @Filename: /myproject/indirectNoCoreRef/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"references": [
		{ "path": "../noCoreRef2" },
	]
}
// @Filename: /myproject/noCoreRef2/src/file1.ts
export const noCoreRef2Const = 10;
// @Filename: /myproject/noCoreRef2/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "main")
	f.VerifyBaselineFindAllReferences(t, "find")
}

func TestFindAllRefsDoesNotTryToSearchProjectAfterItsUpdateDoesNotIncludeTheFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true 
// @Filename: /packages/babel-loader/tsconfig.json
{
	"compilerOptions": {
		"target": "ES2018",
		"module": "commonjs",
		"strict": true,
		"esModuleInterop": true,
		"composite": true,
		"rootDir": "src",
		"outDir": "dist"
	},
	"include": ["src"],
	"references": [{"path": "../core"}]
}
// @Filename: /packages/babel-loader/src/index.ts
/*change*/import type { Foo } from "../../core/src/index.js";
// @Filename: /packages/core/tsconfig.json
{
	"compilerOptions": {
		"target": "ES2018",
		"module": "commonjs",
		"strict": true,
		"esModuleInterop": true,
		"composite": true,
		"rootDir": "./src",
		"outDir": "./dist",
	},
	"include": ["./src"]
}
// @Filename: /packages/core/src/index.ts
import { Bar } from "./loading-indicator.js";
export type Foo = {};
const bar: Bar = {
	/*prop*/prop: 0
}
// @Filename: /packages/core/src/loading-indicator.ts
export interface Bar {
	prop: number;
}
const bar: Bar = {
	prop: 1
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "change")
	f.GoToMarker(t, "prop")

	// Now change `babel-loader` project to no longer import `core` project
	f.GoToMarker(t, "change")
	f.Insert(t, "// comment")

	// At this point, we haven't updated `babel-loader` project yet,
	// so `babel-loader` is still a containing project of `loading-indicator` file.
	// When calling find all references,
	// we shouldn't crash due to using outdated information on a file's containing projects.
	f.VerifyBaselineFindAllReferences(t, "prop")
}

func TestFindAllRefsOpenFileInConfiguredProjectThatWillBeRemoved(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true
// @Filename: /myproject/playground/tsconfig.json
{}
// @Filename: /myproject/playground/tests.ts
/*tests*/export function foo() {}
// @Filename: /myproject/playground/tsconfig-json/tsconfig.json
{
	"include": ["./src"]
}
// @Filename: /myproject/playground/tsconfig-json/src/src.ts
export function foobar() {}
// @Filename: /myproject/playground/tsconfig-json/tests/spec.ts
export function /*find*/bar() { }
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "tests")
	f.CloseFileOfMarker(t, "tests")
	f.VerifyBaselineFindAllReferences(t, "find")
}

func TestFindAllRefsSpecialHandlingOfLocalness(t *testing.T) {
	t.Parallel()
	type testCase struct {
		name          string
		definition    string
		usage         string
		referenceTerm string
	}

	for _, tc := range []testCase{
		{
			"ArrowFunctionAssignment",
			`export const dog = () => { };`,
			`shared.dog();`,
			"dog",
		},
		{
			"ArrowFunctionAsObjectLiteralPropertyTypes",
			`export const foo = { bar: () => { } };`,
			`shared.foo.bar();`,
			"bar",
		},
		{
			"ObjectLiteralProperty",
			`export const foo = {  baz: "BAZ" };`,
			`shared.foo.baz;`,
			"baz",
		},
		{
			"MethodOfClassExpression",
			`export const foo = class { fly() {} };`,
			stringtestutil.Dedent(`
					const instance = new shared.foo();
					instance.fly();`),
			"fly",
		},
		{
			// when using arrow function as object literal property is loaded through indirect assignment with original declaration local to project is treated as local
			"ArrowFunctionAsObjectLiteralProperty",
			stringtestutil.Dedent(`
					const local = { bar: () => { } };
					export const foo = local;`),
			`shared.foo.bar();`,
			"bar",
		},
	} {
		t.Run("TestFindAllRefsSpecialHandlingOfLocalness"+tc.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			usageWithMarker := tc.usage[:strings.Index(tc.usage, tc.referenceTerm)] + "/*ref*/" + tc.usage[strings.Index(tc.usage, tc.referenceTerm):]
			content := `
// @stateBaseline: true
// @Filename: /solution/tsconfig.json
{
	"files": [],
	"references": [
		{ "path": "./api" },
		{ "path": "./app" },
	],
}
// @Filename: /solution/api/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "dist",
		"rootDir": "src"
	},
	"include": ["src"],
	"references": [{ "path": "../shared" }],
}
// @Filename: /solution/api/src/server.ts
import * as shared from "../../shared/dist"
` + usageWithMarker + `
// @Filename: /solution/app/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "dist",
		"rootDir": "src"
	},
	"include": ["src"],
	"references": [{ "path": "../shared" }],
}
// @Filename: /solution/app/src/app.ts
import * as shared from "../../shared/dist"
` + tc.usage + `
// @Filename: /solution/app/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
		"outDir": "dist",
		"rootDir": "src"
	},
	"include": ["src"],
	"references": [{ "path": "../shared" }],
}
// @Filename: /solution/shared/tsconfig.json
{
    "compilerOptions": {
        "composite": true,
        "outDir": "dist",
        "rootDir": "src"
    },
    "include": ["src"],
}
// @Filename: /solution/shared/src/index.ts
` + tc.definition
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.VerifyBaselineFindAllReferences(t, "ref")
		})
	}
}

func TestFindAllRefsReExportInMultiProjectSolution(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true
// @Filename: /tsconfig.base.json
{
	"compilerOptions": {
		"rootDir": ".",
		"outDir": "target",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"composite": true,
		"declaration": true,
		"strict": true
	},
	"include": []
}
// @Filename: /tsconfig.json
{
	"extends": "./tsconfig.base.json",
	"references": [
		{ "path": "project-a" },
		{ "path": "project-b" },
		{ "path": "project-c" },
	]
}
// @Filename: /project-a/tsconfig.json
{
	"extends": "../tsconfig.base.json",
	"include": ["*"]
}
// @Filename: /project-a/private.ts
export const /*symbolA*/symbolA = 'some-symbol';
console.log(symbolA);
// @Filename: /project-a/public.ts
export { symbolA } from './private';
// @Filename: /project-b/tsconfig.json
{
	"extends": "../tsconfig.base.json",
	"include": ["*"]
}
// @Filename: /project-b/public.ts
export const /*symbolB*/symbolB = 'symbol-b';
// @Filename: /project-c/tsconfig.json
{
	"extends": "../tsconfig.base.json",
	"include": ["*"],
	"references": [
		{ "path": "../project-a" },
		{ "path": "../project-b" },
	]
}
// @Filename: /project-c/index.ts
import { symbolB } from '../project-b/public';
import { /*symbolAUsage*/symbolA } from '../project-a/public';
console.log(symbolB);
console.log(symbolA);
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Find all refs for symbolA - should find definition in private.ts, re-export in public.ts, and usage in project-c/index.ts
	f.VerifyBaselineFindAllReferences(t, "symbolA")

	// Find all refs for symbolB - should find definition and usage (no re-export involved)
	f.VerifyBaselineFindAllReferences(t, "symbolB")

	// Find all refs from the usage site - should also work
	f.VerifyBaselineFindAllReferences(t, "symbolAUsage")
}

func TestFindAllRefsDeclarationInOtherProject(t *testing.T) {
	t.Parallel()
	type testCase struct {
		projectAlreadyLoaded                    bool
		disableReferencedProjectLoad            bool
		disableSourceOfProjectReferenceRedirect bool
		dtsMapPresent                           bool
	}
	// Pre-loaded = A file from project B is already open when FindAllRefs is invoked
	// dRPL = Project A has disableReferencedProjectLoad
	// dSOPRR = Project A has disableSourceOfProjectReferenceRedirect
	// Map = The declaration map file b/lib/index.d.ts.map exists
	// B refs = files under directory b in which references are found (all scenarios find all references in a/index.ts)
	//Pre-loaded |dRPL|dSOPRR|Map|     B state      | Notes        | B refs              | Notes
	//-----------+----+------+- -+------------------+--------------+---------------------+---------------------------------------------------
	for _, tc := range []testCase{
		{true, true, true, true},     // Pre-loaded |              | index.ts, helper.ts | Via map and pre-loaded project
		{true, true, true, false},    // Pre-loaded |              | lib/index.d.ts      | Even though project is loaded
		{true, true, false, true},    // Pre-loaded |              | index.ts, helper.ts |
		{true, true, false, false},   // Pre-loaded |              | index.ts, helper.ts |
		{true, false, true, true},    // Pre-loaded |              | index.ts, helper.ts | Via map and pre-loaded project
		{true, false, true, false},   // Pre-loaded |              | lib/index.d.ts      | Even though project is loaded
		{true, false, false, true},   // Pre-loaded |              | index.ts, helper.ts |
		{true, false, false, false},  // Pre-loaded |              | index.ts, helper.ts |
		{false, true, true, true},    // Not loaded |              | lib/index.d.ts      | Even though map is present
		{false, true, true, false},   // Not loaded |              | lib/index.d.ts      |
		{false, true, false, true},   // Not loaded |              | index.ts            | But not helper.ts, which is not referenced from a
		{false, true, false, false},  // Not loaded |              | index.ts            | But not helper.ts, which is not referenced from a
		{false, false, true, true},   // Loaded     | Via map      | index.ts, helper.ts | Via map and newly loaded project
		{false, false, true, false},  // Not loaded |              | lib/index.d.ts      |
		{false, false, false, true},  // Loaded     | Via redirect | index.ts, helper.ts |
		{false, false, false, false}, // Loaded     | Via redirect | index.ts, helper.ts |
	} {
		subScenario := fmt.Sprintf(`Proj%sLoaded`, core.IfElse(tc.projectAlreadyLoaded, "Is", "IsNot")) +
			`RefdProjLoadingIs` + core.IfElse(tc.disableReferencedProjectLoad, "Disabled", "Enabled") +
			`ProjRefRedirectsAre` + core.IfElse(tc.disableSourceOfProjectReferenceRedirect, "Disabled", "Enabled") +
			`DeclMapIs` + core.IfElse(tc.dtsMapPresent, "Present", "Missing")
		t.Run("TestFindAllRefsDeclarationInOtherProject"+subScenario, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := fmt.Sprintf(`
// @stateBaseline: true
// @Filename: /myproject/a/tsconfig.json
{
	"disableReferencedProjectLoad": %t,
	"disableSourceOfProjectReferenceRedirect": %t,
	"composite": true
}
// @Filename: /myproject/a/index.ts
import { B } from "../b/lib";
const b: /*ref*/B = new B();
// @Filename: /myproject/b/tsconfig.json
{
	"declarationMap": true,
	"outDir": "lib",
	"composite": true,
}
// @Filename: /myproject/b/index.ts
export class B {
	M() {}
}
// @Filename: /myproject/b/helper.ts
/*bHelper*/import { B } from ".";
const b: B = new B();
// @Filename: /myproject/b/lib/index.d.ts
export declare class B {
	M(): void;
}
//# sourceMappingURL=index.d.ts.map`, tc.disableReferencedProjectLoad, tc.disableSourceOfProjectReferenceRedirect)
			if tc.dtsMapPresent {
				content += `
// @Filename: /myproject/b/lib/index.d.ts.map
{
	"version": 3,
	"file": "index.d.ts",
	"sourceRoot": "",
	"sources": ["../index.ts"],
	"names": [],
	"mappings": "AAAA,qBAAa,CAAC;IACV,CAAC;CACJ"
}`
			}
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			if tc.projectAlreadyLoaded {
				f.GoToMarker(t, "ref")
				f.GoToMarker(t, "bHelper")
			}
			f.VerifyBaselineFindAllReferences(t, "ref")
		})
	}
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImplementationsAcrossProjects(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true
// @Filename: /projects/temp/temp.ts
/*temp*/let x = 10
// @Filename: /projects/temp/tsconfig.json
{}
// @Filename: /projects/container/lib/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	references: [],
	files: [
		"index.ts",
		"bar.ts"
	],
}
// @Filename: /projects/container/lib/index.ts
export interface /*impl*/Foo {
    func();
}
export const val = 42;
// @Filename: /projects/container/lib/bar.ts
import {Foo} from './index'
class A implements Foo {
    func() {}
}
class B implements Foo {
    func() {}
}
// @Filename: /projects/container/exec/tsconfig.json
{
	"files": ["./index.ts"],
	"references": [
		{ "path": "../lib" },
	],
}
// @Filename: /projects/container/exec/index.ts
import { Foo } from "../lib";
class A1 implements Foo {
    func() {}
}
class B1 implements Foo {
    func() {}
}
// @Filename: /projects/container/compositeExec/tsconfig.json
{
	"compilerOptions": {
		"composite": true,
	},
	"files": ["./index.ts"],
	"references": [
		{ "path": "../lib" },
	],
}
// @Filename: /projects/container/compositeExec/index.ts
import { Foo } from "../lib";
class A2 implements Foo {
    func() {}
}
class B2 implements Foo {
    func() {}
}
// @Filename: /projects/container/tsconfig.json
{
	"files": [],
	"include": [],
	"references": [
		{ "path": "./exec" },
		{ "path": "./compositeExec" },
	],
}
// @Filename: /projects/container/tsconfig.json
{
	"files": [],
	"include": [],
	"references": [
		{ "path": "./exec" },
		{ "path": "./compositeExec" },
	],
}
// @Filename: /projects/container/tsconfig.json
{
	"files": [],
	"include": [],
	"references": [
		{ "path": "./exec" },
		{ "path": "./compositeExec" },
	],
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "impl")
	// Open temp file and verify all projects alive
	f.GoToMarker(t, "temp")

	// Ref projects are loaded after as part of this command
	f.VerifyBaselineGoToImplementation(t, "impl")

	// Open temp file and verify all projects alive
	f.CloseFileOfMarker(t, "temp")
	f.GoToMarker(t, "temp")

	// Close all files and open temp file, only inferred project should be alive
	f.CloseFileOfMarker(t, "impl")
	f.CloseFileOfMarker(t, "temp")
	f.GoToMarker(t, "temp")
}

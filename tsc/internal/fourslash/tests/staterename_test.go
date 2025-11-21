package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameAncestorProjectRefMangement(t *testing.T) {
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
	],
}
// @Filename: /projects/container/lib/index.ts
export const myConst = 30;
// @Filename: /projects/container/exec/tsconfig.json
{
	"files": ["./index.ts"],
	"references": [
		{ "path": "../lib" },
	],
}
// @Filename: /projects/container/exec/index.ts
import { myConst } from "../lib";
export function getMyConst() {
	return myConst;
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
import { /*find*/myConst } from "../lib";
export function getMyConst() {
	return myConst;
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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "find")
	// Open temp file and verify all projects alive
	f.GoToMarker(t, "temp")

	// Ref projects are loaded after as part of this command
	f.VerifyBaselineRename(t, nil /*preferences*/, "find")

	// Open temp file and verify all projects alive
	f.CloseFileOfMarker(t, "temp")
	f.GoToMarker(t, "temp")

	// Close all files and open temp file, only inferred project should be alive
	f.CloseFileOfMarker(t, "find")
	f.CloseFileOfMarker(t, "temp")
	f.GoToMarker(t, "temp")
}

func TestRenameInCommonFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `
// @stateBaseline: true
// @Filename: /projects/a/a.ts
/*aTs*/import {C} from "./c/fc";
console.log(C)
// @Filename: /projects/a/tsconfig.json
{}
// @link:  /projects/c -> /projects/a/c
// @Filename: /projects/b/b.ts
/*bTs*/import {C} from "../c/fc";
console.log(C)
// @Filename: /projects/b/tsconfig.json
{}
// @link:  /projects/c -> /projects/b/c
// @Filename: /projects/c/fc.ts
export const /*find*/C = 42;
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "aTs")
	f.GoToMarker(t, "bTs")
	findMarker := f.MarkerByName(t, "find")
	aFcMarker := findMarker.MakerWithSymlink("/projects/a/c/fc.ts")
	f.GoToMarkerOrRange(t, aFcMarker)
	f.GoToMarkerOrRange(t, findMarker.MakerWithSymlink("/projects/b/c/fc.ts"))
	f.VerifyBaselineRename(t, nil /*preferences*/, aFcMarker)
}

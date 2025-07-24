package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDeclarationMapsOutOfDateMapping(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/node_modules/a/dist/index.d.ts
export declare class Foo {
    bar: any;
}
//# sourceMappingURL=index.d.ts.map
// @Filename: /home/src/workspaces/project/node_modules/a/dist/index.d.ts.map
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../src/index.ts"],"names":[],"mappings":"AAAA,qBAAa,GAAG;IACZ,GAAG,MAAC;CACP"}
// @Filename: /home/src/workspaces/project/node_modules/a/src/index.ts
export class /*2*/Foo {
}

// @Filename: /home/src/workspaces/project/node_modules/a/package.json
{
    "name": "a",
    "version": "0.0.0",
    "private": true,
    "main": "dist",
    "types": "dist"
}
// @Filename: /home/src/workspaces/project/index.ts
import { Foo/*1*/ } from "a";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/home/src/workspaces/project/index.ts")
	f.VerifyBaselineGoToDefinition(t, "1")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceMergedDeclarationDedup(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When a symbol has merged declarations (class + namespace), source
	// definition deduplicates them and navigates to the single source class.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare class /*dtsClass*/Util {
    run(): void;
}
export declare namespace Util {
    export const version: string;
}
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export class /*targetUtil*/Util {
    run() {}
}
Util.version = "1.0";
// @Filename: /home/src/workspaces/project/index.ts
import { /*importUtil*/Util } from "pkg";
const u: /*typeRef*/Util = new Util();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importUtil", "typeRef")
}

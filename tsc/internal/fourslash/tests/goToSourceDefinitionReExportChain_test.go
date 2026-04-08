package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceForwardedReExportChain(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When an implementation file re-exports from another file, source
	// definition follows the re-export chain to the actual implementation.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function helper(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export { helper } from './impl.js';
// @Filename: /home/src/workspaces/project/node_modules/pkg/impl.js
export function /*targetHelper*/helper() { return "ok"; }
// @Filename: /home/src/workspaces/project/index.ts
import { /*importHelper*/helper } from "pkg";
helper();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importHelper")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToSource12_callbackParam(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/@types/yargs/package.json
{
    "name": "@types/yargs",
    "version": "1.0.0",
    "types": "./index.d.ts"
}
// @Filename: /home/src/workspaces/project/node_modules/@types/yargs/index.d.ts
export interface Yargs { positional(): Yargs; }
export declare function command(command: string, cb: (yargs: Yargs) => void): void;
// @Filename: /home/src/workspaces/project/node_modules/yargs/package.json
{
    "name": "yargs",
    "version": "1.0.0",
    "main": "index.js"
}
// @Filename: /home/src/workspaces/project/node_modules/yargs/index.js
export function command(cmd, cb) { cb({ /*end*/positional: "This is obviously not even close to realistic" }); }
// @Filename: /home/src/workspaces/project/index.ts
import { command } from "yargs";
command("foo", yargs => {
    yargs.[|/*start*/positional|]();
});`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyBaselineGoToSourceDefinition(t, "start")
}

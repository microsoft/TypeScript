package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTslibFindAllReferencesOnRuntimeImportWithPaths1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: project/src/foo.ts
import * as x from /**/"tslib";
// @Filename: project/src/bar.ts
export default "";
// @Filename: project/src/bal.ts

// @Filename: project/src/dir/tslib.d.ts
export function __importDefault(...args: any): any;
export function __importStar(...args: any): any;
// @Filename: project/tsconfig.json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "module": "es2020",
        "importHelpers": true,
        "moduleDetection": "force",
        "paths": {
            "tslib": ["./src/dir/tslib"]
        }
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "")
}

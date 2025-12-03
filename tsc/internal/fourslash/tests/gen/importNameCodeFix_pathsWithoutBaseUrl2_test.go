package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_pathsWithoutBaseUrl2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /packages/test-package-1/tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "paths": {
      "test-package-2/*": ["../test-package-2/src/*"]
    }
  }
}
// @Filename: /packages/test-package-1/src/common/logging.ts
export class Logger {};
// @Filename: /packages/test-package-1/src/something/index.ts
Logger/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { Logger } from "../common/logging";

Logger`,
	}, nil /*preferences*/)
}

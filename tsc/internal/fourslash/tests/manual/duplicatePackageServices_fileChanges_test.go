package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDuplicatePackageServices_fileChanges(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noImplicitReferences: true
// @Filename: /node_modules/a/index.d.ts
import X from "x";
export function a(x: X): void;
// @Filename: /node_modules/a/node_modules/x/index.d.ts
export default class /*defAX*/X {
    private x: number;
}
// @Filename: /node_modules/a/node_modules/x/package.json
{ "name": "x", "version": "1.2./*aVersionPatch*/3" }
// @Filename: /node_modules/b/index.d.ts
import X from "x";
export const b: X;
// @Filename: /node_modules/b/node_modules/x/index.d.ts
export default class /*defBX*/X {
    private x: number;
}
// @Filename: /node_modules/b/node_modules/x/package.json
{ "name": "x", "version": "1.2./*bVersionPatch*/3" }
// @Filename: /src/a.ts
import { a } from "a";
import { b } from "b";
a(/*error*/b);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToFile(t, "/src/a.ts")
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)

	testChangeAndChangeBack := func(versionPatch string, def string) {
		// Insert "4" after the version patch marker, changing version from 1.2.3 to 1.2.43
		f.GoToMarker(t, versionPatch)
		f.Insert(t, "4")

		// Insert a space after the definition marker to trigger a recheck
		f.GoToMarker(t, def)
		f.Insert(t, " ")

		// No longer have identical packageId, so we get errors.
		f.VerifyErrorExistsAfterMarker(t, "error")

		// Undo the changes
		f.GoToMarker(t, versionPatch)
		f.DeleteAtCaret(t, 1)
		f.GoToMarker(t, def)
		f.DeleteAtCaret(t, 1)

		// Back to being identical.
		f.GoToFile(t, "/src/a.ts")
		f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	}

	testChangeAndChangeBack("aVersionPatch", "defAX")
	testChangeAndChangeBack("bVersionPatch", "defBX")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestUnreachableCodeAfterEdit(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowUnreachableCode: false
// @lib: es2015
// @Filename: /base/browser/browser.ts
export const isStandalone = true;
// @Filename: /base/browser/dom.ts
export function addDisposableListener() {}
// @Filename: /base/browser/window.ts
export const mainWindow = {} as Window;
// @Filename: /workbench.ts
/*before*/import { isStandalone } from './base/browser/browser';
import { addDisposableListener } from './base/browser/dom';
import { mainWindow } from './base/browser/window';

interface ISecretStorageCrypto {
    seal(data: string): Promise<string>;
    unseal(data: string): Promise<string>;
}

export class TransparentCrypto implements ISecretStorageCrypto {
    async seal(data: string): Promise<string> {
        return data;
    }
    async unseal(data: string): Promise<string> {
        return data;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	f.GoToMarker(t, "before")
	f.Insert(t, "throw new Error('foo');\n")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
	f.GoToMarker(t, "before")
	f.DeleteAtCaret(t, 24)
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
}

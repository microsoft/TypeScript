package fourslash_test

import (
	"fmt"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCodeLensReferencesShowOnAllClassMethods(t *testing.T) {
	t.Parallel()
	containingTestName := t.Name()
	for _, value := range []core.Tristate{core.TSTrue, core.TSFalse} {
		t.Run(fmt.Sprintf("%s=%v", containingTestName, value.IsTrue()), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")

			const content = `
export abstract class ABC {
  abstract methodA(): void;
  methodB(): void {}
  #methodC(): void {}
  protected methodD(): void {}
  private methodE(): void {}
  protected abstract methodG(): void;
  public methodH(): void {}

  static methodStaticA(): void {}
  protected static methodStaticB(): void {}
  private static methodStaticC(): void {}
  static #methodStaticD(): void {}
}
`
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{
				CodeLens: lsutil.CodeLensUserPreferences{
					ImplementationsCodeLensEnabled:               core.TSTrue,
					ImplementationsCodeLensShowOnAllClassMethods: value,
				},
			})
		})
	}
}

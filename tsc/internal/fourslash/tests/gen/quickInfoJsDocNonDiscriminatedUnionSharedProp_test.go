package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsDocNonDiscriminatedUnionSharedProp(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Entries {
  /**
   * Plugins info...
   */
  plugins?: Record<string, Record<string, unknown>>;
  /**
   * Output info...
   */
  output?: string;
  /**
   * Format info...
   */
  format?: string;
}

interface Input extends Entries {
  /**
   * Input info...
   */
  input: string;
}

interface Types extends Entries {
  /**
   * Types info...
   */
  types: string;
}

type EntriesOptions = Input | Types;

const options: EntriesOptions[] = [
  {
    input: "./src/index.ts",
    /*1*/output: "./dist/index.mjs",
  },
  {
    types: "./src/types.ts",
    format: "esm",
  },
];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) Entries.output?: string", "(property) Entries.output?: string")
}

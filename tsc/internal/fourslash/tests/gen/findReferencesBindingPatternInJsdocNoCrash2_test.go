package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindReferencesBindingPatternInJsdocNoCrash2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: node
// @Filename: node_modules/use-query/package.json
{
  "name": "use-query",
  "types": "index.d.ts"
}
// @Filename: node_modules/use-query/index.d.ts
declare function useQuery(): {
  data: string[];
};
// @Filename: node_modules/use-query/package.json
{
  "name": "other",
  "types": "index.d.ts"
}
// @Filename: node_modules/other/index.d.ts
interface BottomSheetModalProps {
  /**
   * A scrollable node or normal view.
   * @type null | (({ data: any }?) => any)
   */
  children: null | (({ data: any }?) => any);
}
// @Filename: src/index.ts
import { useQuery } from "use-query";
const { /*1*/data } = useQuery();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1")
}

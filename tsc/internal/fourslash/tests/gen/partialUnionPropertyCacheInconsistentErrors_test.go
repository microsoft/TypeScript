package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPartialUnionPropertyCacheInconsistentErrors(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @lib: esnext
interface ComponentOptions<Props> {
  setup?: (props: Props) => void;
  name?: string;
}

interface FunctionalComponent<P> {
  (props: P): void;
}

type ConcreteComponent<Props> =
  | ComponentOptions<Props>
  | FunctionalComponent<Props>;

type Component<Props = {}> = ConcreteComponent<Props>;

type WithInstallPlugin = { _prefix?: string };


/**/
export function withInstall<C extends Component, T extends WithInstallPlugin>(
  component: C | C[],
  target?: T,
): string {
  const componentWithInstall = (target ?? component) as T;
  const components = Array.isArray(component) ? component : [component];

  const { name } = components[0];
  if (name) {
    return name;
  }

  return "";
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "")
	f.Insert(t, "type C = Component['name']")
	f.VerifyNoErrors(t)
}

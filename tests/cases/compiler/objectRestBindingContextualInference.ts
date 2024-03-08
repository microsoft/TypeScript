// @strict: true
// @noEmit: true

// slimmed-down repro from #52629

type ImageHolder<K extends string> = {
  [P in K]: string;
};

type SetupImageRefs<K extends string> = {
  [P in K]: File;
};

type SetupImages<K extends string> = SetupImageRefs<K> & {
  prepare: () => { type: K };
};

interface TestInterface {
  name: string;
  image: string;
}

declare function setupImages<R extends ImageHolder<K>, K extends string>(
  item: R,
  keys: K[]
): SetupImages<K>;

declare const test: TestInterface;

const { prepare, ...rest } = setupImages(test, ["image"]);

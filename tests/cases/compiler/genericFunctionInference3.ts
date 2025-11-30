// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56931

declare function defineComponent<Props extends Record<string, any>>(
  setup: (props: Props) => void,
  options?: {
    props?: (keyof Props)[];
  },
): (props: Props) => unknown;

const res1 = defineComponent(
  <T extends string>(_props: { msg: T }) => {
    return () => {};
  }
);

const res2 = defineComponent(
  <T extends string>(_props: { msg: T }) => {
    return () => {};
  },
  {
    props: ["msg"],
  },
);

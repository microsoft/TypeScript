// @strict: true
// @noEmit: true

type IntrinsicElements = {
  div: {
    onChange: (ev: Event) => void;
  };
  span: {
    onChange: (ev: Event) => void;
  };
};

type ElementType = keyof IntrinsicElements;

let DEFAULT_TABS_TAG = "div" as const;

type Props<TTag extends ElementType, Overrides = {}> = Omit<
  IntrinsicElements[TTag],
  keyof Overrides
> &
  Overrides;

type TabGroupProps<TTag extends ElementType = typeof DEFAULT_TABS_TAG> = Props<
  TTag,
  {
    defaultIndex?: number;
    onChange?: (index: number) => void;
    selectedIndex?: number;
    vertical?: boolean;
    manual?: boolean;
  }
>;

interface _internal_ComponentTabGroup {
  <TTag extends ElementType = typeof DEFAULT_TABS_TAG>(
    props: TabGroupProps<TTag>,
  ): null;
}

declare let TabGroup: _internal_ComponentTabGroup;

TabGroup({
  defaultIndex: 0,
  onChange: (index) => {
    const i: number = index;
  },
});

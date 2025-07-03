// @strict: true
// @noEmit: true

type Props =
  | {
      parentId: string[];
      onChange: (event: { id: string }) => void;
      onChange2: () => void;
    }
  | {
      parentId?: never;
      onChange: (event: { id: number }) => void;
    };

function NonGenericComponent(props: Props) {
  return null;
}

NonGenericComponent({
  onChange: (e) => {},
});

const parentId: string[] = [];

NonGenericComponent({
  parentId,
  onChange: (e) => {},
  onChange2: () => {},
});

NonGenericComponent({
  parentId: parentId,
  onChange: (e) => {},
  onChange2: () => {},
});

NonGenericComponent({
  parentId: [],
  onChange: (e) => {},
  onChange2: () => {},
});

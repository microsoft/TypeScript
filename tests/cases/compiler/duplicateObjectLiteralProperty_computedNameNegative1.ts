// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/56341

function bar(props: { x?: string; y?: string }) {
  const { x = "", y = "" } = props;
  return {
    [x]: 1,
    [y]: 2,
  };
}

function foo({ x = "", y = "" }: { x?: string; y?: string }) {
  return {
    [x]: 1,
    [y]: 2,
  };
}

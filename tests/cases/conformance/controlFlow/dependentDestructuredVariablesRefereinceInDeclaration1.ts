// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62993

{
  const { c, f }: string | number = { c: 0, f };
  f;
}

{
  const { c, f }: string | number = { c: 0, f: () => f };
  f;
}

{
  const { c, f, g = f }: string | number = { c: 0, f: 0, g: 0 };
  f;
  g;
}

{
  const { c, f, f }: string | number = { c: 0, f: 0 };
  f;
}

{
  const { c, f, f: g }: string | number = { c: 0, f: 0 };
  g;
}

{
  const { c, f }: { c: 0; f: number } | { c: 1; f: string } = { c: 0, f };
  f;
}

{
  const { c, f }: { c: 0; f: () => unknown } | { c: 1; f: string } = {
    c: 0,
    f: () => f,
  };
  f;
}

{
  const {
    c,
    f,
    g = f,
  }:
    | { c: 0; f: bigint; g?: bigint | number }
    | { c: 1; f: number; g: string } = {
    c: 0,
    f: 10n,
  };
  f;
  g;
}

{
  const { c, f, f }: { c: 0; f: number } | { c: 1; f: string } = { c: 0, f: 0 };
  f;
}

{
  const { c, f, f: g }: { c: 0; f: number } | { c: 1; f: string } = { c: 0, f: 0 };
  g;
}
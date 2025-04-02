// @strict: true
// @noEmit: true

// repro mentioned in https://github.com/microsoft/TypeScript/issues/53888

type BiomePlainLinkProps = {
  href: string;
  onClick?: (event: string) => void;
}

type BiomeButtonProps = {
  href?: never;
  onClick?: (event: number) => void;
}

export type ClickableDiscriminatedUnion =
  | BiomePlainLinkProps
  | BiomeButtonProps;

const p3: ClickableDiscriminatedUnion = {
  href: `2${undefined}332132`,
  onClick: (ev) => console.log('@@@@', ev),
}

// @strict: true
// @noEmit: true

type Component<Props> = ((props: Props) => number) | (new (props: Props) => object);
type Field<Props> = Component<Props> & { testIds?: {} };

declare const component: <Props>(props: Props) => number;
const field: Field<string> = component;

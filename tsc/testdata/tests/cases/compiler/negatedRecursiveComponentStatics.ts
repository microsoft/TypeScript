// @strict: true
// @noEmit: true

type Component = (props: any) => any;
type Statics<Value> = {
    [Key in keyof Value & not (Value extends { kind: "memo" } ? "kind" : "name")]: Value[Key];
};
type Styled<Value extends Component> = string & StyledBase<Value> & Statics<Value>;
interface StyledBase<Value extends Component> {
    (props: Parameters<Value>[0]): void;
    withComponent<Other extends Styled<any>>(other: Other): Styled<Inner<Other>>;
}
type Inner<Value extends Component> = Value extends Styled<infer Result> ? Result : Value;

declare const component: Styled<(props: { count: number }) => void>;
component({ count: 1 });
// Error: The original component parameter type must be preserved.
component({ count: "wrong" });
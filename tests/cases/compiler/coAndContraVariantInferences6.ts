// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57911

interface ExactProps {
  value: "A" | "B";
}
interface FunctionComponent<P = {}> {
  (props: P): ReactElement<any> | null;
}
declare class Component<P> {
  constructor(props: P);
}
interface ComponentClass<P = {}> {
  new (props: P): Component<P>;
}

interface ReactElement<
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>,
> {
  type: T;
}

type JSXElementConstructor<P> =
  | ((props: P) => ReactElement<any> | null)
  | (new (props: P) => Component<any>);

declare function createElementIsolated<P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: P | null,
): void;

declare let WrapperIsolated: JSXElementConstructor<ExactProps>;
createElementIsolated(WrapperIsolated, { value: "C" });

declare const props: any[];
declare const stat: any;
[].push.apply(props, stat.properties);

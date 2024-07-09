// @strict: true
declare class Component<P> {
  constructor(props: Readonly<P>);
  constructor(props: P, context?: any);
  readonly props: Readonly<P> & Readonly<{ children?: {} }>;
}
interface ComponentClass<P = {}> {
  new (props: P, context?: any): Component<P>;
  propTypes?: WeakValidationMap<P>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
interface FunctionComponent<P = {}> {
  (props: P & { children?: {} }, context?: any): {} | null;
  propTypes?: WeakValidationMap<P>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

declare const nominalTypeHack: unique symbol;
interface Validator<T> {
  (
    props: object,
    propName: string,
    componentName: string,
    location: string,
    propFullName: string
  ): Error | null;
  [nominalTypeHack]?: T;
}
type WeakValidationMap<T> = {
  [K in keyof T]?: null extends T[K]
    ? Validator<T[K] | null | undefined>
    : undefined extends T[K]
    ? Validator<T[K] | null | undefined>
    : Validator<T[K]>
};
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

type Shared<
  InjectedProps,
  DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>
> = {
  [P in Extract<
    keyof InjectedProps,
    keyof DecorationTargetProps
  >]?: InjectedProps[P] extends DecorationTargetProps[P]
    ? DecorationTargetProps[P]
    : never
};

// Infers prop type from component C
type GetProps<C> = C extends ComponentType<infer P> ? P : never;

type ConnectedComponentClass<C extends ComponentType<any>, P> = ComponentClass<
  P
> & {
  WrappedComponent: C;
};

type Matching<InjectedProps, DecorationTargetProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P]
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <
  C extends ComponentType<Matching<TInjectedProps, GetProps<C>>>
>(
  component: C
) => ConnectedComponentClass<
  C,
  Omit<GetProps<C>, keyof Shared<TInjectedProps, GetProps<C>>> & TNeedsProps
>;

declare const connect: {
  <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: TDispatchProps
  ): InferableComponentEnhancerWithProps<
    ResolveThunks<TDispatchProps>,
    TOwnProps
  >;
};

type InferThunkActionCreatorType<
  TActionCreator extends (...args: any[]) => any
> = TActionCreator extends (
  ...args: infer TParams
) => (...args: any[]) => infer TReturn
  ? (...args: TParams) => TReturn
  : TActionCreator;

type HandleThunkActionCreator<TActionCreator> = TActionCreator extends (
  ...args: any[]
) => any
  ? InferThunkActionCreatorType<TActionCreator>
  : TActionCreator;

type ResolveThunks<TDispatchProps> = TDispatchProps extends {
  [key: string]: any;
}
  ? { [C in keyof TDispatchProps]: HandleThunkActionCreator<TDispatchProps[C]> }
  : TDispatchProps;

interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T;
}
interface Action<T = any> {
  type: T;
}
interface AnyAction extends Action {
  [extraProps: string]: any;
}

const simpleAction = (payload: boolean) => ({
  type: "SIMPLE_ACTION",
  payload
});
const thunkAction = (param1: number, param2: string) => async (
  dispatch: Dispatch,
  { foo }: OwnProps
) => {
  return foo;
};
interface OwnProps {
  foo: string;
}
interface TestComponentProps extends OwnProps {
  simpleAction: typeof simpleAction;
  thunkAction(param1: number, param2: string): Promise<string>;
}
class TestComponent extends Component<TestComponentProps> {}
const mapDispatchToProps = { simpleAction, thunkAction };

type Q = HandleThunkActionCreator<typeof simpleAction>;

const Test1 = connect(
  null,
  mapDispatchToProps
)(TestComponent);

export {};

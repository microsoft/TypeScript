// @strict: true
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type Shared< // Circularly self constraining type, defered thanks to mapping
    InjectedProps,
    DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>
    > = {
        [P in Extract<keyof InjectedProps, keyof DecorationTargetProps>]: InjectedProps[P] extends DecorationTargetProps[P] ? DecorationTargetProps[P] : never;
    };

interface ComponentClass<P> {
    defaultProps?: Partial<P>; // Inference target is also mapped _and_ optional
}

interface InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> {
    <P extends Shared<TInjectedProps, P>>(
        component: ComponentClass<P>
    ): ComponentClass<Omit<P, keyof Shared<TInjectedProps, P>> & TNeedsProps> & { WrappedComponent: ComponentClass<P> }
} // Then intersected with and indexed via Omit and &

interface Connect { // Then strictly compared with another signature in its context
    <TStateProps, TOwnProps>(
        mapStateToProps: unknown,
    ): InferableComponentEnhancerWithProps<TStateProps, TOwnProps>;

    <TDispatchProps, TOwnProps>(
        mapStateToProps: null | undefined,
        mapDispatchToProps: unknown,
        mergeProps: null | undefined,
        options: unknown
    ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>;
}

declare var connect: Connect;

const myStoreConnect: Connect = function(
    mapStateToProps?: any,
    mapDispatchToProps?: any,
    mergeProps?: any,
    options: unknown = {},
) {
    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        options,
    );
};

export {};

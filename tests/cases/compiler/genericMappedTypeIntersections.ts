// Repro for #27484
// @target: es6
function makePropsForWrappedComponent<PassthroughProps, ExternalProps, InjectedProps>(
    outerProps: Readonly<PassthroughProps & ExternalProps>,
    injectedProps: Readonly<InjectedProps>): Readonly<PassthroughProps & InjectedProps> {
    return Object.assign({}, injectedProps, outerProps);
}

//// [genericMappedTypeIntersections.ts]
// Repro for #27484
function makePropsForWrappedComponent<PassthroughProps, ExternalProps, InjectedProps>(
    outerProps: Readonly<PassthroughProps & ExternalProps>,
    injectedProps: Readonly<InjectedProps>): Readonly<PassthroughProps & InjectedProps> {
    return Object.assign({}, injectedProps, outerProps);
}


//// [genericMappedTypeIntersections.js]
// Repro for #27484
function makePropsForWrappedComponent(outerProps, injectedProps) {
    return Object.assign({}, injectedProps, outerProps);
}

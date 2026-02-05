//// [tests/cases/compiler/jsxPropsAsIdentifierNames.tsx] ////

//// [index.tsx]
declare namespace JSX {
    interface Element { }
    interface IntrinsicElements {
        div: {
            static?: boolean;
        };
    }
}
export default <div static={true} />;


//// [index.jsx]
export default <div static={true}/>;

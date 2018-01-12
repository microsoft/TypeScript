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
"use strict";
exports.__esModule = true;
exports["default"] = <div static={true}/>;

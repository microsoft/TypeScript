//// [tests/cases/compiler/jsxHexEntityUppercaseMarker.tsx] ////

//// [jsxHexEntityUppercaseMarker.tsx]
declare const React: any;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            div: any;
        }
    }
}

export const uppercaseMarkerText = <div>&#X41;</div>;
export const uppercaseMarkerAttribute = <div title="&#X42;" />;
export const lowercaseMarker = <div title="&#x42;">&#x41;</div>;
export const decimalEntity = <div title="&#66;">&#65;</div>;


//// [jsxHexEntityUppercaseMarker.js]
export const uppercaseMarkerText = React.createElement("div", null, "&#X41;");
export const uppercaseMarkerAttribute = React.createElement("div", { title: "&#X42;" });
export const lowercaseMarker = React.createElement("div", { title: "B" }, "A");
export const decimalEntity = React.createElement("div", { title: "B" }, "A");

// @jsx: react
// @target: esnext

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

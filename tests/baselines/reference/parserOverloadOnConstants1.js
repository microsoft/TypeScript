//// [tests/cases/conformance/parser/ecmascript5/parserOverloadOnConstants1.ts] ////

//// [parserOverloadOnConstants1.ts]
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: 'canvas'): HTMLCanvasElement;
    createElement(tagName: 'div'): HTMLDivElement;
    createElement(tagName: 'span'): HTMLSpanElement;
}

//// [parserOverloadOnConstants1.js]

//// [tests/cases/compiler/unknownSymbolOffContextualType1.ts] ////

//// [unknownSymbolOffContextualType1.ts]
declare var document: Document;
interface Document {
    getElementById(elementId: string): HTMLElement;
}
interface HTMLElement {
    isDisabled: boolean;
}
function getMaxWidth(elementNames: string[]) {
    var elements = elementNames.map(function (name) {
        return document.getElementById(name);
    });
    var enabled = elements.filter(function (e) {
        return !e.isDisabled;
    });
    var widths = enabled.map(function (e) {
        return e.xyxyxyx;  // error expected here
    });
    var maxWidth = widths.reduce(function (a, b) {
        return a > b ? a : b;
    });
    return maxWidth;
}


//// [unknownSymbolOffContextualType1.js]
function getMaxWidth(elementNames) {
    var elements = elementNames.map(function (name) {
        return document.getElementById(name);
    });
    var enabled = elements.filter(function (e) {
        return !e.isDisabled;
    });
    var widths = enabled.map(function (e) {
        return e.xyxyxyx; // error expected here
    });
    var maxWidth = widths.reduce(function (a, b) {
        return a > b ? a : b;
    });
    return maxWidth;
}

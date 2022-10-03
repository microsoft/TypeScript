//// [genericMethodOverspecialization.ts]
var names = ["list", "table1", "table2", "table3", "summary"];

interface HTMLElement {
    clientWidth: number;
    isDisabled: boolean;
}

declare var document: Document;
interface Document {
    getElementById(elementId: string): HTMLElement;
}

var elements = names.map(function (name) {
    return document.getElementById(name);
});


var xxx = elements.filter(function (e) {
    return !e.isDisabled;
});

var widths:number[] = elements.map(function (e) { // should not error
    return e.clientWidth;
});



//// [genericMethodOverspecialization.js]
var names = ["list", "table1", "table2", "table3", "summary"];
var elements = names.map(function (name) {
    return document.getElementById(name);
});
var xxx = elements.filter(function (e) {
    return !e.isDisabled;
});
var widths = elements.map(function (e) {
    return e.clientWidth;
});

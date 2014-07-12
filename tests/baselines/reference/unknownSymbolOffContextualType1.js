//// [unknownSymbolOffContextualType1.js]
function getMaxWidth(elementNames) {
    var elements = elementNames.map(function (name) {
        return document.getElementById(name);
    });
    var enabled = elements.filter(function (e) {
        return !e.isDisabled;
    });
    var widths = enabled.map(function (e) {
        return e.xyxyxyx;
    });
    var maxWidth = widths.reduce(function (a, b) {
        return a > b ? a : b;
    });
    return maxWidth;
}

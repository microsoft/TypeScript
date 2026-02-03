//// [tests/cases/compiler/dottedSymbolResolution1.ts] ////

//// [dottedSymbolResolution1.ts]
interface JQuery {
    find(selector: string): JQuery;
}

interface JQueryStatic {
    
    (selector: string): JQuery;
    (object: JQuery): JQuery;
}

class Base { foo() { } }

function each(collection: string, callback: (indexInArray: any, valueOfElement: any) => any): any;
function each(collection: JQuery, callback: (indexInArray: number, valueOfElement: Base) => any): any;
function each(collection: any, callback: (indexInArray: any, valueOfElement: any) => any): any {
    return null;
}

function _setBarAndText(): void {
    var x: JQuery, $: JQueryStatic
    each(x.find(" "), function () {
        var $this: JQuery = $(''),
            thisBar = $this.find(".fx-usagebars-calloutbar-this"); // bug lead to 'could not find dotted symbol' here
    } );
}

//// [dottedSymbolResolution1.js]
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.foo = function () { };
    return Base;
}());
function each(collection, callback) {
    return null;
}
function _setBarAndText() {
    var x, $;
    each(x.find(" "), function () {
        var $this = $(''), thisBar = $this.find(".fx-usagebars-calloutbar-this"); // bug lead to 'could not find dotted symbol' here
    });
}

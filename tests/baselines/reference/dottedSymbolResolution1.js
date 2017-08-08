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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Base = (function () {
    function Base() {
    }
    Base.prototype.foo = function () { };
    __names(Base.prototype, ["foo"]);
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

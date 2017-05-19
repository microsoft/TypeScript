//// [indexerA.ts]
class JQueryElement {
    id:string;
}

class JQuery {
    [n:number]:JQueryElement
}

var jq:JQuery={ 0: { id : "a" }, 1: { id : "b" } };
jq[0].id;

//// [indexerA.js]
var JQueryElement = (function () {
    function JQueryElement() {
    }
    return JQueryElement;
}());
var JQuery = (function () {
    function JQuery() {
    }
    return JQuery;
}());
var jq = { 0: { id: "a" }, 1: { id: "b" } };
jq[0].id;

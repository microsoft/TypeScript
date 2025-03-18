//// [tests/cases/compiler/indexerA.ts] ////

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
class JQueryElement {
    id;
}
class JQuery {
}
var jq = { 0: { id: "a" }, 1: { id: "b" } };
jq[0].id;

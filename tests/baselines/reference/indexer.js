//// [tests/cases/compiler/indexer.ts] ////

//// [indexer.ts]
interface JQueryElement {
    id:string;
}

interface JQuery {
    [n:number]:JQueryElement;
}

var jq:JQuery={ 0: { id : "a" }, 1: { id : "b" } };
jq[0].id;

//// [indexer.js]
var jq = { 0: { id: "a" }, 1: { id: "b" } };
jq[0].id;

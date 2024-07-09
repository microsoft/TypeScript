class JQueryElement {
    id:string;
}

class JQuery {
    [n:number]:JQueryElement
}

var jq:JQuery={ 0: { id : "a" }, 1: { id : "b" } };
jq[0].id;
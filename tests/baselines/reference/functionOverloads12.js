//// [functionOverloads12.ts]
function foo():string;
function foo():number;
function foo():any { if (true) return ""; else return 0;}


//// [functionOverloads12.js]
function foo() { if (true)
    return "";
else
    return 0; }

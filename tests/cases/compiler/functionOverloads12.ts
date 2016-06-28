// @allowUnreachableCode: true

function foo():string;
function foo():number;
function foo():any { if (true) return ""; else return 0;}

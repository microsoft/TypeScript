//Function overload signature with optional parameter followed by non-optional parameter
function fn4a(x?: number, y: string);
function fn4a() { }

function fn4b(n: string, x?: number, y: string);
function fn4b() { }

//Function overload signature with rest param followed by non-optional parameter
function fn5(x: string, ...y: any[], z: string);
function fn5() { }

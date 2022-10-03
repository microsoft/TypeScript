function foo3<T>(test: string); // error
function foo3<T>(test: T) { }

function foo4<T>(test: string); // valid
function foo4<T extends String>(test: T) { }
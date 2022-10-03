
// ok - overload signatures are assignment compatible with their implementation
class Accessor {}

function attr(name: string): string;
function attr(name: string, value: string): Accessor;
function attr(map: any): Accessor;
function attr(nameOrMap: any, value?: string): any {
    if (nameOrMap && typeof nameOrMap === "object") {
        // handle map case
        return new Accessor;
    }
    else {
        // handle string case
        return "s";
    }
}

// not ok - there's an assignment compat error
function attr2(name: string): string;
function attr2(name: string, value: string): Accessor;
function attr2(map: any): Accessor;
function attr2(nameOrMap: any, value?: string): string {
    if (nameOrMap && typeof nameOrMap === "object") {
        // handle map case
        return "t";
    }
    else {
        // handle string case
        return "s";
    }
}

// error - signatures are not assignment compatible
function foo():number; 
function foo():string { return "a" };


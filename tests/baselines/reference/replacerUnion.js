//// [replacerUnion.ts]
interface ReplacerFn {
    (substr: string, ...args: any[]): string;
}

function replaceMeStr(str: string, replacer: string) {
    return str.replace(/foo/, replacer); // works! :)
}

function replaceMeFn(str: string, replacer: ReplacerFn) {
    return str.replace(/foo/, replacer); // works! :)
}

function replaceMe(str: string, replacer: string | ReplacerFn) {
    return str.replace(/foo/, replacer); // <---  !!!!!!!!! --- !!!!!! --- error! :(
}


//// [replacerUnion.js]
function replaceMeStr(str, replacer) {
    return str.replace(/foo/, replacer); // works! :)
}
function replaceMeFn(str, replacer) {
    return str.replace(/foo/, replacer); // works! :)
}
function replaceMe(str, replacer) {
    return str.replace(/foo/, replacer); // <---  !!!!!!!!! --- !!!!!! --- error! :(
}

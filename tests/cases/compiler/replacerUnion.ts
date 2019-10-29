
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

var strOrNum: string | number;
var strOrBool: string | boolean;
var strOrFunc: string | (() => void);
var numOrBool: number | boolean
var str: string;
var num: number;
var bool: boolean;
var func: () => void;

if ("string" === typeof strOrNum) {
    str = strOrNum;
}
else {
    num = strOrNum;
}
if ("function" === typeof strOrFunc) {
    func = strOrFunc;
}
else {
    str = strOrFunc;
}
if ("number" === typeof numOrBool) {
    num = numOrBool;
}
else {
    bool = numOrBool;
}
if ("boolean" === typeof strOrBool) {
    bool = strOrBool;
}
else {
    str = strOrBool;
}

// @target: es5
var id;
class C {
    [0 + 1]() { }
    static [() => { }]() { }
    get [delete id]() { }
    set [[0, 1]](v) { }
    static get [<String>""]() { }
    static set [id.toString()](v) { }
}
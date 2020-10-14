// @strict: true
type Obj = { x: number };
function go(obj: Obj) { }

function fn(arg: { x?: number }) {
    arg.x && go({ ...arg });
}

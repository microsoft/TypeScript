// @declaration: true
// @skipDefaultLibCheck: true

// @Filename: 0.ts
{
    type Data = string | boolean;
    let obj: Data = true;
}
export { }

// @Filename: 1.ts
let v = "str" || true;
function bar () {
    return v;
}
export { v, bar }
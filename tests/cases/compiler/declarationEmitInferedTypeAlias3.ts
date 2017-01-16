// @declaration: true
// @skipDefaultLibCheck: true

// @Filename: 0.ts
{
    type Data = string | boolean;
    let obj: Data = true;
}
export { }

// @Filename: 1.ts
var x = "hi" || 5;
export default x;
//// [amdReexportAmbientVar.ts]
/// <amd-dependency path="text!extern_view.html" name="view"/>
declare var view: string;
export {view};
export function test() { }

//// [amdReexportAmbientVar.js]
exports.view = view;
function test() { }
exports.test = test;

//@module: amd
var nake;
function doCompile<P0, P1, P2>(fileset: P0, moduleType: P1) {

    return undefined;
}
export var compileServer = task<number, number, any>(<P0, P1, P2>() => {

    var folder = path.join(),
        fileset = nake.fileSetSync<number, number, any>(folder)
  return doCompile<number, number, any>(fileset, moduleType);
});

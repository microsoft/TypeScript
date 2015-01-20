//// [elaboratedErrors.ts]
interface FileSystem {
  read: number;
}

function fn(s: WorkerFS): void;
function fn(s: FileSystem): void;
function fn(s: FileSystem|WorkerFS) { }

// This should issue a large error, not a small one
class WorkerFS implements FileSystem {
  read: string;
}


//// [elaboratedErrors.js]
function fn(s) {
}
// This should issue a large error, not a small one
var WorkerFS = (function () {
    function WorkerFS() {
    }
    return WorkerFS;
})();

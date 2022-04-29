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

interface Alpha { x: string; }
interface Beta { y: number; }
var x: Alpha;
var y: Beta;

// Only one of these errors should be large
x = y;
x = y;

// Only one of these errors should be large
y = x;
y = x;


//// [elaboratedErrors.js]
function fn(s) { }
// This should issue a large error, not a small one
var WorkerFS = /** @class */ (function () {
    function WorkerFS() {
    }
    return WorkerFS;
}());
var x;
var y;
// Only one of these errors should be large
x = y;
x = y;
// Only one of these errors should be large
y = x;
y = x;

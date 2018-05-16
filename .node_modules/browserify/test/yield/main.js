var f = require('./f.js')();
for (var r = f.next(); !r.done; r = f.next()) {
    console.log(r.value);
}

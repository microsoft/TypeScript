var test = require('tape');
var detect = require('../');
var fs = require('fs');
var src = '#!/beep/boop blah\n'
    + fs.readFileSync(__dirname + '/files/detect.js')
;

test('shebangs', function (t) {
    t.plan(3);
    
    var scope = detect(src);
    t.same(scope.globals.implicit, [
        'w', 'foo', 'process', 'console', 'AAA', 'BBB', 'CCC', 'xyz'
    ]);
    t.same(scope.globals.exported, [
        'w', 'RAWR', 'BLARG', 'ZZZ'
    ]);
    t.same(scope.locals[''], [ 'x', 'y', 'z', 'beep' ]);
});

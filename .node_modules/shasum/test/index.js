var equal = require('assert').equal
var hash = require(process.argv[2] === 'browser' ? '../browser.js' : '..')


equal(hash('abc'),  'a9993e364706816aba3e25717850c26c9cd0d89d')
equal(hash('abce'), '0a431a7631cabf6b11b984a943127b5e0aa9d687')
equal(hash({}),     'bf21a9e8fbc5a3846fb05b4fa0859e0917b2202f')
equal(hash([]),     '97d170e1550eee4afc0af065b78cda302a97674c')
equal(hash(new Buffer('abc')),
                    'a9993e364706816aba3e25717850c26c9cd0d89d')
equal(hash('ab\xff'),'ba5142a8207bd61baddf325088732e71cbfe8eb6')
equal(hash(new Buffer('ab\xff').toString()),
                    'ba5142a8207bd61baddf325088732e71cbfe8eb6')
equal(hash({a:1,b:2,c:3}), hash({c:3,b:2,a:1}))
equal(hash({a:1,b:2,c:3}), hash({c:3,b:2,a:1}))
equal(hash({a:1,b:[2,3],c:4}), hash({c:4,b:[2,3],a:1}))
equal(hash({a:1,b:[2,{c:3,d:4}],e:5}), hash({e:5,b:[2,{d:4,c:3}],a:1}))


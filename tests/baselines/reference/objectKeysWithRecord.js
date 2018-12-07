//// [objectKeysWithRecord.ts]
type K = 'foo' | 'bar'
const record: Record<K, boolean> = { foo: true, bar: false };

Object.keys(record).forEach((key: K) => {

});


//// [objectKeysWithRecord.js]
var record = { foo: true, bar: false };
Object.keys(record).forEach(function (key) {
});

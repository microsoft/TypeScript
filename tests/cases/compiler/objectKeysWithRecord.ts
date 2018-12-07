type K = 'foo' | 'bar'
const record: Record<K, boolean> = { foo: true, bar: false };

Object.keys(record).forEach((key: K) => {

});
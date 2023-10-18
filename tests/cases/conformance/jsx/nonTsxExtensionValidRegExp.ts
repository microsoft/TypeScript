declare const div: any, foo: any;
type div = {};

// This is valid: <div>foo (less than) /div>/
const a = <div>foo</div>/;

// @pretty: true
// @filename: file1.ts
class Foo { }
const Bar = 3;
// @filename: file2.ts
type Foo = number;
class Bar {}
// @filename: file3.ts
type Foo = 54;
let Bar = 42

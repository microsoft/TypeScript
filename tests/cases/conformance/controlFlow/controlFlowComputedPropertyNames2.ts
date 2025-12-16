// @strict: true
// @noEmit: true

interface Type {
  kind: number;
  isIndexType(): this is IndexType;
}

interface IndexType extends Type {
  kind: 1;
  type: Type;
}

function test1(types: Type[]) {
  for (let i = 0; i < types.length; i++) {
    const t = types[i].isIndexType() ? types[i].type : types[i]; // ok
  }
}

function test2(types: Type[]) {
  for (let i = 0; i < types.length; i++) {
    i++;
    const t = types[i].isIndexType() ? types[i].type : types[i]; // error
  }
}

function test3(types: Type[]) {
  for (
    let i = 0;
    i < types.length;
    types[i].isIndexType() ? types[i].type : types[i], i++ // error
  ) {}
}

function test4(types: Type[]) {
  for (
    let i = 0;
    types[i].isIndexType() ? types[i].type : types[i], i < types.length; // error
    i++
  ) {}
}

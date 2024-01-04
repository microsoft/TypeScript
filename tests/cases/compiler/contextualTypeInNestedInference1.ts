// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56912

interface NameBag<Names extends Record<string, any> = {}> {
  addName<Name extends string>(options: {
    name: Name;
  }): NameBag<
    Names & {
      [key in Name]: { name: true };
    }
  >;
}

const emptyBag: NameBag = null as any;

const standalone = emptyBag.addName({ name: "hey!" });

function wrapper1<Schema extends Record<string, NameBag>>(
  schema: Schema,
): Schema {
  return schema;
}

const bagOfBags1 = wrapper1({
  prop: emptyBag.addName({ name: "hey!" }),
});

function wrapper2<Schema extends Record<string, NameBag<Record<string, any>>>>(
  schema: Schema,
): Schema {
  return schema;
}

const bagOfBags2 = wrapper2({
  prop: emptyBag.addName({ name: "hey!" }),
});

// @strict: true
// @noEmit: true

// repro from #44750

type Request = { l1: { l2: boolean } };
type Example<T> = { ex?: T | null };

type Schema1<T> = (T extends boolean ? { type: 'boolean'; } : { props: { [P in keyof T]: Schema1<T[P]> }; }) & Example<T>;

export const schemaObj1: Schema1<Request> = {
  props: {
    l1: {
      props: {
        l2: { type: 'boolean' },
        invalid: false,
      },
    },
  },
}

type Schema2<T> = (T extends boolean ? { type: 'boolean'; } & Example<T> : { props: { [P in keyof T]: Schema2<T[P]> }; } & Example<T>);

export const schemaObj2: Schema2<Request> = {
  props: {
    l1: {
      props: {
        l2: { type: 'boolean' },
        invalid: false,
      },
    },
  },
}

type Schema3<T> = Example<T> & (T extends boolean ? { type: 'boolean'; } : { props: { [P in keyof T]: Schema3<T[P]> }; });

export const schemaObj3: Schema3<Request> = {
  props: {
    l1: {
      props: {
        l2: { type: 'boolean' },
        invalid: false,
      },
    },
  },
}

type Schema4<T> = (T extends boolean ? { type: 'boolean'; } & Example<T> : { props: Example<T> & { [P in keyof T]: Schema4<T[P]> }; });

export const schemaObj4: Schema4<Request> = {
  props: {
    l1: {
      props: {
        l2: { type: 'boolean' },
        invalid: false,
      },
    },
  },
}

// repro from #40405

type Length<T extends any[]> = T["length"];
type Prepend<V, T extends any[]> = ((head: V, ...args: T) => void) extends (
  ...args: infer R
) => void
  ? R
  : any;

type BuildTree<T, N extends number = -1, I extends any[] = []> = {
  1: T;
  0: T & { children: BuildTree<T, N, Prepend<any, I>>[] };
}[Length<I> extends N ? 1 : 0];

interface User {
  name: string;
}

type GrandUser = BuildTree<User, 2>;

const grandUser: GrandUser = {
  name: "Grand User",
  children: [
    {
      name: "Son",
      children: [
        {
          name: "Grand son",
          children: [
            {
              name: "123",
              children: [
                {
                  name: "Some other name",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

grandUser.children[0].children[0].children[0];


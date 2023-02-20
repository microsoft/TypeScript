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

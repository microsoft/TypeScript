// @strict: true
// @noEmit: true

type Params = {
  foo: string;
} & ({ tag: "a"; type: number } | { tag: "b"; type: string });

const getType = <P extends Params>({ foo, ...rest }: P) => {
  return rest;
};

declare const params: Params;

switch (params.tag) {
    case 'a': {
        const result = getType(params).type; // number

        break;
    }
    case 'b': {
        const result = getType(params).type; // string

        break;
    }
}
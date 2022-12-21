type Params = {
    foo: string;
} & ({ tag: 'a'; type: number } | { tag: 'b'; type: string });

const getType = <P extends Params>(params: P) => {
    const {
        // Omit
        foo,

        ...rest
    } = params;

    return rest;
};

declare const params: Params;

switch (params.tag) {
    case 'a': {
        // TS 4.2: number
        // TS 4.3: string | number
        const result = getType(params).type;

        break;
    }
    case 'b': {
        // TS 4.2: string
        // TS 4.3: string | number
        const result = getType(params).type;

        break;
    }
}
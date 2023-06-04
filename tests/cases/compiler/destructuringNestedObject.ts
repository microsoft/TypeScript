// @strict: true
interface Props {
    innerObject?: {
        innerObject2?: {
            name?: string;
            email?: string;
        }
    };
}

export const nestedDestructure1 = (props: Props) => {
    const {
        innerObject: {
            innerObject2: { name, email } = {}  // should ok
        } = {}
    } = props;
    console.log(name, email);
};

export const nestedDestructure2 = (props: Props) => {
    const {
        innerObject: {
            innerObject2: { name, email }   // should error
        } = {}
    } = props;
    console.log(name, email);
};

export const nestedDestructure3 = (props: Props) => {
    const {
        innerObject: {
            innerObject2: { name, email } = {}
        }      // should error
    } = props;
    console.log(name, email);
};

type NestedTuple = [[[string | undefined] | undefined] | undefined]


export const nestedTupleDestructure1 = (props: NestedTuple) => {
    const [[[s] = []] = []] = props;  // should ok
}

export const nestedTupleDestructure2 = (props: NestedTuple) => {
    const [[[s]] = []] = props; // should error
}

export const nestedTupleDestructure3 = (props: NestedTuple) => {
    const [[[s]]] = props; // should error
}


// @strict: true

type UseQueryResult<T> = {
    isSuccess: false;
    data: undefined;
} | {
    isSuccess: true;
    data: T
};

function useQuery(): UseQueryResult<number> {
    return {
        isSuccess: false,
        data: undefined,
    };
}

const { data: data1, isSuccess: isSuccess1 } = useQuery();
const { data: data2, isSuccess: isSuccess2 } = useQuery();
const { data: data3, isSuccess: isSuccess3 } = useQuery();

if (isSuccess1 && isSuccess2 && isSuccess3) {
    data1.toExponential();  // should ok
    data2.toExponential();  // should ok
    data3.toExponential();  // should ok
}

const areSuccess = isSuccess1 && isSuccess2 && isSuccess3;
if (areSuccess) {
    data1.toExponential();  // should ok
    data2.toExponential();  // should ok
    data3.toExponential();  // should ok
}

{
    let { data: data1, isSuccess: isSuccess1 } = useQuery();
    let { data: data2, isSuccess: isSuccess2 } = useQuery();
    const { data: data3, isSuccess: isSuccess3 } = useQuery();
    const areSuccess = isSuccess1 && isSuccess2 && isSuccess3;
    if (areSuccess) {
        data1.toExponential();  // should error
        data2.toExponential();  // should error
        data3.toExponential();  // should ok
    }
}

declare function getArrayResult(): [true, number] | [false, undefined];
{
    const [foo1, bar1] = getArrayResult();
    const [foo2, bar2] = getArrayResult();
    const [foo3, bar3] = getArrayResult();
    const arrayAllSuccess = foo1 && foo2 && foo3;
    if (arrayAllSuccess) {
        bar1.toExponential();  // should ok
        bar2.toExponential();  // should ok
        bar3.toExponential();  // should ok
    }
}

{
    const [foo1, bar1] = getArrayResult();
    let [foo2, bar2] = getArrayResult();
    let [foo3, bar3] = getArrayResult();
    const arrayAllSuccess = foo1 && foo2 && foo3;
    if (arrayAllSuccess) {
        bar1.toExponential();   // should ok
        bar2.toExponential();   // should error
        bar3.toExponential();   // should error
    }
}

type Nested = {
    type: 'string';
    resp: {
        data: string
    }
} | {
    type: 'number';
    resp: {
        data: number;
    }
}

{
    let resp!: Nested;
    const { resp: { data }, type } = resp;
    if (type === 'string') {
        data satisfies string;
    }
    if (resp.type === 'string') {
        resp.resp.data satisfies string;
    }    
}

{
   
    let resp!: Nested;
    const { resp: { data: dataAlias }, type } = resp;
    if (type === 'string') {
        dataAlias satisfies string;
    }
    if (resp.type === 'string') {
        resp.resp.data satisfies string;
    }    
}

function bindingPatternInParameter({ data: data1, isSuccess: isSuccess1 }: UseQueryResult<number>) {
  const { data: data2, isSuccess: isSuccess2 } = useQuery();

  const areSuccess = isSuccess1 && isSuccess2;
  if (areSuccess) {
    data1.toExponential();
    data2.toExponential();
  }
}

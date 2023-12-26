//// [tests/cases/compiler/controlFlowAliasedDiscriminants.ts] ////

//// [controlFlowAliasedDiscriminants.ts]
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


//// [controlFlowAliasedDiscriminants.js]
function useQuery() {
    return {
        isSuccess: false,
        data: undefined,
    };
}
var _a = useQuery(), data1 = _a.data, isSuccess1 = _a.isSuccess;
var _b = useQuery(), data2 = _b.data, isSuccess2 = _b.isSuccess;
var _c = useQuery(), data3 = _c.data, isSuccess3 = _c.isSuccess;
if (isSuccess1 && isSuccess2 && isSuccess3) {
    data1.toExponential(); // should ok
    data2.toExponential(); // should ok
    data3.toExponential(); // should ok
}
var areSuccess = isSuccess1 && isSuccess2 && isSuccess3;
if (areSuccess) {
    data1.toExponential(); // should ok
    data2.toExponential(); // should ok
    data3.toExponential(); // should ok
}
{
    var _d = useQuery(), data1_1 = _d.data, isSuccess1_1 = _d.isSuccess;
    var _e = useQuery(), data2_1 = _e.data, isSuccess2_1 = _e.isSuccess;
    var _f = useQuery(), data3_1 = _f.data, isSuccess3_1 = _f.isSuccess;
    var areSuccess_1 = isSuccess1_1 && isSuccess2_1 && isSuccess3_1;
    if (areSuccess_1) {
        data1_1.toExponential(); // should error
        data2_1.toExponential(); // should error
        data3_1.toExponential(); // should ok
    }
}
{
    var _g = getArrayResult(), foo1 = _g[0], bar1 = _g[1];
    var _h = getArrayResult(), foo2 = _h[0], bar2 = _h[1];
    var _j = getArrayResult(), foo3 = _j[0], bar3 = _j[1];
    var arrayAllSuccess = foo1 && foo2 && foo3;
    if (arrayAllSuccess) {
        bar1.toExponential(); // should ok
        bar2.toExponential(); // should ok
        bar3.toExponential(); // should ok
    }
}
{
    var _k = getArrayResult(), foo1 = _k[0], bar1 = _k[1];
    var _l = getArrayResult(), foo2 = _l[0], bar2 = _l[1];
    var _m = getArrayResult(), foo3 = _m[0], bar3 = _m[1];
    var arrayAllSuccess = foo1 && foo2 && foo3;
    if (arrayAllSuccess) {
        bar1.toExponential(); // should ok
        bar2.toExponential(); // should error
        bar3.toExponential(); // should error
    }
}
{
    var resp = void 0;
    var data = resp.resp.data, type = resp.type;
    if (type === 'string') {
        data;
    }
    if (resp.type === 'string') {
        resp.resp.data;
    }
}
{
    var resp = void 0;
    var dataAlias = resp.resp.data, type = resp.type;
    if (type === 'string') {
        dataAlias;
    }
    if (resp.type === 'string') {
        resp.resp.data;
    }
}

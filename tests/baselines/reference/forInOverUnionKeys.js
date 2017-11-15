//// [forInOverUnionKeys.ts]
type TypeDescription<T> = {[prop in keyof T]: undefined };

function getAllProperties<T>(typeDesc: (T|TypeDescription<T>)): ReadonlyArray<keyof T>
{
    const props: Array<keyof T> = [];

    for (var iPropName in typeDesc)
    {
        props.push(iPropName);
    }

    return props;
}


//// [forInOverUnionKeys.js]
function getAllProperties(typeDesc) {
    var props = [];
    for (var iPropName in typeDesc) {
        props.push(iPropName);
    }
    return props;
}

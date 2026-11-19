// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst

// The type of tmp depends on the type of cur in the loop, which depends on
// tmp. Signature help for the call analyzes the loop with the arguments
// typed so far, and the type it finds at the loop does not outlive the
// request (49529).

interface XMLNode {}

declare function accessArray(node: XMLNode, createIfNotExists: true): XMLNode;
declare function accessArray(node: XMLNode, createIfNotExists: boolean): XMLNode | undefined;
declare function accessCatalogEntry(createIfNotExists: boolean): XMLNode | undefined;

function accessFieldValue(createIfNotExists: boolean): XMLNode | undefined {
    let cur = accessCatalogEntry(createIfNotExists);
    if (!cur) {
        return undefined;
    }
    for (let i = 0; i < 5; ++i) {
        let tmp = accessArray(cur, createIfNotExists);
        if (!tmp) {
            return undefined;
        }
        cur = tmp;
    }
    return cur;
}

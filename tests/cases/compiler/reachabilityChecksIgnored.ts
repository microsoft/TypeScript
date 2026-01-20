// @allowUnreachableCode: false
// @preserveConstEnums: true


function a() {
    throw new Error("");

    // @ts-ignore
    console.log("unreachable");
}

function b() {
    throw new Error("");

    // @ts-expect-error
    console.log("unreachable");
}
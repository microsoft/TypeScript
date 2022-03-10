// ==ORIGINAL==

function /*[#|*/f/*|]*/(p: Promise<unknown>) {
    return p.catch((error: Error) => {
        return Promise.reject(error);
    });
}
// ==ASYNC FUNCTION::Convert to async function==

async function f(p: Promise<unknown>) {
    try {
        return await p;
    } catch (error) {
        return await Promise.reject(error);
    }
}
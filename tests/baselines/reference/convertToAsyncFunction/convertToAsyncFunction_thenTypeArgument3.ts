// ==ORIGINAL==

type APIResponse<T> = { success: true, data: T } | { success: false };

function wrapResponse<T>(response: T): APIResponse<T> {
    return { success: true, data: response };
}

function /*[#|*/get/*|]*/() {
    return Promise.resolve(undefined!).then<APIResponse<{ email: string }>>(d => {
        console.log(d);
        return wrapResponse(d);
    });
}

// ==ASYNC FUNCTION::Convert to async function==

type APIResponse<T> = { success: true, data: T } | { success: false };

function wrapResponse<T>(response: T): APIResponse<T> {
    return { success: true, data: response };
}

async function get() {
    const d = await Promise.resolve(undefined!);
    console.log(d);
    const result: APIResponse<{ email: string; }> = wrapResponse(d);
    return result;
}

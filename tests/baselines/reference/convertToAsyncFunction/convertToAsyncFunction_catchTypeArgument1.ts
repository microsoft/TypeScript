// ==ORIGINAL==

type APIResponse<T> = { success: true, data: T } | { success: false };

function /*[#|*/get/*|]*/() {
    return Promise
        .resolve<APIResponse<{ email: string }>>({ success: true, data: { email: "" } })
        .catch<APIResponse<{ email: string }>>(() => ({ success: false }));
}

// ==ASYNC FUNCTION::Convert to async function==

type APIResponse<T> = { success: true, data: T } | { success: false };

async function get() {
    try {
        return Promise
            .resolve<APIResponse<{ email: string; }>>({ success: true, data: { email: "" } });
    }
    catch (e) {
        const result: APIResponse<{ email: string; }> = ({ success: false });
        return result;
    }
}

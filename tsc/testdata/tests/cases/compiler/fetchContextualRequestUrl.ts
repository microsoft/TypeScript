// @strict: true
// @lib: es2015,dom
// @noEmit: true

const fetchUsingRequestUrl: typeof fetch = async input => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    return new Response(url);
};

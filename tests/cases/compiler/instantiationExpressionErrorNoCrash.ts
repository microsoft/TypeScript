const createCacheReducer = <N extends string, QR>(
    queries: Cache<N, QR>["queries"],
) => {
    const queriesMap = {} as QR;

    const initialState = {
        queries: queriesMap,
    };

    return (state = initialState) => state;
};

export type Cache<N extends string, QR> = {
    queries: {
        [QK in keyof QR]: ReturnType<typeof createCacheReducer<QR>>;
    };
};
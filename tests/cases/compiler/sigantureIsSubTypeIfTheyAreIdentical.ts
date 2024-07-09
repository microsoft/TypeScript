interface ICache {
    get<T>(key: string): T;
}
class CacheService implements ICache { // Should not error that property type of get are incomaptible
    get<T>(key: string): T {
        return undefined;
    }
}
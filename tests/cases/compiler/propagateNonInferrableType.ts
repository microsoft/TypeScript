// @strict: true

declare function resolver<T>(): () => void;
declare function wrapResolver<T>(resolverFunction: () => void): void;

wrapResolver(resolver() || []);

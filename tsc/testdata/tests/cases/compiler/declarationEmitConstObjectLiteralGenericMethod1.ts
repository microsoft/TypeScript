// @declaration: true

export const obj1 = {
    id<T>(value: T) {
        return value;
    },
    pair<T>(left: T, right: T) {
        return [left, right];
    },
} as const;

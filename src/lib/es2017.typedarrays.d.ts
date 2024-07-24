interface TypedArrayConstructor<Tag extends keyof TypedArrayTypes<any>> {
    new (): TypedArrayType<Tag, ArrayBuffer>;
}

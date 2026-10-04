// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57903
interface Result<T, E> {
    [Symbol.iterator](): Generator<E, T, unknown>
}

type Book = { id: string; title: string; authorId: string };
type Author = { id: string; name: string };
type BookWithAuthor = Book & { author: Author };

declare const authorPromise: Promise<Result<Author, "NOT_FOUND_AUTHOR">>;
declare const mapper: <T>(result: Result<T, "NOT_FOUND_AUTHOR">) => Result<T, "NOT_FOUND_AUTHOR">;
declare const g: <T, U, V>() => AsyncGenerator<T, U, V>;

async function* f(): AsyncGenerator<"NOT_FOUND_AUTHOR" | "NOT_FOUND_BOOK", BookWithAuthor, unknown> {
    // Without yield*, the type of test1 is
    //   Result<Author, "NOT_FOUND_AUTHOR>
    const test1 = await authorPromise.then(mapper)

    // With yield*, the type of test2 is
    //    Author | BookWithAuthor
    // But this codepath has no way to produce BookWithAuthor
    const test2 = yield* await authorPromise.then(mapper)

    const x1 = yield* g();
    const x2: number = yield* g();

    return null! as BookWithAuthor;
}
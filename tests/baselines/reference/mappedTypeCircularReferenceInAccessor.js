//// [tests/cases/compiler/mappedTypeCircularReferenceInAccessor.ts] ////

//// [mappedTypeCircularReferenceInAccessor.ts]
interface User {
  firstName: string,
  level: number,
  get bestFriend(): User
  set bestFriend(user: SerializablePartial<User>)
}

type FilteredKeys<T> = { [K in keyof T]: T[K] extends number ? K : T[K] extends string ? K : T[K] extends boolean ? K : never }[keyof T];

type SerializablePartial<T> = {
  [K in FilteredKeys<T>]: T[K]
};


//// [mappedTypeCircularReferenceInAccessor.js]

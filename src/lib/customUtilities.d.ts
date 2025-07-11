/**
 * Makes all properties of T writable.
 */
export type Writable<T> = { -readonly [P in keyof T]: T[P] };

// Example usage (not part of the library, just for demonstration)
/*
interface MyReadOnlyType {
  readonly name: string;
  readonly age: number;
}

type MyWritableType = Writable<MyReadOnlyType>;

const writableObject: MyWritableType = {
  name: "Jules",
  age: 30,
};

writableObject.name = "Jules Verne"; // This is now allowed
*/

// @strict: true

type Thing = {
  value?: string | number;
};

declare const thing: Thing;
const { value = "123" } = thing;

enum E {
  test = value,
}

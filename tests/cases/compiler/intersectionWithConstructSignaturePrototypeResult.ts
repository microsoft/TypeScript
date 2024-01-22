// @strict: true
// @noEmit: true

declare class EmberObject {}

type PersonType = Readonly<typeof EmberObject> &
  (new (properties?: object) => {
    firstName: string;
    lastName: string;
  } & EmberObject) &
  (new (...args: any[]) => {
    firstName: string;
    lastName: string;
  } & EmberObject);

type PersonPrototype = PersonType["prototype"];

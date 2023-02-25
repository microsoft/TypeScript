// @strict: true
// @noEmit: true

declare class User {
  public name: string;
  public last: string;
  public age: number;
}

type AllowedNeeds<T> = {
  [K in keyof T as K & keyof User]: T[K];
};

declare function extend<T>(
  input: {
    [K in keyof T]: {
      needs: AllowedNeeds<T[K]>
      compute: (x: Pick<User, keyof T[K] & keyof User>) => any;
    };
  }
): T

const inferred1 = extend({
  fullName: {
    needs: {
      name: true,
      last: true,
    },
    compute: (user) => `${user.name} ${user.last}`,
  },
});

const inferred2 = extend({
  fullName: {
    needs: {
      last: true,
      doesntExist: true // error
    },
    compute: (user) => {},
  },
});

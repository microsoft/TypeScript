// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64593

class Entity {
    private secret = 1;
    protected hidden = 2;
    markChanged(field: string): void {}
}
class Account extends Entity {
    emailAddress = '';
}

declare function getAccount<T extends object = object>(): Readonly<Account & T>;
declare function getAccountPlain(): Readonly<Account & object>;

export const plain = getAccountPlain() as Account;
export const explicit = getAccount<object>() as Account;
export const inferred = getAccount() as Account;

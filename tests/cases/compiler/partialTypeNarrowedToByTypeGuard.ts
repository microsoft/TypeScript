// @strict: true
type Obj = {} | undefined;

type User = {
    email: string;
    name: string;
};

type PartialUser = Partial<User>;

// type PartialUser = {
//   email?: string;
//   name?: string;
// };

function isUser(obj: Obj): obj is PartialUser {
    return true;
}

function getUserName(obj: Obj) {
    if (isUser(obj)) {
        return obj.name;
    }

    return '';
}
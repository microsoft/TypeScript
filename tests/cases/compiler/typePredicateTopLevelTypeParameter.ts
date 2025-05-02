// @strict: true

// Repro from #51980

function getPermissions(user: string) {
    if (user === 'Jack') return 'admin';
    return undefined;
}

const admins = ['Mike', 'Joe'].map(e => getPermissions(e));

function isDefined<T>(a: T | undefined): a is T {
    return a !== undefined;
}

const foundAdmins = admins.filter(isDefined);  // "admin"[]

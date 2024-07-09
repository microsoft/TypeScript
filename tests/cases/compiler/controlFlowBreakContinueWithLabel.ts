// @strict: true

enum User { A, B }

let user: User = User.A

label: while (true) {
    switch (user) {
        case User.A:
            user = User.B;
            continue label;
        case User.B:
            break label;
    }
}
user;

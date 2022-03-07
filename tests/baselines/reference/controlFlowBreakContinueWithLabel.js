//// [controlFlowBreakContinueWithLabel.ts]
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


//// [controlFlowBreakContinueWithLabel.js]
"use strict";
var User;
(function (User) {
    User[User["A"] = 0] = "A";
    User[User["B"] = 1] = "B";
})(User || (User = {}));
var user = 0 /* User.A */;
label: while (true) {
    switch (user) {
        case 0 /* User.A */:
            user = 1 /* User.B */;
            continue label;
        case 1 /* User.B */:
            break label;
    }
}
user;

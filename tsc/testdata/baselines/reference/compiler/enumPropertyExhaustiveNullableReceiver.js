//// [tests/cases/compiler/enumPropertyExhaustiveNullableReceiver.ts] ////

//// [enumPropertyExhaustiveNullableReceiver.ts]
enum NotificationKind { Review, Comment }

declare function assertNever(value: never): never;

function notify(notification: { kind: NotificationKind } | null) {
    if (notification === null) return;
    switch (notification.kind) {
        case NotificationKind.Review: return;
        case NotificationKind.Comment: return;
        default: return assertNever(notification.kind);
    }
}


//// [enumPropertyExhaustiveNullableReceiver.js]
"use strict";
var NotificationKind;
(function (NotificationKind) {
    NotificationKind[NotificationKind["Review"] = 0] = "Review";
    NotificationKind[NotificationKind["Comment"] = 1] = "Comment";
})(NotificationKind || (NotificationKind = {}));
function notify(notification) {
    if (notification === null)
        return;
    switch (notification.kind) {
        case NotificationKind.Review: return;
        case NotificationKind.Comment: return;
        default: return assertNever(notification.kind);
    }
}

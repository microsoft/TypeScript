// @strict: true
// @target: es2015

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

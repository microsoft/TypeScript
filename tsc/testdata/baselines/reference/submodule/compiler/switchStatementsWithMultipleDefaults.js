//// [tests/cases/compiler/switchStatementsWithMultipleDefaults.ts] ////

//// [switchStatementsWithMultipleDefaults.ts]
var x = 10;

switch (x) {
    case 1:
    case 2:
    default:    // No issues.
        break;
    default:    // Error; second 'default' clause.
    default:    // Error; third 'default' clause.
    case 3:
        x *= x;
}

switch (x) {
    default:    // No issues.
        break;
    case 100:
        switch (x * x) {
            default:    // No issues.
            default:    // Error; second 'default' clause.
                break;
            case 10000:
                x /= x;
            default:    // Error, third 'default' clause
            def\u0061ult: // Error, fourth 'default' clause.
            // Errors on fifth-seventh
            default: return;
            default: default:
        }
}

//// [switchStatementsWithMultipleDefaults.js]
var x = 10;
switch (x) {
    case 1:
    case 2:
    default: // No issues.
        break;
    default: // Error; second 'default' clause.
    default: // Error; third 'default' clause.
    case 3:
        x *= x;
}
switch (x) {
    default: // No issues.
        break;
    case 100:
        switch (x * x) {
            default: // No issues.
            default: // Error; second 'default' clause.
                break;
            case 10000:
                x /= x;
            default: // Error, third 'default' clause
            default: // Error, fourth 'default' clause.
            // Errors on fifth-seventh
            default: return;
            default:
            default:
        }
}

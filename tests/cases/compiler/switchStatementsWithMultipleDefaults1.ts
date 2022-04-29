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
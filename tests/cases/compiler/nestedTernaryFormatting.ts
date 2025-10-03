// Test case for nested ternary indentation issue

// Current behavior (undesired):
var current = 
    0 ? 1 :
        2 ? 3 :
            4;

// Expected behavior (desired) after fix:
var expected = 
    0 ? 1 :
    2 ? 3 :
    4;

// More complex nested ternary case
var complex = 
    condition1 ? value1 :
    condition2 ? value2 :
    condition3 ? value3 :
    defaultValue;
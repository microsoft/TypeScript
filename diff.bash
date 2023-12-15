#!/bin/zsh

# Directory containing the test files
directory="./tests/baselines/local"

# Associative array to hold base names, extensions, and their corresponding files
typeset -A tests

# Loop over files in the directory with different extensions
for ext in js symbols types errors.txt trace.json; do
    for file in "$directory"/*\(module=*\).$ext; do
        # Extract the base test name by removing the parameter and extension parts
        base_name=${file%%\(module=*}

        # Add the file to the array for this base name and extension
        tests[$base_name,$ext]+="$file "
    done
done

# Loop over the test groups
for key in ${(k)tests}; do
    # Split the key into base name and extension
    base_name=${key%,*}
    ext=${key#*,}

    # Get all files for this test and extension
    files=(${(s: :)tests[$key]})

    # Compare each file with each other
    for (( i=1; i<=$#files; i++ )); do
        for (( j=i+1; j<=$#files; j++ )); do
            echo "Diffing $files[i] and $files[j]"
            diff "$files[i]" "$files[j]"
        done
    done
done

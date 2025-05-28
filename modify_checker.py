#!/usr/bin/env python3

# Read the file
with open('src/compiler/checker.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line to replace (should be around line 22489)
target_line = "            reportError(message, generalizedSourceType, targetType);\n"
replacement = """            // Check if both types are long and format differently for better readability
            if (message === Diagnostics.Type_0_is_not_assignable_to_type_1 &&
                generalizedSourceType.length > 30 && targetType.length > 30) {
                // Remove quotes from type strings and format with newlines  
                const sourceTypeUnquoted = generalizedSourceType.replace(/^'|'$/g, "");
                const targetTypeUnquoted = targetType.replace(/^'|'$/g, "");
                const customMessage = { 
                    ...message, 
                    message: `Type: \\n${sourceTypeUnquoted}\\n\\nis not assignable to type:\\n${targetTypeUnquoted}` 
                };
                reportError(customMessage);
            } else {
                reportError(message, generalizedSourceType, targetType);
            }
"""

# Replace the line
for i, line in enumerate(lines):
    if line == target_line:
        lines[i] = replacement + "\n"
        print(f"Replaced line {i+1}")
        break
else:
    print("Target line not found")

# Write the file back
with open('src/compiler/checker.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("File modified successfully") 
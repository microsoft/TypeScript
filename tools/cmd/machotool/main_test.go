package main

import "testing"

func TestVerifyEntitlements(t *testing.T) {
	t.Parallel()

	expected := `<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
	<plist><dict>
		<key>first</key><true/>
		<key>second</key><true/>
	</dict></plist>`

	for _, test := range []struct {
		name    string
		actual  string
		wantErr bool
	}{
		{
			name: "equivalent formatting and order",
			actual: `<plist>
				<dict>
					<key>second</key>
					<true></true>
					<key>extra</key><true/>
					<key>first</key>
					<true />
				</dict>
			</plist>`,
		},
		{
			name:    "missing",
			actual:  `<plist><dict><key>first</key><true/></dict></plist>`,
			wantErr: true,
		},
		{
			name:    "disabled",
			actual:  `<plist><dict><key>first</key><true/><key>second</key><false/></dict></plist>`,
			wantErr: true,
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			err := verifyEntitlements(test.actual, expected)
			if (err != nil) != test.wantErr {
				t.Fatalf("verifyEntitlements() error = %v, wantErr %v", err, test.wantErr)
			}
		})
	}
}

func TestVerifyEntitlementsRejectsNestedValue(t *testing.T) {
	t.Parallel()

	expected := `<plist><dict><key>first</key><true/></dict></plist>`
	actual := `<plist><dict><key>other</key><dict><key>first</key><true/></dict></dict></plist>`
	if err := verifyEntitlements(actual, expected); err == nil {
		t.Fatal("verifyEntitlements() succeeded for a nested entitlement")
	}
}

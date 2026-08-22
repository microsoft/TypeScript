package main

import "testing"

func TestVerifyEntitlements(t *testing.T) {
	t.Parallel()

	expected := `<plist><dict>
		<key>first</key><true/>
		<key>second</key><false/>
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
					<false></false>
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
			name:    "wrong value",
			actual:  `<plist><dict><key>first</key><true/><key>second</key><true/></dict></plist>`,
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

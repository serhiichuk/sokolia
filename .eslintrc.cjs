module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		project: true,
		tsconfigRootDir: __dirname,
		"ecmaFeatures": {
			"jsx": true,
		},
		"ecmaVersion": "latest",
		"sourceType": "module",
	},
	root: true,
	"plugins": ["react", "@typescript-eslint"],
	"rules": {
		"react/react-in-jsx-scope": "off",

		"quotes": "off",
		"@typescript-eslint/quotes": ["error", "single"],

		"indent": "off",
		"@typescript-eslint/indent": ["error", "tab"],

		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/consistent-type-imports": "error",
	},
	"ignorePatterns": ["dist"],
}

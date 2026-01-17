import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react"; // ← renamed for clarity
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended"; // ← shorter name
import reactCompiler from "eslint-plugin-react-compiler";
import unusedImports from "eslint-plugin-unused-imports"; // ← new
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "**/*.test.ts", "**/*.test.js", "**/*.test.tsx"]),

  // ────────────────────────────────────────────────
  // Main TypeScript + React config
  // ────────────────────────────────────────────────
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat?.recommended ?? reactHooks.configs.recommended, // safer
      reactRefresh.configs.vite,
      prettier, // must come after other extends that set formatting rules
    ],

    languageOptions: {
      parser: tseslint.parser, // ← important for TS + flat config
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-compiler": reactCompiler,
      "unused-imports": unusedImports,
      import: importPlugin,
    },

    rules: {
      // Let unused-imports plugin handle imports + auto-fix
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "unused-imports/no-unused-imports": "error", // ← removes whole unused import lines on --fix
      "unused-imports/no-unused-vars": "warn", // ← reports unused vars (no auto-fix)

      // Your existing rules (cleaned up a bit)
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules, // ← needed in React 17+
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react-compiler/react-compiler": "error",

      "max-len": [
        "warn",
        {
          code: 300,
          tabWidth: 2,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreComments: true,
          ignorePattern: 'class(Name)?=".*?"', // Tailwind ignore
        },
      ],

      "prettier/prettier": ["error", { endOfLine: "lf" }],

      "@typescript-eslint/no-misused-spread": "off",
      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

      // TODO: temporarily commented out, needs to be restored
      // "@typescript-eslint/explicit-function-return-type": "warn",

      "@typescript-eslint/explicit-member-accessibility": [
        "warn",
        { accessibility: "explicit", overrides: { constructors: "off" } },
      ],

      "import/order": [
        "warn", // or "error" if you want it strict
        {
          groups: [
            "builtin", // node:fs, node:path
            "external", // react, lodash, ...
            "internal", // ~/utils, @/components (if you use aliases)
            "parent",
            "sibling",
            "index",
            "object",
            "type", // type imports last
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
  },
]);

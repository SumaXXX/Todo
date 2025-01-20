import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import js from "@eslint/js";
import errors from "eslint-plugin-import/config/errors.js";
import warnings from "eslint-plugin-import/config/warnings.js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  errors,
  warnings,



  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser,browser: true,
    es2021: true, } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // env: {
    //   browser: true,
    //   es2021: true,
    // },
   

    ignores: ["node_modules", "dist", "build"],
    // extends: [
    //   "eslint:recommended",
    //   "plugin:react/recommended",
    //   "plugin:prettier/recommended",
    //   "plugin:import/errors",
    //   "plugin:import/warnings",
    // ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    // plugins: ["react", "prettier", "import"],
    rules: {
      indent: ["error", 2],
      "prettier/prettier": "error",
      "linebreak-style": [0, "unix"],
      quotes: ["error", "single"],
      semi: ["error", "never"],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": 0,
      "import/no-unresolved": [2, { caseSensitive: false }],
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
      "import/order": [
        2,
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          "max-len": ["error", 140]
        },
      ],
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src/"],
        },
      },
    },
  },
];

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    // "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prefer-const": "off", //是否强制const
    "@typescript-eslint/no-explicit-any": "off", //是否禁止any类型
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin", // Node.js内置模块
          "external", // 第三方模块
          "internal", // 应用程序内部的模块
          "parent", // 父级目录中导入的模块
          ["sibling", "index"], // 具有相同或更高目录的兄弟模块
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
          },
          {
            pattern: "#/**",
            group: "type",
          },
          {
            pattern: "*.{scss,css,less,styl,stylus}",
            group: "parent",
          },
          {
            pattern: "*.{js,jsx,ts,tsx}",
            group: "sibling",
          },
        ],
        "newlines-between": "always", // 在组之间插入空行
        pathGroupsExcludedImportTypes: ["sibling", "index"],
        warnOnUnassignedImports: true,
        alphabetize: { order: "asc", caseInsensitive: true }, // 对于每个组，按字母表顺序排序。
      },
    ],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
    },
  },
};

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },


 {
    rules: {
       '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'no-empty': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },


];

export default eslintConfig;

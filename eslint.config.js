import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'public/**',
    'fisk/**',
    'freelancer/**',
    'scratch/**',
    'src/projects/**/lib/**',
    'src/projects/**/js/**',
    'src/projects/**/css/**',
    'src/projects/**/data/**',
    'scripts/**',
    'temp_start.js',
    'move_01.cjs',
    'add_images.py',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true, allowExportNames: ['useLang', 'LangContext'] },
      ],
    },
  },
])

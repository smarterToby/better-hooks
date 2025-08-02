import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import securityPlugin from 'eslint-plugin-security'
import prettier from 'eslint-plugin-prettier';

import tseslint from 'typescript-eslint'
import {globalIgnores} from 'eslint/config'

export default tseslint.config([globalIgnores(['dist']), {
    files: ['**/*.{ts,tsx}'],
    extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        securityPlugin.configs.recommended,
        {
            plugins: {
                prettier,
            }, rules: {
                'prettier/prettier': [
                    1, {
                        endOfLine: 'lf',
                        printWidth: 120,
                        semi: true, singleQuote: true,
                        tabWidth: 2,
                        trailingComma: 'es5',
                    },],
                'semi': ['error', 'always'],
            },

        },],
    languageOptions: {
        ecmaVersion: 2020, globals: globals.browser,
    },
},])

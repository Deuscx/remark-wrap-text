// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    pnpm: true,
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
)

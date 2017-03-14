> Integrate flowtype with eslint

# eslint-plugin-flow-check [![stability][0]][1]

[![npm version][2]][3]


* 💯 Integrating with eslint means integrating with everything
* 💪 Use one tool to check and lint your code
* 👀 Check only files you care about

## Installation

```shell
npm install --save-dev eslint \
  eslint-babel \
  eslint-plugin-flow-check
```

## Usage

Configure eslint to use `babel-eslint` and `eslint-plugin-flow-check`.
Make sure to enable the plugin via its rule.

```json
{
  "eslintConfig": {
    "rules": {
      "flow/check": 2
    },
    "parser": "babel-eslint",
    "plugins": ["flow"]
  }
}
```

Create a `.flowconfig` in your project root. See the [flow-type docs](https://flowtype.org/docs/advanced-configuration.html) for details.

```
flow init
```

Add the flow pragma to all files you want to typecheck.

```js
// @flow
```

---
Built by (c) marionebl. Released under the MIT license.


[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/eslint-plugin-flow-check.svg?style=flat-square
[3]: https://npmjs.org/package/eslint-plugin-flow-check

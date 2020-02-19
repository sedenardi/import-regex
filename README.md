# esm-import-regex
Regular expressions for matching ESM import statements.

## Installation

```
npm i esm-import-regex
```

### Usage

```js
const importRegex = require('esm-import-regex');
const regex1 = importRegex();
console.log(regex1.exec('import defaultMember from "module-name";'));
// [
//   'import defaultMember from "module-name";',
//   'defaultMember ',
//   'module-name',
//   index: 0,
//   input: 'import defaultMember from "module-name";',
//   groups: undefined
// ]

const regex2 = importRegex();
console.log(regex2.exec('import \'module-name\''));
// [
//   "import 'module-name'",
//   undefined,
//   'module-name',
//   index: 0,
//   input: "import 'module-name'",
//   groups: undefined
// ]
```

**Match results**

* `0` - full match
* `1` - entire export statement if present 
* `2` - module to import from

## Tests
Tests validate parsing all the [MDN `import` examples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Syntax).

```js
npm run test
```

## License
MIT

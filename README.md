# base-type-guard

Fast and simple type guard utility library written in TypeScript.

## Installation

```bash
npm install base-type-guard
```

## Usage TS
```ts
import { isNumeric, isArray, isEmpty } from 'base-type-guard';

isNumeric("123"); // true
isArray([1, 2]);  // true
isEmpty({});      // true
```

## Usage JS
```javascript
const { isNumeric, isArray, isEmpty } = require('base-type-guard');

isNumeric("123"); // true
isArray([1, 2]);  // true
isEmpty({});      // true
```
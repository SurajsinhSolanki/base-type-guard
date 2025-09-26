# base-type-guard

A comprehensive type guard utility library for TypeScript projects. This library provides fast, reliable type checking functions that help narrow TypeScript types at compile-time and runtime, making your code safer and more maintainable.

## Features

- **Type-Safe**: All functions are type guards (`value is T`) that narrow types in TypeScript
- **Comprehensive**: Covers primitives, objects, arrays, Maps, Sets, Promises, and more
- **Runtime Safety**: Functions work at runtime for validation beyond compile-time checks
- **Zero Dependencies**: Lightweight with no external dependencies
- **Well-Documented**: Detailed JSDoc comments for better IDE support

## Installation

```bash
npm install base-type-guard
```

## Usage in TypeScript

Import individual functions or the entire library:

```ts
import { isNumeric, isArray, isEmpty, isEmail } from 'base-type-guard';

// Type narrowing with type guards
const processValue = (value: unknown) => {
  if (isNumeric(value)) {
    // TypeScript knows 'value' is number | string here
    console.log('Numeric value:', value);
  } else if (isArray(value)) {
    // TypeScript knows 'value' is array here
    console.log('Array length:', value.length);
  }
};

// Advanced validations
console.log(isEmail('user@example.com')); // true
console.log(isEmpty({}));                  // true
```

## Usage in JavaScript

```javascript
const { isNumeric, isArray, isEmpty } = require('base-type-guard');

console.log(isNumeric("123")); // true
console.log(isArray([1, 2]));  // true
console.log(isEmpty({}));      // true
```

## API Reference

### Basic Type Checkers

- `isString(value)`: Checks if value is a string
- `isNonEmptyString(value)`: Checks if value is a non-empty string (after trimming)
- `isNumber(value)`: Checks if value is a finite number (excludes NaN, Infinity)
- `isInteger(value)`: Checks if value is an integer
- `isPositiveNumber(value)`: Checks if value is a positive finite number
- `isNumeric(value)`: Checks if value is a finite number or numeric string
- `isBoolean(value)`: Checks if value is a boolean
- `isBigInt(value)`: Checks if value is a bigint
- `isSymbol(value)`: Checks if value is a symbol

### Complex Type Checkers

- `isArray<T>(value)`: Checks if value is an array
- `isNonEmptyArray<T>(value)`: Checks if value is a non-empty array
- `isObject(value)`: Checks if value is a plain object (not array, Date, RegExp, etc.)
- `isNonEmptyObject(value)`: Checks if value is a plain object with properties
- `isDate(value)`: Checks if value is a valid Date object
- `isRegExp(value)`: Checks if value is a RegExp
- `isMap<K, V>(value)`: Checks if value is a Map
- `isSet<T>(value)`: Checks if value is a Set
- `isFunction(value)`: Checks if value is a function
- `isAsyncFunction(value)`: Checks if value is an async function
- `isPromise<T>(value)`: Checks if value is a Promise or promise-like

### Null/Undefined Checkers

- `isNull(value)`: Checks if value is null
- `isUndefined(value)`: Checks if value is undefined
- `isNullish(value)`: Checks if value is null or undefined
- `isDefined<T>(value)`: Type guard that excludes null and undefined

### Emptiness Checkers

- `isEmpty(value)`: Checks if value is empty (handles strings, arrays, objects, Maps, Sets)
- `isNotEmpty(value)`: Checks if value is not empty

### Advanced Type Checkers

- `isUrl(value)`: Checks if value is a valid URL string
- `isEmail(value)`: Basic email validation (use external libraries for stricter checks)
- `isUuid(value)`: Checks if value is a valid UUID string
- `isPrimitive(value)`: Checks if value is a primitive type
- `isJsonSerializable(value)`: Checks if value can be serialized to JSON

### Utility Functions

- `getType(value)`: Returns the string representation of the value's type
- `assertType<T>(value, predicate, message?)`: Asserts type at runtime with custom error message

### Composite Checkers

- `isArrayOf<T>(value, predicate)`: Checks if all array items match a predicate
- `isStringArray(value)`: Checks if value is an array of strings
- `isNumberArray(value)`: Checks if value is an array of numbers
- `isOneOf<T>(...predicates)`: Creates a union type checker from multiple predicates

## Examples

### Type Guarding with Conditionals

```ts
type UserInput = string | number | null;

function processInput(input: UserInput) {
  if (isDefined(input)) {
    // input is now string | number
    if (isString(input)) {
      console.log('String input:', input.toUpperCase());
    } else if (isNumber(input)) {
      console.log('Number input:', input * 2);
    }
  } else {
    console.log('Input is null or undefined');
  }
}
```

### Validation Arrays

```ts
const data = [1, 'hello', 3.14, null];

const validNumbers = data.filter(isNumber); // [1, 3.14]
const validStrings = data.filter(isNonEmptyString); // ['hello']
```

### Advanced Validation

```ts
interface User {
  id: string;
  email: string;
  name: string;
}

function validateUser(data: unknown): data is User {
  return (
    isObject(data) &&
    isUuid(data.id) &&
    isEmail(data.email) &&
    isNonEmptyString(data.name)
  );
}

const userData = { id: '123e4567-e89b-12d3-a456-426614174000', email: 'user@example.com', name: 'John' };
console.log(validateUser(userData)); // true
```

### Using isArrayOf

```ts
const mixedArray = ['a', 1, 'b', 2];
const stringArray = ['hello', 'world'];
const numberArray = [1, 2, 3];

console.log(isArrayOf(mixedArray, isString)); // false
console.log(isArrayOf(stringArray, isString)); // true
console.log(isArrayOf(numberArray, isNumber)); // true
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes strict type checking for best results:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

## Contributing

Contributions are welcome! Please ensure all new functions include proper JSDoc comments, type guards where appropriate, and comprehensive tests.

## License

MIT License - see LICENSE file for details.

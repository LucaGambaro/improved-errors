# Improved Errors Package

## Overview

The `IError` package provides a structured way to handle errors in your application. It allows you to create detailed error objects that can include metadata and nested causes, making it easier to track and debug errors.

## Features

- Create detailed error objects with a message, metadata, and nested causes.
- Retrieve a full error structure object that includes all nested error details.

## Installation

To install the `IError` package, use npm or yarn:

```bash
npm install ierror-package
```

or

```bash
yarn add ierror-package
```

## Usage

### Importing the Package

```typescript
import { IError } from "ierror-package";
```

### Creating an Error Object

You can create an IError object by providing an error message:

```typescript
const error = new IError("An unexpected error occurred");
```

### Adding Metadata

dd metadata to the error object using the addMetadata method:

```typescript
error.addMetadata({ key: "value" });
```

### Adding Causes

Add causes to the error object using the addCauses method. The causes can be any unknown type, and they will be converted to IError objects:

```typescript
const cause = new IError("Cause of the error");
error.addCauses(cause);
```

### Retrieving the Full Error Object

Get the complete error object, including all nested details, using the returnFullStructure method:

```typescript
const fullError = error.returnFullStructure();
console.log(fullError);
```

Example output:

```typescript
{
  "message": "Third Error",
  "metadata": {
    "mockMetadataThirdError": true
  },
  "causes": [
    {
      "message": "Second Error",
      "metadata": {
        "mockMetadataSecondError": "test"
      },
      "causes": [
        {
          "causes": undefined,
          "message": "First Error",
          "metadata": undefined
        }
      ]
    }
  ]
}
```


### Usage Example
```typescript
import { IError } from 'ierror-package';

const mainError = new IError('Main error occurred');
mainError.addMetadata({ userId: 12345 });

const causeError1 = new IError('First cause of the main error');
const causeError2 = new IError('Second cause of the main error').addMetadata({ info: 'Additional info' });

mainError.addCauses([causeError1, causeError2]);

const fullError = mainError.returnFullStructure();
console.log(fullError);
```

Response Output:
```typescript
{
  "message": "Main error occurred",
  "metadata": { "userId": 12345 },
  "causes": [
    { "message": "First cause of the main error" },
    {
      "message": "Second cause of the main error",
      "metadata": { "info": "Additional info" }
    }
  ]
}
```
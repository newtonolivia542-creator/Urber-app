# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyRides*](#getmyrides)
- [**Mutations**](#mutations)
  - [*CreateDemoUser*](#createdemouser)
  - [*RequestRide*](#requestride)
  - [*UpdateDriverVehicle*](#updatedrivervehicle)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyRides
You can execute the `GetMyRides` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyRides(): QueryPromise<GetMyRidesData, undefined>;

interface GetMyRidesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyRidesData, undefined>;
}
export const getMyRidesRef: GetMyRidesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyRides(dc: DataConnect): QueryPromise<GetMyRidesData, undefined>;

interface GetMyRidesRef {
  ...
  (dc: DataConnect): QueryRef<GetMyRidesData, undefined>;
}
export const getMyRidesRef: GetMyRidesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyRidesRef:
```typescript
const name = getMyRidesRef.operationName;
console.log(name);
```

### Variables
The `GetMyRides` query has no variables.
### Return Type
Recall that executing the `GetMyRides` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyRidesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyRidesData {
  rides: ({
    id: UUIDString;
    pickupLocation: {
      address: string;
    };
      dropoffLocation: {
        address: string;
      };
        fare?: number | null;
        status: string;
  } & Ride_Key)[];
}
```
### Using `GetMyRides`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyRides } from '@dataconnect/generated';


// Call the `getMyRides()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyRides();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyRides(dataConnect);

console.log(data.rides);

// Or, you can use the `Promise` API.
getMyRides().then((response) => {
  const data = response.data;
  console.log(data.rides);
});
```

### Using `GetMyRides`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyRidesRef } from '@dataconnect/generated';


// Call the `getMyRidesRef()` function to get a reference to the query.
const ref = getMyRidesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyRidesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rides);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rides);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateDemoUser
You can execute the `CreateDemoUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDemoUser(): MutationPromise<CreateDemoUserData, undefined>;

interface CreateDemoUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDemoUserData, undefined>;
}
export const createDemoUserRef: CreateDemoUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDemoUser(dc: DataConnect): MutationPromise<CreateDemoUserData, undefined>;

interface CreateDemoUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateDemoUserData, undefined>;
}
export const createDemoUserRef: CreateDemoUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDemoUserRef:
```typescript
const name = createDemoUserRef.operationName;
console.log(name);
```

### Variables
The `CreateDemoUser` mutation has no variables.
### Return Type
Recall that executing the `CreateDemoUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDemoUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDemoUserData {
  user_insert: User_Key;
}
```
### Using `CreateDemoUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDemoUser } from '@dataconnect/generated';


// Call the `createDemoUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDemoUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDemoUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createDemoUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateDemoUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDemoUserRef } from '@dataconnect/generated';


// Call the `createDemoUserRef()` function to get a reference to the mutation.
const ref = createDemoUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDemoUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## RequestRide
You can execute the `RequestRide` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
requestRide(vars: RequestRideVariables): MutationPromise<RequestRideData, RequestRideVariables>;

interface RequestRideRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequestRideVariables): MutationRef<RequestRideData, RequestRideVariables>;
}
export const requestRideRef: RequestRideRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
requestRide(dc: DataConnect, vars: RequestRideVariables): MutationPromise<RequestRideData, RequestRideVariables>;

interface RequestRideRef {
  ...
  (dc: DataConnect, vars: RequestRideVariables): MutationRef<RequestRideData, RequestRideVariables>;
}
export const requestRideRef: RequestRideRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the requestRideRef:
```typescript
const name = requestRideRef.operationName;
console.log(name);
```

### Variables
The `RequestRide` mutation requires an argument of type `RequestRideVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RequestRideVariables {
  pickupLocationId: UUIDString;
  dropoffLocationId: UUIDString;
}
```
### Return Type
Recall that executing the `RequestRide` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RequestRideData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RequestRideData {
  ride_insert: Ride_Key;
}
```
### Using `RequestRide`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, requestRide, RequestRideVariables } from '@dataconnect/generated';

// The `RequestRide` mutation requires an argument of type `RequestRideVariables`:
const requestRideVars: RequestRideVariables = {
  pickupLocationId: ..., 
  dropoffLocationId: ..., 
};

// Call the `requestRide()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await requestRide(requestRideVars);
// Variables can be defined inline as well.
const { data } = await requestRide({ pickupLocationId: ..., dropoffLocationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await requestRide(dataConnect, requestRideVars);

console.log(data.ride_insert);

// Or, you can use the `Promise` API.
requestRide(requestRideVars).then((response) => {
  const data = response.data;
  console.log(data.ride_insert);
});
```

### Using `RequestRide`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, requestRideRef, RequestRideVariables } from '@dataconnect/generated';

// The `RequestRide` mutation requires an argument of type `RequestRideVariables`:
const requestRideVars: RequestRideVariables = {
  pickupLocationId: ..., 
  dropoffLocationId: ..., 
};

// Call the `requestRideRef()` function to get a reference to the mutation.
const ref = requestRideRef(requestRideVars);
// Variables can be defined inline as well.
const ref = requestRideRef({ pickupLocationId: ..., dropoffLocationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = requestRideRef(dataConnect, requestRideVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ride_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ride_insert);
});
```

## UpdateDriverVehicle
You can execute the `UpdateDriverVehicle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateDriverVehicle(vars: UpdateDriverVehicleVariables): MutationPromise<UpdateDriverVehicleData, UpdateDriverVehicleVariables>;

interface UpdateDriverVehicleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDriverVehicleVariables): MutationRef<UpdateDriverVehicleData, UpdateDriverVehicleVariables>;
}
export const updateDriverVehicleRef: UpdateDriverVehicleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDriverVehicle(dc: DataConnect, vars: UpdateDriverVehicleVariables): MutationPromise<UpdateDriverVehicleData, UpdateDriverVehicleVariables>;

interface UpdateDriverVehicleRef {
  ...
  (dc: DataConnect, vars: UpdateDriverVehicleVariables): MutationRef<UpdateDriverVehicleData, UpdateDriverVehicleVariables>;
}
export const updateDriverVehicleRef: UpdateDriverVehicleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDriverVehicleRef:
```typescript
const name = updateDriverVehicleRef.operationName;
console.log(name);
```

### Variables
The `UpdateDriverVehicle` mutation requires an argument of type `UpdateDriverVehicleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateDriverVehicleVariables {
  vehicleId: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateDriverVehicle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDriverVehicleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDriverVehicleData {
  user_update?: User_Key | null;
  vehicle_update?: Vehicle_Key | null;
}
```
### Using `UpdateDriverVehicle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDriverVehicle, UpdateDriverVehicleVariables } from '@dataconnect/generated';

// The `UpdateDriverVehicle` mutation requires an argument of type `UpdateDriverVehicleVariables`:
const updateDriverVehicleVars: UpdateDriverVehicleVariables = {
  vehicleId: ..., 
};

// Call the `updateDriverVehicle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDriverVehicle(updateDriverVehicleVars);
// Variables can be defined inline as well.
const { data } = await updateDriverVehicle({ vehicleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDriverVehicle(dataConnect, updateDriverVehicleVars);

console.log(data.user_update);
console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
updateDriverVehicle(updateDriverVehicleVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
  console.log(data.vehicle_update);
});
```

### Using `UpdateDriverVehicle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDriverVehicleRef, UpdateDriverVehicleVariables } from '@dataconnect/generated';

// The `UpdateDriverVehicle` mutation requires an argument of type `UpdateDriverVehicleVariables`:
const updateDriverVehicleVars: UpdateDriverVehicleVariables = {
  vehicleId: ..., 
};

// Call the `updateDriverVehicleRef()` function to get a reference to the mutation.
const ref = updateDriverVehicleRef(updateDriverVehicleVars);
// Variables can be defined inline as well.
const ref = updateDriverVehicleRef({ vehicleId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDriverVehicleRef(dataConnect, updateDriverVehicleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);
console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
  console.log(data.vehicle_update);
});
```


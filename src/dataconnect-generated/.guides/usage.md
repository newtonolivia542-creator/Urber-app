# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createDemoUser, getMyRides, requestRide, updateDriverVehicle } from '@dataconnect/generated';


// Operation CreateDemoUser: 
const { data } = await CreateDemoUser(dataConnect);

// Operation GetMyRides: 
const { data } = await GetMyRides(dataConnect);

// Operation RequestRide:  For variables, look at type RequestRideVars in ../index.d.ts
const { data } = await RequestRide(dataConnect, requestRideVars);

// Operation UpdateDriverVehicle:  For variables, look at type UpdateDriverVehicleVars in ../index.d.ts
const { data } = await UpdateDriverVehicle(dataConnect, updateDriverVehicleVars);


```
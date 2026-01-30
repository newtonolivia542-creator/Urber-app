import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'urber-app',
  location: 'us-east4'
};

export const createDemoUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDemoUser');
}
createDemoUserRef.operationName = 'CreateDemoUser';

export function createDemoUser(dc) {
  return executeMutation(createDemoUserRef(dc));
}

export const getMyRidesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyRides');
}
getMyRidesRef.operationName = 'GetMyRides';

export function getMyRides(dc) {
  return executeQuery(getMyRidesRef(dc));
}

export const requestRideRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequestRide', inputVars);
}
requestRideRef.operationName = 'RequestRide';

export function requestRide(dcOrVars, vars) {
  return executeMutation(requestRideRef(dcOrVars, vars));
}

export const updateDriverVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDriverVehicle', inputVars);
}
updateDriverVehicleRef.operationName = 'UpdateDriverVehicle';

export function updateDriverVehicle(dcOrVars, vars) {
  return executeMutation(updateDriverVehicleRef(dcOrVars, vars));
}


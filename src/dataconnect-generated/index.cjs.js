const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'urber-app',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createDemoUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDemoUser');
}
createDemoUserRef.operationName = 'CreateDemoUser';
exports.createDemoUserRef = createDemoUserRef;

exports.createDemoUser = function createDemoUser(dc) {
  return executeMutation(createDemoUserRef(dc));
};

const getMyRidesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyRides');
}
getMyRidesRef.operationName = 'GetMyRides';
exports.getMyRidesRef = getMyRidesRef;

exports.getMyRides = function getMyRides(dc) {
  return executeQuery(getMyRidesRef(dc));
};

const requestRideRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequestRide', inputVars);
}
requestRideRef.operationName = 'RequestRide';
exports.requestRideRef = requestRideRef;

exports.requestRide = function requestRide(dcOrVars, vars) {
  return executeMutation(requestRideRef(dcOrVars, vars));
};

const updateDriverVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDriverVehicle', inputVars);
}
updateDriverVehicleRef.operationName = 'UpdateDriverVehicle';
exports.updateDriverVehicleRef = updateDriverVehicleRef;

exports.updateDriverVehicle = function updateDriverVehicle(dcOrVars, vars) {
  return executeMutation(updateDriverVehicleRef(dcOrVars, vars));
};

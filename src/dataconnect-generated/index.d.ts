import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateDemoUserData {
  user_insert: User_Key;
}

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

export interface Location_Key {
  id: UUIDString;
  __typename?: 'Location_Key';
}

export interface PaymentMethod_Key {
  id: UUIDString;
  __typename?: 'PaymentMethod_Key';
}

export interface RequestRideData {
  ride_insert: Ride_Key;
}

export interface RequestRideVariables {
  pickupLocationId: UUIDString;
  dropoffLocationId: UUIDString;
}

export interface Ride_Key {
  id: UUIDString;
  __typename?: 'Ride_Key';
}

export interface UpdateDriverVehicleData {
  user_update?: User_Key | null;
  vehicle_update?: Vehicle_Key | null;
}

export interface UpdateDriverVehicleVariables {
  vehicleId: UUIDString;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Vehicle_Key {
  id: UUIDString;
  __typename?: 'Vehicle_Key';
}

interface CreateDemoUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDemoUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDemoUserData, undefined>;
  operationName: string;
}
export const createDemoUserRef: CreateDemoUserRef;

export function createDemoUser(): MutationPromise<CreateDemoUserData, undefined>;
export function createDemoUser(dc: DataConnect): MutationPromise<CreateDemoUserData, undefined>;

interface GetMyRidesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyRidesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyRidesData, undefined>;
  operationName: string;
}
export const getMyRidesRef: GetMyRidesRef;

export function getMyRides(): QueryPromise<GetMyRidesData, undefined>;
export function getMyRides(dc: DataConnect): QueryPromise<GetMyRidesData, undefined>;

interface RequestRideRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequestRideVariables): MutationRef<RequestRideData, RequestRideVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RequestRideVariables): MutationRef<RequestRideData, RequestRideVariables>;
  operationName: string;
}
export const requestRideRef: RequestRideRef;

export function requestRide(vars: RequestRideVariables): MutationPromise<RequestRideData, RequestRideVariables>;
export function requestRide(dc: DataConnect, vars: RequestRideVariables): MutationPromise<RequestRideData, RequestRideVariables>;

interface UpdateDriverVehicleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDriverVehicleVariables): MutationRef<UpdateDriverVehicleData, UpdateDriverVehicleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateDriverVehicleVariables): MutationRef<UpdateDriverVehicleData, UpdateDriverVehicleVariables>;
  operationName: string;
}
export const updateDriverVehicleRef: UpdateDriverVehicleRef;

export function updateDriverVehicle(vars: UpdateDriverVehicleVariables): MutationPromise<UpdateDriverVehicleData, UpdateDriverVehicleVariables>;
export function updateDriverVehicle(dc: DataConnect, vars: UpdateDriverVehicleVariables): MutationPromise<UpdateDriverVehicleData, UpdateDriverVehicleVariables>;


/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['SanitizedUser']; // SanitizedUser!
  }
  Mutation: {};
  Query: {};
  SanitizedUser: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  Track: { // root type
    creationDate: string; // String!
    externalId: string; // String!
    isrc: string; // String!
    length: string; // String!
    productionDate: string; // String!
    title: string; // String!
    type: string; // String!
    updateDate: string; // String!
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    password: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['SanitizedUser']; // SanitizedUser!
  }
  Mutation: { // field return type
    deleteTrack: NexusGenRootTypes['Track'] | null; // Track
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    updateTrack: NexusGenRootTypes['Track']; // Track!
  }
  Query: { // field return type
    fetchTracks: Array<NexusGenRootTypes['Track'] | null>; // [Track]!
    searchTrackByInternalId: NexusGenRootTypes['Track'] | null; // Track
    searchTrackByTitle: Array<NexusGenRootTypes['Track'] | null>; // [Track]!
  }
  SanitizedUser: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  Track: { // field return type
    creationDate: string; // String!
    externalId: string; // String!
    isrc: string; // String!
    length: string; // String!
    productionDate: string; // String!
    title: string; // String!
    type: string; // String!
    updateDate: string; // String!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    password: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'SanitizedUser'
  }
  Mutation: { // field return type name
    deleteTrack: 'Track'
    login: 'AuthPayload'
    signup: 'AuthPayload'
    updateTrack: 'Track'
  }
  Query: { // field return type name
    fetchTracks: 'Track'
    searchTrackByInternalId: 'Track'
    searchTrackByTitle: 'Track'
  }
  SanitizedUser: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
  }
  Track: { // field return type name
    creationDate: 'String'
    externalId: 'String'
    isrc: 'String'
    length: 'String'
    productionDate: 'String'
    title: 'String'
    type: 'String'
    updateDate: 'String'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    password: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    deleteTrack: { // args
      internalId?: number | null; // Int
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    updateTrack: { // args
      creationDate?: string | null; // String
      internalId?: string | null; // String
      isrc?: string | null; // String
      length?: string | null; // String
      productionDate?: string | null; // String
      title?: string | null; // String
      type?: string | null; // String
      updateDate?: string | null; // String
    }
  }
  Query: {
    searchTrackByInternalId: { // args
      internalId: number; // Int!
    }
    searchTrackByTitle: { // args
      title: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}
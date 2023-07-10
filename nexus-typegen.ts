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
  Mutation: {};
  Query: {};
  Track: { // root type
    creationDate: string; // String!
    id: number; // Int!
    isrc: string; // String!
    length: number; // Int!
    productionDate: string; // String!
    title: string; // String!
    type: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createTrack: NexusGenRootTypes['Track']; // Track!
    deleteTrack: NexusGenRootTypes['Track']; // Track!
    updateTrack: NexusGenRootTypes['Track']; // Track!
  }
  Query: { // field return type
    fetchTracks: NexusGenRootTypes['Track'][]; // [Track!]!
    getTrack: NexusGenRootTypes['Track'] | null; // Track
  }
  Track: { // field return type
    creationDate: string; // String!
    id: number; // Int!
    isrc: string; // String!
    length: number; // Int!
    productionDate: string; // String!
    title: string; // String!
    type: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createTrack: 'Track'
    deleteTrack: 'Track'
    updateTrack: 'Track'
  }
  Query: { // field return type name
    fetchTracks: 'Track'
    getTrack: 'Track'
  }
  Track: { // field return type name
    creationDate: 'String'
    id: 'Int'
    isrc: 'String'
    length: 'Int'
    productionDate: 'String'
    title: 'String'
    type: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createTrack: { // args
      creationDate: string; // String!
      isrc: string; // String!
      length: number; // Int!
      productionDate: string; // String!
      title: string; // String!
      type: string; // String!
    }
    deleteTrack: { // args
      id: number; // Int!
    }
    updateTrack: { // args
      creationDate?: string | null; // String
      id: number; // Int!
      isrc?: string | null; // String
      length?: string | null; // String
      productionDate?: string | null; // String
      title?: string | null; // String
      type?: string | null; // String
    }
  }
  Query: {
    getTrack: { // args
      id: number; // Int!
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
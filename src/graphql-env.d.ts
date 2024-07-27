/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: 'Subscription';
  types: {
    'Boolean': unknown;
    'ImpostorInfo': { kind: 'OBJECT'; name: 'ImpostorInfo'; fields: { 'dummy': { name: 'dummy'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Int': unknown;
    'Language': { name: 'Language'; enumValues: 'en' | 'fr'; };
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'createRoom': { name: 'createRoom'; type: { kind: 'OBJECT'; name: 'Room'; ofType: null; } }; 'joinRoom': { name: 'joinRoom'; type: { kind: 'OBJECT'; name: 'Room'; ofType: null; } }; 'leaveRoom': { name: 'leaveRoom'; type: { kind: 'OBJECT'; name: 'Room'; ofType: null; } }; 'startGame': { name: 'startGame'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; }; };
    'Player': { kind: 'OBJECT'; name: 'Player'; fields: { 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'room': { name: 'room'; type: { kind: 'OBJECT'; name: 'Room'; ofType: null; } }; }; };
    'RegularInfo': { kind: 'OBJECT'; name: 'RegularInfo'; fields: { 'isFirstPlayer': { name: 'isFirstPlayer'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'word': { name: 'word'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'RoleInfo': { kind: 'UNION'; name: 'RoleInfo'; fields: {}; possibleTypes: 'ImpostorInfo' | 'RegularInfo'; };
    'Room': { kind: 'OBJECT'; name: 'Room'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'language': { name: 'language'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'ENUM'; name: 'Language'; ofType: null; }; } }; 'players': { name: 'players'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Player'; ofType: null; }; }; }; } }; }; };
    'String': unknown;
    'Subscription': { kind: 'OBJECT'; name: 'Subscription'; fields: { 'gameStarted': { name: 'gameStarted'; type: { kind: 'UNION'; name: 'RoleInfo'; ofType: null; } }; 'roomUpdated': { name: 'roomUpdated'; type: { kind: 'OBJECT'; name: 'Room'; ofType: null; } }; }; };
  };
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class Todo extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  _owner_id!: Realm.BSON.ObjectId; // old, ignore
  _real_owner_id!: string;
  description!: string;
  completed: boolean = false;
  createdAt!: Date;

  static schema = {
    name: 'Todo',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      _owner_id: 'objectId',
      _real_owner_id: 'string',
      description: 'string',
      completed: {type: 'bool', default: false},
      createdAt: 'date',
    },
  };
}

export const todoContext = createRealmContext({
  schema: [Todo],
});

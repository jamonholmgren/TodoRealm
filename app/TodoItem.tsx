import React, {useCallback} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import Realm from 'realm';

import {Todo, todoContext} from './realm';
const {useRealm} = todoContext;

export const TodoItem = ({item}: {item: Todo & Realm.Object}) => {
  const realm = useRealm();

  const deleteTodo = useCallback(() => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            realm.write(() => {
              realm.delete(item);
            });
          },
        },
      ],
      {cancelable: false},
    );
  }, [realm, item]);

  const toggleCompleted = useCallback(() => {
    realm.write(() => {
      item.completed = !item.completed;
    });
  }, [realm, item]);

  return (
    <Pressable
      style={{flexDirection: 'row', paddingVertical: 14}}
      onPress={toggleCompleted}
      onLongPress={deleteTodo}>
      <Text style={{fontSize: 24, paddingRight: 10}}>
        {item.completed ? '☑️' : '🔲'}
      </Text>
      <Text
        style={{
          fontSize: 24,
          color: item.completed ? '#AAAAAA' : '#000000',
          textDecorationLine: item.completed ? 'line-through' : 'none',
        }}>
        {item.description}
      </Text>
    </Pressable>
  );
};

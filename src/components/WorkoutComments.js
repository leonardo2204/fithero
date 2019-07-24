/* @flow */

import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { IconButton } from 'react-native-paper';

import withTheme from '../utils/theme/withTheme';
import type { NavigationType } from '../types';
import type { ThemeType } from '../utils/theme/withTheme';

type Props = {
  comments: string,
  day: string,
  navigation: NavigationType<{ day: string }>,
  theme: ThemeType,
  onRemovePress: () => void,
};

class WorkoutComments extends React.Component<Props> {
  _addWorkoutComment = () => {
    this.props.navigation.navigate('Comments', { day: this.props.day });
  };

  _confirmDeletion = () => {
    const { onRemovePress } = this.props;
    Alert.alert('Attention!', 'Do you really want to delete this comment?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Yes', onPress: onRemovePress },
    ]);
  };

  render() {
    const { comments } = this.props;

    return (
      <Card style={styles.comments} onPress={this._addWorkoutComment}>
        <Card.Content>
          <View style={styles.line}>
            <Text style={styles.textContainer} numberOfLines={1}>
              {comments}
            </Text>
            <IconButton
              icon="delete"
              size={20}
              style={styles.iconButton}
              onPress={this._confirmDeletion}
            />
          </View>
        </Card.Content>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  comments: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  line: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flexGrow: 1,
    width: 0,
    alignSelf: 'center',
  },
  iconButton: {
    margin: 0,
  },
});

export default withTheme(withNavigation(WorkoutComments));

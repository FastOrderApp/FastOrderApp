import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
/** Style */
import styles from '../styles/Likes';

export default function My(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>마이페이지</Text>
    </View>
  );
}

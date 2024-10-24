import styles from '../styles/AppbarLikes';

import {View, Text} from 'react-native';
/**Icons */
import CartIcon from '@assets/icon_cart.svg';

export default function AppbarLikes(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ㅇㅇ님의 찜</Text>
      <View style={styles.rightContainer}>
        <CartIcon />
      </View>
    </View>
  );
}
import React, {useState} from 'react';
import {View} from 'react-native';
import {NavigationProp} from '../navigation/NavigationProps';

/** Style */
import styles from '../styles/Order';
/**Components */
import OrderListItem from '../components/OrderListItem';
import AppbarDefault from '../components/AppbarDefault';
import {ScrollView} from 'react-native-gesture-handler';

export default function Order({navigation}: NavigationProp): React.JSX.Element {
  const [recentMenu, setRecentMenu] = useState([
    {
      date: '8.17(수)',
      progress: '픽업완료',
      storeName: '찌개찌개',
      menuName: '김치찌개 외 1개 28,000원',
    },
    {
      date: '8.16(화)',
      progress: '픽업완료',
      storeName: '찌개찌개',
      menuName: '된장찌개 외 1개 27,000원',
    },
    {
      date: '8.15(월)',
      progress: '픽업완료',
      storeName: '찌개찌개',
      menuName: '김치찌개 외 1개 26,000원',
    },
    {
      date: '8.17(수)',
      progress: '픽업완료',
      storeName: '찌개찌개',
      menuName: '김치찌개 외 1개 28,000원',
    },
    {
      date: '8.16(화)',
      progress: '픽업완료',
      storeName: '찌개찌개',
      menuName: '된장찌개 외 1개 27,000원',
    },
    {
      date: '8.15(월)',
      progress: '픽업완료',
      storeName: '찌개찌개',
      menuName: '김치찌개 외 1개 26,000원',
    },
  ]);

  return (
    <View style={styles.container}>
      <AppbarDefault title="주문내역" />
      <View style={styles.divder}></View>
      <ScrollView
        style={styles.orderListContainer}
        contentContainerStyle={{paddingVertical: 10}}>
        {recentMenu.map((menu, index) => (
          <OrderListItem
            navigation={navigation}
            date={menu.date}
            progress={menu.progress}
            storeName={menu.storeName}
            menuName={menu.menuName}
          />
        ))}
      </ScrollView>
    </View>
  );
}

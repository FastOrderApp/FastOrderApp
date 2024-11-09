import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {NavigationProp} from '../navigation/NavigationProps';
import axios from 'axios';
/** Style */
import styles from '../styles/Main';
/** Icons */
import CartIcon from '@assets/icon_cart.svg';
import KoreanIcon from '@assets/icon_food_korea.svg';
import JapaneseIcon from '@assets/icon_food_japan.svg';
import ChineseIcon from '@assets/icon_food_china.svg';
import WesternIcon from '@assets/icon_food_western.svg';
import CafeIcon from '@assets/icon_food_cafe.svg';
import EtcIcon from '@assets/icon_food_etc.svg';
/** Components */
import BottomSheet from '../components/BottomSheet';
import NaverMap from '../components/NaverMap';

// 아이콘 매핑 정의
const foodIcons = {
  전체: <EtcIcon />,
  한식: <KoreanIcon />,
  일식: <JapaneseIcon />,
  중식: <ChineseIcon />,
  양식: <WesternIcon />,
  카페: <CafeIcon />,
  기타: <EtcIcon />,
} as const; // as const로 타입을 고정

const BASE_URL = 'http://money.ipdisk.co.kr:58200';

export default function Main({navigation}: NavigationProp): React.JSX.Element {
  /** 칩그룹 버튼 상태*/
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null,
  );
  /** 불러온 store*/
  const [stores, setStores] = useState([]);
  /**  마커 눌렀을 때 선택된 매장 아이디*/
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  /** 음식 분류 */
  const foodTypes = Object.keys(foodIcons) as (keyof typeof foodIcons)[];

  // 컴포넌트가 마운트될 때 전체 버튼을 선택하고 매장을 불러옴
  useEffect(() => {
    setSelectedButtonIndex(0); // 전체 버튼 선택
    getTotalStores(); // 매장 불러오기
  }, []);

  const handlePress = async (index: number) => {
    setSelectedButtonIndex(index === selectedButtonIndex ? null : index);

    if (index === 0) {
      await getTotalStores();
    }
  };

  const navigateToShopping = () => {
    navigation.navigate('Shopping');
  };

  const getTotalStores = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/stores`);
      setStores(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error during getStores:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarWrapper}>
          <TextInput style={styles.input} placeholder="검색" />
          <CartIcon onPress={navigateToShopping} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonGroup}>
          {foodTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(index)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    selectedButtonIndex === index ? '#F55442' : '#2A2A2C',
                },
              ]}>
              <View style={styles.chipContainer}>
                <View style={styles.iconBox}>{foodIcons[type]}</View>
                <Text style={styles.chipText}>{type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <NaverMap
        navigation={navigation}
        stores={stores}
        onMarkerPress={setSelectedStoreId}
      />
      <BottomSheet navigation={navigation} storeId={selectedStoreId} />
    </View>
  );
}

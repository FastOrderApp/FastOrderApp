import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  totalContainer: {
    height: 88,
    backgroundColor: 'white',
    width: '100%',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconBox: {
    height: '100%',
  },
  divider: {
    width: '100%',
    backgroundColor: '#F5F5F5',
  },
  menuWrapper: {
    display: 'flex',
    gap: 10,
    marginLeft: 12,
  },
  menuName: {
    color: '#484747',
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    color: '#484747',
    fontSize: 16,
    fontWeight: '500',
  },
  rightContainer: {},
  menuImg: {
    // borderWidth: 1,
    height: 61,
    width: 61,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
  },
});

export default styles;
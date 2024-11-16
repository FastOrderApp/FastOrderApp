import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {HOME} from '../consts/BottomSheetConsts';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    width: '100%',
    position: 'relative',
  },
  sheet: {
    backgroundColor: 'white',
    borderRadius: 24,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 23,
    borderWidth: 1,
    borderColor: 'rgba(183, 183, 183, 0.50)',
  },
  handleBox: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 21,
    paddingBottom: 23,
  },
  handle: {
    height: 5,
    width: 40,
    backgroundColor: 'stroke: rgba(183, 183, 183, 0.50)',
    borderRadius: 3,
  },
});
export default styles;

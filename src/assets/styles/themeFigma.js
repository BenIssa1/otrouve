import {Dimensions, StyleSheet} from 'react-native';
import {Platform} from 'react-native';

export const colors = {
  primary: '#30AC65',
  secondary: '#49514b',
  textPrimary: '#313131',
  textSecondary: '#8E8E93',
  yellow: '#F9CE3D',
  gray: '#f0f0f0',
  /* gray: '#E5E5EA', */
  blue: '#26A6E0',
  white: '#FFFFFF',
  warning: '#FF9A38',
  danger: '#E83e3e',
  greyLigth: '#F4F4F4',
  greyDark: '#7D7D81',
  orange: '#FF9F31',
  orangeLigth: '#FFD4CE',
  greenLigth: '#DEF7E5',
  greenVeryLigth: '#F5F5F5',
};

const dimensions = Dimensions.get('window');
export const screenWidth = dimensions.width;
export const screenHeight = dimensions.height;

export const theme = StyleSheet.create({
  containerFluid: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerFluidFigma: {
    flex: 1,
    paddingHorizontal: (screenWidth * 3) / 100,
  },
  container: {
    paddingHorizontal: (screenWidth * 3) / 100,
  },

  rowBox: {
    flexDirection: 'row',
  },

  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15,
  },

  tbText: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: '800',
    color: colors.secondary,
  },

  title: {
    fontSize: 25,
    marginVertical: 10,
  },

  textFont: {
    fontFamily: 'Quicksand-Medium',
  },

  textFontBold: {
    fontFamily: 'Quicksand-Bold',
  },
  formGroupView: {
    width: "100%",
    height: 55,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 50,
    marginBottom: 18
  },
  formGroupViewD: {
    width: "100%",
    height: 55,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    marginBottom: 18
  },
  fieldText: {
    width: "100%",
    fontSize: 15,
    fontFamily: 'Quicksand-Medium',
    color: colors.secondary,
  },

  formGroup: {
    borderWidth: 1,
    backgroundColor: "#F6F7F9",
    borderColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    borderRadius: 5,
    /* paddingHorizontal: 20, */
  },
  formGroupGarment: {
    borderWidth: 1,
    backgroundColor: "#F6F7F9",
    borderColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
    borderRadius: 5,
    /* paddingHorizontal: 20, */
  },

  inputText: {
    fontSize: 13,
    width: '100%',
    height: 'auto',
    color: "#72747E",
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 15 : 'auto',
    fontFamily: 'Quicksand-Medium',
  },

  boxShadow: {
    shadowColor: '#b2b2b2',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.48,
    shadowRadius: 14.0,
    elevation: 18,
  },

  btn: {
   /*  width: '100%', */
    padding: 12,
    marginTop: 10,
    borderRadius: 12,
  },
  btnSmall: {
    /*  width: '100%', */
     padding: 8,
     marginTop: 10,
     borderRadius: 12,
   },
  btnTouch: {
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ligthBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.blue,
    borderWidth: 1,
  },

  modalStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1);',
  },

  modalContainer: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: screenWidth,
    backgroundColor: colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },

  badgeCard: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    padding: 5,
    borderRadius: 100,
    shadowColor: '#b2b2b2',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

// src/screens/forgotPw/styles.js
import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  backButton: {
    marginTop: 30,
    marginLeft: -10,
    padding: 10,
    alignSelf: 'flex-start',
  },
  backButtonIcon: {
    color: COLORS.title,
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.title,
    fontSize: SIZES.h1,
    marginVertical: 10,
    marginTop: 30,
  },
  subtitle: {
    fontWeight: '500',
    color: COLORS.title,
  },
  textinput: {
    borderBottomColor: COLORS.lightgrey,
    borderBottomWidth: 1,
    fontSize: SIZES.h4,
    paddingVertical: 10,
    marginVertical: 30,
    color: COLORS.title,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonTxt: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    fontWeight: 'bold',
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin: 10,
    },
    top: {
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.title, 
        marginLeft: 150,
    },
    name2: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.title, 
        
    },
    address: {
        marginTop: 5,
        fontSize: SIZES.h4,
        fontWeight: '500',
        color: COLORS.title,
    },
    subText: {
        fontSize: SIZES.h5,
        fontWeight: '500',
        marginLeft: 5,
        color: COLORS.title,
    },
    line: {
        backgroundColor: COLORS.grey,
        height: 1,
        marginVertical: 10,
    },
    icon: {
        backgroundColor: COLORS.grey,
        marginHorizontal: 5,
        borderRadius: 50,
        padding: 10,
    },
    description: {
        fontSize: SIZES.h2,
        backgroundColor: COLORS.grey,
        borderRadius: 50,
        padding: 10,
    }
});

export default styles;
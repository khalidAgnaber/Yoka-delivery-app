import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";


const styles = StyleSheet.create({
    container: {
        flex:1 ,
        margin: 10,
    },
    addButton: {
        padding: 10,
        margin: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
    },
    itemName: {
        fontSize: 18,
        padding: 10,
    },
    // Add other styles here
});

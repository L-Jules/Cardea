import {StyleSheet, Text} from "react-native";
import {VERT_CARDEA} from "./global";

export default function Count({value}) {

    const style = StyleSheet.create({
        backgroundColor: VERT_CARDEA,
        margin: "1%",
        padding: "1.7%",
        borderRadius: 99,
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 28,
        paddingHorizontal: "10%",
        boxShadow: "8px 5px 5px black"
    });

    return <Text style={style}>{value}</Text>
}
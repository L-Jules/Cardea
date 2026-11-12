import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

import download from "rsrc/img/icon/download.png"
import {NOIR_CARDEA} from "./global";

export default function Download({onClick}) {

    const styles = StyleSheet.create({
        container: {
            padding: "0.5%",
            backgroundColor: NOIR_CARDEA,
            margin: "1%",
            borderRadius: 5
        },
        icon: {
            height: 50,
            width: 50,
            tintColor: 'white',
        }
    })

    return <TouchableOpacity onPress={onClick} style={styles.container}>
        <Image
            source={download}
            style={styles.icon}/>
    </TouchableOpacity>

}
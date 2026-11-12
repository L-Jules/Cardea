import {StyleSheet, View} from "react-native";

export const BLANC_CARDEA  = "white"
export const VERT_CARDEA   = "#0de78b";
export const NOIR_CARDEA   = "black";
export const BLEU_CARDEA   = "#6bd0db";
export const ROUGE_CARDEA  = "#ff1462"
export const ORANGE_CARDEA = "#ff5555";

export function GlobalContainer({children}) {

    const styles = StyleSheet.create({
        container: {
            //display: "flex",
            //flex: 1,
            justifyContent: "space-between",
            backgroundColor: BLANC_CARDEA,
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%"
        }
    })

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export function Form({children}) {

    const styles = StyleSheet.create({
        redBox: {
            backgroundColor: BLEU_CARDEA,
            borderRadius: 20,
            borderWidth: 3,
            borderColor: NOIR_CARDEA,
            padding: "5%",
            margin: "20%",
            marginTop: "10%",
            marginBottom: 90,
        },
    })

    return (
        <View style={styles.redBox}>
            {children}
        </View>
    )
}

export function Block({children}) {

    return <View style={{ borderWidth: 1,
                          borderColor: BLANC_CARDEA,
                          borderRadius: 10,
                          marginVertical: 8}}>
        {children}
    </View>
}

export const debugStyles = {borderColor: BLEU_CARDEA, borderWidth: 2, borderStyle: "solid"};

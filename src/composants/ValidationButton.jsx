import useLang from "../util/useLang";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {BLANC_CARDEA, NOIR_CARDEA} from "./global";
import React from "react";

export default function ValidationButton({onPress}) {

    const Lang = useLang();

    const styles = StyleSheet.create({
        submitButton: {
            marginTop: 20,
            alignItems: "center",
            backgroundColor: NOIR_CARDEA,
            padding: 12,
            borderRadius: 10,
        },
        submitText: {
            color: BLANC_CARDEA,
            fontWeight: "bold",
            fontSize: 16,
        },
    })

    return <TouchableOpacity style={styles.submitButton} onPress={onPress}>
        <Text style={styles.submitText}>{Lang.get("validate").get()}</Text>
    </TouchableOpacity>
}
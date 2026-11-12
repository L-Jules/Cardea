import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BLANC_CARDEA, Form, NOIR_CARDEA} from "../global";
import {setAlertRef} from "./PopUpService";
import useLang from "../../util/useLang";

function OkButton({onPress}) {
    const Lang = useLang();

    const styles = StyleSheet.create({
        submitButton: {
            marginTop: 20,
            alignItems: "center",
            backgroundColor: NOIR_CARDEA,
            padding: 12,
            borderRadius: 10,
            display: "flex",
        },
        submitText: {
            color: BLANC_CARDEA,
            fontWeight: "bold",
            fontSize: 16,
        },
    })

    return <View style={{width:'100%', alignItems: "flex-end"}}>
        <TouchableOpacity style={styles.submitButton} onPress={onPress}>
            <Text style={styles.submitText}>{Lang.get("ok").get()}</Text>
        </TouchableOpacity>
    </View>
}

export default function PopUpProvider({ children }) {

    const [alert, setAlert] = useState({title:"", message:"", onPress: null});
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() =>
        setAlertRef({ show(alertParam) {
            setAlert(alertParam);
            setModalVisible(true);
        } })
    , []);

    const styles = StyleSheet.create({
        container: {
            alignSelf: "flex-start",
            padding: 10,
        },
        popUpTitle: {
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: "4%"
        },
        popUpMessage: {
            marginTop: "5%",
            fontWeight: "bold",
            fontSize: 15,
            lineHeight: 20,
            textAlign: "center",
            color: BLANC_CARDEA,
        }
    })

    function onPress() {
        if (alert.onPress)
            alert.onPress() && setModalVisible(false)
        else
            setModalVisible(false)
    }

    return <>

        {children}

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onPress}>

            <Form>
                <Text style={styles.popUpTitle}>{alert.title}</Text>

                <Text style={styles.popUpMessage}>{alert.message}</Text>

                <OkButton onPress={onPress}/>
            </Form>
        </Modal>
    </>;
}
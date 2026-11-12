import {useState} from "react";
import {Image, Modal, StyleSheet, TextInput, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BLANC_CARDEA, Form, NOIR_CARDEA} from "../global";
import {LANG} from "../../util/Lang";
import useLang from "../../util/useLang";
import ValidationButton from "../ValidationButton";
import params from "rsrc/img/icon/params.png"

export default function Param({value, onChange}) {

    function handleResult(s) {
        onChange(s);

        AsyncStorage.setItem(
            'user-preferences',
            JSON.stringify({ libId: s})
        );
    }

    const [modalVisible, setModalVisible] = useState(false);
    const Lang = useLang();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: NOIR_CARDEA,
            paddingBottom: "1.7%",
            paddingTop: "2.9%",
            paddingHorizontal: "3%",
            margin: "1%",
            borderRadius: 5
        },
        icon: {
            height: 40,
            width: 40,
            tintColor: 'white',
        },
        paramTitle: {
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: "4%"
        },
        langName: {
            fontSize: 15,
            lineHeight: 20,
            textAlign: "center",
            color: BLANC_CARDEA,
        },
        langButton: {
            margin: "1%",
            padding: "1%",
            backgroundColor: NOIR_CARDEA,
            borderRadius: 99,
            width: "50%",
            alignSelf: "center"
        },
        idBeginInput : {
            backgroundColor: NOIR_CARDEA,
            padding: 10,
            fontSize: 16,
            paddingHorizontal: 18,
            borderRadius: 99,
            color: BLANC_CARDEA
        }
    })

    return <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>

            <Form>
                <Text style={styles.paramTitle}>{Lang.get("change-lang").get() + " :"}</Text>

                <TouchableOpacity onPress={()=>Lang.load("fr")} style={styles.langButton}>
                    <Text style={styles.langName}>Français</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>Lang.load("en")} style={styles.langButton}>
                    <Text style={styles.langName}>English</Text>
                </TouchableOpacity>

                <Text style={[styles.paramTitle, {marginVertical: "4%"}]}>{Lang.get("id-should-begin-with").get() + " :"}</Text>


                <TextInput
                    defaultValue={value}
                    style={styles.idBeginInput}
                    keyboardType={"numeric"}
                    placeholder={Lang.get("library-number").get()}
                    placeholderTextColor="#aaa"
                    onSubmitEditing={e => handleResult(e.nativeEvent.text.trim())}/>

                <Text style={{fontSize: 18,alignSelf: "center", color: NOIR_CARDEA, marginTop: 20}}>(version: 1.0.0)</Text>

                <ValidationButton onPress={()=>setModalVisible(false)}/>
            </Form>
        </Modal>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={params} style={styles.icon}/>
        </TouchableOpacity>
    </View>;
}
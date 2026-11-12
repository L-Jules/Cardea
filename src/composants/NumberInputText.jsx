import {StyleSheet, TextInput} from "react-native";
import Lang from "../util/Lang";
import {NOIR_CARDEA} from "./global";

export default function NumberInputText({onChange}) {

    const style = StyleSheet.create({

        textCommon : {
            backgroundColor: NOIR_CARDEA,
            padding: 10,
            fontSize: 16,
            paddingHorizontal: 18,
            borderRadius: 99
        }
    })

    return <>
        <TextInput
               style={style.textCommon}
               keyboardType={"numeric"}
               placeholder={Lang.get("id").get()}
               placeholderTextColor="#aaa"
               onSubmitEditing={e => {
                   onChange(e.nativeEvent.text.trim());
               }}/>
        </>
}
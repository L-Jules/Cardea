import {Text, View, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import NfcManager, {NfcTech} from "react-native-nfc-manager";
import Clipboard from "@react-native-clipboard/clipboard";

import {ROUGE_CARDEA, VERT_CARDEA, ORANGE_CARDEA} from "./global";
import useLang from "../util/useLang";

const HIGH_RATE_MODE_AND_TARGET_ADRESSING = 0x22;
const READ_MULTIPLE_BLOC = 0x23;
const STARTING_BLOC_NBR = 0x00;
const BLOC_COUNT = 0x05; //six au total

let id = "";

export default function NFCHandler({value, onChange, warm}) {

    const [isNFCVSupported, setIsNFCVSupported] = useState(false);
    const [isNFCStarted,    setIsNFCStarted   ] = useState(true);
    const [messageCopie,    setMessageCopie   ] = useState("");

    const Lang = useLang();

    function handleResult(byte) {
        if (byte[0] === 0x00) {

            //on retire le code réponse
            const data = byte.slice(1);
            id = "" + data.slice(2, 7)
                .reduce((acc, byte) => acc * 256 + byte, 0);

            onChange(id, data);
        }
    }

    function scanLoop() {

        NfcManager.requestTechnology(NfcTech.NfcV)
            .then(scan)
            .catch(console.log);
    }

    function scan() {

        NfcManager.getTag().then(tag => {

            if (!tag?.id) {
                throw new Error('UID introuvable');
            }

            const uid = tag.id
                .match(/.{2}/g)
                ?.map(x => parseInt(x, 16));

            const command = [
                HIGH_RATE_MODE_AND_TARGET_ADRESSING,
                READ_MULTIPLE_BLOC,
                ...uid,
                STARTING_BLOC_NBR,
                BLOC_COUNT
            ];

            NfcManager.nfcVHandler.transceive(command).then(handleResult);

        })
        .catch(console.log)
        .finally(()=> {
            NfcManager.cancelTechnologyRequest().finally(scanLoop);
        });
    }

    function onPress() {
        Clipboard.setString(id);
        setMessageCopie(Lang.get("id-copied").get());
        setTimeout(() => setMessageCopie(""), 1000)
    }


    useEffect(function didMount() {

        NfcManager.isSupported(NfcTech.NfcV).then(isNFCVSupported => {

            setIsNFCVSupported(isNFCVSupported);

            if (isNFCVSupported) {

                NfcManager.start()
                    .then(scanLoop)
                    .catch(() => setIsNFCStarted(false))
            }

        }).catch(() => setIsNFCStarted(false));


        return () => {
            NfcManager.cancelTechnologyRequest();
        }
    }, []);

    if (!isNFCVSupported)
        return <View style={{height: "25%"}}>

            <View style={{
                padding: 50,
                backgroundColor: ROUGE_CARDEA,
                borderRadius: 99,
                boxShadow: "8px 5px 5px black",
            }}>
                <Text style={{fontSize: 30, fontWeight: "bold"}}>{Lang.get("nfc-unsupported").get()}</Text>
            </View>
        </View>

    if (!isNFCStarted)
        return <View style={{height: "25%"}}>

            <View style={{
                padding: 50,
                backgroundColor: ROUGE_CARDEA,
                borderRadius: 99,
                boxShadow: "8px 5px 5px black",
            }}>
                <Text style={{fontSize: 30, fontWeight: "bold"}}>{Lang.get("nfc-not-started").get()}</Text>
            </View>
        </View>

    if (warm)
        return <View style={{height: "25%"}}>

            {messageCopie && <Text style={{marginBottom: 15, fontWeight: "bold"}}>{messageCopie}</Text>}

            <TouchableOpacity onPress={onPress} style={{
                padding: 50,
                backgroundColor: ORANGE_CARDEA,
                borderRadius: 99,
                boxShadow: "8px 5px 5px black",
            }}>
                <Text style={{fontSize: 30, fontWeight: "bold"}}>{value}</Text>
                <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic"}}>{warm}</Text>
            </TouchableOpacity>
        </View>

    return <View style={{height: "25%"}}>
        {value && <>

            {messageCopie && <Text style={{marginBottom: 15, fontWeight: "bold"}}>{messageCopie}</Text>}

            <TouchableOpacity onPress={onPress} style={{
                padding: 50,
                backgroundColor: VERT_CARDEA,
                borderRadius: 99,
                boxShadow: "8px 5px 5px black",
            }}>
                <Text style={{fontSize: 30, fontWeight: "bold"}}>{value}</Text>
            </TouchableOpacity>
        </>}
    </View>
}
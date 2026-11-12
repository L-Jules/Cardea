import {useEffect, useState} from "react";
import ImmersiveMode from 'react-native-immersive-mode';
import {Text, View, Vibration} from "react-native";
import Orientation from "react-native-orientation-locker";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GlobalContainer} from "../composants/global";
import Param from "../composants/popUp/Param";
import useLang from "../util/useLang";
import Download from "../composants/Download";
import Count from "../composants/Count";
import NumberInputText from "../composants/NumberInputText";
import BarCodeScan from "../composants/BarCodeScan";
import NFCHandler from "../composants/NFCHandler";
import API from "../util/bridge";

export default function Main() {

    const Lang = useLang();

    const [count,        setCount       ] = useState(-1);
    const [id,           setId          ] = useState("");
    const [libId,        setLibId       ] = useState("53001");
    const [warm,         setWarm        ] = useState("");
    const [isAPIStarted, setIsAPIStarted] = useState(false);

    function add(id, byte) {

        if (!id.startsWith(libId)) {
            setId(id);
            setWarm(Lang.get("id-dont-match").interpolate([libId]).get());
            return;
        }

        const result = API.add(id, byte);

        if (result == "OK") {
            setId(id);
            setCount(count+1);
            setWarm("");
        }

        if (result == "DUPLICATE_ID") {
            setId(id);
            setWarm(Lang.get("already-done").get());
        }
    }

    useEffect(function didMount() {
        ImmersiveMode.fullLayout(true);
        ImmersiveMode.setBarMode('BottomSticky');
    }, []);


    useEffect(function didMount() {
        Orientation.lockToPortrait();
        return Orientation.unlockAllOrientations;
    }, []);

    useEffect(function didMount() {
        AsyncStorage.getItem('user-preferences')
            .then(configJson => {
                if (configJson) {
                    const config = JSON.parse(configJson);
                    setLibId(config.libId);
                }
            })
            .catch(console.log);
    }, []);

    useEffect(function didMount() {
        API.launchBind();
        API.onBindFinish(()=> {
            setIsAPIStarted(true);
            setCount(API.count());
        });

        return () => API.unbind();

    }, []);
    
    if (!isAPIStarted)
        return <GlobalContainer>
            <Text style={{margin: "20%"}}>{Lang.get("service-unvailable").get("")}</Text>
        </GlobalContainer>


    return <GlobalContainer>
            <View style={{flexDirection: "row", width: "100%", padding: "4%"}}>

                <View style={{flexDirection: "row", width: "50%", justifyContent: "flex-start"}}>
                    <Param value={libId} onChange={setLibId}/>
                    <Download onClick={() => API.getAll()}/>
                </View>

                <View style={{flexDirection: "row", width: "50%", justifyContent: "flex-end"}}>
                    <Count value={count}/>
                </View>
            </View>

            <View style={{flexDirection: "row"}}>
                <NumberInputText onChange={id => {add(id, []); Vibration.vibrate(250);}}/>
                {/*il faut trouver une lib adapté pour MSI plessey
                <BarCodeScan     onChange={id => {add(id, []); Vibration.vibrate(250);}}/>*/}
            </View>

            {/*le scan d'un NFC déclenche déjà une vibration, pas besoin de revibrer après le scan*/}
            <NFCHandler value={id} onChange={add} warm={warm}/>
        </GlobalContainer>
}
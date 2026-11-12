import {Alert, StatusBar} from "react-native";
import {useEffect, useState} from "react";

import Main from "./screens/Main";
import Lang from "./util/Lang";
import PopUpProvider from "./composants/popUp/PopUpProvider";


export default function App() {

    const [ready, setReady] = useState(false);

    useEffect(function bootstrap() {
        Lang.load()
            .catch((e)=> Alert.alert(e.message))
            .finally(() => setReady(true));
    }, []);

    if (!ready)
        return null;

    return (<>
            <StatusBar hidden/>
            <PopUpProvider>
                <Main/>
            </PopUpProvider>
        </>
    );
}
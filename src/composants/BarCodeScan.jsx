import {Image} from "react-native";

import scan from "rsrc/img/icon/scan.png"
import {NOIR_CARDEA} from "./global";

export default function BarCodeScan() {

    return <Image
        source={scan}
        style={{
            height: 20,
            width: 20,
            backgroundColor: NOIR_CARDEA,
            tintColor: 'white',
            marginLeft: "1%",
            padding: "5%",
            borderRadius: 5
        }}/>
}
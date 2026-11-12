import {useSyncExternalStore} from "react";
import Lang from "./Lang";

export default function useLang() {

    useSyncExternalStore(
        (cb) => Lang.subscribe(cb),
        () => Lang.getSnapshot()
    );

    return Lang;
}
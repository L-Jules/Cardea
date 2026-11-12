import {showPopUp} from "./PopUpService";

/**
 * classe qui gère la file d'attente de pop-up
 */
export default class AlertChain {

    /**
     * @type {{title: String, message: String, onPress: function()}[]}
     */
    #onGoingList;

    constructor(list) {
        this.#onGoingList = list || [];
    }

    /**
     * append leve aussi une alerte si il n'y en a pas en cours
     */
    append(title, message, onOk) {

        const nextAlert = {
            title:   title,
            message: message,
            onPress: () => {

                if (onOk)
                    onOk();

                this.#onGoingList.shift();

                //si il reste des message à afficher, on les déclenches, et onpress va s'appeler recursivement
                if (this.#onGoingList.length)
                    showPopUp(this.#onGoingList[0].title,
                              this.#onGoingList[0].message,
                              this.#onGoingList[0].onPress,
                    );

                //= si 0, on doit fermer après = on retourne true dans le onpress
                return this.#onGoingList.length === 0
            }
        }

        if (this.#onGoingList.length > 0) {
            this.#onGoingList.push(nextAlert);
        }
        else {
            this.#onGoingList.push(nextAlert);

            showPopUp(this.#onGoingList[0].title,
                      this.#onGoingList[0].message,
                      this.#onGoingList[0].onPress
            );
        }

        return this;
    }
}
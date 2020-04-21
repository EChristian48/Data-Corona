import "../style/style.css";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "regenerator-runtime";

import {Data} from "./data/data.js";
import {Card} from "./components/card.js";
import {GlobalCard} from "./components/global-card.js";

customElements.define("country-card", Card);
customElements.define("global-card", GlobalCard);

class Main {
    static run() {
        const searchButton = document.querySelector("#searchButton");
        const indonesiaButton = document.querySelector("#dataIndonesia");
        const globalButton = document.querySelector("#dataGlobal");
        const searchField = document.querySelector("#searchField");

        searchButton.addEventListener("click", () => {Main.search(searchField.value)});
        indonesiaButton.addEventListener("click", () => {Main.search("Indonesia")});
        globalButton.addEventListener("click", () => {Main.search("global")});
        searchField.addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                Main.search(searchField.value);
            }
        })

        console.log(Data.getGlobal())
    }

    static async search(keyword) {
        const main = document.querySelector(".col");

        main.innerHTML = "";

        try {
            if (keyword != "global") {
                let results = await Data.getCountry(keyword);
                console.log("country here");

                for (let result of results) {
                    let element = document.createElement("country-card");
                    element.countryData = result;
                    main.appendChild(element);
                }
            } else {
                console.log("hello")
                let result = await Data.getGlobal();
                let element = document.createElement("global-card");
                element.countryData = result;
                main.appendChild(element);
            }
        } catch (error) {
            console.log(error)
        }
        
    }
}

export {Main}
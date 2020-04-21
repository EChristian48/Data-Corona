import {Card, CardHelper} from "./card.js";

class GlobalCard extends Card {
    set countryData({
        NewConfirmed,
        TotalConfirmed,
        NewDeaths,
        TotalDeaths,
        NewRecovered,
        TotalRecovered,
        Date: date,
    }) {
        this.beginningHTML = {
            header: "Data Global",
            title: "Statistik Global",
        };
        const time = new Date(Date.parse(date));
        this.time = time.toLocaleDateString() + " " + time.toLocaleTimeString();

        this.newConfirmed = NewConfirmed;
        this.totalCase = TotalConfirmed;

        this.newRecovered = NewRecovered;
        this.totalRecovered = TotalRecovered;

        this.newDeaths = NewDeaths;
        this.totalDeaths = TotalDeaths;

        this.render();
    }
}

export {GlobalCard};
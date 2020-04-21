class Data {
    // Mengambil data global
    static async getGlobal() {
        try {
            const response = await fetch("https://api.covid19api.com/summary");
            const responseJSON = await response.json();
            const {Global} = await responseJSON;
            return Global;
        } catch (error) {
            alert(error);
        }
    }

    // Mengambil data berdasarkan nama negara
    static async getCountry(countryName) {
        try {
            const response = await fetch("https://api.covid19api.com/summary");
            const responseJSON = await response.json();
            const {Countries} = await responseJSON;
            const result = await Countries.filter(country => country.Country.toUpperCase().includes(countryName.toUpperCase()))
            return result;
        } catch (error) {
            alert(error);
        }
    }
}

export {Data};
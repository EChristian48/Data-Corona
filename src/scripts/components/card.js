class Card extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});

        // CSS Styling from Bootstrap 4
        this._style = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,700;1,400&display=swap');
        * {
            font-family: Roboto, sans-serif !important;
        }
        
        .card {
            position: relative;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0, 0, 0, 0.125);
            border-radius: 0.25rem;
        }
        
        .card > .list-group:first-child .list-group-item:first-child {
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
        }
            
        .card > .list-group:last-child .list-group-item:last-child {
            border-bottom-right-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
        }
            
        .card-body {
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            min-height: 1px;
            padding: 1.25rem;
        }
            
        .card-title {
            margin-bottom: 0.75rem;
        }

        .card-header {
            padding: 0.75rem 1.25rem;
            margin-bottom: 0;
            background-color: rgba(0, 0, 0, 0.03);
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        }

        .card-header + .list-group .list-group-item:first-child {
            border-top: 0;
        }

        .my-4 {
            margin: 1.5rem 0 !important;
        }

        .text-center {
            text-align: center !important;
        }

        .list-group {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            padding-left: 0;
            margin-bottom: 0;
        }

        .list-group-flush .list-group-item {
            border-right-width: 0;
            border-left-width: 0;
            border-radius: 0;
        }
          
        .list-group-flush .list-group-item:first-child {
            border-top-width: 0;
        }
          
        .list-group-flush:last-child .list-group-item:last-child {
            border-bottom-width: 0;
        }

        .list-group-item {
            position: relative;
            display: block;
            padding: 0.75rem 1.25rem;
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.125);
        }
          
        .list-group-item:first-child {
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
        }
          
        .list-group-item:last-child {
            border-bottom-right-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
        }

        .list-group-item.disabled, .list-group-item:disabled {
            color: #6c757d;
            pointer-events: none;
            background-color: #fff;
          }
          
        .list-group-item.active {
            z-index: 2;
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
        }
          
        .list-group-item + .list-group-item {
            border-top-width: 0;
        }
          
        .list-group-item + .list-group-item.active {
            margin-top: -1px;
            border-top-width: 1px;
        }

        .list-group-item-primary {
            color: #004085;
            background-color: #b8daff;
        }

        .list-group-item-success {
            color: #155724;
            background-color: #c3e6cb;
        }

        .list-group-item-warning {
            color: #856404;
            background-color: #ffeeba;
        }

        .list-group-item-danger {
            color: #721c24;
            background-color: #f5c6cb;
        }

        .progress {
            display: -ms-flexbox;
            display: flex;
            height: 1rem;
            overflow: hidden;
            font-size: 0.75rem;
            background-color: #e9ecef;
            border-radius: 0.25rem;
        }
          
        .progress-bar {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: center;
            justify-content: center;
            overflow: hidden;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            background-color: #007bff;
            transition: width 0.6s ease;
        }
          
        @media (prefers-reduced-motion: reduce) {
            .progress-bar {
                transition: none;
            }
        }

        .bg-success {
            background-color: #28a745 !important;
        }

        .bg-danger {
            background-color: #dc3545 !important;
        }

        </style>
        `;

        // Card Ending HTML
        this._endingHTML = `
                </ul>
            </div>
        </div>
        `;

    }

    // Set card header and title
    set beginningHTML({header, title}) {
        this._beginningHTML = `
        <div class="card my-4">
            <div class="card-header text-center">
                ${header}
            </div>

            <div class="card-body">
                <h1 class="card-title text-center">${title}</h1>
                <ul class="list-group list-group-flush">
        `;
    }

    set countryData({
        Country,
        NewConfirmed,
        TotalConfirmed,
        NewDeaths,
        TotalDeaths,
        NewRecovered,
        TotalRecovered,
        Date: date,
    }) {
        this.beginningHTML = {
            header: `Data ${Country}`,
            title: Country,
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

    render() {
        this._shadowRoot.innerHTML = [
            this._style,
            this._beginningHTML,
            CardHelper.lastUpdated(this),
            CardHelper.positiveCase(this),
            CardHelper.listRecovered(this),
            CardHelper.listDeaths(this),
            this._endingHTML
        ].join("")
    }
}

// Kenapa bisa ada 2 Class begini?
// Jadi awalnya saya mau bikin 2 class yang inherit dari Card
// GlobalCard dan CountryCard
// Setelah dipikir ulang, ternyata mendingan dibuat sama aja
// Tapi saya ga sempet buat refactor

// Setelah dipikir-pikir lagi
// Saya jadi bikin class GlobalCard
// bisa dicek di ./global-card.js

class CardHelper {
        // Return list group item with primary background color (biru)
        static lastUpdated({time}) {
            return `
            <li class="list-group-item list-group-item-primary">
                <p class="card-text"></p>Pembaruan Terakhir: ${time}</p>
            </li>
            `;
        }
    
        // Return list group item with warning background color (kuning)
        static positiveCase({newConfirmed, totalCase}) {
            return `
            <li class="list-group-item list-group-item-warning">
                <p class="card-text">Total Kasus Baru: ${newConfirmed}</p>
                <p class="card-text">Total Kasus: ${totalCase}</p>
            </li>
            `;
        }
    
        static listRecovered({
            newRecovered,
            totalRecovered,
            totalCase
        }) {
            const percentage = Math.round((totalRecovered/totalCase) * 100);
            return `
            <li class="list-group-item list-group-item-success">
                <p class="card-text">Penambahan Kasus Sembuh: ${newRecovered}</p>
                <p class="card-text">Total Sembuh: ${totalRecovered}</p>
                <div class="progress" style="height: 30px;">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${percentage}%;">
                        ${percentage}% dari total
                    </div>
                </div>
            </li>
            `;
        }
    
        static listDeaths({
            newDeaths,
            totalDeaths,
            totalCase
        }) {
            const percentage = Math.round((totalDeaths/totalCase) * 100);
            return `
            <li class="list-group-item list-group-item-danger">
                <p class="card-text">Penambahan Kasus Meninggal: ${newDeaths}</p>
                <p class="card-text">Total Meninggal: ${totalDeaths}</p>
                <div class="progress" style="height: 30px;">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${percentage}%;">
                        ${percentage}% dari total
                    </div>
                </div>
            </li>
            `;
        }
}

export {Card, CardHelper};
import { get } from 'request';
import { Observable } from 'rxjs/Observable';

const BASE_URL: string = 'https://intrinio.com/api';

export interface IntrinioRequestOptions {
    page_size?: number;
    page?: number;
    ticker?: string;
    query?: string;

    // TODO remove this once you implement all available options
    [key: string]: any;
}

export class Intrinio {

    constructor(
        private username: string,
        private password: string
    ){}

    watchPrices(ticker: string, interval: number = 10000): Observable<any> {
        return new Observable<any>((observer) => {
            const getData = () => this.get('prices', { ticker }).then(observer.next.bind(observer), observer.error.bind(observer));
            getData();
            const watch = setInterval(getData.bind(this), interval);
            return () => clearInterval(watch);
        });
    }

    getCompanyByTicker(ticker: string, options?: IntrinioRequestOptions): Promise<any> {
        options = options || {};
        options.ticker = ticker;
        return this.get('companies', options);
    }

    queryCompanies(query: string, options?: IntrinioRequestOptions): Promise<any> {
        options = options || {};
        options.query = query;
        return this.get('companies', options);
    }

    get(path: string, options?: IntrinioRequestOptions) {
        let url = BASE_URL + '/' + path + '?';
        for (let prop in options) {
            url += `prop=${options[prop]}&`;
        }

        return new Promise<any>((resolve, reject) => {

            get(url, {
                auth: {
                    user: this.username,
                    pass: this.password,
                    sendImmediately: true
                }
            }, (err, res, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });

        });
    }

}

export default Intrinio;

exports = Intrinio;
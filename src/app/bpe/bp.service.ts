// Imports
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import * as configuration from '../globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {BP} from './model/bp';
import {ProcessConfiguration} from './model/process-configuration';

@Injectable()
export class BPService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({headers: this.headers});
    // private endpoint = 'http://localhost:8081';
    private endpoint = configuration.bpe_endpoint;
    private bpsUrl = this.endpoint + '/content';  // URL to web api
    private configurationUrl = this.endpoint + '/application';  // URL to web api

    constructor(private http: Http) {
    }

    getBPs(): Observable<BP[]> {
        let bps = this.http.get(this.bpsUrl)
            .map((res: Response) => res.json())
            .catch(this.handleError);

        return bps;
    }

    getBP(processID: string): Observable<BP> {
        const url = `${this.bpsUrl}/${processID}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    delete(processID: string): Observable<void> {
        const url = `${this.bpsUrl}/${processID}`;
        return this.http.delete(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    create(bp: BP): Observable<BP> {
        console.log(' Sending business process: ', bp);
        return this.http
            .post(this.bpsUrl, JSON.stringify(bp), this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    update(bp: BP): Observable<BP> {
        return this.http
            .put(this.bpsUrl, JSON.stringify(bp), this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getConfiguration(partnerID: string, processID: string, roleType: string): Observable<ProcessConfiguration> {
        const url = `${this.configurationUrl}/${partnerID}/${processID}/${roleType}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateConfiguration(configuration: ProcessConfiguration): Observable<ProcessConfiguration> {
        console.log(' Sending configurations: ', configuration);

        return this.http
            .put(this.configurationUrl, JSON.stringify(configuration), this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Observable<any> {
        let errorMsg = error.message || `There was a problem with our the rest service and we couldn't retrieve the data!`;
        console.error(errorMsg);

        // throw an application level error
        return Observable.throw(errorMsg);
    }
}


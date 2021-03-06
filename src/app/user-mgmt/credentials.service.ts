import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Credentials } from './model/credentials';
import * as myGlobals from '../globals';

@Injectable()
export class CredentialsService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private url = myGlobals.user_mgmt_endpoint;
	constructor(private http: Http) { }

	post(credentials: Credentials): Promise<any> {
		const url = `${this.url}/login`;
		return this.http
		.post(url, JSON.stringify(credentials), {headers: this.headers, withCredentials: true})
		.toPromise()
		.then(res => res.json())
		.catch(this.handleError);
	}

	getVersionIdentity(): Promise<any> {
		const url = `${myGlobals.user_mgmt_endpoint}/info`;
		return this.http
		.get(url, {headers: this.headers, withCredentials: true})
		.toPromise()
		.then(res => res.json())
		.catch(this.handleError);
	}

	getVersionBP(): Promise<any> {
		const url = `${myGlobals.bpe_endpoint}/info`;
		return this.http
		.get(url, {headers: this.headers, withCredentials: true})
		.toPromise()
		.then(res => res.json())
		.catch(this.handleError);
	}

	getVersionDataChannel(): Promise<any> {
		const url = `${myGlobals.data_channel_endpoint}/info`;
		return this.http
		.get(url, {headers: this.headers, withCredentials: true})
		.toPromise()
		.then(res => res.json())
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}

}

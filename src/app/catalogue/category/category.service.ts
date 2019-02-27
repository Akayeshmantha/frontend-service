/**
 * Created by suat on 17-May-17.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Category} from "../model/category/category";
import * as myGlobals from '../../globals';
import {Code} from "../model/publish/code";
import { ParentCategories } from '../model/category/parent-categories';
import {sortCategories, getAuthorizedHeaders, selectPreferredName} from '../../common/utils';
import {CookieService} from "ng2-cookies";

@Injectable()
export class CategoryService {
    private baseUrl = myGlobals.catalogue_endpoint;

    selectedCategories: Category[] = [];

    constructor(private http: Http,
                private cookieService: CookieService) {
    }

    // This map only contains FurnitureOntology categories
    private cachedCategories:Map<string,Category> = new Map<string, Category>();

    // this function gets all FurnitureOntology categories
    // however, those categories only contains information about the labels and definitions
    cacheFurnitureOntologyCategories(){
        // check whether FurnitureOntology categories are cached or not
        if(this.cachedCategories.size != 0){
            return Promise.resolve(null);
        }
        const url = `${this.baseUrl}/taxonomies/FurnitureOntology/all-categories`;
        return this.http
            .get(url, {headers: getAuthorizedHeaders(this.cookieService)})
            .toPromise()
            .then(response => {
                let categories:Category[] = response.json() as Category[];
                for(let category of categories){
                    this.cachedCategories.set(category.categoryUri,category);
                }
                return null;
            })
            .catch(this.handleError);
    }

    // This function assumes that category with the given uri is already cached.
    getCachedCategoryName(uri:string):string{
        return selectPreferredName(this.cachedCategories.get(uri));
    }

    getCategoriesByName(keyword: string, taxonomyId: string,isLogistics: boolean): Promise<Category[]> {
        const url = `${this.baseUrl}/taxonomies/${taxonomyId}/categories?name=${keyword}&forLogistics=${isLogistics}`;
        return this.http
            .get(url, {headers: getAuthorizedHeaders(this.cookieService)})
            .toPromise()
            .then(res => {
                return res.json() as Category[];
            })
            .catch(this.handleError);
    }

    getCategoriesByIds(codes: Code[]): Promise<Category[]> {
        if (!codes) {
            return Promise.resolve([]);
        }

        let customCategoryCodes: Code[] = [];
        let customCategories: Category[] = [];
        let categories:Category[] = [];

        // remove default category
        codes = codes.filter(function (cat) {
            return cat.listID != 'Default';
        });

        customCategoryCodes = codes.filter(function (cat) {
           return cat.listID == 'Custom';
        });

        // get non-custom categories
        codes = codes.filter(function (cat) {
           return cat.listID != 'Custom';
        });

        if(codes.length > 0){
            let url = this.baseUrl;
            let categoryIds:string = '';
            let taxonomyIds:string = '';

            let i = 0;
            for (; i<codes.length-1; i++) {
                categoryIds += encodeURIComponent(codes[i].value) + ",";
                taxonomyIds += codes[i].listID + ",";
            }
            categoryIds += encodeURIComponent(codes[i].value);
            taxonomyIds += codes[i].listID;

            url += "/categories?taxonomyIds=" + taxonomyIds + "&categoryIds=" + categoryIds;

            return this.http
                .get(url, {headers: getAuthorizedHeaders(this.cookieService)})
                .toPromise()
                .then(res => {
                    categories = categories.concat(res.json() as Category[]);
                    return categories;
                })
                .catch(this.handleError);
        }
        else{
            return Promise.resolve(categories);
        }
    }

    /**
     * Gets labels for the categories specified with the uris. The result is a map of uri->label map.
     * @param uris
     */
    public getCategories(uris: string[]): Promise<any> {
        const url = "http://nimble-staging.salzburgresearch.at/index/classes?";
        let full_url = url;
        for(let uri of uris) {
            full_url += `uri=${encodeURIComponent(uri)}&`;
        }
        return this.http
            .get(full_url, {headers: getAuthorizedHeaders(this.cookieService)})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    getCategory(category: Category): Promise<Category> {
        const url = `${this.baseUrl}/categories?taxonomyIds=` + category.taxonomyId + `&categoryIds=` + encodeURIComponent(category.id);
        return this.http
            .get(url, {headers: getAuthorizedHeaders(this.cookieService)})
            .toPromise()
            .then(res => {
                return res.json()[0] as Category;
            })
            .catch(this.handleError);
    }

    getParentCategories(category: Category): Promise<ParentCategories>{
        const url = `${this.baseUrl}/taxonomies/${category.taxonomyId}/categories/tree?categoryId=${encodeURIComponent(category.id)}`;
        return this.http
            .get(url, {headers: getAuthorizedHeaders(this.cookieService)})
            .toPromise()
            .then(res => {
                return res.json() as ParentCategories;
            })
            .catch(this.handleError);
    }

    addSelectedCategory(category: Category): void {
        // Only add if category is not null and doesn't exist in selected categories
        if (category != null && this.selectedCategories.findIndex(c => c.id == category.id) == -1) {
            this.selectedCategories.push(category);
            sortCategories(this.selectedCategories);
        }
    }

    getRootCategories(taxonomyId: string): Promise<Category[]>{
        const url = `${this.baseUrl}/taxonomies/${taxonomyId}/root-categories`;
        return this.http
            .get(url, {headers: getAuthorizedHeaders(this.cookieService)})
            .toPromise()
            .then(res => {
                return res.json() as Category;
            })
            .catch(this.handleError);
    }

    getChildrenCategories(category: Category): Promise<Category[]>{
        const url = `${this.baseUrl}/taxonomies/${category.taxonomyId}/categories/children-categories?categoryId=${encodeURIComponent(category.id)}`;
        return this.http
            .get(url, {headers: getAuthorizedHeaders(this.cookieService)})
            .toPromise()
            .then(res => {
                return res.json() as Category;
            })
            .catch(this.handleError);
    }

    getAvailableTaxonomies(){
        const url = `${this.baseUrl}/taxonomies/id`;
        return this.http
            .get(url, {headers: getAuthorizedHeaders(this.cookieService)})
            .toPromise()
            .then(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    resetSelectedCategories():void {
        this.selectedCategories.splice(0, this.selectedCategories.length);
    }

    resetData():void {
        this.resetSelectedCategories();
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}

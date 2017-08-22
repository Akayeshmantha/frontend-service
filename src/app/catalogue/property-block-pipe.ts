/**
 * Created by suat on 05-Aug-17.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {ItemProperty} from "./model/publish/item-property";
import {Category} from "./model/category/category";
import {Property} from "./model/category/property";
import {CategoryService} from "./category/category.service";
import {ProductPropertiesComponent} from "./product-properties.component";
import {PublishService} from "./publish-and-aip.service";
import {CatalogueLine} from "./model/publish/catalogue-line";

/**
 * Pipe to transform the custom properties and properties of selected categories for a product to property blocks to
 * be presented in the user interface.
 */
@Pipe({name: 'propertyBlockPipe'})
export class PropertyBlockPipe implements PipeTransform {
    private selectedCategories: Category[] = [];
    private itemProperties: ItemProperty[] = [];
    private propertyBlocks: Array<any> = [];
    private checkedProperties: Array<string> = [];

    constructor(private categoryService: CategoryService,
                private publishStateService: PublishService) {
    }

    transform(itemProperties: ItemProperty[]): any {
        console.log("in pipe");
        this.selectedCategories = this.categoryService.getSelectedCategories();
        //this.itemProperties = itemProperties.goodsItem.item.additionalItemProperty;
        this.itemProperties = itemProperties;
        this.propertyBlocks = [];
        this.checkedProperties = [];
        return this.retrievePropertyBlocks();
    }

    /**
     * Creates the property block array by parsing the additional item property array of the item
     */
    retrievePropertyBlocks(): any {
        this.refreshPropertyBlocks();
        return this.propertyBlocks;
    }

    refreshPropertyBlocks(): void {

        // commodity classifications
        if (this.selectedCategories != null) {
            for (let category of this.selectedCategories) {
                if (category.taxonomyId == 'eClass') {
                    this.createEClassPropertyBlocks(category);
                } else {
                    this.createPropertyBlock(category);
                }
            }
        }
    }

    /**
     * Creates two blocks as eClass-base and eClass-specific and puts properties into those
     */
    private createEClassPropertyBlocks(category: Category): void {

        let basePropertyBlock: any = {};
        let name:string = category.preferredName + " (" + category.taxonomyId + " - Base)";
        basePropertyBlock['name'] = name;
        basePropertyBlock['isCollapsed'] = this.publishStateService.getCollapsedState(name);

        let specificPropertyBlock: any = {};
        name = category.preferredName + " (" + category.taxonomyId + " - Specific)";
        specificPropertyBlock['name'] = name;
        specificPropertyBlock['isCollapsed'] = this.publishStateService.getCollapsedState(name);


        let baseProperties: ItemProperty[] = [];
        let specificProperties: ItemProperty[] = [];
        for (let property of category.properties) {
            let aip: ItemProperty;
            let index = this.itemProperties.findIndex(ip => ip.id == property.id);
            if (index > -1) {
                aip = this.itemProperties[index];
            }
            else continue;

            //aip.propertyDefinition = property.definition;
            if (!this.isPropertyPresentedAlready(property)) {
                if (this.isBaseEClassProperty(property)) {
                    baseProperties.push(aip);

                } else {
                    specificProperties.push(aip);
                }
                this.checkedProperties.push(property.id);
            }
        }

        this.propertyBlocks.push(basePropertyBlock);
        this.propertyBlocks.push(specificPropertyBlock);

        basePropertyBlock['properties'] = baseProperties;
        specificPropertyBlock['properties'] = specificProperties;
    }

    private createPropertyBlock(category: Category): void {

        let propertyBlock: any = {};
        let name:string = category.preferredName + " (" + category.taxonomyId + ")";
        propertyBlock['name'] = name;
        propertyBlock['isCollapsed'] = this.publishStateService.getCollapsedState(name);
        this.propertyBlocks.push(propertyBlock);

        let properties: ItemProperty[] = [];
        for (let property of category.properties) {
            if (!this.isPropertyPresentedAlready(property)) {
                properties.push(this.getItemProperty(property));
                this.checkedProperties.push(property.id)
            }
        }
        propertyBlock['properties'] = properties;
    }

    private isPropertyPresentedAlready(property: Property): boolean {
        for (let id of this.checkedProperties) {
            if (property.id == id) {
                return true;
            }
        }
        return false;
    }

    private getItemProperty(property: Property): ItemProperty {
        for (let aip of this.itemProperties) {
            if (aip.id == property.id) {
                return aip;
            }
        }
        console.error("Property could not be found in additional item properties: " + property.id)
    }

    /*
     Checks whether the property is a base property common for many eClass properties

     The properties that are treated as a base property :
     0173-1#02-AAD931#005 - customs tariff number (TARIC)
     0173-1#02-AAO663#003 - GTIN
     0173-1#02-BAB392#012 - certificate/approval
     0173-1#02-AAO677#002 - Manufacturer name
     0173-1#02-AAO676#003 - product article number of manufacturer
     0173-1#02-AAO736#004 - product article number of supplier
     0173-1#02-AAO735#003 - name of supplier

     0173-1#02-AAP794#001 - Offerer/supplier
     0173-1#02-AAQ326#002 - address of additional link
     0173-1#02-BAE391#004 - Scope of performance
     0173-1#02-AAP796#004 - supplier of the identifier
     0173-1#02-BAF831#002 - Personnel qualification
     0173-1#02-AAM551#002 - Supplier product designation
     0173-1#02-AAU734#001 - Manufacturer product description
     0173-1#02-AAU733#001 - Manufacturer product order suffix
     0173-1#02-AAU732#001 - Manufacturer product root
     0173-1#02-AAU731#001 - Manufacturer product family
     0173-1#02-AAU730#001 - Supplier product description
     0173-1#02-AAU729#001 - Supplier product root
     0173-1#02-AAU728#001 - Supplier product family
     0173-1#02-AAO742#002 - Brand
     0173-1#02-AAW336#001 - Supplier product type
     0173-1#02-AAW337#001 - Supplier product order suffix
     0173-1#02-AAW338#001 - Manufacturer product designation
     0173-1#02-AAO057#002 - Product type
     */
    private isBaseEClassProperty(property: Property): boolean {
        let pid: string = property.id;
        if (pid == "0173-1#02-AAD931#005" ||
            pid == "0173-1#02-AAO663#003" ||
            pid == "0173-1#02-BAB392#012" ||
            pid == "0173-1#02-AAO677#002" ||
            pid == "0173-1#02-AAO676#003" ||
            pid == "0173-1#02-AAO736#004" ||
            pid == "0173-1#02-AAO735#003" ||
            pid == "0173-1#02-AAP794#001" ||
            pid == "0173-1#02-AAQ326#002" ||
            pid == "0173-1#02-BAE391#004" ||
            pid == "0173-1#02-AAP796#004" ||
            pid == "0173-1#02-BAF831#002" ||
            pid == "0173-1#02-AAM551#002" ||
            pid == "0173-1#02-AAU734#001" ||
            pid == "0173-1#02-AAU733#001" ||
            pid == "0173-1#02-AAU732#001" ||
            pid == "0173-1#02-AAU731#001" ||
            pid == "0173-1#02-AAU730#001" ||
            pid == "0173-1#02-AAU729#001" ||
            pid == "0173-1#02-AAU728#001" ||
            pid == "0173-1#02-AAO742#002" ||
            pid == "0173-1#02-AAW336#001" ||
            pid == "0173-1#02-AAW337#001" ||
            pid == "0173-1#02-AAW338#001" ||
            pid == "0173-1#02-AAO057#002") {
            return true;
        } else {
            return false;
        }
    }

}
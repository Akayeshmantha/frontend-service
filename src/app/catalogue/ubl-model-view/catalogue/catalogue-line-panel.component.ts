import {Component, Input, Output,EventEmitter} from "@angular/core";
import {CatalogueLine} from "../../model/publish/catalogue-line";
import {CatalogueService} from "../../catalogue.service";
import {Router} from "@angular/router";
import {PublishService} from "../../publish-and-aip.service";
import {CategoryService} from "../../category/category.service";
import { ProductWrapper } from "../../../common/product-wrapper";
import { CompanyNegotiationSettings } from "../../../user-mgmt/model/company-negotiation-settings";
import { CallStatus } from "../../../common/call-status";
import { isTransportService } from "../../../common/utils";
import { CompanySettings } from "../../../user-mgmt/model/company-settings";
import {Item} from '../../model/publish/item';
import {selectDescription} from '../../../common/utils';

@Component({
    selector: 'catalogue-line-panel',
    templateUrl: './catalogue-line-panel.component.html'
})

export class CatalogueLinePanelComponent {

    @Input() catalogueLine: CatalogueLine;
    @Input() settings: CompanySettings;
    @Input() presentationMode: string;

    // check whether catalogue-line-panel should be displayed
    @Input() show = false;
    @Output() showChange = new EventEmitter<boolean>();
    @Output() catalogueLineDeleted = new EventEmitter();

    productWrapper: ProductWrapper;

    constructor(private catalogueService: CatalogueService,
                private categoryService: CategoryService,
                private publishService: PublishService,
                private router: Router) {
    }

    selectDescription (item:  Item) {
        return selectDescription(item);
    }

    ngOnInit() {
        this.productWrapper = new ProductWrapper(this.catalogueLine, new CompanyNegotiationSettings());
    }

    redirectToEdit() {
        this.catalogueService.editCatalogueLine(this.catalogueLine);
        this.publishService.publishMode = 'edit';
        this.publishService.publishingStarted = false;
        this.categoryService.resetSelectedCategories();
        this.router.navigate(['catalogue/publish'], {queryParams: {
                pg: "single",
                productType: isTransportService(this.catalogueLine) ? "transportation" : "product"}});
    }

    deleteCatalogueLine(): void {
        this.catalogueLineDeleted.next(null);
    }
}

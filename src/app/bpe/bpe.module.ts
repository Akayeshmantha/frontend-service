import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from "../common/common.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BPERoutingModule } from './bpe-routing.module';

// ToDo: Get rid of these dependencies
import { CatalogueModule } from '../catalogue/catalogue.module';

import { TradingDetailsComponent } from './bp-view/negotiation/trading-details.component';
import { BPConfigureComponent } from './bp-configure.component';
import { BPsComponent } from './bps.component';
import { BPDetailComponent } from './bp-detail.component';
import { ProductBpOptionsComponent } from "./bp-view/product-bp-options.component";
import { RequestForQuotationComponent } from "./bp-view/negotiation/request-for-quotation.component";
import { OrderResponseComponent } from "./bp-view/order/order-response.component";
import { OrderBpComponent } from "./bp-view/order/order-bp.component";
import { OrderComponent } from "./bp-view/order/order.component";
import { FulfilmentComponent } from "./bp-view/fulfilment/fulfilment.component";
import { DespatchAdviceComponent } from "./bp-view/fulfilment/despatch-advice.component";
import { ReceiptAdviceComponent } from "./bp-view/fulfilment/receipt-advice.component";
import { NegotiationComponent } from "./bp-view/negotiation/negotiation.component";
import { QuotationComponent } from "./bp-view/negotiation/quotation.component";
import { TransportExecutionPlanBpComponent } from "./bp-view/transport-execution-plan/transport-execution-plan-bp.component";
import { TransportExecutionPlanRequestComponent } from "./bp-view/transport-execution-plan/transport-execution-plan-request.component";
import { TransportExecutionPlanComponent } from "./bp-view/transport-execution-plan/transport-execution-plan.component";
import { BpProductDetailsComponent } from "./bp-view/bp-product-details.component";
import { ItemInformationRequestBpComponent } from "./bp-view/item-information-request/item-information-request-bp.component";
import { ItemInformationRequestComponent } from "./bp-view/item-information-request/item-information-request.component";
import { PpapComponent} from "./bp-view/ppap/ppap.component";
import { PpapResponseComponent} from "./bp-view/ppap/ppap-response.component";
import { PpapViewComponent} from "./bp-view/ppap/ppap-view.component";

//import { BPEService } from './bpe.service';
//import { BPService } from './bp.service';
//import { BPDataService } from "./bp-view/bp-data-service";

@NgModule({
	imports: [
		CommonModule,
		AppCommonModule,
		FormsModule,
		HttpModule,
		ReactiveFormsModule,
		BPERoutingModule,
		CatalogueModule,
		NgbModule.forRoot()
	],
	declarations: [
		TradingDetailsComponent,
		BPConfigureComponent,
		BPsComponent,
		BPDetailComponent,
		ProductBpOptionsComponent,
		RequestForQuotationComponent,
		OrderResponseComponent,
		OrderBpComponent,
		OrderComponent,
		FulfilmentComponent,
		DespatchAdviceComponent,
		ReceiptAdviceComponent,
		NegotiationComponent,
		QuotationComponent,
		TransportExecutionPlanBpComponent,
		TransportExecutionPlanRequestComponent,
		TransportExecutionPlanComponent,
		BpProductDetailsComponent,
		ItemInformationRequestBpComponent,
		ItemInformationRequestComponent,
        PpapComponent,
        PpapResponseComponent,
        PpapViewComponent
	],
	exports: [
		TradingDetailsComponent,
		BPConfigureComponent,
		BPsComponent,
		BPDetailComponent,
		ProductBpOptionsComponent,
		RequestForQuotationComponent,
		OrderResponseComponent,
		OrderBpComponent,
		OrderComponent,
		FulfilmentComponent,
		DespatchAdviceComponent,
		ReceiptAdviceComponent,
		NegotiationComponent,
		QuotationComponent,
		TransportExecutionPlanBpComponent,
		TransportExecutionPlanRequestComponent,
		TransportExecutionPlanComponent,
		BpProductDetailsComponent,
		ItemInformationRequestBpComponent,
		ItemInformationRequestComponent
	],
	providers: [
	]
})

export class BPEModule {}
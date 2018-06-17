import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from "../common/common.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BPERoutingModule } from './bpe-routing.module';

// ToDo: Get rid of these dependencies
import { CatalogueModule } from '../catalogue/catalogue.module';

import { BPConfigureComponent } from './bp-configure.component';
import { BPsComponent } from './bps.component';
import { BPDetailComponent } from './bp-detail.component';
import { ProductBpOptionsComponent } from "./bp-view/product-bp-options.component";
import { OrderResponseComponent } from "./bp-view/order/order-response.component";
import { OrderBpComponent } from "./bp-view/order/order-bp.component";
import { OrderComponent } from "./bp-view/order/order.component";
import { FulfilmentComponent } from "./bp-view/fulfilment/fulfilment.component";
import { DespatchAdviceComponent } from "./bp-view/fulfilment/despatch-advice.component";
import { ReceiptAdviceComponent } from "./bp-view/fulfilment/receipt-advice.component";
import { NegotiationComponent } from "./bp-view/negotiation/negotiation.component";
import { TransportExecutionPlanBpComponent } from "./bp-view/transport-execution-plan/transport-execution-plan-bp.component";
import { TransportExecutionPlanRequestComponent } from "./bp-view/transport-execution-plan/transport-execution-plan-request.component";
import { TransportExecutionPlanComponent } from "./bp-view/transport-execution-plan/transport-execution-plan.component";
import { BpProductDetailsComponent } from "./bp-view/bp-product-details.component";
import { ItemInformationRequestBpComponent } from "./bp-view/item-information-request/item-information-request-bp.component";
import { ItemInformationRequestComponent } from "./bp-view/item-information-request/item-information-request.component";
import { PpapComponent} from "./bp-view/ppap/ppap.component";

import { PpapDocumentSelectComponent} from "./bp-view/ppap/ppap-document-select.component";
import { PpapDocumentUploadComponent} from "./bp-view/ppap/ppap-document-upload.component";
import { PpapDocumentDownloadComponent} from "./bp-view/ppap/ppap-document-download.component";

import { BusinessProcessOptions} from './bp-view/business-process-options';
import {ContractComponent} from "./bp-view/contract/contract.component";
import {ClauseComponent} from "./bp-view/contract/clause.component";
import {DataMonitoringClauseComponent} from "./bp-view/contract/data-monitoring-clause.component";
import {DocumentClauseComponent} from "./bp-view/contract/document-clause.component";
import {PpapClauseComponent} from "./bp-view/contract/ppap-clause.component";
import { ProductBpStepsComponent } from './bp-view/product-bp-steps.component';
import { NegotiationRequestComponent } from './bp-view/negotiation/negotiation-request.component';
import { NegotiationRequestInputComponent } from './bp-view/negotiation/negotiation-request-input.component';
import { NegotiationResponseComponent } from './bp-view/negotiation/negotiation-response.component';
import { NegotiationAddressComponent } from './bp-view/negotiation/negotiation-address.component';
import { NegotiationResponseInputComponent } from './bp-view/negotiation/negotiation-response-input.component';
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
		BPConfigureComponent,
		BPsComponent,
		BPDetailComponent,
		ProductBpOptionsComponent,
		ProductBpStepsComponent,
		OrderResponseComponent,
		OrderBpComponent,
		OrderComponent,
		FulfilmentComponent,
		DespatchAdviceComponent,
		ReceiptAdviceComponent,
		NegotiationComponent,
		NegotiationRequestComponent,
		NegotiationRequestInputComponent,
		NegotiationResponseInputComponent,
		NegotiationResponseComponent,
		TransportExecutionPlanBpComponent,
		TransportExecutionPlanRequestComponent,
		TransportExecutionPlanComponent,
		BpProductDetailsComponent,
		ItemInformationRequestBpComponent,
		ItemInformationRequestComponent,
        PpapComponent,
        PpapDocumentSelectComponent,
		PpapDocumentUploadComponent,
		PpapDocumentDownloadComponent,
        BusinessProcessOptions,
		ContractComponent,
		ClauseComponent,
		DataMonitoringClauseComponent,
		DocumentClauseComponent,
		PpapClauseComponent,
		NegotiationAddressComponent
	],
	exports: [
		BPConfigureComponent,
		BPsComponent,
		BPDetailComponent,
		ProductBpOptionsComponent,
		OrderResponseComponent,
		OrderBpComponent,
		OrderComponent,
		FulfilmentComponent,
		DespatchAdviceComponent,
		ReceiptAdviceComponent,
		NegotiationComponent,
		TransportExecutionPlanBpComponent,
		TransportExecutionPlanRequestComponent,
		TransportExecutionPlanComponent,
		BpProductDetailsComponent,
		ItemInformationRequestBpComponent,
		ItemInformationRequestComponent,
        BusinessProcessOptions,
		ContractComponent,
		ClauseComponent,
		DataMonitoringClauseComponent,
		DocumentClauseComponent,
		PpapClauseComponent
	],
	providers: [
	]
})

export class BPEModule {}
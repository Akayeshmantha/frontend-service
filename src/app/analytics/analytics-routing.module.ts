import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlatformAnalyticsComponent} from "./platform-analytics.component";
import {CompanyAnalyticsComponent} from "./company-analytics.component";
import {TrustPolicyComponent} from "./trust-policy.component";
import {CompanyManagementComponent} from "./company-management.component";
import {PlatformInfoComponent} from "./platform-info.component";

const routes: Routes = [
	{path: 'platform', component: PlatformAnalyticsComponent},
	{path: 'company', component: CompanyAnalyticsComponent},
	{path: 'trust', component: TrustPolicyComponent},
	{path: 'management', component: CompanyManagementComponent},
	{path: 'info', component: PlatformInfoComponent}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})

export class AnalyticsRoutingModule {}

import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./analytics.service";
import { CallStatus } from "../common/call-status";

@Component({
    selector: "platform-analytics",
    templateUrl: "./platform-analytics.component.html",
    styleUrls: ["./platform-analytics.component.css"]
})
export class PlatformAnalyticsComponent implements OnInit {
    user_count = -1;
    comp_count = -1;
    bp_count = -1;
    trade_count = -1;
    green_perc = 0;
    yellow_perc = 0;
    red_perc = 0;
    green_perc_str = "0%";
    yellow_perc_str = "0%";
    red_perc_str = "0%";
    trade_green_perc = 0;
    trade_yellow_perc = 0;
    trade_red_perc = 0;
    trade_green_perc_str = "0%";
    trade_yellow_perc_str = "0%";
    trade_red_perc_str = "0%";

    callStatus: CallStatus = new CallStatus();

    constructor(private analyticsService: AnalyticsService) {

    }

    ngOnInit(): void {
        this.callStatus.submit();

        this.analyticsService
            .getPlatAnalytics()
            .then(res => {
                this.callStatus.callback("Successfully loaded platform analytics", true);
                this.user_count = res.identity.totalUsers;
                this.comp_count = res.identity.totalCompanies;
                this.bp_count = Math.round(res.businessProcessCount.state.approved + res.businessProcessCount.state.waiting + res.businessProcessCount.state.denied);
                this.green_perc = Math.round((res.businessProcessCount.state.approved * 100) / this.bp_count);
                this.green_perc_str = this.green_perc + "%";
                this.yellow_perc = Math.round((res.businessProcessCount.state.waiting * 100) / this.bp_count);
                this.yellow_perc_str = this.yellow_perc + "%";
                this.red_perc = 100 - this.green_perc - this.yellow_perc;
                this.red_perc_str = this.red_perc + "%";
                this.trade_count = Math.round(res.tradingVolume.approved + res.tradingVolume.waiting + res.tradingVolume.denied);
                this.trade_green_perc = Math.round((res.tradingVolume.approved * 100) / this.trade_count);
                this.trade_green_perc_str = this.trade_green_perc + "%";
                this.trade_yellow_perc = Math.round((res.tradingVolume.waiting * 100) / this.trade_count);
                this.trade_yellow_perc_str = this.trade_yellow_perc + "%";
                this.trade_red_perc = 100 - this.trade_green_perc - this.trade_yellow_perc;
                this.trade_red_perc_str = this.trade_red_perc + "%";
            })
            .catch(error => {
                this.callStatus.error("Error while loading platform analytics", error);
            });
    }

    isLoading(): boolean {
        return this.callStatus.fb_submitted;
    }
}

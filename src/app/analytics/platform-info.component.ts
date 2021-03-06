import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./analytics.service";
import { CallStatus } from '../common/call-status';
import * as myGlobals from '../globals';
import {selectPartyName} from '../common/utils';
import { AppComponent } from "../app.component";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "platform-info",
    templateUrl: "./platform-info.component.html",
    styleUrls: ["./platform-info.component.css"]
})

export class PlatformInfoComponent implements OnInit {

    config = myGlobals.config;
    registeredCompaniesPage = null;
    registeredCompaniesCallStatus: CallStatus = new CallStatus();
    imgEndpoint = myGlobals.user_mgmt_endpoint+"/company-settings/image/";
    size = 16;

    getNameOfTheCompany = selectPartyName;

    constructor(
      private analyticsService: AnalyticsService,
      public appComponent: AppComponent,
      private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params["size"]) {
              this.size = params["size"];
            }
            else {
              this.size = 16;
            }
        });
        this.registeredCompaniesCallStatus.submit();
        this.updateRegisteredCompanies(1);
    }

    updateRegisteredCompanies(requestedPage: number): void {
        this.analyticsService
            .getVerifiedCompanies(requestedPage,this.size)
            .then(res => {
                this.registeredCompaniesCallStatus.callback("Successfully loaded registered companies", true);
                res = this.updateLinks(res);
                this.registeredCompaniesPage = res;
                this.registeredCompaniesPage.number += 1; // number has offset of 1
            })
            .catch(error => {
                this.registeredCompaniesCallStatus.error("Error while loading registered companies page", error);
            });
    }

    updateLinks(regComp: any): any {
      if (regComp.content) {
        for (var i=0; i<regComp.content.length; i++) {
          if (regComp.content[i].websiteURI && regComp.content[i].websiteURI != "") {
            var comp_link = regComp.content[i].websiteURI;
            if (comp_link.indexOf("http://") == -1 && comp_link.indexOf("https://") == -1) {
              regComp.content[i].websiteURIFull = "http://"+regComp.content[i].websiteURI;
            }
            else {
              regComp.content[i].websiteURIFull = regComp.content[i].websiteURI;
            }
            if (!this.checkURL(regComp.content[i].websiteURIFull))
              regComp.content[i].websiteURIFull = "";
          }
        }
      }
      return regComp;
    }

    checkURL(url: string): boolean {
      var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      var match = false;
      if (url.match(regex))
        match = true;
      return match;
    }

    getCompanyLogo(ref: any): string {
      var href = "assets/empty_img.png";
      if (ref) {
        var id = -1;
        for (var i=0; i<ref.length; i++) {
          if (ref[i].documentType && ref[i].hjid && ref[i].documentType=="CompanyLogo")
            id = ref[i].hjid;
        }
        if (id != -1)
          href = this.imgEndpoint+""+id;
      }
      return href;
    }

    onRegisteredCompaniesPageChange(newPage): void {
        this.registeredCompaniesCallStatus.submit();
        if (newPage && newPage !== this.registeredCompaniesPage.number) {
            this.updateRegisteredCompanies(newPage);
        }
    }

}

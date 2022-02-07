import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { InsuranceReportService } from 'src/app/insurance-report.service';
import { InsuranceRequest } from 'src/app/insurance-request';
import { InsuranceResponse } from 'src/app/insurance-response';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private insuranceService: InsuranceReportService) { }
  public planNames: string[];
  public planStatuses: any;
  public planNameField: string;
  public planStatusField: string;

  public selectedPlan = "select";
  public selectedStatus = "select";

  insurancerequest: InsuranceRequest = new InsuranceRequest();
  insuranceResponse: InsuranceResponse[] = [];

  ngOnInit(): void {
    this.getPlanName();
    this.getPlanStatus();
  }

  getPlanName() {
    this.insuranceService.getPlanName().subscribe(data => {
      this.planNames = data;
    });
  }
  getPlanStatus() {
    this.insuranceService.getPlanStatus().subscribe(data => {
      this.planStatuses = data;
    });
  }
  search() {
    this.insurancerequest.planName = this.selectedPlan;
    this.insurancerequest.planStatus = this.selectedStatus;
    this.insuranceService.search(this.insurancerequest).subscribe(data => {
      console.log(data)
      this.insuranceResponse = data;
    },
      error => console.log(error)
    );
  }
  onSubmit() {
    this.search();
  }
  exportToExcel() {
    this.insuranceService.getExcel().subscribe(data => {
      let file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  exportToPdf() {
    this.insuranceService.getPDF().subscribe(data => {
      let file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });

  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsuranceRequest } from './insurance-request';
import { InsuranceResponse } from './insurance-response';


@Injectable({
  providedIn: 'root'
})
export class InsuranceReportService {

  private baseUrl: string = "http://localhost:9090/insurance";

  constructor(private httpClient: HttpClient) { }

  getPlanName(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}` + `/planname`);
  }

  getPlanStatus(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}` + `/planstatus`);
  }

  getExcel() {
    return this.httpClient.get<any>(`${this.baseUrl}/export/excel`, { responseType: 'arraybuffer' as 'json' });
  }
  getPDF() {
    return this.httpClient.get<any>(`${this.baseUrl}/export/pdf`, { responseType: 'arraybuffer' as 'json' });
  }
  search(request: InsuranceRequest): Observable<InsuranceResponse[]> {
    return this.httpClient.post<InsuranceResponse[]>(`${this.baseUrl}` + `/search`, request);
  }
}

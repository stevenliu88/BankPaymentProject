import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BankAccount } from './Models/BankAccount';
@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient) { }

  postBankAccount(formData) {
    return this.http.post(environment.apiBaseURI + '/BankAccount', formData);
  }
  getBankAccountList(): Observable<Array<BankAccount>> {
    return this.http.get<Array<BankAccount>>(environment.apiBaseURI + '/BankAccount');
  }
  updateBankAccount(formData) {
    return this.http.put(environment.apiBaseURI + `/BankAccount/${formData.bankAccountId}`, formData);
  }
  removeBankAccount(bankAccountId: number) {
    return this.http.delete(environment.apiBaseURI + `/BankAccount/${bankAccountId}`);
  }
}

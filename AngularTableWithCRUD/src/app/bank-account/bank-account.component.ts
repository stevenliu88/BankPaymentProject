import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { BankService } from '../shared/bank.service';
import { BankAccountService } from '../shared/bank-account.service';
import { BankAccount } from '../shared/Models/BankAccount';
@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {
  private bankAccountDetail: BankAccount;
  bankList = [];
  bankAccountForms: FormArray = this.fb.array([]);
  constructor(private fb: FormBuilder, private bankService: BankService, private bankAccountService: BankAccountService) { }

  ngOnInit() {
    this.getBankDetail();
    this.getBankAccountDetail();
  }

  addBankAccountForm() {
    this.bankAccountForms.push(this.fb.group({
      bankAccountId : [0],
      accountNumber: ['', Validators.required],
      accountHolder: ['', Validators.required],
      bankID : [0, Validators.min(1)],
      IFSC: ['', Validators.required]
    }));
  }

  getBankDetail() {
    this.bankService.getBankList().subscribe( res => this.bankList = res as []);
  }

  getBankAccountDetail(){
    this.bankAccountService.getBankAccountList().subscribe(res => {
      if (res.length > 0 ) {
        (res as Array<BankAccount>).forEach((bankAccount: BankAccount) => {
          console.log('bankAccount', bankAccount);
          this.bankAccountForms.push(this.fb.group({
            bankAccountId : [bankAccount.bankAccountID],
            accountNumber: [bankAccount.accountNumber, Validators.required],
            accountHolder: [bankAccount.accountHolder, Validators.required],
            bankID : [bankAccount.bankID, Validators.min(1)],
            IFSC: [bankAccount.ifsc, Validators.required]
          }));
        });
      } else {
        this.addBankAccountForm();
      }
    });
  }
  recordSubmit(fg: FormGroup) {
    fg.value.bankID = parseInt(fg.value.bankID);
    this.bankAccountService.postBankAccount(fg.value).subscribe(
      (res: any) => {
        fg.patchValue({bankAccountId: res.bankAccountId});
      },
      error => console.log(error)
      );
  }
}

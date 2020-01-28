import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  bankAccountForms: FormArray = this.fb.array([]);
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addBankAccountForm();
  }

  addBankAccountForm(){
    this.bankAccountForms.push(this.fb.group({
      bankAccountId : [0],
      accountNumber: [''],
      accountHolder: [''],
      bankID : [0],
      IFSC: ['']
    }));
  }
}

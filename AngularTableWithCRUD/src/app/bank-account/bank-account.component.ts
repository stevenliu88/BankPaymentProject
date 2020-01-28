import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { BankService } from '../shared/bank.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {
  bankList = [];
  bankAccountForms: FormArray = this.fb.array([]);
  constructor(private fb: FormBuilder, private bankService: BankService) { }

  ngOnInit() {
    this.addBankAccountForm();
    this.getBankDetail();
  }

  addBankAccountForm() {
    this.bankAccountForms.push(this.fb.group({
      bankAccountId : [0],
      accountNumber: [''],
      accountHolder: [''],
      bankID : [0],
      IFSC: ['']
    }));
  }

  getBankDetail() {
    this.bankService.getBankList().subscribe( res => this.bankList = res as []);
  }
}

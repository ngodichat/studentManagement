import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../../../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[]

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

  getAllTransactions(){
    this.transactionService.getAllTransactions().subscribe(transactions =>{
      this.transactions = transactions;
      this.success();
    })
  }

  success(){
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];
      transaction.filter_data = transaction.student_name;
      
    }
  }

}

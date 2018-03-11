import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../../components/transaction-history/transaction';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionService {

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>("/api/transactions/");
  }
}

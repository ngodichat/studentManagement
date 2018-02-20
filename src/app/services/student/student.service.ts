/**
 * Created By : Pham Nguyen Binh
 */

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Student } from "../../components/student/student";
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class StudentService {
  // students: Student[];
  constructor(private http: HttpClient) {}

  // Get all students list via API or any data storage
  getAllStudents(): Observable<Student[]> {
    const studentDataUrl = "/api/students/";
    return this.http.get<Student[]>(studentDataUrl);
  }

  doUpdateStudent(student: Student): Observable<any> {
    return this.http.put("/api/students/update", student, httpOptions).pipe(
      tap(_ => {
        console.log(`Update student id = ${student._id}`);
      }),
      catchError(this.handleError<any>("updateStudent"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  deleteStudent(index: any): Observable<any> {
    // const studentList = JSON.parse(localStorage.getItem("students"));

    // studentList.splice(index, 1);

    // localStorage.setItem("students", JSON.stringify(studentList));

    // const returnData = {
    //   code: 200,
    //   message: "Student Successfully Deleted",
    //   data: JSON.parse(localStorage.getItem("students"))
    // };

    // return returnData;

    return this.http
      .delete(`/api/students/delete/${index}`, httpOptions)
      .pipe(
        tap(_ => {
          console.log(`Delete student id = ${index}`)
        }),
        catchError(this.handleError<Student>("deleteStudent"))
      );
  }

  getStudentDetails(index: any): Observable<Student[]> {
    // const studentList = JSON.parse(localStorage.getItem("students"));
    // console.log(studentList);
    // let returnData: any = null;
    // for (let i = 0; i < studentList.length; i++) {
    //   const student = studentList[i];
    //   if (student.id === +index) {
    //     returnData = {
    //       code: 200,
    //       message: "Student Details Fetched",
    //       studentData: studentList[i]
    //     };
    //     console.log("FOUND");
    //     break;
    //   }
    // }
    // console.log("Get student detail " + "/api/students/" + index.toString());
    // const url = `http://localhost:3000/api/students/`;
    const url = "/api/students/" + index.toString();
    return this.http.get<Student[]>(url);
    // return returnData;
  }

  generateRandomID() {
    const x = Math.floor(Math.random() * Math.random() * 9999);
    return x;
  }
}
/**
 * Created By : Pham Nguyen Binh
 */

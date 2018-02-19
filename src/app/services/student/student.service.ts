/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Student } from "../../components/student/student";
import { catchError, map, tap } from "rxjs/operators";

@Injectable()
export class StudentService {
  // students: Student[];
  constructor(private http: HttpClient) {}

  // Get all students list via API or any data storage
  getAllStudents(): Observable<Student[]> {
    const studentDataUrl = "/api/students/";
    return this.http.get<Student[]>(studentDataUrl);
  }

  doRegisterStudent(data, index) {
    const studentList = JSON.parse(localStorage.getItem("students"));
    let returnData;
    console.log("index", index);
    if (index != null) {
      console.log("Update case");
      for (let i = 0; i < studentList.length; i++) {
        const student = studentList[i];
        if (student["id"] === +index) {
          studentList[i] = data;
          // console.log("Update student " + i);
          break;
        }
      }
      localStorage.setItem("students", JSON.stringify(studentList));
      returnData = {
        code: 200,
        message: "Student Successfully Updated",
        data: JSON.parse(localStorage.getItem("students"))
      };
    } else {
      console.log("Register case");
      data.id = this.generateRandomID();
      studentList.unshift(data);

      localStorage.setItem("students", JSON.stringify(studentList));

      returnData = {
        code: 200,
        message: "Student Successfully Added",
        data: JSON.parse(localStorage.getItem("students"))
      };
    }
    return returnData;
  }

  deleteStudent(index: number) {
    const studentList = JSON.parse(localStorage.getItem("students"));

    studentList.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(studentList));

    const returnData = {
      code: 200,
      message: "Student Successfully Deleted",
      data: JSON.parse(localStorage.getItem("students"))
    };

    return returnData;
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
    const url = "/api/students/"+ index.toString();
    return this.http.get<Student[]>(url);
    // return returnData;
  }

  generateRandomID() {
    const x = Math.floor(Math.random() * Math.random() * 9999);
    return x;
  }
}
/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

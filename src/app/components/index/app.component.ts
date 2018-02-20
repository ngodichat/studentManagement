/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Student Management By Sangwin Gawande";

  // Add few students for initial listing
  sessionList = [
    {
      id: 1,
      class_name: "Lớp thầy Cường",
      session_name: "19h-21h",
      year: 2017,
      nStudents: 200
    }
  ];

  studentDataUrl = "assets/data.json";

  constructor(private http: HttpClient) {
    // Save students to localStorage
    // localStorage.setItem("students", JSON.stringify(this.studentsList));
    // localStorage.setItem("students", JSON.stringify(this.studentData));
    this.getStudentData().subscribe(data => {
      const students: any[] = data["studentsList"];
      localStorage.setItem("students", JSON.stringify(students));
    });
    localStorage.setItem("sessions", JSON.stringify(this.sessionList));
    // http.get("/users").subscribe(data => {
    //   console.log(data);
    // });
  }

  getStudentData() {
    return this.http.get(this.studentDataUrl);
  }
}

/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

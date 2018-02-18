/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

// Services
import { StudentService } from "../../../services/student/student.service";
import { routerTransition } from "../../../services/config/config.service";
import { Student } from "../student";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"],
  animations: [routerTransition()],
  host: { "[@routerTransition]": "" }
})
export class StudentListComponent implements OnInit {
  studentList: any;
  students: Student[];
  constructor(
    private studentService: StudentService,
    private toastr: ToastrService
  ) {}
  // Call student list function on page load
  ngOnInit() {
    this.getStudentList();
  }

  // Get student list from services
  getStudentList() {
    this.studentService.getAllStudents().subscribe(students => {
      console.log(students);
      this.students = students;
      // this.success();
    });
  }

  // Get student list success
  success() {
    // this.students = abc.data;
    for (let i = 0; i < this.students.length; i++) {
      this.students[i].full_name =
        this.students[i].sur_middle_name +
        " " +
        this.students[i].first_name;
    }
  }

  // Delete a student with its index
  deleteStudent(index: number) {
    // get confirm box for confirmation
    const r = confirm("Are you sure?");
    if (r === true) {
      const studentDelete = this.studentService.deleteStudent(index);
      if (studentDelete) {
        this.toastr.success("Success", "Student Deleted");
      }
      this.getStudentList();
    }
  }
}
/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

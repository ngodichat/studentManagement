/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { RouterModule, Routes, Router, ActivatedRoute } from "@angular/router";

// Services
import { ValidationService } from "../../../services/config/config.service";
import { StudentService } from "../../../services/student/student.service";
import { routerTransition } from "../../../services/config/config.service";

import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { PhonePipe } from "./../../../pipes/phone.pipe";

@Component({
  selector: "app-student-add",
  templateUrl: "./student-add.component.html",
  styleUrls: ["./student-add.component.css"],
  animations: [routerTransition()]
  // host: { "[@routerTransition]": "" }
})
export class StudentAddComponent implements OnInit {
  // create studentAddForm of type FormGroup
  studentAddForm: FormGroup;
  index: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private toastr: ToastrService,
    private phonePipe: PhonePipe,
    private datePipe: DatePipe
  ) {
    // Check for route params
    this.route.params.subscribe(params => {
      this.index = params["id"];
      // check if ID exists in route & call update or add methods accordingly
      if (this.index && this.index != null && this.index !== undefined) {
        this.getStudentDetails(this.index);
      } else {
        this.createForm(null);
      }
    });
  }

  ngOnInit() {}

  // Submit student details form
  doRegister() {
    if (this.index && this.index != null && this.index !== undefined) {
      this.studentAddForm.value.id = this.index;
    } else {
      this.index = null;
    }
    const studentRegister = this.studentService.doRegisterStudent(
      this.studentAddForm.value,
      this.index
    );
    if (studentRegister) {
      if (studentRegister.code === 200) {
        this.toastr.success(studentRegister.message, "Success");
        this.router.navigate(["/"]);
      } else {
        this.toastr.error(studentRegister.message, "Failed");
      }
    }
  }

  // If this is update form, get user details and update form
  getStudentDetails(index: number) {
    const studentDetail = this.studentService.getStudentDetails(index);
    this.createForm(studentDetail);
  }

  get firstName() {
    return this.studentAddForm.get("first_name");
  }
  get lastName() {
    return this.studentAddForm.get("last_name");
  }
  get class() {
    return this.studentAddForm.get("class");
  }
  get school() {
    return this.studentAddForm.get("school");
  }
  get referral() {
    return this.studentAddForm.get("referral");
  }
  get totalMoney() {
    return this.studentAddForm.get("total_money");
  }
  get phone() {
    return this.studentAddForm.get("phone");
  }
  get startDate() {
    return this.studentAddForm.get("start_date");
  }
  get note() {
    return this.studentAddForm.get("note");
  }
  // If this is update request then auto fill form
  createForm(data) {
    this.studentAddForm = this.formBuilder.group({
      first_name: [
        data === null ? "" : data.studentData.first_name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      ],
      last_name: [
        data === null ? "" : data.studentData.last_name,
        [Validators.required]
      ],
      class: [data === null ? "" : data.studentData.class],
      school: [data === null ? "" : data.studentData.school],
      referral: [data === null ? "" : data.studentData.referral],
      phone: [
        data === null ? "" : data.studentData.phone,
        [Validators.required, Validators.maxLength(15)]
      ],
      total_money: [data === null ? 0 : data.studentData.total_money],
      start_date: [
        data === null
          ? ""
          : this.datePipe.transform(data.studentData.start_date, "yyyy-MM-dd")
      ],
      note: [data === null ? "" : data.studentData.note]
    });
  }
}

/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

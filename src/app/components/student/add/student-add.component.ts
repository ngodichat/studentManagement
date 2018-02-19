import { MyNumberPipe } from "./../../../pipes/my-number.pipe";
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
import { DatePipe, DecimalPipe } from "@angular/common";
import { PhonePipe } from "./../../../pipes/phone.pipe";
import { Student } from "../student";

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
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private myNumberPipe: MyNumberPipe
  ) {
    // Check for route params
    this.route.params.subscribe(params => {
      this.index = params["id"];
      // console.log("INDEX " + this.index);
      // check if ID exists in route & call update or add methods accordingly
      if (this.index && this.index !== null && this.index !== undefined) {
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
      this.studentAddForm.value._id = this.index;
    } else {
      this.index = null;
    }
    // const studentRegister = this.studentService.doRegisterStudent(
    //   this.studentAddForm.value,
    //   this.index
    // );
    // if (studentRegister) {
    //   if (studentRegister.code === 200) {
    //     this.toastr.success(studentRegister.message, "Success");
    //     this.router.navigate(["/students"]);
    //   } else {
    //     this.toastr.error(studentRegister.message, "Failed");
    //   }
    // }
    if(this.index) {
      const student: Student = this.studentAddForm.value;
      this.studentService.doUpdateStudent(student).subscribe(()=>{
        
      });
    }
  }

  // If this is update form, get user details and update form
  getStudentDetails(index: any) {
    this.studentService.getStudentDetails(index).subscribe(data=>{
      const studentDetail = data[0];
      // console.log(data);
      this.createForm(studentDetail);
    });
  }

  get firstName() {
    return this.studentAddForm.get("first_name");
  }
  get surMiddleName() {
    return this.studentAddForm.get("sur_middle_name");
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
    if (data !== null) {
      // console.log("index" + data.id);
    } else {
      console.log("DATA NULL");
    }
    this.studentAddForm = this.formBuilder.group({
      _id: [data === null ? -1 : data._id],
      first_name: [
        data === null ? "" : data.first_name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      ],
      sur_middle_name: [
        data === null ? "" : data.sur_middle_name,
        [Validators.required]
      ],
      class: [data === null ? "" : data.class],
      school: [data === null ? "" : data.school],
      referral: [data === null ? "" : data.referral],
      parent_name: [data === null ? "" : data.parent_name],
      phone: [
        data === null ? "" : data.phone,
        [Validators.required, Validators.maxLength(15)]
      ],
      total_money: [
        data === null
          ? 0
          : this.myNumberPipe.transform(data.total_money)
      ],
      start_date: [
        data === null
          ? ""
          : this.datePipe.transform(data.start_date, "yyyy-MM-dd")
      ],
      note: [data === null ? "" : data.note]
    });
  }
}

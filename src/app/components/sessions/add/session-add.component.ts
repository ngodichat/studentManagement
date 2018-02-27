import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SessionService } from "../../../services/sessions/session.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { Session } from "../sessions";
import { Student } from "../../student/student";
import { DatePipe } from "@angular/common";
import { MyNumberPipe } from "../../../pipes/my-number.pipe";

@Component({
  selector: "app-session-add",
  templateUrl: "./session-add.component.html",
  styleUrls: ["./session-add.component.css"]
})
export class SessionAddComponent implements OnInit {
  sessionAddForm: FormGroup;
  id: string;
  studentList: Student[];

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private myNumberPipe: MyNumberPipe
  ) {
    //check for route Params
    this.route.params.subscribe(params => {
      this.id = params["id"];
      if (this.id && this.id != undefined) {
        console.log(`Update session: ${this.id}`);
        // this.sessionAddForm.value._id = id;
        this.getSessionDetail(this.id);
      } else {
        this.createForm(null);
      }
    });
  }

  getSessionDetail(id: string) {
    var session: Session = this.sessionService.getSessionById(id);
    // console.log(session._id);
    this.createForm(session);
    this.getStudentsBySession(id);
  }

  createForm(data: Session) {
    this.sessionAddForm = this.formBuilder.group({
      _id: [data === null ? "-1" : data._id],
      class_name: [
        data === null ? "" : data.class_name,
        [Validators.required, Validators.maxLength(50)]
      ],
      start_date: [
        data === null
          ? ""
          : this.datePipe.transform(data.start_date, "yyyy-MM-dd"),
        [Validators.required]
      ],
      end_date: [
        data === null
          ? ""
          : this.datePipe.transform(data.end_date, "yyyy-MM-dd")
      ],
      start_time: [data === null ? 18 : this.formatTime(data.start_time),
      [Validators.pattern("\\d{1,2}(h){0,1}\\d{0,2}")]
    ],
      fee: [
        data === null ? "100.000" : this.myNumberPipe.transform(data.fee),
        [Validators.pattern("[0-9.]+")]
      ],
      nStudents: [{value: 0, disabled:  true}],
      students: [data === null ? [] : this.studentList]
    });
  }

  getStudentsBySession(sessionId: string) {
    this.sessionService.getStudentsBySession(sessionId).subscribe(students => {
      this.studentList = students;
      this.sessionAddForm.value.nStudents = students.length;
      console.log(this.sessionAddForm.value);
    });
    // console.log(studentList);
    // return studentList;
  }

  get className() {
    return this.sessionAddForm.get("class_name");
  }

  get startDate() {
    return this.sessionAddForm.get("start_date");
  }

  get endtDate() {
    return this.sessionAddForm.get("end_date");
  }

  get startTime() {
    return this.sessionAddForm.get("start_time");
  }

  get fee() {
    return this.sessionAddForm.get("fee");
  }

  get nStudents() {
    return this.sessionAddForm.get("nStudents");
  }

  doSubmit() {
    const fee: string = this.sessionAddForm.value.fee.toString();
    if (fee !== "0") {
      this.sessionAddForm.value.fee = fee.replace(".", "");
    } else {
      this.sessionAddForm.value.fee = 0;
    }
    
    // let time: string = this.sessionAddForm.value.start_time;
    // const pos_of_h = time.indexOf("h");
    // if(pos_of_h !== -1){
    //   console.log(+time.substr(0,pos_of_h)+(+time.substr(pos_of_h-1)/60));
    // }
    
    if (!this.id) {
      this.sessionService
        .doAddSession(this.sessionAddForm.value)
        .subscribe(_ => {
          this.toastr.success("Thành công", "Thêm mới lớp học thành công");
        });
    } else {
      this.sessionService
        .doUpdateSession(this.sessionAddForm.value)
        .subscribe(_ => {
          this.toastr.success("Thành công", "Cập nhật lớp học thành công");
        });
    }
  }

  formatTime(value: number) {
    if (Number.isInteger(value)) {
      return value.toString() + " h";
    } else{
      let valStr = Math.floor(value).toString();
      return valStr + "h30";

    } 
  }

  ngOnInit() {}
}

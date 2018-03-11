/**
 * Created By : Pham Nguyen Binh
 */

import { Component, OnInit, Renderer2, OnDestroy } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { RouterModule, Routes, Router } from "@angular/router";
import { ValidationService } from "../../services/config/config.service";
import { UserService } from "../../services/user/user.service";
import { ToastrService } from "ngx-toastr";
import { routerTransition } from "../../services/config/config.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  animations: [routerTransition()],
  host: { "[@routerTransition]": "" }
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, "hold-transition");
    this.renderer.addClass(document.body, "login-page");
    let s = this.renderer.createElement("script");
    s.text = `
      $(function () {
  			$('input').iCheck({
  				checkboxClass: 'icheckbox_square-blue',
  				radioClass: 'iradio_square-blue',
  				increaseArea: '20%' /* optional */
  			});
  		});
    `;

    this.renderer.appendChild(document.head, s);
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, ValidationService.emailValidator]],
      password: ["", [Validators.required, ValidationService.passwordValidator]]
    });
  }

  // Check if user already logged in
  ngOnInit() {
    if (localStorage.getItem("userData")) {
      this.router.navigate(["/students"]);
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "hold-transition");
    this.renderer.removeClass(document.body, "login-page");
  }

  // Initicate login
  doLogin() {
    const login = this.userService.doLogin(this.loginForm.value);
    this.success(login);
  }

  // Login success function
  success(data) {
    if (data.code === 200) {
      localStorage.setItem("userData", JSON.stringify(data.data));
      this.router.navigate(["/students"]);
      this.toastr.success("Thành công", "Đăng nhập thành công");
    } else {
      this.toastr.error("Thất bại", "Email/mật khẩu không đúng");
    }
  }
}

/**
 * Created By : Pham Nguyen Binh
 */

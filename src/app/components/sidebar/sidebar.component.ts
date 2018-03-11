import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  curUrl: string;
  constructor(private router: Router) {
    // Detect route changes for active sidebar menu
    this.router.events.subscribe(val => {
      this.routeChanged(val);
    });
  }

  // Detect route changes for active sidebar menu
  routeChanged(val) {
    console.log(`current URL: ${val.url}`);
    
    this.curUrl = val.url;
  }

  ngOnInit() {}
}

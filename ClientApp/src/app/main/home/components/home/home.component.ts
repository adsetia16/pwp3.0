import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'main-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: fuseAnimations,
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

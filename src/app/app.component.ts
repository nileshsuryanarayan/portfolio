import { Component, ElementRef, OnInit } from '@angular/core';
import { ProfileUtilityService } from './common/services/profile-utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.component.phone.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private _putility: ProfileUtilityService) {}

  ngOnInit(): void {
    let profile = this._putility.getProfileJson();
    console.log('Name: ', profile.name);
  }

}

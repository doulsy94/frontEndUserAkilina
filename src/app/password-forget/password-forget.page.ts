import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-password-forget',
  templateUrl: './password-forget.page.html',
  styleUrls: ['./password-forget.page.scss'],
})
export class PasswordForgetPage implements OnInit {

  constructor(private storageService: TokenStorageService, private back: Location, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  goBack(){
    this.back.back()
  }

}

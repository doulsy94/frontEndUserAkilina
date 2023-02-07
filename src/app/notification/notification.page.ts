import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';
import { DatePipe } from '@angular/common';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  id_user: any;
  id_notification: any;
  ministere: any;
  createur: any;
  notif: any;
  imagecreateur: any;

  constructor(
    private user: UsersService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.notification.listerNotification().subscribe((data) => {
      this.notif = data;
      this.ministere = data.ministere;
      this.createur = data.createur;
      // this.imagecreateur = data[0].imagecreateur
      console.log(data);
    });
  }
}

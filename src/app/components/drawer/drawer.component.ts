import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DataProviderService } from 'src/app/services/data-provider.service';
import {MatDialog} from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  userData: User = {} as User
  constructor(private dataService: DataProviderService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Subscribe to the httprequest of user data
    this.dataService.getUserData().subscribe(
      r => this.userData = r as User,
    )
  }

  openDialog(){
    const dialogRef = this.dialog.open(ContactComponent)

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog close`);
    });
  }
}

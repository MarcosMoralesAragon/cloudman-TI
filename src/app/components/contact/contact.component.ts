import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>) { }
  textFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit(): void {
  }
  send(){
    this.dialogRef.close("send")
  }
  close(){
    this.dialogRef.close("close")
  }
}

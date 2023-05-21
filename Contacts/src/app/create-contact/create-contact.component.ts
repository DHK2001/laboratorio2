import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  
  titles: string[] = ['Otro.', 'Sr.', 'Sra.'];
  contact!:Contact;
  contactList !: Array<Contact>;

  constructor(){
    this.contact = new Contact("", "", "", "Otro.")
  }

  ngOnInit(): void {
      
  }

  onSubmit() : void{
    const storedContacts = localStorage.getItem('contactList');
    if (storedContacts) {
      this.contactList = JSON.parse(storedContacts);
    } else {
      this.contactList = [];
    }

    const contactExiste = this.contactList.filter(contact => contact.phone === this.contact.phone);
    const correoExiste = this.contactList.filter(contact => contact.email === this.contact.email);

    if (contactExiste.length>0) {
      console.log(contactExiste);
      alert("Ya existe un usuario con este telefono.");
      return;
    }

    if (correoExiste.length>0) {
      alert("Ya existe un usuario con este correo.");
      return;
    }

    this.contactList.push(this.contact);

    localStorage.setItem("contactList", JSON.stringify(this.contactList));

    window.location.reload();
  }
}
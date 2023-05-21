import { Component } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent {

  contactList !: Array<Contact>;
  contactListFilter !: Array<Contact>;
  selectedContact ?: Contact;
  agregarContacto: boolean = false;
  search!:string;

  constructor() {
    
  }

  ngOnInit(): void {
    const storedContacts = localStorage.getItem('contactList');
    if (storedContacts) {
      this.contactList = JSON.parse(storedContacts);
      this.contactListFilter=this.contactList;
    } else {
      this.contactList = [];
      this.contactListFilter=this.contactList;
    }
  }

  onClick(contact : Contact){
    this.selectedContact = contact;
  }

  verAgregarContacto() : void{
    this.agregarContacto=!this.agregarContacto;
  }

  filterBySearch(){
  
      const filteredContacts = this.contactList.filter(contact => {
        const searchValue = this.search.toLowerCase();
        const contactPhone = contact.phone.toString().toLowerCase();
        const contactName = contact.name.toLowerCase();
        const contactEmail = contact.email.toLowerCase();
  
        return (
          contactPhone.includes(searchValue) ||
          contactName.includes(searchValue) ||
          contactEmail.includes(searchValue)
        );
      });
  
      this.contactListFilter=filteredContacts;
  }

}


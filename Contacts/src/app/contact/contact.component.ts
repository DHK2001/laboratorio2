import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  
  titles:string[] = ['Otro.', 'Sr.', 'Sra.'];
  contact!:Contact;
  contactList !: Array<Contact>;
  index:number;

  constructor(private route: ActivatedRoute, private router: Router){this.index=-1;}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      const storedContacts = localStorage.getItem('contactList');
      if (storedContacts) {
        this.contactList = JSON.parse(storedContacts);
  
        var contactS = this.contactList.find(contact => contact.phone.toString() === id);

        if (contactS) {
          this.contact = new Contact(contactS.name, contactS.email, contactS.phone, contactS.title);
          this.index = this.contactList.findIndex(contacto => contacto.phone.toString() === id);
        }
      }
    });
  }
  
  onSubmit() : void{

    if (this.index !== -1) {
      this.contactList[this.index] = this.contact;
      localStorage.setItem('contactList', JSON.stringify(this.contactList));

      alert("Se actualizo el contacto");
    }
  }

  eliminar() : void{

    if (this.index !== -1) {
      this.contactList.splice(this.index, 1);
      localStorage.setItem('contactList', JSON.stringify(this.contactList));

      alert("Se elimino el contacto");

      this.router.navigate(['/']);
    }
  }
}
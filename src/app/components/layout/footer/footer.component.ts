import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faAt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  faPhone = faPhone;
  faAt = faAt;
  faWhatsapp = faWhatsapp;
  faLinkedin = faLinkedin;
  faGithub = faGithub; 
}

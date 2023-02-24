import { Component, OnInit } from '@angular/core';
import { CommentaireService } from '../_services/commentaire.service';
import { IdeeService } from '../_services/idee.service';
import { MinistereService } from '../_services/ministere.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  slideWorkouts = {
    slidesPerView: 1.2,
    initialSlide: 0,
    speed: 400,
  };

  responsive= true

  p: any;

  searchText: any;

  //VARIABLE CONTENANT LES INFORMATIONS DES MINISTERES RECUPERER
  ministere: any;

  //VARIABLE CONTENANT LES INFORMATIONS DES IDEES RECUPERER
  idee: any;

  //VARIABLE CONTENANT LES INFORMATIONS DES COMMENTAIRES PAR IDEES RECUPERER
  commentaire: any;

  //VARIABLE CONTENANT LES INFORMATIONS DES COMMENTAIRES PAR IDEES RECUPERER
  users: any;

  //DECLARATION DES DIFFERENTS ATTRIBUT DE LA TABLE MINISTERE POUR MODIFIER
  libelle: any;
  description: any;
  image: any;

  // Les variables
  nbMinis: any;
  nbIdee: any;
  nbComment: any;
  nbUser: any;

  //DECLARATION DES DIFFERENTS ATTRIBUT DE LA TABLE IDEE
  contexte: any;
  contenu: any;
  nbrejaime: any;
  nbrejaimepas: any;

  //DECLARATION DES DIFFERENTS ATTRIBUT DE LA TABLE Commentaire
  contenu_commentaire: any;

  //VARIABLE PERMETTANT D'AFFIRMER LA VALIDATION
  isTrueP!: boolean;
  isNoTrueP!: boolean;

  //VARIABLE PERMETTANT LA VALIDATION
  isNoTrueR!: boolean;
  isTrueR!: boolean;

  constructor(
    private ministereService: MinistereService,
    private ideeService: IdeeService,
    private commentaireService: CommentaireService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    //METHODE PERMETTANT DE RECUPERER LA LISTE DES MINISTERE
    this.ministereService.listerMinistere().subscribe((data) => {
      this.ministere = data;
      this.nbMinis = this.ministere.length;
      console.log(data);
    });

    //METHODE PERMETTANT DE RECUPERER LA LISTE DES IDEES
    this.ideeService.listerIdee().subscribe((data) => {
      this.idee = data;
      this.nbIdee = this.idee.length;
      console.log(data);
    });

    //METHODE PERMETTANT DE RECUPERER LA LISTE DES COMMENTAIRES
    this.commentaireService.listerCommentaire().subscribe((data) => {
      this.commentaire = data;
      this.nbComment = this.commentaire.length;
      console.log(data);
    });

    //METHODE PERMETTANT DE RECUPERER LA LISTE DES USERS
    this.usersService.listerUser().subscribe((data) => {
      this.users = data;
      this.nbUser = this.users.length;
      console.log(data);
    });

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict';

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms =
        document.querySelectorAll<HTMLInputElement>('.needs-validation');

      // Loop over them and prevent submission
      Array.from(forms).forEach((form) => {
        form.addEventListener(
          'submit',
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add('was-validated');
          },
          false
        );
      });
    })();
  }
  /***************************** PARTIE MINISTERE *************************************/

  //METHODE PERMETTANT DE RECUPERER L'IMAGE DU MINISTERE
  recuperationImageMinistere(event: any) {
    this.image = event.target['files'][0];
    console.log(this.image);
  }

  //METHODE PERMETTANT D'ENVOYER LES VALEUR DU MINISTERE AU SERVICE
  ajouterMinistere() {
    console.log(this.libelle);

    this.ministereService
      .ajouterMinistere(this.image, this.libelle, this.description)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isTrueR = true;
          this.isNoTrueR = false;
          this.alerte();
          //this.reloadPage();
        },
        error: (err) => {
          this.isNoTrueR = true;
          this.isTrueR = false;
        },
      });
  }

  /********************** METHODE PERMETTANT DE SUPPRIMER UN MINISTERE  *****************/
  suprimerMinistere(id_ministere: any, id_user: any) {
    this.ministereService.supprimerMinistere(id_ministere, id_user).subscribe({
      next: (data) => {
        console.log(data);
        this.alerte();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //GET Ministere
  getAllMinistere() {
    this.ministereService.listerMinistere().subscribe((data) => {
      this.ministere = data;
      console.log(data.length);
    });
  }

  alerte(): void {
    setTimeout(() => {
      this.getAllMinistere();
    }, 1000);
  }

  //METHODE PERMETTANT D'ACTUALISER LA PAGE UNE FOIS LES DONNER AJOUTER
  reloadPage(): void {
    window.location.reload();
  }
}

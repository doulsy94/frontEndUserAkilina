import { Idee } from './idee';

export class User {
  id_user: any;
  username: any;
  email: any;
  numero: any;
  addresse: any;
  imageuser: any;
  password: any;
  confirmPassword: any;

  idee!: Idee[];
  likedIdee!: Idee[];
}

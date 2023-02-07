export class Fichier {
   nom!: String;
   url!: string;
   file: File;
 
   constructor(file: File) {
     this.file = file;
   }

}

export class Profile {
    id: number | null;
    name: string;
    lastname: string;
    image: string;
    image_s3: string;
  
    constructor(id: number | null, name: string, lastname: string, image: string, image_s3: string) {
      this.id = id;
      this.name = name;
      this.lastname = lastname;
      this.image = image;
      this.image_s3 = image_s3;
    }
  }
  
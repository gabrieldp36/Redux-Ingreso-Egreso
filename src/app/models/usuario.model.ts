export class Usuario {

    // Metodo estático para conversión al tipo Usuario
    static fromFirebase( { uid, nombre, email }: any ): Usuario {
        return new Usuario( uid, nombre, email);
    };

    // Definimos la estructura del documento "Usuario".
    public constructor(
        public uid: string,
        public nombre: string,
        public email: string,
    ) {};
}
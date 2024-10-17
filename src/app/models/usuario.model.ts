export class Usuario {
    // Definimos la estructura del documento "Usuario".
    public constructor(
        public uid: string,
        public nombre: string,
        public email: string,
    ) {};
}
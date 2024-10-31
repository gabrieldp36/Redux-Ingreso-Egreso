export class IngresoEgreso {

    static fromFirebase( { descripcion, monto, tipo, uid  }: any ): IngresoEgreso {
        return new IngresoEgreso( descripcion, monto, tipo, uid );
    };

    public constructor(
        public descripcion: string,
        public monto: number,
        public tipo: string,
        public uid?: string,
    ) {};
}
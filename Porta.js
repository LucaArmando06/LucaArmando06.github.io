class Porta {
    constructor(x, y, larghezza, altezza) {
        this.x = x;
        this.y = y;
        this.larghezza = larghezza;
        this.altezza = altezza;
    }

    mostra() { 
        fill(0, 0, 0, 0); //colore trasparente 
        rect(this.x, this.y, this.larghezza, this.altezza);
    }
}
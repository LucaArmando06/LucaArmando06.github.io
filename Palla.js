class Palla {
    constructor(palla_img) {
        this.img = palla_img;
        this.posX = width / 2; //in meta dello schermo 
        this.posY = height / 2;
        this.velX = 0; //ferma 
        this.velY = 0;
        this.size = 50; //dimensione raggio della palla
        this.raggio = this.size / 2; //raggio dell'elisse invisibile
    }

    muovi() {
        //quando la palla non è per terra aggiunge la gravita per farla tornare a terra 
        if (this.posY < height - this.raggio - ALTEZZA_BASE) {
            this.velY += GRAVITY;
        }
    
        //rimbalza contro la parte superiore dello schermo
        if (this.posY - this.raggio < 0 && this.velY < 0) {
            this.velY = -this.velY;  //rimbalza verso il basso
        }
    
        //rimbalza contro l'ALTEZZA_BASE
        if (this.posY > height - this.raggio - ALTEZZA_BASE) {
            this.velY = -this.velY + 1;  //rimbalza verso il basso con uno smorzamento della gravita in modo che dopo un po di salti si ferma (senza 1 rimbalza sempre alla stessa altezza)
            this.posY = height - this.raggio - ALTEZZA_BASE;
        }
    
        //rimbalza sulle pareti laterali
        if (this.posX - this.raggio < 0 || this.posX + this.raggio > width) {
            this.velX = -this.velX;  //rimbalza contro le pareti laterali verticali
        }
    
        //muove la palla in base alla velocità
        this.posX += this.velX;
        this.posY += this.velY;
    }
    

    mostra() { //creo illisse invisibile per la palla e metto un immagine sopra
        fill(0, 0, 0, 0); //colore trasparente
        ellipse(this.posX, this.posY, this.size, this.size);

        // - raggio per centrare l'immagine
        image(this.img, this.posX - this.raggio - 21, this.posY - this.raggio, this.size + 42, this.size);
    }   

    gestisciCollisione(diffX) { //gestisce collisione tra palla e personaggi
        this.velY = velocitaPallaY; //velocita verso l'alto
        this.velX = map(diffX, -personaggio.img.width / 2, personaggio.img.width / 2, -velocitaPallaX, velocitaPallaX); //per aumentare la velocita della palla con velocita 12 e devo mappare diffX che gli passo e lo calcolo nella classe personaggio in controllaCollisione e sarebbe di quanto deve spostare la palla
        suonoColpisciPalla.play(); //suono quando colpisce la palla
    }

    controllaCollisioneSopraPorte(portaSinistra, portaDestra){
        //rimbalzo sulla porta sinistra
        if (this.posX + this.raggio > portaSinistra.x && this.posX - this.raggio < portaSinistra.x + portaSinistra.larghezza && 
            this.posY + this.raggio > portaSinistra.y && this.posY - this.raggio < portaSinistra.y + portaSinistra.altezza){ //la palla è sopra la porta sinistra perche collide con il lato superiore del rettangolo della porta 
            this.velY = -this.velY; //rimbalza verso l'alto sulla porta
        }
                
        //rimbalzo sulla porta destra
        if (this.posX + this.raggio > portaDestra.x && this.posX - this.raggio < portaDestra.x + portaDestra.larghezza && 
            this.posY + this.raggio > portaDestra.y && this.posY - this.raggio < portaDestra.y + portaDestra.altezza){ //la palla è sopra la porta destra perche collide con il lato superiore del rettangolo della porta
            this.velY = -this.velY; //rimbalza verso l'alto sulla porta 
        }
    }

    controllaGolPortaSinistra(portaSinistra, personaggio, personaggio2, punti2) { //funzione che controlla i gol e ritorna i punti
        if (this.posX + this.raggio < portaSinistra.x + portaSinistra.larghezza && this.posX + this.raggio > portaSinistra.x && 
            this.posY + this.raggio > portaSinistra.y && this.posY - this.raggio < portaSinistra.y + portaSinistra.altezza && 
            this.posX > portaSinistra.x + portaSinistra.larghezza / 2) { //controlla che la posizione della palla collide con il lato frontale della porta 
            punti2 += 1; //aggiungo un punto
            suonoGol.play();//suono del gol
            this.resetPalla(); //riporta la palla al punto di partenza
            personaggio.resetPersonaggio(130, ALTEZZA_BASE); //richiamo metodo della classe personaggio che riporta i personaggi alla posizione iniziale
            personaggio2.resetPersonaggio(1170, ALTEZZA_BASE);
        }
        return punti2;
    }
    
    controllaGolPortaDestra(portaDestra, personaggio, personaggio2, punti1){ //funzione che controlla i gol e ritorna i punti
        if (this.posX - this.raggio < portaDestra.x + portaDestra.larghezza && this.posX - this.raggio > portaDestra.x && 
            this.posY + this.raggio > portaDestra.y && this.posY - this.raggio < portaDestra.y + portaDestra.altezza && 
            this.posX < portaDestra.x + portaDestra.larghezza / 2) { //controlla che la posizione della palla collide con il lato frontale della porta
            punti1 += 1; //aggiungo un punto
            suonoGol.play();//suono del gol 
            this.resetPalla(); //riporta la palla al punto di partenza
            personaggio.resetPersonaggio(130, ALTEZZA_BASE); //richiamo metodo della classe personaggio che riporta i personaggi alla posizione iniziale
            personaggio2.resetPersonaggio(1170, ALTEZZA_BASE);
        }
        return punti1;
    }

    resetPalla() { //riporta la palla alla posizione iniziale e ferma 
        this.posX = width / 2;
        this.posY = height / 2;
        this.velX = 0;
        this.velY = 0;
    }
}

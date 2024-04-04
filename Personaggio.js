class Personaggio {
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.velY = 0;
        this.attendiTimer = 60; //60 frame corrispondono a 1 secondo a 60 FPS (ritardo per il bot)
        this.timerAttivo = true;
    }

    muoviAutomaticamente(palla) { //muove in automatico il personaggio 2 in base alla posizione della palla
        //timer per dargli un ritardo e non farlo partire subito ritardo di un secondo (attendiTimer)
        if (this.attendiTimer > 0) {
            this.attendiTimer--;
            return;
        } else if (this.timerAttivo) {
            this.timerAttivo = false;
            this.attendiTimer = 0; //resetta il timer
        }
    
        //calcola la posizione futura della palla in base alla velocità
        let posizioneFuturaX = palla.posX + palla.velX * 15;
    
        //calcola la distanza orizzontale e verticale tra il personaggio e la palla
        let distanzaX = posizioneFuturaX - this.x;
        let distanzaY = palla.posY - this.y;
    
        //imposta la velocità orizzontale in base alla posizione futura della palla
        if (posizioneFuturaX < this.x && this.x > width / 4) {
            this.x -= 12;  //sposta a sinistra se la palla è prevista a sinistra del personaggio e il personaggio è oltre un quarto dello schermo
        } else if (posizioneFuturaX > this.x && this.x < width * 0.75) {
            this.x += 12;  //sposta a destra se la palla è prevista a destra del personaggio e il personaggio è prima di tre quarti dello schermo
        }
    
        //aggiunge salti solo se la palla è abbastanza lontana verticalmente e non può essere raggiunta senza un salto
        if (distanzaY > 150 && this.y == height - this.img.height - ALTEZZA_BASE) {
            //verifica se la palla sta andando verso la sua porta
            if (palla.velX > 0 && palla.posX > width / 2) {
                this.velY = -8;  //impulso verso l'alto per il salto
            }
        }
    
        //aggiunge la gravità solo se il personaggio non è a terra
        if (this.y < height - this.img.height - ALTEZZA_BASE) {
            this.velY += GRAVITY;
        }
    
        this.y += this.velY;
    
        //limita il movimento verso il basso per evitare che il personaggio cada oltre la canvas
        if (this.y > height - this.img.height - ALTEZZA_BASE) {
            this.y = height - this.img.height - ALTEZZA_BASE;
            this.velY = 0;
        }
    }
    

    muovi() {
        if (keyIsDown(87)) { // W
            if (this.y == height - this.img.height - ALTEZZA_BASE) { //controllo che sia sulla base 
                this.velY = -8; //salta 
            }
        }
    
        if (keyIsDown(65) && this.x > 0) { // A
            this.x -= 8; //si sposta a sinistra con velocita 8
        }
        if (keyIsDown(68) && this.x < width - this.img.width) { // D
            this.x += 8; //si sposta a destra con velocita 8  
        }
    
        //quando salta aggiunge la gravita per farlo tornare a terra
        if (this.y < height - this.img.height - ALTEZZA_BASE) {
            this.velY += GRAVITY;
        }
    
        this.y += this.velY; //alla posizione della y gli assegno la velocita y così che sia sempre a 0 e cambia solo se salta
    
        //controllo che non vada sotto della base del gioco su cui si spostano i personaggi
        if (this.y > height - this.img.height - ALTEZZA_BASE) {
            this.y = height - this.img.height - ALTEZZA_BASE;
        }
    }
    
    muovi2() {
        if (keyIsDown(UP_ARROW)) { //freccia su
            if (this.y == height - this.img.height - ALTEZZA_BASE) { //controllo che sia sulla base
                this.velY = -8; //salta
            }
        }
    
        if (keyIsDown(LEFT_ARROW) && this.x > 0) { //freccia sinistra
            this.x -= 8; //si sposta a sinistra con velocita 8
        }
        if (keyIsDown(RIGHT_ARROW) && this.x < width - this.img.width) { //freccia destra
            this.x += 8; //si sposta a destra con velocita 8
        }
    
        //quando salta aggiunge la gravita per farlo tornare a terra        
        if (this.y < height - this.img.height - ALTEZZA_BASE) {
            this.velY += GRAVITY;
        }
    
        this.y += this.velY; //alla posizione della y gli assegno la velocita y così che sia sempre a 0 e cambia solo se salta
    
        //controllo che non vada sotto della base del gioco su cui si spostano i personaggi
        if (this.y > height - this.img.height - ALTEZZA_BASE) {
            this.y = height - this.img.height - ALTEZZA_BASE;
        }
    }
    
    mostra() {
        image(this.img, this.x, this.y);
    }

    controllaCollisione(palla) { //controlla la collisione tra l'immagine del personaggio e la palla
        let diffX = palla.posX - (this.x + this.img.width / 2); //diffX è di quanto deve sposatre la palla sulla X 
    
        if (palla.posX + palla.size / 2 > this.x && palla.posX - palla.size / 2 < this.x + this.img.width &&
            palla.posY + palla.size / 2 > this.y && palla.posY - palla.size / 2 < this.y + this.img.height) {
            palla.gestisciCollisione(diffX);
        }
    }

    resetPersonaggio(x, y){ //reimposto i valori come all'inizio posizione iniziale dopo ogni gol
        this.x = x;
        this.y = y;
        this.velY = 0;
        this.attendiTimer = 60; 
        this.timerAttivo = true;
    }
}

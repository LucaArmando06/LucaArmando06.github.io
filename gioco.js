let palla_img; //immagini del gioco
let sfondo_show;
let bgimg, bgimgPausa, bgimgInizio, bgimgMenu1, bgimgMenu2;
let imgPers1, imgPers2;

let palla; //oggetti del gioco
let portaDestra, portaSinistra;
let personaggio, personaggio2;

let lungPorta = 145; //dimenisone delle porte
let altPorta = 280; 
let velocitaPallaX = 12; //velocita della palla che uso nella classe Palla in gestisciCollisione
let velocitaPallaY = -8; //velocita della palla che uso nella classe Palla in gestisciCollisione

let inizio = true; //varibili che in base allo stato del gioco fanno schermate diverse
let menu1 = false;
let menu2 = false;  
let menu3 = false;
let gioco = false;
let pausa = false;
let fine = false;

let bottoneSingolo; //bottoni per la scelta della modalita di gioco
let bottoneCoppia;

let singolo = false; //variabili per la modalita di gioco scelta 
let coppia = false;

let posXPausa = 1500; //posizione tasto pausa in alto a destra nel gioco
let posYPausa = 75;
let lungPausa = 110; //dimensioni tasto pausa in alto a destra nel gioco
let altPausa = 90;

let posXTastoPausaMenu = 295; //posizioni tasti nella schermata della pausa
let posXTastoPausaRestart = 670;
let posXTastoPausaFine = 1040;
let posYTastiPausa = 290;
let lungTastiPausa = 185; //dimensioni tasti nella schermata della pausa
let altTastiPausa = 140;

let immaginiPersonaggi1 = []; //liste di immagini per i personaggi
let immaginiPersonaggi2 = [];

let punti1 = 0; //inizializzo i punti dei giocatori a 0
let punti2 = 0;

let durataPartita = 60; //durata della partita in secondi
let tempoPartita; //numero totale di millisecondi trascorsi dal momento in cui il programma è stato avviato
let tempoTrascorso = 0; //salva il tempo di gioco trascorso

let suonoColpisciPalla, suonoGol, suonoBottone, fischioFine; //suoni 

let suonoFineRiprodotto = false;

const GRAVITY = 0.25; //gravita 
const ALTEZZA_BASE = 200; //altezza della base su cui si spostano i personaggi e la palla

function preload() {
  bgimg = loadImage('./img/campo.png'); //caricamento di tutte le immagini
  bgimgInizio = loadImage('./img/inizio.png');
  bgimgMenu1 = loadImage('./img/menu1.png');
  bgimgMenu2 = loadImage('./img/menu2.png');
  bgimgPausa = loadImage('./img/pausa.png');
  bgimgFine = loadImage('./img/menu2.png');

  immaginiPersonaggi1.push(loadImage('./img/personaggi/ronaldo_1.png')); //carico lista delle immagini con push
  immaginiPersonaggi1.push(loadImage('./img/personaggi/giroud_1.png'));
  immaginiPersonaggi1.push(loadImage('./img/personaggi/messi_1.png'));
  immaginiPersonaggi1.push(loadImage('./img/personaggi/becham_1.png'));
  immaginiPersonaggi1.push(loadImage('./img/personaggi/salah_1.png'));
  
  immaginiPersonaggi2.push(loadImage('./img/personaggi/ronaldo_2.png'));
  immaginiPersonaggi2.push(loadImage('./img/personaggi/becham_2.png'));
  immaginiPersonaggi2.push(loadImage('./img/personaggi/salah_2.png'));
  immaginiPersonaggi2.push(loadImage('./img/personaggi/giroud_2.png'));
  immaginiPersonaggi2.push(loadImage('./img/personaggi/messi_2.png'));

  palla_img = loadImage('./img/palla.png');
  
  font = loadFont('./Anta/Anta-Regular.ttf'); //caricamento del font utilizzato

  soundFormats('mp3', 'ogg');
  suonoColpisciPalla = loadSound('./suoni/colpisciPalla.mp3');
  suonoGol = loadSound('./suoni/gol.mp3');
  suonoBottone = loadSound('./suoni/bottone.mp3');
  fischioFine = loadSound('./suoni/suonoFischioFinale.mp3');
}

function setup() {
  createCanvas(1520, 705);
  frameRate(60);
  sfondo_show = bgimg;

  textFont(font);

  palla = new Palla(palla_img); //creo solo gli oggetti palla e le porte ma non i personaggi perche li creo in base alla modalita e alle immagini che scegliera il giocatore 
  portaSinistra = new Porta(0, ALTEZZA_BASE + 60, lungPorta, altPorta);
  portaDestra = new Porta(width - lungPorta, ALTEZZA_BASE + 60, lungPorta, altPorta);

  //personaggio = new Personaggio(imgPers1, 130, ALTEZZA_BASE);
  //personaggio.img.resize(personaggio.img.width / 2, personaggio.img.height / 2);

  //personaggio2 = new Personaggio(imgPers2, 1170, ALTEZZA_BASE);
  //personaggio2.img.resize(personaggio2.img.width / 2, personaggio2.img.height / 2);
}

function draw() {
  background(sfondo_show);

  if (inizio) {
    schermataInizio();
  } else {
    if(menu1) {
      schermataMenu1();
    } else {
      if(menu2){
        schermataMenu2();
      } else {
        if(menu3){
          schermataMenu3();
        } else {
          if(gioco){
            sfondo_show = bgimg;
            if (!pausa) { //se il gioco non è in pausa
              if(singolo){ //se ha scelto la modalita singola
                tempoTrascorso = (millis() - tempoPartita) / 1000; //faccio partire il tempo e lo salvo in tempoTrascorso (/1000 per convertire da millisecondi in secondi) tolgo tempoPartita che è il tempo prima che parte il giocoz
        
                portaSinistra.mostra();
                portaDestra.mostra();
        
                personaggio.muovi();
                personaggio.mostra();
        
                personaggio2.muoviAutomaticamente(palla); //funzione che fa muovere il giocatore 2 in automatico
                personaggio2.mostra();
        
                palla.muovi(); //controlla le collisioni con le pareti
                palla.mostra();
        
                personaggio.controllaCollisione(palla); //controllo le collisioni tra la palla e i personaggi
                personaggio2.controllaCollisione(palla);
        
                palla.controllaCollisioneSopraPorte(portaSinistra, portaDestra); //controllo le collisioni della palla con la parte superiore delle porte
                punti1 = palla.controllaGolPortaDestra(portaDestra, personaggio, personaggio2, punti1); //controllo dei gol
                punti2 = palla.controllaGolPortaSinistra(portaSinistra, personaggio, personaggio2, punti2);
        
                fill(255, 255, 255, 255); //scrive il punteggio e il tempo trascorso
                textSize(60);
                textAlign(CENTER, TOP);
                text(`${punti1}`, 663, 39);
                text(`${punti2}`, 866, 39);
                textSize(30);
                text(`${nf(tempoTrascorso, 0, 2)}`, 765, 56);

                fill(255, 0, 0, 0); //disegno il tasto pausa in alto a destra
                noStroke(); //toglie bordino nero intorno all'ellipse
                ellipse(posXPausa, posYPausa, lungPausa, altPausa);
        
                if (tempoTrascorso >= durataPartita) { //se il tempo è finito metto fine = true così fa la schermataFine 
                  gioco = false;
                  fine = true;
                }
              } else {
                if(coppia){ //se ha scelto la modalita multigiocatore
                  tempoTrascorso = (millis() - tempoPartita) / 1000; //faccio partire il tempo e lo salvo in tempoTrascorso (/1000 per convertire da millisecondi in secondi)
          
                  portaSinistra.mostra();
                  portaDestra.mostra();
          
                  personaggio.muovi();
                  personaggio.mostra();
          
                  personaggio2.muovi2();
                  personaggio2.mostra();
          
                  palla.muovi(); //controlla le collisioni con le pareti
                  palla.mostra();
          
                  personaggio.controllaCollisione(palla); //controllo le collisioni tra la palla e i personaggi
                  personaggio2.controllaCollisione(palla);
          
                  palla.controllaCollisioneSopraPorte(portaSinistra, portaDestra); //controllo le collisioni della palla con la parte superiore delle porte
                  punti1 = palla.controllaGolPortaDestra(portaDestra, personaggio, personaggio2, punti1); //controllo dei gol
                  punti2 = palla.controllaGolPortaSinistra(portaSinistra, personaggio, personaggio2, punti2);
           
                  fill(255, 255, 255, 255); //scrive il punteggio e il tempo trascorso
                  textSize(60);
                  textAlign(CENTER, TOP);
                  text(`${punti1}`, 663, 39);
                  text(`${punti2}`, 866, 39);
                  textSize(30);
                  text(`${nf(tempoTrascorso, 0, 2)}`, 765, 56);
          
                  fill(255, 0, 0, 0); //disegno il tasto pausa in alto a destra
                  noStroke(); //toglie bordino nero intorno all'ellipse
                  ellipse(posXPausa, posYPausa, lungPausa, altPausa);
          
                  if (tempoTrascorso >= durataPartita) { //se il tempo è finito metto fine = true così fa la schermataFine 
                    gioco = false;
                    fine = true;
                  }
                }
              }
            } else { //se pausa = true
              schermataPausa();
            }
          } else { //gioco = false
            schermataFine();
          }
        }
      }
    }
  }
}

function schermataInizio() {
  sfondo_show = bgimgInizio;

  noStroke(); //elimina bordino nero dell'ellipse
  fill(0, 0, 0, 0); //colore trasparente
  ellipse(width / 2 - 5, height / 2 + 60, 300, 250); //posizione della palla che c'è nello sfondo per fare il tasto

  fill(0);    
  textSize(80);
  textAlign(CENTER, TOP);
  text(`HEAD SOCCER`, width / 2, 100);

  fill(255);
  textSize(35);
  textAlign(CENTER, TOP);
  text(`PREMI IL PALLONE PER INIZIARE LA PARTITA`, width / 2, 570);

  fill(255);
  textSize(20);
  textAlign(CENTER, TOP);
  text(`LUCA ARMANDO`, width / 2, 660);
}

function schermataMenu1() {
  sfondo_show = bgimgMenu1;
  fill(255);
  textSize(50);
  textAlign(CENTER, TOP);
  text(`Scegli la modalità di gioco:`, width / 2, 100);

  bottoneSingolo = createButton('SINGOLO'); //crea i due bottoni per la scelta della modalita di gioco
  bottoneSingolo.position(width / 2 - 500, 350);
  bottoneSingolo.size(300, 100);
  bottoneSingolo.style('font-size', '24px'); //imposta la dimensione del testo
  bottoneSingolo.style('font-family', 'Anta-Regular'); //imposta il font del testo
  bottoneSingolo.style('color', '#000000'); //imposta il colore del testo del pulsante
  bottoneSingolo.mousePressed(singoloPremuto); //se viene premuto il bottoneSingolo fa la funzione singoloPremuto

  bottoneCoppia = createButton('MULTIGIOCATORE');
  bottoneCoppia.position(width / 2 + 250, 350);
  bottoneCoppia.size(300, 100);
  bottoneCoppia.style('font-size', '24px'); //imposta la dimensione del testo
  bottoneCoppia.style('font-family', 'Anta-Regular'); //imposta il font del testo
  bottoneCoppia.style('color', '#000000'); //imposta il colore del testo del pulsante
  bottoneCoppia.mousePressed(coppiaPremuto); //se viene premuto il bottoneCoppia fa la funzione coppiaPremuto

  fill(255);
  textSize(30);
  textAlign(CENTER, TOP);
  text(`ISTRUZIONI:`, width / 2, 555);

  fill(255);
  textSize(25);
  textAlign(CENTER, TOP);
  text(`Personaggio1: movimenti con "W" "A" "S" "D"`, width / 2, 605);

  fill(255);
  textSize(25);
  textAlign(CENTER, TOP);
  text(`Personaggio2: movimenti con le frecce (solo se scegli "MULTIGIOCATORE")`, width / 2, 640);
}

function singoloPremuto() {
  suonoBottone.play();
  console.log("premuto singolo");
  singolo = true; //modalita di gioco = singolo
  coppia = false;
  menu1 = false;
  menu2 = true; //passa alla schermata menu2
  removeElements(); //elimina i bottoni dalla schermata menu1
}

function coppiaPremuto() {
  suonoBottone.play();
  console.log("premuto coppia");
  singolo = false;
  coppia = true; //modalita di gioco = multigiocatore
  menu1 = false;
  menu2 = true; //passa alla schermata menu2
  removeElements(); //elimina i bottoni dalla schermata menu1
}

function schermataMenu2(){ //fa scegliere il primo personaggio
  sfondo_show = bgimgMenu2;
  if(singolo){ //se la modalita è singolo
    fill(255);
    textSize(50);
    textAlign(CENTER, TOP);
    text(`Scegli il tuo personaggio:`, width / 2, 100);
  
    let distMargineSinistro = 150; //le immagini distano dal margine sinistro di 150
    let distImmagini = 200; //distanza tra le immagini di 200

    for(let k = 0; k < immaginiPersonaggi1.length; k++) { //ciclo sulla lista di immagini per stampare le immagini dei vari personaggi
      let x = distMargineSinistro + k * distImmagini; //posiozione X che aumenta ad ogni ciclo con k 
      let y = 350; //la Y è fissa
      let larghezza = 150; //dimensioni delle immagini
      let altezza = 200;
  
      image(immaginiPersonaggi1[k], x, y, larghezza, altezza);
    }
  } else {
    if(coppia){ //se la modalita è multigiocatore
      fill(255);
      textSize(50);
      textAlign(CENTER, TOP);
      text(`Scegli il primo personaggio:`, width / 2, 100);
      
      let distMargineSinistro = 150; //le immagini distano dal margine sinistro di 150
      let distImmagini = 200; //distanza tra le immagini di 200

      for(let k = 0; k < immaginiPersonaggi1.length; k++) { //ciclo sulla lista di immagini per stampare le immagini dei vari personaggi
        let x = distMargineSinistro + k * distImmagini; //posiozione X che aumenta ad ogni ciclo con k 
        let y = 350; //la Y è fissa
        let larghezza = 150; //dimensioni delle immagini
        let altezza = 200;
  
        image(immaginiPersonaggi1[k], x, y, larghezza, altezza);
      } 
    }
  }
}

function schermataMenu3(){ //viene fatta solo se la modalita è multigiocatore per la scelta del secondo personaggio
  sfondo_show = bgimgMenu2;

  fill(255);
  textSize(50);
  textAlign(CENTER, TOP);
  text(`Scegli il secondo personaggio:`, width / 2, 100);
  
  let distMargineSinistro = 150; //le immagini distano dal margine sinistro di 150
  let distImmagini = 200; //distanza tra le immagini di 200

  for(let k = 0; k < immaginiPersonaggi2.length; k++) { //ciclo sulla lista di immagini per stampare le immagini dei vari personaggi
    let x = distMargineSinistro + k * distImmagini; //posizione X che aumenta ad ogni ciclo con k 
    let y = 350;
    let larghezza = 150;
    let altezza = 200;
  
    image(immaginiPersonaggi2[k], x, y, larghezza, altezza);
  } 
}

function schermataPausa(){ //schermata di pausa se pausa = true 
    sfondo_show = bgimgPausa; //cambia lo sfondo 
}

function schermataFine() { //se fine = true
  if (!suonoFineRiprodotto) { //per fare solo una volta il suono finale del fischietto
    fischioFine.play();
    suonoFineRiprodotto = true;
  }

  sfondo_show = bgimgFine;

  fill(255);
  textSize(60);
  textAlign(CENTER, TOP);
  text("Partita terminata!", width / 2, 50);

  textSize(40); //scrive il punteggio finale
  text(`Punteggio: ${punti1} - ${punti2}`, width / 2, 150);

  let larghezza = 130; //dimensioni immagine del persoanggio vincitore
  let altezza = 180;
  let x = width / 2 - larghezza / 2; //posizione immagine del personaggio vincitore
  let y = height / 2 + altezza / 2 - 60;

  if (punti1 > punti2) { //controlla il vincitore e mette la sua immagine
    textSize(50);
    text(`Vincitore: Giocatore 1`, width / 2, 310);
    image(imgPers1, x, y, larghezza, altezza);
  } else if (punti2 > punti1) {
    textSize(50);
    text(`Vincitore: Giocatore 2`, width / 2, 310);
    image(imgPers2, x, y, larghezza, altezza);
  } else {    
    textSize(60);
    text(`Pareggio`, width / 2, 350);
  }

  textSize(30); 
  text("Premi SPAZIO per giocare di nuovo", width / 2, 650);
}

function keyPressed() {
  if (key == " ") { 
    if (fine) { //se premi spazio quando sei nella schermataFine fa iniziare una nuova partita
      fine = false;
      inizio = true;
      suonoFineRiprodotto = false;
      punti1 = 0;
      punti2 = 0;
    } else { 
      if (gioco) { //se premi spazio quando sei nella schermata di gioco mette in pausa
        pausa = !pausa;
        if (pausa && sfondo_show == bgimg) {
        sfondo_show = bgimgPausa;
        } else {
        sfondo_show = bgimg;
        }
      }
    }
  }
}

function mouseClicked() {
  if (inizio) { //nella schermata di inizio
    let d = dist(mouseX, mouseY, width / 2 - 5, height / 2 + 60); //per vedere se clicca nel pallone 
    if (d < 300 / 2 && d < 250 / 2) {
      suonoBottone.play();
      inizio = false;
      menu1 = true; //passa alla schermataMenu1 per la scelta della modalita
    }
  } else {
    if(menu2){
      if(singolo){ //singolo diventa true quando clicca sul bottone quindi non serve il mouseClicked 
        
        let distMargineSinistro = 150; //le immagini distano dal margine sinistro di 150
        let distImmagini = 200; //distanza tra le immagini di 200
        
        for (let k = 0; k < immaginiPersonaggi1.length; k++) { //ciclo per controllare su quale immagini clicco dove rifaccio il ciclo sulla lista per avere le giuste cordinate x e y delle immagini per controllare se gli clicca sopra
          let x = distMargineSinistro + k * distImmagini; //posizione X che aumenta ad ogni ciclo con k 
          let y = 350;
          let larghezza = 150;
          let altezza = 200;
  
          if (mouseX > x && mouseX < x + larghezza && mouseY > y && mouseY < y + altezza) { //contolla se clicca sull'immagine prendendo le coordinate del ciclo fatto sopra     
            suonoBottone.play();
            imgPers1 = immaginiPersonaggi1[k]; //assegna al personaggio l'immagine scelta della lista 
            personaggio = new Personaggio(imgPers1, 150, ALTEZZA_BASE); //crea il primo personaggio con posixione X = 150 e sull'altezza della base
          }
        }

        imgPers2 = random(immaginiPersonaggi2); //random su lista immaginiPersonaggi2 per mettere casualmete l'avversario
        personaggio2 = new Personaggio(imgPers2, 1250, ALTEZZA_BASE + 123); //crea il secondo personaggio con posixione X = 1250 e sull'altezza della base

        menu2 = false;
        gioco = true; //passa alla schermata del gioco senza passare al menu3 perche il secondo persoanggo viene scelto casualmente
        tempoPartita = millis(); //fa partire il timer della partita (numero totale di millisecondi trascorsi dal momento in cui il programma è stato avviato )
        removeElements(); //rimuove tutti gli elementi che se no rimarrebero nella schermata
      } else {
        if(coppia){//se la modalita è coppia 
          
          let distMargineSinistro = 150; //le immagini distano dal margine sinistro di 150
          let distImmagini = 200; //distanza tra le immagini di 200
          
          for (let k = 0; k < immaginiPersonaggi1.length; k++) { //ciclo per controllare su quale immagini clicco dove rifaccio il cilco sulla lista per avere le giuste cordinate x e y delle immagini per controllare se gli clicca sopra
            let x = distMargineSinistro + k * distImmagini; //posizione X che aumenta ad ogni ciclo con k 
            let y = 350;
            let larghezza = 150;
            let altezza = 200;
    
            if (mouseX > x && mouseX < x + larghezza && mouseY > y && mouseY < y + altezza) { //contolla se clicca sull'immagine prendendo le coordinate del ciclo fatto sopra          
              suonoBottone.play();
              imgPers1 = immaginiPersonaggi1[k]; //assegna al personaggio l'immagine scelta della lista
              personaggio = new Personaggio(imgPers1, 150, ALTEZZA_BASE); //crea il primo personaggio con posixione X = 150 e sull'altezza della base
            }
          }
          menu2 = false; 
          menu3 = true; //passa alla schermata del menu3 per la scelta del secodno personaggio
        }
      }
    } else {
      if(menu3){ //menu3 per la scelta del secondo personaggio

        let distMargineSinistro = 150; //le immagini distano dal margine sinistro di 150
        let distImmagini = 200; //distanza tra le immagini di 200

        for (let k = 0; k < immaginiPersonaggi2.length; k++) { //ciclo per controllare su quale immagini clicco dove rifaccio il cilco sulla lista per avere le giuste cordinate x e y delle immagini per controllare se gli clicca sopra
          let x = distMargineSinistro + k * distImmagini; //posizione X che aumenta ad ogni ciclo con k 
          let y = 350;
          let larghezza = 150;
          let altezza = 200;
  
          if (mouseX > x && mouseX < x + larghezza && mouseY > y && mouseY < y + altezza) { //contolla se clicca sull'immagine prendendo le coordinate del ciclo fatto sopra            
            suonoBottone.play();
            imgPers2 = immaginiPersonaggi2[k]; //assegna al personaggio l'immagine scelta della lista
            personaggio2 = new Personaggio(imgPers2, 1250, ALTEZZA_BASE); //crea il secondo personaggio con posixione X = 1250 e sull'altezza della base
          }
        }
        menu3 = false;
        gioco = true; //passa alla schermata di giocco
        tempoPartita = millis(); //fa partire il timer della partita (numero totale di millisecondi trascorsi dal momento in cui il programma è stato avviato)
        removeElements(); //rimuove tutti gli elementi che se no rimarrebero nella schermata
      } else {
        if(gioco) { //sei nella schermata di gioco 
          let d = dist(mouseX, mouseY, posXPausa, posYPausa); //controlla se clicca con il mouse sul tasto pausa in alto a destra
          if (d < lungPausa / 2 && d < altPausa / 2) {
            suonoBottone.play();
            pausa = !pausa; //mette o toglie la pausa = true cosi fa la schermataPausa 
          } 
          if(pausa){ //sei nella schermataPausa
            //controlli per i tasti di pausa
            if(mouseX > posXTastoPausaMenu && mouseX < posXTastoPausaMenu + lungTastiPausa &&
                mouseY > posYTastiPausa && mouseY < posYTastiPausa + altTastiPausa) {
              //console.log('Tasto Menu premuto');
              suonoBottone.play();
              inizio = true; //torni alla schermata di inizio
              punti1 = 0;
              punti2 = 0;
              pausa = false;
              gioco = false;
            } else if ( mouseX > posXTastoPausaRestart && mouseX < posXTastoPausaRestart + lungTastiPausa &&
                        mouseY > posYTastiPausa && mouseY < posYTastiPausa + altTastiPausa ) {
              //console.log('Tasto Restart premuto');
              suonoBottone.play();
              pausa = false;
              palla.resetPalla(); //riporto la palla alla posizione iniziale 
              personaggio.resetPersonaggio(130, ALTEZZA_BASE); //richiamo metodo della classe personaggio che riporta i personaggi alla posizione iniziale
              personaggio2.resetPersonaggio(1170, ALTEZZA_BASE);
            } else if (mouseX > posXTastoPausaFine && mouseX < posXTastoPausaFine + lungTastiPausa &&
                        mouseY > posYTastiPausa && mouseY < posYTastiPausa + altTastiPausa) {
              //console.log('Tasto Fine premuto');
              suonoBottone.play();
              gioco = false;
              pausa = false;
              fine = true; //finisce la partita e da la schermataFine
            }
          } 
        } 
      } 
    }
  }
}
const buttons = document.querySelectorAll('button');
let compteurJs=0;
let compteur=document.querySelector('#compteur')
let compteurInt=document.querySelector('#compteurInt')


buttons[0].addEventListener('click',onclick)

function onclick(){
    if(compteurJs>=5 && compteurJs<=9){
        compteurJs++;
       return compteur.innerHTML="Bravo, bel échauffement !" ,compteurInt.innerHTML=compteurJs
    }else if(compteurJs>9){
        compteurJs++;
        return compteur.innerHTML="Vous êtes passé maître en l'art du clic !",compteurInt.innerHTML=compteurJs
    }

    compteurJs++;
    compteurInt.innerHTML=compteurJs




}
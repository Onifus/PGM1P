let dily = [
    { jmeno: "Brzdový kotouč", cenu: 1500 },  //0
    { jmeno: "Spojka", cenu: 5000 },          //1
    { jmeno: "Vzduchový filtr", cenu: 300 },
    { jmeno: "Motorový olej", cenu: 1200 },
    { jmeno: "Světlo", cenu: 2500 },
    { jmeno: "Baterie", cenu: 2200 },
    { jmeno: "Výfuk", cenu: 3400 },
    { jmeno: "Tlumiče", cenu: 2800 },
    { jmeno: "Kabiny filtr", cenu: 400 },
    { jmeno: "Zapalovací svíčka", cenu: 150 }
];

let vlastnene_dily = [
];

let celkova_cena = 0;

/////////////////////////////////////////////////////////////////
//                                                             //
//                         přidat díl                          //
//                                                             //
/////////////////////////////////////////////////////////////////

function prida_jeden_dil() {

    let single_dil = prompt("Zadej díl, který si chceš pořídit","Jméno dílu");

    if (isThere(single_dil,dily)) {

        if (!(isThere(single_dil,vlastnene_dily))) {
            pridat_do_vlastnenych(single_dil);
        }else{
            alert("Tato položka se již nachazí ve vaší výbavě")
        }

    }else{

        alert("Zadaná věc se v seznamu nenachazí")

    }

}

function prida_vse() {

    zobrazit_data("cart-list",dily);
    vlastnene_dily=[];
    celkova_cena = 0;
    for (let i = 0; i < dily.length; i++) {
        celkova_cena += dily[i].cenu;
        vlastnene_dily.push(dily[i]);
    }
    vypis_hodnoty(celkova_cena);
}

function pridat_do_vlastnenych(dil_zadany_uzivatelem){

    const nalezenyDil = dily.find(dil => dil.jmeno === dil_zadany_uzivatelem);
    celkova_cena += nalezenyDil.cenu;
    vlastnene_dily.push(nalezenyDil);
    vypis_hodnoty(celkova_cena);
    zobrazit_data("cart-list",vlastnene_dily);

}

/////////////////////////////////////////////////////////////////
//                                                             //
//                        /přidat díl                          //
//                                                             //
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
//                                                             //
//                        odebrat díl                          //
//                                                             //
/////////////////////////////////////////////////////////////////
function odeber_jeden_dil() {
    let zadany_dil = prompt("Zadej díl, který si chceš odebrat","Jméno dílu");

    if (isThere(zadany_dil,vlastnene_dily)) {
        odebrat_z_vlastnenych(zadany_dil);
    }else{
        alert("Zadaná věc se v seznamu nenachazí")
    }
}


function odebrat_z_vlastnenych(predane_dil_z_jine_funkce) {

    const index = vlastnene_dily.findIndex(dil => dil.jmeno === predane_dil_z_jine_funkce);
    celkova_cena -= vlastnene_dily[index].cenu;
    vlastnene_dily.splice(index, 1); 
    vypis_hodnoty(celkova_cena);
    zobrazit_data("cart-list",vlastnene_dily);

}

function odebrat_vse(){
    vlastnene_dily=[];
    celkova_cena = 0;
    vypis_hodnoty(celkova_cena);
    zobrazit_data("cart-list",vlastnene_dily);
}
/////////////////////////////////////////////////////////////////
//                                                             //
//                       /odebrat díl                          //
//                                                             //
/////////////////////////////////////////////////////////////////

zobrazit_data("available-parts-list",dily);

document.getElementById('remove').addEventListener('click', odeber_jeden_dil);
document.getElementById('add').addEventListener('click', prida_jeden_dil);
document.getElementById('add-all').addEventListener('click', prida_vse);
document.getElementById('remove-all').addEventListener('click', odebrat_vse);

function isThere(dil,predane_pole_z_jine_funkce){
    let valid = false;

    for (let i = 0; i < predane_pole_z_jine_funkce.length; i++) {
       if (dil == predane_pole_z_jine_funkce[i].jmeno) {
        valid = true;
       }
    }

    return valid;
}



function zobrazit_data(htmlid,predane_pole_z_jine_funkce) {
    const listElement = document.getElementById(htmlid);
    listElement.innerHTML = "";

    for (let i = 0; i < predane_pole_z_jine_funkce.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = `${predane_pole_z_jine_funkce[i].jmeno} - ${predane_pole_z_jine_funkce[i].cenu} Kč`;
        listElement.appendChild(listItem);
    }
}

function vypis_hodnoty(celkova_hodnota){
    document.getElementById("total-price").innerHTML = `Celková cena je: ${celkova_hodnota} Kč`;;
}



function t(param){
    console.log(param)
}
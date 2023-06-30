let barra : HTMLInputElement= document.getElementById("campo-n")! as HTMLInputElement;
let etiqueta = document.getElementById("etiqueta-n")!;
let arregloBotones : HTMLInputElement[][];
let arregloBotones2 : HTMLInputElement[];
let arregloValores : number [][];
let arregloValores2 : number[];
let matrizL: number [][];
let matrizU : number [][];
let vectorX : number[];
let vectorY : number[];
let btnSiguiente = document.getElementById("btn-siguiente")!;
let btnSiguiente2 = document.getElementById("btn-siguiente2")!;

barra.addEventListener("input", () => {

    etiqueta.innerText = barra.value;

});

btnSiguiente.addEventListener("click",(e: Event) => {

    e.preventDefault();

    let container : HTMLDivElement = document.getElementById("Hola")! as HTMLDivElement;
    container.innerHTML = "";

    let n : number = barra.value as unknown as number;
    let tabla :HTMLTableElement = document.createElement("table");
    arregloBotones = [];

    for(let i : number = 0; i < n; i++){

        let fila : HTMLTableRowElement = document.createElement("tr");
        arregloBotones[i] = [];

        for(let j : number = 0; j < n; j++){

            let input : HTMLInputElement = document.createElement("input");
            let celda : HTMLTableCellElement = document.createElement("td");
            input.type = "number";
            arregloBotones[i][j] = input;
            celda.append(input);
            fila.append(celda);

        }

        tabla.append(fila);

    }

    document.getElementById("Hola")!.append(tabla);

    let tabla2 :HTMLTableElement = document.createElement("table");
    arregloBotones2 = [];

    for(let i : number = 0; i < n; i++){

        let fila : HTMLTableRowElement = document.createElement("tr");

        let input : HTMLInputElement = document.createElement("input");
        let celda : HTMLTableCellElement = document.createElement("td");
        input.type = "number";
        arregloBotones2[i] = input;
        celda.append(input);
        fila.append(celda);
        tabla2.append(fila);

    }

    document.getElementById("Hola")!.append(tabla2);


});

btnSiguiente2.addEventListener("click",(e : Event)=>{

    e.preventDefault();

    let n : number = barra.value as unknown as number;
    arregloValores = [];

    for(let i : number = 0; i < n; i++){

        arregloValores[i] = [];

        for(let j : number = 0; j < n; j++){

            arregloValores[i][j] = arregloBotones[i][j].value as unknown as number;

        }

    }

    arregloValores2 = []

    for(let i : number = 0; i < n; i++){

        arregloValores2[i] = arregloBotones2[i].value as unknown as number;

    }

    matrizU = arregloValores;
    matrizL = [];
    for(let l : number = 0; l < n; l++){
        matrizL[l] = [];
    }

    for(let i : number = 0; i < n; i++){

        
        

        matrizL[i][i]=1;

        for(let j : number = i + 1; j < n; j++){

            let pivote : number = matrizU[j][i]/matrizU[i][i];
            matrizL[j][i] = pivote;

            for(let k : number = 0; k < n; k++){

                matrizU[j][k] = matrizU[j][k] - (pivote * matrizU[i][k]);
                
            }

        }
        
    }

    vectorY = [];

    for(let i : number = 0; i < n; i++){

        let combinaciónLineal : number = 0;

        for(let j = 0; j<i && i>0; j++){

            combinaciónLineal += matrizL[i][j]*vectorY[j];

        }

        vectorY[i] = (arregloValores2[i]-combinaciónLineal)/matrizL[i][i];
        
    }

    console.log(vectorY);

    vectorX = [];

    for(let i : number = n-1; i >= 0; i--){

        let combinaciónLineal : number = 0;

        for(let j = i+1; j<n && i<n-1; j++){

            combinaciónLineal += matrizU[i][j]*vectorX[j];

        }

        vectorX[i] = (vectorY[i]-combinaciónLineal)/matrizU[i][i];
        
    }

    console.log(vectorX);



});
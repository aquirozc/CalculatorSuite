import { FactorizadorDeMatrices } from "./CoreEngine";

class ApplicationController{

    _barraSelectora : HTMLInputElement = document.getElementById("barra-n")! as HTMLInputElement;
    _botonGenerarCampos : HTMLButtonElement = document.getElementById("btn-siguiente")! as HTMLButtonElement;
    _botonResolverSistema : HTMLButtonElement = document.getElementById("btn-siguiente")! as HTMLButtonElement;
    _elementosMatrizA : HTMLInputElement[][];
    _elementosVectorB : HTMLInputElement[];
    _factorizadorDeMatrices : FactorizadorDeMatrices = new FactorizadorDeMatrices();

    public onCreate():void{

        this._barraSelectora.addEventListener("input",
        ()=>{
            this._barraSelectora.nextElementSibling!.innerHTML = this._barraSelectora.value
        });

        this._botonGenerarCampos.addEventListener("click", (event : Event)=>{
            event.preventDefault();
            this.generarCampos(this._barraSelectora.value as unknown as number);
        });

        this._botonResolverSistema.addEventListener("click", (event : Event)=>{
            event.preventDefault();
            this.resolverSistema(this._barraSelectora.value as unknown as number);
        });

    }

    private generarCampos(n : number):void{
        let contenedor : HTMLDivElement = document.getElementById("Hola")! as HTMLDivElement;
        contenedor.innerHTML = "";

        let tabla :HTMLTableElement = document.createElement("table");
        this._elementosMatrizA = [];

        for(let i : number = 0; i < n; i++){
            let fila : HTMLTableRowElement = document.createElement("tr");
            this._elementosMatrizA[i] = [];

            for(let j : number = 0; j < n; j++){
                let input : HTMLInputElement = document.createElement("input");
                let celda : HTMLTableCellElement = document.createElement("td");
                input.type = "number";
                this._elementosMatrizA[i][j] = input;
                celda.append(input);
                fila.append(celda);
            }
            tabla.append(fila);
        }

        contenedor.append(tabla);

        let tabla2 :HTMLTableElement = document.createElement("table");
        this._elementosVectorB= [];

        for(let i : number = 0; i < n; i++){
            let fila : HTMLTableRowElement = document.createElement("tr");
            let input : HTMLInputElement = document.createElement("input");
            let celda : HTMLTableCellElement = document.createElement("td");
            input.type = "number";
            this._elementosVectorB[i] = input;
            celda.append(input);
            fila.append(celda);
            tabla2.append(fila);
        }
        contenedor.append(tabla2);    
    }

    private resolverSistema(n : number){
        let matrizA : number[][] = [];
        let vectorB : number[] = [];

        for(let i : number = 0; i < n; i++){
            matrizA[i] = [];
            for(let j : number = 0; j < n; j++){
                matrizA[i][j] = this._elementosMatrizA[i][j].value as unknown as number;
            }
        }
    
        for(let i : number = 0; i < n; i++){
            vectorB[i] = this._elementosVectorB[i].value as unknown as number;
        }

        this._factorizadorDeMatrices.factorizarMatrizOriginal(matrizA);
        this._factorizadorDeMatrices.resolverSistemaDeEcuaciones(vectorB);

        console.log("Matriz L",this._factorizadorDeMatrices.matrizL);
        console.log("Matriz U",this._factorizadorDeMatrices.matrizU);
        console.log("Vector X",this._factorizadorDeMatrices.vectorX);
        console.log("Vector X",this._factorizadorDeMatrices.vectorY);
    }
}

new ApplicationController().onCreate;
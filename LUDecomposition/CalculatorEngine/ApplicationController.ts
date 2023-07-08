export {ApplicationController}
import { FactorizadorDeMatrices } from "./CoreEngine";

class ApplicationController{

    private _barraSelectora : HTMLInputElement = document.getElementById("seleccion-dimension")! as HTMLInputElement;
    private _botonGenerarCampos : HTMLButtonElement = document.getElementById("btn-generar-campos")! as HTMLButtonElement;
    private _botonResolverSistema : HTMLButtonElement = document.getElementById("btn-resolver-sistema")! as HTMLButtonElement;
    private _elementosMatrizA : HTMLInputElement[][];
    private _elementosVectorB : HTMLInputElement[];
    private _factorizadorDeMatrices : FactorizadorDeMatrices = new FactorizadorDeMatrices(this);

    public onCreate():void{

        this._barraSelectora.addEventListener("input",
        ()=>{
            let valor :number = this._barraSelectora.value as unknown as number; 
            let min : number = this._barraSelectora.min as unknown as number;
            let max : number = this._barraSelectora.max as unknown as number;
            let porcentaje  : number= (valor-min)/(max-min)*100;
            this._barraSelectora.nextElementSibling!.innerHTML = this._barraSelectora.value;
            this._barraSelectora.style.background=`linear-gradient(90deg, #0078D7 ${porcentaje}%, #999999 ${porcentaje}%)`;
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
        let contenedor : HTMLDivElement = document.getElementById("input-contenedor")! as HTMLDivElement;
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

        for(let i : number = 0; i < n; i++){
            let fila : HTMLTableRowElement = document.createElement("tr");
            let celda : HTMLTableCellElement = document.createElement("td");
            celda.innerHTML = "X" + (i+1);
            fila.append(celda);
            tabla2.append(fila);
        }
        contenedor.append(tabla2);  

        let tabla3 :HTMLTableElement = document.createElement("table");
        this._elementosVectorB= [];

        for(let i : number = 0; i < n; i++){
            let fila : HTMLTableRowElement = document.createElement("tr");
            let input : HTMLInputElement = document.createElement("input");
            let celda : HTMLTableCellElement = document.createElement("td");
            input.type = "number";
            this._elementosVectorB[i] = input;
            celda.append(input);
            fila.append(celda);
            tabla3.append(fila);
        }
        contenedor.append(tabla3);   
        document.getElementById("input-super-contenedor")!.style.height = (20 +30 + 25 + n*40)+ "px";; 
    }

    public mostrarDesglose(paso : number,matriz : number[][],idContenedor:string):void{

        let contenedor = document.getElementById(idContenedor)!;
        let tabla :HTMLTableElement = document.createElement("table");
        let sub  = document.createElement("h3");
        sub.innerHTML = "Paso " + paso;

        for(let i : number = 0; i < matriz.length; i++){
            let fila : HTMLTableRowElement = document.createElement("tr");

            for(let j : number = 0; j < matriz.length; j++){
                let celda : HTMLTableCellElement = document.createElement("td");
                celda.innerHTML = matriz[i][j] + "";
                fila.append(celda);
            }
            tabla.append(fila);
        }
        
        contenedor.appendChild(sub);
        contenedor.append(tabla);
    }

    public mostrarResultados(variable:string, matriz:number[][],vector:number[],idContenedor:string):void{
        let n = matriz.length;
        let contenedor = document.getElementById(idContenedor)!;
        contenedor.innerHTML = "";

        let tabla :HTMLTableElement = document.createElement("table");

        for(let i : number = 0; i < n; i++){
            let fila : HTMLTableRowElement = document.createElement("tr");
            for(let j : number = 0; j < n; j++){
                let celda : HTMLTableCellElement = document.createElement("td");
                celda.innerHTML = matriz[i][j] + "";
                fila.append(celda);
            }
            tabla.append(fila);
        }

        contenedor.append(tabla);

        let tabla2 :HTMLTableElement = document.createElement("table");

        for(let i : number = 0; i < n; i++){
            let fila : HTMLTableRowElement = document.createElement("tr");
            let celda : HTMLTableCellElement = document.createElement("td");
            celda.innerHTML = variable + (i+1);
            fila.append(celda);
            tabla2.append(fila);
        }
        contenedor.append(tabla2);  

        let tabla3 :HTMLTableElement = document.createElement("table");

        for(let i : number = 0; i < n; i++){
            let fila : HTMLTableRowElement = document.createElement("tr");
            let celda : HTMLTableCellElement = document.createElement("td");
            celda.innerHTML = vector[i] + "";
            fila.append(celda);
            tabla3.append(fila);
        }
        contenedor.append(tabla3);

    }

    private resolverSistema(n : number):void{

        document.getElementById("super-contenedor-solucion")!.classList.remove("display-none")
        document.getElementById("super-contenedor-solucion")!.classList.add("display-block")
        document.getElementById("contenedor-solucion-matriz-l")!.innerHTML = "";
        document.getElementById("contenedor-solucion-matriz-u")!.innerHTML = "";

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
        this.mostrarResultados("Y",this._factorizadorDeMatrices.matrizL,this._factorizadorDeMatrices.vectorY,"contenedor-solucion-vector-y");
        this.mostrarResultados("X",this._factorizadorDeMatrices.matrizU,this._factorizadorDeMatrices.vectorX,"contenedor-solucion-vector-x");

        
    }
}

let thisPageApplicationController : ApplicationController = new ApplicationController();
thisPageApplicationController.onCreate();
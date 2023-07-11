export {ApplicationController}
import { FactorizadorDeMatrices } from "./CoreEngine";

class ApplicationController{

    private _barraSelectora : HTMLInputElement = document.getElementById("sldr-escoger-tamaño")! as HTMLInputElement;
    private _botonGenerarCampos : HTMLButtonElement = document.getElementById("btn-generar-campos")! as HTMLButtonElement;
    private _botonResolverSistema : HTMLButtonElement = document.getElementById("btn-resolver-sistema")! as HTMLButtonElement;
    private _tamañoEscogido : number;
    private _elementosMatrizA : HTMLInputElement[][];
    private _elementosVectorB : HTMLInputElement[];
    private _idElementosOcultables : string[] = ["contenedor-vector-x","contenedor-vector-y","contenedor-matrices"];
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
        
        for (let id of this._idElementosOcultables){
            let botonMostrarSuperContenedor = document.getElementById("mostrar-super-" + id)! as HTMLInputElement;
            botonMostrarSuperContenedor.addEventListener('click', ()=>{
                let superContenedor : HTMLDivElement= document.getElementById("super-" + id)! as HTMLDivElement;
                let contenedor : HTMLDivElement = document.getElementById(id)! as HTMLDivElement;

                let newHeight : number = botonMostrarSuperContenedor.checked ? contenedor.clientHeight : 0;
                superContenedor.style.height = newHeight + "px";
            });
        }
    }

    private generarCampos(n : number):void{
        this._elementosMatrizA = [];
        this._elementosVectorB = [];

        let contenedor : HTMLDivElement = document.getElementById("contenedor-input")! as HTMLDivElement;
        let tabla : HTMLTableElement;
        contenedor.innerHTML = "";

        tabla = this.generarMatrizInputs(n,this._elementosMatrizA,"number","fluent-input",false,false,"",[],"");
        contenedor.append(tabla);

        tabla = this.generarVectorInputs(n,[],"text","blank-input",true,true,"X",this.generarRango(1,n),"");
        contenedor.append(tabla)

        tabla = this.generarVectorInputs(n,this._elementosVectorB,"number","fluent-input",false,false,"",[],""); 
        contenedor.append(tabla);

        document.getElementById("super-contenedor-input")!.style.height = (contenedor.clientHeight + 100)+ "px";
    }

    public mostrarDesglose(paso : number,matriz : number[][],idContenedor:string):void{
        let contenedor = document.getElementById(idContenedor)!;
        let tabla :HTMLTableElement;
        let sub  = document.createElement("h3");

        sub.innerHTML = "Paso " + paso;
        tabla = this.generarMatrizInputs(matriz.length,[],"number","fluent-input",true,true,"",matriz,"");
        
        contenedor.append(sub);
        contenedor.append(tabla)
    }

    private mostrarResultados(variable:string, matriz:number[][],vector:number[],solucion:number[],idContenedor:string):void{
        let n = matriz.length;
        let contenedor = document.getElementById(idContenedor)!;
        let tabla : HTMLTableElement;
        contenedor.innerHTML = "";

        tabla = this.generarMatrizInputs(n,[],"number","fluent-input",true,true,"",matriz,"");
        contenedor.append(tabla)

        tabla = this.generarVectorInputs(n,[],"text","blank-input",true,true,variable,this.generarRango(1,n),"");
        contenedor.append(tabla);

        tabla = this.generarVectorInputs(n,[],"number","fluent-input",true,true,"",vector,"");
        contenedor.append(tabla);

        let spanner : HTMLDivElement = document.createElement("div");
        spanner.classList.add("flx-grow1");
        contenedor.append(spanner)

        tabla = this.generarVectorInputs(n,[],"text","blank-input",true,true,variable,this.generarRango(1,n)," =");
        contenedor.append(tabla);

        tabla = this.generarVectorInputs(n,[],"number","fluent-input",true,true,"",solucion,"");
        contenedor.append(tabla);
    }

    private resolverSistema(n : number):void{
        document.getElementById("contenedor-matriz-l")!.innerHTML = "";
        document.getElementById("contenedor-matriz-u")!.innerHTML = "";

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
        this.mostrarResultados("Y",this._factorizadorDeMatrices.matrizL,vectorB,this._factorizadorDeMatrices.vectorY,"contenedor-vector-y");
        this.mostrarResultados("X",this._factorizadorDeMatrices.matrizU,this._factorizadorDeMatrices.vectorY,this._factorizadorDeMatrices.vectorX,"contenedor-vector-x");
        document.getElementById("super-contenedor-solucion")!.style.maxHeight = "10000vh";
    }

    private generarMatrizInputs(n : number, contenedor : HTMLInputElement[][],tipo : string, clase : string, readOnly : boolean, remplazarValor : boolean, cadenaBase:string, valores : any[][], cadenaTerminal : string) : HTMLTableElement{
        let tabla : HTMLTableElement = document.createElement("table");

        for(let i : number = 0; i < n; i++){
            let fila : HTMLTableRowElement = document.createElement("tr");
            contenedor[i] = [];

            for(let j : number = 0; j < n; j++){
                let celda : HTMLTableCellElement = document.createElement("td");
                let input : HTMLInputElement = document.createElement("input");
                input.type = tipo;
                input.value = remplazarValor ? cadenaBase + valores[i][j]  + cadenaTerminal : "";
                input.readOnly = readOnly;
                input.classList.add(clase);
                contenedor[i][j] = input;
                celda.append(input);
                fila.append(celda);
            }

            tabla.append(fila);
        }

        return tabla;
    }

    private generarVectorInputs(n : number, contenedor:HTMLInputElement[], tipo:string, clase : string, readOnly : boolean, remplazarValor : boolean, cadenaBase:string, valores : any[], cadenaTerminal : string) : HTMLTableElement{
        let tabla : HTMLTableElement = document.createElement("table");

        for(let i : number = 0; i < n; i++){
            let celda : HTMLTableCellElement = document.createElement("td");
            let fila : HTMLTableRowElement = document.createElement("tr");
            let input : HTMLInputElement = document.createElement("input");
            input.type = tipo;
            input.value = remplazarValor ? cadenaBase + valores[i] + cadenaTerminal : "";
            input.readOnly = readOnly;
            input.classList.add(clase);
            contenedor[i] = input;
            celda.append(input);
            fila.append(celda);
            tabla.append(fila);
        }

        return tabla;
    }

    private generarRango(a : number , b : number) : number[]{
        let rango : number[] = [];
        for (let i = 0; i <= b-a; i++ ){
            rango[i] = i + 1;
        }
        return rango;
    }

}

let thisPageApplicationController : ApplicationController = new ApplicationController();
thisPageApplicationController.onCreate();
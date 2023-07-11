export {FactorizadorDeMatrices}
import { ApplicationController } from "./ApplicationController";

class FactorizadorDeMatrices{
    
    private controller : ApplicationController;
    private dimension : number;
    private _matrizL : number[][];
    private _matrizU : number[][];
    private _vectorX : number[];
    private _vectorY : number[];

    constructor(c : ApplicationController){
        this.controller = c;
    }

    public factorizarMatrizOriginal(matrizA : number[][]) : void{
        let contador : number = 0;
        this.dimension = matrizA.length;
        this._matrizU = matrizA;
        this._matrizL = this.generarMatrizDeIdentidad(this._matrizL,this.dimension);

        for(let i : number = 0; i < this.dimension; i++){
            
            for(let j : number = i + 1; j < this.dimension; j++){
                let pivote : number = this._matrizU[j][i]/this._matrizU[i][i];
                this._matrizL[j][i] = pivote;

                for(let k : number = 0; k < this.dimension; k++){
                    this._matrizU[j][k] = this._matrizU[j][k] - (pivote * this._matrizU[i][k]);
                }
                contador++;
                this.controller.mostrarDesglose(contador,this.matrizL,"contenedor-matriz-l");
                this.controller.mostrarDesglose(contador,this.matrizU,"contenedor-matriz-u");
            }
        }
    }

    private generarMatrizDeIdentidad(matriz:number[][], n : number) : number[][]{
        matriz = [];
        for(let i : number = 0; i < n; i++){
            matriz[i] = [];
            for (let j : number = 0; j < n; j++){
                matriz[i][j] = (i==j) ? 1 : 0; 
            }
        }
        return matriz;
    }
    
    public resolverSistemaDeEcuaciones (vectorB: number[]): void{
        this._vectorX = [];
        this._vectorY = [];
        for(let i : number = 0; i < this.dimension; i++){
            let combinaciónLineal : number = 0;
    
            for(let j = 0; j<i && i>0; j++){
                combinaciónLineal += this._matrizL[i][j]*this._vectorY[j];
            }
            this._vectorY[i] = (vectorB[i]-combinaciónLineal)/this._matrizL[i][i];
        }

        for(let i : number = this.dimension-1; i >= 0; i--){

            let combinaciónLineal : number = 0;
    
            for(let j = i+1; j<this.dimension && i<this.dimension-1; j++){
                combinaciónLineal += this._matrizU[i][j]*this._vectorX[j];
            }
            this._vectorX[i] = (this._vectorY[i]-combinaciónLineal)/this._matrizU[i][i];
        }
    }

    public get matrizL(){
        return this._matrizL;
    }

    public get matrizU(){
        return this._matrizU;
    }

    public get vectorX(){
        return this._vectorX;
    }

    public get vectorY(){
        return this._vectorY;
    }
}
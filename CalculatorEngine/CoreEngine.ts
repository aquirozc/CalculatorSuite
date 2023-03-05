export{CalculadoraBinaria}
export{AnalizadorEntrada}

class CalculadoraBinaria {

    public convertirBinarioAOctal(enteroBase02 : string) : number {

        let enteroBase08 : number = 0;
        let aux : string = '';

        let longuitudDeseada = Math.ceil(enteroBase02.length / 3) * 3;

        if(longuitudDeseada != enteroBase02.length){

            enteroBase02 = enteroBase02.padStart(longuitudDeseada,'0');

        }

        for (let i : number = 0; i < longuitudDeseada-2; i +=3){

            let segmento : string = '';
            segmento += enteroBase02.charAt(i);
            segmento += enteroBase02.charAt(i + 1);
            segmento += enteroBase02.charAt(i + 2);

            aux += <string> <unknown> this.convertirBinarioADecimalEntero(segmento);

        }

        enteroBase08 = <number> <unknown> aux;

        return enteroBase08;
    }

    public convertirOctalABinario(enteroBase08 : number) : string {

        let enteroBase02 : string = '';

        for(let digito of enteroBase08.toString()){

            let segmento : string = this.convertirDecimalEnteroABinario(<number> <unknown> digito);

            if (segmento.length < 3){
                
                segmento =  segmento.padStart(3,'0');

            }

            enteroBase02 += segmento;

        }

        return enteroBase02;
        
    }

   public convertirBinarioADecimalEntero(enteroBase02 : string) : number{

        let enteroBase10 : number = 0;

        for (let i = 0; i < enteroBase02.length; i++){

            let indiceActual = (enteroBase02.length - 1) - i;
            enteroBase10 += (parseFloat(enteroBase02.charAt(indiceActual)) * Math.pow(2, i));

        }

        return enteroBase10;

    }

    public convertirDecimalEnteroABinario (enteroBase10 : number) : string{

        let enteroBase02 : string =  '';
        
        let aux : string = '';
        
        let resultadoCociente : number = enteroBase10;

        do{

            if(resultadoCociente % 2 == 0){

                aux += '0';

            } else {

                aux += '1';
                resultadoCociente--;

            }

            resultadoCociente /= 2;

        }while(resultadoCociente > 0)


        for (let i = 0; i < aux.length; i++){

            let indiceActual = (aux.length - 1) - i;
            enteroBase02 += aux.charAt(indiceActual);

        }

        return enteroBase02;


    }

    public convertirBinarioADecilmalFraccionario(fraccionarioBase02 : string) : number{

        let fraccionarioBase10 : number = 0;

        for (let i = 0; i < fraccionarioBase02.length; i++){

            let indiceActual = (fraccionarioBase02.length - 1) - i;
            fraccionarioBase10 += (parseFloat(fraccionarioBase02.charAt(i)) * Math.pow(2,-(i+1)));

        }

        return fraccionarioBase10;

    }

    public convertirDecimalFraccionarioABinario(fraccionarioBase10 : number) : string{

        let fraccionarioBase02 : string = '';

        for (let i  = 0; i <= 5; i++){

            fraccionarioBase10 *= 2;

            if(fraccionarioBase10 >= 1){

                fraccionarioBase02 += '1'
                fraccionarioBase10--;

            } else{
                fraccionarioBase02 += '0'
            }
            
        }

        return fraccionarioBase02;

    }

    public convertirBinarioAHexadecimal(enteroBase02: string):string{

        let enteroBase16 : string = '';

        let longuitudDeseada = Math.ceil(enteroBase02.length / 4) * 4;

        if(longuitudDeseada != enteroBase02.length){

            enteroBase02 = enteroBase02.padStart(longuitudDeseada,'0');

        }

        for (let i : number = 0; i < longuitudDeseada-3; i +=4){

            let segmento : string = '';
            let aux : string | number;

            segmento += enteroBase02.charAt(i);
            segmento += enteroBase02.charAt(i + 1);
            segmento += enteroBase02.charAt(i + 2);
            segmento += enteroBase02.charAt(i + 3);

            aux = this.convertirBinarioADecimalEntero(segmento);

            if (aux >= 10){

                aux = String.fromCharCode(55 + aux);

            }

            enteroBase16 += <string> aux;

        }

        return enteroBase16;

    }

    public convertirHexadecimalABinario(enteroBase16 : string) :string {

        let enteroBase02 : string = '';

        for(let digito of enteroBase16.toString()){

            let aux : string | number = digito;

            if(aux.charCodeAt(0) >= 65){
                aux = aux.charCodeAt(0) - 55;
            }

            let segmento : string = this.convertirDecimalEnteroABinario(<number> aux);

            if (segmento.length < 4){
                
                segmento =  segmento.padStart(4,'0');

            }

            enteroBase02 += segmento;

        }

        return enteroBase02;

    }

    

}

class AnalizadorEntrada{

    private calculadoraBinaria : CalculadoraBinaria;

    constructor (calculadoraBinaria : CalculadoraBinaria){

        this.calculadoraBinaria = calculadoraBinaria;

    }

    public convertirNumeroBinarioAOctal(numeroBinario : string) : number{

        return this.calculadoraBinaria.convertirBinarioAOctal(numeroBinario);

    }

    public convertirNumeroBinarioADecimal(numeroBinario : string) : number{

        let numeroDecimal : number;

        let index = numeroBinario.indexOf('.');

        if (index != -1){

            numeroDecimal = this.calculadoraBinaria.convertirBinarioADecimalEntero(numeroBinario.substring(0,index)) + this.calculadoraBinaria.convertirBinarioADecilmalFraccionario(numeroBinario.substring(index+1));

        }else {

            numeroDecimal = this.calculadoraBinaria.convertirBinarioADecimalEntero(numeroBinario);

        }

        return numeroDecimal;

    }

    public convertirNumeroBinarioAHexadecimal(numeroBinario : string) : string{

        return this.calculadoraBinaria.convertirBinarioAHexadecimal(numeroBinario);

    }

    

    public convertirNumeroDecimalABinario(numeroDecimal : number) : string{

        let  numeroBinario : string;

        let parteEntera : number;
        let parteDecimal : number;
        let mantisaNumeroBinario : string;

        parteEntera = Math.trunc(numeroDecimal);
        parteDecimal = numeroDecimal - parteEntera;
        mantisaNumeroBinario = '';


        if (parteDecimal != 0){

            mantisaNumeroBinario = '.' +  this.calculadoraBinaria.convertirDecimalFraccionarioABinario(parteDecimal);

        }

        numeroBinario = this.calculadoraBinaria.convertirDecimalEnteroABinario(parteEntera) + mantisaNumeroBinario;
        

        return numeroBinario;


    }

    public convertirNumeroDecimalAOctal(numeroDecimal : number) : number{

        let numeroOctal : number;

        numeroOctal = this.convertirNumeroBinarioAOctal(this.convertirNumeroDecimalABinario(numeroDecimal));

        return numeroOctal;

    }

    public convertirNumeroDecimalAHexadecimal(numeroDecimal : number) : string {

        let numeroHexadecimal : string;

        numeroHexadecimal = this.convertirNumeroBinarioAHexadecimal(this.convertirNumeroDecimalABinario(numeroDecimal));

        return numeroHexadecimal;

    }

    public convertirNumeroOctalABinario(numeroOctal : number) : string{

        return this.calculadoraBinaria.convertirOctalABinario(numeroOctal);

    }

    public convertirNumeroOctalADecimal(numeroOctal : number) : number{

        let numeroDecimal : number;

        numeroDecimal = this.convertirNumeroBinarioADecimal(this.convertirNumeroOctalABinario(numeroOctal)); 

        return numeroDecimal;

    }

    public convertirNumeroOctalAHexadecimal(numeroOctal : number) : string {

        let numeroHexadecimal : string;

        numeroHexadecimal = this.convertirNumeroBinarioAHexadecimal(this.convertirNumeroOctalABinario(numeroOctal));

        return numeroHexadecimal;

    }

    public convertirNumeroHexadecimalABinario(numeroHexadecimal : string) :string{

        return this.calculadoraBinaria.convertirHexadecimalABinario(numeroHexadecimal);
        
    }

    public convertirNumeroHexadecimalAOctal(numeroHexadecimal : string) : number{

        let numeroOctal : number;
        
        numeroOctal = this.convertirNumeroBinarioAOctal(this.convertirNumeroHexadecimalABinario(numeroHexadecimal));

        return numeroOctal;

    }

    public convertirNumeroHexadecimalADecimal(numeroHexadecimal : string) : number{

        let numeroDecimal : number;

        numeroDecimal = this.convertirNumeroBinarioADecimal(this.convertirNumeroHexadecimalABinario(numeroHexadecimal));

        return numeroDecimal;

    }

}
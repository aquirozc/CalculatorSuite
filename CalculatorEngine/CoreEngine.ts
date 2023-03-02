export{CalculadoraBinaria}
export{AnalizadorEntrada}

class CalculadoraBinaria {

   public convertirBinarioADecimalEntero(enteroBase2 : string) : number{

        let enteroBase10 : number = 0;

        for (let i = 0; i < enteroBase2.length; i++){

            let indiceActual = (enteroBase2.length - 1) - i;
            enteroBase10 += (parseFloat(enteroBase2.charAt(indiceActual)) * Math.pow(2, i));

        }

        return enteroBase10;

    }

    public convertirDecimalEnteroABinario (enteroBase10 : number) : string{

        let enteroBase2 : string =  '';
        
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
            enteroBase2 += aux.charAt(indiceActual);

        }

        return enteroBase2;


    }

    public convertirBinarioADecilmalFraccionario(fraccionarioBase2 : string) : number{

        let fraccionarioBase10 : number = 0;

        for (let i = 0; i < fraccionarioBase2.length; i++){

            let indiceActual = (fraccionarioBase2.length - 1) - i;
            fraccionarioBase10 += (parseFloat(fraccionarioBase2.charAt(i)) * Math.pow(2,-(i+1)));

        }

        return fraccionarioBase10;

    }

    public convertirDecimalFraccionarioABinario(fraccionarioBase10 : number) : string{

        let fraccionarioBase2 : string = '';

        for (let i  = 0; i <= 5; i++){

            fraccionarioBase10 *= 2;

            if(fraccionarioBase10 >= 1){

                fraccionarioBase2 += '1'
                fraccionarioBase10--;

            } else{
                fraccionarioBase2 += '0'
            }
            
        }

        return fraccionarioBase2;

    }

}

class AnalizadorEntrada{

    private calculadoraBinaria : CalculadoraBinaria;

    constructor (calculadoraBinaria : CalculadoraBinaria){

        this.calculadoraBinaria = calculadoraBinaria;

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

}
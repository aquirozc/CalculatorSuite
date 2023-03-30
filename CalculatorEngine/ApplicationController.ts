import {CalculadoraBinaria} from "./CoreEngine";
import{AnalizadorEntrada} from "./CoreEngine";

const analizadorEntrada : AnalizadorEntrada = new AnalizadorEntrada(new CalculadoraBinaria());
const botonConvertir : HTMLElement = document.getElementById('convert-button')!;
const opcionesDeSalida : NodeListOf <HTMLElement> = document.getElementsByName('outcomeformat')!;
const opcionesDeEntrada: NodeListOf <HTMLElement> = document.getElementsByName('sourceformat')!;

botonConvertir.addEventListener('click',convertirEntrada);

for(let op of opcionesDeEntrada){

    op.addEventListener('click', () => {bloquearOpcion(op.id)})

}

for(let op of opcionesDeSalida){

    op.addEventListener('click', () => {bloquearOpcion(op.id)})

}

function bloquearOpcion(opcionSeleccionada : string){

    let index: string = opcionSeleccionada.substring(opcionSeleccionada.length-3);
    let listaContraria : NodeListOf <HTMLElement>;
    
    if(opcionSeleccionada.startsWith('source')){
        
        listaContraria = opcionesDeSalida;
        

    }else{

        listaContraria = opcionesDeEntrada;

    }

    for(let op of listaContraria){


        if(op.id.endsWith(index)){

            let botonDeRadio = op as HTMLInputElement;

            botonDeRadio.checked = false;

        }
    
    }

}

function comprobarGramatica(valorEntrada : number | string, caracteresAdmitidos : string [] ){

    let cumpleConLaGramatica : boolean = true;

    for(let digito of valorEntrada.toString()){

        if(!caracteresAdmitidos.includes(digito)){

            cumpleConLaGramatica = false;
            break;

        }

    }

    if(!cumpleConLaGramatica){
        
        alert("Los valores introducidos no son validos.");
        throw new Error();

    }

}

function convertirEntrada(){

    let entradaUsuario: HTMLInputElement = document.getElementById('prompt-textbox')! as HTMLInputElement;
    let formatoFuente : HTMLInputElement = document.querySelector('input[name="sourceformat"]:checked')!;
    let formatoSalida : HTMLInputElement = document.querySelector('input[name="outcomeformat"]:checked')!;
    let valorEntrada : string = entradaUsuario.value.replace(/\s/g,'');;
    let valorSalida : string = '';
    let etiquetaFuente : string = formatoFuente.value.substring(formatoFuente.value.length - 2);
    let etiquetaSalida : string = formatoSalida.value.substring(formatoSalida.value.length - 2);

    switch(formatoFuente.value){

        case 'base02' : 

            comprobarGramatica(valorEntrada,['0','1']);

            switch(formatoSalida.value){

                case 'base08' :

                    valorSalida = <string> <unknown> analizadorEntrada.convertirNumeroBinarioAOctal(valorEntrada);

                break;

                case 'base10' :

                    valorSalida = <string><unknown>analizadorEntrada.convertirNumeroBinarioADecimal(valorEntrada);

                break;

                case 'base16' :

                    valorSalida = analizadorEntrada.convertirNumeroBinarioAHexadecimal(valorEntrada);

                break;

            }

        break;

        case 'base08' : 

            comprobarGramatica(valorEntrada,['0','1','2','3','4','5','6','7']);

            switch(formatoSalida.value){

                case 'base02' :

                    valorSalida = analizadorEntrada.convertirNumeroOctalABinario(<number><unknown> valorEntrada);

                break;

                case 'base10' :

                    valorSalida = <string><unknown> analizadorEntrada.convertirNumeroOctalADecimal(<number><unknown> valorEntrada);

                break;

                case 'base16' :

                    valorSalida = analizadorEntrada.convertirNumeroOctalAHexadecimal(<number><unknown> valorEntrada);

                break;

            }

        break;

        case 'base10' : 

            comprobarGramatica(valorEntrada,['0','1','2','3','4','5','6','7','8','9']);

            switch(formatoSalida.value){

                case 'base02' :

                    valorSalida = analizadorEntrada.convertirNumeroDecimalABinario(<number> <unknown> valorEntrada);

                break;

                case 'base08' :

                    valorSalida = <string><unknown>analizadorEntrada.convertirNumeroDecimalAOctal(<number><unknown> valorEntrada);

                break;

                case 'base16' :

                    valorSalida = analizadorEntrada.convertirNumeroDecimalAHexadecimal(<number><unknown> valorEntrada);

                break;

            }

        break;

        case 'base16' : 

            comprobarGramatica(valorEntrada,['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']);

            switch(formatoSalida.value){

                case 'base02' :

                    valorSalida = analizadorEntrada.convertirNumeroHexadecimalABinario(valorEntrada);

                break;

                case 'base08' :

                    valorSalida = <string><unknown> analizadorEntrada.convertirNumeroHexadecimalAOctal(valorEntrada);

                break;

                case 'base10' :

                    valorSalida = <string><unknown> analizadorEntrada.convertirNumeroHexadecimalADecimal(valorEntrada);

                break;

            }

            break;

    }

    document.getElementById('source-value')!.innerText = entradaUsuario.value;
    document.getElementById('source-base')!.innerHTML = '<span>Base <br><span class="highlight-2">'+etiquetaFuente+'</span></span>';
    document.getElementById('outcome-value')!.innerText = valorSalida ;
    document.getElementById('outcome-base')!.innerHTML = '<span>Base <br><span class="highlight-2">'+etiquetaSalida+'</span></span>';

}

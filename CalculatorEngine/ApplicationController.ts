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

function convertirEntrada(){

    let entradaUsuario: HTMLInputElement = document.getElementById('prompt-textbox')! as HTMLInputElement;
    
    let formatoFuente : HTMLInputElement = document.querySelector('input[name="sourceformat"]:checked')!;
    let formatoSalida : HTMLInputElement = document.querySelector('input[name="outcomeformat"]:checked')!;

    let valorSalida : string = '';

    let etiquetaFuente : string = formatoFuente.value.substring(formatoFuente.value.length - 2);
    let etiquetaSalida : string = formatoSalida.value.substring(formatoSalida.value.length - 2);;

    switch(formatoFuente.value){

        case 'base02' : 

            switch(formatoSalida.value){

                case 'base08' :

                break;

                case 'base10' :

                    valorSalida =  <string><unknown>analizadorEntrada.convertirNumeroBinarioADecimal(entradaUsuario.value);

                break;

                case 'base16' :

                break;

            }

        break;

        case 'base08' : 

            switch(formatoSalida.value){

                case 'base02' :

                break;

                case 'base10' :

                break;

                case 'base16' :

                break;

            }

        break;

        case 'base10' : 

            switch(formatoSalida.value){

                case 'base02' :

                    valorSalida = analizadorEntrada.convertirNumeroDecimalABinario(<number> <unknown> entradaUsuario.value);

                break;

                case 'base08' :

                break;

                case 'base16' :

                break;

            }

        break;

        case 'base16' : 

        switch(formatoSalida.value){

            case 'base02' :

            break;

            case 'base08' :

            break;

            case 'base10' :

            break;

        }

        break;

    }

    document.getElementById('source-value')!.innerText = entradaUsuario.value ;
    document.getElementById('source-base')!.innerHTML = '<span>Base <br><span class="highlight-2">'+etiquetaFuente+'</span></span>';
    document.getElementById('outcome-value')!.innerText = valorSalida ;
    document.getElementById('outcome-base')!.innerHTML = '<span>Base <br><span class="highlight-2">'+etiquetaSalida+'</span></span>';

}

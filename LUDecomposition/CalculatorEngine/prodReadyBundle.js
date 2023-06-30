(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var barra = document.getElementById("campo-n");
var etiqueta = document.getElementById("etiqueta-n");
var arregloBotones;
var arregloBotones2;
var arregloValores;
var arregloValores2;
var matrizL;
var matrizU;
var vectorX;
var vectorY;
var btnSiguiente = document.getElementById("btn-siguiente");
var btnSiguiente2 = document.getElementById("btn-siguiente2");
barra.addEventListener("input", function () {
    etiqueta.innerText = barra.value;
});
btnSiguiente.addEventListener("click", function (e) {
    e.preventDefault();
    var container = document.getElementById("Hola");
    container.innerHTML = "";
    var n = barra.value;
    var tabla = document.createElement("table");
    arregloBotones = [];
    for (var i = 0; i < n; i++) {
        var fila = document.createElement("tr");
        arregloBotones[i] = [];
        for (var j = 0; j < n; j++) {
            var input = document.createElement("input");
            var celda = document.createElement("td");
            input.type = "number";
            arregloBotones[i][j] = input;
            celda.append(input);
            fila.append(celda);
        }
        tabla.append(fila);
    }
    document.getElementById("Hola").append(tabla);
    var tabla2 = document.createElement("table");
    arregloBotones2 = [];
    for (var i = 0; i < n; i++) {
        var fila = document.createElement("tr");
        var input = document.createElement("input");
        var celda = document.createElement("td");
        input.type = "number";
        arregloBotones2[i] = input;
        celda.append(input);
        fila.append(celda);
        tabla2.append(fila);
    }
    document.getElementById("Hola").append(tabla2);
});
btnSiguiente2.addEventListener("click", function (e) {
    e.preventDefault();
    var n = barra.value;
    arregloValores = [];
    for (var i = 0; i < n; i++) {
        arregloValores[i] = [];
        for (var j = 0; j < n; j++) {
            arregloValores[i][j] = arregloBotones[i][j].value;
        }
    }
    arregloValores2 = [];
    for (var i = 0; i < n; i++) {
        arregloValores2[i] = arregloBotones2[i].value;
    }
    matrizU = arregloValores;
    matrizL = [];
    for (var l = 0; l < n; l++) {
        matrizL[l] = [];
    }
    for (var i = 0; i < n; i++) {
        matrizL[i][i] = 1;
        for (var j = i + 1; j < n; j++) {
            var pivote = matrizU[j][i] / matrizU[i][i];
            matrizL[j][i] = pivote;
            for (var k = 0; k < n; k++) {
                matrizU[j][k] = matrizU[j][k] - (pivote * matrizU[i][k]);
            }
        }
    }
    vectorY = [];
    for (var i = 0; i < n; i++) {
        var combinaciónLineal = 0;
        for (var j = 0; j < i && i > 0; j++) {
            combinaciónLineal += matrizL[i][j] * vectorY[j];
        }
        vectorY[i] = (arregloValores2[i] - combinaciónLineal) / matrizL[i][i];
    }
    console.log(vectorY);
    vectorX = [];
    for (var i = n - 1; i >= 0; i--) {
        var combinaciónLineal = 0;
        for (var j = 0; j > i && i < n - 1; j++) {
            combinaciónLineal += matrizU[i][j] * vectorX[j];
        }
        vectorY[i] = (vectorY[i] - combinaciónLineal) / matrizU[i][i];
    }
    console.log(vectorX);
});

},{}]},{},[1]);

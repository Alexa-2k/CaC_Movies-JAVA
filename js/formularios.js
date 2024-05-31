var nombre = document.querySelector("#name");
var apellido = document.querySelector("#lastname");
var correo = document.querySelector("#email");
var usuario = document.querySelector("#user");
var passwd = document.querySelector("#passwd");
var verifMail = false;
var verifNomb = false;
var verifApell = false;
var verifUser = false;
var verifPasswd = false;

function borrarData() {
     nombre.value = "";
     apellido.value = "";
     usuario.value = "";	 
     correo.value = "";
     passwd.value = "";
     noAlertaMail();
     noAlertaNombre();
     noAlertaUser();
     noShowRegister();  


}

function dataInput() {
    validateData();  
    validateEmail();
    validateUser();

    if ((verifMail == false)) {
      alertaMail();    
    }
     if ((verifNomb == false) || (verifApell == false)) {
      alertaNombre();
     }
     if ((verifUser == false) || (verifPasswd == false)) {
      alertaUser();
      }
    if ((verifUser == true) && (verifPasswd == true) && (verifMail == true) && (verifNomb == true) && (verifApell == true)){  ShowRegister();
      } 
  }

function validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo.value)){
        verifMail = true;   
    } else {
        correo.value = ""
        alertaMail();
        verifMail = false;   
}}

function validateData () {
    if ((nombre.value == "") ||(apellido.value == "" )) {
        alertaNombre();
        verifNomb = false;
        verifApell = false;  }
        else {
          verifNomb = true;
          verifApell = true;
        }
    }  


function validateUser () {
    var pwd = document.getElementById('passwd').value;
    var usr = document.getElementById('user').value;
    if ((usuario.value == "") ||(passwd.value == "" ) || (pwd.length < 8) || (usr.length < 5)) {
        alertaUser();
        verifUser = false;
        verifPasswd = false;  
    }  else {
          verifUser = true;
          verifPasswd = true;
        }
        console.log(verifUser); console.log(verifPasswd);
}

function loginOK() {
        validateUser();
        if (verifUser == true && verifPasswd == true) {
          window.location.href = "./user.html";
          console.log('Redireccionando a user.html');
        } else {
          alertaUser();     
        }
    }

function noAlertaMail() { 
    document.getElementById("alerta-email").style.display = 'none';
}

function alertaMail() {
    document.getElementById("alerta-email").style.display = 'block';
}

function alertaNombre() {
    document.getElementById("alerta-nombre").style.display = 'block';
}

function noAlertaNombre () {
    document.getElementById("alerta-nombre").style.display = 'none';
}


function noAlertaUser() { 
    document.getElementById("alerta-user").style.display = 'none';
} 
function alertaUser() {
    document.getElementById("alerta-user").style.display = 'block';
}

function noShowRegister () {
    document.getElementById("registroOK").style.display = 'none';
}

function ShowRegister () {
    document.getElementById("registroOK").style.display = 'block';
}


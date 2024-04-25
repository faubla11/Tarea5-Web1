const inputs = document.querySelectorAll("form div input"),
  adver = document.getElementById("warning"),
  btnEnviar = document.getElementById("btnEnviar");

const expresionesRegulares = {
  numeros: /([0-9])/,
  text: /([a-zA-Z])/,
  caracteres: /[^a-zA-Z\d\s]/,
  correo: /([a-z\d]+[@]+[a-z]+\.[a-z]{2,})/,
  espacios: /\s/g,
};

var pass, c1, c2, c3, c4, c5, c6;

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    let valueInput = e.target.value;
    let style = e.target.style;

    switch (e.target.id) {
      case "names":
        message("Debe ingresar solo letras");
        input.value = valueInput
          .replace(expresionesRegulares.caracteres, "")
          .replace(expresionesRegulares.numeros, "");
        if (valueInput.length == 0) {
          style.border = "2px solid #ce1212";
          c1 = false;
        } else {
          style.border = "2px solid #008f39";
          c1 = true;
        }
        break;

      case "lasts":
        message("Debe ingresar solo letras");
        input.value = valueInput
          .replace(expresionesRegulares.caracteres, "")
          .replace(expresionesRegulares.numeros, "");
        if (valueInput.length == 0) {
          style.border = "2px solid #ce1212";
          c2 = false;
        } else {
          style.border = "2px solid #008f39";
          c2 = true;
        }
        break;

      case "mail-reg":
        input.value = valueInput.replace(expresionesRegulares.espacios, "");
        if (expresionesRegulares.correo.test(valueInput)) {
          style.border = " 2px solid #008f39";
          message("Correo electrónico correcto");
          c3 = true;
        } else {
          style.border = "2px solid #ce1212";
          message("El correo que ingreso no es correcto");
          c3 = false;
        }
        break;

      case "cell":
        input.value = valueInput
          .replace(expresionesRegulares.caracteres, "")
          .replace(expresionesRegulares.espacios, "")
          .replace(expresionesRegulares.text, "");
        if (expresionesRegulares.numeros.test(valueInput)) {
          if (valueInput.length <= 8) {
            message("Debes ingresar un número telefónico de 9 a 10 digitos");
            style.border = "2px solid #ce1212";
            c4 = false;
          } else {
            message("Longitud de número aceptable");
            style.border = "2px solid #008f39";
            c4 = true;
          }
        } else {
          message("Debes ingresar solo números");
          style.border = "2px solid #ce1212";
          c4 = false;
        }
        break;

      case "password":
        input.value = valueInput.replace(expresionesRegulares.espacios, "");
        if (valueInput.length < 8) {
          message("Solo se permiten contraseñas mayor a 8 caracteres");
          style.border = "2px solid #ce1212";
          c5 = false;
        } else {
          message("Longitud de contraseña aceptable");
          style.border = "2px solid #008f39";
          c5 = true;
        }
        pass = valueInput;
        break;

      case "c-password":
        input.value = valueInput.replace(expresionesRegulares.espacios, "");
        if (valueInput.length < 8) {
          message("Solo se permiten contraseñas mayor a 8 caracteres");
          style.border = "2px solid #ce1212";
          c6 = false;
        } else {
          if (valueInput == pass) {
            message("Las contraseñas coinciden");
            style.border = "2px solid #008f39";
            c6 = true;
          } else {
            message("!! Las contraseñas no coinciden !!");
            style.border = "2px solid #ce1212";
            c6 = false;
          }
        }
        break;
    }

    if (c1 && c2 && c3 && c4 && c5 && c6) {
      btnEnviar.disabled = false;
    } else {
      btnEnviar.disabled = true;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let warnings = "";
  let entrar = false;

  inputs.forEach((e) => {
    if (e.value == "") {
      warnings = "Todos los campos son requeridos";
      entrar = false;
      return;
    } else {
      entrar = true;
    }
  });

  if (entrar) {
    message("Enviado");
    form.reset();
  } else {
    message(warnings);
  }
});

function message(val) {
  adver.innerHTML = val;
}

const socket = io();

const emailUsuario = document.querySelector('[data-email]').getAttribute('data-email');

socket.on("mensajes", (data) => {
  const htmlMsjs = data
    .map((msj) => {
      console.log(msj);
      return `
        <div class="d-flex justify-content-between">
            <p class="medium mb-1">${msj.email}</p>
            <p class="medium mb-1">${msj.tipo}</p>
            <p class="small mb-1">${msj.fechayHora}</p>
        </div>
        <div class="d-flex flex-row justify-content-start">
            <div>
                <p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7;">
                ${msj.cuerpo}
                </p>
            </div>
        </div>
        `;
    })
    .join(" ");
  document.getElementById("msjContainer").innerHTML = htmlMsjs;
});

const agregarMensaje = () => {
  let texthtml = document.getElementById("text").value;

  if (texthtml != "") {
    const nuevoMsj = {
      email: emailUsuario,
      cuerpo: texthtml,
    };
    socket.emit("newMsj", nuevoMsj);
  } else {
    alert("Debe ingresar datos faltantes");
  }
  return false;
};
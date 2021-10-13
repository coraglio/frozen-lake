async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

async function main() {
  const TT = await loadJSON('./TT.json');
  const p_optima = await loadJSON('./p_optima.json');

  R = [-1, -1, -1, -5, +2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 100];
  win = [15];
  lose = [5, 7, 11, 12];
  document.addEventListener('keydown', keypress);

  movimientos = 0;
  puntaje1 = 0;
  puntaje2 = 0;
  start = false;

  function keypress(e) {
    if (!start) {
      setInterval(moverPersonaje2, 200);
      start = true;
    }

    accion = null;
    if (e.code == 'ArrowLeft') {
      // left
      accion = 0;
    }
    if (e.code == 'ArrowDown') {
      // down
      accion = 1;
    }
    if (e.code == 'ArrowRight') {
      // right
      accion = 2;
    }
    if (e.code == 'ArrowUp') {
      // up
      accion = 3;
    }

    moverPersonaje1(accion);
    // moverPersonaje2();
  }

  function getEstadoSiguiente(estado_actual, accion) {
    array = [];
    probabilidades = TT[accion][parseInt(estado_actual)];
    for (let i in probabilidades) {
      i = parseInt(i);
      for (let j = 0; j < parseInt(probabilidades[i] * 100); j++) {
        array.push(i);
      }
    }

    return array[Math.floor(Math.random() * array.length)];
  }

  function moverPersonaje1(accion) {
    el_personaje = document.getElementById('personaje');
    el_cel_actual = el_personaje.parentElement;
    sig = getEstadoSiguiente(el_cel_actual.id, accion);
    puntaje1 += R[sig];
    el_puntaje = document.getElementById('puntaje1');
    el_puntaje.innerText = puntaje1;

    mover('Usted', el_personaje, sig);
  }

  function moverPersonaje2() {
    el_personaje = document.getElementById('personaje2');
    el_cel_actual = el_personaje.parentElement;
    accion = p_optima[el_cel_actual.id];
    sig = getEstadoSiguiente(el_cel_actual.id, accion);
    puntaje2 += R[sig];
    el_puntaje = document.getElementById('puntaje2');
    el_puntaje.innerText = puntaje2;

    mover('Bot', el_personaje, sig);
  }

  function mover(nombre, el_personaje, sig) {
    el_cel_actual = el_personaje.parentElement;

    if (lose.includes(parseInt(el_cel_actual.id))) {
      // alert(`${nombre} pierde!`);
      el_cel_sig = document.getElementById('0');
      el_cel_sig.appendChild(el_personaje);
    }

    if (sig != el_cel_actual.id) {
      el_cel_sig = document.getElementById(sig);
      el_cel_sig.appendChild(el_personaje);
    }

    if (win.includes(sig)) {
      alert(`${nombre} gana!`);
      el_cel_sig = document.getElementById('0');
      el_cel_sig.appendChild(el_personaje);
    }
  }
}

main().then();

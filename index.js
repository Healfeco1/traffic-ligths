function trafficLights(road, n) {
    const initialRoad = road;  // Almacena la carretera inicial
    let lightPosition = [];    // Array para almacenar la posición y estado de los semáforos
    let result = [];           // Array para almacenar todos los estados de la carretera en cada iteración
    let cars = [];             // Array para almacenar la posición de los carros

    // Identificación de las posiciones de los semáforos y los carros
    for (let i = 0; i < initialRoad.length; i++) {
        // Si el caracter es 'R', 'G' o 'O', se añade al array lightPosition
        if (initialRoad[i] === 'R' || initialRoad[i] === 'G' || initialRoad[i] === 'O') {
            lightPosition.push({
                light: initialRoad[i],  // Tipo de semáforo ('R', 'G', 'O')
                index: i,               // Índice en la carretera
                count: 0                // Contador para el cambio de estado del semáforo
            });
        // Si el caracter es 'C', se añade al array cars
        } else if (initialRoad[i] === 'C') {
            cars.push({
                index: i                // Índice del carro en la carretera
            });
        }
    }

    cars = cars.reverse();  // Invierte el orden de los carros para simular de derecha a izquierda
    let lastTraffic = initialRoad;  // Estado inicial de la carretera
    let newRoad = '';  // Variable para almacenar el nuevo estado de la carretera en cada iteración

    // Bucle principal para simular 'n' unidades de tiempo
    for (let i = 0; i < n + 1; i++) {
        result.push(lastTraffic);  // Almacena el estado actual de la carretera en el array result
        newRoad = '.'.repeat(initialRoad.length);  // Crea una nueva carretera vacía

        // Actualiza el estado de los semáforos en la nueva carretera
        for (let item of lightPosition) {
            item.count++;  // Incrementa el contador de tiempo del semáforo

            // Cambia el estado del semáforo según su ciclo (VERDE, NARANJA, ROJO)
            if (item.light === 'O') {
                item.light = 'R';  // Cambia de NARANJA a ROJO después de 1 unidad de tiempo
                item.count = 0;    // Reinicia el contador
            } else if (item.light === 'G' && item.count % 5 === 0) {
                item.light = 'O';  // Cambia de VERDE a NARANJA después de 5 unidades de tiempo
                item.count = 0;    // Reinicia el contador
            } else if (item.light === 'R' && item.count % 5 === 0) {
                item.light = 'G';  // Cambia de ROJO a VERDE después de 5 unidades de tiempo
                item.count = 0;    // Reinicia el contador
            }

            // Actualiza la nueva carretera con el estado del semáforo actualizado
            newRoad = newRoad.substring(0, item.index) + item.light + newRoad.substring(item.index + 1);
        }

        // Mueve los carros en la nueva configuración de la carretera
        for (let car of cars) {
            if (car.index === -1 || car.index === newRoad.length - 1) {
                newRoad = newRoad;  // No hace cambios si el carro está fuera de los límites de la carretera
            } else {
                // Si el carro puede avanzar (no hay semáforos ROJO o NARANJA, o carros adelante)
                if (newRoad[car.index + 1] != 'O' && newRoad[car.index + 1] != 'R' && newRoad[car.index + 1] != 'C') {
                    // Si el semáforo es VERDE y hay un carro detrás, el carro se detiene
                    if (newRoad[car.index + 1] === 'G' && newRoad[car.index + 2] === 'C') {
                        newRoad = newRoad.substring(0, car.index) + 'C' + newRoad.substring(car.index + 1);
                    } else {
                        // Mueve el carro a la siguiente posición vacía
                        newRoad = newRoad.substring(0, car.index + 1) + 'C' + newRoad.substring(car.index + 2);
                        car.index = car.index + 1;  // Actualiza la posición del carro
                    }
                } else {
                    // Si el carro no puede avanzar, permanece en su posición actual
                    newRoad = newRoad.substring(0, car.index) + 'C' + newRoad.substring(car.index + 1);
                }
            }
        }

        lastTraffic = newRoad;  // Actualiza el estado actual de la carretera
    }

    return result;  // Devuelve todos los estados de la carretera en cada iteración
}


const road = 'CCC.G...R...';
const n = 16;
const result = trafficLights(road, n);

// print result
result.forEach((item,index) => console.log(`${index}: ${item}`));
/* [
    "CCC.G...R...", // 0 initial state as passed
    ".CCCG...R...", // 1
    "..CCC...R...", // 2 show 1st car, not the green light
    "..CCGC..R...", // 3 2nd car cannot enter intersection because 1st car blocks the exit
    "...CC.C.R...", // 4 show 2nd car, not the green light
    "...COC.CG...", // 5 3rd car stops for the orange light
    "...CR.C.C...", // 6
    "...CR..CGC..", // 7
    "...CR...C.C.", // 8
    "...CR...GC.C", // 9
    "...CR...O.C.", // 10
    "....C...R..C", // 11 3rd car can proceed
    "....GC..R...", // 12
    "....G.C.R...", // 13
    "....G..CR...", // 14
    "....G..CR...", // 15
    "....O...C..."  // 16
  ]; */
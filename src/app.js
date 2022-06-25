const fs = require('fs');
const log = require('consola');
const { brotliDecompressSync } = require('zlib');

// Load JSON File, and store it in an array
const routeData = JSON.parse(fs.readFileSync('src/routes/routes.json', 'utf8'));
document.getElementById('currentCycle').innerHTML = `AIRAC Cycle ${routeData.StandardRoutes.CycleVersion}`;

// Route Designator Search Render
function renderRouteDesigReturn(routeArray) {
  log.info(routeArray);
  document.getElementById('routeDesigOutput').value = routeArray[0].ID;
  document.getElementById('routingOutput').value = routeArray[0].Route;

  if (routeArray[0].Remarks.length === 0) {
    document.getElementById('remarksOutput').value = 'No remarks for this route';
  } else {
    document.getElementById('remarksOutput').value = routeArray[0].Remarks;
  }
}

// Route Designator Search
const routeDesignatorSearch = document.getElementById('routeDesig');

routeDesignatorSearch.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toUpperCase();
  const regex = /^[A-Z]{4}\d$/;
  let isRouteValid = false;
  const adFrom = searchString.substring(0, 2);

  if (regex.test(searchString)) {
    isRouteValid = true;
    log.info('Route string is valid.');
  }

  if (isRouteValid === true) {
    for (let i = 0; i < routeData.StandardRoutes.Airport.length; i++) {
      if (routeData.StandardRoutes.Airport[i].Name === adFrom) {
        const returnedRoutes = routeData.StandardRoutes.Airport[i].Route;
        log.info(`Departure AD is ${adFrom}`);

        for (let j = 0; j < returnedRoutes.length; j++) {
          if (returnedRoutes[j].ID === searchString) {
            log.info('Found matching route. Pushing to render function.');
            const matchedRoute = [];
            const obj = {
              ID: returnedRoutes[j].ID,
              Remarks: returnedRoutes[j].Remarks,
              Route: returnedRoutes[j].route,
            };

            matchedRoute.push(obj);
            renderRouteDesigReturn(matchedRoute);
          }
        }
      }
    }
  }
});

// ICAO to/from Search
/*
  The logic to only start performing the search when editing the Arrival ICAO box.
  Should be easy enough.
 */

const adFromInput = document.getElementById('icaoFrom');
const adToInput = document.getElementById('icaoTo');

/*
  Process the ICAO From/To boxes separately because I can't be bothered with figuring out
  how to add one handler to both
 */

adToInput.addEventListener('keyup', (e) => {
  let searchString = e.target.value.toUpperCase();
  const adFromCurrent = adFromInput.value.toUpperCase();

  let arrivalOutput = [];

  const shortRegex = /^[A-Z]{2}$/;
  const longRegex = /^[A-Z]{4}$/;
  let arrivalIsValidInput = false;
  const departureIsValidInput = false;

  // Start with ArrivalICAO Processing
  if (shortRegex.test(searchString) || longRegex.test(searchString)) {
    log.info('Arrival is valid ICAO');
    arrivalIsValidInput = true;
  } else if (searchString.length === 3) {
    log.info('String is 3 char long');
    arrivalIsValidInput = false;
  } else {
    log.info('Does not match either');
    arrivalIsValidInput = false;
  }

  if (searchString.length === 4 && arrivalIsValidInput === true) {
    searchString = searchString.substring(2, 4);
    log.info(`Arrival Search String has been trimmed to ${searchString}`);
  }

  if (arrivalIsValidInput === true) {
    for (let i = 0; i < routeData.StandardRoutes.Airport.length; i++) {
      if (routeData.StandardRoutes.Airport[i].Name === searchString) {
        arrivalOutput = routeData.StandardRoutes.Airport[i].Route;
        log.info(arrivalOutput);
      }
    }
  }

  // Process Departure ICAO
});

// ICAO From Handler
// adFromInput.addEventListener('keyup', (e) => {
//   let searchString = e.target.value.toUpperCase();
//   const shortRegex = /^[A-Z]{2}$/;
//   const longRegex = /^[A-Z]{4}$/;
//   let isValidInput = false;

//   if (shortRegex.test(searchString) || longRegex.test(searchString)) {
//     log.info('Is valid ICAO');
//     isValidInput = true;
//   } else if (searchString.length === 3) {
//     log.info('String is 3 char long');
//     isValidInput = false;
//   } else {
//     log.info('Doesn\'t match either');
//     isValidInput = false;
//   }

//   if (searchString.length === 4 && isValidInput === true) {
//     searchString = searchString.substring(2, 4);
//     log.info(`Search string trimmed to ${searchString}`);
//   }

//   if (isValidInput === true) {
//     for (let i = 0; i < routeData.StandardRoutes.Airport.length; i++) {
//       if (routeData.StandardRoutes.Airport[i].Name === searchString) {
//         const returnedRoutes = routeData.StandardRoutes.Airport[i].Route;
//         log.info(returnedRoutes);
//       }
//     }
//   }
// });

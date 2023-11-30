const data = require('./data.json');  // Flight data
const { getAirlines, isDurationLessThan, filterFlight } = require('./index');

const airlines = getAirlines(data);
console.log("Airlines:", airlines);

const filterOptions = {
    airline: Object.keys(airlines)[4], // "LH"
    duration: "PT20H",
    stops: 1,
    price: 1000
};

const filteredFlights = filterFlight(filterOptions, data);
console.log("Filtered Flights:", filteredFlights.length);

const moment = require("moment/moment");

/**
 * Returns an object containing airlines with their corresponding IATA codes and names.
 * @param {Array} data - The array of airline data.
 * @returns {Object} - The object containing airlines with their corresponding IATA codes and names.
 */
function getAirlines(data) {
    const airlines = {};  // Object Structure: {"iata_code": "name"}

    // Loop through the airline data
    data.forEach(airline => {
        // Check if the IATA code already exists in the airlines object
        if (!airlines[airline.owner.iata_code]) {
            // If not, add the IATA code and name to the airlines object
            airlines[airline.owner.iata_code] = airline.owner.name;
        }
    });

    return airlines;
}


/**
 * Check if a duration is less than another duration.
 * @param {string} duration - The duration to compare.
 * @param {string} toMathWith - The duration to compare against.
 * @returns {boolean} - True if the first duration is less than the second duration, false otherwise.
 */
function isDurationLessThan(duration, toMatchWith) {
    // Convert the durations to moment duration objects
    const duration1 = moment.duration(duration);
    const duration2 = moment.duration(toMatchWith);

    // Compare the durations by their milliseconds value
    return duration1.asMilliseconds() <= duration2.asMilliseconds();
}


/**
 * Filters the flights based on the provided filter criteria.
 * @param {object} filter - The filter criteria to apply on the flights.
 * @param {Array} flights - The list of flights to filter.
 * @returns {Array} - The filtered list of flights.
 */
function filterFlight(filter = { airline: "", duration: "", stops: null, price: 0 }, flights) {
    let filteredFlights = flights;

    // Check if the `filter` object exists and if the `airline` property is present and not empty
    if (filter?.airline && filter.airline.length > 0) {
        // Filter the `filteredFlights` array based on the condition `flight.owner.iata_code === filter.airline`
        filteredFlights = filteredFlights.filter(flight => flight.owner.iata_code === filter.airline);
    }


    // Check if 'filter.duration' exists and has a length greater than 0
    if (filter?.duration && filter.duration.length > 0) {
        // Filter flights based on the duration of each slice
        filteredFlights = filteredFlights.filter(flight =>
            // Ensure every slice in the flight has a duration less than the specified limit
            flight.slices.every(slice => isDurationLessThan(slice.duration, filter.duration))
        );
    }


    // Check if the stops filter is defined and not null
    if (filter?.stops !== undefined && filter?.stops !== null) {
        // Filter flights based on the maximum number of stops allowed
        filteredFlights = filteredFlights.filter(flight =>
            // Ensure every slice in the flight has a number of stops less than or equal to the specified limit
            flight.slices.every(slice => (slice.segments).length <= filter?.stops + 1)
        );
    }


    // Check if the price filter is defined and not equal to zero
    if (filter?.price !== undefined && filter?.price !== 0) {
        // Filter flights based on total_amount within the specified price range
        filteredFlights = filteredFlights.filter(flight =>
            // Ensure total_amount is greater than zero and within the specified price range
            flight.total_amount > 0 && flight.total_amount <= filter.price
        );
    }


    return filteredFlights;
}


module.exports = {
    getAirlines,
    isDurationLessThan,
    filterFlight
}
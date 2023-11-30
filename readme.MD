# Flight Data Filtering

This repository provides a set of utility functions for filtering flight data based on various criteria. The code is written in JavaScript and uses the Moment.js library for working with durations.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
  - [getAirlines](#getairlines)
  - [isDurationLessThan](#isdurationlessthan)
  - [filterFlight](#filterflight)
- [Example](#example)
- [License](#license)

## Prerequisites

- Node.js installed on your machine
- Moment.js library

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/flight-data-filtering.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Import the required modules:

   ```javascript
   const data = require("./data.json"); // Flight data
   const {
     getAirlines,
     isDurationLessThan,
     filterFlight,
   } = require("./index.js");
   ```

2. Utilize the provided functions to filter flight data based on your criteria.

## Functions

### getAirlines

Returns an object containing airlines with their corresponding IATA codes and names.

```javascript
const airlines = getAirlines(data);
console.log(airlines);
```

### isDurationLessThan

Check if a duration is less than another duration.

```javascript
const duration1 = "P1DT4H30M";
const duration2 = "PT7H10M";

const result = isDurationLessThan(duration1, duration2);
console.log(result);
```

### filterFlight

Filters the flights based on the provided filter criteria.

```javascript
const filterOptions = {
  airline: Object.keys(airlines)[4], // "LH"
  duration: "PT20H",
  stops: 1,
  price: 1000,
};

const filteredFlights = filterFlight(filterOptions, data);
console.log(filteredFlights);
```

## Example

An example is provided in the `example.js` file. Run the example using:

```bash
node example.js
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

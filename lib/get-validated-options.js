'use strict';

const airports = require('airports');
const moment = require('moment');

const constants = require('./constants');

module.exports = options => {
  const validatedOptions = {};

  const originAirport = options.from || process.env.AMX_TRACKER_ORIGIN_AIRPORT;

  if (typeof originAirport !== 'string' || originAirport.length === 0) {
    throw new TypeError('Origin airport code is missing');
  }

  if (airports.find(airport => airport.iata === originAirport) === undefined) {
    throw new TypeError('Origin airport code is invalid');
  }

  validatedOptions.from = originAirport;

  const destinationAirport = options.to || process.env.AMX_TRACKER_DESTINATION_AIRPORT;

  if (typeof destinationAirport !== 'string' || destinationAirport.length === 0) {
    throw new TypeError('Destination airport code is missing');
  }

  if (airports.find(airport => airport.iata === destinationAirport) === undefined) {
    throw new TypeError('Destination airport code is invalid');
  }

  validatedOptions.to = destinationAirport;

  const departureDate = options.departure || process.env.AMX_TRACKER_DEPARTURE_DATE;

  if (typeof departureDate !== 'string' || departureDate.length === 0) {
    throw new TypeError('Departure date is missing');
  }

  const departureMoment = moment(departureDate, constants.DATETIME_DATE_FORMAT, true);
  const today = moment().format(constants.DATETIME_DATE_FORMAT);

  if (!departureMoment.isValid() || !departureMoment.isSameOrAfter(today)) {
    throw new TypeError('Departure date is invalid');
  }

  validatedOptions.departure = departureDate;

  const returnDate = options.return || process.env.AMX_TRACKER_RETURN_DATE;

  if (typeof returnDate === 'string' && returnDate.length > 0) {
    const returnMoment = moment(returnDate, constants.DATETIME_DATE_FORMAT, true);

    if (!(returnMoment.isValid() && returnMoment.isSameOrAfter(today))) {
      throw new TypeError('Return date is invalid');
    }

    validatedOptions.return = returnDate;
  }

  let dealPrice;

  if (typeof options.dealPrice === 'undefined') {
    dealPrice = process.env.AMX_TRACKER_DEAL_PRICE;
  } else {
    dealPrice = options.dealPrice;
  }

  if (typeof dealPrice === 'number' || (typeof dealPrice === 'string' && dealPrice.length > 0)) {
    const parsedDealPrice = parseInt(dealPrice, 10);

    if (!isNaN(parsedDealPrice) && parsedDealPrice > 0) {
      validatedOptions.dealPrice = parsedDealPrice;
    }
  }

  let interval = parseInt(options.interval || process.env.AMX_TRACKER_INTERVAL, 10);

  if (isNaN(interval) || interval <= 0) {
    interval = 30;
  }

  validatedOptions.interval = interval;

  return validatedOptions;
};

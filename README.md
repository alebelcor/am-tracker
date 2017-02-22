# am-tracker

> App that gets/tracks [Aeroméxico](https://aeromexico.com) fare prices and optionally sends notifications

[![Build Status](https://img.shields.io/travis/alebelcor/am-tracker/master.svg)](https://travis-ci.org/alebelcor/am-tracker)

## Install

Ensure you have [Node.js](https://nodejs.org) version 4+ installed.

1. Clone the repository
2. Go to the folder and run: [`npm link`](https://docs.npmjs.com/cli/link)

An npm package is intentionally not provided.

## Usage

Set up `AM_TRACKER_USER_AGENT` environmental variable with your user agent.

```bash
$ am-tracker <options>
```

All searches are made for one adult.

### Notifications (optional)

When tracking, notifications are sent (via Twilio as SMSs) when a desired deal price has been met.

To enable notifications setup these environmental variables with your Twilio account details:

```bash
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_FROM
TWILIO_PHONE_TO
```

### Examples

Scenario A: Get the current cheapest total of any roundtrip flight (1 adult) from `TIJ` to `MEX` leaving `2017-03-13` and returning `2017-03-20`.

```bash
$ am-tracker \
  --from=TIJ \
  --to=MEX \
  --departure=2017-03-13 \
  --return=2017-03-20
```

Scenario B: Track any roundtrip flight (1 adult) from `TIJ` to `MEX` leaving `2017-08-07` and returning `2017-08-14` with a desired deal price total of `5000 MXN` (or less), polling every `60` minutes.

```bash
$ am-tracker \
  --deal-price=5000 \
  --from=TIJ \
  --to=MEX \
  --departure=2017-08-07 \
  --return=2017-08-14 \
  --interval=60
```

Scenario C: Track any one-way flight (1 adult) from `MEX` to `CUN` leaving `2017-08-07` and returning `2017-08-14` with a desired deal price total of `7000 MXN` (or less), polling every `30` minutes.

```bash
$ am-tracker \
  --deal-price=7000 \
  --from=MEX \
  --to=CUN \
  --departure=2017-08-07
```

### CLI options

#### `--from=<string>`

Origin airport IATA code.

#### `--to=<string>`

Destination airport IATA code.

#### `--departure=<string>`

Departure date in `YYYY-MM-DD`.

#### `--return=<string>` (optional)

Return date in `YYYY-MM-DD`. Leave out if it's a one-way flight.

#### `--deal-price=<number>` (optional)

Desired total price in Mexican Pesos (MXN). Leave out if not tracking a price and instead just want to get the current cheapest total.

#### `--interval=<number>` (optional)

Number of minutes until next time fare prices are checked. `30` by default. Ignored if `deal-price` was not set.

### Alternate setup

You can also pre-configure the app using the following environmental variables.

Do not combine both, CLI options and environmental variables, because you'll get unexpected behavior.

#### `AM_TRACKER_ORIGIN_AIRPORT`

Same as [`--from`](#--fromstring).

#### `AM_TRACKER_DESTINATION_AIRPORT`

Same as [`--to`](#--tostring).

#### `AM_TRACKER_DEPARTURE_DATE`

Same as [`--departure`](#--departurestring).

#### `AM_TRACKER_RETURN_DATE`

Same as [`--return`](#--returnstring-optional).

#### `AM_TRACKER_DEAL_PRICE`

Same as [`--deal-price`](#--deal-pricenumber).

#### `AM_TRACKER_INTERVAL`

Same as [`--interval`](#--intervalnumber-optional).

## License

MIT © Alejandro Beltrán

## Disclaimer

This was made for illustrative purposes.
I do not own the content generated by this tool.
All rights belong to their respective owners.
No copyright infringement intended.

## Credit

Inspired by [swa-dashboard](https://github.com/ezekg/swa-dashboard)

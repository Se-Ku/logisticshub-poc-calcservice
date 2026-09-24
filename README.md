# LogisticsHub PoC
This application is the backend component of the LogisticsHub PoC.<br/>
To learn how this app fits into the whole system visit [logisticshub-poc](https://github.com/Se-Ku/logisticshub-poc)

# Shipping rate calculator service
This application mimics a real world 3rd party service.<br/>
The backend will call exposed API to calculate shipping cost.<br/>
Requests are authenticated with a pre-shared key.<br/>
The incoming payload is validated against a schema.

# Implementation overview
The app is a simple exercise with Fastify (https://github.com/fastify/fastify).<br/>
One endpoint is available: `/shipping/calculate-rates` . <br/>
Custom middleware (plugin) is used for authentication (key in the HTTP header). 

# How to run
Newer Node version allow to just run `node server.ts`.

Other options is to use `run-local.sh` or to build a Docker image.
# Event Logistics Management System (Microservices)

This project is a Node.js microservices system for managing event logistics through a single API gateway.

## Services and Ports
- API Gateway: 5000
- Event Service: 5001
- Vendor Service: 5002
- Equipment Service: 5003
- Staff Service: 5004
- Transport Service: 5005
- Payment Service: 5006

## MongoDB Databases
- event_service_db
- vendor_service_db
- equipment_service_db
- staff_service_db
- transport_service_db
- payment_service_db

## Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)

## Environment Setup
Each service folder contains a `.env.example` file. Copy it to `.env` and set the correct MongoDB URI.

Required service folders:
- event-service
- vendor-service
- equipment-service
- staff-service
- transport-service
- payment-service

Example (PowerShell):

```powershell
Copy-Item event-service/.env.example event-service/.env
Copy-Item vendor-service/.env.example vendor-service/.env
Copy-Item equipment-service/.env.example equipment-service/.env
Copy-Item staff-service/.env.example staff-service/.env
Copy-Item transport-service/.env.example transport-service/.env
Copy-Item payment-service/.env.example payment-service/.env
```

## Install Dependencies
Run once per service:

```powershell
cd api-gateway; npm install; cd ..
cd event-service; npm install; cd ..
cd vendor-service; npm install; cd ..
cd equipment-service; npm install; cd ..
cd staff-service; npm install; cd ..
cd transport-service; npm install; cd ..
cd payment-service; npm install; cd ..
```

## Run Locally (Development)
1. Start MongoDB.
2. Start each microservice in separate terminals:

```powershell
cd event-service; npm start
cd vendor-service; npm start
cd equipment-service; npm start
cd staff-service; npm start
cd transport-service; npm start
cd payment-service; npm start
```

3. Start API gateway in another terminal:

```powershell
cd api-gateway; npm start
```

## Quick Health Check
After starting all services, verify gateway is up:

```powershell
Invoke-WebRequest http://localhost:5000/
```

## API Routes Through Gateway
- /api/events
- /api/vendors
- /api/equipment
- /api/staff
- /api/transport
- /api/payments

## Swagger URLs
- http://localhost:5000/api-docs (Gateway)
- http://localhost:5001/api-docs (Event)
- http://localhost:5002/api-docs (Vendor)
- http://localhost:5003/api-docs (Equipment)
- http://localhost:5004/api-docs (Staff)
- http://localhost:5005/api-docs (Transport)
- http://localhost:5006/api-docs (Payment)

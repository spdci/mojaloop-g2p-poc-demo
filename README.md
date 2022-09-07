## PoC for initiating a G2P (Government to Person) payment through mojaloop switch

This is to demo a G2P payment using the following components
- DFSP payment manager
- Mojaloop Testing Toolkit

### Technical Architecture
![Technical Architecture Diagram](assets/images/mojaloop-g2p-poc.drawio.png)

### Deployment Instructions

- Clone this repository
- Run Payment Manager
  ```
  cd thirdparty-sdk
  docker-compose up
  ```
---
That's it, all the services are deployed.

### Have the following web pages ready to monitor the transaction
- Run fhir4-mojaloop openhim mediator (You need to have node version v16.14.2 installed)
- Payee mobile app simulator: Open the URL http://localhost:6060/payeemobile and login with username '987654321' and don't need password
- Mojaloop Testing Toolkit Monitoring: Open the URL http://localhost:6060/admin/monitoring

### Making a transfer and monitor the logs
- Execute the following HTTP request either from command line or from postman.
  ```
  curl --location --request POST 'http://localhost:5001/fhir-mojaloop/sendmoney/fhir4-invoice' --header 'Content-Type: application/json' --data-raw '{
  "resourceType": "Invoice",
  "id": "b88e5a38-35ad-4d8c-aad3-44b4ace8c0b1",
  "identifier": [
      {
          "type": {
              "coding": [
                  {
                      "system": "https://openimis.github.io/openimis_fhir_r4_ig/CodeSystem/openimis-identifiers",
                      "code": "UUID"
                  }
              ]
          },
          "value": "b88e5a38-35ad-4d8c-aad3-44b4ace8c0b1"
      },
      {
          "type": {
              "coding": [
                  {
                      "system": "https://openimis.github.io/openimis_fhir_r4_ig/CodeSystem/openimis-identifiers",
                      "code": "Code"
                  }
              ]
          },
          "value": "IV-UC-8156989548-105"
      }
  ],
  "status": "active",
  "type": {
      "coding": [
          {
              "system": "https://openimis.github.io/openimis_fhir_r4_ig/CodeSystem/bill-type",
              "code": "policy",
              "display": "Policy"
          }
      ]
  },
  "recipient": {
      "reference": "Patient/D944AFE5-F1A9-45D1-BE82-7BE28719A7E1",
      "type": "Patient",
      "identifier": {
          "type": {
              "coding": [
                  {
                      "system": "https://openimis.github.io/openimis_fhir_r4_ig/CodeSystem/openimis-identifiers",
                      "code": "UUID"
                  }
              ]
          },
          "value": "D944AFE5-F1A9-45D1-BE82-7BE28719A7E1"
      }
  },
  "date": "2022-04-22",
  "lineItem": [
      {
          "chargeItemCodeableConcept": {
              "coding": [
                  {
                      "system": "https://openimis.github.io/openimis_fhir_r4_ig/CodeSystem/bill-charge-item",
                      "code": "policy",
                      "display": "Policy"
                  }
              ]
          },
          "priceComponent": [
              {
                  "extension": [
                      {
                          "url": "https://openimis.github.io/openimis_fhir_r4_ig//StructureDefinition/unit-price",
                          "valueMoney": {
                              "value": 2390.0,
                              "currency": "USD"
                          }
                      }
                  ],
                  "type": "base",
                  "code": {
                      "coding": [
                          {
                              "system": "Code",
                              "code": "Code",
                              "display": "IV-UC-8156989548-105"
                          }
                      ]
                  },
                  "factor": 1.0,
                  "amount": {
                      "value": 2390.0,
                      "currency": "USD"
                  }
              }
          ]
      }
  ],
  "totalNet": {
      "value": 2390.0,
      "currency": "USD"
  },
  "totalGross": {
      "value": 2390.0,
      "currency": "USD"
  }
}'
  ```
- You should get the 'Completed' status in the response and 'transactionRequestState' should be 'ACCEPTED' in the approveResponse body parameter.
- You can check various requests and response in TTK UI http://localhost:6060
- You should see the incoming notification in payee mobile app simulator

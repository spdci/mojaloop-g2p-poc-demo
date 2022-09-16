## PoC for initiating a G2P (Government to Person) payment through mojaloop switch

This is to demo a G2P payment using the following components
- DFSP payment manager
- Mojaloop Testing Toolkit

### Technical Architecture
![Technical Architecture Diagram](assets/images/mojaloop-g2p-poc.drawio.png)

### Deployment Instructions

- Clone this repository
- Run all the services with docker-compose
  ```
  cd mojaloop-g2p-poc-demo
  docker-compose up
  ```
---
That's it, all the services will be deployed.

### Open the following web pages to monitor the transaction
- Mojaloop Testing Toolkit Monitoring: Open the URL http://localhost:6060/admin/monitoring

### Open first payee mobile app simulator
- Payee mobile app simulator: Open the URL http://localhost:6060/payeemobile
- You should see the mobile app simulator with logo `Pink Bank`
- Login with username '987654321' and don't need password
- Then you should see the message `Welcome Navya Agarwal`

### Open second payee mobile app simulator in a separate browser tab / window
- Payee mobile app simulator: Open the URL http://localhost:6061/payeemobile
- You should see the mobile app simulator with logo `Green Bank`
- Login with username '876543210' and don't need password
- Then you should see the message `Welcome Arjun Varma`

### Executing disbursement
- Execute the following HTTP request either from command line or from postman.
  ```
  curl --location --request POST 'http://localhost:3001/disbursement' --header 'Content-Type: application/json' --data-raw '{
    "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
    "note": "PENSION",
    "payeeList": [
        {
            "payeeIdType": "MSISDN",
            "payeeIdValue": "987654321",
            "amount": 2000,
            "currency": "INR"
        },
        {
            "payeeIdType": "MSISDN",
            "payeeIdValue": "876543210",
            "amount": 3000,
            "currency": "INR"
        }
    ]
  }'
  ```
- You should get the 'COMPLETED' status in the response.
- You can check various requests and responses in TTK monitoring page
- You should see the incoming notification in both payee mobile app simulators

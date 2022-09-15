## Core connector for mojaloop payment manager

### Sample Request
- Execute the following HTTP request either from command line or from postman.
  ```
  curl --location --request POST 'http://localhost:3003/sendmoney' --header 'Content-Type: application/json' --data-raw '{
    "payerIdType": "ACCOUNT_ID",
    "payerIdValue": "PENSION",
    "payeeIdType": "MSISDN",
    "payeeIdValue": "987654321",
    "amount": "2000",
    "currency": "INR"
  }'
  ```
- You should get the 'COMPLETED' status in the response.
- You can check various requests and responses in TTK monitoring page

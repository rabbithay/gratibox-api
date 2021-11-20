# GratiBox

## Documentation

<br/>

### `POST /register`

#### Request

    body: {
        "name": "Marina",
        "email": "marinasena@gmail.com",
        "password": "De1primeira!"
    }

#### Response

    in case of invalid params: status 406

    in case of repeated e-mail: status 409

    in case of success: status 201

<br>

### `POST /login`

#### Request

    body: {
        email: marinasena@gmail.com,
        password: De1primeira!
    }

#### Response

    in case of invalid params: status 406

    in case of incorrect e-mail and/or password: 401

    in case of success: status 200

    data: {
        "user_id": 1,
        "name": "Marina",
        "email": "marinasena@gmail.com",
        "token": "ad52a74s3f54a32d",
        "plan_status": true,
        "PLAN": {
            "plan_type": "weekly",
            "created_date": ,
            "next_deliveries": [
                delivery_date,
                delivery_date,
                delivery_date,
                delivery_date
            ],
            products: [
                "incensos", 
                "produtos organicos",
                "chás"
            ]
        }
    }

<br>

### `POST /sign-plan`

#### Request

    header bearer token

    body: {
        "user_id": 1,
        "plan_type": "weekly",
        "delivery_day": 1,
        "products": [],
        "full_user_name": "Marina Sena",
        "address": "",
        "cep": "",
        "city": "",
        "state": ""
    }

#### Response

    in case of invalid params: status 406

    in case of invalid token: status 401

    in case of success: status 201

<br>

### `GET /products`

#### Request

    header bearer token    

#### Response

    in case of invalid token: status 401

    in case of success: status 200

    data: {
        products: [
            {
                "product_id": 1,
                "product_name": "incensos"                
            },
            {
                "product_id": 2,
                "product_name": "produtos orgânicos"                
            },
            {
                "product_id": 3,
                "product_name": "chás"                
            }
        ]
    }

<br>

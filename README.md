# Valex API

This is an API developed to organize a benefit card system for employees. It is developped in `node.js` using `express`. This is a project created to study and learn express and should not be used as a operating finished product.

## Features

This API counts with the following routes

### Card

#### Register Card

You can register a card into this API by making a POST request to route `/card/create` with a object like

```js
{
  employeeId, // Number and required - pre registered values on database: 1, 2
  type // String and required - one of pre-registered types on database: "groceries", "restaurants", "transport", "education" or "health"
}
```

And headers like

```js
{
  x-api-key // String and required - pre registered value on database: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0
}
```

If everything is ok, it will return status code 201 and card data. If any key is improperly passed it will return status code 422. If the given api key is not registered or not sent, it will return status code 401. If the given employeeId is not registered, it will return status code 404. If the given employee already have a card of the given type, it will return status code 409. If anything breaks internally it will return status code 500.

#### Activate Card

You can activate a card by making a POST request to route `/card/activate` with a object like

```js
{
  id, // Number and required - Card Id set on Register Card route
  securityCode, // 3 numerical digits long string and required - set on Register Card route
  password // 4 numerical digits long string and required
}
```

If everything is ok, it will return status code 200. If any key is improperly passed it will return status code 422. If the given id is not registered, it will return status code 404. If the given security code do not match the given card id, it will return status code 401. If anything breaks internally it will return status code 500.

#### Show Card Balance

You can check a card balance by making a POST request to route `/card/balance` with a object like

```js
{
  id // Number and required - Card Id set on Register Card route
}
```

If everything is ok, it will return status code 200 and card balance data. If any key is improperly passed it will return status code 422. If the given id is not registered, it will return status code 404. If anything breaks internally it will return status code 500.


#### Block Card

You can block a card by making a POST request to route `/card/block` with a object like

```js
{
  id, // Number and required - Card Id set on Register Card route
  password // 4 numerical digits long string and required - set on Activate Card Route
}
```

If everything is ok, it will return status code 200. If any key is improperly passed it will return status code 422. If the given id is not registered, it will return status code 404. If the given password do not match the given card id, it will return status code 401. If anything breaks internally it will return status code 500.

#### Unblock Card

You can block a card by making a POST request to route `/card/unblock` with a object like

```js
{
  id, // Number and required - Card Id set on Register Card route
  password // 4 numerical digits long string and required - set on Activate Card Route
}
```

If everything is ok, it will return status code 200. If any key is improperly passed it will return status code 422. If the given id is not registered, it will return status code 404. If the given password do not match the given card id, it will return status code 401. If anything breaks internally it will return status code 500.

### Recharges

#### Register Recharge

You can register a card recharge into this API by making a POST request to route `/recharge` with a object like

```js
{
  id, // Number and required - Card Id set on Register Card route
  amount // Positive integer and required
}
```

And headers like

```js
{
  x-api-key // String and required - pre registered value on database: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0
}
```

If everything is ok, it will return status code 200. If any key is improperly passed it will return status code 422. If the given api key is not registered or not sent, it will return status code 401. If the given id is not registered, it will return status code 404. If anything breaks internally it will return status code 500.

### Payments

#### Register Payment

You can register a payment into this API by making a POST request to route `/payment` with a object like

```js
{
  cardId, // Number and required - Card Id set on Register Card route
  password, // 4 numerical digits long string and required - set on Activate Card Route
  businessId, // Number and required - pre registered values on database: 1, 2, 3, 4, 5
  amount // Positive integer and required
}
```

If everything is ok, it will return status code 200. If any key is improperly passed it will return status code 422. If the given cardId or businessId is not registered, it will return status code 404. If anything breaks internally it will return status code 500.
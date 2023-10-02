# todo-list-node-js

## REST API

## Create User - POST `/auth/join`

### Request
```json
{
    "email": "me@hyunsang.dev",
    "password": "q1w2e3r4",
    "nickname": "HyunSang Park"
}
```

### Response
```json
{
  "user_id": "0855adcf-f7f9-4203-86f8-3ad021c48631",
  "user_email": "me@hyunsang.dev",
  "user_password": "YdohnJsn99qZiWB4na9LfdMKMuU+ArSPomkc6j514KNmjzmQ5S6k0v8YpvOr/NeJEHKtmM5U2eLFIsWWSEyz6w==",
  "user_salt": "bHpFiBfGwz0sLReS0U2vjv8sY8hFkbsWDYHFKdGCAWk2C7p9+L/V50yqaDKxxEzznSljkiTPLPvySP/AJmrUlA==",
  "user_nickname": "HyunSang Park",
  "updated_at": "2023-10-02T08:08:08.181Z",
  "created_at": "2023-10-02T08:08:08.181Z"
}
```
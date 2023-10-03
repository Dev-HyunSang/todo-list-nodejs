# Project Docs

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

## Login User - POST `/auth/login`

### Request
```json
{
    "email": "me@hyunsang.dev",
    "password": "q1w2e3r4"
}
```

### Response
```json
{
    "status": 200,
    "message": "환영해요! 오늘의 하루를 기록하고 실천해 봐요.",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTYyNTU5MDIsImV4cCI6MTY5NjI1OTUwMn0.4v01u68I1gf1_GURRDx3m8fnlbuJ6rHraV4I0HSf9Qw",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTYyNTU5MDIsImV4cCI6MTY5NzQ2NTUwMn0.0up1pEAkw920_hP7aYAl_ZW6F9YiFNsWbL_MGYqE24o"
    },
    "responsed_at": "2023-10-02T14:11:40.908Z"
}
```

## 참고한 자료
- []()
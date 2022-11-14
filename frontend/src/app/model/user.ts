export type CreateUserRequest = {
  login: string,
  pass: string,

  name: string,
  surname: string
}

export type UserDTO = {
  id: number | null,
  login: string,

  name: string,
  surname: string,
  roles: string[]
}

export type AuthenticationRequest = {
  login: string,
  pass: string
}

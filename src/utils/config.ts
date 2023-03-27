export interface DBConfig {
  mongo: {
    uri: string;
  };
}

export interface LoadConfig {
  db: DBConfig;
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

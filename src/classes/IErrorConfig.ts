class IErrorConfig {
  public logFolder: string;

  constructor(params: { logFolder?: string }) {
    this.logFolder = params.logFolder ?? "__logs";
  }
}

let IERROR_CONFIG_DATA: IErrorConfig;
export function IErrorSetConfig(params: { logFolder?: string }) {
  if (IERROR_CONFIG_DATA) {
    return IERROR_CONFIG_DATA;
  }

  IERROR_CONFIG_DATA = new IErrorConfig(params);
  return IERROR_CONFIG_DATA;
}

export function getIErrorConfig() {
  return IERROR_CONFIG_DATA ?? new IErrorConfig({});
}

export type IErrorFullStructure = {
  message: string;
  metadata: unknown;
  causes?: IErrorFullStructure[];
};

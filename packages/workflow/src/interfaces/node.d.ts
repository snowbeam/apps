/* The code is defining an interface called `INode`. An interface in TypeScript is a way to define the
structure of an object. In this case, the `INode` interface specifies the properties and their types
that an object of type `INode` should have. */
export interface INode {
  id: string;
  name: string;
  typeVersion: number;
  type: string;
  position: [number, number];
  disabled?: boolean;
  notes?: string;
  notesInFlow?: boolean;
  retryOnFail?: boolean;
  maxTries?: number;
  waitBetweenTries?: number;
  alwaysOutputData?: boolean;
  executeOnce?: boolean;
  onError?: OnError;
  continueOnFail?: boolean;
  parameters: INodeParameters;
  credentials?: INodeCredentials;
  webhookId?: string;
  extendsCredential?: string;
}

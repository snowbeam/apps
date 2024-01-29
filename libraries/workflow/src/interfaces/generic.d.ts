export type BinaryFileType =
  | "text"
  | "json"
  | "image"
  | "audio"
  | "video"
  | "pdf"
  | "html";

/* The code is defining an interface named `IBinaryData`. This interface represents a binary file and
has the following properties: */
export interface IBinaryData {
  [key: string]: string | undefined;
  data: string;
  mimeType: string;
  fileType?: BinaryFileType;
  fileName?: string;
  directory?: string;
  fileExtension?: string;
  fileSize?: string; // TODO: change this to number and store the actual value
  id?: string;
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonValue[];

export type JsonObject = { [key: string]: JsonValue };

export type GenericValue =
  | string
  | object
  | number
  | boolean
  | undefined
  | null;

export type CloseFunction = () => Promise<void>;

export interface IDataObject {
  [key: string]: GenericValue | IDataObject | GenericValue[] | IDataObject[];
}

export interface IStatusCodeMessages {
  [key: string]: string;
}

export type Functionality = "regular" | "configuration-node";

export type BannerName =
  | "V1"
  | "TRIAL_OVER"
  | "TRIAL"
  | "NON_PRODUCTION_LICENSE"
  | "EMAIL_CONFIRMATION";

export type ExecutionStatus =
  | "canceled"
  | "crashed"
  | "error"
  | "failed"
  | "new"
  | "running"
  | "success"
  | "unknown"
  | "waiting"
  | "warning";

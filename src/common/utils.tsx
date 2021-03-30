import csv from "csvtojson";

export function readFileAsJson<T>(file: File): Promise<T> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    if (reader.error) {
      reject(reader.error);
    }
    reader.onload = () => {
      try {
        const json: T = JSON.parse(reader.result as string);
        resolve(json);
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsText(file);
  });
}

export function readFileAsCsv(file: File, headers?: string[]): Promise<Array<JSON>> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    if (reader.error) {
      reject(reader.error);
    }
    reader.onload = async () => {
      const data: JSON[] = await csv({
        noheader: false,
        headers: headers,
        ignoreEmpty: true,
      }).fromString(reader.result as string);
      resolve(data);
    };
    reader.readAsText(file);
  });
}

export function getJsonSchema(inputSchemaProperties: string): Promise<JSON> {
  return new Promise((resolve, reject) => {
    const headers = Array<string>();
    getCsvHeaders(inputSchemaProperties, headers);
    if (headers.length === 0) {
      reject("Header not found");
    }
    csv({
      noheader: true,
      headers: headers,
    })
      .fromString(headers.join(","))
      .then((jsonObjArray) => {
        resolve(jsonObjArray[0]);
      });
  });
}

export function getCsvHeaders(inputSchema: string, headers: string[], parentHeader = ""): void {
  const jsonKey = Object.keys(inputSchema);
  const objectJson = eval(inputSchema);
  jsonKey.forEach((key) => {
    switch (objectJson[key]["type"]) {
      case "object":
        getCsvHeaders(
          objectJson[key]["properties"],
          headers,
          parentHeader === "" ? key : `${parentHeader}.${key}`
        );
        break;
      case "array":
        getCsvHeaders(
          objectJson[key]["items"]["properties"],
          headers,
          parentHeader === "" ? `${key}.0` : `${parentHeader}.${key}.0`
        );
        break;
      default:
        headers.push(parentHeader === "" ? key : parentHeader + "." + key);
    }
  });
}

interface QrCode {
  type: string;
  payload: {
    uri: string;
    key: string;
    permittedActions: string[];
    redirect: string;
  };
}

export const encodeQrCode = (payload: QrCode): string =>
  `https://action.openattestation.com?q=${encodeURIComponent(JSON.stringify(payload))}`;

export const decodeQrCode = (qrCode: string): QrCode => {
  const ttRegex = /https:\/\/action.openattestation.com\/?\?q=(.*)/;
  if (!ttRegex.test(qrCode))
    throw new Error("QR Code is not formatted to TradeTrust specifications");
  const [, encodedPayload] = ttRegex.exec(qrCode);
  const decodedPayload = JSON.parse(decodeURIComponent(encodedPayload));
  return decodedPayload;
};

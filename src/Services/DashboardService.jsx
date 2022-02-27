import { HttpServices } from "./HttpMethod.Helper";

const TokenMicrosoftAccount = async () => {
  try {
    const result = await HttpServices.post(
     'microsoft Acoount Token Api'
    );
    return result;
  } catch (e) {
    return undefined;
  }
};

export { TokenMicrosoftAccount };

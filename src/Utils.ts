
import {
  HttpMethod,
} from "@emmveqz/util-tools-common/dist/enums"
import type {
  IHttpConfig,
  IHttpResponse,
} from "@emmveqz/util-tools-common/dist/types"
import axios from "axios"

//

export const httpRequest = async <T>(url: string, config?: IHttpConfig): Promise<IHttpResponse<T>|Error> => {
  const method = config?.method ?? HttpMethod.GET

  try {
    const resp = await axios<T>({
      ...config,
      method,
      url,
    })

    return {
      body: resp.data,
      ok: resp.statusText?.toLowerCase() === "ok",
      status: resp.status,
    }
  }
  catch (ex) {
    return new Error((ex as Error|undefined)?.message || "request error")
  }
}

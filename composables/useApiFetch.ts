import { useRuntimeConfig } from "nuxt/app"
import { ofetch, type $Fetch } from "ofetch"

// Wrapper con tipado estricto
const ofetchWrapper = <T = any>(request: RequestInfo, opts?: Object): Promise<T> => {
    const config = useRuntimeConfig();
    console.debug("Recuperado de", config.public.baseURL);
    return ofetch(request, {baseURL: config.public.baseURL, ...opts});
}

export const useApiFetch = Object.assign(ofetchWrapper, ofetch) as $Fetch;

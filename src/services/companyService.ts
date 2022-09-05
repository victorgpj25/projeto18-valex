import * as companyRepository from "../repositories/companyRepository"

export async function validateApiKey(apiKey: string) {
    const validation = await companyRepository.findByApiKey(apiKey)
    if (!validation) throw {code: "invalid_api_key", message: "Given api key is not valid"}
}
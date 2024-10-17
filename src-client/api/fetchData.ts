import type { GetDataApiResponse } from '@base/types'

export const fetchData = async (): Promise<GetDataApiResponse> => {
    const response = await fetch('/api/data')

    const data = await response.json()

    return data
}

import { useEffect, useState } from 'react'
import type { GetDataApiResponse } from '@base/types'

import { api } from '../api'

export const useRadarData = () => {
    const [data, setData] = useState<GetDataApiResponse | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        api.fetchData()
            .then(setData)
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Ошибка запроса данных.')
                }

                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return {
        data,
        error,
        isLoading,
    }
}

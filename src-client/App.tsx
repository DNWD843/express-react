import { useRadarData } from './hooks'
import { Header, Radar, Description, GoUpButton, Loader, Error } from './components'
import './App.css'

export function App() {
    const { isLoading, error, data } = useRadarData()

    return (
        <div className="page">
            <Header lastModifiedDate={data?.lastModifiedDate} />

            <main>
                {isLoading && (<Loader />)}
                {error && (<Error message={error} />)}
                {data && (
                    <>
                        <Radar data={data} />
                        <Description data={data} />
                        <GoUpButton />
                    </>
                )}
            </main>
        </div>
    )
}

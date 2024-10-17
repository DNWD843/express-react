import classNames from 'classnames'
import type { GetDataApiResponse } from '@base/types'

import { useRadar } from '../../hooks'

import styles from './styles.module.scss'

type DescriptionProps = {
    data: GetDataApiResponse
}

export const Description = ({ data }: DescriptionProps) => {
    const { segments, radarRings } = useRadar(data)

    return (
        <div className={styles.description}>
            <div className={styles.section}>
                <h2 className={classNames(styles.sectionHeader, styles.descriptionHeader)}>Описание</h2>
                <div className={styles.sectionItem}>
                    {data.description?.split('\n').map(paragraph => <p className={styles.sectionItemText} key={paragraph}>{paragraph}</p>)}
                </div>
            </div>

            <div className={classNames(styles.section, styles.twoColumns)}>
                <h2 className={styles.sectionHeader}>Сегменты</h2>
                {segments.map(segment => (
                    segment.description
                        ? (
                            <div key={segment.name} className={styles.sectionItem}>
                                <h3 className={styles.sectionItemTitle}>{segment.name}</h3>
                                {segment.description.split('\n').map(paragraph => <p className={styles.sectionItemText} key={paragraph}>{paragraph}</p>)}
                            </div>
                        )
                        : null
                ))}
            </div>

            <div className={classNames(styles.section, styles.twoColumns)}>
                <h2 className={styles.sectionHeader}>Кольца</h2>
                {radarRings.map(ring => (
                    ring.description
                        ? (
                            <div key={ring.name} className={styles.sectionItem}>
                                <h3 className={styles.sectionItemTitle} style={{ color: ring.color }}>{ring.name}</h3>
                                {ring.description.split('\n').map(paragraph => <p className={styles.sectionItemText} key={paragraph}>{paragraph}</p>)}
                            </div>
                        )
                        : null
                ))}
            </div>

            <div className={classNames(styles.section, styles.twoColumns)}>
                <h2 className={styles.sectionHeader}>Точки</h2>
                {segments.map(segment => segment.rings.map(ring => ring.entryList.map(entry => (
                    entry.description
                        ? (
                            <div key={entry.id} id={entry.id} className={styles.sectionItem}>
                                <h3 className={styles.sectionItemTitle}>{entry.name}</h3>
                                {entry.description.split('\n').map(paragraph => <p className={styles.sectionItemText} key={paragraph}>{paragraph}</p>)}
                            </div>
                        )
                        : null
                ))))}
            </div>
        </div>
    )
}

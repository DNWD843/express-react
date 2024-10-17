import { memo } from 'react'

import styles from './styles.module.scss'

export const RadarLegend = memo(() => (
    <div className={styles.radarLegend}>
        <span>▲ движение к центру     ▼ движение от  центра</span>
        <span>〇 без изменений</span>
    </div>
))

RadarLegend.displayName = 'RadarLegend'

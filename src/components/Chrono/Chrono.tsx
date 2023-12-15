/* eslint-disable react/jsx-props-no-spreading */
import { Chrono } from 'react-chrono'
import { TimelineProps } from 'react-chrono/dist/models/TimelineModel'

const Chronos = ({ ...props }: TimelineProps) => (
  <Chrono
    theme={{
      primary: '#09090b',
      secondary: '#09090b',
      // cardBgColor: '#09090b',
      titleColor: '#343a40',
      titleColorActive: '#d4d4d8'
    }}
    fontSizes={{
      // cardSubtitle: '0.85rem',
      // cardText: '0.8rem',
      // cardTitle: '1rem',
      // title: '1rem',
      cardSubtitle: '16px',
      cardText: '20px',
      cardTitle: '18px',
      title: '18px'
    }}
    classNames={{
      cardText: 'cardDesc',
      cardTitle: 'timelineTitle'
    }}
    {...props}
  />
)

export default Chronos

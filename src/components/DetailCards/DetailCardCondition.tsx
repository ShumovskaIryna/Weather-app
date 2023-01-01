import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import ThisDayItem from './ThisDayItem'
import '../../pages/Details/Details.css'

export interface Item {
  iconId: string
  name: string
  value: string
}

function DetailCardCondition (): JSX.Element {
  const items = [
    {
      iconId: 'temp',
      name: 'Температура',
      value: '20° - ощущается как 17°'
    },
    {
      iconId: 'pressure',
      name: 'Давление',
      value: '765 мм ртутного столба - нормальное'
    },
    {
      iconId: 'precipitation',
      name: 'Осадки',
      value: 'Без осадков'
    },
    {
      iconId: 'wind',
      name: 'Ветер',
      value: '3 м/с юго-запад - легкий ветер'
    }
  ]

  return (
      <div>
          <Card sx={{ p: 2 }}>
              <CardContent sx={{ ml: 1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {items.map((item: Item) => (
                              <ThisDayItem key={item.iconId} item={item} />
                            ))}
                        </Grid>
                    </Grid>
              </CardContent>
          </Card>
      </div>
  )
}

export default DetailCardCondition

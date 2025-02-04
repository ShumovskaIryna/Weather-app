import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import { red, grey } from '@mui/material/colors'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Grid from '@mui/material/Grid'
import { selectCurrentWeatherData } from '../../store/selectors'
import GlobalSvgSelector from '../../assets/icons/global/GlobalSvgSelector'
import { useCustomSelector, useCustomDispatch } from '../../hooks/store'
import { NavLink } from 'react-router-dom'
import { fetchCurrentWeather, deleteCityByName } from '../../store/thunks/fetchCurrentWeather'
import './CityCard.css'

const ONE_SECOND_IN_MILLISECOND = 1000

interface Props {
  cityName: string
  deleteCityCard: (city: string) => void
}

function CityCard ({ cityName, deleteCityCard }: Props): JSX.Element {
  const { weathersMap } = useCustomSelector(selectCurrentWeatherData)
  const dispatch = useCustomDispatch()
  const weather = weathersMap[cityName]
  useEffect(() => {
    if (cityName != null) {
      void dispatch(fetchCurrentWeather(cityName))
    }
  }, [])

  const getRefreshCard = (cityName: string): void => {
    void dispatch(fetchCurrentWeather(cityName))
  }
  const deleteCard = (cityName: string): void => {
    deleteCityCard(cityName)
    void dispatch(deleteCityByName(cityName))
  }

  return (
    (weather != null)
      ? <div className="card">
        <Card>
            <NavLink to={`details/${cityName}`} className="card_content">
                <CardContent sx={{ ml: 1 }}>
                    <Grid container spacing={1} direction="row"
                        justifyContent="center"
                        alignItems="center" color="text.secondary">
                        <Typography sx={{ mt: 1, mb: 1, fontSize: 20 }} color="text.secondary">
                        {cityName}, {weather.sys.country}
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography sx={{ fontSize: 44, color: grey[800] }}>
                            {Math.floor(weather.main.temp)}°C
                        </Typography>
                        <Typography sx={{ fontSize: 32, color: grey[600] }}>
                            {Math.floor(weather.main.feels_like)}°C
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <GlobalSvgSelector id={weather.weather[0].icon}/>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography sx={{ mb: 1.5, fontSize: 20 }} color="text.secondary">
                            Today
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 18 }} color="text.secondary">
                            {new Date(weather.dt * ONE_SECOND_IN_MILLISECOND +
                            (weather.timezone * ONE_SECOND_IN_MILLISECOND)).toLocaleString('en-US',
                              {
                                month: 'long',
                                day: 'numeric',
                                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                              })
                            }
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 16 }} color="text.secondary">
                            {weather.weather[0].description}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography sx={{ mb: 2, fontSize: 10 }} color="text.secondary">
                             Pressure : {Math.floor(weather.main.pressure)} mm
                        </Typography>
                        <Typography sx={{ mb: 2, fontSize: 10 }} color="text.secondary">
                            Humidity : {Math.floor(weather.main.humidity)} %
                        </Typography>
                        <Typography sx={{ mb: 2, fontSize: 10 }} color="text.secondary">
                            Wind speed : {Math.floor(weather.wind.speed)} km/h
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            </NavLink>
            <CardActions sx={{ ml: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Button sx={{ mr: 8.5 }} size="small"
                        onClick={() => getRefreshCard(cityName)} >Refresh</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton aria-label="settings"
                        onClick={() => deleteCard(cityName)}>
                            <DeleteSweepIcon sx={{ color: red[400], fontSize: 24 }}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    </div>
      : <></>
  )
}

export default CityCard

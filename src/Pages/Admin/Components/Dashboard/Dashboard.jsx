import { React, useState } from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {  DesktopDatePicker } from "@mui/x-date-pickers";
import { Box, Grid } from "@mui/material";


const initialState = {
  day:"",
  month:"",
  year:"",
  minute:"",
  second:"",
  hour:""

}




export default function Dashboard() {
  const [value, setValue] = useState(dayjs());
  const  [calendar, setCalendar] = useState(initialState)

  const minDate =  new Date()

  const date = {
    day: minDate.getDate(),
    month: minDate.getMonth(),
    year: minDate.getFullYear(),
    minute: minDate.getMinutes(),
    second: minDate.getSeconds(),
    hour: minDate.getHours()
  }

  console.log(minDate);


  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    setCalendar({day:newValue.$D, month: newValue.$M + 1, year: newValue.$y, minute:date.minute, second:date.second, hour:date.hour})
  };


  console.log(calendar);


  console.log(new Date());

  return (
    <div>
    <Box>
      <Grid container justifyContent={"center"} mt={10}>
        <Grid item lg={4} md={6} sm={8} xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} >
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          minDate={new Date().setDate(date.day + 10)}
          value={value}
          onChange={handleChange}
          PopperProps={{
            sx:{
              "& .MuiButtonBase-root":{
                border:"none !important",
              }
            }
          }}
          renderInput={(params) => <TextField  {...params} />}
         
        />     
        </Stack>
      </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
     
    </div>
  );
}

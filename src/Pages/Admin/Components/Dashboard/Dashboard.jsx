import { React, useState } from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Box, Grid, Typography } from "@mui/material";

const initialState = {
  day: "",
  month: "",
  year: "",
  minute: "",
  second: "",
  hour: "",
};

export default function Dashboard() {
  const [value, setValue] = useState(dayjs());
  const [calendar, setCalendar] = useState(initialState);

  const minDate = new Date();

  const date = {
    day: minDate.getDate(),
    month: minDate.getMonth(),
    year: minDate.getFullYear(),
    minute: minDate.getMinutes(),
    second: minDate.getSeconds(),
    hour: minDate.getHours(),
  };


  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    setCalendar({
      day: newValue.$D,
      month: newValue.$M + 1,
      year: newValue.$y,
      minute: date.minute,
      second: date.second,
      hour: date.hour,
    });
  };

  console.log(calendar);


  return (
    <div>
      <Box>
        <Typography variant="h4" component={"h4"} sx={{ textAlign: "center", mt:4 }}>
          Select a calendar
        </Typography>
        <Grid container justifyContent={"center"} mt={8}>
          <Grid item lg={4} md={6} sm={8} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  minDate={new Date().setDate(date.day + 10)}
                  value={value}
                  onChange={handleChange}
                  PopperProps={{
                    sx: {
                      "& .MuiButtonBase-root": {
                        border: "none !important",
                      },
                    },
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"} mt={5} gap={4}>
          <Grid
            item
            lg={4}
            sx={{
              textAlign: "center",
              p: 4,
              borderRadius: "10px",
              boxShadow: "5px 5px 10px 4px gray",
            }}
          >
            <img
              style={{ width: "100%", borderRadius: "10px", height: "400px" }}
              src="https://i.pinimg.com/564x/f9/9b/65/f99b65112997c9551e1e9414b5c5e0e5.jpg"
              alt=""
            />
          </Grid>
          <Grid
            item
            lg={4}
            sx={{
              textAlign: "center",
              p: 4,
              borderRadius: "10px",
              boxShadow: "5px 5px 10px 4px gray",
            }}
          >
            <Typography variant="h4" component={"h4"}>
              Admin Info
            </Typography>
            <Typography
              sx={{ lineHeight: "30px", mt: 3 }}
              variant="p"
              component={"p"}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
              doloribus! Assumenda quia nisi ipsam. Similique ullam, modi magnam
              sunt impedit corporis dolores soluta, illum quas natus mollitia,
              quae earum. Ducimus veniam assumenda quo, laboriosam minus amet
              sit fuga inventore nihil molestiae repellat quas pariatur
              architecto ullam nisi voluptatibus deleniti numquam?
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

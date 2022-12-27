import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AnswerModal from "./AnswerModal";

export default function Yesterday() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [start, setStart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      axios
        .get("https://challange.onrender.com/api/v1/question", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          res.data.data.allQuestion.content.map((v) => {
            if (v.day == JSON.parse(localStorage.getItem("activeDay")) - 1) {
              v?.tasks?.map((val) => {
                if (val.rate == null && val.feedback == null) {
                  axios
                    .get(
                      `https://challange.onrender.com/api/v1/attachments/${val?.attachmentId}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                    .then((resp) => {
                      axios
                        .get(
                          `https://challange.onrender.com/api/v1/users/${val?.userId}`,
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }
                        )
                        .then((response) => {
                          setUser((prev) => ({
                            ...prev,
                            maxRate: v.maxBall,
                            fileUrl: resp.data.data.attachmentById.name,
                            username: response.data.data.userById.username,
                            userId: val?.userId,
                            id: val?.id,
                          }));
                        });
                    });
                }
              });
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(data);

  useEffect(() => {
    if (start) {
      const copy = [...data];
      copy.push(user);
      let uniq = {};
      let arrFiltered = copy.filter(
        (obj) => !uniq[obj.username] && (uniq[obj.username] = true)
      );

      setData(arrFiltered);
    } else {
      setStart(true);
    }
  }, [user]);

  return (
    <div>
      <Box mx={"auto"} maxWidth={500} mt={3}>
        {data?.map((v, i) => (
          <Box
            key={i}
            my={0.5}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              width={"10%"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar>{v?.username.slice(0, 1)}</Avatar>
            </Box>
            <Box
              width={"90%"}
              px={2}
              py={0.5}
              sx={{
                boxShadow: 1,
                border: 1,
                borderRadius: 5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box width={"55%"} sx={{ overflow: "hidden" }}>
                <Typography variant="p">{v?.username}</Typography>
              </Box>
              <Box width={"20%"}>
                <Typography variant="p">
                  <button onClick={() => setIsModalOpen(true)}>show</button>
                </Typography>
                {isModalOpen && (
                  <AnswerModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    value={v}
                  />
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
}

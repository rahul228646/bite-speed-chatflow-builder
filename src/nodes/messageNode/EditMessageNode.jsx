import { TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const EditMessageNode = ({ data, onEdit, id }) => {
  // we call the onEdit of flowBuilder from here to edit the data of a node
  const [text, setText] = useState(data?.text);
  useEffect(() => {
    setText(data?.text);
  }, [data]);

  return (
    <div className="edit-message-root">
      <Typography>Text</Typography>
      <TextField
        sx={{ "& legend": { display: "none" } }}
        id="outlined-multiline-static"
        multiline
        rows={4}
        value={text}
        onChange={(e) => {
          const newData = {
            ...data,
            text: e.target.value,
          };
          setText(newData?.text);
          onEdit(newData, id);
        }}
      />
    </div>
  );
};

export default EditMessageNode;

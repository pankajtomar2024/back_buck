import React from "react";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const BadgeIcon = ({
  //@ts-ignore
  value,

  //@ts-ignore
}) => {
  return (
    <Badge
      badgeContent={value}
      color="error"
      sx={{
        ".MuiBadge-dot": {
          backgroundColor: "red",
        },
        ".MuiBadge-badge": {
          fontSize: "10px",
          borderRadius: "50%",
          padding: "1px",
          right: -4,
          width: 8,
          height: "15px",
          top: -1,
          color: "white",
          backgroundColor: "red",
          opacity: 0.9,
        },
      }}
    >
      <ShoppingCart sx={{ fontSize: 24 }} />
    </Badge>
  );
};

export default BadgeIcon;

import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";

const LIST_LINKS = [
  {
    label: "퀴즈 리스트",
    href: "/quiz",
  },
];

export const SideMenu = ({
  onClose,
}: {
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        {LIST_LINKS.map(({ label, href }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(href);
              }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
